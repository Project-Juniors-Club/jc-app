import React, { CSSProperties } from 'react';

const ProgressBar = ({ progress }) => {
  const WholeBar: CSSProperties = {
    height: '0.25rem',
    width: '100%',
    backgroundColor: 'whitesmoke',
  };

  const Progress: CSSProperties = {
    height: '100%',
    width: `${progress * 100}%`,
    backgroundColor: '#A9D357',
  };
  console.log(progress);
  return (
    <div style={WholeBar}>
      <div style={Progress}></div>
    </div>
  );
};

export default ProgressBar;
