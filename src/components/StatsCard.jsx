import { TrendingUp } from 'lucide-react';

// eslint-disable-next-line no-unused-vars
const StatsCard = ({ title, value, change, icon: Icon }) => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 p-6 group hover:border-gray-500/50 transition-all duration-300">
      {/* Glow effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
      
      <div className="relative">
        {/* Header with icon and change indicator */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-500/20 to-gray-600/20 border border-gray-500/30 flex items-center justify-center">
            <Icon className="w-6 h-6 text-blue-400" />
          </div>
          
          {change && (
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
              change > 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
            }`}>
              <TrendingUp className="w-3 h-3" />
              {Math.abs(change)}%
            </div>
          )}
        </div>
        
        {/* Title and value */}
        <h3 className="text-sm text-zinc-400 uppercase tracking-wider mb-2">{title}</h3>
        <p className="text-4xl font-bold text-white tracking-tight">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;