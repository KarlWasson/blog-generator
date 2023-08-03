const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Require cors
const app = express();

var corsOptions = {
  origin: ['http://localhost:3000', 'https://blog-generator-df30rjn94-karlwasson.vercel.app/'],
  optionsSuccessStatus: 200, // For legacy browser support
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.post('/api/generateOutline', async (req, res) => {
  const { title, description, tag } = req.body;
  
  const prompt = `Generate an outline for a blog post. Title: ${title}, Description: ${description}, Tag: ${tag}`;

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      prompt: prompt,
      max_tokens: 200
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });
    console.log(response.data)
    res.json({ outline: response.data.choices[0].text.trim() });
  } catch (error) {
    console.log(error.message)
    res.json({ error: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
