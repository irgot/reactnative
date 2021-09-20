/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import { View } from '../components/Themed';

import Colors from '../constants/Colors';

import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';

import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { Octicons, MaterialCommunityIcons } from "@expo/vector-icons";
import MainTabNavigator from './MainTabNavigator';
import ChatRoomScreen from '../screens/ChatRoomScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Colors.light.tint,

      },
      headerShadowVisible: false,

      headerTintColor: Colors.light.background,
      headerTitleAlign: 'left',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}>
      <Stack.Screen name="Root" component={MainTabNavigator} options={{
        title: 'WhatsAppC',
        headerRight: () => (
          <View style={{
            flexDirection: 'row', width: 60, justifyContent: 'space-between', backgroundColor: Colors.light.tint,
            marginRight: 10
          }}>
            <Octicons name="search" size={22} color="white" style={{ backgroundColor: Colors.light.tint }} />
            <MaterialCommunityIcons name="dots-vertical" size={22} color="white" style={{ backgroundColor: Colors.light.tint }} />
          </View>
        )
      }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={{ title: 'Chat Room' }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}


