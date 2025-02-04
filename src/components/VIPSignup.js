'use client';

import { useState } from 'react';

export default function VIPSignup() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-6">Join Our VIP Community</h2>
      <p className="text-gray-600 mb-8">
        Get early access to new tools, exclusive discounts on guides, and insider tips 
        on building sustainable income streams. Our community members save an average 
        of $150 on new releases.
      </p>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email for VIP access"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            Join the VIP List
          </button>
        </form>
      ) : (
        <div className="bg-green-50 text-green-800 p-6 rounded-lg">
          <p className="font-semibold">You're on the VIP list! 🎉</p>
          <p className="text-sm mt-2">Watch your inbox for exclusive early access and special offers.</p>
        </div>
      )}
    </div>
  );
} 