const express = require('express')
const router = express.Router();
const nodemailer = require('nodemailer');



router.post('/send', (req, res) => {
    const { name, email, subject, message } = req.body;

    var transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 587,
      secure: false, // or 'STARTTLS'
      auth: {
        user: 'contact@apstechnologies.co.in',
        pass: 'T@h4Z85NqQ55#'
      }
    });

    var mailOptions = {
        from: 'contact@apstechnologies.co.in',
        to: 'hr@apstechnologies.co.in',
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
        </body>
      </html>
    `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            res.json({status:200,message:"Your Details has Received"});
            console.log('Email sent: ' + info.response);
        }
    });

    


});


module.exports = router;