import '../node_modules/.cache/nativewind/global.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import React from 'react';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="system">
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: 'Minth Shop', headerTitleAlign: 'center' }}
        />
      </Stack>
    </GluestackUIProvider>
  );
}
