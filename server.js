const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Validate
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  // Log the submission (hook up to email/DB later)
  console.log('--- New Contact Submission ---');
  console.log(`Name:    ${name}`);
  console.log(`Email:   ${email}`);
  console.log(`Message: ${message}`);
  console.log('-----------------------------');

  res.json({ success: true, message: 'Message sent. Thank you!' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
