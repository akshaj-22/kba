const express = require("express");
const router = express.Router();
const certificate = require("../models/issueCertificate");

router.get("/certificate/:id",async (req, res) => {
  try{
  const Id = req.params.id;
  const details = await certificate.findOne({ certificateId: Id });
  res.json(details);
  }
  catch(error){
    console.log(error);
    res.status(500).json("error while adding data");
  }
});

router.post("/certificate",async (req, res) => {
  try {
      const data = req.body;
      const result = await certificate.create(data);
      res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json("error while adding data");
  }
});



module.exports = router;
