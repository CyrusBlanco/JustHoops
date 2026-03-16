import { User, TrendingUp, Award, Activity } from 'lucide-react';

const PlayerCard = ({ player }) => {
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
    <div className="group relative overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 hover:border-gray-500/50 transition-all duration-300 p-6">
      {/* Header with Avatar and Info */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-500 to-gray-600 p-0.5">
            <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center">
              {player.avatar ? (
                <img 
                  src={player.avatar} 
                  alt={player.name}
                  className="w-full h-full rounded-full"
                />
              ) : (
                <User className="w-8 h-8 text-orange-500" />
              )}
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-zinc-900 border-2 border-blue-500 flex items-center justify-center text-xs font-bold text-gray-500">
            {player.jerseyNumber}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-white truncate">{player.name}</h3>
          <p className="text-sm text-zinc-400">{player.position}</p>
          <p className="text-xs text-zinc-500">{player.team}</p>
        </div>

        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(player.status)}`}>
          {player.status}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-4 pt-4 border-t border-zinc-800">
        <div className="text-center">
          <Activity className="w-4 h-4 text-blue-500 mx-auto mb-1" />
          <p className="text-xl font-bold text-white">{player.stats.gamesPlayed}</p>
          <p className="text-xs text-zinc-500 uppercase">Games</p>
        </div>
        <div className="text-center">
          <TrendingUp className="w-4 h-4 text-blue-500 mx-auto mb-1" />
          <p className="text-xl font-bold text-white">{player.stats.avgPoints.toFixed(1)}</p>
          <p className="text-xs text-zinc-500 uppercase">PPG</p>
        </div>
        <div className="text-center">
          <Award className="w-4 h-4 text-blue-500 mx-auto mb-1" />
          <p className="text-xl font-bold text-white">{player.stats.avgAssists.toFixed(1)}</p>
          <p className="text-xs text-zinc-500 uppercase">APG</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
      
        
      </div>
    </div>
  );
};

export default PlayerCard;