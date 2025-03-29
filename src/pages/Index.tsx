
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Gift } from 'lucide-react';
import CardPreview from '@/components/CardPreview';

const Index = () => {
  // Sample card data for preview
  const sampleCard = {
    id: 'sample',
    senderName: 'Aisha Khan',
    receiverName: 'Friends & Family',
    message: 'Wishing you joy, peace, and blessings on this special day!',
    upiId: 'example@upi',
    createdAt: Date.now()
  };

  useEffect(() => {
    // Add a class to the body when the component mounts
    document.body.classList.add('overflow-x-hidden');
    
    // Remove the class when the component unmounts
    return () => {
      document.body.classList.remove('overflow-x-hidden');
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 px-6">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-green-50 rounded-full opacity-60 blur-3xl"></div>
          <div className="absolute top-60 -right-20 w-80 h-80 bg-amber-50 rounded-full opacity-60 blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-block px-3 py-1 text-xs font-medium tracking-wider text-eid-green bg-green-50 border border-green-100 rounded-full animate-fade-in">
                EID MUBARAK
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
                Share the joy of <span className="text-eid-green">Eid</span> with a digital gift
              </h1>
              
              <p className="text-lg text-gray-600 max-w-lg mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Create a beautiful Eid greeting card with a personal message and share it with your loved ones, along with your UPI details for Eidi.
              </p>
              
              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <Link to="/create">
                  <Button className="bg-eid-green hover:bg-opacity-90 text-white min-w-[160px] rounded-full h-12">
                    Create Card
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="#how-it-works">
                  <Button variant="outline" className="border-gray-200 min-w-[160px] rounded-full h-12">
                    How It Works
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="transform scale-90 md:scale-100">
                <CardPreview cardData={sampleCard} />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="how-it-works" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Create and share personalized Eid greeting cards with UPI payment option in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Create Your Card",
                description: "Fill in your details, add a personal message, and enter your UPI ID for receiving Eidi.",
                icon: <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-eid-green mb-4">1</div>
              },
              {
                title: "Share the Link",
                description: "Get a unique link for your card that you can share with friends and family through any messaging platform.",
                icon: <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-eid-green mb-4">2</div>
              },
              {
                title: "Receive Eidi",
                description: "Recipients can view your card, scan the QR code, and send you Eidi directly to your UPI account.",
                icon: <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-eid-green mb-4">3</div>
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl text-center transition-all duration-300 hover:shadow-md hover:transform hover:-translate-y-1">
                <div className="flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link to="/create">
              <Button className="bg-eid-green hover:bg-opacity-90 text-white px-8 py-6 h-auto rounded-full">
                Create Your Eid Card Now
                <Gift className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-10 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Eid Card App. Made with ❤️ for Eid celebrations.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
