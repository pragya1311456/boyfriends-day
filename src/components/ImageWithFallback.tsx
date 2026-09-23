import React, { useState } from 'react';
import { Heart, Image as ImageIcon } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackCaption?: string;
  containerClassName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Romantic memory',
  fallbackCaption,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-rose-50 ${containerClassName}`}>
      {!hasError && src ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          onLoad={() => setIsLoaded(true)}
          className={`${className} ${!isLoaded ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} transition-all duration-500`}
          {...props}
        />
      ) : null}

      {(!src || hasError) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-rose-100 to-rose-50 text-[#c62845] text-center select-none">
          <div className="w-12 h-12 rounded-full bg-white/80 shadow-sm flex items-center justify-center mb-2">
            <Heart className="w-6 h-6 text-[#c62845] fill-[#c62845] animate-pulse" />
          </div>
          <p className="text-xs font-semibold text-[#8c3a4f] max-w-[85%] line-clamp-2">
            {fallbackCaption || alt || 'A cherished sweet memory'}
          </p>
        </div>
      )}

      {!isLoaded && !hasError && src && (
        <div className="absolute inset-0 flex items-center justify-center bg-rose-50/70 backdrop-blur-[2px]">
          <Heart className="w-6 h-6 text-[#ff4d6d] fill-[#ff4d6d] animate-ping opacity-75" />
        </div>
      )}
    </div>
  );
};
