import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomePage from '../views/HomePage';
import AtletasPage from '../views/AtletasPage';
import AtletaFormPage from '../views/AtletaFormPage';
import ObservacionesPage from '../views/ObservacionesPage';
import ObservacionFormPage from '../views/ObservacionFormPage';
import DrawerContent from '../components/DrawerContent';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: { width: 300 },
      }}
    >
      <Drawer.Screen name="Inicio" component={HomePage} />
      <Drawer.Screen name="Atletas" component={AtletasPage} />
      <Drawer.Screen name="Observaciones" component={ObservacionesPage} />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Principal" component={DrawerRoutes} />
        <Stack.Screen name="AtletaForm" component={AtletaFormPage} />
        <Stack.Screen name="ObservacionForm" component={ObservacionFormPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
