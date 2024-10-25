import React from 'react';
import * as babel from '@babel/core';

interface SlideContent {
  type: 'jsx' | 'markdown';
  content: string;
}

export function parseSlides(code: string): React.ReactNode[] {
  if (!code.trim()) {
    return [];
  }

  try {
    const slides: React.ReactNode[] = [];
    const rawSlides = code.split('---').filter(Boolean).map(s => s.trim());

    rawSlides.forEach((slideContent, index) => {
      try {
        // Check if the content is JSX/TSX
        const isJSX = slideContent.includes('export') || 
                      slideContent.includes('import') || 
                      slideContent.includes('function') ||
                      slideContent.includes('<');

        if (isJSX) {
          const wrappedCode = `
            import React from 'react';
            ${slideContent}
          `;

          const result = babel.transformSync(wrappedCode, {
            filename: 'slide.tsx',
            presets: [
              '@babel/preset-react',
              '@babel/preset-typescript'
            ],
            ast: true,
          });

          if (result?.code) {
            // Extract the component name if it's a named export
            const match = slideContent.match(/export\s+(?:default\s+)?function\s+(\w+)/);
            const componentName = match ? match[1] : 'SlideComponent';

            slides.push(
              <div key={index} className="w-full h-full flex items-center justify-center">
                <div className="slide-content">
                  {/* We'll evaluate and render the component here */}
                  <pre className="text-sm">
                    {slideContent}
                  </pre>
                </div>
              </div>
            );
          }
        } else {
          // Treat as markdown/text content
          slides.push(
            <div key={index} className="w-full h-full flex items-center justify-center">
              <div className="slide-content prose prose-invert">
                <pre className="text-lg whitespace-pre-wrap">
                  {slideContent}
                </pre>
              </div>
            </div>
          );
        }
      } catch (error) {
        slides.push(
          <div key={index} className="w-full h-full flex items-center justify-center">
            <div className="slide-error bg-red-500/10 p-6 rounded-lg">
              <h3 className="text-red-500 font-bold mb-2">Error in Slide {index + 1}</h3>
              <pre className="text-red-400 text-sm">
                {(error as Error).message}
              </pre>
            </div>
          </div>
        );
      }
    });

    return slides;
  } catch (error) {
    return [
      <div key="error" className="w-full h-full flex items-center justify-center">
        <div className="slide-error bg-red-500/10 p-6 rounded-lg">
          <h3 className="text-red-500 font-bold mb-2">Presentation Error</h3>
          <pre className="text-red-400 text-sm">
            {(error as Error).message}
          </pre>
        </div>
      </div>
    ];
  }
}