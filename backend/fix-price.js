const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Destination = require('./src/models/Destination');

dotenv.config();

const fixPrice = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/globetrotter');
        
        const dests = await Destination.find({});
        for (let d of dests) {
            if (d.price && d.price.includes('₹')) {
                d.price = d.price.replace(/₹/g, '$');
                await d.save();
            }
        }
        console.log('Prices reverted to $');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

fixPrice();
