import { ApiResponse } from '../types';

const API_URL = 'https://catfact.ninja';

export const fetchRandomFact = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_URL}/fact`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch cat fact: ${error.message}`);
    }
    throw new Error('Failed to fetch cat fact');
  }
};

export const searchFacts = async (query: string): Promise<ApiResponse[]> => {
  try {
    // Increased limit to 100 facts for more comprehensive search results
    const response = await fetch(`${API_URL}/facts?limit=100`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Filter facts that contain the query (case insensitive)
    return data.data.filter((fact: ApiResponse) => 
      fact.fact.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to search facts: ${error.message}`);
    }
    throw new Error('Failed to search facts');
  }
};