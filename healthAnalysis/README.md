# Sistema de Censo de Salud

Una aplicación web interactiva para la gestión y análisis de datos de pacientes, desarrollada como parte del laboratorio práctico de análisis de datos de salud. Ahora con dependencias modernas, gráficos interactivos y herramientas de desarrollo profesionales.

## 📋 Características Principales

### ✅ Interfaz de Entrada de Datos Interactiva
- Formulario HTML completo con validación avanzada
- Campos para información personal y médica
- Validación en tiempo real de datos con feedback visual
- Manejo de errores y mensajes informativos
- Estados de validación con colores y animaciones

### ✅ Procesamiento y Análisis de Datos
- Almacenamiento en arrays de objetos JavaScript
- Búsqueda y filtrado por múltiples criterios
- Cálculo automático de IMC y categorización
- Categorización por grupos de edad automática
- Persistencia de datos en localStorage

### ✅ Generación Dinámica de Informes
- Informes por condición de salud con tablas dinámicas
- Informes por grupo de edad y género
- Informe general del sistema con estadísticas
- Visualización clara de datos estructurados

### ✅ Gráficos Interactivos (NUEVO)
- **Gráfico de Condiciones**: Distribución por condición de salud (doughnut)
- **Gráfico de Género**: Distribución por género (pie)
- **Gráfico de Edad**: Distribución por grupos de edad (bar)
- **Gráfico de IMC**: IMC promedio por condición (bar)
- Actualización automática en tiempo real
- Diseño responsive y profesional

### ✅ Interacción del Usuario y Manejo de Eventos
- Navegación fluida entre secciones (SPA)
- Búsqueda en tiempo real mientras escribes
- Interfaz 100% responsiva para todos los dispositivos
- Persistencia de datos entre sesiones
- Animaciones y transiciones suaves

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js 14.0+ (para herramientas de desarrollo)
- NPM 6.0+ (incluido con Node.js)
- Navegador web moderno (Chrome, Firefox, Safari, Edge)

### Instalación Completa
1. **Clona o descarga** todos los archivos del proyecto
2. **Instala las dependencias**:
   ```bash
   cd "cousera full IMB"
   npm install
   ```
3. **Verifica la instalación**:
   ```bash
   npm test
   ```
   Deberías ver: ✅ Todas las pruebas básicas pasaron!

### Métodos de Ejecución

#### 🔥 Método 1: Servidor de Desarrollo (Recomendado)
```bash
npm start
```
- ✅ Abre automáticamente en `http://localhost:3000/healthAnalysis/`
- ✅ Recarga automática al guardar cambios
- ✅ Ideal para desarrollo y personalización

#### ⚡ Método 2: Servidor HTTP Simple
```bash
npm run serve
```
- ✅ Abre en `http://localhost:8080`
- ✅ Más ligero para pruebas rápidas
- ✅ Sin recarga automática

#### 📁 Método 3: Apertura Directa
- Abre `healthAnalysis/index.html` directamente en tu navegador
- ⚠️ Algunas funciones avanzadas podrían estar limitadas

### Scripts Disponibles
```bash
npm start          # Servidor de desarrollo con live-reload
npm test           # Ejecutar pruebas de verificación
npm run build      # Minificar archivos para producción
npm run serve      # Servidor HTTP estático simple
```

### Cómo Usar la Aplicación

#### 1. Registro de Pacientes
- Ve a la sección "Registro de Pacientes"
- Completa el formulario con la información del paciente
- Los campos marcados con * son obligatorios
- Haz clic en "Registrar Paciente" para guardar

#### 2. Búsqueda de Pacientes
- Ve a la sección "Búsqueda"
- Usa los filtros disponibles:
  - Búsqueda por nombre (funciona en tiempo real)
  - Filtro por condición de salud
  - Filtro por rango de edad
- Los resultados se muestran automáticamente

#### 3. Informes
- Ve a la sección "Informes"
- Selecciona el tipo de informe deseado:
  - General: Resumen completo del sistema
  - Por Condición: Agrupación por problemas de salud
  - Por Edad: Distribución por grupos etarios
  - Por Género: Estadísticas por género
- Haz clic en "Generar Informe"

#### 4. Estadísticas y Gráficos
- Ve a la sección "Estadísticas"
- Visualiza métricas automáticas:
  - Total de pacientes registrados
  - Edad promedio de la población
  - Condición más común detectada
  - Distribuciones detalladas por categorías
- **Gráficos Interactivos**:
  - Distribución por condiciones de salud
  - Distribución por género
  - Grupos de edad
  - IMC promedio por condición
- Los gráficos se actualizan automáticamente

## 🛠️ Estructura del Código y Dependencias

### Dependencias Modernas Integradas

