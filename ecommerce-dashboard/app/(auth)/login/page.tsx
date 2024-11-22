'use client';
import Link from 'next/link';
import { useState } from 'react';

// ------------ Import personnels -----------------
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { FormControl } from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { Input, InputField, InputSlot } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useToastNotification } from '@/components/toast';
import { handleLogin } from '../actions';
import { redirect } from 'next/navigation';

const LoginPage = () => {
  // ------------ State -----------------
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { showNewToast } = useToastNotification();
  const [loginError, setLoginError] = useState(false);

  // ------------ Functions ----------------
  const onLogin = async () => {
    try {
      const result = await handleLogin(email, password);
      if (result && result.success === true) {
        if (result.role === true) {
          showNewToast({
            title: 'Vous êtes connecté',
            description: 'Vous poouvez maintenant accéder à votre compte',
          });
          redirect('/dashboard');
        }
      } else {
        showNewToast({
          title: 'Erreur',
          description: "Vous n'êtes pas autorisé à accéder à cette page",
        });
        setLoginError(true);
      }
    } catch (error) {
      console.error(error);
      setLoginError(true);
    }
  };

  // ------------ Rendu -----------------

  return (
    <Box className="flex-1 min-h-screen items-center justify-center">
      <FormControl
        isInvalid={loginError}
        className="lg:w-[20%] md:w-[50%] w-[90%] bg-typography-white h-auto rounded-lg"
      >
        <VStack space="xl" className="p-4">
          <Heading className="text-typography-900">S&apos;identifier</Heading>

          <VStack space="xs">
            <Text className="text-typography-500">Votre e-mail</Text>
            <Input>
              <InputField
                type="text"
                value={email}
                onChangeText={setEmail}
                showSoftInputOnFocus={false}
              />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-500 leading-1">Mot de passe</Text>
            <Input className="text-center">
              <InputField
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChangeText={setPassword}
              />
              <InputSlot
                className="pr-3"
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeIcon className="text-typography-800" />
                ) : (
                  <EyeOffIcon className="text-typography-800" />
                )}
              </InputSlot>
            </Input>
          </VStack>

          {loginError && (
            <Text className="text-red-500 text-center">
              Identifiants erronés
            </Text>
          )}

          <Button className="mx-auto w-full" onPress={onLogin}>
            <ButtonText className="text-typography-0">Connexion</ButtonText>
          </Button>
        </VStack>
        <Text className="text-typography-500 text-center my-4">
          Vous n&apos;avez pas de compte ?{' '}
          <Link href="/register" className="text-primary-500">
            Créer un compte
          </Link>
        </Text>
      </FormControl>
    </Box>
  );
};

export default LoginPage;
