async function generateFrontMatter() {
    // Get values from form
    let title = document.getElementById('blog-title').value;
    let description = document.getElementById('blog-description').value;
    let tagsElement = document.getElementById('blog-tags');
    let tag = tagsElement.options[tagsElement.selectedIndex].text;
  
    // Check if fields are filled
    if (!title || !description || tag === 'Open this select menu') {
        alert('Please fill all fields');
        return;
    }

    // Generate the outline
    let outline = await generateOutline(title, description, tag);

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
}

// generate outline from input
async function generateOutline(title, description, tag) {
    // TODO Add Vercel Endpoint
  let response = await fetch('https://blog-generator-mydxq6q1w-karlwasson.vercel.app/', {
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

  let data = await response.json();
  return data.outline;
}

