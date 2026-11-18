import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '../context/ThemeContext';

export default function LabeledSelect({
  label,
  options,
  selectedValue,
  onSelect,
  placeholder = 'Seleccione...',
  error,
}) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [abierto, setAbierto] = useState(false);

  const seleccion = options.find((opcion) => opcion.value === selectedValue);
  const textoVisible = seleccion ? seleccion.label : placeholder;

  const elegir = (valor) => {
    onSelect(valor);
    setAbierto(false);
  };

  return (
    <View style={styles.container}>
      {label ? <Text style={[styles.label, { color: theme.primary }]}>{label}</Text> : null}
      <Pressable
        onPress={() => setAbierto(true)}
        style={[
          styles.trigger,
          {
            backgroundColor: theme.inputBg,
            borderColor: error ? theme.danger : theme.inputBorder,
          },
        ]}
      >
        <Text
          style={[
            styles.triggerText,
            { color: seleccion ? theme.text : theme.textMuted },
          ]}
          numberOfLines={1}
        >
          {textoVisible}
        </Text>
        <FontAwesome name="chevron-down" size={12} color={theme.textMuted} />
      </Pressable>
      {error ? (
        <Text style={[styles.errorText, { color: theme.dangerText }]}>• {error}</Text>
      ) : null}

      <Modal visible={abierto} transparent animationType="slide" onRequestClose={() => setAbierto(false)}>
        <Pressable style={[styles.overlay, { backgroundColor: theme.overlay }]} onPress={() => setAbierto(false)}>
          <View style={[styles.sheet, { backgroundColor: theme.card, paddingBottom: insets.bottom + 12 }]}>
            <View style={[styles.sheetBar, { backgroundColor: theme.border }]} />
            <FlatList
              data={options}
              keyExtractor={(item) => String(item.value)}
              renderItem={({ item }) => {
                const activo = item.value === selectedValue;
                return (
                  <Pressable
                    onPress={() => elegir(item.value)}
                    style={({ pressed }) => [
                      styles.option,
                      activo && { backgroundColor: theme.primarySoft },
                      pressed && { opacity: 0.7 },
                    ]}
                  >
                    <Text style={[styles.optionText, { color: activo ? theme.primary : theme.text }]}>
                      {item.label}
                    </Text>
                    {activo ? <FontAwesome name="check" size={14} color={theme.primary} /> : null}
                  </Pressable>
                );
              }}
            />
          </View>
        </Pressable>
      </Modal>
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
  trigger: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  triggerText: {
    fontSize: 14,
    flex: 1,
  },
  errorText: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 5,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    maxHeight: '55%',
    paddingTop: 10,
  },
  sheetBar: {
    alignSelf: 'center',
    width: 44,
    height: 5,
    borderRadius: 3,
    marginBottom: 6,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  optionText: {
    fontSize: 15,
  },
});
