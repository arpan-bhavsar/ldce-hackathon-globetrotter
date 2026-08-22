const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Destination = require('./src/models/Destination');

dotenv.config();

const fixBanff = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/globetrotter');
        
        await Destination.updateOne(
            { name: 'Banff, Canada' },
            { 
                $set: { 
                    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Moraine_Lake_17092005.jpg/600px-Moraine_Lake_17092005.jpg'
                }
            }
        );
        console.log('Banff image fixed in DB');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

fixBanff();
