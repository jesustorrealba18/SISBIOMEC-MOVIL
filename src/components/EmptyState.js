import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '../context/ThemeContext';

export default function EmptyState({ icon = 'inbox', message }) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <FontAwesome name={icon} size={42} color={theme.textMuted} />
      <Text style={[styles.message, { color: theme.textSecondary }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    gap: 12,
  },
  message: {
    fontSize: 13,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});
