import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '../context/ThemeContext';

export default function PrimaryButton({
  title,
  icon,
  onPress,
  small = false,
  disabled = false,
  secondary = false,
}) {
  const { theme } = useTheme();

  const contenido = (
    <View style={styles.content}>
      {icon ? (
        <FontAwesome name={icon} size={small ? 12 : 14} color={secondary ? theme.text : '#ffffff'} />
      ) : null}
      <Text style={[styles.label, secondary && { color: theme.text }]}>{title}</Text>
    </View>
  );

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
    >
      {secondary ? (
        <View
          style={[
            styles.base,
            styles.secondary,
            {
              backgroundColor: theme.cardAlt,
              borderColor: theme.border,
            },
            small ? styles.small : styles.large,
            disabled && styles.disabled,
          ]}
        >
          {contenido}
        </View>
      ) : (
        <LinearGradient
          colors={['#4f46e5', '#9333ea']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.base, small ? styles.small : styles.large, disabled && styles.disabled]}
        >
          {contenido}
        </LinearGradient>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 14,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  base: {
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  secondary: {
    borderWidth: 1,
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  small: {
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
  large: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  disabled: {
    opacity: 0.55,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 12,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});
