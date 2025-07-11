const express = require('express');
const db = require('../db');

const router = express.Router();

// Create a new order
router.post('/', async (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      customerEmail,
      deliveryAddress,
      orderType,
      paymentMethod,
      items // Array of { menuItemId, quantity }
    } = req.body;

    // Validate required fields
    if (!customerName || !customerPhone || !orderType || !items || items.length === 0) {
      return res.status(400).json({ 
        error: 'Missing required fields: customerName, customerPhone, orderType, and items' 
      });
    }

    // Validate order type
    if (!['delivery', 'to-go'].includes(orderType)) {
      return res.status(400).json({ error: 'Order type must be "delivery" or "to-go"' });
    }

    // If delivery, require address
    if (orderType === 'delivery' && !deliveryAddress) {
      return res.status(400).json({ error: 'Delivery address is required for delivery orders' });
    }

    // Get menu items to calculate total and validate
    const menuItemIds = items.map(item => item.menuItemId);
    const menuItems = await db.menuItem.findMany({
      where: { id: { in: menuItemIds }, visible: true }
    });

    if (menuItems.length !== menuItemIds.length) {
      return res.status(400).json({ error: 'Some menu items are invalid or unavailable' });
    }

    // Calculate total
    let total = 0;
    const orderItemsData = items.map(item => {
      const menuItem = menuItems.find(m => m.id === item.menuItemId);
      const lineTotal = menuItem.price * item.quantity;
      total += lineTotal;
      
      return {
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        priceAtOrder: menuItem.price,
        itemNameAtOrder: menuItem.name
      };
    });

    // Create order with items
    const order = await db.order.create({
      data: {
        customerName,
        customerPhone,
        customerEmail,
        deliveryAddress: orderType === 'delivery' ? deliveryAddress : null,
        orderType,
        total,
        status: 'new',
        paymentMethod: paymentMethod || 'cash',
        items: {
          create: orderItemsData
        }
      },
      include: {
        items: {
          include: {
            menuItem: true
          }
        }
      }
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all orders (for worker dashboard)
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    
    const where = status ? { status } : {};
    
    const orders = await db.order.findMany({
      where,
      include: {
        items: {
          include: {
            menuItem: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single order
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const order = await db.order.findUnique({
      where: { id: parseInt(id) },
      include: {
        items: {
          include: {
            menuItem: true
          }
        }
      }
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update order status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['new', 'accepted', 'rejected', 'preparing', 'ready', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const order = await db.order.update({
      where: { id: parseInt(id) },
      data: { status },
      include: {
        items: {
          include: {
            menuItem: true
          }
        }
      }
    });

    res.json(order);
  } catch (error) {
    console.error('Update order status error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Cancel order (within grace period)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const order = await db.order.findUnique({
      where: { id: parseInt(id) }
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if order is within grace period (5 minutes)
    const gracePeriodMs = 5 * 60 * 1000; // 5 minutes
    const orderAge = Date.now() - new Date(order.createdAt).getTime();
    
    if (orderAge > gracePeriodMs && order.status !== 'new') {
      return res.status(400).json({ error: 'Order cannot be cancelled after grace period' });
    }

    const updatedOrder = await db.order.update({
      where: { id: parseInt(id) },
      data: { status: 'cancelled' },
      include: {
        items: {
          include: {
            menuItem: true
          }
        }
      }
    });

    res.json(updatedOrder);
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;