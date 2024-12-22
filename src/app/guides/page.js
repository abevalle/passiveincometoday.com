'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import guidesData from '@/data/guides.json';
import { isDiscountActive, setDiscountExpiration } from '@/utils/discountCookies';
import CountdownTimer from '@/components/CountdownTimer';

export default function GuidesPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const active = isDiscountActive();
    if (!active) {
      setDiscountExpiration();
    }
    setShowDiscount(active);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800" />;
  }

  const guides = Object.values(guidesData).map(guide => ({
    ...guide,
    currentPrice: showDiscount ? guide.price : guide.originalPrice
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className="pt-16">
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Turn Knowledge Into Lasting Income Streams</h1>
            <p className="text-xl mb-8 text-gray-300">
              These aren't get-rich-quick schemes. Our battle-tested guides show you the exact systems 
              we've used to build reliable income streams that grow over time. Join other successful 
              students who took control of their financial future.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span>4.8/5 Average Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>30-Day Money-Back Guarantee</span>
              </div>
            </div>
            {showDiscount && <CountdownTimer />}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Path to Financial Freedom</h2>
            <p className="text-gray-600">
              Each guide is carefully crafted to take you from beginner to proficient, 
              with actionable steps and real-world case studies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {guides.map((guide) => (
              <div key={guide.slug} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-transform hover:scale-105">
                <Link href={`/guides/${guide.slug}`}>
                  <div className="relative h-72">
                    {showDiscount && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                        Save ${guide.originalPrice - guide.price}
                      </div>
                    )}
                    <Image
                      src={guide.image}
                      alt={guide.title}
                      fill
                      className="object-cover"
                      objectPosition="top"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-2xl mb-3">{guide.title}</h3>
                    <p className="text-gray-600 mb-4">{guide.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-3xl font-bold text-green-600">${guide.currentPrice}</span>
                        {showDiscount && (
                          <>
                            <span className="text-gray-400 line-through ml-2">${guide.originalPrice}</span>
                            <span className="text-red-500 text-sm ml-2">Limited Time</span>
                          </>
                        )}
                      </div>
                      <span className="text-blue-600 font-semibold">Learn More →</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Don't Miss Future Releases</h2>
            <p className="text-gray-600 mb-8">
              Get early access pricing and exclusive bonuses when we release new guides. 
              Our last guide sold out in less than 48 hours, and these special prices 
              won't last long.
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
                <p className="text-sm mt-2">Watch your inbox for exclusive early access.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
