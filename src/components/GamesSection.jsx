import { ChevronDown } from 'lucide-react';
import GameCard from './GameCard';
import { useHoops } from '../context/HoopsContext';
import LoadingSpinner from './LoadingSpinner';

const GamesSection = () => {
  const { games, loading } = useHoops();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!games || games.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-zinc-500 text-lg">No games scheduled</p>
        <p className="text-zinc-600 text-sm mt-2">Schedule games from the admin panel</p>
      </div>
    );
  }

  return (
    <div>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Active Games</h2>
      </div>
      
      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <GameCard key={game._id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default GamesSection;