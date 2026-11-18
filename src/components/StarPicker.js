import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ratingColors } from '../config/theme';
import { useTheme } from '../context/ThemeContext';

export default function StarPicker({ value, onChange, error }) {
  const { theme } = useTheme();

  return (
    <View>
      <View style={styles.row}>
        {[1, 2, 3, 4, 5].map((numero) => {
          const paleta = ratingColors[numero - 1];
          const seleccionado = value === numero;
          return (
            <Pressable
              key={numero}
              onPress={() => onChange(numero)}
              style={({ pressed }) => [
                styles.circulo,
                { backgroundColor: paleta.bg, borderColor: paleta.border },
                seleccionado && { transform: [{ scale: 1.15 }], borderWidth: 2 },
                !seleccionado && pressed && { transform: [{ scale: 1.08 }] },
              ]}
            >
              <Text style={[styles.numero, { color: paleta.text }, seleccionado && styles.numeroActivo]}>
                {numero}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={[styles.ayuda, { color: theme.textMuted }]}>
        1 = Necesita trabajo · 3 = Bueno · 5 = Excelente
      </Text>
      {error ? (
        <Text style={[styles.error, { color: theme.dangerText }]}>• {error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  circulo: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numero: {
    fontSize: 14,
    fontWeight: '800',
  },
  numeroActivo: {
    fontSize: 15,
  },
  ayuda: {
    fontSize: 10,
    marginTop: 8,
  },
  error: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
});
