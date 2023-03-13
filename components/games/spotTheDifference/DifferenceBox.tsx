import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { RefObject, useEffect, useRef } from 'react';
import { Rect, Transformer } from 'react-konva';
import { useRecoilState } from 'recoil';
import { diffBoxesInfoState } from '../../../atoms/atoms';

export interface DifferenceBoxInfo {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface DifferenceBoxProp {
  id: string;
  isSelected: boolean;
  onSelect: (evt: KonvaEventObject<MouseEvent>) => void;
}

export default function DifferenceBox({ id, isSelected, onSelect }: DifferenceBoxProp) {
  const [diffBoxes, setDiffBoxes] = useRecoilState(diffBoxesInfoState);
  const ref: RefObject<Konva.Rect> = useRef();
  const transformerRef = useRef<Konva.Transformer>();

  useEffect(() => {
    if (isSelected) {
      transformerRef.current.nodes([ref.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const getBox = () => {
    return diffBoxes.filter(diffBox => diffBox.id === id)[0];
  };

  const onDrag = (e: KonvaEventObject<DragEvent>) => {
    const draggedShape = { ...getBox() };
    draggedShape.x = e.target.x() < 0 ? 0 : e.target.x();
    draggedShape.y = e.target.y() < 0 ? 0 : e.target.y();
    const newBoxes = [...diffBoxes];
    const index = newBoxes.findIndex(boxes => boxes.id === id);
    newBoxes[index] = draggedShape;
    setDiffBoxes(newBoxes);
  };

  const onChange = (newAttrs: any) => {
    const rects = diffBoxes.slice();
    const index = rects.findIndex(boxes => boxes.id === id);
    rects[index] = newAttrs;
    setDiffBoxes(rects);
  };

  const diffBox = getBox();

  return (
    <>
      {diffBox && (
        <Rect
          onClick={onSelect}
          onTap={onSelect}
          ref={ref}
          x={diffBox.x}
          y={diffBox.y}
          height={diffBox.height}
          width={diffBox.width}
          stroke='red'
          strokeWidth={2}
          draggable
          onDragMove={e => onDrag(e)}
          onTransformEnd={e => {
            const node = ref.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();

            node.scaleX(1);
            node.scaleY(1);
            onChange({
              ...diffBox,
              x: node.x(),
              y: node.y(),
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(node.height() * scaleY),
            });
          }}
        />
      )}
      {isSelected && (
        <Transformer
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
}
