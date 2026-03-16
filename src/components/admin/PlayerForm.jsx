import { useState, useEffect } from 'react';

const PlayerForm = ({ player, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: 'Point Guard',
    jerseyNumber: '',
    height: '',
    weight: '',
    team: '',
    status: 'active',
  });

  useEffect(() => {
    if (player) {
      
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: player.name || '',
        email: player.email || '',
        phone: player.phone || '',
        position: player.position || 'Point Guard',
        jerseyNumber: player.jerseyNumber || '',
        height: player.height || '',
        weight: player.weight || '',
        team: player.team || '',
        status: player.status || 'active',
      });
    }
  }, [player]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...player,
      ...formData,
      id: player?.id || Date.now(),
      avatar: player?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`,
      joinDate: player?.joinDate || new Date().toISOString().split('T')[0],
      stats: player?.stats || {
        gamesPlayed: 0,
        points: 0,
        assists: 0,
        rebounds: 0,
        steals: 0,
        blocks: 0,
        avgPoints: 0,
        avgAssists: 0,
        avgRebounds: 0,
      },
    });
  };

  const positions = [
    'Point Guard',
    'Shooting Guard',
    'Small Forward',
    'Power Forward',
    'Center',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-4">Personal Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-white mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
              placeholder="e.g., John Smith"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
              placeholder="john@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>
      </div>

      {/* Player Details */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-4">Player Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Position *
            </label>
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-orange-500 transition-colors"
            >
              {positions.map(pos => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Jersey Number *
            </label>
            <input
              type="number"
              name="jerseyNumber"
              value={formData.jerseyNumber}
              onChange={handleChange}
              required
              min="0"
              max="99"
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
              placeholder="23"
            />
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
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-orange-500 transition-colors"
            >
              <option value="active">Active</option>
              <option value="injured">Injured</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Physical Stats */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-4">Physical Stats</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Height
            </label>
            <input
              type="text"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
              placeholder='6\2'
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Weight
            </label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
              placeholder="185 lbs"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Team *
            </label>
            <input
              type="text"
              name="team"
              value={formData.team}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
              placeholder="e.g., Thunder Squad"
            />
          </div>
        </div>
      </div>

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
          className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-lg hover:shadow-2xl hover:shadow-orange-500/50 transition-all"
        >
          {player ? 'Update Player' : 'Add Player'}
        </button>
      </div>
    </form>
  );
};

export default PlayerForm;