#### 📦 Dependencias de Producción
- **Bootstrap 5.3.2** - Framework CSS para interfaz responsive
- **Chart.js 4.4.0** - Biblioteca para gráficos interactivos
- **Font Awesome 4.7.0** - Iconos vectoriales profesionales

#### 🔧 Dependencias de Desarrollo
- **live-server 1.2.2** - Servidor de desarrollo con auto-reload
- **http-server 14.1.1** - Servidor HTTP estático
- **clean-css-cli 5.6.2** - Minificador de CSS
- **uglify-js 3.17.4** - Minificador de JavaScript
- **concurrently 8.2.2** - Ejecutor de tareas múltiples

### Archivos Principales

#### `index.html`
- Estructura HTML5 semántica y moderna
- Integración con Bootstrap y Chart.js
- Formularios interactivos con validación
- Navegación responsive
- Contenedores para gráficos dinámicos

#### `styles.css`
- Diseño moderno con gradientes y animaciones
- Grid layout completamente responsive
- Estilos para gráficos y visualizaciones
- Estados de validación visual
- Compatibilidad móvil optimizada

#### `script.js`
- Arquitectura orientada a objetos robusta
- Integración completa con Chart.js
- Manejo avanzado de eventos
- Validación de datos comprehensive
- Persistencia en localStorage
- Funciones de exportación y análisis

### Clases y Módulos Principales

#### Clase `Paciente`
```javascript
class Paciente {
    constructor(datos)
    calcularIMC()
    getCondicionCompleta()
    getEdadCategoria()
}
```

#### Módulo `Validacion`
- `validarNombre()`
- `validarEdad()`
- `validarEmail()`
- `validarTelefono()`

#### Módulo `UI` (Actualizado)
- `cambiarSeccion()` - Navegación SPA
- `mostrarError()` / `limpiarError()` - Validación visual
- `actualizarEstadisticas()` - Métricas en tiempo real
- `generarEstadisticasDetalladas()` - Análisis profundo
- **`crearGraficos()`** - Generación de visualizaciones
- **`crearGraficoCondiciones()`** - Gráfico de condiciones
- **`crearGraficoGenero()`** - Gráfico de género
- **`crearGraficoEdad()`** - Gráfico de grupos de edad
- **`crearGraficoIMC()`** - Gráfico de IMC promedio

#### Módulo `DataManager`
- `agregarPaciente()`
- `buscarPacientes()`
- `generarInforme()`
- `guardarEnLocalStorage()` / `cargarDesdeLocalStorage()`

## 📊 Funcionalidades Avanzadas

### 🎨 Gráficos Interactivos con Chart.js
- **Gráfico de Dona**: Distribución de condiciones de salud
  - Colores diferenciados por condición
  - Tooltips informativos
  - Leyenda interactiva
- **Gráfico Circular**: Distribución por género
  - Representación proporcional
  - Animaciones suaves
- **Gráfico de Barras**: Grupos de edad
  - Categorización automática
  - Escalas adaptativas
- **Gráfico de IMC**: Promedio por condición
  - Análisis de correlaciones
  - Rangos de salud visualizados

### ✅ Validación de Datos Avanzada
- **Nombres**: Solo letras y espacios, mínimo 2 caracteres, sin números
- **Edad**: Números entre 0 y 120 años con validación lógica
- **Email**: Formato RFC compliant con verificación de dominio
- **Teléfono**: Patrones internacionales aceptados
- **Estados Visuales**: Colores y iconos para feedback inmediato

### 🔄 Cálculos Automáticos Mejorados
- **IMC**: Calculado automáticamente con categorización (bajo peso, normal, sobrepeso, obesidad)
- **Categorías de Edad**: Clasificación inteligente por grupos etarios
- **Estadísticas Dinámicas**: Actualizadas en tiempo real sin recargas
- **Correlaciones**: Análisis automático de patrones en los datos

### 💾 Persistencia de Datos Robusta
- Guardado automático en `localStorage` tras cada acción
- Recuperación inteligente de datos al iniciar
- Validación de integridad de datos guardados
- Sistema de respaldo y recuperación ante errores

## 🧪 Datos de Ejemplo y Pruebas

### Cargar Datos de Demostración
Para probar la aplicación con datos de ejemplo, abre la consola del navegador (F12) y ejecuta:

```javascript
cargarDatosEjemplo();
```

Esto agregará 3 pacientes de ejemplo al sistema con diferentes condiciones de salud.

### Funciones de Prueba Disponibles
```javascript
// Cargar datos de ejemplo
cargarDatosEjemplo();

// Exportar datos a CSV
exportarDatos();

// Limpiar todos los datos
localStorage.clear(); // Luego recargar la página

// Ver datos almacenados
console.log(pacientes);
```

### Verificación del Sistema
```bash
npm test  # Ejecuta pruebas básicas de funcionamiento
```

## 📤 Exportación de Datos

Para exportar los datos a CSV, ejecuta en la consola:

