import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { Clock, User, Package, MapPin, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';

interface AuditLogEntry {
  _id: string;
  action: string;
  itemId: string;
  itemName: string;
  itemSku: string;
  orderId: string;
  orderNumber: string;
  userId: string;
  userName: string;
  location?: string;
  notes?: string;
  timestamp: string;
}

const AuditLog: React.FC = () => {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'picked' | 'not_found' | 'cycle_count'>('all');

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const fetchAuditLogs = async () => {
    try {
      const data = await apiService.getAuditLogs();
      setLogs(data);
    } catch (error) {
      toast.error('Failed to fetch audit logs');
      console.error('Error fetching audit logs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLogs = logs.filter(log => 
    filter === 'all' || log.action === filter
  );

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'picked':
        return <CheckCircle className="w-5 h-5 text-mint-500" />;
      case 'not_found':
        return <XCircle className="w-5 h-5 text-coral-500" />;
      case 'cycle_count':
        return <RotateCcw className="w-5 h-5 text-gold-500" />;
      default:
        return <Package className="w-5 h-5 text-slate-500" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'picked':
        return 'bg-mint-100 text-mint-800 border-mint-200';
      case 'not_found':
        return 'bg-coral-100 text-coral-800 border-coral-200';
      case 'cycle_count':
        return 'bg-gold-100 text-gold-800 border-gold-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const formatAction = (action: string) => {
    switch (action) {
      case 'picked':
        return 'Item Picked';
      case 'not_found':
        return 'Item Not Found';
      case 'cycle_count':
        return 'Cycle Count Triggered';
      default:
        return action;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mint-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-navy-800">Audit Log</h1>
        <p className="text-slate-600 mt-1">Track all picking activities and inventory changes</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-white rounded-xl p-1 shadow-sm border border-gray-100">
        {[
          { key: 'all', label: 'All Activities' },
          { key: 'picked', label: 'Picked Items' },
          { key: 'not_found', label: 'Not Found' },
          { key: 'cycle_count', label: 'Cycle Counts' },
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

      {/* Audit Log Entries */}
      <div className="space-y-4">
        {filteredLogs.length === 0 ? (
          <div className="card text-center py-12">
            <Clock className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">No audit logs found</h3>
            <p className="text-slate-500">
              {filter === 'all' ? 'No activities recorded yet' : `No ${filter.replace('_', ' ')} activities`}
            </p>
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div key={log._id} className="card hover:shadow-lg transition-all duration-200">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {getActionIcon(log.action)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getActionColor(log.action)}`}>
                      {formatAction(log.action)}
                    </span>
                    <span className="text-sm text-slate-500">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <h4 className="font-semibold text-navy-800 mb-1">{log.itemName}</h4>
                      <div className="flex items-center space-x-4 text-sm text-slate-600">
                        <span>SKU: {log.itemSku}</span>
                        <span>•</span>
                        <span>Order: {log.orderNumber}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-slate-600">
                        <User className="w-4 h-4" />
                        <span>{log.userName}</span>
                      </div>
                      {log.location && (
                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                          <MapPin className="w-4 h-4" />
                          <span>{log.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {log.notes && (
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                      <p className="text-sm text-slate-700">{log.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AuditLog;