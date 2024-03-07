const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/userModel');
require('dotenv').config();

async function seedAdmin() {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    const adminExists = await User.findOne({ username: 'admin' });
    if (adminExists) {
        console.log('Admin user already exists');
        return;
    }

    const hashedPassword = await bcrypt.hash('admin123', 10); 
    const adminUser = new User({
        username: 'admin',
        password: hashedPassword, 
        role: 'admin',
    });

    await adminUser.save();
    console.log('Admin user created');

    mongoose.connection.close();
}

seedAdmin().catch(console.error);
