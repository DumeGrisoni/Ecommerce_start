'use client';
import { getOrders } from '@/api/orders';
import { fetchUsers } from '@/api/users';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

import { Order } from '@/types/types';
import { formatDate } from '@/utils/datesFunc';
import ItemPerPageSelector from '@/utils/itemPerPageSelector';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';

const MainPage = () => {
  // ----------------- State -----------------
  const [newOrders, setNewOrders] = useState<Order[]>([]);
  const [processingOrders, setProcessingOrders] = useState<Order[]>([]);
  const [inDeliveryOrders, setInDeliveryOrders] = useState<Order[]>([]);
  const [deliveredOrders, setDeliveredOrders] = useState<Order[]>([]);
  const [cancelledOrders, setCancelledOrders] = useState<Order[]>([]);
  const [paginateNewOrders, setPaginateNewOrders] = useState<Order[]>([]);
  const [paginateProcessingOrders, setPaginateProcessingOrders] = useState<
    Order[]
  >([]);
  const [paginateInDeliveryOrders, setPaginateInDeliveryOrders] = useState<
    Order[]
  >([]);
  const [paginateDeliveredOrders, setPaginateDeliveredOrders] = useState<
    Order[]
  >([]);
  const [paginateCancelOrders, setPaginateCancelOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isNewDropdownOpen, setIsNewDropdownOpen] = useState(false);
  const [isProcessingDropdownOpen, setIsProcessingDropdownOpen] =
    useState(false);
  const [isInDeliveryDropdownOpen, setIsInDeliveryDropdownOpen] =
    useState(false);
  const [isDeliveredDropdownOpen, setIsDeliveredDropdownOpen] = useState(false);
  const [isCancelledDropdownOpen, setIsCancelledDropdownOpen] = useState(false);
  const [users, setUsers] = useState([]);
  // // ----------------- Variables -----------------

  const options = [10, 20, 50, 100];

  // ----------------- Functions -----------------
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const allOrders = await getOrders();
      const newOrders = allOrders.filter(
        (order: Order) => order.status === 'Nouveau'
      );
      setNewOrders(newOrders);
      const processingOrders = allOrders.filter(
        (order: Order) => order.status === 'En cours'
      );
      setProcessingOrders(processingOrders);
      const inDeliveryOrders = allOrders.filter(
        (order: Order) => order.status === 'Livraison'
      );
      setInDeliveryOrders(inDeliveryOrders);
      const deliveredOrders = allOrders.filter(
        (order: Order) => order.status === 'Livrée'
      );
      setDeliveredOrders(deliveredOrders);
      const cancelledOrders = allOrders.filter(
        (order: Order) => order.status === 'Annulée'
      );
      setCancelledOrders(cancelledOrders);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const fetchUsersData = async () => {
    const usersData = await fetchUsers();
    if (!usersData) {
      setUsers([]);
    } else {
      setUsers(usersData);
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

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Nouveau':
        return 'text-black';
      case 'En cours':
        return 'text-slate-500';
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
    fetchOrders();
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1000);
    };
    fetchUsersData();
    console.log('URL', process.env.NEXT_PUBLIC_API_URL);
    handleResize(); // Vérifiez la taille de l'écran au chargement
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
    setPaginateNewOrders(newOrders.slice(start, end));
    setPaginateProcessingOrders(processingOrders.slice(start, end));
    setPaginateInDeliveryOrders(inDeliveryOrders.slice(start, end));
    setPaginateDeliveredOrders(deliveredOrders.slice(start, end));
    setPaginateCancelOrders(cancelledOrders.slice(start, end));
  }, [
    users,
    currentPage,
    newOrders,
    processingOrders,
    inDeliveryOrders,
    deliveredOrders,
    cancelledOrders,
    itemsPerPage,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  useEffect(() => {
    console.log(processingOrders);
  }, [processingOrders]);

  // ----------------- Render -----------------
  if (
    !loading &&
    !paginateNewOrders.length &&
    !paginateProcessingOrders.length &&
    !paginateInDeliveryOrders.length &&
    !paginateDeliveredOrders.length &&
    !paginateCancelOrders.length
  ) {
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
      <Link href={`/dashboard/${item.id}`} className="group" key={item.id}>
        <HStack className="justify-around w-[90%] mx-auto">
          <Box className="border rounded bg-white border-typography-100 hover:border-typography-800 w-[95%] mx-auto p-2 my-2">
            <HStack className="justify-between px-4" space="md">
              <HStack className="flex-1 justify-around ">
                <HStack
                  className=" justify-between items-center"
                  space={isSmallScreen ? 'md' : 'sm'}
                >
                  {!isSmallScreen && (
                    <Text
                      size={isSmallScreen ? 'xs' : 'sm'}
                      className="text-center text-typography-900 font-bold"
                    >
                      Status:
                    </Text>
                  )}
                  <Text
                    size={isSmallScreen ? 'xs' : 'sm'}
                    className={`text-center font-semibold ${getStatusClass(
                      item.status
                    )} `}
                  >
                    {item.status}
                  </Text>
                </HStack>
                <Text
                  size={isSmallScreen ? 'xs' : 'sm'}
                  className="text-center text-typography-900"
                >
                  #{item.id}
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
        className="items-center justify-between ml-auto mr-10 w-[55%] z-50"
      >
        {!isSmallScreen ? (
          <Heading className="text-center my-4">Toutes mes commandes</Heading>
        ) : (
          <Text className="text-start my-4 font-bold">
            Toutes mes commandes
          </Text>
        )}
        <HStack className=" items-center justify-center">
          {!isSmallScreen && (
            <Text className="text-typography-900">Commandes par page: </Text>
          )}
          <ItemPerPageSelector
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            options={options}
          />
        </HStack>
      </HStack>

      <VStack className="justify-center items-center mt-10" space="lg">
        {/* NOUVELLES COMMANDES */}
        <Box className="w-full">
          <Button
            onPress={() => setIsNewDropdownOpen(!isNewDropdownOpen)}
            className="p-2 w-[90%]  mx-auto border rounded bg-typography-white"
          >
            <ButtonText className="text-typography-900 font-semibold">
              Nouvelles commandes
            </ButtonText>
          </Button>
          {isNewDropdownOpen && (
            <Box className=" mt-1 w-[90%] mx-auto bg-white border rounded shadow-lg">
              {paginateNewOrders.length > 0 ? (
                <FlatList
                  data={paginateNewOrders}
                  renderItem={({ item }) => renderItems(item)}
                  keyExtractor={(item) => item.id.toString()}
                  ListEmptyComponent={
                    <Text className="text-center">
                      Aucune nouvelle commande trouvée
                    </Text>
                  }
                />
              ) : (
                <Box className="h-11 my-auto items-center justify-center">
                  <Text className="text-center">
                    Aucune nouvelle commande trouvée
                  </Text>
                </Box>
              )}

              {newOrders.length > itemsPerPage && (
                <HStack
                  className={`justify-around w-[90%] md:w-[50%] h-[50px] md:h-[80px] items-center mx-auto`}
                >
                  <Button
                    size={isSmallScreen ? 'xs' : 'md'}
                    onPress={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ButtonText>Précédent</ButtonText>
                  </Button>

                  {getPageNumber(newOrders.length, currentPage).map((page) => (
                    <Button
                      size={isSmallScreen ? 'xs' : 'md'}
                      onPress={() => setCurrentPage(page)}
                      key={page}
                      className={`${
                        page !== currentPage ? 'bg-typography-500' : ' '
                      }`}
                      disabled={page === currentPage}
                    >
                      <ButtonText>{page}</ButtonText>
                    </Button>
                  ))}

                  <Button
                    size={isSmallScreen ? 'xs' : 'md'}
                    onPress={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage * itemsPerPage >= newOrders.length}
                  >
                    <ButtonText>Suivant</ButtonText>
                  </Button>
                </HStack>
              )}
            </Box>
          )}
        </Box>

        {/* COMMANDES EN PRÉPARATION */}
        <Box className="w-full">
          <Button
            onPress={() =>
              setIsProcessingDropdownOpen(!isProcessingDropdownOpen)
            }
            className="p-2 w-[90%] mx-auto border rounded bg-typography-white"
          >
            <ButtonText className="text-typography-900 font-semibold">
              Commandes en préparation
            </ButtonText>
          </Button>
          {isProcessingDropdownOpen && (
            <Box className="w-[90%] mt-1 mx-auto bg-white border rounded shadow-lg">
              {processingOrders.length > 0 ? (
                <FlatList
                  data={paginateProcessingOrders}
                  renderItem={({ item }) => renderItems(item)}
                  keyExtractor={(item) => item.id.toString()}
                  ListEmptyComponent={
                    <Text className="text-center">
                      Aucune commande en préparation trouvée
                    </Text>
                  }
                />
              ) : (
                <Box className="h-11 my-auto items-center justify-center">
                  <Text className="text-center">
                    Aucune commande en préparation trouvée
                  </Text>
                </Box>
              )}

              {processingOrders.length > itemsPerPage && (
                <HStack
                  className={`justify-around w-[90%] md:w-[50%] h-[50px] md:h-[80px] items-center mx-auto`}
                >
                  <Button
                    size={isSmallScreen ? 'xs' : 'md'}
                    onPress={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ButtonText>Précédent</ButtonText>
                  </Button>

                  {getPageNumber(processingOrders.length, currentPage).map(
                    (page) => (
                      <Button
                        size={isSmallScreen ? 'xs' : 'md'}
                        onPress={() => setCurrentPage(page)}
                        key={page}
                        className={`${
                          page !== currentPage ? 'bg-typography-500' : ' '
                        }`}
                        disabled={page === currentPage}
                      >
                        <ButtonText>{page}</ButtonText>
                      </Button>
                    )
                  )}

                  <Button
                    size={isSmallScreen ? 'xs' : 'md'}
                    onPress={() => setCurrentPage(currentPage + 1)}
                    disabled={
                      currentPage * itemsPerPage >= processingOrders.length
                    }
                  >
                    <ButtonText>Suivant</ButtonText>
                  </Button>
                </HStack>
              )}
            </Box>
          )}
        </Box>

        {/* COMMANDES EN LIVRAISON */}
        <Box className="w-full">
          <Button
            onPress={() =>
              setIsInDeliveryDropdownOpen(!isInDeliveryDropdownOpen)
            }
            className="p-2 w-[90%] mx-auto border rounded bg-typography-white"
          >
            <ButtonText className="text-typography-900 font-semibold">
              Commandes en livraison
            </ButtonText>
          </Button>
          {isInDeliveryDropdownOpen && (
            <Box className="w-[90%] mt-1 mx-auto bg-white border rounded shadow-lg">
              {inDeliveryOrders.length > 0 ? (
                <FlatList
                  data={paginateInDeliveryOrders}
                  renderItem={({ item }) => renderItems(item)}
                  keyExtractor={(item) => item.id.toString()}
                  ListEmptyComponent={
                    <Text className="text-center">
                      Aucune commande en livraison trouvée
                    </Text>
                  }
                />
              ) : (
                <Box className="h-11 my-auto items-center justify-center">
                  <Text className="text-center">
                    Aucune commande en livraison trouvée
                  </Text>
                </Box>
              )}

              {inDeliveryOrders.length > itemsPerPage && (
                <HStack
                  className={`justify-around w-[90%] md:w-[50%] h-[50px] md:h-[80px] items-center mx-auto`}
                >
                  <Button
                    size={isSmallScreen ? 'xs' : 'md'}
                    onPress={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ButtonText>Précédent</ButtonText>
                  </Button>

                  {getPageNumber(inDeliveryOrders.length, currentPage).map(
                    (page) => (
                      <Button
                        size={isSmallScreen ? 'xs' : 'md'}
                        onPress={() => setCurrentPage(page)}
                        key={page}
                        className={`${
                          page !== currentPage ? 'bg-typography-500' : ' '
                        }`}
                        disabled={page === currentPage}
                      >
                        <ButtonText>{page}</ButtonText>
                      </Button>
                    )
                  )}

                  <Button
                    size={isSmallScreen ? 'xs' : 'md'}
                    onPress={() => setCurrentPage(currentPage + 1)}
                    disabled={
                      currentPage * itemsPerPage >= inDeliveryOrders.length
                    }
                  >
                    <ButtonText>Suivant</ButtonText>
                  </Button>
                </HStack>
              )}
            </Box>
          )}
        </Box>

        {/* COMMANDES LIVRÉES */}
        <Box className="w-full">
          <Button
            onPress={() => setIsDeliveredDropdownOpen(!isDeliveredDropdownOpen)}
            className="p-2 w-[90%] mx-auto border rounded bg-typography-white"
          >
            <ButtonText className="text-typography-900 font-semibold">
              Commandes livrées
            </ButtonText>
          </Button>
          {isDeliveredDropdownOpen && (
            <Box className="w-[90%] mt-1 mx-auto bg-white border rounded shadow-lg">
              {deliveredOrders.length > 0 ? (
                <FlatList
                  data={paginateDeliveredOrders}
                  renderItem={({ item }) => renderItems(item)}
                  keyExtractor={(item) => item.id.toString()}
                  ListEmptyComponent={
                    <Text className="text-center">
                      Aucune commande livrée trouvée
                    </Text>
                  }
                />
              ) : (
                <Box className="h-11 my-auto items-center justify-center">
                  <Text className="text-center">
                    Aucune commande livrée trouvée
                  </Text>
                </Box>
              )}

              {deliveredOrders.length > itemsPerPage && (
                <HStack
                  className={`justify-around w-[90%] md:w-[50%] h-[50px] md:h-[80px] items-center mx-auto`}
                >
                  <Button
                    size={isSmallScreen ? 'xs' : 'md'}
                    onPress={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ButtonText>Précédent</ButtonText>
                  </Button>

                  {getPageNumber(deliveredOrders.length, currentPage).map(
                    (page) => (
                      <Button
                        size={isSmallScreen ? 'xs' : 'md'}
                        onPress={() => setCurrentPage(page)}
                        key={page}
                        className={`${
                          page !== currentPage ? 'bg-typography-500' : ' '
                        }`}
                        disabled={page === currentPage}
                      >
                        <ButtonText>{page}</ButtonText>
                      </Button>
                    )
                  )}

                  <Button
                    size={isSmallScreen ? 'xs' : 'md'}
                    onPress={() => setCurrentPage(currentPage + 1)}
                    disabled={
                      currentPage * itemsPerPage >= deliveredOrders.length
                    }
                  >
                    <ButtonText>Suivant</ButtonText>
                  </Button>
                </HStack>
              )}
            </Box>
          )}
        </Box>

        {/* COMMANDES ANNULÉES */}
        <Box className="w-full">
          <Button
            onPress={() => setIsCancelledDropdownOpen(!isCancelledDropdownOpen)}
            className="p-2 w-[90%] mx-auto border rounded bg-typography-white"
          >
            <ButtonText className="text-typography-900 font-semibold">
              Commandes annulées
            </ButtonText>
          </Button>
          {isCancelledDropdownOpen && (
            <Box className="w-[90%] mt-1 mx-auto bg-white border rounded shadow-lg">
              {cancelledOrders.length > 0 ? (
                <FlatList
                  data={paginateCancelOrders}
                  renderItem={({ item }) => renderItems(item)}
                  keyExtractor={(item) => item.id.toString()}
                  ListEmptyComponent={
                    <Text className="text-center">
                      Aucune commande annulée trouvée
                    </Text>
                  }
                />
              ) : (
                <Box className="h-11 my-auto items-center justify-center">
                  <Text className="text-center">
                    Aucune commande annulée trouvée
                  </Text>
                </Box>
              )}

              {cancelledOrders.length > itemsPerPage && (
                <HStack
                  className={`justify-around w-[90%] md:w-[50%] h-[50px] md:h-[80px] items-center mx-auto`}
                >
                  <Button
                    size={isSmallScreen ? 'xs' : 'md'}
                    onPress={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ButtonText>Précédent</ButtonText>
                  </Button>

                  {getPageNumber(cancelledOrders.length, currentPage).map(
                    (page) => (
                      <Button
                        size={isSmallScreen ? 'xs' : 'md'}
                        onPress={() => setCurrentPage(page)}
                        key={page}
                        className={`${
                          page !== currentPage ? 'bg-typography-500' : ' '
                        }`}
                        disabled={page === currentPage}
                      >
                        <ButtonText>{page}</ButtonText>
                      </Button>
                    )
                  )}

                  <Button
                    size={isSmallScreen ? 'xs' : 'md'}
                    onPress={() => setCurrentPage(currentPage + 1)}
                    disabled={
                      currentPage * itemsPerPage >= cancelledOrders.length
                    }
                  >
                    <ButtonText>Suivant</ButtonText>
                  </Button>
                </HStack>
              )}
            </Box>
          )}
        </Box>
      </VStack>
    </View>
  );
};

export default MainPage;
