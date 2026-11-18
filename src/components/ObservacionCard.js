import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '../context/ThemeContext';
import StarDisplay from './StarDisplay';

export default function ObservacionCard({ observacion, nombreAtleta, onView }) {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onView}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.card, borderColor: theme.border },
        pressed && { opacity: 0.85 },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={[styles.atleta, { color: theme.text }]} numberOfLines={1}>
            {nombreAtleta}
          </Text>
          <Text style={[styles.fecha, { color: theme.textMuted }]}>{observacion.fecha}</Text>
        </View>
        <StarDisplay value={observacion.calificacion} />
      </View>

      <View style={[styles.chip, { backgroundColor: theme.primarySoft }]}>
        <FontAwesome name="crosshairs" size={11} color={theme.primary} />
        <Text style={[styles.chipText, { color: theme.primary }]}>{observacion.aspecto}</Text>
      </View>

      {observacion.observacion ? (
        <Text style={[styles.observacion, { color: theme.textSecondary }]} numberOfLines={2}>
          {observacion.observacion}
        </Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    marginBottom: 12,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  headerLeft: {
    flex: 1,
    gap: 3,
  },
  atleta: {
    fontSize: 15,
    fontWeight: '700',
  },
  fecha: {
    fontSize: 11,
  },
  chip: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  chipText: {
    fontSize: 11,
    fontWeight: '700',
  },
  observacion: {
    fontSize: 12.5,
    lineHeight: 17,
  },
});
