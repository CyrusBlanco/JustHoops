import { TrendingUp, Users, Trophy, MapPin, Activity, Target } from 'lucide-react';
import { useHoops } from '../context/HoopsContext';
import LoadingSpinner from './LoadingSpinner';

const StatsSection = () => {
  const { courts, games, players, loading } = useHoops();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!courts || !games || !players) {
    return (
      <div className="text-center py-20">
        <p className="text-zinc-500">Unable to load statistics</p>
      </div>
    );
  }

  // Calculate detailed statistics
  const totalCourts = courts.length;
  const availableCourts = courts.filter(c => c.status === 'available').length;
  const totalGames = games.length;
  const liveGames = games.filter(g => g.status === 'Live').length;
  const scheduledGames = games.filter(g => g.status === 'Scheduled').length;
  const completedGames = games.filter(g => g.status === 'Completed').length;
  const totalPlayers = players.length;
  const activePlayers = players.filter(p => p.status === 'active').length;

  // Calculate average court rating
  const avgRating = courts.length > 0
    ? (courts.reduce((sum, c) => sum + (c.rating || 0), 0) / courts.length).toFixed(1)
    : '0.0';


  // Game types
  const gameTypes = games.reduce((acc, game) => {
    acc[game.type] = (acc[game.type] || 0) + 1;
    return acc;
  }, {});

  const statsCards = [
    {
      title: 'Total Courts',
      value: totalCourts,
      subtitle: `${availableCourts} available`,
      icon: MapPin,
      color: 'blue'
    },
    {
      title: 'Total Games',
      value: totalGames,
      subtitle: `${liveGames} live, ${scheduledGames} scheduled`,
      icon: Trophy,
      color: 'orange'
    },
    {
      title: 'Total Players',
      value: totalPlayers,
      subtitle: `${activePlayers} active`,
      icon: Users,
      color: 'emerald'
    },
    {
      title: 'Avg Rating',
      value: avgRating,
      subtitle: `Across all courts`,
      icon: TrendingUp,
      color: 'purple'
    }
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-black text-white mb-2">Statistics & Analytics</h2>
        <p className="text-zinc-500"> insights from database</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
            orange: 'bg-orange-500/20 border-orange-500/30 text-orange-400',
            emerald: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400',
            purple: 'bg-purple-500/20 border-purple-500/30 text-purple-400'
          };

          return (
            <div
              key={index}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors"
            >
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${colorClasses[stat.color]}`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-sm text-zinc-400 uppercase tracking-wider mb-2">
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-xs text-zinc-500">{stat.subtitle}</p>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
       
        
      </div>

      {/* Game Status Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <Activity className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{liveGames}</p>
              <p className="text-sm text-zinc-500">Live Games</p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{scheduledGames}</p>
              <p className="text-sm text-zinc-500">Scheduled</p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{completedGames}</p>
              <p className="text-sm text-zinc-500">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Game Types Distribution */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Game Types Distribution</h3>
        {Object.keys(gameTypes).length > 0 ? (
          <div className="space-y-4">
            {Object.entries(gameTypes).map(([type, count]) => {
              const percentage = ((count / totalGames) * 100).toFixed(0);
              return (
                <div key={type}>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-zinc-400">{type}</span>
                    <span className="text-white font-semibold">{count} games ({percentage}%)</span>
                  </div>
                  <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-zinc-500 text-center py-8">No game type data available</p>
        )}
      </div>
    </div>
  );
};

export default StatsSection;