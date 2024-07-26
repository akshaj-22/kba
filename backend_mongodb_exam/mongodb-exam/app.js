const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const reservation = require('./Models/appointments.js');
const dotenv = require('dotenv');
app.use(express.json());
dotenv.config();

const uri = process.env.mongodb_uri;
mongoose.connect(uri);

const database = mongoose.connection;
database.on("error", (error) => {
    console.log(error);
});
database.once("connected", () => {
    console.log("Database Connected");
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//check
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
//check
app.get('/reserve', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'booking.html'));
});
//check
app.get('/thank-you', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'submitted.html'));
});
app.get('/reserve/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'viewappointments.html'));
})

app.get('/update/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'update.html'));
})
app.get('/reservation/:reservationDate', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'reservation.html'));
})
//reservation submit
app.post('/submit', async (req, res) => {
    try {
        const data = req.body;
        const result = await reservation.create(data);
        console.log(result);
        res.status(201).redirect('/thank-you');
        // res.status(201).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json();
    }
});

//reservation view using date
app.get('/api/reservation/:date', async (req, res) => {
    try {
        const reserveDate = req.params.date;
        const reservationList = await reservation.find({ date:reserveDate});

        if (reservationList.length > 0) {
            res.status(200).json(reservationList);
        } else {
            res.status(404).json({ message: 'No reservation found for this date' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

//show all reservation
app.get('/api/reservation', async (req, res) => {
    try {
        const allReservation = await reservation.find();

        if (allReservation.length > 0) {
            res.status(200).json(allReservation);
        } else {
            res.status(404).json({ message: 'No reservation found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

//reservation update
app.put("/api/reservation/:id",async(req,res)=>{
    const putid=req.params.id;
    const data=req.body;
    const result=await reservation.updateOne({reservationId:putid},{$set:data})
    res.json(result)
})


//reservation delete
app.delete('/api/reservation/:id', async (req, res) => {
    try {
        const delid = req.params.id;

        const deletedDetails = await reservation.deleteOne({ reservationId: delid });

        if (deletedDetails) {
            res.status(200).json({ message: 'Reservation Details deleted successfully' });
        } else {
            res.status(404).json({ message: 'Reservation Details not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
