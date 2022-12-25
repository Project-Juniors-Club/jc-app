interface Card {
  id: number;
  name: string;
  flipped: boolean;
  found: boolean;
}

// BE shouldn't need to pass flipped and found properties as they will always be false
const cards: Card[] = [
  {
    id: 1,
    name: 'A',
    flipped: false,
    found: false,
  },
  {
    id: 2,
    name: 'A',
    flipped: false,
    found: false,
  },
  {
    id: 3,
    name: 'B',
    flipped: false,
    found: false,
  },
  {
    id: 4,
    name: 'B',
    flipped: false,
    found: false,
  },
  {
    id: 5,
    name: 'C',
    flipped: false,
    found: false,
  },
  {
    id: 6,
    name: 'C',
    flipped: false,
    found: false,
  },
  {
    id: 7,
    name: 'D',
    flipped: false,
    found: false,
  },
  {
    id: 8,
    name: 'D',
    flipped: false,
    found: false,
  },
];

export default cards;
