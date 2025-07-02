import express from 'express';
import AuditLog from '../models/AuditLog.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get audit logs
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { action, limit = 100 } = req.query;

    let query = {};
    if (action && action !== 'all') {
      query.action = action;
    }

    const logs = await AuditLog.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .lean();

    // Format timestamps for frontend
    const formattedLogs = logs.map(log => ({
      ...log,
      timestamp: log.createdAt,
    }));

    res.json(formattedLogs);
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    res.status(500).json({ error: 'Failed to fetch audit logs' });
  }
});

export default router;