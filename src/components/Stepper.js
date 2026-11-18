import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '../context/ThemeContext';

export default function Stepper({ steps, currentStep, onStepPress }) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {steps.map((paso, indice) => {
        const numero = indice + 1;
        const activo = numero === currentStep;
        const completado = numero < currentStep;

        const circulo = (
          <View
            style={[
              styles.circle,
              { borderColor: theme.borderStrong, backgroundColor: theme.cardAlt },
              activo && { borderColor: theme.primary, backgroundColor: theme.primary },
              completado && { borderColor: theme.success, backgroundColor: theme.success },
            ]}
          >
            {completado ? (
              <FontAwesome name="check" size={15} color="#ffffff" />
            ) : (
              <Text
                style={[
                  styles.circleText,
                  { color: theme.textMuted },
                  activo && { color: '#ffffff' },
                ]}
              >
                {numero}
              </Text>
            )}
          </View>
        );

        const contenido = (
          <View key={paso.titulo} style={styles.stepItem}>
            <Pressable
              disabled={!completado}
              onPress={() => onStepPress && onStepPress(numero)}
            >
              {circulo}
            </Pressable>
            <Text
              style={[
                styles.label,
                { color: theme.textMuted },
                activo && { color: theme.primary, fontWeight: '800' },
                completado && { color: theme.successText, fontWeight: '700' },
              ]}
            >
              {paso.titulo}
            </Text>
          </View>
        );

        if (numero < steps.length) {
          return (
            <React.Fragment key={paso.titulo}>
              {contenido}
              <View
                style={[
                  styles.line,
                  { backgroundColor: theme.border },
                  completado && { backgroundColor: theme.success },
                ]}
              />
            </React.Fragment>
          );
        }
        return contenido;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
    paddingHorizontal: 4,
  },
  stepItem: {
    alignItems: 'center',
    gap: 6,
    maxWidth: 96,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleText: {
    fontSize: 14,
    fontWeight: '800',
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    textAlign: 'center',
  },
  line: {
    flex: 1,
    height: 2,
    marginHorizontal: 8,
    marginTop: -18,
    borderRadius: 1,
  },
});
