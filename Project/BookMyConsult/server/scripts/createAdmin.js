// createAdmin.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userDetails = require('../models/userModel'); // Update with the correct path to your model

async function createAdmin(name, email, password) {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/medical', { // Use environment variable for the connection string
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Check if the admin already exists
    const existingAdmin = await userDetails.findOne({ email });
    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new userDetails({
      name,
      email,
      password: hashedPassword,
      userType: 'admin' // Set userType to 'admin'
    });

    const result = await admin.save();
    console.log('Admin created:', result);
  } catch (err) {
    console.error('Error creating admin:', err);
  } finally {
    mongoose.connection.close();
  }
}

// Command-line arguments to run the script
const [,, name, email, password] = process.argv;

if (!name || !email || !password) {
  console.error('Please provide name, email, and password as command-line arguments');
  process.exit(1);
}

createAdmin(name, email, password);
