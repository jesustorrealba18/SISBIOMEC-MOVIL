import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import EstadoBadge from '../components/EstadoBadge';
import { useTheme } from '../context/ThemeContext';

export default function HomePage({ navigation }) {
  const { theme } = useTheme();
  const atletas = useSelector((state) => state.atletas);
  const observaciones = useSelector((state) => state.observaciones);

  const activos = atletas.filter((atleta) => atleta.estado === 'Activo').length;
  const promedio =
    observaciones.length > 0
      ? (observaciones.reduce((suma, obs) => suma + obs.calificacion, 0) / observaciones.length).toFixed(1)
      : '—';
  const ultimos = atletas.slice(0, 3);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.bg }]} edges={['left', 'right']}>
      <Header title="Inicio" icon="home" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.heroTitle, { color: theme.text }]}>
            Bienvenido al Sistema SGRD
          </Text>
          <Text style={[styles.heroText, { color: theme.textSecondary }]}>
            Gestión y rendimiento deportivo de nadadores. Información consultada en tiempo real
            desde el estado global (Redux Toolkit).
          </Text>
        </View>

        <View style={styles.grid}>
          <StatCard icon="swimmer" value={atletas.length} label="Atletas registrados" color={theme.primary} />
          <StatCard icon="check-circle" value={activos} label="Atletas activos" color={theme.success} />
          <StatCard icon="clipboard-check" value={observaciones.length} label="Observaciones técnicas" color={theme.info} />
          <StatCard icon="star" value={promedio} label="Calificación promedio" color={theme.warning} />
        </View>

        <Text style={[styles.section, { color: theme.text }]}>Accesos rápidos</Text>
        <View style={styles.grid}>
          <Pressable
            onPress={() => navigation.navigate('Atletas')}
            style={({ pressed }) => [
              styles.acceso,
              { backgroundColor: theme.card, borderColor: theme.border },
              pressed && { opacity: 0.8 },
            ]}
          >
            <View style={[styles.accesoIcon, { backgroundColor: theme.primarySoft }]}>
              <FontAwesome name="swimmer" size={20} color={theme.primary} />
            </View>
            <Text style={[styles.accesoText, { color: theme.text }]}>Atletas</Text>
            <FontAwesome name="chevron-right" size={13} color={theme.textMuted} />
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Observaciones')}
            style={({ pressed }) => [
              styles.acceso,
              { backgroundColor: theme.card, borderColor: theme.border },
              pressed && { opacity: 0.8 },
            ]}
          >
            <View style={[styles.accesoIcon, { backgroundColor: theme.primarySoft }]}>
              <FontAwesome name="eye" size={20} color={theme.primary} />
            </View>
            <Text style={[styles.accesoText, { color: theme.text }]}>Observaciones</Text>
            <FontAwesome name="chevron-right" size={13} color={theme.textMuted} />
          </Pressable>
        </View>

        <Text style={[styles.section, { color: theme.text }]}>Últimos atletas registrados</Text>
        <View style={[styles.ultimosCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          {ultimos.map((atleta, indice) => (
            <View
              key={atleta.id}
              style={[
                styles.ultimoRow,
                indice < ultimos.length - 1 && { borderBottomWidth: 1, borderBottomColor: theme.border },
              ]}
            >
              <View style={[styles.ultimoAvatar, { backgroundColor: theme.primarySoft }]}>
                <Text style={[styles.ultimoInicial, { color: theme.primary }]}>
                  {atleta.nombres.charAt(0)}
                </Text>
              </View>
              <View style={styles.ultimoInfo}>
                <Text style={[styles.ultimoNombre, { color: theme.text }]} numberOfLines={1}>
                  {atleta.nombres} {atleta.apellidos}
                </Text>
                <Text style={[styles.ultimoDetalle, { color: theme.textSecondary }]} numberOfLines={1}>
                  {atleta.categoria} · {atleta.cedula}
                </Text>
              </View>
              <EstadoBadge estado={atleta.estado} />
            </View>
          ))}
          <Pressable onPress={() => navigation.navigate('Atletas')} style={({ pressed }) => [styles.verTodos, pressed && { opacity: 0.6 }]}>
            <Text style={[styles.verTodosText, { color: theme.primary }]}>VER TODOS LOS ATLETAS</Text>
          </Pressable>
        </View>
      </ScrollView>
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
    gap: 16,
  },
  hero: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 20,
    gap: 8,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '900',
  },
  heroText: {
    fontSize: 13,
    lineHeight: 19,
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
  },
  section: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 6,
  },
  acceso: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  accesoIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accesoText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
  },
  ultimosCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  ultimoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
  },
  ultimoAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ultimoInicial: {
    fontSize: 15,
    fontWeight: '800',
  },
  ultimoInfo: {
    flex: 1,
    gap: 2,
  },
  ultimoNombre: {
    fontSize: 14,
    fontWeight: '700',
  },
  ultimoDetalle: {
    fontSize: 11.5,
  },
  verTodos: {
    padding: 13,
    alignItems: 'center',
  },
  verTodosText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
});
