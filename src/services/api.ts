import { ApiResponse } from '../types';

const API_URL = 'https://catfact.ninja';

export const fetchRandomFact = async (): Promise<ApiResponse> => {
  const response = await fetch(`${API_URL}/fact`);
  if (!response.ok) return { fact: 'Unable to fetch fact', length: 0 };
  return response.json();
};

export const searchFacts = async (query: string): Promise<ApiResponse[]> => {
  const response = await fetch(`${API_URL}/facts?limit=100`);
  if (!response.ok) return [];
  
  const data = await response.json();
  return data.data
    .filter((fact: ApiResponse) => fact.fact.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 10);
};

export const getAllFacts = async (): Promise<ApiResponse[]> => {
  const response = await fetch(`${API_URL}/facts?limit=100`);
  if (!response.ok) return [];
  
  const data = await response.json();
  return data.data;
};
