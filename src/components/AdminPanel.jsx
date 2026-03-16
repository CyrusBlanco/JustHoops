import { useState } from 'react';
import { Settings, BarChart3, Users, MapPin, Trophy, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from './admin/AdminDashboard';
import AdminCourts from './admin/AdminCourts';
import AdminGames from './admin/AdminGames';
import AdminPlayers from './admin/AdminPlayers';
import AdminSettings from './admin/AdminSettings';

const AdminPanel = ({ onClose }) => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    onClose();
  };

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const sections = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'courts', label: 'Courts', icon: MapPin },
    { id: 'games', label: 'Games', icon: Trophy },
    { id: 'players', label: 'Players', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'courts':
        return <AdminCourts />;
      case 'games':
        return <AdminGames />;
      case 'players':
        return <AdminPlayers />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-black flex relative">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center text-white hover:bg-zinc-800 transition-colors"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Admin Header */}
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Admin Panel</h2>
              <p className="text-xs text-zinc-500">Management Console</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => handleSectionChange(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{section.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* User Info & Logout */}
        <div className="mt-auto p-4 border-t border-zinc-800 space-y-2">
          {/* User Info */}
          {user && (
            <div className="px-4 py-2 bg-zinc-800/50 rounded-lg">
              <p className="text-xs text-zinc-500">Logged in as</p>
              <p className="text-sm font-semibold text-white">{user.username}</p>
              <p className="text-xs text-blue-400">{user.role}</p>
            </div>
          )}
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>

        {/* Exit Button */}
        <div className="p-4 border-t border-zinc-800">
          <button
            onClick={onClose}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Exit Admin</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto w-full lg:w-auto">
        <div className="p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;