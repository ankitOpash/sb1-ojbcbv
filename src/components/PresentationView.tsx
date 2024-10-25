import { useMemo } from 'react';
import { parseSlides } from '../utils/slideParser';

interface PresentationViewProps {
  code: string;
  currentSlide: number;
}

export function PresentationView({ code, currentSlide }: PresentationViewProps) {
  const slides = useMemo(() => parseSlides(code), [code]);
  const currentSlideContent = slides[currentSlide] || null;
  const totalSlides = slides.length;

  if (!currentSlideContent) {
    return (
      <div className="flex items-center justify-center h-full text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome to the Presentation</h2>
          <p className="text-gray-400">
            Start by adding your slides using TSX or Markdown format.
            Separate slides using "---"
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full">
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
        <div className="max-w-4xl w-full">
          {currentSlideContent}
        </div>
      </div>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white/50 text-sm">
        Slide {currentSlide + 1} of {totalSlides}
      </div>
    </div>
  );
}