const express = require('express');
const db = require('../db');

const router = express.Router();

// Get all menu categories with items
router.get('/categories', async (req, res) => {
  try {
    const categories = await db.menuCategory.findMany({
      include: {
        items: {
          where: { visible: true },
          orderBy: { sortOrder: 'asc' }
        }
      },
      orderBy: { sortOrder: 'asc' }
    });

    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all menu items (with optional category filter)
router.get('/items', async (req, res) => {
  try {
    const { categoryId, search } = req.query;
    
    const where = {
      visible: true,
      ...(categoryId && { menuCategoryId: parseInt(categoryId) }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } }
        ]
      })
    };

    const items = await db.menuItem.findMany({
      where,
      include: {
        category: true
      },
      orderBy: { sortOrder: 'asc' }
    });

    res.json(items);
  } catch (error) {
    console.error('Get menu items error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single menu item
router.get('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const item = await db.menuItem.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: true
      }
    });

    if (!item) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    res.json(item);
  } catch (error) {
    console.error('Get menu item error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;