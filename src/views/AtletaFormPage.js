import React, { useEffect, useMemo, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { addAtleta, updateAtleta } from '../store/slices/atletasSlice';
import Header from '../components/Header';
import Stepper from '../components/Stepper';
import CampoTexto from '../components/CampoTexto';
import CampoSeleccion from '../components/CampoSeleccion';
import PrimaryButton from '../components/PrimaryButton';
import { useTheme } from '../context/ThemeContext';
import {
  CATEGORIAS,
  ESTADOS_ATLETA,
  GRUPOS_SANGUINEOS,
  PARENTESCOS,
  SEXOS,
} from '../config/catalogos';
import { REGEX, validarFechaNacimiento, validarFechaNoFutura } from '../utils/validaciones';

const PASOS = [
  {
    titulo: 'Personales',
    campos: [
      'cedula', 'nombres', 'apellidos', 'fechaNacimiento', 'sexo', 'estado',
      'direccion', 'telefono', 'correo', 'fechaRegistroClub',
    ],
  },
  {
    titulo: 'Médicos',
    campos: [
      'grupoSanguineo', 'seguroMedico', 'alergias', 'condicionesPrevias',
      'contactoEmergenciaNombre', 'contactoEmergenciaTelefono', 'contactoEmergenciaParentesco',
    ],
  },
  { titulo: 'Federativos', campos: ['numeroFeveda', 'clubProcedencia', 'categoria'] },
];

const VALORES_INICIALES = {
  cedula: '',
  nombres: '',
  apellidos: '',
  fechaNacimiento: '',
  sexo: '',
  estado: 'Activo',
  direccion: '',
  telefono: '',
  correo: '',
  fechaRegistroClub: '',
  grupoSanguineo: '',
  seguroMedico: '',
  alergias: '',
  condicionesPrevias: '',
  contactoEmergenciaNombre: '',
  contactoEmergenciaTelefono: '',
  contactoEmergenciaParentesco: '',
  numeroFeveda: '',
  clubProcedencia: '',
  categoria: '',
};

const REGLAS = {
  cedula: {
    required: 'La cédula es obligatoria',
    pattern: { value: REGEX.cedula, message: 'Formato inválido. Ej: V-12345678' },
  },
  nombres: {
    required: 'Los nombres son obligatorios',
    minLength: { value: 2, message: 'Mínimo 2 caracteres' },
    maxLength: { value: 100, message: 'Máximo 100 caracteres' },
    pattern: { value: REGEX.letras, message: 'Solo se permiten letras' },
  },
  apellidos: {
    required: 'Los apellidos son obligatorios',
    minLength: { value: 2, message: 'Mínimo 2 caracteres' },
    maxLength: { value: 100, message: 'Máximo 100 caracteres' },
    pattern: { value: REGEX.letras, message: 'Solo se permiten letras' },
  },
  fechaNacimiento: {
    required: 'La fecha de nacimiento es obligatoria',
    validate: validarFechaNacimiento,
  },
  sexo: { required: 'Seleccione el sexo' },
  estado: { required: 'Seleccione el estado' },
  direccion: {
    required: 'La dirección es obligatoria',
    maxLength: { value: 200, message: 'Máximo 200 caracteres' },
  },
  telefono: {
    required: 'El teléfono es obligatorio',
    pattern: { value: REGEX.telefono, message: 'Formato: 0412-1234567' },
  },
  correo: {
    required: 'El correo es obligatorio',
    pattern: { value: REGEX.correo, message: 'Ingrese un correo válido' },
    maxLength: { value: 100, message: 'Máximo 100 caracteres' },
  },
  fechaRegistroClub: {
    required: 'La fecha de registro es obligatoria',
    validate: validarFechaNoFutura,
  },
  grupoSanguineo: { required: 'Seleccione el grupo sanguíneo' },
  seguroMedico: {
    required: 'El seguro médico es obligatorio',
    maxLength: { value: 100, message: 'Máximo 100 caracteres' },
  },
  alergias: {
    required: 'Indique las alergias o escriba "Ninguna"',
    maxLength: { value: 500, message: 'Máximo 500 caracteres' },
  },
  condicionesPrevias: {
    required: 'Indique las condiciones o escriba "Ninguna"',
    maxLength: { value: 500, message: 'Máximo 500 caracteres' },
  },
  contactoEmergenciaNombre: {
    required: 'El nombre del contacto es obligatorio',
    pattern: { value: REGEX.letras, message: 'Solo se permiten letras' },
    maxLength: { value: 100, message: 'Máximo 100 caracteres' },
  },
  contactoEmergenciaTelefono: {
    required: 'El teléfono de emergencia es obligatorio',
    pattern: { value: REGEX.telefono, message: 'Formato: 0412-1234567' },
  },
  contactoEmergenciaParentesco: { required: 'Seleccione el parentesco' },
  numeroFeveda: {
    required: 'El número FEVEDA es obligatorio',
    pattern: { value: REGEX.feveda, message: 'Formato: FED-00123' },
    maxLength: { value: 50, message: 'Máximo 50 caracteres' },
  },
  clubProcedencia: {
    required: 'El club de procedencia es obligatorio',
    maxLength: { value: 100, message: 'Máximo 100 caracteres' },
  },
  categoria: { required: 'Seleccione una categoría deportiva' },
};

export default function AtletaFormPage({ route, navigation }) {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const atletas = useSelector((state) => state.atletas);

  const idEdicion = route.params?.id;
  const esEdicion = Boolean(idEdicion);
  const atleta = useMemo(
    () => atletas.find((item) => item.id === idEdicion),
    [atletas, idEdicion]
  );

  const { control, handleSubmit, trigger, reset, formState: { errors } } = useForm({
    defaultValues: atleta ?? VALORES_INICIALES,
    mode: 'onBlur',
  });

  const [paso, setPaso] = useState(1);

  useEffect(() => {
    reset(atleta ?? VALORES_INICIALES);
    setPaso(1);
  }, [idEdicion]);

  const guardar = (datos) => {
    if (esEdicion) {
      dispatch(updateAtleta({ ...datos, id: idEdicion }));
    } else {
      dispatch(addAtleta(datos));
    }
    Alert.alert(
      'Guardado exitoso',
      esEdicion
        ? 'El atleta fue actualizado en el estado global.'
        : 'El atleta fue registrado en el estado global.',
      [{ text: 'Aceptar', onPress: () => navigation.goBack() }]
    );
  };

  const avanzar = async () => {
    const camposDelPaso = PASOS[paso - 1].campos;
    const valido = await trigger(camposDelPaso);
    if (!valido) return;
    if (paso < PASOS.length) {
      setPaso(paso + 1);
    } else {
      handleSubmit(guardar)();
    }
  };

  const cancelar = () => {
    Alert.alert('Cancelar registro', '¿Desea salir sin guardar los cambios?', [
      { text: 'Continuar editando', style: 'cancel' },
      { text: 'Salir', style: 'destructive', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.bg }]} edges={['left', 'right']}>
      <Header title={esEdicion ? 'Editar Atleta' : 'Registrar Atleta'} icon="swimmer" showBack />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={styles.titleRow}>
              <View style={styles.titleIcon}>
                <FontAwesome name="swimmer" size={16} color="#ffffff" />
              </View>
              <Text style={[styles.title, { color: theme.text }]}>
                {esEdicion ? 'Editar Atleta' : 'Registrar Atleta'}
              </Text>
            </View>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              Complete los pasos del formulario. Cada paso se valida antes de avanzar.
            </Text>

            <Stepper steps={PASOS} currentStep={paso} onStepPress={(numero) => numero < paso && setPaso(numero)} />

            <View style={paso === 1 ? styles.paso : styles.oculto}>
              <CampoTexto control={control} name="cedula" rules={REGLAS.cedula} label="Cédula de Identidad" placeholder="V-12345678" autoCapitalize="characters" />
              <CampoTexto control={control} name="nombres" rules={REGLAS.nombres} label="Nombres" placeholder="Nombres del atleta" />
              <CampoTexto control={control} name="apellidos" rules={REGLAS.apellidos} label="Apellidos" placeholder="Apellidos del atleta" />
              <CampoTexto control={control} name="fechaNacimiento" rules={REGLAS.fechaNacimiento} label="Fecha de Nacimiento" placeholder="DD/MM/AAAA" keyboardType="numeric" />
              <CampoSeleccion control={control} name="sexo" rules={REGLAS.sexo} label="Sexo" options={SEXOS} placeholder="Seleccione..." />
              <CampoSeleccion control={control} name="estado" rules={REGLAS.estado} label="Estado" options={ESTADOS_ATLETA} />
              <CampoTexto control={control} name="direccion" rules={REGLAS.direccion} label="Dirección" placeholder="Dirección de residencia" />
              <CampoTexto control={control} name="telefono" rules={REGLAS.telefono} label="Teléfono" placeholder="0412-1234567" keyboardType="phone-pad" />
              <CampoTexto control={control} name="correo" rules={REGLAS.correo} label="Correo Electrónico" placeholder="correo@ejemplo.com" keyboardType="email-address" autoCapitalize="none" />
              <CampoTexto control={control} name="fechaRegistroClub" rules={REGLAS.fechaRegistroClub} label="Fecha Registro Club" placeholder="DD/MM/AAAA" keyboardType="numeric" />

              <View style={[styles.fotoBox, { borderColor: theme.border, backgroundColor: theme.cardAlt }]}>
                <View style={[styles.fotoCircle, { borderColor: theme.borderStrong, backgroundColor: theme.inputBg }]}>
                  <FontAwesome name="camera" size={18} color={theme.textMuted} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.fotoTitulo, { color: theme.text }]}>Fotografía del atleta</Text>
                  <Text style={[styles.fotoDetalle, { color: theme.textMuted }]}>
                    JPG/PNG, máx 2MB (no disponible en la demostración)
                  </Text>
                </View>
              </View>
            </View>

            <View style={paso === 2 ? styles.paso : styles.oculto}>
              <CampoSeleccion control={control} name="grupoSanguineo" rules={REGLAS.grupoSanguineo} label="Grupo Sanguíneo" options={GRUPOS_SANGUINEOS} placeholder="Sin especificar" />
              <CampoTexto control={control} name="seguroMedico" rules={REGLAS.seguroMedico} label="Seguro Médico" placeholder="Nombre del seguro" />
              <CampoTexto control={control} name="alergias" rules={REGLAS.alergias} label="Alergias Conocidas" placeholder="Describa las alergias conocidas..." multiline numberOfLines={2} />
              <CampoTexto control={control} name="condicionesPrevias" rules={REGLAS.condicionesPrevias} label="Condiciones Médicas Preexistentes" placeholder="Asma, lesiones crónicas, etc..." multiline numberOfLines={2} />

              <View style={[styles.emergencia, { borderColor: theme.border, backgroundColor: theme.cardAlt }]}>
                <View style={styles.emergenciaTitulo}>
                  <FontAwesome name="phone" size={11} color={theme.primary} />
                  <Text style={[styles.emergenciaTexto, { color: theme.primary }]}>CONTACTO DE EMERGENCIA</Text>
                </View>
                <CampoTexto control={control} name="contactoEmergenciaNombre" rules={REGLAS.contactoEmergenciaNombre} label="Nombre" placeholder="Nombre completo" />
                <CampoTexto control={control} name="contactoEmergenciaTelefono" rules={REGLAS.contactoEmergenciaTelefono} label="Teléfono" placeholder="0412-1234567" keyboardType="phone-pad" />
                <CampoSeleccion control={control} name="contactoEmergenciaParentesco" rules={REGLAS.contactoEmergenciaParentesco} label="Parentesco" options={PARENTESCOS} placeholder="Seleccione..." />
              </View>
            </View>

            <View style={paso === 3 ? styles.paso : styles.oculto}>
              <CampoTexto control={control} name="numeroFeveda" rules={REGLAS.numeroFeveda} label="Número de Registro FEVEDA" placeholder="Ej: FED-00123" autoCapitalize="characters" />
              <CampoTexto control={control} name="clubProcedencia" rules={REGLAS.clubProcedencia} label="Club de Procedencia" placeholder="Club anterior" />
              <CampoSeleccion control={control} name="categoria" rules={REGLAS.categoria} label="Categoría Deportiva" options={CATEGORIAS} placeholder="Seleccione una categoría..." />
            </View>

            <View style={styles.botones}>
              <BotonSecundario
                label="Cancelar"
                onPress={cancelar}
                color={theme.textSecondary}
                fondo={theme.cardAlt}
              />
              {paso > 1 ? (
                <BotonSecundario
                  label="Atrás"
                  icon="arrow-left"
                  onPress={() => setPaso(paso - 1)}
                  color={theme.textSecondary}
                  fondo={theme.cardAlt}
                />
              ) : null}
              <View style={styles.botonPrincipal}>
                <PrimaryButton
                  title={paso < PASOS.length ? 'Siguiente' : 'Guardar Datos'}
                  icon={paso < PASOS.length ? 'arrow-right' : 'save'}
                  onPress={avanzar}
                />
              </View>
            </View>

            {Object.keys(errors).length > 0 ? (
              <Text style={[styles.errorGlobal, { color: theme.dangerText }]}>
                Revise los campos marcados en rojo para continuar.
              </Text>
            ) : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function BotonSecundario({ label, icon, onPress, color, fondo }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.btnSecundario, { backgroundColor: fondo }, pressed && { opacity: 0.7 }]}
    >
      {icon ? <FontAwesome name={icon} size={11} color={color} /> : null}
      <Text style={[styles.btnSecundarioTexto, { color }]}>{label}</Text>
    </Pressable>
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
    fontSize: 19,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 20,
    lineHeight: 17,
  },
  paso: {
    gap: 2,
  },
  oculto: {
    display: 'none',
  },
  fotoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginTop: 4,
  },
  fotoCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fotoTitulo: {
    fontSize: 13,
    fontWeight: '700',
  },
  fotoDetalle: {
    fontSize: 10.5,
    marginTop: 3,
  },
  emergencia: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginTop: 6,
  },
  emergenciaTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 12,
  },
  emergenciaTexto: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  botones: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 24,
    alignItems: 'center',
  },
  btnSecundario: {
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  btnSecundarioTexto: {
    fontSize: 11.5,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  botonPrincipal: {
    flex: 1,
  },
  errorGlobal: {
    fontSize: 11.5,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 14,
  },
});
