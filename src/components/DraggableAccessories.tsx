import { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, Star, Heart, Zap, Coffee, Code2, Rocket, Gamepad2, BookOpen, Camera } from 'lucide-react';

interface Sticker {
  id: string;
  icon: React.ReactNode;
  color: string;
  label: string;
  rotation: number;
}

const stickerDefs: Sticker[] = [
  { id: 'sparkles', icon: <Sparkles className="w-5 h-5" />, color: 'text-yellow-400', label: 'Sparkles', rotation: -12 },
  { id: 'heart', icon: <Heart className="w-5 h-5" />, color: 'text-pink-400', label: 'Heart', rotation: 8 },
  { id: 'coffee', icon: <Coffee className="w-5 h-5" />, color: 'text-amber-500', label: 'Coffee', rotation: -15 },
  { id: 'gaming', icon: <Gamepad2 className="w-5 h-5" />, color: 'text-green-400', label: 'Gaming', rotation: 6 },
  { id: 'star', icon: <Star className="w-5 h-5" />, color: 'text-cyan-400', label: 'Star', rotation: 15 },
  { id: 'zap', icon: <Zap className="w-5 h-5" />, color: 'text-purple-400', label: 'Zap', rotation: -10 },
  { id: 'rocket', icon: <Rocket className="w-5 h-5" />, color: 'text-orange-400', label: 'Rocket', rotation: 20 },
  { id: 'books', icon: <BookOpen className="w-5 h-5" />, color: 'text-rose-400', label: 'Reading', rotation: -8 },
  { id: 'photography', icon: <Camera className="w-5 h-5" />, color: 'text-indigo-400', label: 'Photography', rotation: 5 },
];

interface StickerPosition {
  x: number;
  y: number;
}

// Calculate initial positions based on container size — left & right sides only
const getInitialPositions = (containerWidth: number, containerHeight: number): Record<string, StickerPosition> => {
  const leftStickers = ['sparkles', 'heart', 'coffee', 'gaming'];
  const rightStickers = ['star', 'zap', 'rocket', 'books', 'photography'];
  
  const positions: Record<string, StickerPosition> = {};
  const stickerSize = 36; // approximate sticker element size
  
  // Left side: offset to the left of the image
  const leftX = -stickerSize - 8;
  const leftSpacing = Math.min((containerHeight - 40) / (leftStickers.length), 90);
  const leftStartY = 30;
  leftStickers.forEach((id, i) => {
    positions[id] = { x: leftX, y: leftStartY + i * leftSpacing };
  });
  
  // Right side: offset to the right of the image
  const rightX = containerWidth + 8;
  const rightSpacing = Math.min((containerHeight - 40) / (rightStickers.length), 80);
  const rightStartY = 20;
  rightStickers.forEach((id, i) => {
    positions[id] = { x: rightX, y: rightStartY + i * rightSpacing };
  });
  
  return positions;
};

const DraggableAccessories = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<Record<string, StickerPosition>>({});
  const [dragging, setDragging] = useState<string | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const initialPositionsRef = useRef<Record<string, StickerPosition>>({});

  // Measure container and set initial positions
  useEffect(() => {
    const updatePositions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({ width, height });
        const initPos = getInitialPositions(width, height);
        initialPositionsRef.current = initPos;
        setPositions(initPos);
      }
    };
    
    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, []);

  const handleResetPosition = useCallback((stickerId: string) => {
    setPositions(prev => ({
      ...prev,
      [stickerId]: initialPositionsRef.current[stickerId] || prev[stickerId]
    }));
  }, []);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent, stickerId: string) => {
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;
    
    const currentPos = positions[stickerId];
    if (!currentPos) return;
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
      
      if (Math.abs(moveX - startX) > 5 || Math.abs(moveY - startY) > 5) {
        hasMoved = true;
      }
      
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      // Constrain: stickers cannot be dragged past the right edge of the image container (into text side)
      const stickerSize = 36;
      const maxX = rect.width + stickerSize;
      const minX = -stickerSize - 20;
      const minY = -stickerSize;
      const maxY = rect.height - stickerSize; // keep stickers within the image height, not below
      
      const newX = Math.max(minX, Math.min(maxX, moveX - rect.left - dragOffset.current.x));
      const newY = Math.max(minY, Math.min(maxY, moveY - rect.top - dragOffset.current.y));
      
      setPositions(prev => ({
        ...prev,
        [stickerId]: { x: newX, y: newY }
      }));
    };

    const handleEnd = () => {
      setDragging(null);
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
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/60 whitespace-nowrap pointer-events-none select-none font-mono">
        ✨ drag the stickers • click to reset
      </div>
      
      {stickerDefs.map((sticker) => {
        const pos = positions[sticker.id];
        if (!pos) return null;
        
        return (
          <div
            key={sticker.id}
            className={`absolute pointer-events-auto cursor-grab active:cursor-grabbing ${sticker.color} ${
              dragging === sticker.id ? 'scale-125 z-50' : 'hover:scale-110 z-10 transition-transform duration-200'
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
