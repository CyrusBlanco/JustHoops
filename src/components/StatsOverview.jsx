import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsOverview = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = stat.change > 0;
        const isNegative = stat.change < 0;

        return (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800 p-6 hover:border-zinc-700 transition-all duration-300 hover:scale-105"
          >
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Content */}
            <div className="relative">
              {/* Icon and Change Badge */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-500/20 to-gray-600/20 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                
                {/* Change indicator - hidden if change is 0 */}
                {stat.change !== 0 && (
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                      isPositive
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : isNegative
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-zinc-700 text-zinc-400'
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : isNegative ? (
                      <TrendingDown className="w-3 h-3" />
                    ) : null}
                    {Math.abs(stat.change)}%
                  </div>
                )}
              </div>

              {/* Title */}
              <h3 className="text-sm text-zinc-400 uppercase tracking-wider mb-2 font-semibold">
                {stat.title}
              </h3>

              {/* Value */}
              <p className="text-4xl font-black text-white mb-1 group-hover:text-blue-400 transition-colors duration-300">
                {stat.value}
              </p>

              {/* Subtitle - Live indicator for certain stats */}
              {stat.title === 'Live Matches' && parseInt(stat.value) > 0 && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  <span className="text-xs text-emerald-400 font-semibold">Live Now</span>
                </div>
              )}
            </div>

            {/* Decorative corner accent */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-orange-500/10 to-red-600/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
          </div>
        );
      })}
    </div>
  );
};

export default StatsOverview;