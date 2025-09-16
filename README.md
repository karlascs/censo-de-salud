# 🏥 Sistema de Censo de Salud

[![Estado del Proyecto](https://img.shields.io/badge/estado-activo-brightgreen)](https://github.com/karlascs/censo-de-salud)
[![Licencia](https://img.shields.io/badge/licencia-MIT-blue)](LICENSE)
[![Node.js](https://img.shields.io/badge/node.js-%3E%3D14.0.0-green)](https://nodejs.org/)

> **Aplicación web interactiva para la gestión y análisis de datos de pacientes** desarrollada como parte del laboratorio práctico de análisis de datos de salud.

## 🌟 Características Destacadas

- 📋 **Formularios Interactivos** con validación en tiempo real
- 📊 **Gráficos Dinámicos** con Chart.js (dona, barras, circulares)
- 🔍 **Búsqueda Avanzada** por múltiples criterios
- 📱 **Diseño Responsive** con Bootstrap 5
- 💾 **Persistencia Local** de datos
- 📈 **Informes Automáticos** por categorías
- ⚡ **Desarrollo Ágil** con live-reload

## 🚀 Inicio Rápido

### Prerrequisitos
- [Node.js](https://nodejs.org/) 14.0 o superior
- NPM (incluido con Node.js)
- Navegador web moderno

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/karlascs/censo-de-salud.git

# Navegar al directorio
cd censo-de-salud

# Instalar dependencias
npm install

# Ejecutar la aplicación
npm start
```

La aplicación se abrirá automáticamente en `http://localhost:3000/healthAnalysis/`

## 📦 Dependencias

### Producción
- **Bootstrap 5.3.2** - Framework CSS responsive
- **Chart.js 4.4.0** - Gráficos interactivos
- **Font Awesome 4.7.0** - Iconografía profesional

### Desarrollo
- **live-server** - Servidor de desarrollo con auto-reload
- **http-server** - Servidor HTTP estático
- **clean-css-cli** - Minificador CSS
- **uglify-js** - Minificador JavaScript

## 🎯 Funcionalidades Principales

### 📝 Gestión de Pacientes
- Formulario completo de registro con validación
- Campos para información personal y médica
- Cálculo automático de IMC
- Categorización por grupos de edad

### 📊 Visualización de Datos
- **Gráfico de Condiciones**: Distribución por problemas de salud
- **Gráfico de Género**: Representación demográfica
- **Gráfico de Edad**: Distribución por grupos etarios
- **Gráfico de IMC**: Promedios por condición

### 🔍 Análisis y Búsqueda
- Búsqueda en tiempo real por nombre
- Filtros por condición de salud
- Filtros por rango de edad
- Combinación de múltiples criterios

### 📈 Generación de Informes
- Informe general del sistema
- Informes por condición de salud
- Informes por grupo de edad
- Informes por género

## 🛠️ Scripts Disponibles

```bash
npm start          # Servidor de desarrollo con live-reload
npm test           # Ejecutar pruebas básicas
npm run serve      # Servidor HTTP simple
npm run build      # Minificar archivos para producción
```

## 📱 Compatibilidad

### Navegadores
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

### Dispositivos
- 🖥️ Desktop (1200px+)
- 💻 Tablet (768px - 1199px)
- 📱 Mobile (< 768px)

## 🧪 Datos de Prueba

Para probar rápidamente la aplicación, abre la consola del navegador (F12) y ejecuta:

```javascript
cargarDatosEjemplo(); // Carga 3 pacientes de ejemplo
```

## 📂 Estructura del Proyecto

```
censo-de-salud/
├── healthAnalysis/           # Aplicación principal
│   ├── index.html           # Página principal
│   ├── styles.css           # Estilos personalizados
│   ├── script.js            # Lógica de la aplicación
│   └── README.md            # Documentación detallada
├── test/
│   └── basic-tests.js       # Pruebas de verificación
├── package.json             # Configuración del proyecto
├── .gitignore              # Archivos excluidos de Git
└── README.md               # Este archivo
```

## 🎓 Objetivos de Aprendizaje

Este proyecto cubre los siguientes objetivos educativos:

- ✅ **Interfaz de Entrada de Datos Interactiva**
- ✅ **Procesamiento y Análisis de Datos**
- ✅ **Generación Dinámica de Informes**
- ✅ **Interacción del Usuario y Manejo de Eventos**

## 🔧 Personalización

### Agregar Nuevas Condiciones
Edita las opciones en `healthAnalysis/index.html`:

```html
<option value="nueva-condicion">Nueva Condición</option>
```

### Personalizar Gráficos
Modifica los colores en `healthAnalysis/script.js`:

```javascript
const coloresPersonalizados = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'
];
```

## 🐛 Solución de Problemas

### Los gráficos no aparecen
```bash
# Asegúrate de usar un servidor web
npm start
# No abras index.html directamente
```

### Error en npm install
```bash
# Limpiar caché e intentar de nuevo
npm cache clean --force
npm install
```

## 🤝 Contribuir

1. Fork del proyecto
2. Crear una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Autor

- **Karla** - *Desarrollo inicial* - [@karlascs](https://github.com/karlascs)

## 🙏 Reconocimientos

- Desarrollado como parte del **curso de Análisis de Datos de Salud**
- Utiliza bibliotecas open source: Bootstrap, Chart.js, Font Awesome
- Basado en mejores prácticas de desarrollo web moderno

---

## 🔗 Enlaces Útiles

- [Documentación de Bootstrap](https://getbootstrap.com/docs/5.3/)
- [Documentación de Chart.js](https://www.chartjs.org/docs/)
- [Guía de Git](https://git-scm.com/doc)

---

**⭐ Si este proyecto te resulta útil, ¡no olvides darle una estrella!**

*Desarrollado con ❤️ para el aprendizaje de análisis de datos de salud*