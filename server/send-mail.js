const nodemailer = require('nodemailer');
const path = require('path');

const sendEmail = async (mailObj) => {
    const { from, to, subject, text } = mailObj;

    try {
        let transporter = nodemailer.createTransport({
            host: "smtp-relay.sendinblue.com",
            port: 587,
            auth: {
                user: process.env.SENDINBLUE_USER,
                pass: process.env.SENDINBLUE_PASS,
            },
        });

        let info = await transporter.sendMail({
            from: from,
            to: to,
            subject: subject,
            text: text,
            html: {
                path: path.resolve(__dirname, "./mail.html"),
            },
        });

        console.log(`Message sent: ${info.messageId}`);
        return `Message sent: ${info.messageId}`;
    } catch (error) {
        console.error(error);
        throw new Error(
            `Something went wrong in the sendmail method. Error: ${error.message}`
        );
    }
}


module.exports = sendEmail;
