
import React from 'react';
import Card from './Card';
import { CardData } from '../utils/cardUtils';

interface CardPreviewProps {
  cardData: CardData;
}

const CardPreview: React.FC<CardPreviewProps> = ({ cardData }) => {
  return (
    <div className="flex justify-center items-center">
      <Card cardData={cardData} isPreview={true} autoFlip={true} />
    </div>
  );
};

export default CardPreview;
