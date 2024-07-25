const express = require("express");
const path=require('path')
const app = express();
port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname,'./public/static','index.html')))

const empList = [];
let updateid = 1;


app.get('/',(req,res)=>{
     res.sendFile(path.join(__dirname,'./public/static','index.html'))
})

app.post("/add/details", (req, res) => {
const {name,role} = req.body
if(name !=='' && role !==''){
  let newemp = {id:updateid++ , name, role}
  empList.push(newemp);
  res.status(200).json(newemp);
  }
else{
  res.status(400).json({error:"Please enter valid details"});
}
});


app.get("/view", (req, res) => {
  res.json(empList);
});

app.put("/edit/:id", (req, res) => {
      const id = req.params.id;
      const { name, role } = req.body;
      const employee = empList.find(e => e.id == id);
      if (employee) {
          if (name) employee.name = name;
          if (role) employee.role = role;
          res.json(employee);
      } else {
          res.status(404).json({ error: 'Invalid Employee' });
      }
});

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  const Index = empList.findIndex(emp => emp.id == id);
  //console.log(Index);
  if (Index>=0) {
      empList.splice(Index, 1);
      res.status(201).json(empList);
  } else {
      res.status(404).json({ error: 'cant find employee' });
  }
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});