import { Trophy } from 'lucide-react';

const GameCard = ({ game }) => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 hover:border-gray-500/50 transition-all duration-300 group">
      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative p-5">
        {/* Game Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-500/20 to-gray-600/20 border border-gray-500/30 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">{game.type}</h4>
              <p className="text-xs text-zinc-500">{game.time}</p>
            </div>
          </div>
          
          {/* Status Badge */}
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-500/10 text-green-400 border border-gray-500/20">
            {game.status}
          </span>
        </div>

        {/* Score Display */}
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <p className="text-xs text-zinc-500 mb-1">Team A</p>
            <p className="text-2xl font-bold text-white">{game.scoreA}</p>
          </div>
          <div className="px-4 text-zinc-600 text-xl font-bold">VS</div>
          <div className="text-center flex-1">
            <p className="text-xs text-zinc-500 mb-1">Team B</p>
            <p className="text-2xl font-bold text-white">{game.scoreB}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;