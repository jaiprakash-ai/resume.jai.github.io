import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ message: 'Missing required fields' });
    return;
  }

  // Configure your SMTP transporter here
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER, // Correct environment variable
      pass: process.env.GMAIL_PASS, // Correct environment variable
    },
  });

  const mailOptions = {
    from: `"${name}" <${process.env.GMAIL_USER}>`, // Sending from your address
    to: process.env.GMAIL_USER, // Sending to your address
    subject: `New Contact Form Message from ${name}`,
    replyTo: email, // This allows you to directly reply to the user
    text: `You have a new message from:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `<p>You have a new message from:</p>
           <ul>
             <li><strong>Name:</strong> ${name}</li>
             <li><strong>Email:</strong> ${email}</li>
           </ul>
           <p><strong>Message:</strong></p>
           <p>${message}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
}
