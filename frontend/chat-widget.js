async function sendMessage() {
  const message = document.getElementById('userInput').value;
  const response = await fetch('http://localhost:5000/api/chatbot', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      customer: {
        email: 'customer@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '1234567890',
      },
    }),
  });
  const data = await response.json();
  document.getElementById('chatWindow').innerHTML += `
    <div><b>You:</b> ${message}</div>
    <div><b>Bot:</b> ${data.reply}</div>
  `;
}