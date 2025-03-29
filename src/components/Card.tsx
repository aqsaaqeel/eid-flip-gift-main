
import React, { useState, useEffect } from 'react';
import { CardData, generateQRCode } from '../utils/cardUtils';
import { Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CardProps {
  cardData: CardData;
  isPreview?: boolean;
  autoFlip?: boolean;
}

const Card: React.FC<CardProps> = ({ cardData, isPreview = false, autoFlip = false }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasFlipped, setHasFlipped] = useState(false);
console.log('aqsa CardData', cardData);
  useEffect(() => {
    if (autoFlip && !hasFlipped) {
      const timer = setTimeout(() => {
        setIsFlipped(true);
        setHasFlipped(true);
        
        // Flip back after a delay
        const flipBackTimer = setTimeout(() => {
          setIsFlipped(false);
        }, 3000);
        
        return () => clearTimeout(flipBackTimer);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [autoFlip, hasFlipped]);

  const handleCardClick = () => {
    if (!isPreview) {
      setIsFlipped(!isFlipped);
    }
  };

  const formatName = (name: string) => {
    console.log('aqsa formatname', name);
    return name.length > 20 ? `${name.substring(0, 20)}...` : name;
  };

  return (
    <div className="card-container" onClick={handleCardClick}>
      <div className={`card-inner ${isFlipped ? 'flipped' : ''}`}>
        {/* Front of the card */}
        <div className="card-front flex flex-col items-center justify-center p-6 sm:p-8 islamic-pattern">
          <div className="absolute top-8 left-1/2 -translate-x-1/2">
            <div className="lantern">
              <div className="lantern-string"></div>
              <div className="lantern-top"></div>
              <div className="lantern-body">
                <div className="lantern-glow"></div>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 flex flex-col items-center text-center space-y-5 mt-12">
            <div className="flex space-x-10 justify-center mb-4">
              <div className="lantern scale-75 -translate-x-6">
                <div className="lantern-string"></div>
                <div className="lantern-top"></div>
                <div className="lantern-body">
                  <div className="lantern-glow"></div>
                </div>
              </div>
              
              <div className="lantern scale-75 translate-x-6" style={{ animationDelay: '0.5s' }}>
                <div className="lantern-string"></div>
                <div className="lantern-top"></div>
                <div className="lantern-body">
                  <div className="lantern-glow"></div>
                </div>
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-eid-dark animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Eid Mubarak
            </h1>
            
            <div className="w-20 h-0.5 bg-eid-gold animate-fade-in" style={{ animationDelay: '0.3s' }}></div>
            
            <p className="text-gray-600 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {isPreview ? 'To ' : 'To '}
              <span className="font-medium text-eid-dark">{formatName(cardData.receiverName)}</span>
            </p>
            
            <div className="pt-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <p className="text-sm text-gray-500 mb-1">From</p>
              <p className="font-medium text-eid-dark">{formatName(cardData.senderName)}</p>
            </div>
            
            {!isPreview && (
              <div className="text-sm text-gray-500 mt-2 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <p>Click card to reveal gift</p>
                <Gift className="w-4 h-4 mx-auto mt-2 text-eid-gold animate-float" />
              </div>
            )}
          </div>
        </div>
        
        {/* Back of the card */}
        <div className="card-back flex flex-col items-center justify-center p-6 sm:p-8 bg-white">
          <div className="w-full h-full flex flex-col items-center justify-center space-y-6">
            <p className="text-base sm:text-lg font-medium text-eid-dark mb-4">{cardData.message}</p>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              {generateQRCode(cardData.upiId)}
            </div>
            
            <p className="text-sm text-gray-500">Scan to send Eidi</p>
            
            {!isPreview && (
              <Link 
                to="/" 
                className="mt-6 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-eid-green rounded-full hover:bg-opacity-90 transition-all duration-200"
              >
                Create your own card
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
