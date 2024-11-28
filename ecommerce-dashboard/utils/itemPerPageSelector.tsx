'use client';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { itemPerPageSelectorProps } from '@/types/types';
import React, { useState } from 'react';

const ItemPerPageSelector: React.FC<itemPerPageSelectorProps> = ({
  itemsPerPage,
  setItemsPerPage,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: number) => {
    setItemsPerPage(option);
    setIsOpen(false);
  };
  return (
    <Box className="relative inline-block text-left">
      <Button
        variant="outline"
        className="px-4 py-2 rounded bg-typography-0"
        onPress={toggleDropdown}
      >
        <ButtonText className="text-typography-800">{itemsPerPage} </ButtonText>

        <ButtonText className="ml-2 text-typography-800">&#x25BC;</ButtonText>
      </Button>
      {isOpen && (
        <Box className="absolute z-30 mt-20 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <Box className="py-1">
            {options.map((option) => (
              <Button
                key={option}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  itemsPerPage === option
                    ? 'bg-typography-400 text-white'
                    : 'bg-white text-gray-700'
                }`}
                onPress={() => handleOptionClick(option)}
              >
                <ButtonText className="text-typography-800">
                  {option}
                </ButtonText>
              </Button>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ItemPerPageSelector;
