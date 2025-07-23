import { useState } from 'react';
import { 
  Bell, 
  Search, 
  Menu, 
  User, 
  Settings, 
  LogOut, 
  ChevronDown 
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';

export default function TopNavbar({ toggleSidebar, isSidebarOpen }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications] = useState(3); // Example notification count

  const profileMenuItems = [
    { icon: User, label: 'Profile', action: () => console.log('Profile clicked') },
    { icon: Settings, label: 'Settings', action: () => console.log('Settings clicked') },
    { icon: LogOut, label: 'Logout', action: () => dispatch(logout()) }
  ];

  return (
    <header className="h-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-white/10 flex items-center justify-between px-6">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        {/* Sidebar Toggle (Mobile) */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-80 pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200">
          <Bell className="w-5 h-5" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {notifications}
            </span>
          )}
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-3 p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-white to-gray-300 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-black" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-white">Admin</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-lg border border-white/20 rounded-lg shadow-xl py-2 z-50">
              {profileMenuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    item.action();
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}