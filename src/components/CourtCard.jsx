import { MapPin, Users, Clock, Star } from 'lucide-react';

const CourtCard = ({ court }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 hover:border-gray-500 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/20">
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative p-6">
        {/* Court Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">
              <MapPin className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">{court.name}</h3>
              <p className="text-sm text-zinc-400">{court.location}</p>
            </div>
          </div>
          
          {/* Status Badge */}
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            court.status === 'available' 
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            {court.status}
          </span>
        </div>

        {/* Court Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-zinc-700/50">
          <div className="text-center">
            <Users className="w-4 h-4 text-blue-500 mx-auto mb-1" />
            <p className="text-2xl font-bold text-white">{court.capacity}</p>
            <p className="text-xs text-zinc-500 uppercase tracking-wider">Players</p>
          </div>
          <div className="text-center">
            <Clock className="w-4 h-4 text-blue-500 mx-auto mb-1" />
            <p className="text-2xl font-bold text-white">{court.games || 0}</p>
            <p className="text-xs text-zinc-500 uppercase tracking-wider">Games</p>
          </div>
          <div className="text-center">
            <Star className="w-4 h-4 text-blue-500 mx-auto mb-1" />
            <p className="text-2xl font-bold text-white">{court.rating || 0}</p>
            <p className="text-xs text-zinc-500 uppercase tracking-wider">Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourtCard;