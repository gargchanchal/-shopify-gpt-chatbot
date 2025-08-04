const axios = require('axios');

async function sendLeadToHubSpot(customer) {
  const response = await axios.post(
    'https://api.hubapi.com/crm/v3/objects/contacts',
    {
      properties: {
        email: customer.email,
        firstname: customer.firstName,
        lastname: customer.lastName,
        phone: customer.phone,
        lead_source: 'AI Chatbot',
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );
  console.log('Lead sent to HubSpot:', response.data);
  return response.data;
}

module.exports = { sendLeadToHubSpot };