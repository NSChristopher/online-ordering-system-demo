// Mock database for development when Prisma is not available
// This provides the same interface as Prisma but uses in-memory data

let businessInfo = {
  id: 1,
  name: 'Demo Bistro',
  address: '123 Main Street, Downtown, DC 20001',
  phone: '(555) 123-4567',
  hours: 'Mon-Thu: 11:00 AM - 9:00 PM, Fri-Sat: 11:00 AM - 10:00 PM, Sun: 12:00 PM - 8:00 PM',
  logoUrl: null
};

let categories = [
  { id: 1, name: 'Appetizers', sortOrder: 1 },
  { id: 2, name: 'Main Courses', sortOrder: 2 },
  { id: 3, name: 'Desserts', sortOrder: 3 },
  { id: 4, name: 'Beverages', sortOrder: 4 }
];

let menuItems = [
  // Appetizers
  {
    id: 1,
    menuCategoryId: 1,
    name: 'Buffalo Wings',
    description: 'Crispy chicken wings tossed in our signature buffalo sauce, served with celery and blue cheese dip',
    price: 12.99,
    imageUrl: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400',
    visible: true,
    sortOrder: 1
  },
  {
    id: 2,
    menuCategoryId: 1,
    name: 'Mozzarella Sticks',
    description: 'Golden fried mozzarella sticks served with marinara sauce',
    price: 8.99,
    imageUrl: 'https://images.unsplash.com/photo-1548030084-b2a8803f3a41?w=400',
    visible: true,
    sortOrder: 2
  },
  {
    id: 3,
    menuCategoryId: 1,
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
    menuCategoryId: 2,
    name: 'Classic Burger',
    description: 'Juicy beef patty with lettuce, tomato, onion, and our special sauce on a brioche bun',
    price: 14.99,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    visible: true,
    sortOrder: 1
  },
  {
    id: 5,
    menuCategoryId: 2,
    name: 'Grilled Chicken Caesar',
    description: 'Grilled chicken breast over romaine lettuce with parmesan cheese and caesar dressing',
    price: 13.99,
    imageUrl: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400',
    visible: true,
    sortOrder: 2
  },
  {
    id: 6,
    menuCategoryId: 2,
    name: 'Fish & Chips',
    description: 'Beer-battered cod with crispy fries and coleslaw',
    price: 16.99,
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400',
    visible: true,
    sortOrder: 3
  },
  {
    id: 7,
    menuCategoryId: 2,
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
    menuCategoryId: 3,
    name: 'Chocolate Brownie',
    description: 'Warm chocolate brownie served with vanilla ice cream',
    price: 7.99,
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400',
    visible: true,
    sortOrder: 1
  },
  {
    id: 9,
    menuCategoryId: 3,
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
    menuCategoryId: 4,
    name: 'Craft Beer',
    description: 'Selection of local craft beers',
    price: 5.99,
    imageUrl: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400',
    visible: true,
    sortOrder: 1
  },
  {
    id: 11,
    menuCategoryId: 4,
    name: 'Fresh Lemonade',
    description: 'House-made lemonade with fresh lemons',
    price: 3.99,
    imageUrl: 'https://images.unsplash.com/photo-1523371683702-730d3d95ac0b?w=400',
    visible: true,
    sortOrder: 2
  },
  {
    id: 12,
    menuCategoryId: 4,
    name: 'Coffee',
    description: 'Freshly brewed coffee from locally roasted beans',
    price: 2.99,
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
    visible: true,
    sortOrder: 3
  }
];

let orders = [];
let orderItems = [];
let nextOrderId = 1;
let nextOrderItemId = 1;

