import React from 'react';
import { Tabs, usePathname, useRouter } from 'expo-router';
import { Icon } from '@/components/ui/icon';
import { Calendar, FileUser, PackageOpen } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';

const UserLayout = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Barre de navigation en haut */}
      <Box
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 10,
          backgroundColor: 'white',
          borderBottomWidth: 1,
          borderBottomColor: 'gray',
        }}
      >
        <TouchableOpacity
          onPress={() => router.push('/orders')}
          className=" items-center justify-center"
        >
          <Icon
            as={PackageOpen}
            size="xl"
            color={pathname === '/orders' ? 'black' : 'gray'}
          />
          <Text
            style={{ color: pathname === '/orders' ? 'black' : 'gray' }}
            className="text-typography-500"
          >
            Mes commandes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/profil')}
          className=" items-center justify-center"
        >
          <Icon
            as={FileUser}
            size="xl"
            color={pathname === '/profil' ? 'black' : 'gray'}
          />
          <Text
            style={{ color: pathname === '/profil' ? 'black' : 'gray' }}
            className="text-typography-500 "
          >
            Mes informations
          </Text>
        </TouchableOpacity>
      </Box>

      {/* Contenu des onglets */}
      <Tabs
        screenOptions={{
          tabBarStyle: { display: 'none' },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="orders"
          options={{
            title: 'Commandes',
            tabBarIcon: ({ focused }) => (
              <Icon
                as={Calendar}
                size="xl"
                color={focused ? 'black' : 'gray'}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profil"
          options={{
            title: 'Profil',
            tabBarIcon: ({ focused }) => (
              <Icon
                as={Calendar}
                size="xl"
                color={focused ? 'black' : 'gray'}
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default UserLayout;
