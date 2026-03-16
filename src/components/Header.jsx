import { Plus, Search, Filter, ChevronDown, Trophy } from 'lucide-react';

const Header = ({ 
  
  activeTab,
  setActiveTab 
}) => {
  const tabs = ['courts', 'games', 'players', 'stats'];

  return (
    <header className="relative border-b border-zinc-800 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center shadow-2xl shadow-orange-500/50 transform hover:rotate-6 transition-transform duration-300">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                HOOPS
              </h1>
              <p className="text-sm text-zinc-500 font-medium">Court Management System</p>
            </div>
          </div>

          {/* Action Button */}
        </div>
        
        {/* Search and Filter Bar */}
        <div className="flex items-center gap-4">
          
          
          {/* Filter Button */}
         
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mt-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg font-semibold capitalize transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg shadow-gray-500/30'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;