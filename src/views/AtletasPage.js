import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAtleta } from '../store/slices/atletasSlice';
import Header from '../components/Header';
import ScreenHeader from '../components/ScreenHeader';
import AtletaCard from '../components/AtletaCard';
import EmptyState from '../components/EmptyState';
import { useTheme } from '../context/ThemeContext';
import { useSearch } from '../hooks/useSearch';

export default function AtletasPage({ navigation }) {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const atletas = useSelector((state) => state.atletas);
  const { query, setQuery, resultados } = useSearch(atletas, ['nombres', 'apellidos', 'cedula']);

  const verDetalle = (atleta) => {
    Alert.alert(
      `${atleta.nombres} ${atleta.apellidos}`,
      [
        `Cédula: ${atleta.cedula}`,
        `Sexo: ${atleta.sexo === 'M' ? 'Masculino' : 'Femenino'}`,
        `Nacimiento: ${atleta.fechaNacimiento}`,
        `Categoría: ${atleta.categoria}`,
        `FEVEDA: ${atleta.numeroFeveda}`,
        `Estado: ${atleta.estado}`,
        '',
        `Teléfono: ${atleta.telefono}`,
        `Correo: ${atleta.correo}`,
        `Dirección: ${atleta.direccion}`,
        '',
        `Grupo sanguíneo: ${atleta.grupoSanguineo}`,
        `Seguro médico: ${atleta.seguroMedico}`,
        `Emergencia: ${atleta.contactoEmergenciaNombre} (${atleta.contactoEmergenciaParentesco}) ${atleta.contactoEmergenciaTelefono}`,
        '',
        `Club de procedencia: ${atleta.clubProcedencia}`,
        `Registro en club: ${atleta.fechaRegistroClub}`,
      ].join('\n')
    );
  };

  const confirmarEliminar = (atleta) => {
    Alert.alert(
      'Eliminar atleta',
      `¿Seguro que desea eliminar a ${atleta.nombres} ${atleta.apellidos}? Esta acción se reflejará en el estado global.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => dispatch(deleteAtleta(atleta.id)),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.bg }]} edges={['left', 'right']}>
      <Header title="Atletas" icon="swimmer" />
      <FlatList
        data={resultados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.headerStack}>
            <ScreenHeader
              icon="swimmer"
              title="Repositorio de Nadadores"
              subtitle="Módulo de control de atletas, datos médicos y federativos."
              buttonTitle="Registrar Atleta"
              onPressButton={() => navigation.navigate('AtletaForm')}
            />

            <View style={[styles.searchCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <View
                style={[
                  styles.searchInput,
                  { backgroundColor: theme.inputBg, borderColor: theme.inputBorder },
                ]}
              >
                <FontAwesome name="search" size={14} color={theme.textMuted} />
                <TextInput
                  value={query}
                  onChangeText={setQuery}
                  placeholder="Buscar por nombre o cédula..."
                  placeholderTextColor={theme.textMuted}
                  style={[styles.searchText, { color: theme.text }]}
                />
              </View>
              <View style={[styles.countBadge, { backgroundColor: theme.primarySoft, borderColor: `${theme.primary}44` }]}>
                <Text style={[styles.countText, { color: theme.primary }]}>
                  {resultados.length} Registrados
                </Text>
              </View>
            </View>
          </View>
        }
        ListEmptyComponent={
          <EmptyState icon="search" message="No se encontraron atletas que coincidan con la búsqueda." />
        }
        renderItem={({ item }) => (
          <AtletaCard
            atleta={item}
            onView={() => verDetalle(item)}
            onEdit={() => navigation.navigate('AtletaForm', { id: item.id })}
            onDelete={() => confirmarEliminar(item)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  headerStack: {
    marginBottom: 16,
    gap: 14,
  },
  searchCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchText: {
    flex: 1,
    fontSize: 13.5,
    paddingVertical: 0,
  },
  countBadge: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  countText: {
    fontSize: 10.5,
    fontWeight: '800',
  },
});
