import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ActivityIndicator 
} from 'react-native';
import * as SecureStore from 'expo-secure-store';

const LoginScreen = ({ onLoginSuccess }) => {
  const [matricula, setMatricula] = useState('');
  const [password, setPassword] = useState('');
  // Controla si la petición está en curso para mostrar spinner y bloquear el botón
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    // Validación básica: evita enviar campos vacíos o solo espacios
    if (!matricula.trim() || !password.trim()) {
      Alert.alert('Campos requeridos', 'Por favor ingresa tu matrícula y contraseña.');
      return;
    }

    setIsSubmitting(true);

    // Simula una petición a servidor (1.5 segundos)
    setTimeout(async () => {
      try {
        // SecureStore solo acepta texto (string), por eso convertimos el objeto con JSON.stringify()
        const sessionData = JSON.stringify({
          token: 'jwt_token_simulado_9no_cuatrimestre',
          matricula: matricula,
          nombre: 'Estudiante de Ingeniería',
        });

        // Guarda los datos encriptados en el hardware seguro (Keychain en iOS / KeyStore en Android)
        await SecureStore.setItemAsync('user_session_token', sessionData);
        // Notifica a AppNavigator para que cambie la interfaz a la pantalla principal
        onLoginSuccess(sessionData);
      } catch (error) {
        Alert.alert('Error', 'No se pudo guardar la sesión.');
      } finally {
        setIsSubmitting(false);
      }
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Portal Académico</Text>
      <Text style={styles.subtitle}>Ingeniería en Desarrollo y Gestión de Software</Text>

      <TextInput
        style={styles.input}
        placeholder="Matrícula (ej. 2023001)"
        value={matricula}
        onChangeText={setMatricula}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* disabled={isSubmitting} evita múltiples clics y condiciones de carrera mientras carga */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleLogin}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F8FAFC',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
