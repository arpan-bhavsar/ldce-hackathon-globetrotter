const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Trip = require('./src/models/Trip');
const Post = require('./src/models/Post');
const User = require('./src/models/User');

dotenv.config();

const seedVideoData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/globetrotter');
        
        const arpan = await User.findOne({ email: 'arpanjbhavsar422@gmail.com' });
        
        if (!arpan) {
            console.error('User Arpan not found! Aborting.');
            process.exit(1);
        }

        console.log('Clearing old trips for Arpan...');
        await Trip.deleteMany({ userId: arpan._id });

        console.log('Seeding rich trips for Arpan...');
        const trips = [
            {
                userId: arpan._id,
                title: 'Euro Trip 2023',
                destination: 'Paris, France',
                country: 'France',
                startDate: new Date('2023-06-10'),
                endDate: new Date('2023-06-20'),
                status: 'Completed',
                budget: 250000,
                itinerary: [
                    {
                        date: new Date('2023-06-11'),
                        location: 'Paris',
                        activities: [
                            { time: '09:00', name: 'Eiffel Tower Tour', cost: 4500 },
                            { time: '13:00', name: 'Louvre Museum', cost: 2500 },
                            { time: '19:00', name: 'Dinner at Le Jules Verne', cost: 12000 }
                        ]
                    },
                    {
                        date: new Date('2023-06-12'),
                        location: 'Paris',
                        activities: [
                            { time: '10:00', name: 'Seine River Cruise', cost: 3000 },
                            { time: '14:00', name: 'Montmartre Walk', cost: 0 }
                        ]
                    }
                ]
            },
            {
                userId: arpan._id,
                title: 'Swiss Alps Getaway',
                destination: 'Zurich, Switzerland',
                country: 'Switzerland',
                startDate: new Date('2023-12-15'),
                endDate: new Date('2023-12-25'),
                status: 'Completed',
                budget: 350000,
                itinerary: [
                    {
                        date: new Date('2023-12-16'),
                        location: 'Interlaken',
                        activities: [
                            { time: '08:00', name: 'Jungfraujoch Express', cost: 18000 },
                            { time: '15:00', name: 'Skiing Lesson', cost: 12000 }
                        ]
                    }
                ]
            },
            {
                userId: arpan._id,
                title: 'Summer in Japan',
                destination: 'Kyoto, Japan',
                country: 'Japan',
                startDate: new Date('2024-04-05'),
                endDate: new Date('2024-04-15'),
                status: 'Completed',
                budget: 180000,
                itinerary: [
                    {
                        date: new Date('2024-04-06'),
                        location: 'Kyoto',
                        activities: [
                            { time: '09:00', name: 'Fushimi Inari Shrine', cost: 0 },
                            { time: '12:00', name: 'Matcha Tea Ceremony', cost: 4000 }
                        ]
                    }
                ]
            },
            {
                userId: arpan._id,
                title: 'Upcoming Bali Retreat',
                destination: 'Bali, Indonesia',
                country: 'Indonesia',
                startDate: new Date('2024-10-10'),
                endDate: new Date('2024-10-20'),
                status: 'Upcoming',
                budget: 95000,
                itinerary: [
                    {
                        date: new Date('2024-10-11'),
                        location: 'Ubud',
                        activities: [
                            { time: '10:00', name: 'Monkey Forest Sanctuary', cost: 800 },
                            { time: '14:00', name: 'Tegalalang Rice Terrace', cost: 500 }
                        ]
                    }
                ]
            },
            {
                userId: arpan._id,
                title: 'Weekend in Dubai',
                destination: 'Dubai, UAE',
                country: 'UAE',
                startDate: new Date('2024-12-01'),
                endDate: new Date('2024-12-05'),
                status: 'Upcoming',
                budget: 150000,
                itinerary: [
                    {
                        date: new Date('2024-12-02'),
                        location: 'Dubai',
                        activities: [
                            { time: '17:00', name: 'Burj Khalifa At The Top', cost: 6500 },
                            { time: '20:00', name: 'Desert Safari', cost: 4500 }
                        ]
                    }
                ]
            }
        ];

        await Trip.insertMany(trips);

        console.log('Clearing old posts...');
        await Post.deleteMany({});

        console.log('Seeding rich community posts...');
        const posts = [
            { authorName: 'Alice Smith', location: 'Paris', content: 'Just booked my tickets to Paris! Any recommendations for good cafes near the Louvre?' },
            { authorName: 'David Lee', location: 'Santorini', content: 'The sunsets in Oia are absolutely breathtaking. A must-see if you are visiting Greece! 🌅' },
            { authorName: 'Sarah Jenkins', location: 'New York', content: 'Can anyone recommend a good Broadway show that is currently running? Taking my family next month.' },
            { authorName: 'Charlie Davis', location: 'Tokyo', content: 'The cherry blossoms are incredible this time of year. Highly recommend visiting Shinjuku Gyoen early in the morning. 🌸' },
            { authorName: 'Elena Rodriguez', location: 'Machu Picchu', content: 'Just finished the 4-day Inca Trail hike. It was exhausting but the view at the Sun Gate was worth every step! ⛰️' },
            { authorName: 'Michael Chang', location: 'Dubai', content: 'Any tips for surviving the summer heat in Dubai? Planning to spend most of my time indoors!' }
        ];

        await Post.insertMany(posts);

        console.log('✅ Video data seeded successfully!');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedVideoData();
