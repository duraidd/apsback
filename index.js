const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const api = require('./api');

const app = express();
app.use(cors());
app.use(express.json());


app.get('/',(req,res)=>{
    res.json({message:"welcome to aps backend"})
})



app.use('/aps',api)


app.listen(5000, () => {
    console.log('Server running on port 5000');
});
