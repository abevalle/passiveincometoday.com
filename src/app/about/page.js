'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function About() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] hero-section">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
        <Image
          src="/about-hero.webp"
          alt="About PassiveIncomeToday"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg md:text-xl max-w-2xl">
            Your no-nonsense guide to building real passive income streams
          </p>
        </div>
      </div>

      {/* Welcome Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Welcome to PassiveIncomeToday</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center">
              Your no-nonsense guide to building real passive income streams through proven, asset-based strategies. We're not here to sell you overnight success stories or flashy promises of instant wealth. Instead, we focus on practical, actionable advice backed by years of experience.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                { number: '10+', label: 'Years Experience' },
                { number: '$2M+', label: 'Student Earnings' },
                { number: '50+', label: 'Success Stories' },  // Changed from '15k+ Community Members'
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center">
              At PassiveIncomeToday.com, our goal is simple: to distribute wealth-building knowledge and empower individuals to create sustainable income streams. Passive income isn't totally effortless; it requires initial effort, smart decisions, and ongoing momentum.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: '🎯',
                title: "Transparency",
                description: "We believe in complete honesty about what it takes to build passive income."
              },
              {
                icon: '💡',
                title: "Education First",
                description: "Knowledge is power. We provide comprehensive learning resources."
              },
              {
                icon: '🤝',
                title: "Community Driven",
                description: "Success is better when shared. Join our community of learners."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-6 rounded-lg bg-gray-50 text-center"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">What Sets Us Apart</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: '🎯',
                  title: 'No Get-Rich-Quick Schemes',
                  description: 'We focus on sustainable, proven methods that build long-term wealth.'
                },
                {
                  icon: '📊',
                  title: 'Data-Driven Approach',
                  description: 'Our strategies are backed by real market data and success stories.'
                },
                {
                  icon: '🤝',
                  title: 'Community Support',
                  description: 'Join a network of like-minded individuals on the same journey.'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-blue-800 p-6 rounded-lg"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-blue-100">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Approach to Passive Income</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Image
                  src="/approach-illustration.webp"
                  alt="Our Approach"
                  width={500}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </motion.div>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="text-xl font-semibold mb-2">Foundation First</h3>
                  <p className="text-gray-600">We believe in building strong foundations before scaling. This means understanding the basics of wealth creation and passive income generation.</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="text-xl font-semibold mb-2">Proven Systems</h3>
                  <p className="text-gray-600">Our methods are tested and proven in real-world scenarios. We share what works and, importantly, what doesn't.</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="text-xl font-semibold mb-2">Continuous Support</h3>
                  <p className="text-gray-600">Your journey doesn't end with our guides. We provide ongoing support through our community and regular updates.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Community Says</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote: "The practical approach and real-world examples made all the difference in my passive income journey.",
                author: "Sarah M.",
                role: "Real Estate Investor"
              },
              {
                quote: "Finally, honest advice about passive income without the unrealistic hype. Worth every penny.",
                author: "Michael R.",
                role: "Digital Entrepreneur"
              },
              {
                quote: "The community support alone is worth joining. Everyone helps each other succeed.",
                author: "David K.",
                role: "Portfolio Investor"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="text-gray-600 italic mb-4">{testimonial.quote}</div>
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build Your Passive Income?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of others who are creating sustainable income streams with our proven strategies.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="/guides"
                  className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg text-lg transition-colors hover:bg-blue-50"
                >
                  Explore Our Guides
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="/resources"
                  className="inline-block bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors hover:bg-blue-800 border-2 border-white"
                >
                  Free Resources
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
