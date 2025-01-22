'use client';
import { useEffect, useState } from 'react';
import { Box } from '@/components/ui/box';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

//--------------- Personnal imports ---------------

import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { FormControl } from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { UploadDropzone } from '@/utils/uploadthing';
import Image from 'next/image';
import { HStack } from '@/components/ui/hstack';
import { AddIcon, CheckIcon, CloseIcon, Icon } from '@/components/ui/icon';
import { ActivityIndicator, Pressable } from 'react-native';
import { removeImage } from '@/utils/removeImage';
import { listCategories } from '@/api/categories';
import { CategoryProps, ProductWithVariant, VariantProps } from '@/types/types';
import { useToastNotification } from '@/components/toast';
import { getProductById, updateProduct } from '@/api/products';
import VariantComposant from '@/components/products/VariantComposant';

const UpdateProduct = () => {
  //--------------- States ---------------
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState<string[]>([]);
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
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<ProductWithVariant | null>(null);
  const toast = useToastNotification();
  const router = useRouter();

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
    setVariant({
      ...newVariant,
      productId: product?.productId as string,
      id: variant.id,
    });
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

  const handleAddDescriptionField = () => {
    setDescription([...description, '']);
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const newDescriptions = [...description];
    newDescriptions[index] = value;
    setDescription(newDescriptions);
  };

  const handleUpdateProduct = async () => {
    if (
      !name ||
      !description ||
      !price ||
      !images ||
      !categoryIds ||
      !variant
    ) {
      return toast.showNewToast({
        title: 'Erreur',
        description: 'Veuillez remplir tous les champs',
      });
    } else {
      const updatedProduct: ProductWithVariant = {
        id: Number(id),
        productId,
        name,
        description,
        price: parseFloat(price.replace(',', '.')),
        image: images,
        categoryId: categoryIds,
        variant,
      };
      console.log('Updating product:', product);
      try {
        await updateProduct(updatedProduct);
        toast.showNewToast({
          title: 'Mise à jour',
          description: 'Le produit a été mis à jour avec succès',
        });
        router.push('/dashboard/products');
      } catch (error) {
        console.error('Erreur lors de la mise à jour du produit:', error);
      }
    }
  };

  //--------------- UseEffect ---------------
  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching product with id:', id);
        const productData = await getProductById(Number(id));
        setProduct(productData);
        console.log('iciiii');
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('Erreur lors de la récupération du produit:', error);
      }
    };

    getProduct();
  }, [id]);

  useEffect(() => {
    if (!product) return;
    const setProductData = () => {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price.toString().replace('.', ','));
      setImages(product.image);
      setCategoryIds(product.categoryId);
      setVariant(product.variant);
      setProductId(product.productId);
      const selectedCategoriesData = categories.filter((category) =>
        product.categoryId.includes(category.id.toString())
      );
      setSelectedCategory(selectedCategoriesData);

      setIsLoading(false);
    };

    setProductData();
  }, [product, categories]);

  useEffect(() => {
    console.log('varient', variant);
  }, [variant]);

  //--------------- Render ---------------

  return (
    <Box className="flex-1 w-full  min-h-screen items-center justify-center">
      {isLoading ? (
        <ActivityIndicator className="flex items-center justify-center" />
      ) : (
        <FormControl
          isInvalid={!!errorMessage}
          className="lg:w-[40%] md:w-[50%] w-[90%] bg-typography-white border border-typography-100 h-auto rounded-lg"
        >
          <VStack space="xl" className="p-4">
            <Heading className="text-typography-900">Modifier</Heading>
            <VStack space="xs">
              <Text className="text-typography-500">Nom</Text>
              <Input>
                <InputField type="text" value={name} onChangeText={setName} />
              </Input>
            </VStack>
            <VStack space="xs">
              <Text className="text-typography-500 leading-1">Description</Text>
              {description.map((description, index) => (
                <Input key={index} className="text-center mb-2">
                  <InputField
                    value={description}
                    className=" rounded"
                    onChangeText={(value: string) =>
                      handleDescriptionChange(index, value)
                    }
                    placeholder={`Description ${index + 1}`}
                  />
                </Input>
              ))}
              <Button onPress={handleAddDescriptionField}>
                <ButtonIcon as={AddIcon} />
              </Button>
              <Text className="text-typography-500 leading-1">
                Catégorie(s)
              </Text>
              <HStack className="items-center flex-wrap" space="md">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    onPress={() => handleCategoryChange(category)}
                  >
                    {selectedCategory &&
                      selectedCategory.some(
                        (cat) => cat.id === category.id
                      ) && <ButtonIcon as={CheckIcon} />}
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
              <Text className="text-typography-500 leading-1">
                Prix avec virgule et 2 décimales
              </Text>
              <Text className="text-typography-500 "></Text>
              <Input className="text-center">
                <InputField
                  type="text"
                  value={price}
                  onChangeText={setPrice}
                  keyboardType="numeric"
                />
              </Input>
            </VStack>

            <VariantComposant variant={variant} onConfirm={handleVariant} />

            {errorMessage && (
              <Text className="text-red-500 text-center">
                Vous ne remplissez pas correctement les champs
              </Text>
            )}

            <Button
              className="mx-auto w-full"
              onPress={() => {
                if (
                  !name ||
                  !description ||
                  !price ||
                  !images ||
                  !categoryIds ||
                  !variant
                ) {
                  return toast.showNewToast({
                    title: 'Erreur',
                    description: 'Veuillez remplir tous les champs',
                  });
                } else {
                  handleUpdateProduct();
                }
              }}
            >
              <ButtonText className="text-typography-0">Modifier</ButtonText>
            </Button>
          </VStack>
        </FormControl>
      )}
    </Box>
  );
};

export default UpdateProduct;
