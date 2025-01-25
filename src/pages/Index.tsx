import { useState, useEffect } from 'react';
import { Toolbar } from '../components/Toolbar';
import { toast } from 'sonner';

const Index = () => {
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'w' || e.key === 'W') {
        setBackgroundColor('#FFFFFF');
        toast('Background set to white');
      } else if (e.key === 'b' || e.key === 'B') {
        setBackgroundColor('#000000');
        toast('Background set to black');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleColorChange = (color: string) => {
    setBackgroundColor(color);
    toast('Background color updated');
  };

  return (
    <div 
      className="min-h-screen w-full transition-colors duration-200"
      style={{ backgroundColor }}
    >
      <Toolbar 
        backgroundColor={backgroundColor}
        onColorChange={handleColorChange}
      />
    </div>
  );
};

export default Index;