import { useEffect, useState } from 'react';
import { TrendingUp, DollarSign, Activity, Users as UsersIcon, MapPin, Trophy, RefreshCw } from 'lucide-react';
import { useHoops } from '../../context/HoopsContext';
import LoadingSpinner from '../LoadingSpinner';

const AdminDashboard = () => {
  const { courts, games, players, loading } = useHoops();
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState(null);

  // Calculate statistics from real data
  useEffect(() => {
    if (!courts || !games || !players) return;

    // Calculate overview stats
    const totalRevenue = courts.reduce((sum, court) => sum + (court.hourlyRate || 0) * (court.games || 0), 0);
    const activePlayers = players.filter(p => p.status === 'active').length;
    const totalGames = games.length;
    const averageRating = courts.length > 0 
      ? courts.reduce((sum, court) => sum + (court.rating || 0), 0) / courts.length 
      : 0;

    // Court analytics
    const courtsAnalytics = courts.map(court => ({
      id: court._id,
      courtName: court.name,
      utilization: Math.min(((court.games || 0) / 30) * 100, 100).toFixed(0), // Assume 30 games is 100%
      revenue: (court.hourlyRate || 0) * (court.games || 0),
      bookings: court.games || 0,
    }));

    // Game types distribution
    const gameTypesCount = games.reduce((acc, game) => {
      acc[game.type] = (acc[game.type] || 0) + 1;
      return acc;
    }, {});

    const gameTypes = Object.entries(gameTypesCount).map(([type, count]) => ({
      type,
      count,
      percentage: ((count / totalGames) * 100).toFixed(0)
    }));

    // Top players by points
    const topPlayers = players
      .filter(p => p.stats && p.stats.ppg)
      .sort((a, b) => (b.stats.ppg * (b.stats.gamesPlayed || 0)) - (a.stats.ppg * (a.stats.gamesPlayed || 0)))
      .slice(0, 5)
      .map(player => ({
        id: player._id,
        name: player.name,
        points: Math.round((player.stats.ppg || 0) * (player.stats.gamesPlayed || 0)),
        gamesPlayed: player.stats.gamesPlayed || 0
      }));

    // Recent activity (last 6 months of games)
    const monthlyRevenue = [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    
    months.forEach((month, index) => {
      const monthGames = games.filter(game => {
        const gameDate = new Date(game.date);
        return gameDate.getMonth() === index;
      });
      
      monthlyRevenue.push({
        month,
        revenue: monthGames.length * 50, // Assume $50 per game
        bookings: monthGames.length
      });
    });

    // Status counts
    const availableCourts = courts.filter(c => c.status === 'available').length;
    const liveGames = games.filter(g => g.status === 'Live').length;
    const scheduledGames = games.filter(g => g.status === 'Scheduled').length;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStats({
      overview: {
        totalRevenue,
        activePlayers,
        totalGames,
        averageRating,
        availableCourts,
        liveGames,
        scheduledGames,
        totalCourts: courts.length,
        totalPlayers: players.length
      },
      courtsAnalytics,
      gameTypes,
      topPlayers,
      monthlyRevenue
    });
  }, [courts, games, players]);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Force a re-render by triggering useEffect
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  if (loading || !stats) {
    return <LoadingSpinner />;
  }

  const { overview, courtsAnalytics, gameTypes, topPlayers, monthlyRevenue } = stats;

  // Stats cards data
  const statsCards = [
    {
      title: 'Total Revenue',
      value: `$${overview.totalRevenue.toLocaleString()}`,
      subtitle: `${overview.totalCourts} courts`,
      icon: DollarSign,
      color: 'emerald',
    },
    {
      title: 'Active Players',
      value: overview.activePlayers,
      subtitle: `${overview.totalPlayers} total`,
      icon: UsersIcon,
      color: 'blue',
    },
    {
      title: 'Total Games',
      value: overview.totalGames,
      subtitle: `${overview.liveGames} live now`,
      icon: Activity,
      color: 'orange',
    },
    {
      title: 'Avg Rating',
      value: overview.averageRating.toFixed(1),
      subtitle: `${overview.availableCourts} available`,
      icon: TrendingUp,
      color: 'purple',
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Dashboard Overview</h1>
          <p className="text-zinc-500">Real-time data from your MongoDB database</p>
        </div>
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg flex items-center gap-2 text-white transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            emerald: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400',
            blue: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
            orange: 'bg-orange-500/20 border-orange-500/30 text-orange-400',
            purple: 'bg-purple-500/20 border-purple-500/30 text-purple-400',
          };

          return (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 p-6 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${colorClasses[stat.color]}`}>
                  <Icon className="w-6 h-6" />
                </div>
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

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{overview.availableCourts}</p>
            <p className="text-xs text-zinc-500">Available Courts</p>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
            <Activity className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{overview.liveGames}</p>
            <p className="text-xs text-zinc-500">Live Games Now</p>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{overview.scheduledGames}</p>
            <p className="text-xs text-zinc-500">Scheduled Games</p>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Court Analytics */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Court Performance</h3>
          {courtsAnalytics.length > 0 ? (
            <div className="space-y-4">
              {courtsAnalytics.slice(0, 5).map((court) => (
                <div key={court.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">{court.courtName}</span>
                    <span className="text-white font-semibold">{court.utilization}%</span>
                  </div>
                  <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${court.utilization}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <span>${court.revenue.toLocaleString()} revenue</span>
                    <span>{court.bookings} bookings</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-zinc-500 text-center py-8">No court data available</p>
          )}
        </div>

        {/* Monthly Revenue Chart */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Monthly Activity</h3>
          <div className="space-y-3">
            {monthlyRevenue.map((month, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-zinc-400 w-12">{month.month}</span>
                <div className="flex-1 mx-4">
                  <div className="relative h-8 bg-zinc-800 rounded-lg overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-end pr-2 transition-all duration-500"
                      style={{ width: `${Math.min((month.revenue / 500) * 100, 100)}%` }}
                    >
                      {month.revenue > 0 && (
                        <span className="text-xs font-semibold text-white">
                          ${month.revenue}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-zinc-500 w-16 text-right">
                  {month.bookings} games
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Game Types Distribution */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Game Types</h3>
          {gameTypes.length > 0 ? (
            <div className="space-y-4">
              {gameTypes.map((game, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-zinc-400">{game.type}</span>
                    <span className="text-white font-semibold">{game.count} games ({game.percentage}%)</span>
                  </div>
                  <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${game.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-zinc-500 text-center py-8">No game data available</p>
          )}
        </div>

        {/* Top Players Leaderboard */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Top Scorers</h3>
          {topPlayers.length > 0 ? (
            <div className="space-y-3">
              {topPlayers.map((player, index) => (
                <div
                  key={player.id}
                  className="flex items-center gap-4 p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    index === 0 ? 'bg-yellow-500/20 text-yellow-500 border-2 border-yellow-500' :
                    index === 1 ? 'bg-zinc-400/20 text-zinc-400 border-2 border-zinc-400' :
                    index === 2 ? 'bg-orange-600/20 text-orange-600 border-2 border-orange-600' :
                    'bg-zinc-700 text-zinc-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                      {player.name}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {player.gamesPlayed} games played
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-orange-500">{player.points}</p>
                    <p className="text-xs text-zinc-500">points</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-zinc-500 text-center py-8">No player stats available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;