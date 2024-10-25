import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { PresentationView } from '../components/PresentationView';
import { SlideControls } from '../components/SlideControls';

export default function Home() {
  const [code, setCode] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPresenting, setIsPresenting] = useState(false);

  const handleCodeChange = (value: string | undefined) => {
    setCode(value || '');
  };

  const startPresentation = () => {
    setIsPresenting(true);
    setCurrentSlide(0);
  };

  const exitPresentation = () => {
    setIsPresenting(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!isPresenting ? (
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6">AI TSX to Presentation Converter</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Input TSX</h2>
              <Editor
                height="70vh"
                defaultLanguage="typescript"
                defaultValue=""
                onChange={handleCodeChange}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                }}
              />
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                <PresentationView code={code} currentSlide={0} />
              </div>
              <button
                onClick={startPresentation}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Presentation
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 bg-black">
          <PresentationView code={code} currentSlide={currentSlide} />
          <SlideControls
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
            exitPresentation={exitPresentation}
          />
        </div>
      )}
    </div>
  );
}