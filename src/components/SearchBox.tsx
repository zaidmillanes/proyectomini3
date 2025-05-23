import React, { useState, useEffect } from 'react';
import { Search, X, RefreshCw, HelpCircle } from 'lucide-react';
import { getAllFacts } from '../services/api';
import { ApiResponse } from '../types';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, isSearching }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [allFacts, setAllFacts] = useState<ApiResponse[]>([]);
  
  useEffect(() => {
    const loadFacts = async () => {
      const facts = await getAllFacts();
      setAllFacts(facts);
    };
    loadFacts();
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };
  
  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transform transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Search Facts</h3>
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="text-gray-500 hover:text-indigo-500 transition-colors duration-200"
          aria-label="Show available facts"
        >
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>
      
      {showHelp && (
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h4 className="font-medium text-gray-700 dark:text-gray-200 mb-2">Available Facts ({allFacts.length}):</h4>
          <div className="max-h-40 overflow-y-auto text-sm text-gray-600 dark:text-gray-300">
            {allFacts.map((fact, index) => (
              <p key={index} className="mb-2 pb-2 border-b border-gray-200 dark:border-gray-600 last:border-0">
                {fact.fact}
              </p>
            ))}
          </div>
        </div>
      )}
      
      <form onSubmit={handleSearch} className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-5 w-5 text-gray-400 transition-colors duration-200" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search facts..."
            className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 hover:border-indigo-300 dark:hover:border-indigo-500"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        
        {isSearching && (
          <div className="absolute right-3 top-3">
            <RefreshCw className="h-5 w-5 text-indigo-500 animate-spin" />
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBox;
