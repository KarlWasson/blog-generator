const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/generateOutline', async (req, res) => {
  const { title, description, tag } = req.body;
  
  const prompt = `Generate an outline for a blog post. Title: ${title}, Description: ${description}, Tag: ${tag}`;

  try {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: prompt,
      max_tokens: 200
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });

    res.json({ outline: response.data.choices[0].text.trim() });
  } catch (error) {
    res.json({ error: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
