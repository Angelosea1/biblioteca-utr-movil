import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = ({ onLogout }) => {
  const [userData, setUserData] = useState(null);

  // Al abrir el perfil, lee los datos de sesión guardados en el almacenamiento seguro
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedData = await SecureStore.getItemAsync('user_session_token');
        if (storedData) {
          // Como SecureStore guarda texto plano (JSON), usamos JSON.parse() para volverlo un objeto JS
          setUserData(JSON.parse(storedData));
        }
      } catch (error) {
        console.error('Error al leer datos del perfil:', error);
      }
    };

    loadUserData();
  }, []);

  // Muestra una alerta de confirmación antes de cerrar la sesión
  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que deseas salir de la aplicación?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Salir',
          style: 'destructive',
          onPress: async () => {
            // 1. Borramos físicamente el token del hardware seguro (Keychain / KeyStore)
            await SecureStore.deleteItemAsync('user_session_token');
            // 2. Avisamos a AppNavigator para que ponga userToken en null y regrese a Login
            onLogout();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-circle" size={100} color="#2563EB" />
        {/* El operador '?.' evita errores si userData todavía es null mientras carga */}
        <Text style={styles.name}>{userData?.nombre || 'Cargando...'}</Text>
        <Text style={styles.matricula}>Matrícula: {userData?.matricula || '---'}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Estado de la Sesión</Text>
        <Text style={styles.infoText}>
          Tus credenciales están almacenadas de forma encriptada mediante Expo SecureStore. Si cierras la app por completo y la vuelves a abrir, tu sesión seguirá activa.
        </Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F172A',
    marginTop: 12,
  },
  matricula: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 4,
  },
  infoBox: {
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 14,
    color: '#1E3A8A',
    lineHeight: 20,
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
