import Image from "next/image";
import Link from "next/link";
import VIPSignup from "@/components/VIPSignup";

const tools = [
  {
    name: 'Rental Property ROI',
    description: 'Calculate potential returns on your real estate investments, including ongoing maintenance costs and time investments.',
    path: '/tools/rental-property-roi'
  },
  {
    name: 'Business Startup Calculator (Coming Soon)',
    description: 'Estimate initial costs, time investment, and potential returns for different business models.',
    path: '#'
  },
  {
    name: 'Digital Product Revenue Planner (Coming Soon)',
    description: 'Plan your digital product launch, marketing efforts, and projected maintenance needs.',
    path: '#'
  },
  {
    name: 'Time-to-Money Ratio Calculator (Coming Soon)',
    description: 'Analyze the real time investment needed versus potential returns for various income streams.',
    path: '#'
  }
];

const guides = [
  { title: 'Real Estate Investing', image: '/TestResiREStrat.webp' },
  { title: 'Agentic Strategy', image: '/agentic-era.webp' },
  { title: 'Online Assets', image: '/business-guide.webp' },
  { title: 'Aquiring Funding', image: '/How-to-get-funding.webp' },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative hero-section h-[60vh] md:h-screen">
        <Image
          src="/hero.webp"
          alt="Passive Income Journey"
          fill
          sizes="100vw"
          className="object-cover brightness-[0.4]"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[rgb(0,0,0)]/30 to-transparent">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4 md:p-8">
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-4 md:mb-6 px-2 leading-tight">
              PassiveIncomeToday.com
            </h1>
            <p className="text-lg md:text-2xl max-w-3xl mb-6 md:mb-8 px-4 text-[rgb(242,242,247)]">
              Building Smart Income Streams That Work For You. Understanding the Balance Between Initial Effort and Long-term Returns.
            </p>
            <Link 
              href="/tools"
              className="bg-[rgb(0,122,255)] hover:bg-[rgb(0,122,255)]/90 dark:bg-[rgb(10,132,255)] dark:hover:bg-[rgb(10,132,255)]/90 text-white font-semibold py-3 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Explore Our Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Reality of Passive Income Section */}
      <section className="py-16 bg-gradient-to-b from-[rgb(255,255,255)] to-[rgb(250,250,250)] dark:from-[rgb(28,28,30)] dark:to-black">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-[rgb(0,0,0)] dark:text-white">Understanding Passive Income</h2>
          <div className="prose lg:prose-lg mx-auto">
            <p className="mb-4 text-[rgb(99,99,102)] dark:text-[rgb(174,174,178)]">
              While the term "passive income" suggests money that flows without effort, the reality is more nuanced. Every successful income stream requires initial investment - whether it's time, money, skills, or all three. The key is building systems that eventually require less active involvement while continuing to generate returns.
            </p>
            <p className="mb-4 text-[rgb(99,99,102)] dark:text-[rgb(174,174,178)]">
              Our approach focuses on helping you understand both the opportunities and responsibilities of each income stream. We believe in transparent, realistic guidance that prepares you for the work needed to build truly sustainable income sources.
            </p>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 bg-white dark:bg-[rgb(28,28,30)]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6 text-[rgb(0,0,0)] dark:text-white">Entrepreneurship Tools</h2>
          <p className="text-xl text-[rgb(99,99,102)] dark:text-[rgb(174,174,178)] text-center max-w-3xl mx-auto mb-12">
            Smart tools to help you analyze, plan, and optimize your income-generating projects. Each calculator factors in both the potential returns and the necessary investments of time and resources.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {tools.map((tool) => (
              <div 
                key={tool.name}
                className="bg-[rgb(242,242,247)] dark:bg-[rgb(44,44,46)] p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-[rgb(229,229,234)] dark:border-[rgb(44,44,46)]"
              >
                <h3 className="text-xl font-semibold mb-4 text-[rgb(0,0,0)] dark:text-white">{tool.name}</h3>
                <p className="text-[rgb(99,99,102)] dark:text-[rgb(174,174,178)] mb-4">{tool.description}</p>
                <Link 
                  href={tool.path}
                  className={`inline-flex items-center ${
                    tool.path === '#' 
                      ? 'text-[rgb(99,99,102)] dark:text-[rgb(174,174,178)] cursor-not-allowed' 
                      : 'text-[rgb(0,122,255)] dark:text-[rgb(10,132,255)] hover:text-[rgb(0,64,221)] dark:hover:text-[rgb(64,156,255)]'
                  } transition-colors font-semibold`}
                >
                  {tool.path === '#' ? 'Coming Soon' : 'Try Calculator'}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Guides Section with Enhanced Description */}
      <section className="py-20 bg-[rgb(242,242,247)] dark:bg-[rgb(44,44,46)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="text-[rgb(0,122,255)] dark:text-[rgb(10,132,255)] font-semibold text-sm uppercase tracking-wider mb-4 block">Expert-Crafted Resources</span>
            <h2 className="text-4xl font-bold mb-6 text-[rgb(0,0,0)] dark:text-white">Transform Your Financial Future</h2>
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[rgb(255,159,10)]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span className="text-[rgb(99,99,102)] dark:text-[rgb(174,174,178)]">4.9/5 Average Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[rgb(0,122,255)] dark:text-[rgb(10,132,255)]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                </svg>
                <span className="text-[rgb(99,99,102)] dark:text-[rgb(174,174,178)]">1,500+ Success Stories</span>
              </div>
            </div>
            <p className="text-xl text-[rgb(99,99,102)] dark:text-[rgb(174,174,178)] mb-8">
              Step-by-step blueprints that have helped thousands build sustainable income streams. 
              Each guide combines real-world experience with actionable strategies you can implement today.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto mb-16">
            {guides.map((guide) => (
              <Link href="/guides" key={guide.title}>
                <div className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="aspect-[3/4]">
                    <Image
                      src={guide.image}
                      alt={guide.title}
                      fill
                      className="object-cover transition-all duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity group-hover:opacity-90">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-semibold text-lg mb-2 text-white">{guide.title}</h3>
                      <p className="text-sm text-[rgb(242,242,247)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Discover proven strategies and step-by-step implementation
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white dark:bg-[rgb(28,28,30)] p-8 rounded-2xl shadow-sm border border-[rgb(229,229,234)] dark:border-[rgb(44,44,46)] mb-8">
              <div className="flex items-start mb-6">
                <div className="flex-shrink-0 mr-4">
                  <svg className="w-8 h-8 text-[rgb(0,122,255)] dark:text-[rgb(10,132,255)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg mb-2 text-[rgb(0,0,0)] dark:text-white">What Makes Our Guides Different?</h4>
                  <p className="text-[rgb(99,99,102)] dark:text-[rgb(174,174,178)]">
                    We don't just tell you what to do - we show you how to do it, when to do it, and most importantly, 
                    how to adapt strategies to your unique situation. Each guide includes lifetime updates and community support.
                  </p>
                </div>
              </div>
            </div>

            <Link 
              href="/guides"
              className="inline-flex items-center justify-center gap-2 bg-[rgb(48,209,88)] hover:bg-[rgb(48,209,88)]/90 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Explore All Guides
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <p className="text-sm text-[rgb(99,99,102)] dark:text-[rgb(174,174,178)] mt-4">
              30-Day Money-Back Guarantee • Lifetime Access • Regular Updates
            </p>
          </div>
        </div>
      </section>

      {/* VIP Signup Section */}
      <section className="py-20 bg-white dark:bg-[rgb(28,28,30)] border-t border-[rgb(229,229,234)] dark:border-[rgb(44,44,46)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-[rgb(0,122,255)] dark:text-[rgb(10,132,255)] font-semibold text-sm uppercase tracking-wider mb-4 block">Join Our Community</span>
              <h2 className="text-3xl font-bold mb-4 text-[rgb(0,0,0)] dark:text-white">Get Early Access & VIP Benefits</h2>
              <p className="text-xl text-[rgb(99,99,102)] dark:text-[rgb(174,174,178)]">
                Be the first to know about new tools, guides, and exclusive offers. VIP members receive special pricing and additional resources not available to the public.
              </p>
            </div>
            <VIPSignup />
          </div>
        </div>
      </section>
    </>
  );
}
