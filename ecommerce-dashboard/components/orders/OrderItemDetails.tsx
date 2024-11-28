import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { OrderItemDetailsProps } from '@/types/types';
import { HStack } from '../ui/hstack';
import { Image } from '../ui/image';
import Link from 'next/link';
import { Box } from 'lucide-react';

const OrderItemDetails: React.FC<OrderItemDetailsProps> = ({
  item,
  isSmallScreen,
  isLast,
}) => {
  return (
    <VStack key={item.product.id} className="mt-3" space="lg">
      <HStack className="flex justify-between items-center">
        <Link href={`/dashboard/products/${item.product.id}`}>
          <Image
            source={{ uri: item.product.image }}
            alt="image du produit"
            className="h-20 w-20"
            resizeMode="contain"
          />
        </Link>
        <Link href={`/dashboard/products/${item.product.id}`}>
          <VStack className="flex justify-between items-end">
            <Text
              size={isSmallScreen ? 'xs' : 'md'}
              className="hover:underline"
            >
              {item.product.name}
            </Text>
            <HStack className="flex justify-between items-center" space="lg">
              <Text
                size={isSmallScreen ? 'xs' : 'md'}
                className="font-semibold text-typography-800"
              >
                ID produit:
              </Text>
              <Text size={isSmallScreen ? 'xs' : 'md'}>{item.product.id}</Text>
            </HStack>
          </VStack>
        </Link>
      </HStack>
      <HStack className="flex justify-between items-center">
        <Text
          size={isSmallScreen ? 'xs' : 'md'}
          className="font-semibold text-typography-800"
        >
          Quantité:
        </Text>
        <Text size={isSmallScreen ? 'xs' : 'md'}>{item.quantity}</Text>
      </HStack>
      <HStack className="flex justify-between items-center">
        <Text
          size={isSmallScreen ? 'xs' : 'md'}
          className="font-semibold text-typography-800"
        >
          Prix unitaire:
        </Text>
        <Text size={isSmallScreen ? 'xs' : 'md'}>{item.product.price} €</Text>
      </HStack>
      <HStack className="flex justify-between items-center">
        <Text
          size={isSmallScreen ? 'xs' : 'md'}
          className="font-semibold text-typography-800"
        >
          Prix total:
        </Text>
        <Text size={isSmallScreen ? 'xs' : 'md'}>
          {(item.product.price * item.quantity).toFixed(2)} €
        </Text>
      </HStack>
      {!isLast && <Box className="w-full h-[1px] bg-typography-100 my-1" />}
    </VStack>
  );
};

export default OrderItemDetails;