```javascript
exportarDatos();
```

## 🔧 Personalización y Desarrollo

### Agregar Nuevas Condiciones de Salud
Edita el `<select>` en `index.html`:

```html
<option value="nueva-condicion">Nueva Condición</option>
```

### Personalizar Gráficos
Modifica los colores y estilos en `script.js`:

```javascript
// Ejemplo: cambiar colores del gráfico de condiciones
const coloresPersonalizados = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
    '#9966FF', '#FF9F40'  // Agrega más colores aquí
];
```

### Modificar Campos del Formulario
1. Agrega el campo HTML en `index.html`
2. Actualiza la clase `Paciente` en `script.js`
3. Agrega validación correspondiente en el módulo `Validacion`
4. Actualiza los gráficos si es necesario

### Cambiar Estilos y Tema
Modifica `styles.css` para personalizar:
- **Colores del tema**: Variables CSS en la parte superior
- **Tipografía**: Familias de fuentes y tamaños
- **Espaciado y layout**: Grid y flexbox
- **Animaciones**: Duraciones y efectos

### Scripts de Desarrollo
```bash
npm run dev          # Modo desarrollo con watch
npm run build        # Construcción para producción
npm run minify-css   # Solo minificar CSS
npm run minify-js    # Solo minificar JavaScript
```

## 🎯 Objetivos de Aprendizaje Cubiertos

### ✅ Interfaz de Entrada de Datos Interactiva
- Formularios HTML con validación
- Múltiples tipos de entrada (texto, radio, select, número)
- Manejo de eventos de usuario
- Validación en tiempo real

### ✅ Procesamiento y Análisis de Datos
- Arrays de objetos para almacenamiento
- Métodos de filtrado y búsqueda
- Manipulación de datos complejos
- Cálculos estadísticos

### ✅ Generación Dinámica de Informes
- Actualización del DOM
- Creación de contenido HTML dinámico
- Presentación de datos estadísticos
- Informes categorizados

### ✅ Interacción del Usuario y Manejo de Eventos
- Event listeners para múltiples eventos
- Navegación SPA (Single Page Application)
- Respuesta a acciones del usuario
- Actualización de interfaz en tiempo real

## 🌐 Compatibilidad y Rendimiento

### Navegadores Compatibles
- ✅ **Chrome 60+** (Recomendado)
- ✅ **Firefox 55+** 
- ✅ **Safari 12+**
- ✅ **Edge 79+**
- ✅ **Opera 47+**

### Dispositivos y Resoluciones
- 🖥️ **Desktop** (1200px+) - Experiencia completa
- 💻 **Tablet** (768px - 1199px) - Optimizado para touch
- 📱 **Mobile** (< 768px) - Interfaz adaptada

### Rendimiento
- ⚡ **Carga inicial**: < 2 segundos
- 🔄 **Gráficos**: Renderizado instantáneo
- 💾 **Datos**: Almacenamiento local eficiente
- 🎨 **Animaciones**: 60 FPS suaves

### Características Técnicas
- 📱 **Progressive Web App** ready
- ♿ **Accesibilidad** WCAG 2.1 compatible
- 🔒 **Seguridad**: Validación client-side robusta
- 🌍 **Internacionalización** preparada

## 🐛 Solución de Problemas

### Problemas Comunes y Soluciones

#### ❌ Los datos no se guardan
- **Causa**: Navegador en modo incógnito o localStorage deshabilitado
- **Solución**: 
  ```bash
  # Verificar localStorage en consola
  console.log(localStorage.getItem('healthAnalysis_pacientes'));
  # Usar navegador normal (no incógnito)
  ```

#### ❌ El formulario no valida correctamente
- **Causa**: JavaScript deshabilitado o errores de script
- **Solución**: 
  - Revisa que todos los campos obligatorios estén completos
  - Verifica el formato de email y teléfono
  - Abre la consola (F12) para ver errores

#### ❌ Las estadísticas/gráficos no se actualizan
- **Causa**: Chart.js no cargado o conflictos de versión
- **Solución**:
  ```bash
  # Reinstalar dependencias
  npm install
  npm start
  # Navega a otra sección y regresa a Estadísticas
  ```

#### ❌ npm start no funciona
- **Causa**: Dependencias no instaladas o puerto ocupado
- **Solución**:
  ```bash
  # Verificar instalación
  npm install
  # Usar puerto alternativo
  npx live-server --port=3001 healthAnalysis/
  ```

#### ❌ Gráficos no se muestran
- **Causa**: Archivo abierto directamente vs servidor web
- **Solución**: 
  - Usar `npm start` o `npm run serve`
  - No abrir index.html directamente
  - Verificar consola del navegador para errores de Chart.js

#### ❌ Errores 404 en dependencias
- **Causa**: node_modules no instalado correctamente
- **Solución**:
  ```bash
  # Limpiar e instalar
  rm -rf node_modules package-lock.json
  npm install
  ```

