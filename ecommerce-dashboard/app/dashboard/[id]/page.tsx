'use client';
import { getOrderItems } from '@/api/orders';
import { getProductById } from '@/api/products';
import LabelValuePair from '@/components/orders/LabelvaluePairProps';
import OrderItemDetails from '@/components/orders/OrderItemDetails';
import StatusSelector from '@/components/orders/StatusSelector';
import { Box } from '@/components/ui/box';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Order, OrderItem } from '@/types/types';
import { formatDate } from '@/utils/datesFunc';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { updateOrderStatus } from './actions';

const OrderDetails = ({ params }: { params: { id: number } }) => {
  // ----------------- State -----------------
  const [order, setOrder] = useState<Order>({} as Order);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [loading, setLoading] = useState(false);

  // ----------------- Functions -----------------
  const fetchOrders = useCallback(async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  const handleUpdateStatus = (newStatus: string, id: number) => {
    setOrder((prevOrder) => ({ ...prevOrder, status: newStatus }));
    updateOrderStatus(id, newStatus);
  };

  // ----------------- Variables -----------------

  const totalPrice = order.items
    ?.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    .toFixed(2);

  // ----------------- Effets -----------------

  useEffect(() => {
    fetchOrders();
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1200);
    };

    handleResize(); // Vérifiez la taille de l'écran au chargement
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [fetchOrders]);

  useEffect(() => {
    console.log(
      'product variant:',
      order.items?.map((item) => item.colors)
    );
  }, [order.items]);

  return (
    <Box className="min-h-screen w-full my-auto mx-auto">
      <Card className="m-auto w-[95%] my-6  lg:w-[70%]">
        {loading && <ActivityIndicator size="large" color="black" />}
        {order ? (
          <VStack space="lg">
            <HStack className="justify-between z-50 items-center">
              {isSmallScreen ? (
                <Text className="text-center text-xs font-semibold">
                  Status de la commande
                </Text>
              ) : (
                <Heading className="text-center">Status de la commande</Heading>
              )}
              <StatusSelector
                order={order}
                onUpdateStatus={handleUpdateStatus}
              />
            </HStack>
            <LabelValuePair
              label="Total de la commande:"
              value={totalPrice + ' €'}
              isSmallScreen={isSmallScreen}
            />
            <LabelValuePair
              label="Numéro de la commande:"
              value={'# ' + order.id}
              isSmallScreen={isSmallScreen}
            />
            <LabelValuePair
              label="Date:"
              value={formatDate(order.createdAt)}
              isSmallScreen={isSmallScreen}
            />
            <LabelValuePair
              label="Client:"
              value="Dominique Grisoni"
              isSmallScreen={isSmallScreen}
            />
            <LabelValuePair
              label="Adresse:"
              value="8 Batiment communal 20218 Moltifao"
              isSmallScreen={isSmallScreen}
            />
            <Box>
              <Heading className="text-center text-md">Articles</Heading>
              <Box className="w-full h-[1px] bg-typography-100 my-2" />
              <VStack space="lg">
                {order.items &&
                  order.items.length > 0 &&
                  order.items.map((item, index) => (
                    <OrderItemDetails
                      key={item.id}
                      item={item}
                      isSmallScreen={isSmallScreen}
                      isLast={index === order.items.length - 1}
                    />
                  ))}
              </VStack>
            </Box>
          </VStack>
        ) : (
          <Text>Aucun article trouvé pour cette commande.</Text>
        )}
      </Card>
    </Box>
  );
};

export default OrderDetails;
