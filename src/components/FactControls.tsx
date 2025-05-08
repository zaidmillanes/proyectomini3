import React from 'react';
import SearchBox from '../components/SearchBox';
import GenerateFactButton from '../components/GenerateFactButton';

interface FactControlsProps {
  onGetNewFact: () => void;
  onSearch: (query: string) => void;
  isLoading: boolean;
  isSearching: boolean;
}

const FactControls: React.FC<FactControlsProps> = ({ 
  onGetNewFact, 
  onSearch,
  isLoading,
  isSearching
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <SearchBox onSearch={onSearch} isSearching={isSearching} />
      <GenerateFactButton onGetNewFact={onGetNewFact} isLoading={isLoading} />
    </div>
  );
};

export default FactControls;