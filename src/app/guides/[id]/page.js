import { notFound } from 'next/navigation';
import guidesData from '@/data/guides.json';
import GuideDetails from '@/components/GuideDetails';

export async function generateMetadata({ params }) {
  const guide = guidesData[params.id];
  
  if (!guide) {
    return {
      title: 'Guide Not Found',
      description: 'The requested guide could not be found.',
    };
  }

  return {
    title: `${guide.title} - Premium Investment Guide | PassiveIncomeToday`,
    description: guide.description,
    openGraph: {
      title: guide.title,
      description: guide.description,
      images: [{ url: guide.image }],
    },
  };
}

export default function GuidePurchase({ params }) {
  const guide = guidesData[params.id];

  if (!guide) {
    notFound();
  }

  return <GuideDetails guide={guide} />;
}

export async function generateStaticParams() {
  return Object.keys(guidesData).map((slug) => ({
    id: slug,
  }));
}
