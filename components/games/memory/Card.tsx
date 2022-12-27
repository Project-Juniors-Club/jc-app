import { CardObj } from './MemoryGame';
import CardUnflipped from './CardUnflipped';
import CardFlipped from './CardFlipped';

type CardProps = {
  card: CardObj;
  handleClick: (cardIndex: number, card: CardObj) => void;
};

const Card = ({ handleClick, card }: CardProps) => {
  return (
    <div
      onClick={() => {
        handleClick(card.id, card);
      }}
    >
      {card.flipped || card.found ? <CardFlipped name={card.name} /> : <CardUnflipped />}
    </div>
  );
};

export default Card;
