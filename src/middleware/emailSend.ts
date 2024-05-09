import nodemailer from 'nodemailer';


const sendEmail = async (subject: string, htmlMessage: string, emailTo: string = "manishimwejosephs@gmail.com"): Promise<void> => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_FROM,
            pass: process.env.EMAIL_FROM_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: emailTo,
        subject: subject,
        html: htmlMessage,
    };
    try {
        await transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.error('Error sending email:', error);
            }else{
                console.log('Email sent:'+ info.response);
            }
        });
    } catch (error) {
        // console.error('Error sending email:', error);
    }
}

export default sendEmail