'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { isDiscountActive } from '@/utils/discountCookies';
import CountdownTimer from '@/components/CountdownTimer';
import GuidePurchaseButton from '@/components/GuidePurchaseClient';

export default function GuideDetails({ guide }) {
  const [showDiscount, setShowDiscount] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setShowDiscount(isDiscountActive());
    setIsLoading(false);
  }, []);

  const currentPrice = showDiscount ? guide.price : guide.originalPrice;

  if (isLoading) {
    return <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800" />;
  }

  return (
    <main className="pt-16">
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[3/4] max-w-md mx-auto md:mx-0">
              {showDiscount && (
                <div className="absolute -top-4 -right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm transform rotate-12 shadow-lg z-10">
                  Save ${guide.originalPrice - guide.price}
                </div>
              )}
              <Image
                src={guide.image}
                alt={guide.title}
                fill
                className="object-cover rounded-lg shadow-2xl"
                priority
              />
              <div className="absolute inset-0 bg-blue-600/10 rounded-lg"></div>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{guide.title}</h1>
              <p className="text-xl mb-8 text-gray-300">{guide.description}</p>
              {showDiscount && <CountdownTimer className="mb-6" />}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-bold text-green-400">${currentPrice}</span>
                {showDiscount && (
                  <>
                    <span className="text-xl text-gray-400 line-through">${guide.originalPrice}</span>
                    <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm border border-green-500/30">
                      Limited Time Offer
                    </span>
                  </>
                )}
              </div>
              <GuidePurchaseButton guideId={guide.slug} showDiscount={showDiscount} />
            </div>
          </div>
        </div>
      </section>

      {/* ...rest of the sections... */}
    </main>
  );
}
