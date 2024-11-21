import '../node_modules/.cache/nativewind/global.css';
import React, { useEffect } from 'react';
import { Link, Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Pressable } from 'react-native';

// ------------ Imports Personnelles -----------------
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Icon } from '@/components/ui/icon';
import { House, ShoppingCart, User } from 'lucide-react-native';
import { useCart } from '@/store/cartStore';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { useAuth } from '@/store/authStore';
import { Box } from '@/components/ui/box';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const queryClient = new QueryClient();

export default function RootLayout() {
  const [selectedTab, setSelectedTab] = React.useState('index');
  const cartItemProducts = useCart((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );
  const isLoggedIn = useAuth((state) => !!state.token);
  const user = useAuth((state) => state.user);

  let userFullName = '';
  if (user) {
    userFullName = user.name + ' ' + user.surname;
  }

  useEffect(() => {
    console.log('selectedTab', selectedTab);
  }, [selectedTab]);

  return (
    <SafeAreaProvider className="flex-1">
      <QueryClientProvider client={queryClient}>
        <GluestackUIProvider mode="system">
          <Stack
            initialRouteName="index"
            screenOptions={{
              headerBackVisible: true,
              headerShown: false,
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="cart" />
          </Stack>
          <Box className=" border-typography-100 border-y h-[50px] md:h-[60px] absolute bottom-0 w-full bg-typography-50 px-2">
            <HStack className="justify-around items-center h-full ">
              <Link href="/" asChild className="flex-col ">
                <Pressable onPress={() => setSelectedTab('index')}>
                  <Icon
                    as={House}
                    size="xl"
                    color={selectedTab === 'index' ? 'black' : 'gray'}
                  />
                </Pressable>
              </Link>
              <Link href="/cart" asChild className="flex-row">
                <Pressable
                  className=" justify-center items-center"
                  onPress={() => setSelectedTab('cart')}
                >
                  <HStack className="flex-row items-center justify-center">
                    <Icon
                      as={ShoppingCart}
                      size="xl"
                      color={selectedTab === 'cart' ? 'black' : 'gray'}
                    />
                    {cartItemProducts > 0 && (
                      <Text className={`font-bold mx-1`}>
                        {cartItemProducts}
                      </Text>
                    )}
                  </HStack>
                </Pressable>
              </Link>
              <Link href={isLoggedIn ? '/profil' : '/login'} asChild>
                <Pressable
                  className="justify-center items-center"
                  onPress={() => setSelectedTab('profil')}
                >
                  <Icon
                    as={User}
                    size="xl"
                    color={selectedTab === 'profil' ? 'black' : 'gray'}
                  />
                </Pressable>
              </Link>
            </HStack>
          </Box>
        </GluestackUIProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
