import React from 'react';
import { CatFact } from '../types';
import FactCard from './FactCard';
import { Search } from 'lucide-react';

interface SearchResultsProps {
  results: CatFact[];
  isFavorite: (fact: CatFact) => boolean;
  onToggleFavorite: (fact: CatFact) => void;
  query: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ 
  results, 
  isFavorite, 
  onToggleFavorite,
  query
}) => {
  if (!query) {
    return null;
  }
  
  if (results.length === 0) {
    return (
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <Search className="h-5 w-5 text-gray-500" /> Search Results
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            No results found for "{query}". Try a different search term.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
        <Search className="h-5 w-5 text-gray-500" /> Search Results ({results.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map((fact) => (
          <FactCard
            key={fact.id}
            fact={fact}
            isFavorite={isFavorite(fact)}
            onToggleFavorite={() => onToggleFavorite(fact)}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;