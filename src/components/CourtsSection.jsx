import { Calendar } from 'lucide-react';
import CourtCard from './CourtCard';
import { useHoops } from '../context/HoopsContext';
import LoadingSpinner from './LoadingSpinner';

const CourtsSection = () => {
  const { courts, loading } = useHoops();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!courts || courts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-zinc-500 text-lg">No courts available</p>
        <p className="text-zinc-600 text-sm mt-2">Add courts from the admin panel</p>
      </div>
    );
  }

  return (
    <div>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Available Courts</h2>
        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <Calendar className="w-4 h-4" />
          <span>Today, {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>
      
      {/* Courts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courts.map((court) => (
          <CourtCard key={court._id} court={court} />
        ))}
      </div>
    </div>
  );
};

export default CourtsSection;