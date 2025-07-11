const express = require('express');
const db = require('../db');

const router = express.Router();

// Get business info
router.get('/', async (req, res) => {
  try {
    let businessInfo = await db.businessInfo.findFirst();
    
    // If no business info exists, create default
    if (!businessInfo) {
      businessInfo = await db.businessInfo.create({
        data: {
          name: 'Demo Restaurant',
          address: '123 Demo Street, Demo City, DC 12345',
          phone: '(555) 123-4567',
          hours: 'Mon-Sun: 11:00 AM - 10:00 PM',
          logoUrl: null
        }
      });
    }

    res.json(businessInfo);
  } catch (error) {
    console.error('Get business info error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update business info
router.put('/', async (req, res) => {
  try {
    const { name, address, phone, hours, logoUrl } = req.body;

    let businessInfo = await db.businessInfo.findFirst();
    
    if (businessInfo) {
      businessInfo = await db.businessInfo.update({
        where: { id: businessInfo.id },
        data: { name, address, phone, hours, logoUrl }
      });
    } else {
      businessInfo = await db.businessInfo.create({
        data: { name, address, phone, hours, logoUrl }
      });
    }

    res.json(businessInfo);
  } catch (error) {
    console.error('Update business info error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;