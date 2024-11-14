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
import { HStack } from '@/components/ui/hstack';
import { useAuth } from '@/store/authStore';

const queryClient = new QueryClient();

export default function RootLayout() {
  const cartItemsNum = useCart((state) => state.items.length);
  const isLoggedIn = useAuth((state) => !!state.token);
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="system">
        <Stack
          screenOptions={{
            headerBackVisible: true,
            headerRight: () => (
              <HStack className="mr-6 gap-2">
                {cartItemsNum > 0 && (
                  <Link
                    href="/cart"
                    asChild
                    className="flex-row items-center justify-center"
                  >
                    <Pressable>
                      <Icon as={ShoppingCart} size="xl" />
                      <Text className="font-bold mr-1">{cartItemsNum}</Text>
                    </Pressable>
                  </Link>
                )}
                <Link
                  href={isLoggedIn ? '/profil' : '/login'}
                  asChild
                  className="flex-row items-center justify-center "
                >
                  <Pressable>
                    <Icon as={User} size="xl" />
                  </Pressable>
                </Link>
              </HStack>
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
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
