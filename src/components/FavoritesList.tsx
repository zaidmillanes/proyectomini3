import React from 'react';
import { CatFact } from '../types';
import FactCard from './FactCard';
import { Heart } from 'lucide-react';

interface FavoritesListProps {
  favorites: CatFact[];
  onRemoveFavorite: (id: string) => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ favorites, onRemoveFavorite }) => {
  if (favorites.length === 0) {
    return (
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-500" /> Favorite Facts
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            You haven't saved any favorites yet. Click the heart icon on a fact to save it here!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
        <Heart className="h-5 w-5 text-red-500 fill-current" /> Favorite Facts ({favorites.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {favorites.map((fact) => (
          <FactCard
            key={fact.id}
            fact={fact}
            isFavorite={true}
            onToggleFavorite={() => onRemoveFavorite(fact.id!)}
            onRemove={() => onRemoveFavorite(fact.id!)}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;