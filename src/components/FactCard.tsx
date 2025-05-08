import React from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { CatFact } from '../types';

interface FactCardProps {
  fact: CatFact;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onRemove?: () => void;
  showActions?: boolean;
}

const FactCard: React.FC<FactCardProps> = ({ 
  fact, 
  isFavorite, 
  onToggleFavorite, 
  onRemove,
  showActions = true
}) => {
  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fadeIn">
      <div className="flex flex-col">
        <p className="text-gray-700 dark:text-gray-200 text-lg mb-4 leading-relaxed">{fact.fact}</p>
        
        {showActions && (
          <div className="flex justify-between items-center mt-2">
            <div className="group relative">
              <button
                onClick={onToggleFavorite}
                className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                  isFavorite 
                    ? 'text-red-500 hover:text-red-600' 
                    : 'text-gray-400 hover:text-red-500'
                }`}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current animate-heartBeat' : ''}`} />
              </button>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
            
            {onRemove && (
              <div className="group relative">
                <button
                  onClick={onRemove}
                  className="p-2 rounded-full text-gray-400 hover:text-red-500 transition-all duration-300 transform hover:scale-110"
                  aria-label="Remove from favorites"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
                <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                  Remove from favorites
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FactCard;