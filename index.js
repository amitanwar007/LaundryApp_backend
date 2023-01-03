const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
const jwt = require('jsonwebtoken');
SECRET = "RESTAPI" 

const app = express(); 

app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


 /* ==================== INITIALISE ROUTES =======================*/
  const loginRoutes = require("./routes/login")
  const registerRoutes = require("./routes/registration")
  const orderRoutes = require("./routes/orders")
  const createOrderRoutes = require("./routes/createOrder")
  

  /* Connecting to Database */
  mongoose
  .connect("mongodb+srv://root-instaclone:instacloneHKA@cluster0.vqsgmeu.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
const PORT = process.env.PORT || 5000

/* ==================== AUTHORIZATION ============================*/
app.use("/orders",(req,res,next)=>{
  var token = req.headers.authorization.split("Bearer ")[1];
  if(!token){
      return res.status(401).json({
          status:"failed",
          message:"token is missing"
      })
  }
  jwt.verify(token,SECRET,function(err,decoded){  // jwt keeps a record of the tokens
      if(err){
          return res.status(401).json({
              status:"failed",
              message:"invalid token"
          })
      }
      else{
          req.user = decoded.data
          next();
      }
  })
})

app.use("/",registerRoutes)
app.use("/",loginRoutes)
app.use("/",createOrderRoutes)
app.use("/",orderRoutes)


app.listen(PORT,()=>{  
    console.log(`example app listening on port ${PORT}`);
})