export default function Recommendations() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          AI Recommendations
        </h1>
        <p className="text-gray-400 mt-2">Get personalized apartment matches based on your lifestyle</p>
      </div>
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-xl p-6 border border-gray-700 mb-12">
        <h2 className="text-xl font-semibold mb-4">Tell us about your preferences</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">City</label>
            <input
              type="text"
              placeholder="e.g., Toronto, Vancouver, Montreal"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Monthly Budget</label>
            <input
              type="text"
              placeholder="e.g., $1500 - $2500"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Bedrooms</label>
            <select className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white">
              <option>Studio</option>
              <option>1 Bedroom</option>
              <option>2 Bedrooms</option>
              <option>3+ Bedrooms</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Get Recommendations
          </button>
        </form>
      </div>
      <div className="text-center py-12 bg-gray-800/50 rounded-xl border border-gray-700">
        <p className="text-gray-500">Your personalized recommendations will appear here</p>
      </div>
    </div>
  );
}