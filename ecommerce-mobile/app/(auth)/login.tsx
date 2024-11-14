import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { FormControl } from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Link, Stack } from 'expo-router';
import { EyeIcon, EyeOffIcon } from 'lucide-react-native';
import React from 'react';
import { Platform } from 'react-native';

export default function Login() {
  // ------------ State -----------------
  const [showPassword, setShowPassword] = React.useState(false);

  // ------------ Constants -----------------

  const isWeb = Platform.OS === 'web' ? true : false;

  // ------------ Functions ----------------
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  return (
    <Box className="flex-1 items-center justify-center w-full h-full p-6">
      <Stack.Screen
        options={{ title: 'Connexion', headerTitleAlign: 'center' }}
      />
      <FormControl
        className={`border ${isWeb ? 'lg:w-[20%] md:w-[50%] w-[90%]' : 'w-full'} bg-typography-white h-auto rounded-lg border-outline-300`}
      >
        <VStack space="xl" className="p-4">
          <Heading className="text-typography-900">S'identifier</Heading>
          <VStack space="xs">
            <Text className="text-typography-500">Votre e-mail</Text>
            <Input>
              <InputField type="text" />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-500 leading-1">Mot de passe</Text>
            <Input className="text-center">
              <InputField type={showPassword ? 'text' : 'password'} />
              <InputSlot className="pr-3" onPress={handleState}>
                {/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
                <InputIcon
                  as={showPassword ? EyeIcon : EyeOffIcon}
                  className="text-primary-500"
                />
              </InputSlot>
            </Input>
          </VStack>
          <Button
            className="mx-auto w-full"
            onPress={() => {
              console.log('Login');
            }}
          >
            <ButtonText className="text-typography-0">Connexion</ButtonText>
          </Button>
        </VStack>
        <Text className="text-typography-500 text-center my-4">
          Vous n'avez pas de compte ?{' '}
          <Link href="/signIn" className="text-primary-500">
            Inscrivez-vous
          </Link>
        </Text>
      </FormControl>
    </Box>
  );
}
