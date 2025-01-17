'use client';
import { useEffect, useState } from 'react';
import { Box } from '@/components/ui/box';
import { useSearchParams } from 'next/navigation';

//--------------- Personnal imports ---------------

import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { FormControl } from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { createProduct } from './actions';
import { UploadDropzone } from '@/utils/uploadthing';
import Image from 'next/image';
import { HStack } from '@/components/ui/hstack';
import { CheckIcon, CloseIcon, Icon } from '@/components/ui/icon';
import { Pressable } from 'react-native';
import { removeImage } from '@/utils/removeImage';
import { listCategories } from '@/api/categories';
import { CategoryProps, VariantProps } from '@/types/types';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import VariantComposant from '@/components/products/VariantComposant';
import { v4 as uuidv4 } from 'uuid';

const CreateProduct = () => {
  //--------------- States ---------------
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [imgKey, setImgKey] = useState<string[]>([]);
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryProps[]>([]);
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [variant, setVariant] = useState<VariantProps>({} as VariantProps);
  const searchParams = useSearchParams();
  const [buttonText, setButtonText] = useState('Choisir un fichier');
  const [productId, setProductId] = useState('');

  //--------------- Variables ---------------

  const errorMessage = searchParams.get('errorMessage');
  if (errorMessage) {
    console.log(decodeURIComponent(errorMessage));
  }

  //--------------- Functions ---------------

  const getCategories = async () => {
    const res = await listCategories();
    setCategories(res);
  };

  const handleUploadComplete = (res: { url: string; key: string }[]) => {
    setButtonText('Choisir un fichier');
    const newImages = res.map((file) => file.url);
    const newImgKeys = res.map((file) => file.key);
    setImages((prevImages) => [...prevImages, ...newImages]);
    setImgKey((prevKey) => [...prevKey, ...newImgKeys]);
  };

  const handleRemoveImage = (imgKey: string) => async () => {
    const res = await removeImage(imgKey);
    if (res.succes === true) {
      const index = imgKey.indexOf(imgKey);
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
      setImgKey((prevKeys) => prevKeys.filter((key) => key !== imgKey));
    }
  };

  const handleVariant = (newVariant: VariantProps) => {
    setVariant(newVariant);
  };

  const handleCategoryChange = (category: CategoryProps) => {
    setSelectedCategory((prevSelected) => {
      if (prevSelected.some((cat) => cat.id === category.id)) {
        return prevSelected.filter((cat) => cat.id !== category.id);
      } else {
        return [...prevSelected, category];
      }
    });

    setCategoryIds((prevIds) => {
      if (prevIds.includes(category.id.toString())) {
        return prevIds.filter((id) => id !== category.id.toString());
      } else {
        return [...prevIds, category.id.toString()];
      }
    });
  };

  //--------------- UseEffect ---------------

  useEffect(() => {
    getCategories();
    setProductId(uuidv4() as string);
  }, []);

  useEffect(() => {
    console.log(
      'categories',
      selectedCategory.map((cat) => cat.name + cat.id)
    );
  }, [selectedCategory, images]);

  //--------------- Render ---------------

  return (
    <Box className="flex-1 w-full  min-h-screen items-center justify-center">
      <FormControl
        isInvalid={!!errorMessage}
        className="lg:w-[40%] md:w-[50%] w-[90%] bg-typography-white border border-typography-100 h-auto rounded-lg"
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
            <Textarea className="text-center">
              <TextareaInput
                value={description}
                className="border border-typography-100 rounded"
                onChangeText={setDescription}
              />
            </Textarea>
            <Text className="text-typography-500 leading-1">Catégorie(s)</Text>
            <HStack className="items-center flex-wrap" space="md">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onPress={() => handleCategoryChange(category)}
                >
                  {selectedCategory.some((cat) => cat.id === category.id) && (
                    <ButtonIcon as={CheckIcon} />
                  )}
                  <ButtonText>{category.name}</ButtonText>
                </Button>
              ))}
            </HStack>
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-500 leading-1">Image(s)</Text>
            {images.length < 4 ? (
              <UploadDropzone
                content={{
                  label: 'Ajouter une ou plusieurs image',
                  button: buttonText,
                  allowedContent: "jusqu'à 4 Mo par images, jusqu'à 4 images",
                }}
                endpoint={'imageUploader'}
                onChange={() => {
                  setButtonText('Charger');
                }}
                onUploadBegin={() => {
                  setButtonText('Téléchargement');
                }}
                onUploadProgress={() => {
                  setButtonText('Téléchargement');
                }}
                onClientUploadComplete={(res) => {
                  setButtonText('Choisir un fichier');
                  handleUploadComplete(res);
                }}
                onUploadError={() => {
                  alert('Erreur lors du téléchargement');
                }}
              />
            ) : (
              <Text className="text-red-500">
                Vous ne pouvez pas ajouter plus de 4 images
              </Text>
            )}
            {images.length > 0 && (
              <HStack space="md" className="justify-center my-2 ">
                {images.map((img, index) => (
                  <Box
                    key={index}
                    className="relative border hover:border-slate-800 rounded border-typography-400 group"
                  >
                    <Pressable
                      onPress={handleRemoveImage(imgKey[index])}
                      className="hover:cursor-pointer hover:scale-125  absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Icon as={CloseIcon} size="lg" />
                    </Pressable>
                    <Image
                      src={img}
                      alt="image"
                      width={150}
                      height={150}
                      className="rounded"
                    />
                  </Box>
                ))}
              </HStack>
            )}
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

          <VariantComposant onConfirm={handleVariant} />

          {errorMessage && (
            <Text className="text-red-500 text-center">
              Vous ne remplissez pas correctement les champs
            </Text>
          )}

          <Button
            className="mx-auto w-full"
            onPress={() =>
              createProduct(
                name,
                description,
                Number(price),
                images,
                productId,
                categoryIds,
                variant
              )
            }
          >
            <ButtonText className="text-typography-0">Créer</ButtonText>
          </Button>
        </VStack>
      </FormControl>
    </Box>
  );
};

export default CreateProduct;
