import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  location: {
    type: String,
    required: true,
  },
  alternativeLocations: [{
    type: String,
  }],
  picked: {
    type: Boolean,
    default: false,
  },
  pickedQuantity: {
    type: Number,
    default: 0,
  },
  pickedAt: {
    type: Date,
  },
  pickedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  notes: {
    type: String,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Item', itemSchema);