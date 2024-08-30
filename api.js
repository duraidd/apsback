const express = require('express')
const router = express.Router();
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const multer = require('multer');


const upload = multer({
  storage: multer.diskStorage({
      filename: function (req, file, cb) {
          cb(null, file.originalname)
      }
  }),
  // limits: { fileSize: 50000000000 }
})


router.post('/send', (req, res) => {
  const { name, email, subject, message } = req.body;


  let emailId = ['hr@apstechnologies.co.in', 'admin@apstechnologies.co.in']

  let c = 0;

  emailId.forEach((data) => {

    c = c + 1;

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
            <p>23/c, first floor,</p>
          <p>Raja Rajeshwari Nagar,</p>
          <p>south Street, NGO B colony,</p>
          <p>Tirunelveli 627007</p>
          </body>
        </html>
      `
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {




        if (c === emailId.length) {
          res.json({ status: 200, message: "Your Details has Received" });
          console.log('Email sent: ' + info.response);
        }



      }
    });
  })

});


router.post('/sendcareer',upload.single('resume'), (req, res) => {


  const resume = req.file;

  const { name, email, number ,job } = req.body;


  let emailId = ['admin@apstechnologies.co.in']

  let c = 0;

  emailId.forEach((data) => {

    c = c + 1;

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
      subject: "Job Application for "+ job,
      html: `
        <html lang="en">    
          <body>
            <h2>
              Name : ${name}            
            </h2>
            <h3>Email: ${email}</h3>
            <h4>
               Mobile No: ${number}
            </h4>
            <img src="https://apssite.vercel.app/static/media/Logo.5a71d3cd837e49a76adc.jpg" height="100px" width="200px" />
            <p>23/c, first floor,</p>
          <p>Raja Rajeshwari Nagar,</p>
          <p>south Street, NGO B colony,</p>
          <p>Tirunelveli 627007</p>
          </body>
        </html>
      `,
      attachments: [resume]
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {




        if (c === emailId.length) {
          res.json({ status: 200, message: "Your Job Application Received" });
          console.log('Email sent: ' + info.response);
        }



      }
    });
  })

});


module.exports = router;