import { DndContext, DragOverlay } from '@dnd-kit/core';
import React, { useMemo, useState } from 'react';
import Bucket from './Bucket';
import Item from './Item';

const items = ['square', 'circle', 'triangle'];
const buckets = ['A', 'B', 'C'];
const SortingGame = () => {
  const [initialItems, setInitialItems] = useState(items);
  const [itemsToBucket, setItemsToBucket] = useState(buckets.reduce((acc, curr) => ((acc[curr] = []), acc), {}));
  const [activeItemId, setActiveItemId] = useState('');
  const itemMarkup = useMemo(
    () =>
      initialItems.map(item => (
        <Item key={item} id={item}>
          {item}
        </Item>
      )),
    [initialItems],
  );
  function handleDragEnd({ active, over }) {
    const itemId = active.id;
    const bucketId = over?.id;
    const previousBucketId = Object.keys(itemsToBucket).find(bucket => itemsToBucket[bucket]?.includes(itemId));
    if (previousBucketId === bucketId) return;
    if (!bucketId) {
      setItemsToBucket(prev => ({
        ...prev,
        [previousBucketId]: prev[previousBucketId]?.filter(item => item !== itemId),
      }));
      setInitialItems(prev => [...prev, itemId]);
    } else {
      setItemsToBucket(prev => ({
        ...prev,
        [previousBucketId]: prev[previousBucketId]?.filter(item => item !== itemId),
        [bucketId]: [...prev[bucketId], itemId],
      }));
      setInitialItems(prev => prev.filter(item => item !== itemId));
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={e => setActiveItemId(e.active.id)}>
      <div className='mx-auto mb-3 h-[100px] w-2/3'>{itemMarkup}</div>
      <div className='flex justify-around'>
        {buckets.map(id => (
          <Bucket id={id} key={id}>
            {itemsToBucket[id]?.map(item => (
              <Item key={item} id={item}>
                {item}
              </Item>
            ))}
          </Bucket>
        ))}
      </div>
      <DragOverlay>{activeItemId ? <Item id={activeItemId}>{activeItemId}</Item> : null}</DragOverlay>
    </DndContext>
  );
};

export default SortingGame;
