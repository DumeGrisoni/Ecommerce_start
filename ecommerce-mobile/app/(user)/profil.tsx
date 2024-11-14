import React from 'react';
import { Stack } from 'expo-router';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { LogOut } from 'lucide-react-native';

export default function profil() {
  return (
    <Box className="max-w-[90%] h-full max-h-[90%] w-full mx-auto my-auto">
      <Card className="h-full">
        <Stack.Screen options={{ title: 'User', headerTitleAlign: 'center' }} />
        <VStack className="flex-1">
          <Heading>Name Surname</Heading>
          <HStack>
            <Text>Name</Text>
            <Text>Surname</Text>
          </HStack>
        </VStack>
        <Button size="lg" className="rounded-lg w-[70%] mt-auto mx-auto my-4">
          <ButtonIcon as={LogOut} />
          <ButtonText className="text-center ml-2">Déconnexion</ButtonText>
        </Button>
      </Card>
    </Box>
  );
}
