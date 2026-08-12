import { useState, useEffect } from 'react';
import { ThumbsUp } from 'lucide-react';
import Seo, { organizationJsonLd, websiteJsonLd } from '../components/Seo/Seo';
import HeroSection from '../components/Home/HeroSection';
import PillarsSection from '../components/Home/PillarsSection';
import DestinationsSection from '../components/Home/DestinationsSection';
import LocalBuddiesSection from '../components/Home/LocalBuddiesSection';
import TravelMatchmakingSection from '../components/Home/TravelMatchmakingSection';
import HowItWorksSection from '../components/Home/HowItWorksSection';
import CustomerReviews from '../components/CustomerReviews';
import FinalCTA from '../components/Home/FinalCTA';

const Home = () => {
  const [destinations, setDestinations] = useState([]);
  const [localBuddies, setLocalBuddies] = useState([]);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchDestination, setSearchDestination] = useState('');
  const [searchDate, setSearchDate] = useState('');

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    setLoading(true);
    try {
      const [destinationsRes, buddiesRes, tripsRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/api/destinations?limit=6`).then(r => r.json()).catch(() => ({ destinations: [] })),
        fetch(`${import.meta.env.VITE_API_URL}/api/local-buddies?limit=3`).then(r => r.json()).catch(() => ({ buddies: [] })),
        fetch(`${import.meta.env.VITE_API_URL}/api/trips?limit=3&status=open`).then(r => r.json()).catch(() => ({ trips: [] }))
      ]);

      setDestinations(destinationsRes.destinations || []);
      setLocalBuddies(buddiesRes.buddies || []);
      setTrips(tripsRes.trips || []);
    } catch (error) {
      console.error('Failed to fetch home data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <Seo
        path="/"
        keywords="CommuteGo, hidden destinations India, local buddies India, travel matchmaking India, offbeat places, weekend getaways, India travel community"
        jsonLd={[organizationJsonLd, websiteJsonLd]}
      />
      <HeroSection
        searchDestination={searchDestination}
        setSearchDestination={setSearchDestination}
        searchDate={searchDate}
        setSearchDate={setSearchDate}
      />

      <PillarsSection
        destinationsCount={destinations.length}
        localBuddiesCount={localBuddies.length}
        tripsCount={trips.length}
      />

      <DestinationsSection
        destinations={destinations}
        loading={loading}
      />

      <LocalBuddiesSection
        buddies={localBuddies}
        loading={loading}
      />

      <TravelMatchmakingSection
        trips={trips}
        loading={loading}
      />

      <HowItWorksSection />

      {/* Customer Reviews Section */}
      <section className="relative py-20 bg-[#0a0a0a]">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium mb-4">
              <ThumbsUp className="w-4 h-4" /> Customer Reviews
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                What Our Travelers
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Are Saying
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Real experiences from travelers who discovered hidden gems with CommuteGo
            </p>
          </div>
          <CustomerReviews />
        </div>
      </section>

      <FinalCTA />
    </div>
  );
};

export default Home;
