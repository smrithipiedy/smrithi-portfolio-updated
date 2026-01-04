import { useState, useRef } from 'react';
import { Sparkles, Star, Heart, Zap, Coffee, Code2, Rocket, Terminal, Braces } from 'lucide-react';

interface Sticker {
  id: string;
  icon: React.ReactNode;
  color: string;
  label: string;
  initialPosition: { x: number; y: number };
  rotation: number;
}

const stickers: Sticker[] = [
  { id: 'sparkles', icon: <Sparkles className="w-6 h-6" />, color: 'text-yellow-400', label: 'Sparkles', initialPosition: { x: -60, y: -20 }, rotation: -15 },
  { id: 'star', icon: <Star className="w-7 h-7" />, color: 'text-primary', label: 'Star', initialPosition: { x: -50, y: 120 }, rotation: 12 },
  { id: 'heart', icon: <Heart className="w-5 h-5" />, color: 'text-pink-soft', label: 'Heart', initialPosition: { x: -45, y: 280 }, rotation: -8 },
  { id: 'zap', icon: <Zap className="w-6 h-6" />, color: 'text-cyan-code', label: 'Zap', initialPosition: { x: 380, y: -15 }, rotation: 20 },
  { id: 'coffee', icon: <Coffee className="w-5 h-5" />, color: 'text-amber-500', label: 'Coffee', initialPosition: { x: 395, y: 100 }, rotation: -12 },
  { id: 'code', icon: <Code2 className="w-6 h-6" />, color: 'text-green-400', label: 'Code', initialPosition: { x: 390, y: 220 }, rotation: 8 },
  { id: 'rocket', icon: <Rocket className="w-5 h-5" />, color: 'text-orange-400', label: 'Rocket', initialPosition: { x: 100, y: -45 }, rotation: -25 },
  { id: 'terminal', icon: <Terminal className="w-5 h-5" />, color: 'text-lavender', label: 'Terminal', initialPosition: { x: 250, y: -40 }, rotation: 15 },
  { id: 'braces', icon: <Braces className="w-6 h-6" />, color: 'text-blue-400', label: 'Braces', initialPosition: { x: 180, y: 390 }, rotation: -10 },
];

interface StickerPosition {
  x: number;
  y: number;
}

const DraggableAccessories = () => {
  const [positions, setPositions] = useState<Record<string, StickerPosition>>(
    stickers.reduce((acc, s) => ({ ...acc, [s.id]: s.initialPosition }), {})
  );
  const [dragging, setDragging] = useState<string | null>(null);
  const [movedStickers, setMovedStickers] = useState<Set<string>>(new Set());
  const dragOffset = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent, stickerId: string) => {
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;
    
    const currentPos = positions[stickerId];
    dragOffset.current = {
      x: clientX - containerRect.left - currentPos.x,
      y: clientY - containerRect.top - currentPos.y,
    };
    
    setDragging(stickerId);

    const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
      const moveX = 'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const moveY = 'touches' in moveEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;
      
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) return;
      
      setPositions(prev => ({
        ...prev,
        [stickerId]: {
          x: moveX - containerRect.left - dragOffset.current.x,
          y: moveY - containerRect.top - dragOffset.current.y,
        }
      }));
    };

    const handleEnd = () => {
      setDragging(null);
      setMovedStickers(prev => new Set(prev).add(stickerId));
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('touchend', handleEnd);
  };

  const handleClick = (stickerId: string) => {
    const sticker = stickers.find(s => s.id === stickerId);
    if (sticker && movedStickers.has(stickerId)) {
      setPositions(prev => ({
        ...prev,
        [stickerId]: sticker.initialPosition
      }));
      setMovedStickers(prev => {
        const newSet = new Set(prev);
        newSet.delete(stickerId);
        return newSet;
      });
    }
  };

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-visible">
      {/* Drag Me hint */}
      <div className="absolute -left-16 top-1/2 -translate-y-1/2 pointer-events-none">
        <div className="glass-card px-3 py-1.5 rounded-full text-xs font-mono text-primary animate-pulse whitespace-nowrap">
          ✨ Drag Me!
        </div>
      </div>
      
      {stickers.map((sticker) => {
        const pos = positions[sticker.id];
        const stickerData = stickers.find(s => s.id === sticker.id);
        const isMoved = movedStickers.has(sticker.id);
        
        return (
          <div
            key={sticker.id}
            className={`absolute pointer-events-auto cursor-grab active:cursor-grabbing transition-all duration-150 ${sticker.color} ${
              dragging === sticker.id ? 'scale-125 z-50' : 'hover:scale-110 z-10'
            }`}
            style={{
              left: pos.x,
              top: pos.y,
              transform: `rotate(${stickerData?.rotation || 0}deg)`,
              filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.24))',
            }}
            onMouseDown={(e) => handleDragStart(e, sticker.id)}
            onTouchStart={(e) => handleDragStart(e, sticker.id)}
            onClick={() => handleClick(sticker.id)}
            title={isMoved ? 'Click to reset position' : `Drag me! - ${sticker.label}`}
          >
            <div className="p-2 rounded-xl bg-card/90 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-colors relative">
              {sticker.icon}
              {isMoved && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-muted-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  click to reset
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DraggableAccessories;
