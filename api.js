const express = require('express')
const router = express.Router();
const nodemailer = require('nodemailer');



router.post('/send', (req, res) => {
    const { name, email, subject, message } = req.body;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'duraiessakimuthu@gmail.com',
            pass: 'flhy mcwk cnqr xhuq'
        }
    });

    var mailOptions = {
        from: 'duraiessakimuthu@gmail.com',
        to: 'manoj852407@gmail.com',
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