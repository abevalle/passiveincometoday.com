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
      <h2 className="text-3xl font-bold mb-6 text-[rgb(0,0,0)] dark:text-white">Join Our VIP Community</h2>
      <p className="text-[rgb(99,99,102)] dark:text-[rgb(174,174,178)] mb-8">
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
                error ? 'border-red-500' : 'border-[rgb(229,229,234)] dark:border-[rgb(44,44,46)]'
              } bg-white dark:bg-[rgb(28,28,30)] text-[rgb(0,0,0)] dark:text-white focus:ring-2 focus:ring-[rgb(0,122,255)] dark:focus:ring-[rgb(10,132,255)] focus:border-transparent`}
              disabled={isLoading}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={error ? 'email-error' : undefined}
            />
            {error && (
              <p id="email-error" className="text-red-500 dark:text-red-400 text-sm mt-1 text-left">
                {error}
              </p>
            )}
          </div>
          <button
            type="submit"
            className={`w-full bg-[rgb(0,122,255)] hover:bg-[rgb(0,64,221)] dark:bg-[rgb(10,132,255)] dark:hover:bg-[rgb(64,156,255)] text-white font-bold py-3 px-4 rounded-lg transition-colors ${
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
        <div className="bg-[rgb(242,242,247)] dark:bg-[rgb(44,44,46)] text-[rgb(0,122,255)] dark:text-[rgb(10,132,255)] p-6 rounded-lg">
          <p className="font-semibold">You're on the VIP list! 🎉</p>
          <p className="text-[rgb(99,99,102)] dark:text-[rgb(174,174,178)] text-sm mt-2">Watch your inbox for exclusive early access and special offers.</p>
        </div>
      )}
    </div>
  );
} 