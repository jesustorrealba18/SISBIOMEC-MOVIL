import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '../context/ThemeContext';
import { MENU_ITEMS } from '../config/menuItems';

export default function DrawerContent({ state, navigation }) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const rutaActiva = state.routes[state.index]?.name;

  const alPresionarItem = (item) => {
    if (item.route) {
      navigation.navigate(item.route);
    } else {
      Alert.alert(
        'Módulo no disponible',
        `"${item.label}" no está incluido en la demostración de la Unidad 3. Los módulos disponibles son: Atletas y Observaciones Técnicas.`
      );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.card, paddingTop: insets.top }]}>
      <View style={[styles.logoRow, { borderBottomColor: theme.border }]}>
        <View style={styles.logoIcon}>
          <FontAwesome name="swimmer" size={20} color="#ffffff" />
        </View>
        <Text style={[styles.logoText, { color: theme.text }]}>SGRD</Text>
      </View>

      <ScrollView contentContainerStyle={styles.menu}>
        <Text style={[styles.sectionLabel, { color: theme.textMuted }]}>MENÚ PRINCIPAL</Text>
        {MENU_ITEMS.map((item) => {
          const activo = item.route === rutaActiva;
          return (
            <Pressable
              key={item.label}
              onPress={() => alPresionarItem(item)}
              style={({ pressed }) => [
                styles.item,
                activo && { backgroundColor: theme.primarySoft },
                pressed && { opacity: 0.7 },
              ]}
            >
              <FontAwesome
                name={item.icon}
                size={17}
                color={activo ? theme.primary : theme.textSecondary}
              />
              <Text
                style={[
                  styles.itemLabel,
                  { color: activo ? theme.primary : theme.text },
                  activo && styles.itemLabelActivo,
                ]}
                numberOfLines={2}
              >
                {item.label}
              </Text>
              {item.route ? null : <View style={[styles.pronto, { backgroundColor: theme.border }]}><Text style={[styles.prontoText, { color: theme.textMuted }]}>DEMO</Text></View>}
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: theme.border }]}>
        <Text style={[styles.footerText, { color: theme.textMuted }]}>SGRD · Unidad 3: Adapters</Text>
        <Text style={[styles.footerText, { color: theme.textMuted }]}>v1.0.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
  },
  logoIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#4f46e5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 22,
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: -1,
  },
  menu: {
    padding: 12,
    paddingBottom: 24,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 10,
    paddingHorizontal: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 11,
    borderRadius: 12,
    marginBottom: 2,
    minHeight: 44,
  },
  itemLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  itemLabelActivo: {
    fontWeight: '700',
  },
  pronto: {
    borderRadius: 6,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  prontoText: {
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  footer: {
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  footerText: {
    fontSize: 11,
  },
});
