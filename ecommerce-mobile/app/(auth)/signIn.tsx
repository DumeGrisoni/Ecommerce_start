import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { FormControl } from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Link, Stack } from 'expo-router';
import { EyeIcon, EyeOffIcon } from 'lucide-react-native';
import React from 'react';
import { Platform, ScrollView } from 'react-native';

export default function SignIn() {
  // ------------ State -----------------
  const [showPassword, setShowPassword] = React.useState(false);

  // ------------ Constants -----------------

  const isWeb = Platform.OS === 'web' ? true : false;

  // ------------ Functions ----------------
  const handleState = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ScrollView>
      <Box className="flex-1 items-center justify-center w-full h-full p-6">
        <Stack.Screen
          options={{ title: 'Inscription', headerTitleAlign: 'center' }}
        />
        <FormControl
          className={`border ${isWeb ? 'lg:w-[30%] md:w-[50%] w-[90%]' : 'w-full'} bg-typography-white h-auto rounded-lg border-outline-300`}
        >
          <VStack space="xl" className="p-4">
            <Heading className="text-typography-900">Créer un compte</Heading>
            <VStack space="xs">
              <Text className="text-typography-500">Votre adresse e-mail</Text>
              <Input>
                <InputField type="text" />
              </Input>
              <Text className="text-typography-500">Votre nom</Text>
              <Input>
                <InputField type="text" />
              </Input>
              <Text className="text-typography-500">Votre prenom</Text>
              <Input>
                <InputField type="text" />
              </Input>
              <Text className="text-typography-500">Votre adresse</Text>
              <Input>
                <InputField type="text" />
              </Input>
              {isWeb ? (
                <HStack
                  space="xs"
                  className="flex-1 justify-between items-center"
                >
                  <VStack space="xs" className="flex-1 ">
                    <Text className="text-typography-500">Code postal</Text>
                    <Input>
                      <InputField type="text" />
                    </Input>
                  </VStack>
                  <VStack space="xs" className="flex-1 md:flex-auto">
                    <Text className="text-typography-500">Ville</Text>
                    <Input>
                      <InputField type="text" />
                    </Input>
                  </VStack>
                </HStack>
              ) : (
                <VStack space="xs">
                  <Text className="text-typography-500">Code postal</Text>
                  <Input>
                    <InputField type="text" />
                  </Input>

                  <Text className="text-typography-500">Ville</Text>
                  <Input>
                    <InputField type="text" />
                  </Input>
                </VStack>
              )}
            </VStack>
            <VStack space="xs">
              <Text className="text-typography-500 leading-1">
                Mot de passe
              </Text>
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
              className="mx-auto w-full my-2"
              onPress={() => {
                console.log('Login');
              }}
            >
              <ButtonText className="text-typography-0">Continuer</ButtonText>
            </Button>
          </VStack>
          <Box className="h-[1px] bg-typography-300 mx-auto w-[90%] my-2" />
          <VStack space="xs" className="px-4">
            <Text className="text-typography-500 text-center my-4">
              En créant un compte, vous acceptez nos{' '}
              <Link href="/terms" className="text-primary-500">
                Conditions d'utilisation
              </Link>{' '}
              et notre{' '}
              <Link href="/privacy" className="text-primary-500">
                Politique de confidentialité
              </Link>
            </Text>
            <Box className="h-[1px] bg-typography-300 mx-auto w-full my-2" />
            <Text className="text-typography-500 text-center mb-4">
              Vous avez déjà un compte ?{' '}
              <Link href="/login" className="text-primary-500">
                Connectez-vous
              </Link>
            </Text>
          </VStack>
        </FormControl>
      </Box>
    </ScrollView>
  );
}
