const express = require('express');

const app = express();

const mongoose = require('mongoose');

const path = require('path');

const sample = require('./models/certificatedetails.js');

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.port;

uri = process.env.mongourl;

mongoose.connect(uri);

const database = mongoose.connection;

database.on('error',(error)=>{
    console.log(error);
})
database.once('connected',()=>{
    console.log('Database connected');
})

app.use(express.static(path.join(__dirname , 'public')))

app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{

    res.sendFile(path.join(__dirname, 'public', 'home.html'));

})

app.get('/issue',(req,res)=>{

    res.sendFile(path.join(__dirname, 'public', 'issueCertificate.html'));

})

app.post('/submit-form',async (req,res)=>{
   try{
    const data = req.body;
    console.log(data);
    const details = await sample.create(data);
    res.status(201).redirect('/thank-you');
   }
   catch(error){
    res.status(500).json
    }

})

app.get('/thank-you', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'formsubmit.html'));
});


app.get('/issue/:id', (req,res)=>{
    res.sendFile(path.join(__dirname , 'public', 'viewCertificate.html'));
})

app.get('/api/issue/:id',async (req,res)=>{
    const id = req.params.id;
    const detail = await sample.findOne({cid:id});
    console.log(detail);
    res.json(detail);
})


app.listen(port, ()=>{
    console.log(`running successfully in port ${port}`);
})

