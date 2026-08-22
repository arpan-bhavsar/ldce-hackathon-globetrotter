const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Trip = require('./src/models/Trip');

dotenv.config();

const fixCountry = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/globetrotter');
        
        await Trip.updateMany(
            {},
            { $set: { country: 'India' } }
        );
        console.log('Trips updated to India');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

fixCountry();
