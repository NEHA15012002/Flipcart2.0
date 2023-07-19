const express = require('express');
const env = require('dotenv');
const app =express();
const bodyParser =require('body-parser');
const mongoose = require('mongoose');

//routes
const userRoutes = require('./routes/user');



env.config(); 

  mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.gni7swg.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    { 
       
        
    }).then(()=>{
        console.log('Database connected')
    });
    

  //mongodb+srv://Neha15012002:<password>@cluster0.gni7swg.mongodb.net/?retryWrites=true&w=majority



app.use(bodyParser());
app.use('/api',userRoutes)



app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});
