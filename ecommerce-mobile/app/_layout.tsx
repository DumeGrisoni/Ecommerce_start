import '../node_modules/.cache/nativewind/global.css';
import React from 'react';
import { Link, Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// ------------ Imports Personnelles -----------------
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Icon } from '@/components/ui/icon';
import { ShoppingCart, User } from 'lucide-react-native';
import { useCart } from '@/store/cartStore';
import { Pressable } from 'react-native';
import { Text } from '@/components/ui/text';

const queryClient = new QueryClient();

export default function RootLayout() {
  const cartItemsNum = useCart((state) => state.items.length);
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="system">
        <Stack
          screenOptions={{
            headerRight: () =>
              cartItemsNum > 0 && (
                <Link
                  href="/cart"
                  asChild
                  className="flex-row items-center justify-center"
                >
                  <Pressable>
                    <Icon as={ShoppingCart} />
                    <Text className="font-bold ml-6 mr-2">{cartItemsNum}</Text>
                  </Pressable>
                </Link>
              ),
            headerLeft: () => (
              <Link
                href={'/login'}
                asChild
                className="flex-row items-center justify-center ml-6"
              >
                <Pressable>
                  <Icon as={User} />
                </Pressable>
              </Link>
            ),
          }}
        >
          <Stack.Screen
            name="index"
            options={{ title: 'Minth Shop', headerTitleAlign: 'center' }}
          />
          <Stack.Screen
            name="cart"
            options={{ title: 'Mon Panier', headerTitleAlign: 'center' }}
          />
          <Stack.Screen
            name="login"
            options={{ title: 'Connexion', headerTitleAlign: 'center' }}
          />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
