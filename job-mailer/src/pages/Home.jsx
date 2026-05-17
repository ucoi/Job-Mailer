import cvData from '../data/cvData'

function Home() {
  return (
    <div className="max-w-4xl mx-auto p-8">

      {/* Header */}
      <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
        <h2 className="text-3xl font-bold text-white">{cvData.name}</h2>
        <p className="text-blue-400 font-medium mt-1">{cvData.role}</p>
        <p className="text-gray-400 mt-3 leading-relaxed">{cvData.profile}</p>

        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-400">
          <span>📧 {cvData.email}</span>
          <span>📍 {cvData.location}</span>
          <span>📞 {cvData.phone}</span>
          <a href={cvData.github} target="_blank" className="text-blue-400 hover:underline">
            🐙 GitHub
          </a>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Technical Skills</h3>
        <div className="flex flex-wrap gap-2">
          {cvData.skills.map(skill => (
            <span
              key={skill}
              className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cvData.projects.map(project => (
            <div
              key={project.name}
              className="bg-gray-700/50 rounded-xl p-4 border border-gray-600"
            >
              <div className="flex items-start justify-between">
                <h4 className="text-white font-semibold">{project.name}</h4>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 text-xs hover:underline ml-2"
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
              <span className="text-xs text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded-full mt-1 inline-block">
                {project.tech}
              </span>
              <p className="text-gray-400 text-sm mt-2">{project.description}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Home