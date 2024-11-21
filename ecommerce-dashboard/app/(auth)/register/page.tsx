import { ScrollView } from 'react-native';
import React, { useState } from 'react';
import Link from 'next/link';

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
import { register } from '@/api/auth';

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

  // ------------ Functions ----------------
  const handleState = () => {
    setShowPassword(!showPassword);
  };

  const onRegister = async () => {
    try {
      await register(
        email,
        password,
        name,
        surname,
        adress,
        Number(postalCode),
        city
      );
      alert('Vous êtes enregistré');
    } catch (error) {
      alert("Une erreur est survenue lors de l'enregistrement");
      console.error(error);
    }
  };

  return (
    <ScrollView>
      <Box className="flex-1 items-center justify-center w-full h-full p-6">
        <FormControl
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
                  alert('Veuillez renseigner tous les champs');
                } else {
                  onRegister();
                }
              }}
            >
              <ButtonText className="text-typography-0">Continuer</ButtonText>
            </Button>
          </VStack>
          <Box className="h-[1px] bg-typography-300 mx-auto w-[90%] my-2" />
          <VStack space="xs" className="px-4">
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
};

export default RegisterPage;
