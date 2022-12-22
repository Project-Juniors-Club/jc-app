import { CardObj } from './MemoryGame';
import CardUnflipped from './CardUnflipped';
import CardFlipped from './CardFlipped';

type CardProps = {
  name: string;
  card: CardObj;
  cardIndex: number;
  handleClick: (cardIndex: number, card: CardObj) => void;
};

const Card = ({ name, handleClick, card, cardIndex }: CardProps) => {
  return (
    <div
      onClick={() => {
        handleClick(cardIndex, card);
      }}
    >
      {card.flipped || card.found ? <CardFlipped name={name} /> : <CardUnflipped />}
    </div>
  );
};

export default Card;
