import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/apiService';
import { Package, Clock, CheckCircle, AlertCircle, MapPin, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

interface Order {
  _id: string;
  orderNumber: string;
  customerName: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  itemCount: number;
  pickedCount: number;
  createdAt: string;
  assignedTo: string;
}

const Dashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await apiService.getOrders();
      setOrders(data);
    } catch (error) {
      toast.error('Failed to fetch orders');
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => 
    filter === 'all' || order.status === filter
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-gold-500" />;
      case 'in_progress':
        return <Package className="w-5 h-5 text-sky-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-mint-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-coral-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-gold-100 text-gold-800 border-gold-200';
      case 'in_progress':
        return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'completed':
        return 'bg-mint-100 text-mint-800 border-mint-200';
      default:
        return 'bg-coral-100 text-coral-800 border-coral-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-coral-500';
      case 'medium':
        return 'bg-gold-500';
      case 'low':
        return 'bg-mint-500';
      default:
        return 'bg-slate-500';
    }
  };

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    inProgress: orders.filter(o => o.status === 'in_progress').length,
    completed: orders.filter(o => o.status === 'completed').length,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mint-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy-800">Dashboard</h1>
          <p className="text-slate-600 mt-1">Manage your warehouse picking tasks</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card-gradient">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Orders</p>
              <p className="text-3xl font-bold text-navy-800">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-navy-500 to-navy-600 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card-gradient">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Pending</p>
              <p className="text-3xl font-bold text-gold-600">{stats.pending}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card-gradient">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">In Progress</p>
              <p className="text-3xl font-bold text-sky-600">{stats.inProgress}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-sky-600 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card-gradient">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Completed</p>
              <p className="text-3xl font-bold text-mint-600">{stats.completed}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-mint-500 to-mint-600 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-white rounded-xl p-1 shadow-sm border border-gray-100">
        {[
          { key: 'all', label: 'All Orders' },
          { key: 'pending', label: 'Pending' },
          { key: 'in_progress', label: 'In Progress' },
          { key: 'completed', label: 'Completed' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              filter === tab.key
                ? 'bg-mint-500 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-800 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="card text-center py-12">
            <Package className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">No orders found</h3>
            <p className="text-slate-500">
              {filter === 'all' ? 'No orders available' : `No ${filter.replace('_', ' ')} orders`}
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <Link
              key={order._id}
              to={`/orders/${order._id}`}
              className="block card hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-1 h-12 rounded-full ${getPriorityColor(order.priority)}`} />
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        {getStatusIcon(order.status)}
                        <h3 className="font-semibold text-navy-800">{order.orderNumber}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(order.status)}`}>
                          {order.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-slate-600 mb-1">{order.customerName}</p>
                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <span>{order.pickedCount}/{order.itemCount} items picked</span>
                        <span>•</span>
                        <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-gradient-to-r from-mint-500 to-mint-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(order.pickedCount / order.itemCount) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-500">
                      {Math.round((order.pickedCount / order.itemCount) * 100)}% complete
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-mint-500 transition-colors" />
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;