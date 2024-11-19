import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Edit, LogOut } from 'lucide-react-native';
import { useAuth } from '@/store/authStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from 'react-native';

export default function Profil() {
  // ------------ Hooks ----------------
  const user = useAuth((state) => state.user);
  const clearUser = useAuth((state) => state.clearUser);
  const router = useRouter();
  const [isMounted, setIsMounted] = React.useState(false);
  const [isAdressModify, setIsAdressModify] = useState(false);
  const [isModifyMail, setIsModifyMail] = useState(false);
  const [isModifyName, setIsModifyName] = useState(false);
  const [newAdress, setNewAdress] = useState(user?.adress || '');
  const [newPostalCode, setNewPostalCode] = useState(user?.postalCode || '');
  const [newCity, setNewCity] = useState(user?.city || '');
  const [newMail, setNewMail] = useState(user?.email || '');
  const [newName, setNewName] = useState(user?.name || '');
  const [newSurname, setNewSurname] = useState(user?.surname || '');

  // ------------ Variables ----------------
  let userFullName = '';
  if (user) {
    userFullName = user.name + ' ' + user.surname;
  }

  // ------------ Function ----------------

  const handleLogOut = () => {
    clearUser();
    router.replace('/');
    router.dismissAll();
  };

  const handleAdressModify = () => {
    console.log('nouvelle adresse', newAdress);
    console.log('nouveau code postal', newPostalCode);
    console.log('nouvelle ville', newCity);
    setIsModifyName(false);
    setIsModifyMail(false);
    setIsAdressModify(!isAdressModify);
  };

  const handleMailModify = () => {
    console.log('nouveau mail', newMail);
    setIsModifyName(false);
    setIsAdressModify(false);
    setIsModifyMail(!isModifyMail);
  };

  const handleNameModify = () => {
    console.log('nouveau nom', newName);
    console.log('nouveau prénom', newSurname);
    setIsAdressModify(false);
    setIsModifyMail(false);
    setIsModifyName(!isModifyName);
  };

  // ------------ Effects ----------------

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!user && isMounted) {
      router.dismissAll();
      router.replace('/');
    }
  }, [user, isMounted, router]);

  // ------------ Render ----------------

  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView className="h-full" contentContainerStyle={{ flexGrow: 1 }}>
        <Box className="w-[90%] md:w-[70%] lg:w-[50%] h-[90%] items-center justify-center my-auto mx-auto  ">
          <Heading className="text-center">Informations personnelles</Heading>

          <VStack className=" gap-4 mt-6 w-full">
            <HStack className=" justify-between w-full items-center p-4 my-1 border border-typography-500 rounded">
              {isAdressModify ? (
                <HStack className="w-full justify-between items-center">
                  <VStack className=" justify-start items-start w-[70%] gap-2">
                    <Text className="text-typography-800 font-bold">
                      Adresse
                    </Text>
                    <TextInput
                      value={newAdress}
                      onChangeText={setNewAdress}
                      placeholder={user?.adress ? user.adress : 'Adresse'}
                      className="border w-full border-typography-500 p-2 rounded-md text-sm"
                    />
                    <Text className="text-typography-800 font-bold">
                      Code postal
                    </Text>
                    <TextInput
                      keyboardType="numeric"
                      value={newPostalCode}
                      onChangeText={setNewPostalCode}
                      placeholder={
                        user?.postalCode
                          ? String(user.postalCode)
                          : 'Code postal'
                      }
                      className="border w-full border-typography-500 p-2 rounded-md text-sm"
                    />
                    <Text className="text-typography-800 font-bold">Ville</Text>
                    <TextInput
                      value={newCity}
                      onChangeText={setNewCity}
                      placeholder={user?.city ? user.city : 'Ville'}
                      className="border w-full border-typography-500 p-2 rounded-md text-sm"
                    />
                  </VStack>
                  <Button size="xs" onPress={handleAdressModify}>
                    <ButtonIcon as={Edit} />
                    <ButtonText>Valider</ButtonText>
                  </Button>
                </HStack>
              ) : (
                <>
                  <VStack className=" justify-center items-start gap-2 flex-1">
                    <Text className="text-typography-800 font-bold ">
                      Adresse
                    </Text>
                    <Text size="xs">
                      {user?.adress} {user?.postalCode} {user?.city}
                    </Text>
                  </VStack>
                  <Button size="xs" onPress={handleAdressModify}>
                    <ButtonIcon as={Edit} />
                    <ButtonText>Modifier</ButtonText>
                  </Button>
                </>
              )}
            </HStack>
            <HStack className=" justify-between items-center p-4 my-1 border border-typography-500 rounded">
              {isModifyMail ? (
                <HStack className="w-full justify-between items-center">
                  <VStack className=" justify-start items-start w-[70%] gap-2">
                    <Text className="text-typography-800 font-bold">Email</Text>
                    <TextInput
                      value={newMail}
                      onChangeText={setNewMail}
                      placeholder="Email"
                      className="border w-full border-typography-500 p-2 rounded-md text-sm"
                    />
                  </VStack>
                  <Button size="xs" onPress={handleMailModify}>
                    <ButtonIcon as={Edit} />
                    <ButtonText>Valider</ButtonText>
                  </Button>
                </HStack>
              ) : (
                <>
                  <VStack className=" justify-center items-start gap-2 ">
                    <Text className="text-typography-800 font-bold">Email</Text>
                    <Text size="sm">{user?.email}</Text>
                  </VStack>
                  <Button size="xs" onPress={handleMailModify}>
                    <ButtonIcon as={Edit} />
                    <ButtonText>Modifier</ButtonText>
                  </Button>
                </>
              )}
            </HStack>
            <HStack className=" justify-between items-center p-6 my-1 border border-typography-500 rounded">
              {isModifyName ? (
                <HStack className="w-full justify-between items-center">
                  <VStack className=" justify-start items-start w-[70%] gap-2">
                    <Text className="text-typography-800 font-bold">Nom</Text>
                    <TextInput
                      value={newSurname}
                      onChangeText={setNewSurname}
                      placeholder="Nom"
                      className="border w-full border-typography-500 p-2 rounded-md text-sm"
                    />
                    <Text className="text-typography-800 font-bold">
                      Prénom
                    </Text>
                    <TextInput
                      value={newName}
                      onChangeText={setNewName}
                      placeholder="Prénom"
                      className="border w-full border-typography-500 p-2 rounded-md text-sm"
                    />
                  </VStack>
                  <Button size="xs" onPress={handleNameModify}>
                    <ButtonIcon as={Edit} />
                    <ButtonText>Valider</ButtonText>
                  </Button>
                </HStack>
              ) : (
                <>
                  <VStack className=" justify-center items-start gap-2">
                    <Text className="text-typography-800 font-bold">
                      Nom et prénom
                    </Text>
                    <Text size="sm">{userFullName}</Text>
                  </VStack>
                  <Button size="xs" onPress={handleNameModify}>
                    <ButtonIcon as={Edit} />
                    <ButtonText>Modifier</ButtonText>
                  </Button>
                </>
              )}
            </HStack>
          </VStack>
          <Button
            size="lg"
            className="rounded-lg w-[70%] mx-auto my-4"
            onPress={handleLogOut}
          >
            <ButtonIcon as={LogOut} />
            <ButtonText className="text-center ml-2">Déconnexion</ButtonText>
          </Button>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
