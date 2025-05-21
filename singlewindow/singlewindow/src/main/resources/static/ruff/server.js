const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Your Fast2SMS API Key
const API_KEY = "cEt5TiSFYyqf3Pn6psXUMHwG4m2ju1O8ZvrKbeV9CzAIQhLxNWz31bPs4p6LiJVSCKuBqlfgrEWTt2HZ";

app.use(cors());
app.use(bodyParser.json());

// Send OTP route
app.post('/send-otp', async (req, res) => {
  const { phone } = req.body;

  // Generate a random OTP (6 digits)
  const otp = Math.floor(100000 + Math.random() * 900000);

  try {
    const response = await axios.post('https://www.fast2sms.com/dev/bulkV2', {
      sender_id: "FSTSMS", // Your sender name (you can choose this in Fast2SMS)
      message: `Your OTP is ${otp}`,
      language: "english",
      route: "otp",
      numbers: phone,  // recipient phone number
    }, {
      headers: {
        "authorization": API_KEY
      }
    });

    if (response.data.return === "Success") {
      res.json({ success: true, otp });
    } else {
      res.status(400).json({ success: false, message: 'Failed to send OTP' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error sending OTP', error: error.message });
  }
});

// Verify OTP route (example of verifying OTP locally or with your own logic)
app.post('/verify-otp', (req, res) => {
  const { otp, receivedOtp } = req.body;

  if (otp === receivedOtp) {
    res.json({ success: true, message: 'OTP Verified' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid OTP' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ OTP backend server running on http://localhost:${PORT}`);
});
