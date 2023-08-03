module.exports = (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', 'https://blog-generator-df30rjn94-karlwasson.vercel.app/'); // Allow localhost
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    // Pre-flight request. Reply successfully:
    res.status(200).send('OK');
    return;
  }

  // Your endpoint logic goes here

  res.status(200).json({ message: 'Hello from generateOutline' });
}
