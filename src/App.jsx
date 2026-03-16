import { useState, useMemo } from 'react';
import { MapPin, Users, Trophy, TrendingUp, Settings } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import { useHoops } from './context/HoopsContext';

// Components
import Header from './components/Header';
import BackgroundEffects from './components/BackgroundEffects';
import StatsOverview from './components/StatsOverview';
import CourtsSection from './components/CourtsSection';
import GamesSection from './components/GamesSection';
import PlayersSection from './components/PlayersSection';
import StatsSection from './components/StatsSection';
import LoadingSpinner from './components/LoadingSpinner';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';

// Constants
import { TABS } from './utils/constants';

/**
 * Main App Component
 * Manages the overall application state and navigation
 */
function App() {
  const { isAuthenticated, isAdmin } = useAuth();
  // eslint-disable-next-line no-unused-vars
  const { courts, games, players, loading } = useHoops();
  
  // State management
  const [activeTab, setActiveTab] = useState(TABS.COURTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Calculate real-time stats from database
  const stats = useMemo(() => {
    if (!courts || !games || !players) {
      return [
        { title: 'Active Courts', value: '0', change: 0, icon: MapPin },
        { title: "Today's Games", value: '0', change: 0, icon: Trophy },
        { title: 'Total Players', value: '0', change: 0, icon: Users },
        { title: 'Live Matches', value: '0', change: 0, icon: TrendingUp },
      ];
    }

    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Calculate stats
    const activeCourts = courts.filter(c => c.status === 'available').length;
    const todaysGames = games.filter(game => {
      const gameDate = new Date(game.date);
      return gameDate >= today && gameDate < tomorrow;
    }).length;
    const totalPlayers = players.length;
    const liveMatches = games.filter(g => g.status === 'Live').length;

    return [
      { title: 'Active Courts', value: activeCourts.toString(), change: 0, icon: MapPin },
      { title: "Today's Games", value: todaysGames.toString(), change: 0, icon: Trophy },
      { title: 'Total Players', value: totalPlayers.toString(), change: 0, icon: Users },
      { title: 'Live Matches', value: liveMatches.toString(), change: 0, icon: TrendingUp },
    ];
  }, [courts, games, players]);

  // Handle admin button click
  const handleAdminClick = () => {
    if (isAuthenticated && isAdmin()) {
      setShowAdmin(true);
    } else {
      setShowLogin(true);
    }
  };

  // Show login modal
  if (showLogin) {
    return <Login onClose={() => setShowLogin(false)} />;
  }

  // Show admin panel if authenticated and admin
  if (showAdmin) {
    return <AdminPanel onClose={() => setShowAdmin(false)} />;
  }

  // Render section based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case TABS.COURTS:
        return <CourtsSection />;
      case TABS.GAMES:
        return <GamesSection />;
      case TABS.PLAYERS:
        return <PlayersSection />;
      case TABS.STATS:
        return <StatsSection />;
      default:
        return <CourtsSection courts={courts} />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Animated background effects */}
      <BackgroundEffects />

      {/* Admin Button - Floating */}
      <button
        onClick={handleAdminClick}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-2xl shadow-orange-500/50 flex items-center justify-center hover:scale-110 transition-transform duration-300 z-50 group"
        title="Open Admin Panel"
      >
        <Settings className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Header with navigation */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main content area */}
      <main className="relative max-w-7xl mx-auto px-6 py-8">
        {/* Stats overview cards */}
        <StatsOverview stats={stats} />

        {/* Dynamic content based on active tab */}
        {renderContent()}
      </main>
    </div>
  );
}

export default App;