import { useState } from 'react';
import { Card } from './ui/card';
import { Input, InputField } from './ui/input';
import { DataType } from '@/types/types';

const SearchBar = ({
  data,
  onSearch,
}: {
  data: DataType[];
  onSearch: (results: DataType[]) => void;
}) => {
  //----------- State -----------
  const [searchTerm, setSearchTerm] = useState('');

  //----------- Functions -----------
  const handleSearch = (search: string) => {
    // const value = event.target.value;
    setSearchTerm(search);
    const filtered = data.filter((item) => {
      switch (item.type) {
        case 'category':
          return item.name.toLowerCase().includes(search.toLowerCase());
        case 'product':
          return item.name.toLowerCase().includes(search.toLowerCase());
        default:
          return false;
      }
    });
    onSearch(filtered); // Appeler la fonction de rappel avec les résultats filtrés
  };

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
