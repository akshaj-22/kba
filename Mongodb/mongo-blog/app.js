const express = require('express');

const app = express();

const mongoose=require('mongoose');

const sample=require('./models/blogdetails.js')

const path= require('path');

require('dotenv').config()

const uri = process.env.mongo_uri;

mongoose.connect(
    uri // using .env
);
const database = mongoose.connection;
database.on("error", (error) => {
    console.log(error);
});
database.once("connected", () => {
    console.log("Database Connected");
});

const PORT = 3005

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

// const blogPosts = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public', 'index.html'));
})

app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, './public', 'blog.html'))
})



app.post('/blog',async (req, res) => {
    try{
        const data=req.body;
        console.log(data)
        const details= await sample.create(data);
        res.status(201).redirect('/submitted');
        
    
       }
    catch(error){
    res.status(500).json
    }
        
    // Redirect to the certificate view page with the details
    // res.redirect(`/certificate?id=${id}`);
});

app.get('/submitted', (req, res) => {
    res.sendFile(path.join(__dirname, './public', 'submit.html'))
})



app.get('/blog/:id', (req,res) => {
    
    res.sendFile(path.join(__dirname, 'public', 'viewblog.html'));
})

app.get('/api/blog/:id',async (req,res) => {
    const id = req.params.id;
    const details= await sample.findOne({BlogId: id})
    console.log(details);
    res.json(details);
})

app.listen(PORT , ()=>{
    console.log(`The Application is running on port ${PORT}`)
} )