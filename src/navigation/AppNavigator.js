import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from '../screens/LoginScreen';
import CatalogScreen from '../screens/CatalogScreen';
import DetailScreen from '../screens/DetailScreen';
import ProfileScreen from '../screens/ProfileScreen';

// IMPORTANTE: Se instancian FUERA de los componentes.
// Si se crean adentro, React los reconstruye en cada render, borrando el historial y causando fugas de memoria.
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 1. Stack interno para el catálogo (navegación en pila: Lista -> Detalle)
const CatalogStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1E293B' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen 
        name="CatalogList" 
        component={CatalogScreen} 
        options={{ title: 'Catálogo de Materias' }} 
      />
      <Stack.Screen 
        name="Detail" 
        component={DetailScreen} 
        options={{ title: 'Detalle de Asignatura' }} 
      />
    </Stack.Navigator>
  );
};

// 2. Tabs principales (barra de pestañas inferior: Inicio y Perfil)
const MainTabs = ({ onLogout }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Ocultamos el header del Tab porque CatalogStack ya tiene su propio header
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: 'gray',
        // Cambia el ícono dinámicamente según la pestaña y si está seleccionada (focused)
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Inicio') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      {/* Anidamiento: la pestaña 'Inicio' carga un Stack completo (CatalogStack) */}
      <Tab.Screen name="Inicio" component={CatalogStack} />
      <Tab.Screen name="Perfil">
        {/* Render Prop: permite pasar props personalizadas (onLogout) además de las de navegación (...props) */}
        {(props) => <ProfileScreen {...props} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

// 3. Root Navigator (Orquestador principal: decide si mostrar Login o la app principal)
const AppNavigator = () => {
  // isLoading inicia en true para esperar la lectura de SecureStore antes de mostrar Login
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  // Al arrancar la app, revisa en el almacenamiento seguro si ya hay una sesión guardada
  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = await SecureStore.getItemAsync('user_session_token');
        setUserToken(token);
      } catch (e) {
        console.error('Error leyendo SecureStore:', e);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  // Mientras lee SecureStore, muestra un spinner de carga para evitar parpadeos hacia Login
  if (isLoading) {
    return (
      <View style={styles.splashContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Navegación condicional: si no hay token va a Login; si hay token va a MainTabs */}
      {userToken == null ? (
        <Stack.Screen name="Login">
          {/* Render Prop para pasarle onLoginSuccess y actualizar userToken al iniciar sesión */}
          {(props) => <LoginScreen {...props} onLoginSuccess={setUserToken} />}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="Main">
          {/* Al cerrar sesión, ponemos userToken en null y React Navigation cambia solo a Login */}
          {(props) => <MainTabs {...props} onLogout={() => setUserToken(null)} />}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
});

export default AppNavigator;
