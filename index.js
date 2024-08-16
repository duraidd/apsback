const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const api = require('./api');

const app = express();

var whitelist = ['https://apssite.vercel.app/','https://apssite.vercel.app','http://localhost:3000']
var corsOptions = {
    origin: function (origin, callback) {

      console.log("origin",origin);

      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }


app.use(cors(corsOptions));
app.use(express.json());


app.get('/',(req,res)=>{
    res.json({message:"welcome to aps backend"})
})



app.use('/aps',api)



app.listen(5000, () => {
    console.log('Server running on port 5000');
});
