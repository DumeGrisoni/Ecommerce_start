import '../node_modules/.cache/nativewind/global.css';
import React from 'react';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// ------------ Imports Personnelles -----------------
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="system">
        <Stack>
          <Stack.Screen
            name="index"
            options={{ title: 'Minth Shop', headerTitleAlign: 'center' }}
          />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
