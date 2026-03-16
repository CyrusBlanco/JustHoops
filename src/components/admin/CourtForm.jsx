import { useState, useEffect } from 'react';

const CourtForm = ({ court, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    status: 'available',
    capacity: 10,
    hourlyRate: 50,
    rating: 4.5,
    description: '',
    amenities: [],
  });

  const [newAmenity, setNewAmenity] = useState('');

  useEffect(() => {
    if (court) {
     
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: court.name || '',
        location: court.location || '',
        status: court.status || 'available',
        capacity: court.capacity || 10,
        hourlyRate: court.hourlyRate || 50,
        rating: court.rating || 4.5,
        description: court.description || '',
        amenities: court.amenities || [],
      });
    }
  }, [court]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleAddAmenity = () => {
    if (newAmenity.trim()) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()]
      }));
      setNewAmenity('');
    }
  };

  const handleRemoveAmenity = (index) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...court,
      ...formData,
      id: court?.id || Date.now(),
      games: court?.games || 0,
      createdAt: court?.createdAt || new Date().toISOString().split('T')[0],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Court Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="e.g., Downtown Court"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Location *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="e.g., Main Street"
          />
        </div>
      </div>

      {/* Status and Capacity */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Status *
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Capacity *
          </label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            required
            min="2"
            max="50"
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Hourly Rate ($) *
          </label>
          <input
            type="number"
            name="hourlyRate"
            value={formData.hourlyRate}
            onChange={handleChange}
            required
            min="0"
            step="5"
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
          placeholder="Describe the court features..."
        />
      </div>

      {/* Amenities */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">
          Amenities
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newAmenity}
            onChange={(e) => setNewAmenity(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAmenity())}
            className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="e.g., Indoor, Air Conditioned"
          />
          <button
            type="button"
            onClick={handleAddAmenity}
            className="px-6 py-3 bg-blue-500 border border-blue-500/30 text-white rounded-lg hover:bg-orange-500/30 transition-colors font-semibold"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.amenities.map((amenity, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-full text-sm text-white flex items-center gap-2"
            >
              {amenity}
              <button
                type="button"
                onClick={() => handleRemoveAmenity(index)}
                className="text-zinc-500 hover:text-red-400 transition-colors"
              >
                
              </button>
            </span>
          ))}
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
          className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-2xl hover:shadow-orange-500/50 transition-all"
        >
          {court ? 'Update Court' : 'Create Court'}
        </button>
      </div>
    </form>
  );
};

export default CourtForm;