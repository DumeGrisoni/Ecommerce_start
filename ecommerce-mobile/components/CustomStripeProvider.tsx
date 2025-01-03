import { fetchStripeKeys } from '@/api/stripe';
import { useQuery } from '@tanstack/react-query';

export default function CustomStripeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: stripeKeys } = useQuery({
    queryKey: ['stripe', 'keys'],
    queryFn: fetchStripeKeys,
  });
  console.log('stripeKeys:', stripeKeys);
  return children;
}
