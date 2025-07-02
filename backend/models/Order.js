import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed', 'cancelled'],
    default: 'pending',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  itemCount: {
    type: Number,
    default: 0,
  },
  pickedCount: {
    type: Number,
    default: 0,
  },
  completedAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Order', orderSchema);