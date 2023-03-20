import React, { CSSProperties } from 'react';

const ProgressBar = ({ progress }) => {
  const WholeBar: CSSProperties = {
    height: 20,
    width: '100%',
    backgroundColor: 'whitesmoke',
  };

  const Progress: CSSProperties = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: '#A9D357',
  };

  return (
    <div style={WholeBar}>
      <div style={Progress}></div>
    </div>
  );
};

export default ProgressBar;
