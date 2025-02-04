'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import guidesData from '@/data/guides.json';
import { isDiscountActive, setDiscountExpiration } from '@/utils/discountCookies';
import CountdownTimer from '@/components/CountdownTimer';
import VIPSignup from '@/components/VIPSignup';

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
    return <div className="min-h-screen bg-gradient-to-b from-[rgb(28,28,30)] to-black" />;
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
      <section className="bg-gradient-to-b from-[rgb(28,28,30)] to-black text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Expert-Crafted Guides for Building Wealth</h1>
            <p className="text-xl mb-8 text-[rgb(174,174,178)]">
              Our comprehensive guides are built on real-world experience and proven strategies. 
              Each guide provides step-by-step instructions, case studies, and actionable frameworks 
              to help you build sustainable income streams.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[rgb(255,159,10)]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span>Expert-Led Content</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[rgb(48,209,88)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Lifetime Access</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[rgb(10,132,255)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Regular Updates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-[rgb(28,28,30)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[rgb(0,0,0)] dark:text-white">Upcoming Guide Categories</h2>
            <p className="text-[rgb(99,99,102)] dark:text-[rgb(174,174,178)]">
              We're crafting comprehensive guides across multiple wealth-building categories. 
              Each guide is being meticulously developed to ensure you get the most actionable 
              and valuable information.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Real Estate Investing",
                description: "Master the fundamentals of real estate investing, from property analysis to scaling your portfolio.",
                icon: "🏠"
              },
              {
                title: "Digital Products",
                description: "Create and scale digital products that generate passive income while you sleep.",
                icon: "💻"
              },
              {
                title: "AI Business Building",
                description: "Leverage artificial intelligence to create innovative and profitable business models.",
                icon: "🤖"
              },
              {
                title: "Alternative Investments",
                description: "Explore unique investment opportunities beyond traditional stocks and bonds.",
                icon: "📈"
              },
              {
                title: "Automated Systems",
                description: "Build systems that generate income with minimal ongoing maintenance.",
                icon: "⚙️"
              },
              {
                title: "Wealth Preservation",
                description: "Protect and grow your wealth through smart tax and legal strategies.",
                icon: "🛡️"
              }
            ].map((category) => (
              <div key={category.title} className="bg-[rgb(242,242,247)] dark:bg-[rgb(44,44,46)] rounded-xl p-6 relative group">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-[rgb(0,0,0)] dark:text-white">{category.title}</h3>
                <p className="text-[rgb(99,99,102)] dark:text-[rgb(174,174,178)] mb-4">{category.description}</p>
                <div className="absolute inset-0 bg-[rgb(0,0,0)]/5 dark:bg-[rgb(255,255,255)]/5 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-[rgb(0,122,255)] dark:bg-[rgb(10,132,255)] text-white px-4 py-2 rounded-full text-sm">Coming Soon</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-[rgb(242,242,247)] to-[rgb(242,242,247)] dark:from-[rgb(44,44,46)] dark:to-[rgb(28,28,30)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-[rgb(0,0,0)] dark:text-white">Get Early Access & Special Pricing</h2>
              <p className="text-[rgb(99,99,102)] dark:text-[rgb(174,174,178)] max-w-2xl mx-auto">
                Join our VIP list to be the first to know when our guides launch. VIP members receive 
                exclusive early access, special launch pricing, and additional bonuses not available 
                to the public.
              </p>
            </div>
            <VIPSignup />
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-[rgb(28,28,30)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-[rgb(0,0,0)] dark:text-white">Why Wait for Our Guides?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-lg font-semibold mb-2 text-[rgb(0,0,0)] dark:text-white">Actionable Content</h3>
                <p className="text-[rgb(99,99,102)] dark:text-[rgb(174,174,178)]">Step-by-step instructions you can implement immediately</p>
              </div>
              <div>
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-lg font-semibold mb-2 text-[rgb(0,0,0)] dark:text-white">Data-Driven</h3>
                <p className="text-[rgb(99,99,102)] dark:text-[rgb(174,174,178)]">Strategies backed by real-world results and case studies</p>
              </div>
              <div>
                <div className="text-4xl mb-4">🔄</div>
                <h3 className="text-lg font-semibold mb-2 text-[rgb(0,0,0)] dark:text-white">Regular Updates</h3>
                <p className="text-[rgb(99,99,102)] dark:text-[rgb(174,174,178)]">Access to new content as markets and strategies evolve</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
