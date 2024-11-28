'use client';
import { getOrderItems, getOrders } from '@/api/orders';
import { getProductById } from '@/api/products';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { ChevronDownIcon, ChevronUpIcon, Icon } from '@/components/ui/icon';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Order, OrderItem } from '@/types/types';
import { formatDate } from '@/utils/datesFunc';
import React, { useEffect, useState } from 'react';
import { FlatList, Platform, TouchableOpacity, View } from 'react-native';

const MainPage = () => {
  // ----------------- State -----------------
  const [orders, setOrders] = useState<Order[]>([]);
  const [paginateOrders, setPaginateOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // ----------------- Variables -----------------

  const itemsPerPage = 10;

  const toggleOrderDetails = (orderId: number) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };
  const isWeb = Platform.OS === 'web';

  // ----------------- Functions -----------------
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const allOrders = await getOrders();

      const ordersDetails = await Promise.all(
        allOrders.map(async (order: Order) => {
          const orderDetails = await getOrderItems(order.id);
          orderDetails.items = await Promise.all(
            orderDetails.items.map(async (item: OrderItem) => {
              const product = await getProductById(item.productId);
              return { ...item, product };
            })
          );
          return orderDetails;
        })
      );

      setOrders(ordersDetails);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const getPageNumber = (totalItems: number, currentPage: number) => {
    const totalePages = Math.ceil(totalItems / itemsPerPage);
    const pages = [];
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalePages, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  // ----------------- Effets -----------------

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    console.log('orders', orders);
  }, [orders]);

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
    setPaginateOrders(orders.slice(start, end));
  }, [currentPage, orders]);

  // ----------------- Render -----------------
  if (!loading && !paginateOrders.length) {
    return (
      <Box className="flex-1">
        <Box className="h-full">
          <Card className="m-auto h-[80%] w-[70%] justify-center items-center">
            <Heading className="text-center">Aucune commande</Heading>
          </Card>
        </Box>
      </Box>
    );
  }

  const renderItems = (item: Order) => {
    return (
      <HStack className="justify-around w-[90%] mx-auto">
        <Box className="border rounded bg-white border-typography-500 w-[95%] mx-auto p-2 my-2">
          <HStack className="justify-between px-4" space="md">
            <HStack className="flex-1 justify-around ">
              <Text
                size="sm"
                className={`text-center font-semibold ${
                  item.status === 'Nouveau'
                    ? 'text-green-500'
                    : 'text-typography-500'
                } `}
              >
                {item.status}
              </Text>
              <Text
                size="sm"
                className="text-center text-typography-900 font-bold"
              >
                {formatDate(item.createdAt)}
              </Text>
            </HStack>
            <TouchableOpacity onPress={() => toggleOrderDetails(item.id)}>
              <Icon
                className="ml-auto"
                size="xl"
                as={
                  expandedOrderId === item.id ? ChevronUpIcon : ChevronDownIcon
                }
              />
            </TouchableOpacity>
          </HStack>
          {expandedOrderId === item.id && (
            <VStack className=" justify-center" space="md">
              <Box className="w-[90%] h-[1px] bg-typography-500 mx-auto my-4" />

              <HStack className="justify-between ">
                <Text className="text-center font-bold">Commande </Text>
                <Text className="text-center">n°{item.id}</Text>
              </HStack>
              <HStack className="justify-between ">
                <Text className="text-center font-bold">Adresse </Text>
                <Text className="text-center">{}</Text>
              </HStack>

              <HStack className="justify-between">
                <Text className="text-center font-bold">Total : </Text>
                <Text className="text-center">
                  {item.items.reduce(
                    (total, orderItem) => total + orderItem.price,
                    0
                  )}{' '}
                  €
                </Text>
              </HStack>
              <Text className="text-center font-bold text-typography-800 text-lg">
                Articles :
              </Text>
              {item.items.map((orderItem) => (
                <HStack
                  key={orderItem.id}
                  className="justify-between items-center border-t py-2 border-typography-100"
                  space="xs"
                >
                  <Image
                    source={{ uri: orderItem.product?.image }}
                    className="rounded-full w-[50px] border border-typography-100 h-[50px]"
                    alt="Image de l'article"
                    resizeMode="cover"
                  />
                  <VStack className="items-end flex-1" space="sm">
                    <Text
                      className="text-end font-semibold text-typography-900"
                      size="sm"
                      numberOfLines={2}
                      ellipsizeMode="tail"
                    >
                      {orderItem.product.name}
                    </Text>
                    <HStack className="justify-between">
                      <Text
                        size="sm"
                        className="font-semibold text-typography-900"
                      >
                        Quantité:{' '}
                      </Text>
                      <Text size="sm">{orderItem.quantity}</Text>
                    </HStack>
                    <HStack className="justify-between">
                      <Text
                        size="sm"
                        className="font-semibold text-typography-900"
                      >
                        Prix :{' '}
                      </Text>
                      <Text size="sm">
                        {orderItem.price / orderItem.quantity} €
                      </Text>
                    </HStack>
                  </VStack>
                </HStack>
              ))}
            </VStack>
          )}
        </Box>
      </HStack>
    );
  };

  return (
    <View
      className="min-h-screen"
      style={{
        width: '100%',
        height: '100%',
        marginHorizontal: 'auto',
        marginVertical: 'auto',
        paddingBottom: isWeb ? 60 : 50,
      }}
    >
      <Heading className="text-center my-4">Toutes mes commandes</Heading>
      <FlatList
        data={paginateOrders}
        renderItem={({ item }) => renderItems(item)}
        keyExtractor={(item) => item.id.toString()}
      />
      <HStack
        className={`justify-around  w-[90%] md:w-[50%] h-[50px] md:h-[80px]  items-center  mx-auto`}
      >
        <Button
          onPress={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ButtonText>Précédent</ButtonText>
        </Button>

        {getPageNumber(orders.length, currentPage).map((page) => (
          <Button
            size="md"
            onPress={() => setCurrentPage(page)}
            key={page}
            className={`${page !== currentPage ? 'bg-typography-500' : ' '}`}
            disabled={page === currentPage}
          >
            <ButtonText>{page}</ButtonText>
          </Button>
        ))}

        <Button
          onPress={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage * itemsPerPage >= orders.length}
        >
          <ButtonText>Suivant</ButtonText>
        </Button>
      </HStack>
    </View>
  );
};

export default MainPage;
