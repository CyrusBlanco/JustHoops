import { useState, useEffect } from 'react';
import { useHoops } from '../../context/HoopsContext';

const GameForm = ({ game, onSave, onCancel }) => {
  const { courts } = useHoops();
  
  const [formData, setFormData] = useState({
    type: '5v5 League',
    teamA: '',
    teamB: '',
    courtId: '',
    date: new Date().toISOString().split('T')[0],
    time: '18:00',
    duration: 60,
    status: 'Scheduled',
    scoreA: 0,
    scoreB: 0,
  });

  useEffect(() => {
    if (game) {
      // Extract just the date part if it's a full ISO string
      const gameDate = game.date ? new Date(game.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
      
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        type: game.type || '5v5 League',
        teamA: game.teamA || '',
        teamB: game.teamB || '',
        courtId: game.courtId || '',
        date: gameDate,
        time: game.time || '18:00',
        duration: game.duration || 60,
        status: game.status || 'Scheduled',
        scoreA: game.scoreA || 0,
        scoreB: game.scoreB || 0,
      });
    }
  }, [game]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Find the selected court using _id (MongoDB format)
    const selectedCourt = courts.find(c => c._id === formData.courtId);
    
    // Prepare data for backend
    const gameData = {
      type: formData.type,
      teamA: formData.teamA,
      teamB: formData.teamB,
      courtId: formData.courtId, // Send as string (_id)
      courtName: selectedCourt?.name || 'TBD',
      date: new Date(formData.date), // Convert to Date object
      time: formData.time,
      duration: parseInt(formData.duration),
      status: formData.status,
      scoreA: parseInt(formData.scoreA),
      scoreB: parseInt(formData.scoreB),
      spectators: game?.spectators || 0,
    };
    
    onSave(gameData);
  };

  const gameTypes = [
    '2v2 Pickup',
    '3v3 Tournament',
    '4v4 Casual',
    '5v5 League',
    '5v5 Championship',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Game Type and Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Game Type *
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
          >
            {gameTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Status *
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="Scheduled">Scheduled</option>
            <option value="Live">Live</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Teams */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Team A *
          </label>
          <input
            type="text"
            name="teamA"
            value={formData.teamA}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="e.g., Thunder Squad"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Team B *
          </label>
          <input
            type="text"
            name="teamB"
            value={formData.teamB}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="e.g., Lightning Bolts"
          />
        </div>
      </div>

      {/* Court Selection */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">
          Court *
        </label>
        <select
          name="courtId"
          value={formData.courtId}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
        >
          <option value="">Select a court</option>
          {courts.map(court => (
            <option key={court._id} value={court._id}>
              {court.name} - {court.location}
            </option>
          ))}
        </select>
      </div>

      {/* Date, Time, Duration */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Date *
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Time *
          </label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Duration (min) *
          </label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            min="15"
            max="180"
            step="15"
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Scores (only if status is Live or Completed) */}
      {(formData.status === 'Live' || formData.status === 'Completed') && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Team A Score
            </label>
            <input
              type="number"
              name="scoreA"
              value={formData.scoreA}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Team B Score
            </label>
            <input
              type="number"
              name="scoreB"
              value={formData.scoreB}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-white font-semibold transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all"
        >
          {game ? 'Update Game' : 'Schedule Game'}
        </button>
      </div>
    </form>
  );
};

export default GameForm;