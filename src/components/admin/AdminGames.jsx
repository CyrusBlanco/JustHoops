import { useState } from 'react';
import { Plus, Edit, Trash2, Trophy } from 'lucide-react';
import { useHoops } from '../../context/HoopsContext';
import Modal from '../Modal';
import GameForm from './GameForm';
import LoadingSpinner from '../LoadingSpinner';

const AdminGames = () => {
  const { games, addGame, updateGame, deleteGame, loading } = useHoops();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGame, setEditingGame] = useState(null);

  const handleAdd = () => {
    setEditingGame(null);
    setIsModalOpen(true);
  };

  const handleEdit = (game) => {
    setEditingGame(game);
    setIsModalOpen(true);
  };

  const handleSave = async (gameData) => {
    let result;
    if (editingGame) {
      // Update existing game
      result = await updateGame(gameData._id || editingGame._id, gameData);
    } else {
      // Add new game
      result = await addGame(gameData);
    }
    
    if (result.success) {
      setIsModalOpen(false);
      setEditingGame(null);
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  const handleDelete = async (gameId) => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      const result = await deleteGame(gameId);
      if (!result.success) {
        alert(`Error deleting game: ${result.error}`);
      }
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!games) {
    return (
      <div className="text-center py-20">
        <p className="text-zinc-500">Unable to load games</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Live':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Scheduled':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Completed':
        return 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30';
      default:
        return 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Game Management</h1>
          <p className="text-zinc-500">Schedule and manage all games</p>
        </div>
        <button 
          onClick={handleAdd}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Schedule Game
        </button>
      </div>

      {/* Games Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-zinc-800">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase">Game</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase">Teams</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase">Court</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase">Time</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase">Score</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase">Status</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-zinc-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {games.map((game) => (
              <tr key={game._id} className="hover:bg-zinc-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Trophy className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-sm font-semibold text-white">{game.type}</p>
                      <p className="text-xs text-zinc-500">{game.duration} minutes</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-white">{game.teamA}</p>
                  <p className="text-xs text-zinc-500">vs {game.teamB}</p>
                </td>
                <td className="px-6 py-4 text-sm text-zinc-400">{game.courtName}</td>
                <td className="px-6 py-4">
                  <p className="text-sm text-white">{game.time}</p>
                  <p className="text-xs text-zinc-500">{game.date}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-white">
                    {game.scoreA} - {game.scoreB}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(game.status)}`}>
                    {game.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleEdit(game)}
                      className="p-2 hover:bg-zinc-700 rounded-lg transition-colors">
                      <Edit className="w-4 h-4 text-blue-400" />
                    </button>
                    <button 
                      onClick={() => handleDelete(game._id)}
                      className="p-2 hover:bg-zinc-700 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingGame(null);
        }}
        title={editingGame ? 'Edit Game' : 'Schedule New Game'}
        size="large"
      >
        <GameForm
          game={editingGame}
          onSave={handleSave}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingGame(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default AdminGames;