import React, { useEffect } from 'react';
import { Redirect, Stack, useRouter } from 'expo-router';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { LogOut } from 'lucide-react-native';
import { useAuth } from '@/store/authStore';

export default function profil() {
  // ------------ Hooks ----------------
  const user = useAuth((state) => state.user);
  const clearUser = useAuth((state) => state.clearUser);
  const router = useRouter();
  const [isMounted, setIsMounted] = React.useState(false);

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

  // ------------ Effects ----------------

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!user && isMounted) {
      router.replace('/');
      router.dismissAll();
    }
  }, [user, isMounted, router]);

  // ------------ Render ----------------

  return (
    <Box className="w-[90%] h-[90%] md:w-[70%] lg:w-[50%] mx-auto my-auto">
      <Card className="h-full">
        <Stack.Screen
          options={{
            title: userFullName,
            headerTitleAlign: 'center',
          }}
        />
        <VStack className="flex-1 gap-4">
          <Heading>Informations personnelles</Heading>
          <HStack className=" justify-start items-center my-2">
            <Text className="text-typography-800 font-bold mr-2">
              Adresse :
            </Text>
            <Text>{user?.adress}</Text>
            <Text> {user?.postalCode}</Text>
            <Text> {user?.city}</Text>
          </HStack>
        </VStack>
        <Button
          size="lg"
          className="rounded-lg w-[70%] mt-auto mx-auto my-4"
          onPress={handleLogOut}
        >
          <ButtonIcon as={LogOut} />
          <ButtonText className="text-center ml-2">Déconnexion</ButtonText>
        </Button>
      </Card>
    </Box>
  );
}
