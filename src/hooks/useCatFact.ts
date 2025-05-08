import { useState, useCallback } from 'react';
import { CatFact } from '../types';
import { fetchRandomFact, searchFacts } from '../services/api';

export const useCatFact = () => {
  const [currentFact, setCurrentFact] = useState<CatFact | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<CatFact[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  
  const getRandomFact = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchRandomFact();
      setCurrentFact({
        fact: data.fact,
        length: data.length,
        id: Date.now().toString() // Generate a unique ID for this fact
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const searchForFacts = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    setError(null);
    
    try {
      const results = await searchFacts(query);
      setSearchResults(results.map(fact => ({
        ...fact,
        id: `search-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      })));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);
  
  return {
    currentFact,
    isLoading,
    error,
    searchResults,
    isSearching,
    getRandomFact,
    searchForFacts
  };
};