### Diagnóstico Avanzado
```bash
# Verificar estado del proyecto
npm test

# Ver logs detallados
npm start --verbose

# Verificar dependencias
npm list --depth=0
```

## 👨‍💻 Desarrollo y Contribución

### Estructura de Archivos del Proyecto
```
cousera full IMB/
├── package.json              # Configuración del proyecto y dependencias
├── package-lock.json         # Lockfile de dependencias
├── node_modules/             # Dependencias instaladas
├── test/
│   └── basic-tests.js        # Pruebas de verificación básica
├── DEVELOPMENT.md            # Guía detallada para desarrolladores
├── SETUP-COMPLETO.md         # Instrucciones de instalación completa
└── healthAnalysis/
    ├── index.html            # Página principal de la aplicación
    ├── styles.css            # Estilos personalizados y responsive
    ├── script.js             # Lógica JavaScript y Chart.js
    └── README.md             # Este archivo de documentación
```

### Tecnologías Utilizadas
- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Frameworks**: Bootstrap 5.3.2
- **Visualización**: Chart.js 4.4.0
- **Iconografía**: Font Awesome 4.7.0
- **Herramientas**: Node.js, NPM, live-server

### Flujo de Desarrollo Recomendado
1. **Instalar dependencias**: `npm install`
2. **Iniciar desarrollo**: `npm start`
3. **Hacer cambios** en los archivos
4. **Probar automáticamente** (live-reload)
5. **Verificar funcionalidad**: `npm test`
6. **Construir para producción**: `npm run build`

### Próximas Mejoras Planificadas
- [ ] 📊 Más tipos de gráficos (líneas, radar, scatter)
- [ ] 📄 Exportación a PDF con gráficos
- [ ] 🔐 Sistema de autenticación de usuarios
- [ ] 🌐 API REST para almacenamiento remoto
- [ ] 📱 PWA (Progressive Web App) completa
- [ ] 🔔 Notificaciones push
- [ ] 🏥 Integración con sistemas hospitalarios
- [ ] 🤖 Análisis predictivo con ML

### Contribuir al Proyecto
1. **Fork** del repositorio
2. **Crear rama** para tu feature: `git checkout -b feature/nueva-funcionalidad`
3. **Realizar cambios** y commits descriptivos
4. **Ejecutar pruebas**: `npm test`
5. **Enviar pull request** con descripción detallada

## 📄 Licencia y Reconocimientos

### Licencia
Este proyecto es parte de un laboratorio educativo y está disponible bajo la licencia MIT para uso académico y de aprendizaje.

### Bibliotecas y Frameworks Utilizados
- **Bootstrap** - Framework CSS (MIT License)
- **Chart.js** - Biblioteca de gráficos (MIT License)  
- **Font Awesome** - Iconos vectoriales (SIL OFL 1.1 License)
- **live-server** - Servidor de desarrollo (MIT License)

### Reconocimientos
- Desarrollado como parte del **curso de Análisis de Datos de Salud**
- Basado en mejores prácticas de desarrollo web moderno
- Optimizado para objetivos de aprendizaje específicos

## 🤝 Contribuciones y Soporte

### Reportar Problemas
Para reportar bugs o solicitar features:
1. Verifica que el problema no esté ya reportado
2. Incluye pasos para reproducir el problema
3. Especifica navegador y versión
4. Adjunta capturas de pantalla si es relevante

### Obtener Ayuda
- 📚 Consulta `DEVELOPMENT.md` para guía detallada
- 🔧 Revisa `SETUP-COMPLETO.md` para instalación
- 🐛 Sigue la sección "Solución de Problemas" arriba
- 💬 Usa la consola del navegador para debugging

### Contacto del Proyecto
- **Propósito**: Laboratorio educativo de análisis de datos de salud
- **Nivel**: Intermedio a avanzado
- **Tiempo estimado**: 40+ minutos (expandido)
- **Última actualización**: Septiembre 2025

---

## 🎉 ¡Comenzar Ahora!

### Inicio Rápido (3 pasos)
```bash
# 1. Instalar dependencias
npm install

# 2. Verificar instalación  
npm test

# 3. Ejecutar aplicación
npm start
```

**🚀 Tu aplicación estará disponible en `http://localhost:3000/healthAnalysis/`**

### Demo Rápida
1. **Registra pacientes** usando el formulario
2. **Busca y filtra** datos por criterios
3. **Genera informes** categorizados  
4. **Visualiza estadísticas** con gráficos interactivos

---

**✨ ¡Disfruta desarrollando y aprendiendo con tu Sistema de Censo de Salud! ✨**

*Desarrollado como parte del laboratorio práctico de análisis de datos de salud - Ahora con dependencias modernas y visualizaciones avanzadas*