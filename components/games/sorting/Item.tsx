import { useDraggable } from '@dnd-kit/core';
import React from 'react';

const Item = ({ children, id }: { children: React.ReactNode; id: string }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
  });
  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 1)` : null,
    width: '100px',
    height: '100px',
    backgroundColor: 'red',
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </button>
  );
};

export default Item;
