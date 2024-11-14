import { register } from '@/api/auth';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { FormControl } from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useAuth } from '@/store/authStore';
import { useMutation } from '@tanstack/react-query';
import { Link, Stack } from 'expo-router';
import { EyeIcon, EyeOffIcon } from 'lucide-react-native';
import React from 'react';
import { Alert, Platform, ScrollView } from 'react-native';

export default function Register() {
  // ------------ State -----------------
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [adress, setAdress] = React.useState('');
  const [postalCode, setPostalCode] = React.useState('');
  const [city, setCity] = React.useState('');

  const setUser = useAuth((state) => state.setUser);
  const setToken = useAuth((state) => state.setToken);

  // ------------ Constants -----------------

  const isWeb = Platform.OS === 'web' ? true : false;

  // ------------ Functions ----------------
  const handleState = () => {
    setShowPassword(!showPassword);
  };

  // ------------ Mutations -----------------

  const registerMutation = useMutation({
    mutationFn: () =>
      register(
        email,
        password,
        name,
        surname,
        adress,
        Number(postalCode),
        city
      ),
    onSuccess: (data) => {
      console.log('Success register');
      if (data.user && data.token) {
        setUser(data.user);
        setToken(data.token);
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <ScrollView>
      <Box className="flex-1 items-center justify-center w-full h-full p-6">
        <Stack.Screen
          options={{ title: 'Inscription', headerTitleAlign: 'center' }}
        />
        <FormControl
          isInvalid={registerMutation.isError}
          className={`border ${isWeb ? 'lg:w-[30%] md:w-[50%] w-[90%]' : 'w-full'} bg-typography-white h-auto rounded-lg border-outline-300`}
        >
          <VStack space="xl" className="p-4">
            <Heading className="text-typography-900">Créer un compte</Heading>
            <VStack space="xs">
              <Text className="text-typography-500">Votre adresse e-mail</Text>
              <Input>
                <InputField type="text" value={email} onChangeText={setEmail} />
              </Input>
              <Text className="text-typography-500">Votre nom</Text>
              <Input>
                <InputField
                  type="text"
                  value={surname}
                  onChangeText={setSurname}
                />
              </Input>
              <Text className="text-typography-500">Votre prenom</Text>
              <Input>
                <InputField type="text" value={name} onChangeText={setName} />
              </Input>
              <Text className="text-typography-500">Votre adresse</Text>
              <Input>
                <InputField
                  type="text"
                  value={adress}
                  onChangeText={setAdress}
                />
              </Input>
              {isWeb ? (
                <HStack
                  space="xs"
                  className="flex-1 justify-between items-center"
                >
                  <VStack space="xs" className="flex-1 ">
                    <Text className="text-typography-500">Code postal</Text>
                    <Input>
                      <InputField
                        keyboardType="numeric"
                        type="text"
                        value={postalCode}
                        onChangeText={setPostalCode}
                      />
                    </Input>
                  </VStack>
                  <VStack space="xs" className="flex-1 md:flex-auto">
                    <Text className="text-typography-500">Ville</Text>
                    <Input>
                      <InputField
                        type="text"
                        value={city}
                        onChangeText={setCity}
                      />
                    </Input>
                  </VStack>
                </HStack>
              ) : (
                <VStack space="xs">
                  <Text className="text-typography-500">Code postal</Text>
                  <Input>
                    <InputField
                      keyboardType="numeric"
                      type="text"
                      value={postalCode}
                      onChangeText={setPostalCode}
                    />
                  </Input>

                  <Text className="text-typography-500">Ville</Text>
                  <Input>
                    <InputField
                      type="text"
                      value={city}
                      onChangeText={setCity}
                    />
                  </Input>
                </VStack>
              )}
            </VStack>
            <VStack space="xs">
              <Text className="text-typography-500 leading-1">
                Mot de passe
              </Text>
              <Input className="text-center">
                <InputField
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChangeText={setPassword}
                />
                <InputSlot className="pr-3" onPress={handleState}>
                  {/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
                  <InputIcon
                    as={showPassword ? EyeIcon : EyeOffIcon}
                    className="text-primary-500"
                  />
                </InputSlot>
              </Input>
            </VStack>
            {registerMutation.isError && (
              <Text className="text-error-500 text-center">
                Veuillez vérifier vos identifiants
              </Text>
            )}
            <Button
              className="mx-auto w-full my-2"
              onPress={() => {
                if (
                  email === '' ||
                  password === '' ||
                  name === '' ||
                  surname === '' ||
                  adress === '' ||
                  postalCode === '' ||
                  city === ''
                ) {
                  Alert.alert('Erreur', 'Veuillez renseigner tous les champs');
                } else {
                  registerMutation.mutate();
                }
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
