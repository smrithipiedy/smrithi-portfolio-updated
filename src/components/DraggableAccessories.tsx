import { useState, useRef } from 'react';
import { Sparkles, Star, Heart, Zap, Coffee, Code2, Rocket, Terminal, Braces, Gamepad2, BookOpen, Camera } from 'lucide-react';

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
  { id: 'gaming', icon: <Gamepad2 className="w-6 h-6" />, color: 'text-purple-400', label: 'Gaming', initialPosition: { x: -55, y: 200 }, rotation: 18 },
  { id: 'books', icon: <BookOpen className="w-5 h-5" />, color: 'text-emerald-400', label: 'Reading', initialPosition: { x: 385, y: 320 }, rotation: -15 },
  { id: 'photography', icon: <Camera className="w-5 h-5" />, color: 'text-rose-400', label: 'Photography', initialPosition: { x: 30, y: 395 }, rotation: 12 },
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
  const dragOffset = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleResetPosition = (stickerId: string) => {
    const sticker = stickers.find(s => s.id === stickerId);
    if (sticker) {
      setPositions(prev => ({
        ...prev,
        [stickerId]: sticker.initialPosition
      }));
    }
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent, stickerId: string) => {
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;
    
    const currentPos = positions[stickerId];
    const startX = clientX;
    const startY = clientY;
    let hasMoved = false;
    
    dragOffset.current = {
      x: clientX - containerRect.left - currentPos.x,
      y: clientY - containerRect.top - currentPos.y,
    };
    
    setDragging(stickerId);

    const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
      const moveX = 'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const moveY = 'touches' in moveEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;
      
      // Check if actually moved (more than 5px)
      if (Math.abs(moveX - startX) > 5 || Math.abs(moveY - startY) > 5) {
        hasMoved = true;
      }
      
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
      // If clicked without dragging, reset to initial position
      if (!hasMoved) {
        handleResetPosition(stickerId);
      }
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

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-visible">
      {/* Hint text */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/70 whitespace-nowrap pointer-events-none select-none animate-pulse">
        ✨ Drag the stickers • Click to reset
      </div>
      
      {stickers.map((sticker) => {
        const pos = positions[sticker.id] || sticker.initialPosition;
        const isAtInitial = pos.x === sticker.initialPosition.x && pos.y === sticker.initialPosition.y;
        
        return (
          <div
            key={sticker.id}
            className={`absolute pointer-events-auto cursor-grab active:cursor-grabbing transition-all duration-150 ${sticker.color} ${
              dragging === sticker.id ? 'scale-125 z-50' : 'hover:scale-110 z-10'
            } ${isAtInitial ? 'animate-[wiggle_2s_ease-in-out_infinite]' : ''}`}
            style={{
              left: pos.x,
              top: pos.y,
              transform: `rotate(${sticker.rotation || 0}deg)`,
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
            }}
            onMouseDown={(e) => handleDragStart(e, sticker.id)}
            onTouchStart={(e) => handleDragStart(e, sticker.id)}
            title={`Drag me! Click to reset • ${sticker.label}`}
          >
            <div className="p-2 rounded-xl bg-card/90 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-colors">
              {sticker.icon}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DraggableAccessories;
