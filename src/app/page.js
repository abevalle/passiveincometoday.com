import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <div className="relative hero-section">
        <Image
          src="/hero.webp"
          alt="Passive Income Journey"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            PassiveIncomeToday.com
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mb-8">
            Start Your Passive Income Journey Today, Reap the Rewards Tomorrow
          </p>
          <Link 
            href="/tools"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
          >
            Explore Our Tools
          </Link>
        </div>
      </div>

      {/* Tools Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Essential Tools</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {['Rental Property ROI', 'Dividend Calculator', 'General ROI'].map((tool) => (
              <div key={tool} className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">{tool}</h3>
                <p className="text-gray-600 mb-4">Calculate your potential returns with our professional-grade tools.</p>
                <Link href={`/tools/${tool.toLowerCase().replace(/\s+/g, '-')}`} className="text-blue-600 hover:text-blue-800">
                  Try Calculator →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Guides Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Premium Guides</h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xl text-gray-600 mb-8">
              Detailed, actionable guides to help you build sustainable passive income streams.
              Start your journey today, build your future tomorrow.
            </p>
            
            {/* PDF Preview Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
              {[
                { title: 'Real Estate Investing', image: '/TestResiREStrat.webp' },
                { title: 'Agentic Strategy', image: '/agentic-era.webp' },
                { title: 'Online Assets', image: '/business-guide.webp' }
              ].map((guide) => (
                <div key={guide.title} className="relative group cursor-pointer">
                  <Image
                    src={guide.image}
                    alt={guide.title}
                    width={200}
                    height={282}
                    className="rounded-lg shadow-md transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">{guide.title}</span>
                  </div>
                </div>
              ))}
            </div>

            <Link 
              href="/guides"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
            >
              View Premium Guides
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
