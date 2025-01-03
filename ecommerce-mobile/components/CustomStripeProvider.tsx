import { fetchStripeKeys } from '@/api/stripe';
import { StripeProvider } from '@stripe/stripe-react-native';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, View } from 'react-native';
import { Text } from './ui/text';
import { ReactElement } from 'react';

export default function CustomStripeProvider({
  children,
}: {
  children: ReactElement | ReactElement[];
}) {
  const {
    data: stripeKeys,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['stripe', 'keys'],
    queryFn: fetchStripeKeys,
  });

  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  // if (error || !stripeKeys) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <Text>Une erreur est survenue lors du chargement des clés Stripe.</Text>
  //     </View>
  //   );
  // }

  return (
    <StripeProvider publishableKey={stripeKeys?.publishableKey}>
      {children}
    </StripeProvider>
  );
}
