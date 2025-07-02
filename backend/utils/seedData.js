import User from '../models/User.js';
import Order from '../models/Order.js';
import Item from '../models/Item.js';

export const seedDatabase = async () => {
  try {
    // Check if data already exists
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('Database already seeded');
      return;
    }

    console.log('Seeding database...');

    // Create demo users
    const users = await User.create([
      {
        username: 'picker1',
        name: 'John Picker',
        password: 'password',
        role: 'picker',
      },
      {
        username: 'picker2',
        name: 'Jane Smith',
        password: 'password',
        role: 'picker',
      },
      {
        username: 'supervisor',
        name: 'Mike Supervisor',
        password: 'password',
        role: 'supervisor',
      },
    ]);

    const picker1 = users[0];
    const picker2 = users[1];

    // Create demo orders
    const orders = await Order.create([
      {
        orderNumber: 'ORD-001',
        customerName: 'Acme Corporation',
        status: 'pending',
        priority: 'high',
        assignedTo: picker1._id,
        itemCount: 3,
      },
      {
        orderNumber: 'ORD-002',
        customerName: 'Tech Solutions Inc',
        status: 'in_progress',
        priority: 'medium',
        assignedTo: picker1._id,
        itemCount: 4,
        pickedCount: 2,
      },
      {
        orderNumber: 'ORD-003',
        customerName: 'Global Retail Ltd',
        status: 'completed',
        priority: 'low',
        assignedTo: picker2._id,
        itemCount: 2,
        pickedCount: 2,
        completedAt: new Date(),
      },
      {
        orderNumber: 'ORD-004',
        customerName: 'Manufacturing Co',
        status: 'pending',
        priority: 'medium',
        assignedTo: picker1._id,
        itemCount: 5,
      },
    ]);

    // Create demo items
    const items = [
      // Order 1 items
      {
        orderId: orders[0]._id,
        sku: 'SKU-001',
        name: 'Wireless Bluetooth Headphones',
        quantity: 2,
        location: 'A1-B2-C3',
        alternativeLocations: ['A1-B2-C4', 'A2-B1-C3'],
      },
      {
        orderId: orders[0]._id,
        sku: 'SKU-002',
        name: 'USB-C Charging Cable',
        quantity: 5,
        location: 'B2-C3-D1',
        alternativeLocations: ['B2-C3-D2'],
      },
      {
        orderId: orders[0]._id,
        sku: 'SKU-003',
        name: 'Smartphone Case',
        quantity: 1,
        location: 'C1-D2-E3',
        alternativeLocations: ['C1-D2-E4', 'C2-D1-E3'],
      },
      // Order 2 items
      {
        orderId: orders[1]._id,
        sku: 'SKU-004',
        name: 'Laptop Stand',
        quantity: 1,
        location: 'D1-E2-F3',
        alternativeLocations: ['D1-E2-F4'],
        picked: true,
        pickedQuantity: 1,
        pickedAt: new Date(),
        pickedBy: picker1._id,
      },
      {
        orderId: orders[1]._id,
        sku: 'SKU-005',
        name: 'Wireless Mouse',
        quantity: 3,
        location: 'E2-F3-G1',
        alternativeLocations: ['E2-F3-G2'],
        picked: true,
        pickedQuantity: 3,
        pickedAt: new Date(),
        pickedBy: picker1._id,
      },
      {
        orderId: orders[1]._id,
        sku: 'SKU-006',
        name: 'Mechanical Keyboard',
        quantity: 1,
        location: 'F3-G1-H2',
        alternativeLocations: ['F3-G1-H3'],
      },
      {
        orderId: orders[1]._id,
        sku: 'SKU-007',
        name: 'Monitor Cable',
        quantity: 2,
        location: 'G1-H2-I3',
        alternativeLocations: ['G1-H2-I4'],
      },
      // Order 3 items (completed)
      {
        orderId: orders[2]._id,
        sku: 'SKU-008',
        name: 'Desk Organizer',
        quantity: 1,
        location: 'H2-I3-J1',
        alternativeLocations: ['H2-I3-J2'],
        picked: true,
        pickedQuantity: 1,
        pickedAt: new Date(),
        pickedBy: picker2._id,
      },
      {
        orderId: orders[2]._id,
        sku: 'SKU-009',
        name: 'LED Desk Lamp',
        quantity: 1,
        location: 'I3-J1-K2',
        alternativeLocations: ['I3-J1-K3'],
        picked: true,
        pickedQuantity: 1,
        pickedAt: new Date(),
        pickedBy: picker2._id,
      },
      // Order 4 items
      {
        orderId: orders[3]._id,
        sku: 'SKU-010',
        name: 'Portable Charger',
        quantity: 3,
        location: 'J1-K2-L3',
        alternativeLocations: ['J1-K2-L4'],
      },
      {
        orderId: orders[3]._id,
        sku: 'SKU-011',
        name: 'Bluetooth Speaker',
        quantity: 2,
        location: 'K2-L3-M1',
        alternativeLocations: ['K2-L3-M2'],
      },
      {
        orderId: orders[3]._id,
        sku: 'SKU-012',
        name: 'Phone Holder',
        quantity: 4,
        location: 'L3-M1-N2',
        alternativeLocations: ['L3-M1-N3'],
      },
      {
        orderId: orders[3]._id,
        sku: 'SKU-013',
        name: 'Cable Management Kit',
        quantity: 1,
        location: 'M1-N2-O3',
        alternativeLocations: ['M1-N2-O4'],
      },
      {
        orderId: orders[3]._id,
        sku: 'SKU-014',
        name: 'Webcam',
        quantity: 1,
        location: 'N2-O3-P1',
        alternativeLocations: ['N2-O3-P2'],
      },
    ];

    await Item.create(items);

    console.log('Database seeded successfully!');
    console.log('Demo credentials:');
    console.log('Username: picker1, Password: password');
    console.log('Username: picker2, Password: password');
    console.log('Username: supervisor, Password: password');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};