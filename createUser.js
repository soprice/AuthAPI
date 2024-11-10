const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/userModel');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Connected to MongoDB');

        // create user
        const username = 'testuser';
        const password = 'password123';
        const role = 'user'; 
        // rechec dub
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log('User already exists');
            mongoose.connection.close();
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
            role
        });


        await newUser.save();
        console.log('User created successfully');
        mongoose.connection.close();
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        mongoose.connection.close();
    });
