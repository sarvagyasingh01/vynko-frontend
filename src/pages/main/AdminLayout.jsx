import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import TopNavbar from '../../components/TopNavbar';
import Dashboard from '../dashboard/Dashboard';
import AddProduct from '../product/AddProduct';
import ManageProducts from '../product/ManageProducts';

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'add-product':
        return <AddProduct />;
      case 'manage-product':
        return <ManageProducts />;
      case 'orders':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-white mb-4">Orders</h1>
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <p className="text-gray-300">Orders management interface would go here...</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 overflow-hidden">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:block">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>

      {/* Sidebar - Mobile */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={toggleSidebar}></div>
          <div className="relative">
            <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <TopNavbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-900/50 to-black/50">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}