// Mock database interface
const mockDb = {
  businessInfo: {
    findFirst: async () => businessInfo,
    create: async (data) => {
      businessInfo = { id: 1, ...data.data };
      return businessInfo;
    },
    update: async (params) => {
      businessInfo = { ...businessInfo, ...params.data };
      return businessInfo;
    }
  },
  
  menuCategory: {
    findMany: async (params = {}) => {
      let result = [...categories];
      
      if (params.include?.items) {
        result = result.map(category => ({
          ...category,
          items: menuItems
            .filter(item => item.menuCategoryId === category.id && item.visible)
            .sort((a, b) => a.sortOrder - b.sortOrder)
        }));
      }
      
      return result.sort((a, b) => a.sortOrder - b.sortOrder);
    }
  },
  
  menuItem: {
    findMany: async (params = {}) => {
      let result = menuItems.filter(item => item.visible);
      
      if (params.where?.menuCategoryId) {
        result = result.filter(item => item.menuCategoryId === params.where.menuCategoryId);
      }
      
      if (params.where?.OR) {
        // Simple search implementation
        const searchTerm = params.where.OR[0]?.name?.contains?.toLowerCase() || '';
        result = result.filter(item => 
          item.name.toLowerCase().includes(searchTerm) || 
          item.description.toLowerCase().includes(searchTerm)
        );
      }
      
      if (params.where?.id?.in) {
        result = result.filter(item => params.where.id.in.includes(item.id));
      }
      
      if (params.include?.category) {
        result = result.map(item => ({
          ...item,
          category: categories.find(cat => cat.id === item.menuCategoryId)
        }));
      }
      
      return result.sort((a, b) => a.sortOrder - b.sortOrder);
    },
    
    findUnique: async (params) => {
      const item = menuItems.find(item => item.id === params.where.id);
      if (!item) return null;
      
      if (params.include?.category) {
        return {
          ...item,
          category: categories.find(cat => cat.id === item.menuCategoryId)
        };
      }
      
      return item;
    }
  },
  
  order: {
    create: async (params) => {
      const orderData = params.data;
      const order = {
        id: nextOrderId++,
        customerName: orderData.customerName,
        customerPhone: orderData.customerPhone,
        customerEmail: orderData.customerEmail,
        deliveryAddress: orderData.deliveryAddress,
        orderType: orderData.orderType,
        total: orderData.total,
        status: orderData.status,
        paymentMethod: orderData.paymentMethod,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      orders.push(order);
      
      // Create order items
      const items = orderData.items.create.map(itemData => ({
        id: nextOrderItemId++,
        orderId: order.id,
        menuItemId: itemData.menuItemId,
        quantity: itemData.quantity,
        priceAtOrder: itemData.priceAtOrder,
        itemNameAtOrder: itemData.itemNameAtOrder
      }));
      
      orderItems.push(...items);
      
      if (params.include?.items) {
        return {
          ...order,
          items: items.map(item => ({
            ...item,
            menuItem: menuItems.find(mi => mi.id === item.menuItemId)
          }))
        };
      }
      
      return order;
    },
    
    findMany: async (params = {}) => {
      let result = [...orders];
      
      if (params.where?.status) {
        result = result.filter(order => order.status === params.where.status);
      }
      
      if (params.include?.items) {
        result = result.map(order => ({
          ...order,
          items: orderItems
            .filter(item => item.orderId === order.id)
            .map(item => ({
              ...item,
              menuItem: menuItems.find(mi => mi.id === item.menuItemId)
            }))
        }));
      }
      
      return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
    
    findUnique: async (params) => {
      const order = orders.find(order => order.id === params.where.id);
      if (!order) return null;
      
      if (params.include?.items) {
        return {
          ...order,
          items: orderItems
            .filter(item => item.orderId === order.id)
            .map(item => ({
              ...item,
              menuItem: menuItems.find(mi => mi.id === item.menuItemId)
            }))
        };
      }
      
      return order;
    },
    
    update: async (params) => {
      const orderIndex = orders.findIndex(order => order.id === params.where.id);
      if (orderIndex === -1) {
        throw { code: 'P2025' };
      }
      
      orders[orderIndex] = { ...orders[orderIndex], ...params.data, updatedAt: new Date() };
      
      if (params.include?.items) {
        return {
          ...orders[orderIndex],
          items: orderItems
            .filter(item => item.orderId === orders[orderIndex].id)
            .map(item => ({
              ...item,
              menuItem: menuItems.find(mi => mi.id === item.menuItemId)
            }))
        };
      }
      
      return orders[orderIndex];
    }
  },
  
  $disconnect: async () => {
    // No-op for mock
  }
};

module.exports = mockDb;