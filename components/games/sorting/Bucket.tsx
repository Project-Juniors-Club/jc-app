import { useDroppable } from '@dnd-kit/core';
import React from 'react';

const Bucket = ({ children = null, id }: { children: React.ReactNode; id: string }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });
  const style = {
    outline: isOver ? '2px solid blue' : '1px solid black',
    width: '100px',
    height: '300px',
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};

export default Bucket;
