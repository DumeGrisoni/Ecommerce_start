import { View } from 'react-native';
import React from 'react';
import { Stack, Tabs } from 'expo-router';
import { Icon } from '@/components/ui/icon';
import { Calendar } from 'lucide-react-native';

const UserLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'regular',
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Commandes',
          tabBarIcon: ({ focused }) => (
            <Icon as={Calendar} size="xl" color={focused ? 'black' : 'gray'} />
          ),
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: 'Profil',
          tabBarIcon: ({ focused }) => (
            <Icon as={Calendar} size="xl" color={focused ? 'black' : 'gray'} />
          ),
        }}
      />
    </Tabs>
  );
};

export default UserLayout;
