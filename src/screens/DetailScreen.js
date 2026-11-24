import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// React Navigation inyecta automáticamente 'route' y 'navigation' a cada pantalla registrada
const DetailScreen = ({ route, navigation }) => {
  // Extraemos el parámetro 'materia' que fue enviado desde CatalogScreen con navigation.navigate()
  const { materia } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.badge}>{materia.clave}</Text>
        <Text style={styles.title}>{materia.nombre}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.label}>Docente Titular:</Text>
        <Text style={styles.value}>{materia.profesor}</Text>

        <Text style={styles.label}>Valor Curricular:</Text>
        <Text style={styles.value}>{materia.creditos} Créditos</Text>

        <Text style={styles.label}>Descripción de la Asignatura:</Text>
        <Text style={styles.description}>{materia.descripcion}</Text>
      </View>

      {/* navigation.goBack() saca esta pantalla de la pila (Stack) y regresa a la vista anterior */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Volver al Catálogo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    elevation: 3,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#DBEAFE',
    color: '#1D4ED8',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 16,
  },
  label: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '500',
    marginTop: 2,
  },
  description: {
    fontSize: 15,
    color: '#334155',
    lineHeight: 22,
    marginTop: 4,
  },
  backButton: {
    backgroundColor: '#334155',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetailScreen;
