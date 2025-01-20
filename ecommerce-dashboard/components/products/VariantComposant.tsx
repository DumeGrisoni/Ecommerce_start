import React, { useEffect, useState } from 'react';
import { VStack } from '../ui/vstack';
import { HStack } from '../ui/hstack';
import { Input, InputField } from '../ui/input';
import { Text } from '../ui/text';
import { Button, ButtonIcon, ButtonText } from '../ui/button';
import { AddIcon, TrashIcon } from '../ui/icon';
import { Box } from '../ui/box';
import { Color, VariantComposantProps, VariantProps } from '@/types/types';

const VariantComposant: React.FC<VariantComposantProps> = ({ onConfirm }) => {
  // ------------ Hooks ----------------
  const [colors, setColors] = useState<Color[]>([]);
  const [newColor, setNewColor] = useState<string>('');

  const addColor = () => {
    if (newColor) {
      setColors([
        ...colors,
        { name: newColor, sizes: [{ size: '', stock: 0 }] },
      ]);
      setNewColor('');
    }
  };

  const handleVariants = () => {
    const newVariant: VariantProps = {
      productId: '',
      colors: colors,
    };

    onConfirm(newVariant);
  };

  const removeColor = (colorName: string) => {
    setColors(colors.filter((c) => c.name !== colorName));
  };

  const handleSizeChange = (
    colorName: string,
    index: number,
    taille: string
  ) => {
    const newColors = colors.map((color) => {
      if (color.name === colorName) {
        const newSizes = [...color.sizes];
        newSizes[index].size = taille;
        return { ...color, sizes: newSizes };
      }
      return color;
    });
    setColors(newColors);
  };

  const handleStockChange = (
    colorName: string,
    index: number,
    stock: string
  ) => {
    const stockNumber = Number(stock);
    if (!isNaN(stockNumber)) {
      const newColors = colors.map((color) => {
        if (color.name === colorName) {
          const newSizes = [...color.sizes];
          newSizes[index].stock = stockNumber;
          return { ...color, sizes: newSizes };
        }
        return color;
      });
      setColors(newColors);
    }
  };

  const addSizeAndStock = (colorName: string) => {
    const newColors = colors.map((color) => {
      if (color.name === colorName) {
        return { ...color, sizes: [...color.sizes, { size: '', stock: 0 }] };
      }
      return color;
    });
    setColors(newColors);
  };

  const removeSizeAndStock = (colorName: string, index: number) => {
    const newColors = colors.map((color) => {
      if (color.name === colorName) {
        const newSizes = color.sizes.filter((_, i) => i !== index);
        return { ...color, sizes: newSizes };
      }
      return color;
    });
    setColors(newColors);
  };

  // ------------ Effects ----------------

  useEffect(() => {
    console.log('colors', colors);
  }, [colors]);

  // ------------ Render ----------------
  return (
    <VStack space="xs">
      <Text className="text-typography-500">Couleurs</Text>
      <HStack space="xs" className="mb-6">
        <Input className="flex-1">
          <InputField
            type="text"
            value={newColor}
            onChangeText={setNewColor}
            placeholder="Ajouter une couleur"
          />
        </Input>
        <Button onPress={addColor}>
          <ButtonIcon as={AddIcon} />
        </Button>
      </HStack>
      <Box className="w-full h-[1px] bg-typography-200 mb-3" />
      {colors.map((color, index) => (
        <VStack key={index} space="xs" className="mt-2">
          <HStack space="2xl" className="justify-between items-center">
            <Text className="text-typography-500 font-semibold">
              {color.name}
            </Text>
            <Button onPress={() => removeColor(color.name)}>
              <ButtonIcon as={TrashIcon} />
            </Button>
          </HStack>
          {color.sizes.map((size, sizeIndex) => (
            <HStack
              key={sizeIndex}
              space="xs"
              className="mt-2 items-center justify-center"
            >
              <Input className="flex-1">
                <InputField
                  type="text"
                  value={size.size}
                  onChangeText={(text: string) =>
                    handleSizeChange(color.name, sizeIndex, text)
                  }
                  placeholder="Ajouter une taille"
                />
              </Input>
              <Input className="flex-1">
                <InputField
                  value={size.stock !== undefined ? size.stock.toString() : ''}
                  onChangeText={(text: string) =>
                    handleStockChange(color.name, sizeIndex, text)
                  }
                  placeholder="Ajouter un stock"
                  keyboardType="numeric"
                />
              </Input>
              <Button onPress={() => removeSizeAndStock(color.name, sizeIndex)}>
                <ButtonIcon as={TrashIcon} />
              </Button>
            </HStack>
          ))}
          <Box className="w-full mt-2 mr-auto mb-6">
            <Button
              onPress={() => addSizeAndStock(color.name)}
              className=" mr-auto"
            >
              <ButtonIcon as={AddIcon} />
              <ButtonText>Ajouter une taille</ButtonText>
            </Button>
          </Box>
        </VStack>
      ))}
      {colors.length > 0 && (
        <>
          <Button
            className="w-[50%] mx-auto my-2"
            action="secondary"
            onPress={handleVariants}
          >
            <ButtonText>Confirmer les couleurs</ButtonText>
          </Button>
          <Box className="w-full h-[1px] bg-typography-200 mb-3" />
        </>
      )}
    </VStack>
  );
};

export default VariantComposant;
