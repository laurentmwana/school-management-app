import { cn } from '@/lib/utils';
import React from 'react';

type LoaderContainerProps = {
className ?: string
content?: string
};

export const LoaderContainer: React.FC<LoaderContainerProps> = ({ className, content = 'chargement...' }) => {
  return (
    <div>
  <div
    className={cn("flex items-center justify-center py-8", className)}
  >
    <div className="flex items-center space-x-3">
      <div
        className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-primary"
      ></div>
      <span className="text-gray-600 text-sm">{ content }</span>
    </div>
  </div>
    </div>
  );
};
