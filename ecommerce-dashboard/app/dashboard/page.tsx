'use client';
import { getOrders } from '@/api/orders';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';

import { Order } from '@/types/types';
import { formatDate } from '@/utils/datesFunc';
import ItemPerPageSelector from '@/utils/itemPerPageSelector';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';

const MainPage = () => {
  // ----------------- State -----------------
  const [orders, setOrders] = useState<Order[]>([]);
  const [paginateOrders, setPaginateOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  // ----------------- Variables -----------------

  const options = [10, 20, 50, 100];

  // ----------------- Functions -----------------
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const allOrders = await getOrders();
      setOrders(allOrders);
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
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1000);
    };

    handleResize(); // Vérifiez la taille de l'écran au chargement
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
    setPaginateOrders(orders.slice(start, end));
  }, [currentPage, orders, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  // ----------------- Render -----------------
  if (!loading && !paginateOrders.length) {
    return (
      <Box className="flex-1 min-h-screen">
        <Box className="h-[80%] my-auto">
          <Card className="m-auto h-[80%] w-[70%] justify-center items-center">
            <Heading className="text-center">Aucune commande</Heading>
          </Card>
        </Box>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box className="flex-1 min-h-screen">
        <Box className="h-[80%] my-auto">
          <Card className="m-auto h-[80%] w-[70%] justify-center items-center">
            <Heading className="text-center">Chargement...</Heading>
            <ActivityIndicator size="large" color="black" />
          </Card>
        </Box>
      </Box>
    );
  }

  const renderItems = (item: Order) => {
    return (
      <Link href={`/dashboard/${item.id}`} className="group">
        <HStack className="justify-around w-[90%] mx-auto">
          <Box className="border rounded bg-white border-typography-100 hover:border-typography-800 w-[95%] mx-auto p-2 my-2">
            <HStack className="justify-between px-4" space="md">
              <HStack className="flex-1 justify-around ">
                <Text
                  size={isSmallScreen ? 'xs' : 'sm'}
                  className={`text-center font-semibold ${
                    item.status === 'Nouveau'
                      ? 'text-green-500'
                      : 'text-typography-500'
                  } `}
                >
                  {item.status}
                </Text>
                <Text
                  size={isSmallScreen ? 'xs' : 'sm'}
                  className="text-center text-typography-900 font-bold"
                >
                  {formatDate(item.createdAt)}
                </Text>
              </HStack>
            </HStack>
          </Box>
        </HStack>
      </Link>
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
        paddingBottom: isSmallScreen ? 60 : 50,
      }}
    >
      <HStack
        space="sm"
        className=" items-center justify-between ml-auto mr-10 w-[55%] z-50"
      >
        <Heading className="text-center my-4">Toutes mes commandes</Heading>
        <ItemPerPageSelector
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          options={options}
        />
      </HStack>

      <FlatList
        data={paginateOrders}
        renderItem={({ item }) => renderItems(item)}
        keyExtractor={(item) => item.id.toString()}
      />

      {orders.length > itemsPerPage && (
        <HStack
          className={`justify-around  w-[90%] md:w-[50%] h-[50px] md:h-[80px]  items-center  mx-auto`}
        >
          <Button
            size={isSmallScreen ? 'xs' : 'md'}
            onPress={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ButtonText>Précédent</ButtonText>
          </Button>

          {getPageNumber(orders.length, currentPage).map((page) => (
            <Button
              size={isSmallScreen ? 'xs' : 'md'}
              onPress={() => setCurrentPage(page)}
              key={page}
              className={`${page !== currentPage ? 'bg-typography-500' : ' '}`}
              disabled={page === currentPage}
            >
              <ButtonText>{page}</ButtonText>
            </Button>
          ))}

          <Button
            size={isSmallScreen ? 'xs' : 'md'}
            onPress={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage * itemsPerPage >= orders.length}
          >
            <ButtonText>Suivant</ButtonText>
          </Button>
        </HStack>
      )}
    </View>
  );
};

export default MainPage;
