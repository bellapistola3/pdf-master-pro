import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ToolsScreen from '../screens/ToolsScreen';
import ToolRunnerScreen from '../screens/ToolRunnerScreen';
import AccountScreen from '../screens/AccountScreen';
import PricingScreen from '../screens/PricingScreen';

export type RootStackParamList = {
  Home: undefined;
  Tools: undefined;
  ToolRunner: { slug: string };
  Account: undefined;
  Pricing: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#F7F5F0' },
          headerTintColor: '#1E2A3A',
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'PDF Master Pro' }} />
        <Stack.Screen name="Tools" component={ToolsScreen} options={{ title: 'Tools' }} />
        <Stack.Screen name="ToolRunner" component={ToolRunnerScreen} options={{ title: '' }} />
        <Stack.Screen name="Account" component={AccountScreen} options={{ title: 'Account' }} />
        <Stack.Screen name="Pricing" component={PricingScreen} options={{ title: 'Pricing' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
