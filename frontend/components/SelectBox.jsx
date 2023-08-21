import { useContext, useRef, useState } from 'react';
import Trash from './assets/Trash';
import WBContext from './WBContext';

export default function ({ stroke: { strokeId, box: { left, top, width, height } }, setSelectedStroke }) {
  const [moving, setMoving] = useState(false);
  const position = useRef(null);
  const WB = useContext(WBContext);
  const onDelete = () => {
    setTimeout(() => WB.delete(strokeId), 10);
    setSelectedStroke(null);
  };
  const onMove = (e) => {
    setMoving(true);
    position.current = { x: e.pageX, y: e.pageY };
  };
  const onMoving = (e) => {
    const { x, y } = position.current;
    WB.moving(strokeId, { x: e.pageX - x, y: e.pageY - y });
    position.current = { x: e.pageX, y: e.pageY };
  };
  const onMoved = (e) => {
    const { x, y } = position.current;
    WB.moving(strokeId, { x: e.pageX - x, y: e.pageY - y }, true);
    setMoving(false);
    position.current = null;
  }
  return (
    <>
      <div className="fixed z-[100] bg-slate-800 text-white rounded p-1 flex flex-row gap-2" style={{ left, top: top - 36 }}>
        <div className="cursor-pointer hover:text-slate-300" onClick={onDelete}><Trash /></div>
      </div>
      <div id={`stroke-${strokeId}-selected`} className="fixed z-[100] border-dashed border-2 border-slate-800 cursor-move" style={{ left, top, width, height }} onMouseDown={onMove}></div>
      {moving && (
        <div className="fixed z-[200] h-full w-full bg-slate-200 opacity-25" onMouseMove={onMoving} onMouseUp={onMoved}></div>
      )}
    </>
  );
}