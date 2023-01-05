import React from 'react';

const CardFlipped = ({ name }) => {
  const style = {
    width: '100px',
    height: '100px',
    backgroundColor: 'red',
    margin: '5px',
  };

  return <button style={style}>{name}</button>;
};

export default CardFlipped;
