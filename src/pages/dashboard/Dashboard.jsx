import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign,
  Activity,
  Package
} from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: '+20.1%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-green-400 to-green-600'
    },
    {
      title: 'Total Orders',
      value: '1,234',
      change: '+15.3%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'from-blue-400 to-blue-600'
    },
    {
      title: 'Total Products',
      value: '567',
      change: '+8.2%',
      trend: 'up',
      icon: Package,
      color: 'from-purple-400 to-purple-600'
    },
    {
      title: 'Active Users',
      value: '2,845',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'from-orange-400 to-orange-600'
    }
  ];

  const recentOrders = [
    { id: '#001', customer: 'John Smith', product: 'Laptop Pro', amount: '$1,299', status: 'Completed' },
    { id: '#002', customer: 'Sarah Johnson', product: 'Wireless Mouse', amount: '$89', status: 'Processing' },
    { id: '#003', customer: 'Mike Davis', product: 'Keyboard Mechanical', amount: '$149', status: 'Shipped' },
    { id: '#004', customer: 'Emma Wilson', product: 'Monitor 4K', amount: '$599', status: 'Pending' },
    { id: '#005', customer: 'Tom Brown', product: 'Headphones', amount: '$199', status: 'Completed' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Processing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Shipped': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back! Here's what's happening.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200">
            Last 30 days
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-white to-gray-200 text-black font-medium rounded-lg hover:from-gray-100 hover:to-gray-300 transition-all duration-200">
            Export Data
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                  <span className="text-green-400 text-sm font-medium">{stat.change}</span>
                  <span className="text-gray-500 text-sm ml-1">from last month</span>
                </div>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Chart Placeholder */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Sales Overview</h3>
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400 text-sm">Live Data</span>
            </div>
          </div>
          <div className="h-64 bg-gradient-to-br from-white/5 to-transparent rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Activity className="w-12 h-12 text-gray-500 mx-auto mb-2" />
              <p className="text-gray-400">Chart visualization would go here</p>
              <p className="text-gray-500 text-sm">Integration with charting library needed</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Conversion Rate</span>
              <span className="text-white font-medium">3.2%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Avg. Order Value</span>
              <span className="text-white font-medium">$127</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Return Rate</span>
              <span className="text-white font-medium">2.1%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Customer Satisfaction</span>
              <span className="text-white font-medium">98.2%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Recent Orders</h3>
          <button className="text-gray-400 hover:text-white transition-colors">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Order ID</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Customer</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Product</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Amount</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, index) => (
                <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 text-white font-medium">{order.id}</td>
                  <td className="py-3 px-4 text-gray-300">{order.customer}</td>
                  <td className="py-3 px-4 text-gray-300">{order.product}</td>
                  <td className="py-3 px-4 text-white font-medium">{order.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}