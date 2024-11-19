import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ---------------- Imports personnels ---------------
import { getOrderItems, getOrders } from '@/api/orders';
import { useAuth } from '@/store/authStore';
import { Box } from '@/components/ui/box';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '@/api/products';
import { Order, OrderItem } from '@/types/types';

const Orders = () => {
  const user = useAuth((state) => state.user);

  const [orders, setOrders] = React.useState<Order[]>([]);
  const [orderItems, setOrderItems] = React.useState<OrderItem[]>([]);

  const fetchOrders = async () => {
    const ordersData = await getOrders(user.id);
    setOrders(ordersData);
  };

  const fetchOrderItems = async (orders: Order[]) => {
    const allOrderItems: OrderItem[] = [];
    for (const order of orders) {
      const orderItems = await getOrderItems(order.id);
      allOrderItems.push(...orderItems);
    }
    setOrderItems(allOrderItems);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    fetchOrderItems(orders);
    console.log('orders', orders);
  }, [orders]);

  useEffect(() => {
    console.log('orderItems', orderItems);
  }, [orderItems]);

  if (!orders.length) {
    return (
      <SafeAreaView className="flex-1">
        <Box className="h-full">
          <Card className="m-auto h-[80%] w-[70%] justify-center items-center">
            <Heading className="text-center">Aucune commande</Heading>
          </Card>
        </Box>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <Box className="h-full">
        <Card className="m-auto h-[80%] w-[90%] justify-center items-center">
          <FlatList
            data={orders}
            renderItem={({ item }) => (
              <Box>
                <Text>{item.id}</Text>
              </Box>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </Card>
      </Box>
    </SafeAreaView>
  );
};

export default Orders;
