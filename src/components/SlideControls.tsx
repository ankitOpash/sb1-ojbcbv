import { useCallback, useEffect } from 'react';

interface SlideControlsProps {
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
  exitPresentation: () => void;
}

export function SlideControls({
  currentSlide,
  setCurrentSlide,
  exitPresentation,
}: SlideControlsProps) {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
        case 'Space':
          setCurrentSlide(currentSlide + 1);
          break;
        case 'ArrowLeft':
          setCurrentSlide(Math.max(0, currentSlide - 1));
          break;
        case 'Escape':
          exitPresentation();
          break;
      }
    },
    [currentSlide, setCurrentSlide, exitPresentation]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div className="fixed bottom-4 right-4 flex gap-2">
      <button
        onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
        className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
      >
        Previous
      </button>
      <button
        onClick={() => setCurrentSlide(currentSlide + 1)}
        className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
      >
        Next
      </button>
      <button
        onClick={exitPresentation}
        className="p-2 bg-red-500/80 rounded-lg hover:bg-red-500 transition-colors"
      >
        Exit
      </button>
    </div>
  );
}