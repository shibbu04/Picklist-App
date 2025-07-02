import express from 'express';
import Item from '../models/Item.js';
import Order from '../models/Order.js';
import AuditLog from '../models/AuditLog.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Pick/unpick an item
router.post('/:itemId/pick', authenticateToken, async (req, res) => {
  try {
    const { itemId } = req.params;
    const { picked, location, notes } = req.body;

    const item = await Item.findById(itemId).populate('orderId');
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Update item status
    item.picked = picked;
    item.pickedQuantity = picked ? item.quantity : 0;
    item.pickedAt = picked ? new Date() : null;
    item.pickedBy = picked ? req.user._id : null;
    if (notes) item.notes = notes;
    if (location) item.location = location;

    await item.save();

    // Update order picked count
    const order = await Order.findById(item.orderId);
    if (order) {
      const pickedCount = await Item.countDocuments({ 
        orderId: order._id, 
        picked: true 
      });
      order.pickedCount = pickedCount;
      
      // Update order status based on progress
      if (pickedCount === 0) {
        order.status = 'pending';
      } else if (pickedCount < order.itemCount) {
        order.status = 'in_progress';
      }
      
      await order.save();
    }

    // Log the action
    await AuditLog.create({
      action: picked ? 'picked' : 'not_found',
      itemId: item._id,
      itemName: item.name,
      itemSku: item.sku,
      orderId: item.orderId._id,
      orderNumber: item.orderId.orderNumber,
      userId: req.user._id,
      userName: req.user.name,
      location: item.location,
      notes: notes || (picked ? 'Item picked successfully' : 'Item not found at location'),
    });

    res.json({ success: true, item });
  } catch (error) {
    console.error('Error picking item:', error);
    res.status(500).json({ error: 'Failed to update item status' });
  }
});

export default router;