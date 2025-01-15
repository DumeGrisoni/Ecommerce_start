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
import { createCategory } from './actions';
import { useToastNotification } from '@/components/toast';

const CreateCategory = () => {
  //--------------- States ---------------
  const [name, setName] = useState('');
  const searchParams = useSearchParams();
  const toast = useToastNotification();

  //--------------- Variables ---------------

  const productIds = [] as number[];
  const createdAt = new Date().toISOString();

  const errorMessage = searchParams.get('errorMessage');
  if (errorMessage) {
    console.log(decodeURIComponent(errorMessage));
  }

  //--------------- Functions ---------------

  const showToast = () => {
    toast.showNewToast({
      title: 'Catégorie',
      description: 'La catégorie a bien été créée',
    });
  };
  return (
    <Box className="flex-1 w-full  min-h-screen items-center justify-center">
      <FormControl
        isInvalid={!!errorMessage}
        className="lg:w-[40%] md:w-[50%] w-[90%] bg-typography-white border border-typography-100 h-auto rounded-lg"
      >
        <VStack space="xl" className="p-4">
          <Heading className="text-typography-900">Créer une catégorie</Heading>

          <VStack space="xs">
            <Text className="text-typography-500">Nom</Text>
            <Input>
              <InputField type="text" value={name} onChangeText={setName} />
            </Input>
          </VStack>

          {errorMessage && (
            <Text className="text-red-500 text-center">
              Vous ne remplissez pas correctement les champs
            </Text>
          )}

          <Button
            className="mx-auto w-full"
            onPress={() =>
              createCategory(name, productIds, createdAt).then(() => {
                showToast();
              })
            }
          >
            <ButtonText className="text-typography-0">Créer</ButtonText>
          </Button>
        </VStack>
      </FormControl>
    </Box>
  );
};

export default CreateCategory;
