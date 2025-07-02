import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
    enum: ['picked', 'not_found', 'cycle_count', 'order_completed'],
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
  },
  itemName: {
    type: String,
  },
  itemSku: {
    type: String,
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  },
  orderNumber: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  notes: {
    type: String,
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
  },
}, {
  timestamps: true,
});

export default mongoose.model('AuditLog', auditLogSchema);