import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.4)] inset-0 flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-300 border-solid"></div>
    </div>
  );
};
