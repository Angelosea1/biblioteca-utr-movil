import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator, 
  StyleSheet 
} from 'react-native';

// Datos simulados de ejemplo (como si vinieran de una API)
const MATERIAS_DATA = [
  { id: '1', clave: 'IDGS-901', nombre: 'Desarrollo Móvil Integral', creditos: 6, profesor: 'Dr. Alan Turing', descripcion: 'Desarrollo de aplicaciones multiplataforma utilizando React Native y Expo.' },
  { id: '2', clave: 'IDGS-902', nombre: 'Arquitecturas de Software', creditos: 5, profesor: 'Dra. Grace Hopper', descripcion: 'Patrones de diseño, microservicios y escalabilidad en la nube.' },
  { id: '3', clave: 'IDGS-903', nombre: 'Gestión de Proyectos TI', creditos: 5, profesor: 'Mtro. Ken Schwaber', descripcion: 'Metodologías ágiles, Scrum, Kanban y liderazgo de equipos de desarrollo.' },
  { id: '4', clave: 'IDGS-904', nombre: 'Seguridad Informática', creditos: 6, profesor: 'Ing. Kevin Mitnick', descripcion: 'Criptografía, pentesting y aseguramiento de aplicaciones web y móviles.' },
  { id: '5', clave: 'IDGS-905', nombre: 'Integradora II', creditos: 8, profesor: 'Dr. Linus Torvalds', descripcion: 'Desarrollo de proyecto tecnológico aplicando estándares de calidad de software.' },
];

const CatalogScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [materias, setMaterias] = useState([]);

  // Simula la carga de datos desde un servidor (tarda 2 segundos)
  useEffect(() => {
    const timer = setTimeout(() => {
      setMaterias(MATERIAS_DATA);
      setLoading(false);
    }, 2000);

    // Limpieza: cancela el timer si el usuario sale de la pantalla antes de que termine
    return () => clearTimeout(timer);
  }, []);

  // Muestra un spinner mientras se cargan las materias
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Cargando carga académica...</Text>
      </View>
    );
  }

  // Define cómo se dibuja cada tarjeta individual de la lista
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      // Navega a la pantalla 'Detail' enviando el objeto completo 'materia' como parámetro
      onPress={() => navigation.navigate('Detail', { materia: item })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.clave}>{item.clave}</Text>
        <Text style={styles.creditos}>{item.creditos} Créditos</Text>
      </View>
      <Text style={styles.nombre}>{item.nombre}</Text>
      <Text style={styles.profesor}>Docente: {item.profesor}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* FlatList vs ScrollView: FlatList usa virtualización (solo renderiza lo visible en pantalla),
          evitando que la app se congele o quede sin memoria con listas muy largas. */}
      <FlatList
        data={materias}
        // keyExtractor es obligatorio: da un ID único (string) a cada fila para optimizar actualizaciones
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#475569',
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  clave: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2563EB',
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  creditos: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  profesor: {
    fontSize: 14,
    color: '#475569',
  },
});

export default CatalogScreen;
