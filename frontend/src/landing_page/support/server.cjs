require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();


// Middleware
app.use(cors({
    origin: 'http://localhost:5173' // Restrict to your frontend origin
}));
app.use(express.json());

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname)));

// Single root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'portfolio.html'));
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false // Add this for local development
    }
});

app.post('/send-email', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        const mailOptions = {
            from: `"Portfolio Form" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO,
            replyTo: `"${name}" <${email}>`,
            subject: `New message: ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Message:</strong> ${message}</p>
            `
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Message sent successfully!" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to send message. Please try again." });
    }
});

// Start server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access your portfolio at: http://localhost:${PORT}`);
});