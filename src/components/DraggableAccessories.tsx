import { useState, useRef, useCallback } from 'react';
import { Sparkles, Star, Heart, Zap, Coffee, Code2, Rocket, Gamepad2, BookOpen, Camera } from 'lucide-react';

interface Sticker {
  id: string;
  icon: React.ReactNode;
  color: string;
  label: string;
  initialPosition: { x: number; y: number };
  rotation: number;
}

// Evenly spaced positions around the image (avoiding center and import textbox area)
// Positions are relative to the container, image is roughly centered at 150, 200
const stickers: Sticker[] = [
  // Top row - evenly spaced
  { id: 'sparkles', icon: <Sparkles className="w-6 h-6" />, color: 'text-yellow-400', label: 'Sparkles', initialPosition: { x: 20, y: 30 }, rotation: -15 },
  { id: 'star', icon: <Star className="w-7 h-7" />, color: 'text-primary', label: 'Star', initialPosition: { x: 280, y: 25 }, rotation: 12 },
  
  // Left side - evenly spaced vertically
  { id: 'heart', icon: <Heart className="w-5 h-5" />, color: 'text-pink-soft', label: 'Heart', initialPosition: { x: -25, y: 120 }, rotation: -8 },
  { id: 'coffee', icon: <Coffee className="w-5 h-5" />, color: 'text-amber-500', label: 'Coffee', initialPosition: { x: -20, y: 220 }, rotation: -12 },
  
  // Right side - evenly spaced vertically (avoiding bottom-right import textbox)
  { id: 'zap', icon: <Zap className="w-6 h-6" />, color: 'text-cyan-code', label: 'Zap', initialPosition: { x: 310, y: 100 }, rotation: 20 },
  { id: 'gaming', icon: <Gamepad2 className="w-6 h-6" />, color: 'text-purple-400', label: 'Gaming', initialPosition: { x: 315, y: 200 }, rotation: 18 },
  
  // Bottom row - evenly spaced (avoiding import textbox on bottom right)
  { id: 'code', icon: <Code2 className="w-6 h-6" />, color: 'text-green-400', label: 'Code', initialPosition: { x: 30, y: 340 }, rotation: 8 },
  { id: 'books', icon: <BookOpen className="w-5 h-5" />, color: 'text-emerald-400', label: 'Reading', initialPosition: { x: 130, y: 355 }, rotation: -15 },
  { id: 'rocket', icon: <Rocket className="w-5 h-5" />, color: 'text-orange-400', label: 'Rocket', initialPosition: { x: -15, y: 320 }, rotation: -25 },
  { id: 'photography', icon: <Camera className="w-5 h-5" />, color: 'text-rose-400', label: 'Photography', initialPosition: { x: 300, y: 30 }, rotation: 12 },
];

interface StickerPosition {
  x: number;
  y: number;
}

// Boundary constraints - medium radius around the image
const BOUNDARY = {
  minX: -60,
  maxX: 360,
  minY: 0,
  maxY: 380,
};

const DraggableAccessories = () => {
  const [positions, setPositions] = useState<Record<string, StickerPosition>>(
    stickers.reduce((acc, s) => ({ ...acc, [s.id]: s.initialPosition }), {})
  );
  const [dragging, setDragging] = useState<string | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const clampPosition = useCallback((x: number, y: number): StickerPosition => {
    return {
      x: Math.max(BOUNDARY.minX, Math.min(BOUNDARY.maxX, x)),
      y: Math.max(BOUNDARY.minY, Math.min(BOUNDARY.maxY, y)),
    };
  }, []);

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
      
      const newX = moveX - containerRect.left - dragOffset.current.x;
      const newY = moveY - containerRect.top - dragOffset.current.y;
      
      // Apply boundary constraints
      const clampedPos = clampPosition(newX, newY);
      
      setPositions(prev => ({
        ...prev,
        [stickerId]: clampedPos
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
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Hint text - positioned at top, outside the main container */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/60 whitespace-nowrap pointer-events-none select-none font-mono z-40">
        ✨ drag the stickers • click to reset
      </div>
      
      {stickers.map((sticker) => {
        const pos = positions[sticker.id] || sticker.initialPosition;
        
        return (
          <div
            key={sticker.id}
            className={`absolute pointer-events-auto cursor-grab active:cursor-grabbing transition-all duration-200 ${sticker.color} ${
              dragging === sticker.id ? 'scale-125 z-50' : 'hover:scale-110 z-10'
            }`}
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