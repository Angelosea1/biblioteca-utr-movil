// IMPORTANTE: Debe ir en la primera línea absoluta antes de cualquier import de React.
// Inicializa los gestos nativos (ej. deslizar para regresar) en el hilo principal de la app.
import 'react-native-gesture-handler';
import React from 'react';
// Contenedor principal que administra el historial, estado de pantallas y enlaces (Deep Linking).
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

// Usamos arrow function (const + =>) para mantener el estándar ES6+ y evitar problemas con 'this'.
const App = () => {
  return (
    // Todos los navegadores de React Navigation deben vivir dentro de NavigationContainer.
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
