import { Search, Filter, MapPin, Trophy, Users, BarChart3 } from 'lucide-react';

const Header = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'courts', label: 'Courts', icon: MapPin },
    { id: 'games', label: 'Games', icon: Trophy },
    { id: 'players', label: 'Players', icon: Users },
    { id: 'stats', label: 'Stats', icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Logo and Title */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
              HOOPS
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500">Court Management System</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap
                  transition-all duration-200 flex-shrink-0
                  ${isActive
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;