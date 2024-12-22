'use client';

import { useState } from 'react';

export default function GuidePurchaseButton({ guideId, showDiscount }) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guideId,
        }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Purchase error:', error);
      alert('Failed to initiate checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handlePurchase}
        disabled={isLoading}
        className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors w-full md:w-auto text-center disabled:opacity-50"
      >
        {isLoading ? 'Processing...' : showDiscount ? 'Secure Your Discount Now' : 'Get Started Now'}
      </button>
      {showDiscount && (
        <p className="text-sm text-gray-300 italic">
          * Special pricing available for a limited time only
        </p>
      )}
    </div>
  );
}
