import React from 'react';

const Box = ({ name }) => {
  const style = {
    width: '100px',
    height: '100px',
    backgroundColor: 'grey',
    color: 'white',
  };

  return (
    <button className='my-10 mx-20' style={style}>
      {name}
    </button>
  );
};

export default Box;
