import express from 'express';
import Order from '../models/Order.js';
import Item from '../models/Item.js';
import AuditLog from '../models/AuditLog.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get orders assigned to the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find({ assignedTo: req.user._id })
      .sort({ priority: -1, createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get order items
router.get('/:orderId/items', authenticateToken, async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const items = await Item.find({ orderId })
      .sort({ location: 1, name: 1 });

    res.json({ order, items });
  } catch (error) {
    console.error('Error fetching order items:', error);
    res.status(500).json({ error: 'Failed to fetch order items' });
  }
});

// Complete order
router.post('/:orderId/complete', authenticateToken, async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if all items are picked
    const totalItems = await Item.countDocuments({ orderId });
    const pickedItems = await Item.countDocuments({ orderId, picked: true });

    if (pickedItems !== totalItems) {
      return res.status(400).json({ error: 'Not all items have been picked' });
    }

    // Update order status
    order.status = 'completed';
    order.completedAt = new Date();
    await order.save();

    // Log the completion
    await AuditLog.create({
      action: 'order_completed',
      orderId: order._id,
      orderNumber: order.orderNumber,
      userId: req.user._id,
      userName: req.user.name,
      notes: `Order ${order.orderNumber} completed`,
    });

    res.json({ success: true, order });
  } catch (error) {
    console.error('Error completing order:', error);
    res.status(500).json({ error: 'Failed to complete order' });
  }
});

export default router;