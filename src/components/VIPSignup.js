'use client';

import { useState } from 'react';

export default function VIPSignup() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/vip-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join the VIP list');
      }

      setIsSubmitted(true);
      setEmail(''); // Clear the form
    } catch (err) {
      console.error('Error submitting email:', err);
      setError(err.message || 'Failed to join the VIP list. Please try again later.');
    } finally {
      setIsLoading(false);
    }
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
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(''); // Clear error when user starts typing
              }}
              placeholder="Enter your email for VIP access"
              className={`w-full px-4 py-3 rounded-lg border ${
                error ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              disabled={isLoading}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={error ? 'email-error' : undefined}
            />
            {error && (
              <p id="email-error" className="text-red-500 text-sm mt-1 text-left">
                {error}
              </p>
            )}
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Joining...
              </span>
            ) : (
              'Join the VIP List'
            )}
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