// +not-found.tsx
import React, { useEffect } from 'react';
import { Stack, usePathname, useRouter } from 'expo-router';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';

export default function NotFound() {
  const router = useRouter();
  const pathname = usePathname();
  const [title, setTitle] = React.useState('Page non trouvée');

  useEffect(() => {
    const pathSegments = pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    setTitle(lastSegment || 'Page non trouvée');
  }, [pathname]);

  return (
    <Box className="flex-1 justify-center items-center">
      <Stack.Screen options={{ title: title, headerTitleAlign: 'center' }} />
      <Text className="font-bold text-typography-500">Page non trouvée</Text>
      <Text className="my-6">La page que vous recherchez n'existe pas.</Text>
      <Button
        variant="solid"
        onPress={() => {
          router.replace('/'), router.dismissAll();
        }}
        className="mt-4"
      >
        <ButtonText>Retour à l'accueil</ButtonText>
      </Button>
    </Box>
  );
}
