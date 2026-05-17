function EmailModal({ emailData, onClose, onSend }) {
  if (!emailData) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-2xl">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h3 className="text-white font-bold text-lg">Preview Email</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* Email Details */}
        <div className="p-6 space-y-4">
          <div>
            <label className="text-gray-400 text-xs uppercase tracking-wider">To</label>
            <p className="text-white mt-1">{emailData.email}</p>
          </div>
          <div>
            <label className="text-gray-400 text-xs uppercase tracking-wider">Subject</label>
            <p className="text-white mt-1">{emailData.subject}</p>
          </div>
          <div>
            <label className="text-gray-400 text-xs uppercase tracking-wider">Body</label>
            <p className="text-gray-300 mt-1 whitespace-pre-line leading-relaxed">
              {emailData.body}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSend(emailData)}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl font-medium transition-colors"
          >
            Send Email ✉️
          </button>
        </div>

      </div>
    </div>
  )
}

export default EmailModal