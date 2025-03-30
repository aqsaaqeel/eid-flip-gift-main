import React, { useState, useEffect, useRef } from "react";
import { CardData, generateQRCode } from "../utils/cardUtils";
import { Gift } from "lucide-react";
import { Link } from "react-router-dom";
import SparkleTrail from "./SparkleTrail";

interface CardProps {
  cardData: CardData;
  isPreview?: boolean;
  autoFlip?: boolean;
}

const Card: React.FC<CardProps> = ({
  cardData,
  isPreview = false,
  autoFlip = false,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasFlipped, setHasFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoFlip && !hasFlipped) {
      const timer = setTimeout(() => {
        setIsFlipped(true);
        setHasFlipped(true);

        const flipBackTimer = setTimeout(() => {
          setIsFlipped(false);
        }, 3000);

        return () => clearTimeout(flipBackTimer);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [autoFlip, hasFlipped]);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const clickedInsideNoFlip = (e.target as HTMLElement).closest(
      "[data-no-flip]"
    );
    if (clickedInsideNoFlip || isPreview) return;
    setIsFlipped((prev) => !prev);
  };

  const formatName = (name: string) => {
    return name.length > 20 ? `${name.substring(0, 20)}...` : name;
  };

  return (
    <div
      ref={cardRef}
      className="relative w-full max-w-md aspect-[3/4] perspective rounded-lg overflow-hidden"
    >
      <SparkleTrail trigger={isFlipped} boundsRef={cardRef} />

      <div
        className="relative w-full h-full transition-transform duration-700 preserve-3d rounded-lg"
        style={{
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* FRONT SIDE */}
        <div
          className="absolute w-full h-full backface-hidden islamic-pattern flex flex-col items-center justify-center p-6 sm:p-8 rounded-lg"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(0deg)",
            pointerEvents: isFlipped ? "none" : "auto",
          }}
          onClick={handleCardClick}
        >
          <div className="absolute top-8 left-1/2 -translate-x-1/2">
            <div className="lantern">
              <div className="lantern-string"></div>
              <div className="lantern-top"></div>
              <div className="lantern-body">
                <div className="lantern-glow"></div>
              </div>
            </div>
          </div>
          <div className="relative z-10 flex flex-col items-center text-center space-y-5 mt-1 mx-6">
            <div className="flex space-x-10 justify-center mb-4 mx-6 ml-6">
              <div className="lantern scale-75 -translate-x-6">
                <div className="lantern-string"></div>
                <div className="lantern-top"></div>
                <div className="lantern-body">
                  <div className="lantern-glow"></div>
                </div>
              </div>
              <div className="invisible">lantern</div>
              <div
                className="lantern scale-75 translate-x-6"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="lantern-string"></div>
                <div className="lantern-top"></div>
                <div className="lantern-body">
                  <div className="lantern-glow"></div>
                </div>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-eid-dark animate-fade-in">
              Eid Mubarak
            </h1>
            <div className="w-20 h-0.5 bg-eid-gold animate-fade-in"></div>
            {cardData.receiverName && (
              <p className="text-gray-600 animate-fade-in">
                To{" "}
                <span className="font-medium text-eid-dark">
                  {formatName(cardData.receiverName)}
                </span>
              </p>
            )}

            <p className="pl-2 pr-2 bg-gray-50 rounded-lg border border-gray-100 text-gray-800">
              {cardData.message}
            </p>
            <div className="pt-2 sm:pt-4 animate-fade-in">
              <p className="text-sm text-gray-500 mb-1">From</p>
              <p className="font-medium text-eid-dark">
                {formatName(cardData.senderName)}
              </p>
            </div>

            {!isPreview && (
              <div className="text-center mt-2 animate-fade-in">
                <p className="text-sm sm:text-base font-medium text-eid-green tracking-wide hover:underline">
                  Tap the card to send Eidi to me
                </p>
                <Gift className="w-5 h-5 mt-1 mx-auto text-eid-gold animate-float" />
              </div>
            )}
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute w-full h-full backface-hidden bg-white flex flex-col items-center justify-center p-6 sm:p-8"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            pointerEvents: isFlipped ? "auto" : "none",
          }}
          onClick={handleCardClick} // allow flip back
        >
          <p className="text-base sm:text-lg font-medium text-eid-dark mb-4">
            {cardData.message}
          </p>

          <div
            data-no-flip
            className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 cursor-pointer"
          >
            {generateQRCode(cardData.upiId)}
          </div>

          {!isPreview && (
            <Link
              to="/"
              className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-eid-green rounded-full hover:bg-opacity-90 transition-all duration-200"
            >
              Create your own card
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
