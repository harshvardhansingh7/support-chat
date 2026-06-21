import React from 'react';

export const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <div className="flex space-x-1">
        <div className="h-2 w-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-2 w-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-2 w-2 bg-current rounded-full animate-bounce"></div>
      </div>
      <span className="text-sm">AI is thinking...</span>
    </div>
  );
};