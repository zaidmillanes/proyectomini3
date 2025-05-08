export interface CatFact {
  fact: string;
  length: number;
  id?: string; // Used for favorites
}

export interface ApiResponse {
  fact: string;
  length: number;
}