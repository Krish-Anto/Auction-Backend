const nodemailer = require('nodemailer');
const dotenv = require('dotenv')
dotenv.config()

const trasnporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        'user':process.env.EMAIL  ,
        'pass':process.env.Password
    }
})

const sendNotification = async (ownermail,adopterDetails) => {
    const mailOptions={
        from:process.env.EMAIL,
        to:ownermail,
        subject :'New Pet Adoption Request',
        text:`You have a new adoption request.
      Adopter Details:
      Name: ${adopterDetails.name}
      Email: ${adopterDetails.email}
      Phone: ${adopterDetails.phone}
      Message: ${adopterDetails.message}
      
      Please check your dashboard for more details.`
    }
    try{
        await trasnporter.sendMail(mailOptions);
        console.log('Adoption notification sent successfully');
    }
    catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = {sendNotification}