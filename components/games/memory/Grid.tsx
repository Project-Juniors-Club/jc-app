import Card from './Card';
import { CardObj } from './MemoryGame';

type CardGridProps = {
  randomCards: CardObj[] | null;
  handleClick: (cardIndex: number, card: CardObj) => void;
};

const Grid = ({ randomCards, handleClick }: CardGridProps) => {
  return (
    <div className='flex flex-row'>
      {randomCards && randomCards.map((card, index) => <Card handleClick={() => handleClick(index, card)} card={card} key={card.id} />)}
    </div>
  );
};

export default Grid;
