const express = require('express');
require('dotenv').config();
const cors = require('cors');
const initDB = require('./db').initDB;
const pdf = require('html-pdf');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: ['http://localhost:3002', 'http://localhost:3001']
}));

initDB();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port : process.env.SMTP_PORT,
    auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
    },
    tls:{
        rejectUnauthorized:false
    }
})

const options = { format: 'A4' };

app.post('/send-pdf', (req, res) => {
    const { email, company } = req.body

    pdf.create(pdfTemplate(req.body), options).toFile('invoice.pdf', (err) => {
       
        transporter.sendMail({
            from: `<banceris@gmail.com>`,
            to: `${email}`,
            replyTo: `${company.email}`,
            subject: `Invoice from ${company.businessName ? company.businessName : company.name}`,
            text: `Invoice from ${company.businessName ? company.businessName : company.name }`,
            html: emailTemplate(req.body),
            attachments: [{
                filename: 'invoice.pdf',
                path: `${__dirname}/invoice.pdf`
            }]
        });

        if(err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    });
});

app.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('invoice.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    });
});

app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/invoice.pdf`)
})


const routes = require('./routes/user');
app.use('/', routes);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));