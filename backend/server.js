const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { getGPTResponse } = require('./gptService');
const { sendLeadToHubSpot } = require('./hubspotService');
const { systemPrompt } = require('./promptTemplates');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chatbot', async (req, res) => {
  const { message, customer } = req.body;
  try {
    const gptReply = await getGPTResponse(systemPrompt, message);
    if (gptReply.toLowerCase().includes('interested')) {
      await sendLeadToHubSpot(customer);
    }
    res.json({ reply: gptReply });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing chatbot request');
  }
});

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);