# SGRD Móvil — Sistema de Gestión y Rendimiento Deportivo (Unidad 3: Adapters)

Aplicación móvil en **React Native (Expo Snack)** para el proyecto sociotecnológico SGRD, sistema de gestión de nadadores de la piscina municipal. Esta entrega cubre los módulos de **Atletas** y **Observaciones Técnicas** del sistema web (SIS-Biomec), adaptados a móvil.

## Stack y librerías (Unidad 3)

| Librería | Uso en el proyecto |
|---|---|
| React Native + Expo | Desarrollo de la app móvil (Snack SDK 54) |
| React Navigation | Drawer Navigation (menú SGRD) + Stack Navigation (formularios), navegación programática y paso de parámetros |
| Redux Toolkit | Estado global como base de datos simulada (`atletas`, `observaciones`) |
| React Hook Form | Formularios con `useForm`, `Controller`, `handleSubmit`, `formState.errors` |
| expo-linear-gradient | Botones y acentos con degradado |
| @expo/vector-icons | Íconos FontAwesome |

## Estructura de carpetas

```
snack-sgrd/
├── App.js                     → Providers (Redux + Tema + SafeArea) y navegador
├── package.json               → Dependencias del proyecto
├── app.json                   → Configuración Expo
└── src/
    ├── components/            → Componentes reutilizables (Header, tarjetas, inputs, etc.)
    ├── config/
    │   ├── theme.js           → Paletas claro/oscuro (colores del sistema web)
    │   ├── menuItems.js       → Ítems del menú lateral SGRD
    │   └── catalogos.js       → Categorías, aspectos técnicos, grupos sanguíneos, etc.
    ├── context/ThemeContext.js→ Tema claro/oscuro + hook useTheme
    ├── hooks/
    │   ├── useSearch.js       → Custom Hook de búsqueda (AtletasPage)
    │   └── useFilters.js      → Custom Hook de filtrado múltiple (ObservacionesPage)
    ├── routes/AppNavigator.js → Drawer + Stack (navegación)
    ├── store/
    │   ├── index.js           → configureStore
    │   └── slices/            → atletasSlice, observacionesSlice (acciones y reducers)
    ├── utils/
    │   ├── fechas.js          → Utilidades de fecha (formato DD/MM/AAAA)
    │   └── validaciones.js    → Regex y validadores (cédula, teléfono, correo, fechas)
    └── views/                 → Pantallas: Home, Atletas, AtletaForm, Observaciones, ObservacionForm
```

## Cobertura de la evaluación

| Criterio | Dónde se cumple |
|---|---|
| Pantallas (Home + Formularios) | `views/HomePage.js`, `views/AtletasPage.js`, `views/AtletaFormPage.js`, `views/ObservacionesPage.js`, `views/ObservacionFormPage.js` |
| Componentes reutilizables (≥3) con props | `src/components/` (14 componentes): Header, PrimaryButton, LabeledInput, LabeledSelect, CampoTexto, CampoSeleccion, EstadoBadge, Stepper, StarPicker, StarDisplay, AtletaCard, ObservacionCard, StatCard, EmptyState |
| React Navigation | `src/routes/AppNavigator.js`: Drawer (Inicio, Atletas, Observaciones) + Stack (formularios). Navegación programática: guardar → `goBack()`, tarjetas → `navigate('AtletaForm', { id })`. **Paso de parámetros**: modo edición recibe `{ id }` y precarga el formulario con `reset()` |
| React Hook Form + validaciones | `AtletaFormPage` (stepper de 3 pasos, validación por paso con `trigger`) y `ObservacionFormPage`. Validaciones: obligatorios, formatos (cédula `V-12345678`, teléfono `0412-1234567`, correo, FEVEDA `FED-00123`), longitudes mín/máx, fechas no futuras, mensajes de error por campo |
| Redux Toolkit | `src/store/`: `configureStore`, `createSlice` con estados iniciales (datos de prueba), acciones `addAtleta`, `updateAtleta`, `deleteAtleta`, `addObservacion`. Consulta con `useSelector` desde Home, listados y formularios; escritura con `useDispatch` |
| Custom Hooks | `useSearch` (búsqueda en listado de atletas), `useFilters` (filtros de observaciones) y `useTheme` (tema) |
| StyleSheet y organización | Todos los componentes usan `StyleSheet.create`; carpetas por responsabilidad |

## Cómo ejecutar en Expo Snack

1. Entrar a https://snack.expo.dev e iniciar sesión.
2. Opción A: **Import** → subir este proyecto (zip) o conectar el repositorio.
3. Opción B: Crear un **New Snack** y crear manualmente los archivos/copiar el contenido respetando la estructura.
4. Snack instala las dependencias automáticamente al detectar los imports (el `package.json` lista las mismas por si se ejecuta localmente con `npx expo start`).
5. Probar en preview web, o con la app **Expo Go** escaneando el QR.

## Funcionalidades para la demostración

- **Home**: resumen estadístico leído del estado global (total de atletas, activos, observaciones, promedio de calificación) y accesos rápidos.
- **Atletas**: búsqueda en tiempo real (custom hook), tarjetas con badge de estado, ver detalle, **registrar** y **editar** (navegación con parámetros) y **eliminar** con confirmación — todo persistido en Redux durante la ejecución.
- **Formulario de atleta**: stepper de 3 pasos (Personales → Médicos → Federativos). SIGUIENTE valida el paso actual; GUARDAR solo se habilita si el último paso es válido. En modo edición se precargan los datos del atleta.
- **Observaciones Técnicas**: filtros combinables (atleta, aspecto, texto) con custom hook, resumen por atleta con promedios, y registro con calificación 1-5 por colores.
- **Tema claro/oscuro** conmutables desde el header (paleta exacta del sistema web).
- **Menú lateral SGRD** con los módulos del sistema (los no incluidos en la demo muestran un aviso).

## Integración futura del login

La pantalla de inicio de sesión la desarrolla otro integrante. Para integrarla:
1. Crear `src/views/LoginPage.js`.
2. En `src/routes/AppNavigator.js`, agregar `<Stack.Screen name="Login" component={LoginPage} />` y colocarla como primera pantalla del Stack (o como `initialRouteName`) hasta validar credenciales contra un `authSlice`.

## Notas

- Los datos son ficticios y viven solo en memoria (Redux), según lo permitido por la pauta.
- Sin backend ni base de datos real.
