import express from 'express';
import CycleCount from '../models/CycleCount.js';
import Item from '../models/Item.js';
import AuditLog from '../models/AuditLog.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Trigger cycle count
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { itemId, location, notes } = req.body;

    const item = await Item.findById(itemId).populate('orderId');
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Create cycle count record
    const cycleCount = await CycleCount.create({
      itemId: item._id,
      itemSku: item.sku,
      itemName: item.name,
      location: location || item.location,
      triggeredBy: req.user._id,
      notes: notes || 'Item not found during picking - requires inventory verification',
    });

    // Log the cycle count trigger
    await AuditLog.create({
      action: 'cycle_count',
      itemId: item._id,
      itemName: item.name,
      itemSku: item.sku,
      orderId: item.orderId._id,
      orderNumber: item.orderId.orderNumber,
      userId: req.user._id,
      userName: req.user.name,
      location: location || item.location,
      notes: 'Cycle count triggered for inventory verification',
    });

    res.json({ success: true, cycleCount });
  } catch (error) {
    console.error('Error triggering cycle count:', error);
    res.status(500).json({ error: 'Failed to trigger cycle count' });
  }
});

// Get cycle counts
router.get('/', authenticateToken, async (req, res) => {
  try {
    const cycleCounts = await CycleCount.find()
      .populate('triggeredBy', 'name username')
      .sort({ createdAt: -1 });

    res.json(cycleCounts);
  } catch (error) {
    console.error('Error fetching cycle counts:', error);
    res.status(500).json({ error: 'Failed to fetch cycle counts' });
  }
});

export default router;