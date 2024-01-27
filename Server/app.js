const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const User = require('./Models/UserModel')
const Volunteer = require('./Models/VolunteerModel')
const Request = require('./Models/Request')
const socketIo = require('socket.io');
const http = require('http');
const dotenv = require('dotenv').config();
const app = express()
const server = http.createServer(app);
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URL)

app.post('/newUser',(req,res)=>{
  User.create(req.body)
  .then(request => res.json(request))
  .catch(err => res.json(err))
})

app.post('/setVol',(req,res)=>{
  Volunteer.create(req.body)
  .then(newVol => res.json(newVol))
  .catch(err => res.json(err))
})

app.post('/sendRequest',(req,res)=>{
  Request.create(req.body)
  .then(request => res.json(request))
  .catch(err => res.json(err))
})

app.get('/getUser', async (req,res)=>{

  const { email, password } = req.query;

  User.findOne({ email, password })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(user);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
}
  )

app.get('/userDetail/:userId',(req,res)=>{
  const userId = req.params.userId
  Request.findOne({_id:userId})
    .then(response=>res.json(response))
    .catch(err=>res.json(err));

})    


app.get('/getVolunteer',(req,res)=>{

    const { email, password } = req.query;
  
    Volunteer.findOne({ email, password })
      .then((vol) => {
        if (!vol) {
          res.status(404).json({ message: 'User not found' });
          return;
        }
        res.json(vol);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  }
    )

app.get('/getVol',(req,res)=>{
    const userId = req.params.userId
    Volunteer.findById({userId})
    .then(newVol => {
      console.log(userId)
      res.json(newVol)
    })
    .catch(err => res.json(err))
})

app.get('/volunteerData/:userId',(req,res)=>{

  const userId = req.params.userId;

  Volunteer.findOne({_id:userId})
    .then(response=>res.json(response))
    .catch(err=>res.json(err));
}
  )


app.post('/newUser',(req,res)=>{
    User.create(req.body)
    .then(request => res.json(request))
    .catch(err => res.json(err))
})

app.post('/sendRequest',(req,res)=>{
    Request.create(req.body)
    .then(request => res.json(request))
    .catch(err => res.json(err))
})

app.get('/newRequest',(req,res)=>{
  const area = req.query.area
  Request.find({'help':area})
  .then(vol=>{
    res.json(vol)
  })
  .catch(err=>res.json(err))
})

app.get('/nearbyVol',(req,res)=>{
  const help = req.query.help
    Volunteer.find({'area':help})
     .then(newVol =>{
      res.json(newVol)
    })
     .catch(err => res.json(err))
})

app.put('/editUser/:userId', (req,res)=>{
    const userId = req.params.userId;
    console.log(userId)
    const updatedData = req.body;
    console.log(updatedData)
    User.findOneAndUpdate(
        { _id: userId },
        { $set: updatedData }, 
        { new: true })
        .then(data=>res.json(data))
        .catch(err=>res.json(err))
        })
        
app.put('/editVol/:userId', (req,res)=>{
  const userId = req.params.userId;
  console.log(userId)
  const updatedData = req.body;
  console.log(updatedData)
  Volunteer.findOneAndUpdate(
      { _id: userId },
      { $set: updatedData }, 
      { new: true })
      .then(data=>res.json(data))
      .catch(err=>res.json(err))
      })       

app.listen(process.env.PORT,()=>{
    console.log(`server is running at ${process.env.PORT}`)
})