import React, { useMemo, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import ScreenHeader from '../components/ScreenHeader';
import ObservacionCard from '../components/ObservacionCard';
import EmptyState from '../components/EmptyState';
import LabeledSelect from '../components/LabeledSelect';
import StarDisplay from '../components/StarDisplay';
import { useTheme } from '../context/ThemeContext';
import { useFilters } from '../hooks/useFilters';
import { ASPECTOS_TECNICOS } from '../config/catalogos';

export default function ObservacionesPage({ navigation }) {
  const { theme } = useTheme();
  const atletas = useSelector((state) => state.atletas);
  const observaciones = useSelector((state) => state.observaciones);
  const [resumenAtleta, setResumenAtleta] = useState('');

  const nombreDe = (id) => {
    const atleta = atletas.find((item) => item.id === id);
    return atleta ? `${atleta.nombres} ${atleta.apellidos}` : 'Atleta eliminado';
  };

  const items = useMemo(
    () => observaciones.map((obs) => ({ ...obs, atletaNombre: nombreDe(obs.idAtleta) })),
    [observaciones, atletas]
  );

  const { filters, setFilter, resultados } = useFilters(items, ['atletaNombre', 'aspecto', 'observacion']);

  const opcionesAtletas = [
    { label: 'Todos los Atletas', value: '' },
    ...atletas.map((atleta) => ({
      label: `${atleta.nombres} ${atleta.apellidos}`,
      value: atleta.id,
    })),
  ];

  const resumen = useMemo(() => {
    if (!resumenAtleta) return null;
    const propias = observaciones.filter((obs) => obs.idAtleta === resumenAtleta);
    if (propias.length === 0) return { nombre: nombreDe(resumenAtleta), filas: [], promedio: 0 };
    const grupos = {};
    propias.forEach((obs) => {
      if (!grupos[obs.aspecto]) grupos[obs.aspecto] = [];
      grupos[obs.aspecto].push(obs.calificacion);
    });
    const filas = Object.keys(grupos).map((aspecto) => {
      const promedio = grupos[aspecto].reduce((a, b) => a + b, 0) / grupos[aspecto].length;
      return { aspecto, promedio };
    });
    const general = propias.reduce((suma, obs) => suma + obs.calificacion, 0) / propias.length;
    return { nombre: nombreDe(resumenAtleta), filas, promedio: general };
  }, [resumenAtleta, observaciones, atletas]);

  const verDetalle = (obs) => {
    Alert.alert(
      `${obs.atletaNombre} · ${obs.aspecto}`,
      [
        `Fecha: ${obs.fecha}`,
        `Calificación: ${obs.calificacion}/5`,
        `Sesión: ${obs.sesion}`,
        '',
        obs.observacion || 'Sin observación textual registrada.',
      ].join('\n')
    );
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.bg }]} edges={['left', 'right']}>
      <Header title="Observaciones Técnicas" icon="eye" />
      <FlatList
        data={resultados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.headerStack}>
            <ScreenHeader
              icon="clipboard-check"
              title="Evaluaciones Técnicas"
              subtitle="Evaluaciones cualitativas de la técnica del nadador por sesión."
              buttonTitle="Registrar Observación"
              onPressButton={() => navigation.navigate('ObservacionForm')}
            />

            <View style={[styles.filtrosCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <View style={styles.filtrosTitulo}>
                <FontAwesome name="filter" size={12} color={theme.primary} />
                <Text style={[styles.filtrosTexto, { color: theme.textSecondary }]}>
                  FILTROS DE BÚSQUEDA
                </Text>
              </View>
              <LabeledSelect
                options={opcionesAtletas}
                selectedValue={filters.atleta}
                onSelect={(valor) => setFilter('atleta', valor)}
              />
              <LabeledSelect
                options={[{ label: 'Todos los Aspectos', value: '' }, ...ASPECTOS_TECNICOS]}
                selectedValue={filters.aspecto}
                onSelect={(valor) => setFilter('aspecto', valor)}
              />
              <View style={[styles.buscador, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder }]}>
                <FontAwesome name="search" size={13} color={theme.textMuted} />
                <TextInput
                  value={filters.query}
                  onChangeText={(texto) => setFilter('query', texto)}
                  placeholder="Buscar en observaciones..."
                  placeholderTextColor={theme.textMuted}
                  style={[styles.buscadorText, { color: theme.text }]}
                />
              </View>
              <LabeledSelect
                options={opcionesAtletas}
                selectedValue={resumenAtleta}
                onSelect={setResumenAtleta}
                placeholder="Resumen por Atleta"
              />
            </View>

            {resumen ? (
              <View style={[styles.resumenCard, { backgroundColor: theme.card, borderColor: theme.primary }]}>
                <View style={styles.resumenHead}>
                  <FontAwesome name="chart-bar" size={14} color={theme.primary} />
                  <Text style={[styles.resumenTitulo, { color: theme.text }]} numberOfLines={1}>
                    {resumen.nombre}
                  </Text>
                  <View style={[styles.resumenPromedio, { backgroundColor: theme.primarySoft }]}>
                    <Text style={[styles.resumenPromedioText, { color: theme.primary }]}>
                      {resumen.filas.length > 0 ? `Promedio ${resumen.promedio.toFixed(1)}` : 'Sin datos'}
                    </Text>
                  </View>
                </View>
                {resumen.filas.map((fila) => (
                  <View key={fila.aspecto} style={styles.resumenFila}>
                    <Text style={[styles.resumenAspecto, { color: theme.textSecondary }]} numberOfLines={1}>
                      {fila.aspecto}
                    </Text>
                    <StarDisplay value={Math.round(fila.promedio)} />
                    <Text style={[styles.resumenNumero, { color: theme.text }]}>
                      {fila.promedio.toFixed(1)}
                    </Text>
                  </View>
                ))}
              </View>
            ) : null}
          </View>
        }
        ListEmptyComponent={
          <EmptyState icon="clipboard-check" message="No hay observaciones que coincidan con los filtros aplicados." />
        }
        renderItem={({ item }) => (
          <ObservacionCard observacion={item} nombreAtleta={item.atletaNombre} onView={() => verDetalle(item)} />
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
  filtrosCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
    gap: 10,
  },
  filtrosTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  filtrosTexto: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  buscador: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
  },
  buscadorText: {
    flex: 1,
    fontSize: 13.5,
    paddingVertical: 0,
  },
  resumenCard: {
    borderRadius: 18,
    borderWidth: 1.5,
    padding: 16,
    gap: 12,
  },
  resumenHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  resumenTitulo: {
    flex: 1,
    fontSize: 15,
    fontWeight: '800',
  },
  resumenPromedio: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  resumenPromedioText: {
    fontSize: 11,
    fontWeight: '800',
  },
  resumenFila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  resumenAspecto: {
    flex: 1,
    fontSize: 12.5,
  },
  resumenNumero: {
    fontSize: 12.5,
    fontWeight: '800',
    width: 26,
    textAlign: 'right',
  },
});
