'use client';
import { ScrollView } from 'react-native';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// ------------ Import personnels -----------------
import { Box } from '@/components/ui/box';
import { FormControl } from '@/components/ui/form-control';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Input, InputField, InputSlot } from '@/components/ui/input';
import { HStack } from '@/components/ui/hstack';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { handleRegister } from '../actions';
import { useToastNotification } from '@/components/toast';

const RegisterPage = () => {
  // ------------ State -----------------
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [adress, setAdress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const { showNewToast } = useToastNotification();
  const [registerError, setRegisterError] = useState(false);
  const router = useRouter();

  // ------------ Functions ----------------
  const handleState = () => {
    setShowPassword(!showPassword);
  };

  const onRegister = async () => {
    try {
      const result = await handleRegister(
        email,
        password,
        name,
        surname,
        adress,
        Number(postalCode),
        city
      );
      if (result.success) {
        showNewToast({
          title: 'Vous êtes connecté',
          description: 'Vous poouvez maintenant accéder à votre compte',
        });
        router.push('/dashboard');
      } else {
        showNewToast({
          title: 'Erreur',
          description: "Vérifiez vos identifiants et réessayez s'il vous plaît",
        });
        setRegisterError(true);
      }
    } catch (error) {
      showNewToast({
        title: 'Erreur',
        description: 'Une erreur est survenue, veuillez réessayer',
      });
      console.error(error);
      setRegisterError(true);
    }
  };

  return (
    <ScrollView className="flex-1 min-h-screen">
      <Box className="flex-1 min-h-screen items-center justify-center  p-6">
        <FormControl
          isInvalid={registerError}
          className={`lg:w-[30%] md:w-[50%] w-[90%] bg-typography-white h-auto rounded-lg`}
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
                  {showPassword ? (
                    <EyeIcon className="text-typography-800" />
                  ) : (
                    <EyeOffIcon className="text-typography-800" />
                  )}
                </InputSlot>
              </Input>
            </VStack>
            {registerError && (
              <Text className="text-red-500 text-center">
                Veuillez remplir tous les champs
              </Text>
            )}

            <Button className="mx-auto w-full my-2" onPress={onRegister}>
              <ButtonText className="text-typography-0">Continuer</ButtonText>
            </Button>
          </VStack>
          <Box className="h-[1px] bg-typography-300 mx-auto w-[90%] my-2" />
          <VStack space="xs" className="px-4">
            <Text className="text-typography-500 text-center mb-4">
              Vous avez déjà un compte ?{' '}
              <Link href="/login" className="text-primary-500">
                Me connecter
              </Link>
            </Text>
          </VStack>
        </FormControl>
      </Box>
    </ScrollView>
  );
};

export default RegisterPage;
