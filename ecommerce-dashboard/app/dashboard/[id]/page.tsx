'use client';
import { getOrderItems } from '@/api/orders';
import { getProductById } from '@/api/products';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Order, OrderItem } from '@/types/types';
import { formatDate } from '@/utils/datesFunc';
import { useCallback, useEffect, useState } from 'react';

const OrderDetails = ({ params }: { params: { id: number } }) => {
  // ----------------- State -----------------
  const [order, setOrder] = useState<Order>({} as Order);

  // ----------------- Functions -----------------
  const fetchOrders = useCallback(async () => {
    try {
      const orderDetails = await getOrderItems(params.id);
      orderDetails.items = await Promise.all(
        orderDetails.items.map(async (item: OrderItem) => {
          const product = await getProductById(item.productId);
          return { ...item, product };
        })
      );
      setOrder(orderDetails);
    } catch (error) {
      console.error('Failed to fetch order items:', error);
    }
  }, [params.id]);

  // ----------------- Effets -----------------

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    console.log('order', order);
  }, [order]);

  return (
    <Box className="min-h-full my-auto mx-auto">
      <Box>
        <Heading className="text-center">Détails de la commande</Heading>
        {order ? (
          <Box>
            <Text>{order.id}</Text>
            <Text>{formatDate(order.createdAt)}</Text>
            <Box>
              {order.items &&
                order.items.length > 0 &&
                order.items.map((item) => (
                  <Box key={item.id}>
                    <Text>{item.product.name}</Text>
                    <Text>{item.quantity}</Text>
                    <Text>{item.product.price}</Text>
                  </Box>
                ))}
            </Box>
          </Box>
        ) : (
          <Text>Aucun article trouvé pour cette commande.</Text>
        )}
      </Box>
    </Box>
  );
};

export default OrderDetails;
