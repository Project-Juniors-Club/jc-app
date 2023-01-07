import React from 'react';

const RightBox = ({ name, handleMouseUp }) => {
  const style = {
    width: '100px',
    height: '100px',
    backgroundColor: 'grey',
    color: 'white',
  };

  return (
    <button style={style} className='my-10 mx-20' onMouseUp={handleMouseUp}>
      {name}
    </button>
  );
};

export default RightBox;
