import { useState } from 'react';
import { Card } from './ui/card';
import { Input, InputField } from './ui/input';
import { SearchBarProps } from '@/types/types';

const SearchBar = <T extends { name: string }>({
  data,
  onSearch,
}: SearchBarProps<T>) => {
  //----------- State -----------
  const [searchTerm, setSearchTerm] = useState('');

  //----------- Functions -----------
  const handleSearch = (search: string) => {
    // const value = event.target.value;
    setSearchTerm(search);
    const filtered = data.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
    onSearch(filtered); // Appeler la fonction de rappel avec les résultats filtrés
  };

  //----------- Render -----------

  return (
    <Card className="flex items-center justify-between w-full p-3 border border-slate-200 rounded-md">
      <Input className="w-full">
        <InputField
          value={searchTerm}
          onChangeText={handleSearch}
          placeholder="Rechercher"
        />
      </Input>
    </Card>
  );
};

export default SearchBar;
