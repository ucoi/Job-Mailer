import { useState } from "react";
import companies from "../data/companies";
import { generateEmail } from "../services/emailGenerator";
import EmailModal from "../components/EmailModal";

function Companies() {
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentEmail, setCurrentEmail] = useState(null);
  const [emailQueue, setEmailQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  const filtered = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(search.toLowerCase()) ||
      company.location.toLowerCase().includes(search.toLowerCase()) ||
      company.tags.some((tag) =>
        tag.toLowerCase().includes(search.toLowerCase()),
      ),
  );

  const handleGenerate = async () => {
    const selectedCompanies = companies.filter((c) => selected.includes(c.id));
    setLoading(true);

    try {
      // Generate first email and show it
      const firstEmail = await generateEmail(selectedCompanies[0]);
      setEmailQueue(selectedCompanies);
      setCurrentIndex(0);
      setCurrentEmail(firstEmail);
    } catch (err) {
      console.error(err);
      alert("Error generating email. Check console.");
    }

    setLoading(false);
  };

  const handleSend = async (emailData) => {
    // For now just log it — Gmail integration comes next
    console.log("Sending:", emailData);
    alert(
      `Email to ${emailData.company} marked as sent! (Gmail integration coming next)`,
    );

    // Move to next company
    const nextIndex = currentIndex + 1;
    if (nextIndex < emailQueue.length) {
      setLoading(true);
      const nextEmail = await generateEmail(emailQueue[nextIndex]);
      setCurrentIndex(nextIndex);
      setCurrentEmail(nextEmail);
      setLoading(false);
    } else {
      setCurrentEmail(null);
      setEmailQueue([]);
      setSelected([]);
    }
  };

  const handleClose = () => {
    setCurrentEmail(null);
    setEmailQueue([]);
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white">
            Hungarian Tech Companies
          </h2>
          <p className="text-gray-400 mt-1">Select companies to apply to</p>
        </div>
        {selected.length > 0 && (
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white px-6 py-2 rounded-xl font-medium transition-colors"
          >
            {loading
              ? "Generating..."
              : `Apply to ${selected.length} selected →`}
          </button>
        )}
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name, location or skill..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 mb-6 focus:outline-none focus:border-blue-500"
      />

      {/* Company Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((company) => {
          const isSelected = selected.includes(company.id);
          return (
            <div
              key={company.id}
              onClick={() => toggleSelect(company.id)}
              className={`bg-gray-800 rounded-2xl p-5 border cursor-pointer transition-all ${
                isSelected
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-gray-700 hover:border-gray-500"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-white font-bold text-lg">
                    {company.name}
                  </h3>
                  <p className="text-gray-400 text-sm">📍 {company.location}</p>
                </div>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? "bg-blue-500 border-blue-500"
                      : "border-gray-600"
                  }`}
                >
                  {isSelected && <span className="text-white text-xs">✓</span>}
                </div>
              </div>

              <p className="text-gray-400 text-sm mt-3">
                {company.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                {company.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-blue-400 text-xs hover:underline mt-3 inline-block"
                >
                  {company.website} ↗
                </a>
              )}
            </div>
          );
        })}
      </div>

      {/* Email Modal */}
      {currentEmail && (
        <EmailModal
          emailData={currentEmail}
          onClose={handleClose}
          onSend={handleSend}
        />
      )}
    </div>
  );
}

export default Companies;
