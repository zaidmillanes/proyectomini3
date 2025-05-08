import React, { useEffect, useState } from 'react';
import { useCatFact } from './hooks/useCatFact';
import { useDarkMode } from './hooks/useDarkMode';
import { useLocalStorage } from './hooks/useLocalStorage';
import { CatFact } from './types';

// Components
import Header from './components/Header';
import FactCard from './components/FactCard';
import FactControls from './components/FactControls';
import FavoritesList from './components/FavoritesList';
import SearchResults from './components/SearchResults';
import Footer from './components/Footer';
import ErrorDisplay from './components/ErrorDisplay';
import { InfoIcon } from 'lucide-react';

function App() {
  const { 
    currentFact, 
    isLoading, 
    error, 
    getRandomFact,
    searchResults,
    isSearching,
    searchForFacts
  } = useCatFact();
  
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [favorites, setFavorites] = useLocalStorage<CatFact[]>('catFactsFavorites', []);
  const [searchQuery, setSearchQuery] = useState('');
  
  const isFavorite = (fact: CatFact) => {
    return fact && favorites.some(fav => fav.fact === fact.fact);
  };
  
  const toggleFavorite = (fact: CatFact) => {
    if (isFavorite(fact)) {
      setFavorites(favorites.filter(fav => fav.fact !== fact.fact));
    } else {
      setFavorites([...favorites, fact]);
    }
  };
  
  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    searchForFacts(query);
  };
  
  useEffect(() => {
    getRandomFact();
  }, [getRandomFact]);
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Intro Section */}
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <InfoIcon className="h-5 w-5 text-indigo-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-indigo-700 dark:text-indigo-300">
                  Welcome to Cat Facts Explorer! Discover interesting facts about cats, save your favorites, 
                  and search for specific topics using the controls below!
                </p>
              </div>
            </div>
          </div>
          
          {/* Controls */}
          <FactControls 
            onGetNewFact={getRandomFact} 
            onSearch={handleSearch}
            isLoading={isLoading}
            isSearching={isSearching}
          />
          
          {/* Error Display */}
          {error && <ErrorDisplay message={error} onRetry={getRandomFact} />}
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Search Results Column */}
            <div>
              {searchQuery && (
                <SearchResults 
                  results={searchResults} 
                  isFavorite={isFavorite} 
                  onToggleFavorite={toggleFavorite}
                  query={searchQuery}
                />
              )}
            </div>
            
            {/* Random Fact Column */}
            <div>
              {!isLoading && currentFact && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    Did You Know?
                  </h2>
                  <FactCard 
                    fact={currentFact} 
                    isFavorite={isFavorite(currentFact)} 
                    onToggleFavorite={() => toggleFavorite(currentFact)} 
                  />
                </div>
              )}
              
              {/* Loading State */}
              {isLoading && !error && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    Did You Know?
                  </h2>
                  <div className="animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Favorites List */}
          <FavoritesList favorites={favorites} onRemoveFavorite={removeFavorite} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;