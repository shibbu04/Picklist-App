import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';
import { 
  ArrowLeft, 
  Package, 
  MapPin, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  RotateCcw,
  Flag
} from 'lucide-react';
import toast from 'react-hot-toast';

interface OrderItem {
  _id: string;
  sku: string;
  name: string;
  quantity: number;
  location: string;
  alternativeLocations: string[];
  picked: boolean;
  pickedQuantity: number;
  notes?: string;
  pickedAt?: string;
  pickedBy?: string;
}

interface Order {
  _id: string;
  orderNumber: string;
  customerName: string;
  status: string;
  priority: string;
  items: OrderItem[];
}

const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingItems, setProcessingItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const data = await apiService.getOrderItems(orderId!);
      setOrder(data.order);
      setItems(data.items);
    } catch (error) {
      toast.error('Failed to fetch order details');
      console.error('Error fetching order details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePickItem = async (itemId: string, picked: boolean, notes?: string) => {
    setProcessingItems(prev => new Set(prev).add(itemId));
    
    try {
      await apiService.pickItem(itemId, { picked, notes });
      
      setItems(prevItems =>
        prevItems.map(item =>
          item._id === itemId
            ? { 
                ...item, 
                picked, 
                pickedQuantity: picked ? item.quantity : 0,
                notes,
                pickedAt: picked ? new Date().toISOString() : undefined
              }
            : item
        )
      );
      
      toast.success(picked ? 'Item picked successfully' : 'Item marked as not found');
    } catch (error) {
      toast.error('Failed to update item status');
      console.error('Error picking item:', error);
    } finally {
      setProcessingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  const handleCycleCount = async (itemId: string, location: string) => {
    try {
      await apiService.triggerCycleCount(itemId, location);
      toast.success('Cycle count triggered for inventory review');
    } catch (error) {
      toast.error('Failed to trigger cycle count');
      console.error('Error triggering cycle count:', error);
    }
  };

  const handleCompleteOrder = async () => {
    try {
      await apiService.completeOrder(orderId!);
      toast.success('Order completed successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to complete order');
      console.error('Error completing order:', error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-coral-600 bg-coral-100';
      case 'medium':
        return 'text-gold-600 bg-gold-100';
      case 'low':
        return 'text-mint-600 bg-mint-100';
      default:
        return 'text-slate-600 bg-slate-100';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mint-500"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="card text-center py-12">
        <Package className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-600 mb-2">Order not found</h3>
        <button onClick={() => navigate('/dashboard')} className="btn-primary">
          Back to Dashboard
        </button>
      </div>
    );
  }

  const pickedItems = items.filter(item => item.picked).length;
  const totalItems = items.length;
  const progress = totalItems > 0 ? (pickedItems / totalItems) * 100 : 0;
  const canComplete = pickedItems === totalItems;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl font-bold text-navy-800">{order.orderNumber}</h1>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPriorityColor(order.priority)}`}>
                <Flag className="w-3 h-3 inline mr-1" />
                {order.priority} priority
              </span>
            </div>
            <p className="text-slate-600">{order.customerName}</p>
          </div>
        </div>

        {canComplete && (
          <button onClick={handleCompleteOrder} className="btn-primary">
            <CheckCircle className="w-5 h-5 mr-2" />
            Complete Order
          </button>
        )}
      </div>

      {/* Progress Card */}
      <div className="card-gradient">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-navy-800">Picking Progress</h3>
          <span className="text-2xl font-bold text-mint-600">{pickedItems}/{totalItems}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div
            className="bg-gradient-to-r from-mint-500 to-mint-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-slate-600">{Math.round(progress)}% complete</p>
      </div>

      {/* Items List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-navy-800">Items to Pick</h3>
        
        {items.map((item) => (
          <div key={item._id} className={`card ${item.picked ? 'bg-mint-50 border-mint-200' : ''}`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-3 h-3 rounded-full ${item.picked ? 'bg-mint-500' : 'bg-gray-300'}`} />
                  <div>
                    <h4 className="font-semibold text-navy-800">{item.name}</h4>
                    <p className="text-sm text-slate-600">SKU: {item.sku}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600">Qty: {item.quantity}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600">{item.location}</span>
                  </div>
                  {item.pickedAt && (
                    <div className="text-sm text-slate-500">
                      Picked: {new Date(item.pickedAt).toLocaleString()}
                    </div>
                  )}
                </div>

                {item.alternativeLocations.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-slate-700 mb-2">Alternative Locations:</p>
                    <div className="flex flex-wrap gap-2">
                      {item.alternativeLocations.map((location, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-sky-100 text-sky-700 text-xs rounded-lg"
                        >
                          {location}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {item.notes && (
                  <div className="mb-4 p-3 bg-gold-50 border border-gold-200 rounded-lg">
                    <p className="text-sm text-gold-800">{item.notes}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col space-y-2 ml-4">
                {!item.picked ? (
                  <>
                    <button
                      onClick={() => handlePickItem(item._id, true)}
                      disabled={processingItems.has(item._id)}
                      className="btn-primary text-sm px-4 py-2 disabled:opacity-50"
                    >
                      {processingItems.has(item._id) ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Pick
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handlePickItem(item._id, false, 'Item not found at location')}
                      disabled={processingItems.has(item._id)}
                      className="btn-danger text-sm px-4 py-2 disabled:opacity-50"
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Not Found
                    </button>
                    <button
                      onClick={() => handleCycleCount(item._id, item.location)}
                      className="btn-secondary text-sm px-4 py-2"
                    >
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Cycle Count
                    </button>
                  </>
                ) : (
                  <div className="flex items-center space-x-2 text-mint-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Picked</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;