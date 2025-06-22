import { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  ChevronDown, 
  ChevronRight 
} from 'lucide-react';

export default function Sidebar({ currentPage, setCurrentPage }) {
  const [isProductOpen, setIsProductOpen] = useState(false);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard'
    },
    {
      id: 'product',
      label: 'Product',
      icon: Package,
      hasDropdown: true,
      subItems: [
        { id: 'add-product', label: 'Add Product', path: '/product/add' },
        { id: 'manage-product', label: 'Manage Product', path: '/product/manage' }
      ]
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: ShoppingBag,
      path: '/orders'
    }
  ];

  const handleItemClick = (itemId) => {
    if (itemId === 'product') {
      setIsProductOpen(!isProductOpen);
    } else {
      setCurrentPage(itemId); // This will change the page in AdminLayout
    }
  };

  const handleSubItemClick = (subItemId) => {
    setCurrentPage(subItemId); // This will change the page in AdminLayout
  };

  return (
    <div className="h-screen w-64 bg-gradient-to-b from-black via-gray-900 to-gray-800 border-r border-white/10 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-white to-gray-300 rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-xl">A</span>
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">Admin Panel</h2>
            <p className="text-gray-400 text-sm">Management System</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <div key={item.id}>
            {/* Main Menu Item */}
            <button
              onClick={() => handleItemClick(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${
                currentPage === item.id || (item.hasDropdown && isProductOpen)
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.hasDropdown && (
                <div className="transition-transform duration-200">
                  {isProductOpen ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </div>
              )}
            </button>

            {/* Dropdown Sub Items */}
            {item.hasDropdown && isProductOpen && (
              <div className="mt-2 ml-4 space-y-1">
                {item.subItems.map((subItem) => (
                  <button
                    key={subItem.id}
                    onClick={() => handleSubItemClick(subItem.id)}
                    className={`w-full flex items-center px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                      currentPage === subItem.id
                        ? 'bg-white/10 text-white border border-white/20'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="w-2 h-2 bg-gray-500 rounded-full mr-3"></div>
                    {subItem.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="text-center text-gray-500 text-xs">
          <p>© 2025 Admin Panel</p>
          <p>Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}