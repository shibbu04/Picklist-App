import mongoose from 'mongoose';

const cycleCountSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  itemSku: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  triggeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed'],
    default: 'pending',
  },
  reason: {
    type: String,
    default: 'Item not found during picking',
  },
  notes: {
    type: String,
  },
}, {
  timestamps: true,
});

export default mongoose.model('CycleCount', cycleCountSchema);