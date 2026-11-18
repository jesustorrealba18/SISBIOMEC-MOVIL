import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '../context/ThemeContext';
import EstadoBadge from './EstadoBadge';

function iniciales(nombres, apellidos) {
  const primera = (texto) => (texto || '').trim().charAt(0).toUpperCase();
  return `${primera(nombres)}${primera(apellidos)}` || '?';
}

export default function AtletaCard({ atleta, onView, onEdit, onDelete }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={styles.main}>
        <View style={[styles.avatar, { backgroundColor: theme.primarySoft }]}>
          <Text style={[styles.avatarText, { color: theme.primary }]}>
            {iniciales(atleta.nombres, atleta.apellidos)}
          </Text>
        </View>
        <View style={styles.info}>
          <Text style={[styles.nombre, { color: theme.text }]} numberOfLines={1}>
            {atleta.nombres} {atleta.apellidos}
          </Text>
          <Text style={[styles.detalle, { color: theme.textSecondary }]} numberOfLines={1}>
            {atleta.cedula} · {atleta.categoria}
          </Text>
          <View style={styles.chips}>
            <View style={[styles.chipFeveda, { backgroundColor: theme.primarySoft }]}>
              <Text style={[styles.chipText, { color: theme.primary }]}>{atleta.numeroFeveda}</Text>
            </View>
          </View>
        </View>
        <EstadoBadge estado={atleta.estado} />
      </View>

      <View style={[styles.actions, { borderTopColor: theme.border }]}>
        <Pressable onPress={onView} style={({ pressed }) => [styles.action, pressed && { opacity: 0.6 }]}>
          <FontAwesome name="eye" size={14} color={theme.info} />
          <Text style={[styles.actionText, { color: theme.info }]}>Ver</Text>
        </Pressable>
        <Pressable onPress={onEdit} style={({ pressed }) => [styles.action, pressed && { opacity: 0.6 }]}>
          <FontAwesome name="pencil" size={14} color={theme.primary} />
          <Text style={[styles.actionText, { color: theme.primary }]}>Editar</Text>
        </Pressable>
        <Pressable onPress={onDelete} style={({ pressed }) => [styles.action, pressed && { opacity: 0.6 }]}>
          <FontAwesome name="trash" size={14} color={theme.danger} />
          <Text style={[styles.actionText, { color: theme.danger }]}>Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
    overflow: 'hidden',
  },
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 17,
    fontWeight: '800',
  },
  info: {
    flex: 1,
    gap: 4,
  },
  nombre: {
    fontSize: 15,
    fontWeight: '700',
  },
  detalle: {
    fontSize: 12,
  },
  chips: {
    flexDirection: 'row',
  },
  chipFeveda: {
    borderRadius: 7,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  chipText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  actions: {
    flexDirection: 'row',
    borderTopWidth: 1,
  },
  action: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    paddingVertical: 11,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
