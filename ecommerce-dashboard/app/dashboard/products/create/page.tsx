'use client';
import { useState } from 'react';
import { Box } from '@/components/ui/box';
import { useSearchParams } from 'next/navigation';

//--------------- Personnal imports ---------------

import { Button, ButtonText } from '@/components/ui/button';
import { FormControl } from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { createProduct } from './actions';

const CreateProduct = () => {
  //--------------- States ---------------
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const searchParams = useSearchParams();

  //--------------- Variables ---------------

  const errorMessage = searchParams.get('errorMessage');

  //--------------- Functions ---------------

  return (
    <Box className="flex-1 min-h-screen items-center justify-center">
      <FormControl
        isInvalid={!!errorMessage}
        className="lg:w-[20%] md:w-[50%] w-[90%] bg-typography-white border border-typography-100 h-auto rounded-lg"
      >
        <VStack space="xl" className="p-4">
          <Heading className="text-typography-900">Créer un article</Heading>

          <VStack space="xs">
            <Text className="text-typography-500">Nom</Text>
            <Input>
              <InputField type="text" value={name} onChangeText={setName} />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-500 leading-1">Description</Text>
            <Input className="text-center">
              <InputField
                type="text"
                value={description}
                onChangeText={setDescription}
              />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-500 leading-1">Image</Text>
            <Input className="text-center">
              <InputField type="text" value={image} onChangeText={setImage} />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-500 leading-1">Prix</Text>
            <Input className="text-center">
              <InputField
                type="text"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
              />
            </Input>
          </VStack>

          {errorMessage && (
            <Text className="text-red-500 text-center">
              Vous ne remplissez pas correctement les champs
            </Text>
          )}

          <Button
            className="mx-auto w-full"
            onPress={() => createProduct(name, description, Number(price))}
          >
            <ButtonText className="text-typography-0">Créer</ButtonText>
          </Button>
        </VStack>
      </FormControl>
    </Box>
  );
};

export default CreateProduct;
