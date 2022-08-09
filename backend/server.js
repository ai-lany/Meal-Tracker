const express = require('express');
const cors = require('cors')
const axios = require('axios');
const path = require('path');

const mongoose = require('mongoose');
const Dish = require('./models/dishModel');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  ).then(() => console.log("MongoDB has been started.")).catch((err) => console.log(err));
  

const app = express();
const PORT = process.env.PORT || 3001
  
app.use(cors())
app.use(express.json())
  
app.use(express.static(path.resolve(__dirname, "../frontend/public")));



app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

  
app.listen(PORT, function(){
    console.log("Server is running on port "+ PORT)
    
});



app.post('/api/delete', async (req, res) => {
	const dish = await Dish.deleteOne({
		name: req.body.name,
	})
    console.log(req.body.name + " deleted.")
	return res.json({ status: 'ok', name: req.body.name})
	
})
app.post('/api/add', async (req, res) => {
	const dish = await Dish.create({
		name: req.body.name,
	}).then(()=>{
        console.log(req.body.name + " added.");
        return res.json({ status: 'ok', name: req.body.name})
    }).catch((e)=>{console.log(e.message)
        return res.json({ status: 'error', error: e.message})
	})


})

app.get('/api/dishes', async (req, res) => {
	const dishes = await Dish.find();
   


	return res.json({ status: 'ok', data: dishes })
	
})

app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "../frontend/public", "index.html"));
});