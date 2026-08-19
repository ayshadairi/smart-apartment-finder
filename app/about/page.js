export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Our Story
        </h1>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Two students with a mission to make apartment hunting easier for everyone
        </p>
      </div>
      <div className="bg-gray-800 rounded-2xl p-8 mb-8 border border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">😫</span>
          <h2 className="text-2xl font-semibold text-blue-400">The Problem We Saw</h2>
        </div>
        <p className="text-gray-300 leading-relaxed">
          As students ourselves, we struggled to find apartments. We were wasting hours jumping between 
          Facebook Marketplace, Kijiji, Realtor.ca, RentBoard, and countless other websites. Each platform 
          had different listings, outdated information, and no way to compare options easily. 
          We thought <span className="text-blue-400 font-semibold">there has to be a better way.</span>
        </p>
      </div>
      <div className="bg-gray-800 rounded-2xl p-8 mb-8 border border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">💡</span>
          <h2 className="text-2xl font-semibold text-blue-400">Our Solution</h2>
        </div>
        <p className="text-gray-300 leading-relaxed mb-4">
          We built <span className="font-semibold text-white">Smart Apartment Finder</span> a platform that:
        </p>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-green-400">✓</span>
            <span><span className="font-semibold text-white">AI-Powered Recommendations</span> — Get personalized apartment matches based on your lifestyle, budget, and preferences</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-400">✓</span>
            <span><span className="font-weight-bold text-white">Interactive Map View</span> — Visualize apartment locations on an interactive map with detailed markers</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-400">✓</span>
            <span><span className="font-semibold text-white">AI Description Generator</span> — Landlords can generate professional listing descriptions instantly</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-400">✓</span>
            <span><span className="font-semibold text-white">Save & Manage Listings</span> — Save AI-recommended apartments to your account with images and coordinates</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-400">✓</span>
            <span><span className="font-semibold text-white">Google OAuth Authentication</span> — Secure sign-in with your Google account</span>
          </li>
        </ul>
      </div>
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 mb-8 border border-blue-500/30">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🎯</span>
          <h2 className="text-2xl font-semibold text-blue-400">Our Mission</h2>
        </div>
        <p className="text-gray-200 leading-relaxed text-lg">
          "To make renting an apartment <span className="font-bold">simple, transparent, and stress-free </span> 
          by bringing all listings together and letting AI do the heavy lifting."
        </p>
        <p className="text-gray-300 mt-4">
          We believe that finding a home shouldn't feel like a full-time job. Our goal is to save renters 
          hours of manual searching and help them find apartments they'll truly love.
        </p>
      </div>

      <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">👥</span>
          <h2 className="text-2xl font-semibold text-blue-400">Who We Are</h2>
        </div>
        <p className="text-gray-300 leading-relaxed">
          We're two college students who got tired of the apartment hunting nightmare. 
          Between school, work, and life, we didn't have time to check 10 different websites every day. 
          So we built this tool to help ourselves and now we're sharing it with everyone.
        </p>
        <div className="mt-6 pt-6 border-t border-gray-700">
          <p className="text-gray-400 text-sm">
            📍 Built in Canada for renters everywhere<br/>
            🚀 Constantly improving based on user feedback<br/>
            💬 Have suggestions? We'd love to hear them!
          </p>
        </div>
      </div>
    </div>
  );
}