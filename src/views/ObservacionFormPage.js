import React from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { addObservacion } from '../store/slices/observacionesSlice';
import Header from '../components/Header';
import CampoTexto from '../components/CampoTexto';
import CampoSeleccion from '../components/CampoSeleccion';
import PrimaryButton from '../components/PrimaryButton';
import StarPicker from '../components/StarPicker';
import { useTheme } from '../context/ThemeContext';
import { ASPECTOS_TECNICOS, SESIONES } from '../config/catalogos';

const VALORES_INICIALES = {
  idAtleta: '',
  aspecto: '',
  sesion: 'Sin sesión asociada',
  calificacion: null,
  observacion: '',
};

export default function ObservacionFormPage({ navigation }) {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const atletas = useSelector((state) => state.atletas);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: VALORES_INICIALES,
    mode: 'onSubmit',
  });

  const opcionesAtletas = atletas.map((atleta) => ({
    label: `${atleta.nombres} ${atleta.apellidos} (${atleta.cedula})`,
    value: atleta.id,
  }));

  const guardar = (datos) => {
    dispatch(addObservacion(datos));
    Alert.alert(
      'Guardado exitoso',
      'La observación técnica fue registrada en el estado global.',
      [{ text: 'Aceptar', onPress: () => navigation.goBack() }]
    );
  };

  const cancelar = () => {
    Alert.alert('Cancelar registro', '¿Desea salir sin guardar la observación?', [
      { text: 'Continuar editando', style: 'cancel' },
      { text: 'Salir', style: 'destructive', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.bg }]} edges={['left', 'right']}>
      <Header title="Nueva Observación" icon="eye" showBack />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={styles.titleRow}>
              <View style={styles.titleIcon}>
                <FontAwesome name="clipboard-check" size={15} color="#ffffff" />
              </View>
              <Text style={[styles.title, { color: theme.text }]}>Registrar Observación Técnica</Text>
            </View>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              Los atletas disponibles se consultan del estado global (Redux).
            </Text>

            <CampoSeleccion
              control={control}
              name="idAtleta"
              label="Atleta *"
              options={opcionesAtletas}
              placeholder="Seleccione un atleta..."
              rules={{ required: 'Debe seleccionar un atleta' }}
            />

            <CampoSeleccion
              control={control}
              name="aspecto"
              label="Aspecto Técnico *"
              options={ASPECTOS_TECNICOS}
              placeholder="Seleccione un aspecto..."
              rules={{ required: 'Debe seleccionar el aspecto técnico evaluado' }}
            />

            <CampoSeleccion
              control={control}
              name="sesion"
              label="Sesión (Opcional)"
              options={SESIONES}
              rules={{}}
            />

            <Text style={[styles.label, { color: theme.primary }]}>CALIFICACIÓN *</Text>
            <Controller
              control={control}
              name="calificacion"
              rules={{
                validate: (valor) => valor >= 1 || 'Seleccione una calificación del 1 al 5',
              }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <StarPicker value={value} onChange={onChange} error={error?.message} />
              )}
            />

            <View style={{ marginTop: 8 }}>
              <CampoTexto
                control={control}
                name="observacion"
                label="Observación Textual"
                placeholder="Notas detalladas sobre la técnica observada..."
                multiline
                numberOfLines={3}
                rules={{
                  maxLength: { value: 500, message: 'Máximo 500 caracteres' },
                }}
              />
            </View>

            <View style={styles.botones}>
              <PrimaryButton title="Cancelar" icon="times" onPress={cancelar} secondary />
              <View style={styles.botonGuardar}>
                <PrimaryButton title="Guardar Observación" icon="save" onPress={handleSubmit(guardar)} />
              </View>
            </View>

            {Object.keys(errors).length > 0 ? (
              <Text style={[styles.errorGlobal, { color: theme.dangerText }]}>
                Complete los campos obligatorios marcados en rojo.
              </Text>
            ) : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  titleIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#4f46e5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    flex: 1,
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 20,
    lineHeight: 17,
  },
  label: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  botones: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 24,
  },
  botonGuardar: {
    flex: 2,
  },
  errorGlobal: {
    fontSize: 11.5,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 14,
  },
});
