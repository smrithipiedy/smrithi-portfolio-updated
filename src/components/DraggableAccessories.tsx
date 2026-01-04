import { useState, useRef } from 'react';
import { Sparkles, Star, Heart, Zap, Coffee, Code2, Music, Gamepad2, Camera, Rocket } from 'lucide-react';

interface Accessory {
  id: string;
  icon: React.ReactNode;
  color: string;
  label: string;
}

interface PlacedAccessory {
  id: string;
  accessoryId: string;
  x: number;
  y: number;
  icon: React.ReactNode;
  color: string;
}

const accessories: Accessory[] = [
  { id: 'sparkles', icon: <Sparkles className="w-5 h-5" />, color: 'text-yellow-400', label: 'Sparkles' },
  { id: 'star', icon: <Star className="w-5 h-5" />, color: 'text-primary', label: 'Star' },
  { id: 'heart', icon: <Heart className="w-5 h-5" />, color: 'text-pink-soft', label: 'Heart' },
  { id: 'zap', icon: <Zap className="w-5 h-5" />, color: 'text-cyan-code', label: 'Zap' },
  { id: 'coffee', icon: <Coffee className="w-5 h-5" />, color: 'text-amber-500', label: 'Coffee' },
  { id: 'code', icon: <Code2 className="w-5 h-5" />, color: 'text-green-400', label: 'Code' },
  { id: 'music', icon: <Music className="w-5 h-5" />, color: 'text-purple-400', label: 'Music' },
  { id: 'gamepad', icon: <Gamepad2 className="w-5 h-5" />, color: 'text-blue-400', label: 'Gaming' },
  { id: 'camera', icon: <Camera className="w-5 h-5" />, color: 'text-rose-400', label: 'Camera' },
  { id: 'rocket', icon: <Rocket className="w-5 h-5" />, color: 'text-orange-400', label: 'Rocket' },
];

interface DraggableAccessoriesProps {
  dropZoneRef: React.RefObject<HTMLDivElement>;
  placedAccessories: PlacedAccessory[];
  setPlacedAccessories: React.Dispatch<React.SetStateAction<PlacedAccessory[]>>;
}

const DraggableAccessories = ({ dropZoneRef, placedAccessories, setPlacedAccessories }: DraggableAccessoriesProps) => {
  const [dragging, setDragging] = useState<Accessory | null>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent, accessory: Accessory) => {
    e.preventDefault();
    setDragging(accessory);
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragPosition({ x: clientX, y: clientY });

    const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
      const moveX = 'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const moveY = 'touches' in moveEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;
      setDragPosition({ x: moveX, y: moveY });
    };

    const handleEnd = (endEvent: MouseEvent | TouchEvent) => {
      const endX = 'changedTouches' in endEvent ? endEvent.changedTouches[0].clientX : endEvent.clientX;
      const endY = 'changedTouches' in endEvent ? endEvent.changedTouches[0].clientY : endEvent.clientY;

      if (dropZoneRef.current) {
        const rect = dropZoneRef.current.getBoundingClientRect();
        if (endX >= rect.left && endX <= rect.right && endY >= rect.top && endY <= rect.bottom) {
          const relativeX = ((endX - rect.left) / rect.width) * 100;
          const relativeY = ((endY - rect.top) / rect.height) * 100;
          
          setPlacedAccessories(prev => [...prev, {
            id: `${accessory.id}-${Date.now()}`,
            accessoryId: accessory.id,
            x: relativeX,
            y: relativeY,
            icon: accessory.icon,
            color: accessory.color,
          }]);
        }
      }

      setDragging(null);
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

  const removeAccessory = (id: string) => {
    setPlacedAccessories(prev => prev.filter(a => a.id !== id));
  };

  return (
    <>
      {/* Accessory Palette */}
      <div className="absolute -left-16 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2 p-2 rounded-lg border border-border bg-card/80 backdrop-blur-sm">
        <span className="font-mono text-[10px] text-muted-foreground text-center mb-1">drag me!</span>
        {accessories.slice(0, 5).map((accessory) => (
          <div
            key={accessory.id}
            className={`p-2 rounded-lg border border-border bg-background/50 cursor-grab active:cursor-grabbing transition-all hover:scale-110 hover:border-primary/50 ${accessory.color}`}
            onMouseDown={(e) => handleDragStart(e, accessory)}
            onTouchStart={(e) => handleDragStart(e, accessory)}
            title={accessory.label}
          >
            {accessory.icon}
          </div>
        ))}
      </div>

      {/* Right side palette */}
      <div className="absolute -right-16 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2 p-2 rounded-lg border border-border bg-card/80 backdrop-blur-sm">
        <span className="font-mono text-[10px] text-muted-foreground text-center mb-1">& me!</span>
        {accessories.slice(5).map((accessory) => (
          <div
            key={accessory.id}
            className={`p-2 rounded-lg border border-border bg-background/50 cursor-grab active:cursor-grabbing transition-all hover:scale-110 hover:border-primary/50 ${accessory.color}`}
            onMouseDown={(e) => handleDragStart(e, accessory)}
            onTouchStart={(e) => handleDragStart(e, accessory)}
            title={accessory.label}
          >
            {accessory.icon}
          </div>
        ))}
      </div>

      {/* Mobile palette */}
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex lg:hidden gap-2 p-2 rounded-lg border border-border bg-card/80 backdrop-blur-sm">
        <span className="font-mono text-[10px] text-muted-foreground self-center mr-1">drag →</span>
        {accessories.slice(0, 6).map((accessory) => (
          <div
            key={accessory.id}
            className={`p-2 rounded-lg border border-border bg-background/50 cursor-grab active:cursor-grabbing transition-all hover:scale-110 ${accessory.color}`}
            onMouseDown={(e) => handleDragStart(e, accessory)}
            onTouchStart={(e) => handleDragStart(e, accessory)}
            title={accessory.label}
          >
            {accessory.icon}
          </div>
        ))}
      </div>

      {/* Placed accessories on photo */}
      {placedAccessories.map((placed) => (
        <div
          key={placed.id}
          className={`absolute z-20 cursor-pointer transition-transform hover:scale-125 ${placed.color} drop-shadow-lg animate-scale-in`}
          style={{ left: `${placed.x}%`, top: `${placed.y}%`, transform: 'translate(-50%, -50%)' }}
          onClick={() => removeAccessory(placed.id)}
          title="Click to remove"
        >
          {placed.icon}
        </div>
      ))}

      {/* Dragging ghost */}
      {dragging && (
        <div
          ref={dragRef}
          className={`fixed pointer-events-none z-50 ${dragging.color} drop-shadow-2xl scale-125`}
          style={{ left: dragPosition.x, top: dragPosition.y, transform: 'translate(-50%, -50%)' }}
        >
          {dragging.icon}
        </div>
      )}
    </>
  );
};

export default DraggableAccessories;
