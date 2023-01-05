import React from 'react';

const Box = ({ name, isClicked }) => {
  const style = {
    width: '100px',
    height: '100px',
    backgroundColor: 'grey',
    color: 'white',
  };

  return (
    <button style={style} className='my-10 mx-20' onClick={isClicked}>
      {name}
    </button>
  );
};

export default Box;
