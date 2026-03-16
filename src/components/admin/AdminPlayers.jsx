import { useState } from 'react';
import { Plus, Edit, Trash2, User } from 'lucide-react';
import { useHoops } from '../../context/HoopsContext';
import Modal from '../Modal';
import PlayerForm from './PlayerForm';
import LoadingSpinner from '../LoadingSpinner';

const AdminPlayers = () => {
  const { players, addPlayer, updatePlayer, deletePlayer, loading } = useHoops();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);

  const handleAdd = () => {
    setEditingPlayer(null);
    setIsModalOpen(true);
  };

  const handleEdit = (player) => {
    setEditingPlayer(player);
    setIsModalOpen(true);
  };

  const handleSave = async (playerData) => {
    let result;
    if (editingPlayer) {
      // Update existing player
      result = await updatePlayer(playerData._id, playerData);
    } else {
      // Add new player
      result = await addPlayer(playerData);
    }
    
    if (result.success) {
      setIsModalOpen(false);
      setEditingPlayer(null);
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  const handleDelete = async (playerId) => {
    if (window.confirm('Are you sure you want to delete this player?')) {
      const result = await deletePlayer(playerId);
      if (!result.success) {
        alert(`Error deleting player: ${result.error}`);
      }
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!players) {
    return (
      <div className="text-center py-20">
        <p className="text-zinc-500">Unable to load players</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'injured':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'inactive':
        return 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30';
      default:
        return 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Player Management</h1>
          <p className="text-zinc-500">Manage player profiles and statistics</p>
        </div>
        <button 
          onClick={handleAdd}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Player
        </button>
      </div>

      {/* Players Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-zinc-800">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase">Player</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase">Position</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase">Team</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase">Games</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase">PPG</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase">APG</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase">Status</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-zinc-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {players.map((player) => (
              <tr key={player._id} className="hover:bg-zinc-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 p-0.5">
                      <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-500" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{player.name}</p>
                      <p className="text-xs text-zinc-500">#{player.jerseyNumber}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-zinc-400">{player.position}</td>
                <td className="px-6 py-4 text-sm text-zinc-400">{player.team}</td>
                <td className="px-6 py-4 text-sm text-white font-semibold">{player.stats.gamesPlayed}</td>
                <td className="px-6 py-4 text-sm text-white font-semibold">{player.stats.avgPoints.toFixed(1)}</td>
                <td className="px-6 py-4 text-sm text-white font-semibold">{player.stats.avgAssists.toFixed(1)}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(player.status)}`}>
                    {player.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleEdit(player)}
                      className="p-2 hover:bg-zinc-700 rounded-lg transition-colors">
                      <Edit className="w-4 h-4 text-blue-400" />
                    </button>
                    <button 
                      onClick={() => handleDelete(player._id)}
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
          setEditingPlayer(null);
        }}
        title={editingPlayer ? 'Edit Player' : 'Add New Player'}
        size="large"
      >
        <PlayerForm
          player={editingPlayer}
          onSave={handleSave}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingPlayer(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default AdminPlayers;