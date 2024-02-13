import React from 'react';

const Loading = () => {
  return (
    <div className="flex mt-20">
      <div
        className="animate-spin mx-auto inline-block self-center w-10 h-10 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
