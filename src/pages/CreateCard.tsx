
import React from 'react';
import CardForm from '@/components/CardForm';
import { Moon, Stars } from 'lucide-react';

const CreateCard = () => {
  return (
    <div className="min-h-screen bg-eid-cream islamic-pattern py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="relative mb-10 text-center">
          <div className="absolute -top-1 left-4 transform -translate-y-full">
            <Moon className="h-6 w-6 text-eid-gold opacity-80" />
          </div>
          <div className="absolute -top-2 right-10 transform -translate-y-full">
            <Stars className="h-5 w-5 text-eid-gold opacity-80" />
          </div>
          
          <h1 className="text-3xl font-bold text-eid-dark mb-2">Eid Mubarak</h1>
          <p className="text-gray-600 max-w-xs mx-auto text-sm">
            Create your personalized Eid greeting card with UPI payment option
          </p>
        </div>
        
        <div className="bg-white shadow-md border border-gray-100 rounded-xl overflow-hidden">
          <CardForm />
        </div>
        
        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-8">
            <div className="lantern scale-75">
              <div className="lantern-string"></div>
              <div className="lantern-top"></div>
              <div className="lantern-body">
                <div className="lantern-glow"></div>
              </div>
            </div>
            
            <div className="lantern scale-75" style={{ animationDelay: '0.7s' }}>
              <div className="lantern-string"></div>
              <div className="lantern-top"></div>
              <div className="lantern-body">
                <div className="lantern-glow"></div>
              </div>
            </div>
            
            <div className="lantern scale-75" style={{ animationDelay: '1.4s' }}>
              <div className="lantern-string"></div>
              <div className="lantern-top"></div>
              <div className="lantern-body">
                <div className="lantern-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCard;
