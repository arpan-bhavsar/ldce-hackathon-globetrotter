const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./src/models/User');

dotenv.config();

const fixAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/globetrotter');
        const hashedPassword = await bcrypt.hash('password123', 10);
        
        await User.updateOne(
            { email: 'admin@globetrotter.app' },
            { 
                $set: { 
                    password: hashedPassword,
                    isAdmin: true
                }
            },
            { upsert: true }
        );
        console.log('Admin password fixed');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

fixAdmin();
