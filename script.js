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

async function generateOutline(title, description, tag) {
    const prompt = `Generate an outline for a blog post. Title: ${title}, Description: ${description}, Tag: ${tag}`;

    let response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_OPENAI_API_KEY'
        },
        body: JSON.stringify({
            'prompt': prompt,
            'max_tokens': 200
        })
    });

    let data = await response.json();
    return data.choices[0].text.trim();
}
