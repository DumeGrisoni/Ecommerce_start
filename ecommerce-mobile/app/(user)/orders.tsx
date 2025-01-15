import React, { useEffect, useState } from 'react';
import { FlatList, Platform, TouchableOpacity, View } from 'react-native';

// ---------------- Imports personnels ---------------
import { getOrder, getOrders } from '@/api/orders';
import { useAuth } from '@/store/authStore';
import { Box } from '@/components/ui/box';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Order, OrderItem, OrderStatus, userType } from '@/types/types';
import { formatDate } from '@/utils/datesFunc';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { ChevronDownIcon, ChevronUpIcon, Icon } from '@/components/ui/icon';
import { getProductById } from '@/api/products';
import { Image } from '@/components/ui/image';
import { Button, ButtonText } from '@/components/ui/button';

const Orders = () => {
  // ----------------- State -----------------
  const userData = useAuth((state) => state.user);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [paginateOrders, setPaginateOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState<userType>({} as userType);
  const [loading, setLoading] = useState(false);

  // ----------------- Variables -----------------
  const isWeb = Platform.OS === 'web';
  const itemsPerPage = 10;

  // ----------------- Functions -----------------
  const fetchOrders = async () => {
    try {
      setLoading(true);

      const statusPriority: Record<OrderStatus, number> = {
        Nouveau: 1,
        'En cours': 2,
        Livraison: 3,
        Livrée: 4,
        Annulée: 5,
      };

      const sortOrders = (orders: Order[]) => {
        return orders.sort((a, b) => {
          if (
            statusPriority[a.status as OrderStatus] !==
            statusPriority[b.status as OrderStatus]
          ) {
            return (
              statusPriority[a.status as OrderStatus] -
              statusPriority[b.status as OrderStatus]
            );
          }
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
      };

      const allOrders = await getOrders(user.id);

      const ordersDetails = await Promise.all(
        allOrders.map(async (order: Order) => {
          const orderDetails = await getOrder(order.id);
          orderDetails.items = await Promise.all(
            orderDetails.items.map(async (item: OrderItem) => {
              const product = await getProductById(item.productId);
              return { ...item, product };
            })
          );
          return orderDetails;
        })
      );

      setOrders(sortOrders(ordersDetails));

      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const toggleOrderDetails = (orderId: number) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
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
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Nouveau':
        return 'text-slate-500';
      case 'En cours':
        return 'text-blue-500';
      case 'Livraison':
        return 'text-yellow-500';
      case 'Livrée':
        return 'text-green-500';
      case 'Annulée':
        return 'text-red-500';
      default:
        return 'text-typography-500';
    }
  };
  // ----------------- Effets -----------------

  useEffect(() => {
    setUser(userData);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [user]);

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
    setPaginateOrders(orders.slice(start, end));
  }, [currentPage, orders]);

  // ----------------- Affichage ----------------

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
                className={`text-center ${getStatusClass(item.status)}`}
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
                    source={{ uri: orderItem.product.image[0] }}
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
        className={`justify-around border-t border-black w-[90%] md:w-[50%] h-[50px] md:h-[80px]  items-center mt-auto mx-auto`}
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

export default Orders;
