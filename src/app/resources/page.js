import Link from 'next/link';
import Image from 'next/image';
import VIPSignup from '@/components/VIPSignup';

const resources = {
  subreddits: [
    { name: 'r/financialindependence', url: 'https://reddit.com/r/financialindependence', description: 'FIRE (Financial Independence, Retire Early) community' },
    { name: 'r/fatFIRE', url: 'https://reddit.com/r/fatFIRE', description: 'High-income FIRE discussion' },
    { name: 'r/passive_income', url: 'https://reddit.com/r/passive_income', description: 'Passive income strategies and discussion' },
    { name: 'r/realestateinvesting', url: 'https://reddit.com/r/realestateinvesting', description: 'Real estate investment community' }
  ],
  youtubers: [
    { name: 'Ben Mallah', url: 'https://www.youtube.com/@BenMallah', description: 'Real estate mogul sharing insights on property investment' },
    { name: 'Investment Joy', url: 'https://www.youtube.com/c/investmentjoy', description: 'Car wash investing and creative real estate strategies' },
    { name: 'Meet Kevin', url: 'https://www.youtube.com/@MeetKevin', description: 'Real estate, stocks, and financial education' },
    { name: 'Bigger Pockets', url: 'https://www.youtube.com/@biggerpockets', description: 'Real estate investing education and strategies' }
  ],
  communities: [
    { name: 'Bigger Pockets Forums', url: 'https://www.biggerpockets.com/forums', description: 'Active real estate investing community' },
    { name: 'Indie Hackers', url: 'https://www.indiehackers.com', description: 'Community of independent online business builders' },
    { name: 'Hacker News', url: 'https://news.ycombinator.com', description: 'Tech and startup discussion' }
  ]
};

export default function Resources() {
  return (
    <main className="pt-16">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[400px]">
        <Image
          src="/resources-hero.webp"
          alt="Resources Hero"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgb(0,122,255)]/70 to-[rgb(0,64,221)]/70 dark:from-[rgb(10,132,255)]/70 dark:to-[rgb(64,156,255)]/70">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Knowledge is Your Greatest Asset</h1>
              <p className="text-xl md:text-2xl text-white opacity-90">
                We've curated the best resources to help you on your passive income journey. From expert insights to thriving communities, everything you need is right here.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Why These Resources Section */}
        <section className="mb-16 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-[rgb(0,0,0)] dark:text-white">Why These Resources Matter</h2>
          <p className="text-[rgb(99,99,102)] dark:text-[rgb(174,174,178)] mb-8">
            Success leaves clues. By learning from those who have already achieved what you're aiming for, 
            you can accelerate your journey and avoid common pitfalls. We've carefully selected these 
            resources based on their credibility, actionable insights, and proven track records.
          </p>
        </section>
        
        {/* Subreddits Section */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-semibold text-[rgb(0,0,0)] dark:text-white">Reddit Communities</h2>
          </div>
          <p className="text-[rgb(99,99,102)] dark:text-[rgb(174,174,178)] mb-8">
            Reddit hosts some of the most active and knowledgeable communities in the financial independence space. 
            These subreddits are gold mines of real-world experiences, strategies, and support.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {resources.subreddits.map((resource) => (
              <a
                key={resource.name}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 border border-[rgb(229,229,234)] dark:border-[rgb(44,44,46)] rounded-xl hover:shadow-lg transition-all duration-300 bg-white dark:bg-[rgb(28,28,30)] group"
              >
                <h3 className="font-semibold text-[rgb(0,122,255)] dark:text-[rgb(10,132,255)] text-lg group-hover:text-[rgb(0,64,221)] dark:group-hover:text-[rgb(64,156,255)]">{resource.name}</h3>
                <p className="text-[rgb(99,99,102)] dark:text-[rgb(174,174,178)] mt-2">{resource.description}</p>
              </a>
            ))}
          </div>
        </section>

        {/* YouTubers Section */}
        <section className="mb-16 bg-[rgb(242,242,247)] dark:bg-[rgb(44,44,46)] -mx-4 px-4 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-semibold text-[rgb(0,0,0)] dark:text-white">Learn from the Experts</h2>
            </div>
            <p className="text-[rgb(99,99,102)] dark:text-[rgb(174,174,178)] mb-8">
              These content creators don't just talk the talk - they've built successful businesses and investment 
              portfolios. Their channels offer invaluable insights into real estate, business, and wealth building.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {resources.youtubers.map((resource) => (
                <a
                  key={resource.name}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 bg-white dark:bg-[rgb(28,28,30)] rounded-xl hover:shadow-lg transition-all duration-300 group border border-[rgb(229,229,234)] dark:border-[rgb(44,44,46)]"
                >
                  <h3 className="font-semibold text-[rgb(0,122,255)] dark:text-[rgb(10,132,255)] text-lg group-hover:text-[rgb(0,64,221)] dark:group-hover:text-[rgb(64,156,255)]">{resource.name}</h3>
                  <p className="text-[rgb(99,99,102)] dark:text-[rgb(174,174,178)] mt-2">{resource.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Other Communities Section */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-semibold text-[rgb(0,0,0)] dark:text-white">Professional Networks</h2>
          </div>
          <p className="text-[rgb(99,99,102)] dark:text-[rgb(174,174,178)] mb-8">
            These platforms connect you with like-minded entrepreneurs and investors. Network with professionals, 
            share experiences, and find potential partners for your next venture.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {resources.communities.map((resource) => (
              <a
                key={resource.name}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 border border-[rgb(229,229,234)] dark:border-[rgb(44,44,46)] rounded-xl hover:shadow-lg transition-all duration-300 bg-white dark:bg-[rgb(28,28,30)] group"
              >
                <h3 className="font-semibold text-[rgb(0,122,255)] dark:text-[rgb(10,132,255)] text-lg group-hover:text-[rgb(0,64,221)] dark:group-hover:text-[rgb(64,156,255)]">{resource.name}</h3>
                <p className="text-[rgb(99,99,102)] dark:text-[rgb(174,174,178)] mt-2">{resource.description}</p>
              </a>
            ))}
          </div>
        </section>

        {/* VIP Signup Section */}
        <section className="mb-16 bg-gradient-to-br from-[rgb(242,242,247)] to-[rgb(242,242,247)] dark:from-[rgb(44,44,46)] dark:to-[rgb(28,28,30)] -mx-4 px-4 py-12 rounded-2xl">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-[rgb(0,0,0)] dark:text-white">Get Exclusive Resources</h2>
              <p className="text-[rgb(99,99,102)] dark:text-[rgb(174,174,178)]">
                Join our VIP list to receive additional curated resources, early access to new tools, 
                and exclusive discounts on our premium guides.
              </p>
            </div>
            <VIPSignup />
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center bg-[rgb(242,242,247)] dark:bg-[rgb(44,44,46)] rounded-2xl p-8 mt-12">
          <h3 className="text-2xl font-semibold mb-4 text-[rgb(0,0,0)] dark:text-white">Ready to Take Action?</h3>
          <p className="text-[rgb(99,99,102)] dark:text-[rgb(174,174,178)] mb-6 max-w-2xl mx-auto">
            Remember, the best investment you can make is in yourself. These resources are your starting point, 
            but success comes from taking action. Start with one resource and commit to learning consistently.
          </p>
          <div className="text-sm text-[rgb(99,99,102)] dark:text-[rgb(174,174,178)]">
            <p>Note: These resources are provided for educational purposes. Always do your own research before making investment decisions.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
