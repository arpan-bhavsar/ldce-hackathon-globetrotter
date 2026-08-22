const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Destination = require('./src/models/Destination');

dotenv.config();

const fixBanffReal = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/globetrotter');
        
        const result = await Destination.updateOne(
            { city: 'Banff, Canada' },
            { $set: { image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=600&auto=format&fit=crop' } }
        );
        console.log('Update result:', result);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

fixBanffReal();
