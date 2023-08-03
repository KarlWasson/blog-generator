const API_URL = "https://blog-generator-karlwasson.vercel.app";

// generate outline from input
async function generateOutline(title, description, tag) {
  let response = await fetch('https://blog-generator-karlwasson.vercel.app/generateOutline', {
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
     console.log('Network response was ok.')
    return data.outline;
  } else {
    console.log('Network response was not ok.')
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