const mongoose = require('mongoose');
const dotenv = require('dotenv');
const PG = require('./models/PG');
const connectDB = require('./config/database');

dotenv.config();

const samplePGs = [
  {
    name: 'Sunrise PG',
    location: 'Sector 18, Near Main Gate',
    address: '123 Main Road, Sector 18, City',
    coordinates: { latitude: 28.5355, longitude: 77.3910 },
    distance: '0.5 km',
    nearbyColleges: [
      { name: 'Delhi University', distance: '0.5 km' },
      { name: 'IIT Delhi', distance: '3.2 km' }
    ],
    price: 8500,
    sharingType: 'Double Sharing',
    images: [
      'https://images.unsplash.com/photo-1611095459865-47682ae3c41c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDF8fHx8MTc3MTA3Njk0OHww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.5,
    reviews: [],
    amenities: ['WiFi', 'Meals', 'AC', 'Laundry', 'Security'],
    gender: 'Male',
    available: true,
    description: 'A comfortable and well-maintained PG with all modern amenities. Perfect for working professionals and students.',
    rules: ['No smoking', 'No pets', 'Gate closes at 11 PM', 'Visitors allowed till 8 PM'],
    contactInfo: {
      phone: '+91 98765 43210',
      email: 'contact@sunrisepg.com',
      ownerName: 'Rajesh Kumar'
    },
    facilities: {
      roomSize: '12x10 ft',
      bedType: 'Single Bed',
      attached: true,
      balcony: false,
      furnishing: 'Semi-Furnished'
    },
    timing: {
      gateClosing: '11:00 PM',
      visitingHours: '10 AM - 8 PM'
    }
  },
  {
    name: 'Green Valley Hostel',
    location: 'College Road, Phase 2',
    address: '45 College Road, Phase 2, City',
    coordinates: { latitude: 28.5456, longitude: 77.4012 },
    distance: '1.2 km',
    nearbyColleges: [
      { name: 'Jamia Millia Islamia', distance: '1.2 km' },
      { name: 'Delhi University', distance: '2.5 km' }
    ],
    price: 6500,
    sharingType: 'Triple Sharing',
    images: [
      'https://images.unsplash.com/photo-1758523669073-edfbea249144?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGFyZWQlMjBhcGFydG1lbnQlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc3MTA5MzkwOXww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.2,
    reviews: [],
    amenities: ['WiFi', 'Meals', 'Parking', 'Security'],
    gender: 'Female',
    available: true,
    description: 'Budget-friendly accommodation with good food and friendly environment.',
    rules: ['No smoking', 'No alcohol', 'Gate closes at 10 PM'],
    contactInfo: {
      phone: '+91 98765 43211',
      email: 'info@greenvalley.com',
      ownerName: 'Priya Sharma'
    },
    facilities: {
      roomSize: '14x12 ft',
      bedType: 'Bunk Bed',
      attached: false,
      balcony: true,
      furnishing: 'Fully Furnished'
    },
    timing: {
      gateClosing: '10:00 PM',
      visitingHours: '9 AM - 7 PM'
    }
  },
  {
    name: 'Elite Student Stay',
    location: 'University Area, Block A',
    address: '78 University Road, Block A, City',
    coordinates: { latitude: 28.5234, longitude: 77.3845 },
    distance: '0.8 km',
    price: 12000,
    sharingType: 'Single',
    images: [
      'https://images.unsplash.com/photo-1549881567-c622c1080d78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwaG9zdGVsJTIwcm9vbXxlbnwxfHx8fDE3NzEwOTM5MTB8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.8,
    reviews: [],
    amenities: ['WiFi', 'Meals', 'AC', 'Parking', 'Laundry', 'Security', 'Gym'],
    gender: 'Co-living',
    available: true,
    description: 'Premium accommodation with luxury amenities and excellent service.',
    rules: ['No smoking in rooms', 'Gym open 6 AM - 10 PM', 'Quiet hours after 11 PM'],
    contactInfo: {
      phone: '+91 98765 43212',
      email: 'elite@studentstay.com',
      ownerName: 'Amit Verma'
    },
    facilities: {
      roomSize: '15x12 ft',
      bedType: 'Queen Bed',
      attached: true,
      balcony: true,
      furnishing: 'Fully Furnished'
    },
    timing: {
      gateClosing: '12:00 AM',
      visitingHours: '24/7'
    }
  },
  {
    name: 'Budget Friendly PG',
    location: 'Market Street, Near Bus Stand',
    address: '22 Market Street, City',
    coordinates: { latitude: 28.5678, longitude: 77.4123 },
    distance: '2.0 km',
    price: 5000,
    sharingType: 'Four Sharing',
    images: [
      'https://images.unsplash.com/photo-1596055318757-2bd56e35ed84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMGJlZHJvb20lMjB3aXRoJTIwZGVza3xlbnwxfHx8fDE3NzEwOTM5MTB8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.0,
    reviews: [],
    amenities: ['WiFi', 'Meals', 'Security'],
    gender: 'Male',
    available: true,
    description: 'Affordable option for students on a tight budget.',
    rules: ['No smoking', 'No guests after 8 PM', 'Gate closes at 10 PM'],
    contactInfo: {
      phone: '+91 98765 43213',
      email: 'budget@pg.com',
      ownerName: 'Suresh Patel'
    },
    facilities: {
      roomSize: '12x12 ft',
      bedType: 'Bunk Bed',
      attached: false,
      balcony: false,
      furnishing: 'Basic'
    },
    timing: {
      gateClosing: '10:00 PM',
      visitingHours: '10 AM - 6 PM'
    }
  },
  {
    name: 'Comfort Living PG',
    location: 'Tech Park Road',
    address: '56 Tech Park Road, City',
    coordinates: { latitude: 28.5567, longitude: 77.3967 },
    distance: '1.5 km',
    price: 9500,
    sharingType: 'Double Sharing',
    images: [
      'https://images.unsplash.com/photo-1611095459865-47682ae3c41c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDF8fHx8MTc3MTA3Njk0OHww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.6,
    reviews: [],
    amenities: ['WiFi', 'Meals', 'AC', 'Laundry', 'Parking', 'Security'],
    gender: 'Female',
    available: true,
    description: 'Comfortable and safe accommodation for working women.',
    rules: ['No smoking', 'No male visitors', 'Gate closes at 10:30 PM'],
    contactInfo: {
      phone: '+91 98765 43214',
      email: 'comfort@living.com',
      ownerName: 'Meena Gupta'
    },
    facilities: {
      roomSize: '13x11 ft',
      bedType: 'Single Bed',
      attached: true,
      balcony: true,
      furnishing: 'Semi-Furnished'
    },
    timing: {
      gateClosing: '10:30 PM',
      visitingHours: '10 AM - 7 PM'
    }
  },
  {
    name: 'Modern Stay PG',
    location: 'Campus Lane, Sector 12',
    address: '89 Campus Lane, Sector 12, City',
    coordinates: { latitude: 28.5123, longitude: 77.3723 },
    distance: '0.3 km',
    price: 11000,
    sharingType: 'Single',
    images: [
      'https://images.unsplash.com/photo-1744509636454-7b7d179b6d23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MTA2MTkwOXww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.7,
    reviews: [],
    amenities: ['WiFi', 'AC', 'Parking', 'Laundry', 'Security'],
    gender: 'Male',
    available: false,
    description: 'Modern PG with contemporary design and facilities.',
    rules: ['No smoking', 'Quiet hours 10 PM - 7 AM'],
    contactInfo: {
      phone: '+91 98765 43215',
      email: 'modern@stay.com',
      ownerName: 'Vikram Singh'
    },
    facilities: {
      roomSize: '14x13 ft',
      bedType: 'King Bed',
      attached: true,
      balcony: true,
      furnishing: 'Fully Furnished'
    },
    timing: {
      gateClosing: '11:30 PM',
      visitingHours: '9 AM - 9 PM'
    }
  },
  {
    name: 'Harmony Residency',
    location: 'Library Road, Block C',
    address: '34 Library Road, Block C, City',
    coordinates: { latitude: 28.5445, longitude: 77.3834 },
    distance: '1.0 km',
    price: 7500,
    sharingType: 'Triple Sharing',
    images: [
      'https://images.unsplash.com/photo-1758523669073-edfbea249144?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGFyZWQlMjBhcGFydG1lbnQlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc3MTA5MzkwOXww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.3,
    reviews: [],
    amenities: ['WiFi', 'Meals', 'AC', 'Security'],
    gender: 'Co-living',
    available: true,
    description: 'Peaceful environment perfect for students.',
    rules: ['Library hours maintained', 'No loud music'],
    contactInfo: {
      phone: '+91 98765 43216',
      email: 'harmony@residency.com',
      ownerName: 'Anjali Mehta'
    },
    facilities: {
      roomSize: '13x12 ft',
      bedType: 'Single Bed',
      attached: false,
      balcony: false,
      furnishing: 'Semi-Furnished'
    },
    timing: {
      gateClosing: '10:00 PM',
      visitingHours: '10 AM - 8 PM'
    }
  },
  {
    name: 'Prime Location PG',
    location: 'Metro Station Road',
    address: '67 Metro Road, City',
    coordinates: { latitude: 28.5789, longitude: 77.4056 },
    distance: '1.8 km',
    price: 8000,
    sharingType: 'Double Sharing',
    images: [
      'https://images.unsplash.com/photo-1549881567-c622c1080d78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwaG9zdGVsJTIwcm9vbXxlbnwxfHx8fDE3NzEwOTM5MTB8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.4,
    reviews: [],
    amenities: ['WiFi', 'Meals', 'Parking', 'Security'],
    gender: 'Female',
    available: true,
    description: 'Conveniently located near metro station for easy commute.',
    rules: ['No smoking', 'Gate closes at 10 PM'],
    contactInfo: {
      phone: '+91 98765 43217',
      email: 'prime@location.com',
      ownerName: 'Kavita Reddy'
    },
    facilities: {
      roomSize: '12x11 ft',
      bedType: 'Single Bed',
      attached: true,
      balcony: false,
      furnishing: 'Semi-Furnished'
    },
    timing: {
      gateClosing: '10:00 PM',
      visitingHours: '9 AM - 8 PM'
    }
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await PG.deleteMany({});
    console.log('Existing PGs deleted');

    // Insert sample data
    await PG.insertMany(samplePGs);
    console.log('Sample PGs inserted successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
