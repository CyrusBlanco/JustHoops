import { useState } from 'react';
import { Plus, Edit, Trash2, MapPin, DollarSign, Users } from 'lucide-react';
import { useHoops } from '../../context/HoopsContext';
import Modal from '../Modal';
import CourtForm from './CourtForm';
import LoadingSpinner from '../LoadingSpinner';

const AdminCourts = () => {
  const { courts, addCourt, updateCourt, deleteCourt, loading } = useHoops();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourt, setEditingCourt] = useState(null);

  const handleAdd = () => {
    setEditingCourt(null);
    setIsModalOpen(true);
  };

  const handleEdit = (court) => {
    setEditingCourt(court);
    setIsModalOpen(true);
  };

  const handleSave = async (courtData) => {
    let result;
    if (editingCourt) {
      // Update existing court
      result = await updateCourt(courtData._id, courtData);
    } else {
      // Add new court
      result = await addCourt(courtData);
    }
    
    if (result.success) {
      setIsModalOpen(false);
      setEditingCourt(null);
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  const handleDelete = async (courtId) => {
    if (window.confirm('Are you sure you want to delete this court?')) {
      const result = await deleteCourt(courtId);
      if (!result.success) {
        alert(`Error deleting court: ${result.error}`);
      }
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!courts) {
    return (
      <div className="text-center py-20">
        <p className="text-zinc-500">Unable to load courts</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'occupied':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'maintenance':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30';
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Court Management</h1>
          <p className="text-zinc-500">Manage all basketball courts</p>
        </div>
        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Court
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-sm text-zinc-400 mb-2">Total Courts</p>
          <p className="text-3xl font-bold text-white">{courts.length}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-sm text-zinc-400 mb-2">Available</p>
          <p className="text-3xl font-bold text-emerald-400">
            {courts.filter((c) => c.status === 'available').length}
          </p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-sm text-zinc-400 mb-2">Occupied</p>
          <p className="text-3xl font-bold text-orange-400">
            {courts.filter((c) => c.status === 'occupied').length}
          </p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-sm text-zinc-400 mb-2">Maintenance</p>
          <p className="text-3xl font-bold text-red-400">
            {courts.filter((c) => c.status === 'maintenance').length}
          </p>
        </div>
      </div>

      {/* Courts Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Court
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Capacity
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Rate/Hour
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {courts.map((court) => (
                <tr key={court._id} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-500/20 to-gray-600/20 border border-blue-500/30 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{court.name}</p>
                        <p className="text-xs text-zinc-500">{court.games} total games</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-400">{court.location}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(court.status)}`}>
                      {court.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <Users className="w-4 h-4" />
                      {court.capacity}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-green-400">
                      <DollarSign className="w-4 h-4" />
                      {court.hourlyRate}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-white font-semibold">
                    ⭐ {court.rating}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(court)}
                        className="p-2 hover:bg-zinc-700 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4 text-blue-400" />
                      </button>
                      <button
                        onClick={() => handleDelete(court._id)}
                        className="p-2 hover:bg-zinc-700 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCourt(null);
        }}
        title={editingCourt ? 'Edit Court' : 'Add New Court'}
        size="large"
      >
        <CourtForm
          court={editingCourt}
          onSave={handleSave}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingCourt(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default AdminCourts;