import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '../context/ThemeContext';
import PrimaryButton from './PrimaryButton';

export default function ScreenHeader({ icon, title, subtitle, buttonTitle, onPressButton }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={styles.textWrap}>
        <View style={styles.titleRow}>
          <FontAwesome name={icon} size={18} color={theme.primary} />
          <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        </View>
        {subtitle ? <Text style={[styles.subtitle, { color: theme.textSecondary }]}>{subtitle}</Text> : null}
      </View>
      {buttonTitle ? (
        <PrimaryButton title={buttonTitle} icon="plus-circle" onPress={onPressButton} small />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    flexWrap: 'wrap',
  },
  textWrap: {
    flex: 1,
    minWidth: 200,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 12,
    marginTop: 5,
    lineHeight: 16,
  },
});
