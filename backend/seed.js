const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

const Destination = require('./src/models/Destination');
const User = require('./src/models/User');
const Trip = require('./src/models/Trip');
const Post = require('./src/models/Post');

// Connect to DB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/globetrotter')
  .then(() => console.log('Connected to MongoDB for Seeding'))
  .catch(err => console.error(err));

const seedData = async () => {
  try {
    console.log('Clearing old data...');
    await Destination.deleteMany();
    await User.deleteMany({ email: { $in: ['alice@example.com', 'bob@example.com', 'charlie@example.com', 'diana@example.com', 'demo@globetrotter.app'] } });
    // Note: not deleting all trips/posts to avoid wiping user's real manual tests, just seeding new ones if needed, or maybe we can delete all to be safe? 
    // The user wants it to "seem it is perfect working". Let's just clear dummy stuff.
    
    console.log('Seeding Destinations...');
    const destinations = [
      { city: 'Kyoto, Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&auto=format&fit=crop&q=80', price: '$$$' },
      { city: 'Santorini, Greece', image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600&auto=format&fit=crop&q=80', price: '$$$' },
      { city: 'Bali, Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=80', price: '$' },
      { city: 'Rome, Italy', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&auto=format&fit=crop&q=80', price: '$$' },
      { city: 'Banff, Canada', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Moraine_Lake_17092005.jpg/600px-Moraine_Lake_17092005.jpg', price: '$$' },
      { city: 'Machu Picchu, Peru', image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600&auto=format&fit=crop&q=80', price: '$$' },
      { city: 'Marrakech, Morocco', image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600&auto=format&fit=crop&q=80', price: '$' },
      { city: 'Sydney, Australia', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&auto=format&fit=crop&q=80', price: '$$$' },
      // Add a couple more robust ones
      { city: 'New York, USA', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&auto=format&fit=crop&q=80', price: '$$$' },
      { city: 'Paris, France', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&auto=format&fit=crop&q=80', price: '$$$' },
      { city: 'Dubai, UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&auto=format&fit=crop&q=80', price: '$$$' },
      { city: 'Phuket, Thailand', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&auto=format&fit=crop&q=80', price: '$' },
    ];
    await Destination.insertMany(destinations);

    console.log('Seeding Dummy Users...');
    const users = [
      { firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com', password: 'password123' },
      { firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', password: 'password123' },
      { firstName: 'Charlie', lastName: 'Davis', email: 'charlie@example.com', password: 'password123' },
      { firstName: 'Diana', lastName: 'Prince', email: 'diana@example.com', password: 'password123' },
      { firstName: 'Admin', lastName: 'User', email: 'admin@globetrotter.app', password: 'password123', isAdmin: true },
    ];
    const createdUsers = await User.insertMany(users);

    console.log('Seeding Dummy Trips...');
    // Create some trips for Alice
    const trip1 = new Trip({
      userId: createdUsers[0]._id,
      title: 'Summer in Paris',
      startDate: new Date('2024-07-01'),
      endDate: new Date('2024-07-10'),
      destination: 'Paris, France',
      status: 'Upcoming',
      itinerary: [
        {
          date: new Date('2024-07-01'),
          location: 'Paris',
          activities: [
            { time: '10:00', name: 'Eiffel Tower', cost: 3500 },
            { time: '14:00', name: 'Louvre Museum', cost: 2000 }
          ]
        }
      ]
    });
    const trip2 = new Trip({
      userId: createdUsers[1]._id,
      title: 'Bali Retreat',
      startDate: new Date('2024-08-15'),
      endDate: new Date('2024-08-25'),
      destination: 'Bali, Indonesia',
      status: 'Upcoming',
      itinerary: [
        {
          date: new Date('2024-08-15'),
          location: 'Ubud',
          activities: [
            { time: '09:00', name: 'Monkey Forest', cost: 500 },
            { time: '12:00', name: 'Rice Terraces', cost: 800 }
          ]
        }
      ]
    });
    await trip1.save();
    await trip2.save();

    console.log('Seeding Dummy Posts...');
    const posts = [
      { authorName: 'Alice Smith', location: 'Paris', content: 'Just booked my tickets to Paris! Any recommendations for good cafes near the Louvre?' },
      { authorName: 'Charlie Davis', location: 'Tokyo', content: 'The cherry blossoms are incredible this time of year. Highly recommend visiting Shinjuku Gyoen early in the morning.' }
    ];
    await Post.insertMany(posts);

    console.log('✅ Seeding Complete!');
    process.exit();
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seedData();
