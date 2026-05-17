const cvData = {
  name: "Ahmed Hisham",
  role: "Junior Full-Stack Developer (MERN Stack)",
  location: "Debrecen, Hungary",
  email: "ahmedhisham1928@gmail.com",
  github: "https://github.com/ucoi",
  skills: "React.js, Node.js, Express.js, MongoDB, JavaScript, Next.js",
  topProject: "Fitness Tracker Web App (MERN Stack) — my Bachelor's thesis, featuring 10+ REST API endpoints, authentication, and progress dashboards",
  experience: "Quality Control Assistant at Vitesco Technologies (Schaeffler Group)",
  education: "BSc Computer Science Engineering, University of Debrecen (Stipendium Hungaricum Scholar)"
}

export async function generateEmail(company) {
  const prompt = `
You are helping a junior developer write a cold job application email.

Here is the applicant's info:
- Name: ${cvData.name}
- Role applying for: ${cvData.role}
- Location: ${cvData.location} (already in Hungary, no relocation needed)
- Email: ${cvData.email}
- GitHub: ${cvData.github}
- Skills: ${cvData.skills}
- Top Project: ${cvData.topProject}
- Experience: ${cvData.experience}
- Education: ${cvData.education}

Write a short, professional cold email to apply for a junior developer position at:
- Company: ${company.name}
- Description: ${company.description}
- Their tech stack focus: ${company.tags.join(', ')}

Rules:
- Keep it under 150 words
- Sound human, not robotic
- Mention 1-2 relevant skills that match their tech stack
- Mention the Fitness Tracker project briefly
- End with a call to action
- Subject line first, then the email body
- Format: 
  Subject: <subject here>
  
  <email body here>
`

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [
        { role: "user", content: prompt }
      ]
    })
  })

  const data = await response.json()
  const text = data.content[0].text

  // Split subject and body
  const lines = text.trim().split('\n')
  const subjectLine = lines[0].replace('Subject:', '').trim()
  const body = lines.slice(2).join('\n').trim()

  return {
    subject: subjectLine,
    body: body,
    company: company.name,
    email: company.email
  }
}