const express = require('express');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
// const User = require('../models/userModel.js');
const Appointment = require('../models/appointmentModel.js');
const Doctor = require('../models/doctorModel.js');

const router = express.Router();

// Middleware
router.use(cookieParser());
router.use(express.json());

// Verify Token Middleware with User Type Check ADMIN
const adminVerifyTokenAndUserType = (req, res, next) => {
  const token = req.cookies.Authtoken;
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, 'mysecret');
    req.email = decoded.email;
    req.userType = decoded.userType; // Assuming token contains userType

    if (req.userType !== 'admin') {
      return res.status(403).json({ message: "Access denied. Not a user." });
    }

    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(403).json({ message: "Invalid token." });
  }
};
  //show all appointments for the particular date
  router.get("/appointment-print/:date",adminVerifyTokenAndUserType,async(req,res)=>{
    try{
    const date=req.params.date
    const appointments=await Appointment.find({date:date})
    console.log(appointments)
    res.status(200).send(appointments)
    }catch(error){
      console.log(error)
    }

    

  })

  //admin functionality start

  // Add a new doctor
router.post('/doctors', adminVerifyTokenAndUserType, async (req, res) => {
  try {
    const { name, specialization, availableDates } = req.body;

    const doctor = new Doctor({
      name,
      specialization,
      availableDates
    });

    const result = await doctor.save();
    res.status(201).json({ message: 'Doctor added successfully', doctor: result });
  } catch (err) {
    console.error("Error adding doctor:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update doctor availability
router.put('/doctors/:id', adminVerifyTokenAndUserType, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, specialization, availableDates } = req.body;

    const doctor = await Doctor.findByIdAndUpdate(id, {
      name,
      specialization,
      availableDates
    }, { new: true });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ message: 'Doctor updated successfully', doctor });
  } catch (err) {
    console.error("Error updating doctor:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all doctors
router.get('/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({ doctors });
  } catch (err) {
    console.error("Error fetching doctors:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get a specific doctor by ID
router.get('/doctors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);
    
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ doctor });
  } catch (err) {
    console.error("Error fetching doctor:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Delete a specific doctor by ID
router.delete('/doctors/:id', adminVerifyTokenAndUserType, async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByIdAndDelete(id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (err) {
    console.error("Error deleting doctor:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// router.delete('/doctors/:id', adminVerifyTokenAndUserType, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const doctor = await Doctor.findByIdAndDelete(id);

//     if (!doctor) {
//       return res.status(404).json({ message: "Doctor not found" });
//     }

//     res.status(200).json({ message: 'Doctor deleted successfully' });
//   } catch (err) {
//     console.error("Error deleting doctor:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });


  //admin functionality end



module.exports = router;
