const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Destination = require('./src/models/Destination');

dotenv.config();

const fixDest = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/globetrotter');
        
        // 1. Fix Banff image
        await Destination.updateOne(
            { name: 'Banff, Canada' },
            { $set: { imageUrl: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=600&auto=format&fit=crop' } }
        );

        // 2. Change prices to numbers in Rupees
        const dests = await Destination.find({});
        for (let d of dests) {
            let numPrice = '₹50,000';
            if (d.price === '$$$' || d.price === '₹₹₹') numPrice = '₹1,20,000';
            else if (d.price === '$$' || d.price === '₹₹') numPrice = '₹85,000';
            else if (d.price === '$' || d.price === '₹') numPrice = '₹45,000';
            
            d.price = numPrice;
            await d.save();
        }

        console.log('Fixed Banff and changed prices to Rupee numbers');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

fixDest();
