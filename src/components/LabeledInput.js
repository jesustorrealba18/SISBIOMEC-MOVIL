import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function LabeledInput({ label, error, ...inputProps }) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {label ? <Text style={[styles.label, { color: theme.primary }]}>{label}</Text> : null}
      <TextInput
        placeholderTextColor={theme.textMuted}
        {...inputProps}
        style={[
          styles.input,
          {
            backgroundColor: theme.inputBg,
            borderColor: error ? theme.danger : theme.inputBorder,
            color: theme.text,
          },
          inputProps.style,
        ]}
      />
      {error ? (
        <View style={styles.errorRow}>
          <Text style={[styles.errorText, { color: theme.dangerText }]}>• {error}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  label: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
  },
  errorRow: {
    marginTop: 5,
  },
  errorText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
