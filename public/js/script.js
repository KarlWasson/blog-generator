const API_URL = process.env.NODE_ENV === "production" 
  ? "https://your-deployed-app.vercel.app" 
  : "http://localhost:3000";

// generate outline from input
async function generateOutline(title, description, tag) {
  let response = await fetch(`${API_URL}/generateOutline`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      description: description,
      tag: tag
    })
  });

  if (response.ok) {
    let data = await response.json();
    return data.outline;
  } else {
    throw new Error('Network response was not ok.');
  }
}

document.getElementById('blog-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const title = document.getElementById('blog-title').value;
  const description = document.getElementById('blog-description').value;
  const tag = document.getElementById('blog-tags').value;

  try {
    const outline = await generateOutline(title, description, tag);

    // Prepare front matter
    let frontMatter = `
    ---
    title: "${title}"
    description: "${description}"
    date: ${new Date().toISOString()}
    tags: ["${tag}"]
    ---
    ${outline}
    `;

    // Populate code block
    document.getElementById('output').innerText = frontMatter;

  } catch (error) {
    console.error('Fetch failed.', error);
  }
});