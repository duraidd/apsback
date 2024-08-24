const express = require('express')
const router = express.Router();
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();



router.post('/send', (req, res) => {
  const { name, email, subject, message } = req.body;

  let emailId = ['hr@apstechnologies.co.in','admin@apstechnologies.co.in']

  let c = 0;

  emailId.forEach((data)=>{

    c=c+1;

    var transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 587,
      secure: false, // or 'STARTTLS'
      auth: {
        user: process.env.USER,
        pass: process.env.PASS
      }
    });
  
    var mailOptions = {
      from: 'contact@apstechnologies.co.in',
      to: data,
      subject: subject,
      html: `
        <html lang="en">    
          <body>
            <h2>
              Name : ${name}            
            </h2>
            <h3>Email: ${email}</h3>
            <p>
              ${message}
            </p>
            <img src="https://apssite.vercel.app/static/media/Logo.5a71d3cd837e49a76adc.jpg" height="100px" width="200px" />
          </body>
        </html>
      `
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {

        if(c=== emailId.length){
          res.json({ status: 200, message: "Your Details has Received" });
          console.log('Email sent: ' + info.response);
        }

       
      }
    });


  })


 




});


module.exports = router;