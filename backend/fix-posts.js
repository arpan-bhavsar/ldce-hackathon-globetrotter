const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Post = require('./src/models/Post');

dotenv.config();

const fixPosts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/globetrotter');
        
        // Delete all posts
        await Post.deleteMany({});
        
        // Add just the two original dummy posts
        const posts = [
          { authorName: 'Alice Smith', location: 'Paris', content: 'Just booked my tickets to Paris! Any recommendations for good cafes near the Louvre?' },
          { authorName: 'Charlie Davis', location: 'Tokyo', content: 'The cherry blossoms are incredible this time of year. Highly recommend visiting Shinjuku Gyoen early in the morning.' }
        ];
        await Post.insertMany(posts);

        console.log('Cleared duplicates and re-seeded 2 posts');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

fixPosts();
