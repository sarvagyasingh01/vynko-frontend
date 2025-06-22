import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  MoreVertical,
  ArrowUpDown,
  Download,
  Package,
  Star,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

export default function ManageProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showActions, setShowActions] = useState(null);

  // Sample product data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      sku: 'WBH-001',
      category: 'Electronics',
      price: 129.99,
      salePrice: 99.99,
      stock: 45,
      status: 'active',
      image: 'https://via.placeholder.com/60x60/333/fff?text=H',
      sales: 234,
      rating: 4.5,
      dateAdded: '2025-05-15'
    },
    {
      id: 2,
      name: 'Smart Watch Pro',
      sku: 'SWP-002',
      category: 'Electronics',
      price: 299.99,
      salePrice: null,
      stock: 12,
      status: 'active',
      image: 'https://via.placeholder.com/60x60/333/fff?text=SW',
      sales: 156,
      rating: 4.8,
      dateAdded: '2025-05-10'
    },
    {
      id: 3,
      name: 'Gaming Mechanical Keyboard',
      sku: 'GMK-003',
      category: 'Electronics',
      price: 89.99,
      salePrice: 79.99,
      stock: 0,
      status: 'inactive',
      image: 'https://via.placeholder.com/60x60/333/fff?text=K',
      sales: 89,
      rating: 4.2,
      dateAdded: '2025-04-28'
    },
    {
      id: 4,
      name: 'Premium Cotton T-Shirt',
      sku: 'PCT-004',
      category: 'Clothing',
      price: 24.99,
      salePrice: 19.99,
      stock: 128,
      status: 'active',
      image: 'https://via.placeholder.com/60x60/333/fff?text=T',
      sales: 445,
      rating: 4.3,
      dateAdded: '2025-05-01'
    },
    {
      id: 5,
      name: 'Professional Camera Lens',
      sku: 'PCL-005',
      category: 'Electronics',
      price: 899.99,
      salePrice: null,
      stock: 8,
      status: 'draft',
      image: 'https://via.placeholder.com/60x60/333/fff?text=C',
      sales: 23,
      rating: 4.9,
      dateAdded: '2025-05-20'
    }
  ]);

  const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports'];
  const statuses = ['active', 'inactive', 'draft'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'inactive': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'draft': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { color: 'text-red-400', label: 'Out of Stock' };
    if (stock < 10) return { color: 'text-yellow-400', label: 'Low Stock' };
    return { color: 'text-green-400', label: 'In Stock' };
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || product.category === filterCategory;
    const matchesStatus = !filterStatus || product.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === sortedProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(sortedProducts.map(product => product.id));
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk ${action} for products:`, selectedProducts);
    setSelectedProducts([]);
  };

  const handleProductAction = (action, productId) => {
    console.log(`${action} product:`, productId);
    setShowActions(null);
  };

  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.status === 'active').length;
  const lowStockProducts = products.filter(p => p.stock < 10 && p.stock > 0).length;
  const outOfStockProducts = products.filter(p => p.stock === 0).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Products</h1>
          <p className="text-gray-400 mt-1">Manage your product inventory and details</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-white to-gray-200 text-black font-medium rounded-lg hover:from-gray-100 hover:to-gray-300 transition-all duration-200 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Products</p>
              <p className="text-2xl font-bold text-white">{totalProducts}</p>
            </div>
            <Package className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Products</p>
              <p className="text-2xl font-bold text-white">{activeProducts}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Low Stock</p>
              <p className="text-2xl font-bold text-white">{lowStockProducts}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Out of Stock</p>
              <p className="text-2xl font-bold text-white">{outOfStockProducts}</p>
            </div>
            <Package className="w-8 h-8 text-red-400" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
            >
              <option value="" className="bg-gray-800">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category} className="bg-gray-800">{category}</option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
            >
              <option value="" className="bg-gray-800">All Status</option>
              {statuses.map(status => (
                <option key={status} value={status} className="bg-gray-800">
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field);
                setSortOrder(order);
              }}
              className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
            >
              <option value="name-asc" className="bg-gray-800">Name A-Z</option>
              <option value="name-desc" className="bg-gray-800">Name Z-A</option>
              <option value="price-asc" className="bg-gray-800">Price Low-High</option>
              <option value="price-desc" className="bg-gray-800">Price High-Low</option>
              <option value="stock-asc" className="bg-gray-800">Stock Low-High</option>
              <option value="stock-desc" className="bg-gray-800">Stock High-Low</option>
              <option value="dateAdded-desc" className="bg-gray-800">Newest First</option>
              <option value="dateAdded-asc" className="bg-gray-800">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedProducts.length > 0 && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">
                {selectedProducts.length} product(s) selected
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleBulkAction('activate')}
                  className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded text-sm hover:bg-green-500/30 transition-all duration-200"
                >
                  Activate
                </button>
                <button
                  onClick={() => handleBulkAction('deactivate')}
                  className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded text-sm hover:bg-red-500/30 transition-all duration-200"
                >
                  Deactivate
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded text-sm hover:bg-red-500/30 transition-all duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Products Table */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === sortedProducts.length && sortedProducts.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-white bg-white/10 border-white/20 rounded focus:ring-white/50 focus:ring-2"
                  />
                </th>
                <th className="px-4 py-3 text-left text-gray-400 font-medium">Product</th>
                <th className="px-4 py-3 text-left text-gray-400 font-medium">SKU</th>
                <th className="px-4 py-3 text-left text-gray-400 font-medium">Category</th>
                <th className="px-4 py-3 text-left text-gray-400 font-medium">Price</th>
                <th className="px-4 py-3 text-left text-gray-400 font-medium">Stock</th>
                <th className="px-4 py-3 text-left text-gray-400 font-medium">Status</th>
                <th className="px-4 py-3 text-left text-gray-400 font-medium">Sales</th>
                <th className="px-4 py-3 text-left text-gray-400 font-medium">Rating</th>
                <th className="px-4 py-3 text-center text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.map((product) => {
                const stockStatus = getStockStatus(product.stock);
                return (
                  <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                        className="w-4 h-4 text-white bg-white/10 border-white/20 rounded focus:ring-white/50 focus:ring-2"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover bg-gray-700"
                        />
                        <div>
                          <p className="text-white font-medium">{product.name}</p>
                          <p className="text-gray-400 text-sm">Added {product.dateAdded}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-300">{product.sku}</td>
                    <td className="px-4 py-3 text-gray-300">{product.category}</td>
                    <td className="px-4 py-3">
                      <div className="text-white font-medium">${product.price}</div>
                      {product.salePrice && (
                        <div className="text-green-400 text-sm">Sale: ${product.salePrice}</div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className={`${stockStatus.color} font-medium`}>
                        {product.stock}
                      </div>
                      <div className={`${stockStatus.color} text-xs`}>
                        {stockStatus.label}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.status)}`}>
                        {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-300">{product.sales}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-gray-300">{product.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="relative">
                        <button
                          onClick={() => setShowActions(showActions === product.id ? null : product.id)}
                          className="p-1 rounded text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        
                        {showActions === product.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-lg border border-white/20 rounded-lg shadow-xl py-2 z-50">
                            <button
                              onClick={() => handleProductAction('view', product.id)}
                              className="w-full flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
                            >
                              <Eye className="w-4 h-4 mr-3" />
                              View Details
                            </button>
                            <button
                              onClick={() => handleProductAction('edit', product.id)}
                              className="w-full flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
                            >
                              <Edit className="w-4 h-4 mr-3" />
                              Edit Product
                            </button>
                            <button
                              onClick={() => handleProductAction('duplicate', product.id)}
                              className="w-full flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
                            >
                              <Package className="w-4 h-4 mr-3" />
                              Duplicate
                            </button>
                            <hr className="my-1 border-white/10" />
                            <button
                              onClick={() => handleProductAction('delete', product.id)}
                              className="w-full flex items-center px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors duration-200"
                            >
                              <Trash2 className="w-4 h-4 mr-3" />
                              Delete Product
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
          <div className="text-gray-400 text-sm">
            Showing {sortedProducts.length} of {totalProducts} products
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 bg-white/5 border border-white/20 rounded text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200">
              Previous
            </button>
            <button className="px-3 py-1 bg-white/10 border border-white/20 rounded text-white">
              1
            </button>
            <button className="px-3 py-1 bg-white/5 border border-white/20 rounded text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200">
              2
            </button>
            <button className="px-3 py-1 bg-white/5 border border-white/20 rounded text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200">
              3
            </button>
            <button className="px-3 py-1 bg-white/5 border border-white/20 rounded text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}