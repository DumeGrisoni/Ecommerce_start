'use client';
import {
  deleteCategory,
  listCategories,
  updateCategory,
} from '@/api/categories';
import { useToastNotification } from '@/components/toast';
import { Box } from '@/components/ui/box';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FormControl } from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import {
  AddIcon,
  CloseCircleIcon,
  EditIcon,
  Icon,
  TrashIcon,
} from '@/components/ui/icon';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { CategoryProps } from '@/types/types';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FlatList, Modal, View } from 'react-native';

const CategoriesPage = () => {
  // ---------- State ----------
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [name, setName] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryProps>(
    {} as CategoryProps
  );
  const [modalVisible, setModalVisible] = useState(false);

  const searchParams = useSearchParams();

  const toast = useToastNotification();

  // ---------- Functions ----------
  const fetchCategories = async () => {
    const data = await listCategories();
    setCategories(data);
  };

  const handleUpdateCategory = (category: CategoryProps) => {
    setSelectedCategory(category);
    setModalVisible(!modalVisible);
  };

  const errorMessage = searchParams.get('errorMessage');
  if (errorMessage) {
    console.log(decodeURIComponent(errorMessage));
  }

  const updateCatFunc = async (id: number) => {
    if (!name) return;
    if (!createdAt) return;
    try {
      await updateCategory(id, name);
      setModalVisible(false);
      toast.showNewToast({
        title: 'Catégories',
        description: 'La catégorie a bien été modifiée',
      });
      fetchCategories();
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteCategory(id);
    toast.showNewToast({
      title: 'Catégories',
      description: 'La catégorie a bien été supprimée',
    });
    fetchCategories();
  };

  // ---------- Effects ----------
  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    if (!selectedCategory) return;
    setName(selectedCategory.name);
    setCreatedAt(selectedCategory.createdAt);
  }, [selectedCategory]);

  // ---------- Render ----------

  return (
    <View className="w-full items-center justify-center h-full min-h-screen bg-typography-50">
      <Card className="flex bg-typography-white m-0 flex-col  p-0 items-center justify-start w-[90%] lg:w-[40%] h-[80%]">
        <FlatList
          data={categories}
          ListHeaderComponent={() => (
            <>
              <HStack className="w-full justify-between bg-slate-100 py-3 rounded-t-md border-b border-typography-200">
                <Text className="ml-10 flex-1 max-w-[20%] font-bold" size="lg">
                  Supprimer
                </Text>
                <Text
                  size="lg"
                  className="text-typography-800 mr-6 text-center flex-1 font-bold"
                >
                  Nom
                </Text>

                <Text
                  size="lg"
                  className="text-typography-800 flex-1 max-w-[20%] mr-6 text-center font-bold"
                >
                  Modifier
                </Text>
              </HStack>
              <Link href="/dashboard/categories/create" className="m-2">
                <Card className="flex border-dashed hover:border-solid border-2 border-slate-400 items-center justify-center mx-auto h-full w-full min-w-[300px] lg:min-w-[345px]">
                  <Icon as={AddIcon} className="w-8 h-8 color-typography-500" />
                </Card>
              </Link>
            </>
          )}
          renderItem={({ item }) => (
            <>
              <HStack className="w-full justify-between items-center my-3">
                <View className="ml-3 flex-1 max-w-[20%] h-full items-center justify-center">
                  <Button
                    className="max-w-[50%] flex-1"
                    action="negative"
                    onPress={() => {
                      handleDelete(item.id);
                    }}
                  >
                    <ButtonIcon as={TrashIcon} />
                  </Button>
                </View>

                <Text
                  size="lg"
                  className="text-typography-800 flex-1 text-center font-semibold"
                >
                  {item.name}
                </Text>
                <View className="flex-1 max-w-[20%] mr-6 items-center justify-center">
                  <Button
                    className="w-[45%]"
                    onPress={() => {
                      handleUpdateCategory(item);
                    }}
                  >
                    <ButtonIcon as={EditIcon} />
                  </Button>
                </View>
              </HStack>
              <Box className="w-full mx-auto h-[1px] bg-slate-300 my-1" />
            </>
          )}
          className="flex-1 w-full justify-start border border-typography-200 rounded-md"
        />
      </Card>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          className="flex-1"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.8)',
          }}
        >
          <FormControl
            isInvalid={!!errorMessage}
            className="lg:w-[20%] md:w-[50%] w-[90%] items-center justify-center bg-typography-white border border-typography-100 h-auto rounded-lg"
          >
            <VStack space="xl" className="p-4 w-full">
              <Heading className="text-typography-900 text-center mt-4">
                Modifier {selectedCategory?.name}
              </Heading>
              <View className="absolute top-2 right-2 mb-6">
                <Button
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <ButtonIcon as={CloseCircleIcon} />
                </Button>
              </View>

              <VStack space="xs">
                <Text className="text-typography-500 text-center font-semibold">
                  Nom
                </Text>
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
                onPress={() => updateCatFunc(selectedCategory.id)}
              >
                <ButtonText className="text-typography-0">Confirmer</ButtonText>
              </Button>
            </VStack>
          </FormControl>
        </View>
      </Modal>
    </View>
  );
};

export default CategoriesPage;
