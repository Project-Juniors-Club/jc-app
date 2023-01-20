import React from 'react';

const RightBox = ({ id, name }: { id: number; name: string }) => {
  const style = {
    width: '100px',
    height: '100px',
    backgroundColor: 'grey',
    color: 'white',
  };

  return (
    <button style={style} data-id={id} className='my-10 mx-20' data-column={'right'} data-name={name}>
      {name}
    </button>
  );
};

export default RightBox;
