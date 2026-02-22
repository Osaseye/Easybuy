import React from 'react';

export const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full min-h-[400px] p-8">
      <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 border-t-primary rounded-full animate-spin mb-4"></div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Loading...</h3>
      <p className="text-gray-500 dark:text-gray-400 text-center max-w-sm">
        Please wait while we fetch the details for you.
      </p>
    </div>
  );
};
