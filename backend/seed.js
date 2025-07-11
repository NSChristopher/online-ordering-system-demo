const db = require('./db');

async function seed() {
  try {
    console.log('🌱 Seeding database...');

    // Create business info
    await db.businessInfo.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'Demo Bistro',
        address: '123 Main Street, Downtown, DC 20001',
        phone: '(555) 123-4567',
        hours: 'Mon-Thu: 11:00 AM - 9:00 PM, Fri-Sat: 11:00 AM - 10:00 PM, Sun: 12:00 PM - 8:00 PM',
        logoUrl: null
      }
    });

    // Create menu categories
    const appetizers = await db.menuCategory.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'Appetizers',
        sortOrder: 1
      }
    });

    const mains = await db.menuCategory.upsert({
      where: { id: 2 },
      update: {},
      create: {
        name: 'Main Courses',
        sortOrder: 2
      }
    });

    const desserts = await db.menuCategory.upsert({
      where: { id: 3 },
      update: {},
      create: {
        name: 'Desserts',
        sortOrder: 3
      }
    });

    const drinks = await db.menuCategory.upsert({
      where: { id: 4 },
      update: {},
      create: {
        name: 'Beverages',
        sortOrder: 4
      }
    });

    // Create menu items
    const menuItems = [
      // Appetizers
      {
        id: 1,
        menuCategoryId: appetizers.id,
        name: 'Buffalo Wings',
        description: 'Crispy chicken wings tossed in our signature buffalo sauce, served with celery and blue cheese dip',
        price: 12.99,
        imageUrl: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400',
        visible: true,
        sortOrder: 1
      },
      {
        id: 2,
        menuCategoryId: appetizers.id,
        name: 'Mozzarella Sticks',
        description: 'Golden fried mozzarella sticks served with marinara sauce',
        price: 8.99,
        imageUrl: 'https://images.unsplash.com/photo-1548030084-b2a8803f3a41?w=400',
        visible: true,
        sortOrder: 2
      },
      {
        id: 3,
        menuCategoryId: appetizers.id,
        name: 'Loaded Nachos',
        description: 'Crispy tortilla chips topped with cheese, jalapeños, sour cream, and guacamole',
        price: 10.99,
        imageUrl: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400',
        visible: true,
        sortOrder: 3
      },
      
      // Main Courses
      {
        id: 4,
        menuCategoryId: mains.id,
        name: 'Classic Burger',
        description: 'Juicy beef patty with lettuce, tomato, onion, and our special sauce on a brioche bun',
        price: 14.99,
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
        visible: true,
        sortOrder: 1
      },
      {
        id: 5,
        menuCategoryId: mains.id,
        name: 'Grilled Chicken Caesar',
        description: 'Grilled chicken breast over romaine lettuce with parmesan cheese and caesar dressing',
        price: 13.99,
        imageUrl: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400',
        visible: true,
        sortOrder: 2
      },
      {
        id: 6,
        menuCategoryId: mains.id,
        name: 'Fish & Chips',
        description: 'Beer-battered cod with crispy fries and coleslaw',
        price: 16.99,
        imageUrl: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400',
        visible: true,
        sortOrder: 3
      },
      {
        id: 7,
        menuCategoryId: mains.id,
        name: 'Margherita Pizza',
        description: 'Fresh mozzarella, tomatoes, and basil on our handmade dough',
        price: 15.99,
        imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
        visible: true,
        sortOrder: 4
      },

      // Desserts
      {
        id: 8,
        menuCategoryId: desserts.id,
        name: 'Chocolate Brownie',
        description: 'Warm chocolate brownie served with vanilla ice cream',
        price: 7.99,
        imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400',
        visible: true,
        sortOrder: 1
      },
      {
        id: 9,
        menuCategoryId: desserts.id,
        name: 'Cheesecake',
        description: 'New York style cheesecake with berry compote',
        price: 6.99,
        imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400',
        visible: true,
        sortOrder: 2
      },

      // Beverages
      {
        id: 10,
        menuCategoryId: drinks.id,
        name: 'Craft Beer',
        description: 'Selection of local craft beers',
        price: 5.99,
        imageUrl: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400',
        visible: true,
        sortOrder: 1
      },
      {
        id: 11,
        menuCategoryId: drinks.id,
        name: 'Fresh Lemonade',
        description: 'House-made lemonade with fresh lemons',
        price: 3.99,
        imageUrl: 'https://images.unsplash.com/photo-1523371683702-730d3d95ac0b?w=400',
        visible: true,
        sortOrder: 2
      },
      {
        id: 12,
        menuCategoryId: drinks.id,
        name: 'Coffee',
        description: 'Freshly brewed coffee from locally roasted beans',
        price: 2.99,
        imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
        visible: true,
        sortOrder: 3
      }
    ];

    for (const item of menuItems) {
      await db.menuItem.upsert({
        where: { id: item.id },
        update: {},
        create: item
      });
    }

    console.log('✅ Database seeded successfully!');
    console.log(`Created ${menuItems.length} menu items across 4 categories`);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await db.$disconnect();
  }
}

seed();