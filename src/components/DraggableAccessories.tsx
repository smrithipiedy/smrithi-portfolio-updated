import { useEffect, useState, useRef } from 'react';
import { Sparkles, Star, Heart, Zap, Coffee, Code2, Rocket, Gamepad2, BookOpen, Camera } from 'lucide-react';

interface Sticker {
  id: string;
  icon: React.ReactNode;
  color: string;
  label: string;
  initialPosition: { x: number; y: number };
  rotation: number;
}

// Scattered positions around the image (avoiding top textbox and center person)
const stickers: Sticker[] = [
  // Upper left area
  { id: 'sparkles', icon: <Sparkles className="w-6 h-6" />, color: 'text-yellow-400', label: 'Sparkles', initialPosition: { x: -55, y: 145 }, rotation: -18 },
  // Mid-left
  { id: 'heart', icon: <Heart className="w-5 h-5" />, color: 'text-pink-400', label: 'Heart', initialPosition: { x: -40, y: 250 }, rotation: 12 },
  // Lower left
  { id: 'coffee', icon: <Coffee className="w-5 h-5" />, color: 'text-amber-500', label: 'Coffee', initialPosition: { x: -30, y: 380 }, rotation: -8 },
  // Upper right
  { id: 'star', icon: <Star className="w-6 h-6" />, color: 'text-cyan-400', label: 'Star', initialPosition: { x: 340, y: 140 }, rotation: 22 },
  // Mid-right (higher)
  { id: 'zap', icon: <Zap className="w-6 h-6" />, color: 'text-purple-400', label: 'Zap', initialPosition: { x: 360, y: 200 }, rotation: -15 },
  // Right side (lower)
  { id: 'rocket', icon: <Rocket className="w-5 h-5" />, color: 'text-orange-400', label: 'Rocket', initialPosition: { x: 345, y: 340 }, rotation: 25 },
  // Bottom left corner
  { id: 'gaming', icon: <Gamepad2 className="w-6 h-6" />, color: 'text-green-400', label: 'Gaming', initialPosition: { x: 40, y: 420 }, rotation: -12 },
  // Bottom center
  { id: 'books', icon: <BookOpen className="w-5 h-5" />, color: 'text-rose-400', label: 'Reading', initialPosition: { x: 180, y: 430 }, rotation: 8 },
  // Bottom right area
  { id: 'photography', icon: <Camera className="w-5 h-5" />, color: 'text-indigo-400', label: 'Photography', initialPosition: { x: 290, y: 415 }, rotation: -20 },
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

  const STICKER_SIZE = 56; // px (wrapper + padding)

  const constrainPosition = (pos: StickerPosition, rect: DOMRect): StickerPosition => {
    const margin = 8;
    const maxX = Math.max(margin, rect.width - STICKER_SIZE - margin);
    const maxY = Math.max(margin, rect.height - STICKER_SIZE - margin);

    let x = Math.min(Math.max(pos.x, margin), maxX);
    let y = Math.min(Math.max(pos.y, margin), maxY);

    // Keep stickers away from the "import Smrithi from..." textbox area at the top.
    const textboxMaxY = Math.min(130, rect.height * 0.28);
    if (y < textboxMaxY) y = textboxMaxY + 10;

    return { x, y };
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const applyConstraints = () => {
      const rect = el.getBoundingClientRect();
      setPositions((prev) => {
        const next: Record<string, StickerPosition> = {};
        for (const s of stickers) {
          next[s.id] = constrainPosition(prev[s.id] ?? s.initialPosition, rect);
        }
        return next;
      });
    };

    applyConstraints();

    const ro = new ResizeObserver(applyConstraints);
    ro.observe(el);

    window.addEventListener('resize', applyConstraints);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', applyConstraints);
    };
  }, []);

  const handleResetPosition = (stickerId: string) => {
    const sticker = stickers.find(s => s.id === stickerId);
    const rect = containerRef.current?.getBoundingClientRect();
    if (sticker) {
      setPositions(prev => ({
        ...prev,
        [stickerId]: rect ? constrainPosition(sticker.initialPosition, rect) : sticker.initialPosition
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
      
      const nextPos = {
        x: moveX - containerRect.left - dragOffset.current.x,
        y: moveY - containerRect.top - dragOffset.current.y,
      };

      const constrained = constrainPosition(nextPos, containerRect);

      setPositions(prev => ({
        ...prev,
        [stickerId]: constrained
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
      {/* Hint text - positioned at top */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/60 whitespace-nowrap pointer-events-none select-none font-mono">
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
