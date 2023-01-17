import React from 'react';

const LeftBox = ({ id, name, selected }) => {
  // TO SUPPORT PICTURES
  const style = {
    width: '100px',
    height: '100px',
    backgroundColor: 'grey',
    color: 'white',
    outline: selected === name ? '5px solid green' : 'none',
  };

  return (
    <button style={style} data-id={id} className='my-10 mx-20' data-name={name} data-column={'left'}>
      {name}
    </button>
  );
};

export default LeftBox;
