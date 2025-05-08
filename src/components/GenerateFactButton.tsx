import React from 'react';
import { RefreshCw } from 'lucide-react';

interface GenerateFactButtonProps {
  onGetNewFact: () => void;
  isLoading: boolean;
}

const GenerateFactButton: React.FC<GenerateFactButtonProps> = ({ onGetNewFact, isLoading }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transform transition-all duration-300 hover:shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Generate New Fact</h3>
      <button
        onClick={onGetNewFact}
        disabled={isLoading}
        className={`w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-md transition-all duration-300 transform hover:scale-[1.02] ${
          isLoading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? (
          <RefreshCw className="h-5 w-5 animate-spin" />
        ) : (
          <RefreshCw className="h-5 w-5 animate-bounce" />
        )}
        <span className="font-medium">Get New Fact</span>
      </button>
    </div>
  );
};

export default GenerateFactButton;