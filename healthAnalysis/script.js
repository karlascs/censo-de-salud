// Sistema de Censo de Salud - JavaScript
// Aplicación para gestión y análisis de datos de pacientes

// Almacenamiento de datos global
let pacientes = [];
let pacienteIdCounter = 1;

// Variables para gráficos
let condicionesChart = null;
let generoChart = null;
let edadChart = null;
let imcChart = null;

// Elementos del DOM
const elements = {
    // Navegación
    navLinks: document.querySelectorAll('.nav-link'),
    sections: document.querySelectorAll('.section'),
    
    // Formulario de registro
    patientForm: document.getElementById('patient-form'),
    condicionSalud: document.getElementById('condicion-salud'),
    otraCondicionGroup: document.getElementById('otra-condicion-group'),
    successMessage: document.getElementById('success-message'),
    
    // Búsqueda
    buscarNombre: document.getElementById('buscar-nombre'),
    buscarCondicion: document.getElementById('buscar-condicion'),
    buscarEdadMin: document.getElementById('buscar-edad-min'),
    buscarEdadMax: document.getElementById('buscar-edad-max'),
    btnBuscar: document.getElementById('btn-buscar'),
    btnLimpiarBusqueda: document.getElementById('btn-limpiar-busqueda'),
    listaPacientes: document.getElementById('lista-pacientes'),
    
    // Informes
    tipoInforme: document.getElementById('tipo-informe'),
    btnGenerarInforme: document.getElementById('btn-generar-informe'),
    contenidoInforme: document.getElementById('contenido-informe'),
    
    // Estadísticas
    totalPacientes: document.getElementById('total-pacientes'),
    edadPromedio: document.getElementById('edad-promedio'),
    condicionComun: document.getElementById('condicion-comun'),
    estadisticasDetalladas: document.getElementById('estadisticas-detalladas')
};

// Clase para representar un paciente
class Paciente {
    constructor(datos) {
        this.id = pacienteIdCounter++;
        this.nombre = datos.nombre;
        this.edad = parseInt(datos.edad);
        this.genero = datos.genero;
        this.telefono = datos.telefono || '';
        this.email = datos.email || '';
        this.fechaNacimiento = datos.fechaNacimiento || '';
        this.direccion = datos.direccion || '';
        this.condicionSalud = datos.condicionSalud;
        this.otraCondicion = datos.otraCondicion || '';
        this.gravedad = datos.gravedad || '';
        this.medicamentos = datos.medicamentos || '';
        this.peso = datos.peso ? parseFloat(datos.peso) : null;
        this.altura = datos.altura ? parseInt(datos.altura) : null;
        this.fechaRegistro = new Date();
        this.imc = this.calcularIMC();
    }

    calcularIMC() {
        if (this.peso && this.altura) {
            const alturaEnMetros = this.altura / 100;
            return (this.peso / (alturaEnMetros * alturaEnMetros)).toFixed(1);
        }
        return null;
    }

    getCondicionCompleta() {
        return this.condicionSalud === 'otra' ? this.otraCondicion : this.condicionSalud;
    }

    getEdadCategoria() {
        if (this.edad < 18) return 'Menor de edad';
        if (this.edad < 30) return 'Joven adulto';
        if (this.edad < 50) return 'Adulto';
        if (this.edad < 65) return 'Adulto mayor';
        return 'Tercera edad';
    }
}

// Utilidades de validación
const Validacion = {
    // Validar nombre
    validarNombre(nombre) {
        if (!nombre.trim()) {
            return { valido: false, mensaje: 'El nombre es obligatorio' };
        }
        if (nombre.trim().length < 2) {
            return { valido: false, mensaje: 'El nombre debe tener al menos 2 caracteres' };
        }
        if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(nombre.trim())) {
            return { valido: false, mensaje: 'El nombre solo puede contener letras y espacios' };
        }
        return { valido: true, mensaje: '' };
    },

    // Validar edad
    validarEdad(edad) {
        const edadNum = parseInt(edad);
        if (isNaN(edadNum)) {
            return { valido: false, mensaje: 'La edad debe ser un número' };
        }
        if (edadNum < 0 || edadNum > 120) {
            return { valido: false, mensaje: 'La edad debe estar entre 0 y 120 años' };
        }
        return { valido: true, mensaje: '' };
    },

    // Validar email
    validarEmail(email) {
        if (!email.trim()) return { valido: true, mensaje: '' }; // Email es opcional
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { valido: false, mensaje: 'Formato de email inválido' };
        }
        return { valido: true, mensaje: '' };
    },

    // Validar teléfono
    validarTelefono(telefono) {
        if (!telefono.trim()) return { valido: true, mensaje: '' }; // Teléfono es opcional
        
        const telefonoRegex = /^[\d\s\-\+\(\)]+$/;
        if (!telefonoRegex.test(telefono)) {
            return { valido: false, mensaje: 'Formato de teléfono inválido' };
        }
        return { valido: true, mensaje: '' };
    }
};

// Gestión de la interfaz de usuario
const UI = {
    // Cambiar sección activa
    cambiarSeccion(seccionId) {
        // Ocultar todas las secciones
        elements.sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Remover clase active de todos los enlaces
        elements.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Mostrar sección seleccionada
        const seccionDestino = document.getElementById(seccionId);
        if (seccionDestino) {
            seccionDestino.classList.add('active');
        }
        
        // Activar enlace correspondiente
        const linkActivo = document.getElementById(`nav-${seccionId.replace('-section', '')}`);
        if (linkActivo) {
            linkActivo.classList.add('active');
        }
        
        // Actualizar estadísticas si se cambia a esa sección
        if (seccionId === 'estadisticas-section') {
            this.actualizarEstadisticas();
            // Agregar un pequeño delay para asegurar que el DOM esté listo
            setTimeout(() => {
                this.crearGraficos();
            }, 100);
        }
    },

    // Mostrar mensaje de error
    mostrarError(elementoId, mensaje) {
        const errorElement = document.getElementById(elementoId + '-error');
        if (errorElement) {
            errorElement.textContent = mensaje;
            errorElement.style.display = 'block';
        }
        
        const formGroup = document.getElementById(elementoId).closest('.form-group');
        if (formGroup) {
            formGroup.classList.add('has-error');
            formGroup.classList.remove('has-success');
        }
    },

    // Limpiar errores
    limpiarError(elementoId) {
        const errorElement = document.getElementById(elementoId + '-error');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        
        const formGroup = document.getElementById(elementoId).closest('.form-group');
        if (formGroup) {
            formGroup.classList.remove('has-error');
            formGroup.classList.add('has-success');
        }
    },

    // Limpiar todos los errores
    limpiarTodosLosErrores() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });
        
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('has-error', 'has-success');
        });
    },

    // Mostrar mensaje de éxito
    mostrarExito() {
        elements.successMessage.style.display = 'block';
        setTimeout(() => {
            elements.successMessage.style.display = 'none';
        }, 3000);
    },

    // Actualizar estadísticas generales
    actualizarEstadisticas() {
        const total = pacientes.length;
        elements.totalPacientes.textContent = total;
        
        if (total > 0) {
            // Calcular edad promedio
            const edadPromedio = pacientes.reduce((sum, p) => sum + p.edad, 0) / total;
            elements.edadPromedio.textContent = edadPromedio.toFixed(1);
            
            // Encontrar condición más común
            const condiciones = {};
            pacientes.forEach(p => {
                const condicion = p.getCondicionCompleta();
                condiciones[condicion] = (condiciones[condicion] || 0) + 1;
            });
            
            const condicionMasComun = Object.keys(condiciones).reduce((a, b) => 
                condiciones[a] > condiciones[b] ? a : b
            );
            elements.condicionComun.textContent = condicionMasComun;
            
            // Generar estadísticas detalladas
            this.generarEstadisticasDetalladas();
            
            // Actualizar gráficos si estamos en la sección de estadísticas
            const estadisticasSection = document.getElementById('estadisticas-section');
            if (estadisticasSection && estadisticasSection.classList.contains('active')) {
                setTimeout(() => {
                    this.crearGraficos();
                }, 100);
            }
        } else {
            elements.edadPromedio.textContent = '0';
            elements.condicionComun.textContent = 'N/A';
            elements.estadisticasDetalladas.innerHTML = '<p class="text-muted">No hay datos disponibles</p>';
        }
    },

    // Generar estadísticas detalladas
    generarEstadisticasDetalladas() {
        if (pacientes.length === 0) return;
        
        let html = '';
        
        // Distribución por género
        const porGenero = this.agruparPor('genero');
        html += this.crearEstadisticaHTML('Distribución por Género', porGenero);
        
        // Distribución por grupo de edad
        const porEdad = this.agruparPorEdad();
        html += this.crearEstadisticaHTML('Distribución por Grupo de Edad', porEdad);
        
        // Distribución por condición de salud
        const porCondicion = {};
        pacientes.forEach(p => {
            const condicion = p.getCondicionCompleta();
            porCondicion[condicion] = (porCondicion[condicion] || 0) + 1;
        });
        html += this.crearEstadisticaHTML('Distribución por Condición de Salud', porCondicion);
        
        // Distribución por gravedad
        const porGravedad = this.agruparPor('gravedad');
        html += this.crearEstadisticaHTML('Distribución por Gravedad', porGravedad);
        
        elements.estadisticasDetalladas.innerHTML = html;
    },

    // Agrupar pacientes por propiedad
    agruparPor(propiedad) {
        const grupos = {};
        pacientes.forEach(p => {
            const valor = p[propiedad] || 'No especificado';
            grupos[valor] = (grupos[valor] || 0) + 1;
        });
        return grupos;
    },

    // Agrupar por edad
    agruparPorEdad() {
        const grupos = {};
        pacientes.forEach(p => {
            const categoria = p.getEdadCategoria();
            grupos[categoria] = (grupos[categoria] || 0) + 1;
        });
        return grupos;
    },

    // Crear HTML para estadística
    crearEstadisticaHTML(titulo, datos) {
        const total = Object.values(datos).reduce((sum, val) => sum + val, 0);
        let html = `<div class="stat-item">
                        <h4>${titulo}</h4>`;
        
        Object.entries(datos).forEach(([clave, valor]) => {
            const porcentaje = ((valor / total) * 100).toFixed(1);
            html += `<p><strong>${clave}:</strong> ${valor} pacientes (${porcentaje}%)</p>`;
        });
        
        html += '</div>';
        return html;
    },

    // Crear gráficos con Chart.js
    crearGraficos() {
        if (pacientes.length === 0) {
            this.limpiarGraficos();
            return;
        }

        this.crearGraficoCondiciones();
        this.crearGraficoGenero();
        this.crearGraficoEdad();
        this.crearGraficoIMC();
    },

    crearGraficoCondiciones() {
        const ctx = document.getElementById('condicionesChart');
        if (!ctx) return;

        const condiciones = {};
        pacientes.forEach(p => {
            const condicion = p.getCondicionCompleta();
            condiciones[condicion] = (condiciones[condicion] || 0) + 1;
        });

        const data = {
            labels: Object.keys(condiciones),
            datasets: [{
                data: Object.values(condiciones),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
                    '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF',
                    '#4BC0C0', '#FF6384', '#36A2EB'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        };

        if (condicionesChart) {
            condicionesChart.destroy();
        }

        condicionesChart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    },

    crearGraficoGenero() {
        const ctx = document.getElementById('generoChart');
        if (!ctx) return;

        const generos = this.agruparPor('genero');

        const data = {
            labels: Object.keys(generos).map(g => g.charAt(0).toUpperCase() + g.slice(1)),
            datasets: [{
                data: Object.values(generos),
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        };

        if (generoChart) {
            generoChart.destroy();
        }

        generoChart = new Chart(ctx, {
            type: 'pie',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    },

    crearGraficoEdad() {
        const ctx = document.getElementById('edadChart');
        if (!ctx) return;

        const grupos = this.agruparPorEdad();

        const data = {
            labels: Object.keys(grupos),
            datasets: [{
                label: 'Número de Pacientes',
                data: Object.values(grupos),
                backgroundColor: 'rgba(102, 126, 234, 0.8)',
                borderColor: '#667eea',
                borderWidth: 2,
                borderRadius: 5
            }]
        };

        if (edadChart) {
            edadChart.destroy();
        }

        edadChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    },

    crearGraficoIMC() {
        const ctx = document.getElementById('imcChart');
        if (!ctx) return;

        const imcPorCondicion = {};
        pacientes.forEach(p => {
            if (p.imc) {
                const condicion = p.getCondicionCompleta();
                if (!imcPorCondicion[condicion]) {
                    imcPorCondicion[condicion] = [];
                }
                imcPorCondicion[condicion].push(parseFloat(p.imc));
            }
        });

        const labels = Object.keys(imcPorCondicion);
        const promedios = labels.map(condicion => {
            const imcs = imcPorCondicion[condicion];
            return (imcs.reduce((sum, imc) => sum + imc, 0) / imcs.length).toFixed(1);
        });

        const data = {
            labels: labels,
            datasets: [{
                label: 'IMC Promedio',
                data: promedios,
                backgroundColor: 'rgba(255, 99, 132, 0.8)',
                borderColor: '#ff6384',
                borderWidth: 2,
                borderRadius: 5
            }]
        };

        if (imcChart) {
            imcChart.destroy();
        }

        imcChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 40,
                        ticks: {
                            stepSize: 5
                        }
                    }
                }
            }
        });
    },

    limpiarGraficos() {
        if (condicionesChart) {
            condicionesChart.destroy();
            condicionesChart = null;
        }
        if (generoChart) {
            generoChart.destroy();
            generoChart = null;
        }
        if (edadChart) {
            edadChart.destroy();
            edadChart = null;
        }
        if (imcChart) {
            imcChart.destroy();
            imcChart = null;
        }
    }
};

// Gestión de datos
const DataManager = {
    // Agregar nuevo paciente
    agregarPaciente(datos) {
        const paciente = new Paciente(datos);
        pacientes.push(paciente);
        this.guardarEnLocalStorage();
        return paciente;
    },

    // Buscar pacientes
    buscarPacientes(criterios) {
        let resultados = [...pacientes];
        
        // Filtrar por nombre
        if (criterios.nombre) {
            const nombreBusqueda = criterios.nombre.toLowerCase();
            resultados = resultados.filter(p => 
                p.nombre.toLowerCase().includes(nombreBusqueda)
            );
        }
        
        // Filtrar por condición
        if (criterios.condicion) {
            resultados = resultados.filter(p => 
                p.getCondicionCompleta().toLowerCase() === criterios.condicion.toLowerCase()
            );
        }
        
        // Filtrar por rango de edad
        if (criterios.edadMin !== null && !isNaN(criterios.edadMin)) {
            resultados = resultados.filter(p => p.edad >= criterios.edadMin);
        }
        
        if (criterios.edadMax !== null && !isNaN(criterios.edadMax)) {
            resultados = resultados.filter(p => p.edad <= criterios.edadMax);
        }
        
        return resultados;
    },

    // Generar informe
    generarInforme(tipo) {
        switch (tipo) {
            case 'general':
                return this.informeGeneral();
            case 'por-condicion':
                return this.informePorCondicion();
            case 'por-edad':
                return this.informePorEdad();
            case 'por-genero':
                return this.informePorGenero();
            default:
                return { titulo: 'Informe no disponible', contenido: '' };
        }
    },

    // Informe general
    informeGeneral() {
        if (pacientes.length === 0) {
            return {
                titulo: 'Informe General',
                contenido: '<p class="text-muted">No hay pacientes registrados</p>'
            };
        }

        const total = pacientes.length;
        const edadPromedio = (pacientes.reduce((sum, p) => sum + p.edad, 0) / total).toFixed(1);
        const masculinos = pacientes.filter(p => p.genero === 'masculino').length;
        const femeninos = pacientes.filter(p => p.genero === 'femenino').length;
        const otros = pacientes.filter(p => p.genero === 'otro').length;

        let contenido = `
            <h3>Resumen General del Sistema</h3>
            <div class="stats-grid">
                <div class="stat-card">
                    <h4>Total de Pacientes</h4>
                    <span class="stat-number">${total}</span>
                </div>
                <div class="stat-card">
                    <h4>Edad Promedio</h4>
                    <span class="stat-number">${edadPromedio}</span>
                </div>
            </div>
            
            <h4>Distribución por Género:</h4>
            <ul>
                <li>Masculino: ${masculinos} (${((masculinos/total)*100).toFixed(1)}%)</li>
                <li>Femenino: ${femeninos} (${((femeninos/total)*100).toFixed(1)}%)</li>
                <li>Otro: ${otros} (${((otros/total)*100).toFixed(1)}%)</li>
            </ul>
        `;

        return {
            titulo: 'Informe General',
            contenido: contenido
        };
    },

    // Informe por condición
    informePorCondicion() {
        const condiciones = {};
        pacientes.forEach(p => {
            const condicion = p.getCondicionCompleta();
            if (!condiciones[condicion]) {
                condiciones[condicion] = [];
            }
            condiciones[condicion].push(p);
        });

        let contenido = '<h3>Pacientes por Condición de Salud</h3>';
        
        Object.entries(condiciones).forEach(([condicion, pacientesCondicion]) => {
            contenido += `
                <div class="stat-item">
                    <h4>${condicion} (${pacientesCondicion.length} pacientes)</h4>
                    <table class="report-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Edad</th>
                                <th>Género</th>
                                <th>Gravedad</th>
                            </tr>
                        </thead>
                        <tbody>`;
            
            pacientesCondicion.forEach(p => {
                contenido += `
                    <tr>
                        <td>${p.nombre}</td>
                        <td>${p.edad}</td>
                        <td>${p.genero}</td>
                        <td>${p.gravedad || 'No especificada'}</td>
                    </tr>`;
            });
            
            contenido += '</tbody></table></div>';
        });

        return {
            titulo: 'Informe por Condición de Salud',
            contenido: contenido
        };
    },

    // Informe por edad
    informePorEdad() {
        const grupos = {};
        pacientes.forEach(p => {
            const categoria = p.getEdadCategoria();
            if (!grupos[categoria]) {
                grupos[categoria] = [];
            }
            grupos[categoria].push(p);
        });

        let contenido = '<h3>Pacientes por Grupo de Edad</h3>';
        
        Object.entries(grupos).forEach(([categoria, pacientesGrupo]) => {
            contenido += `
                <div class="stat-item">
                    <h4>${categoria} (${pacientesGrupo.length} pacientes)</h4>
                    <p>Edad promedio: ${(pacientesGrupo.reduce((sum, p) => sum + p.edad, 0) / pacientesGrupo.length).toFixed(1)} años</p>
                </div>`;
        });

        return {
            titulo: 'Informe por Grupo de Edad',
            contenido: contenido
        };
    },

    // Informe por género
    informePorGenero() {
        const generos = {};
        pacientes.forEach(p => {
            if (!generos[p.genero]) {
                generos[p.genero] = [];
            }
            generos[p.genero].push(p);
        });

        let contenido = '<h3>Pacientes por Género</h3>';
        
        Object.entries(generos).forEach(([genero, pacientesGenero]) => {
            const edadPromedio = (pacientesGenero.reduce((sum, p) => sum + p.edad, 0) / pacientesGenero.length).toFixed(1);
            
            contenido += `
                <div class="stat-item">
                    <h4>${genero.charAt(0).toUpperCase() + genero.slice(1)} (${pacientesGenero.length} pacientes)</h4>
                    <p>Edad promedio: ${edadPromedio} años</p>
                </div>`;
        });

        return {
            titulo: 'Informe por Género',
            contenido: contenido
        };
    },

    // Guardar en localStorage
    guardarEnLocalStorage() {
        try {
            localStorage.setItem('healthAnalysis_pacientes', JSON.stringify(pacientes));
            localStorage.setItem('healthAnalysis_counter', pacienteIdCounter.toString());
        } catch (error) {
            console.error('Error al guardar en localStorage:', error);
        }
    },

    // Cargar desde localStorage
    cargarDesdeLocalStorage() {
        try {
            const pacientesGuardados = localStorage.getItem('healthAnalysis_pacientes');
            const counterGuardado = localStorage.getItem('healthAnalysis_counter');
            
            if (pacientesGuardados) {
                const datosGuardados = JSON.parse(pacientesGuardados);
                pacientes = datosGuardados.map(datos => {
                    const paciente = new Paciente(datos);
                    paciente.id = datos.id;
                    paciente.fechaRegistro = new Date(datos.fechaRegistro);
                    return paciente;
                });
            }
            
            if (counterGuardado) {
                pacienteIdCounter = parseInt(counterGuardado);
            }
        } catch (error) {
            console.error('Error al cargar desde localStorage:', error);
            pacientes = [];
            pacienteIdCounter = 1;
        }
    }
};

// Event Listeners y inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos guardados
    DataManager.cargarDesdeLocalStorage();
    
    // Configurar navegación
    document.getElementById('nav-registro').addEventListener('click', (e) => {
        e.preventDefault();
        UI.cambiarSeccion('registro-section');
    });
    
    document.getElementById('nav-busqueda').addEventListener('click', (e) => {
        e.preventDefault();
        UI.cambiarSeccion('busqueda-section');
    });
    
    document.getElementById('nav-informes').addEventListener('click', (e) => {
        e.preventDefault();
        UI.cambiarSeccion('informes-section');
    });
    
    document.getElementById('nav-estadisticas').addEventListener('click', (e) => {
        e.preventDefault();
        UI.cambiarSeccion('estadisticas-section');
    });

    // Configurar formulario de registro
    elements.patientForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        UI.limpiarTodosLosErrores();
        
        // Recopilar datos del formulario
        const formData = new FormData(this);
        const datos = {};
        
        for (let [key, value] of formData.entries()) {
            datos[key] = value;
        }
        
        // Validar datos
        let esValido = true;
        
        const validacionNombre = Validacion.validarNombre(datos.nombre);
        if (!validacionNombre.valido) {
            UI.mostrarError('nombre', validacionNombre.mensaje);
            esValido = false;
        } else {
            UI.limpiarError('nombre');
        }
        
        const validacionEdad = Validacion.validarEdad(datos.edad);
        if (!validacionEdad.valido) {
            UI.mostrarError('edad', validacionEdad.mensaje);
            esValido = false;
        } else {
            UI.limpiarError('edad');
        }
        
        if (datos.email) {
            const validacionEmail = Validacion.validarEmail(datos.email);
            if (!validacionEmail.valido) {
                UI.mostrarError('email', validacionEmail.mensaje);
                esValido = false;
            } else {
                UI.limpiarError('email');
            }
        }
        
        if (datos.telefono) {
            const validacionTelefono = Validacion.validarTelefono(datos.telefono);
            if (!validacionTelefono.valido) {
                UI.mostrarError('telefono', validacionTelefono.mensaje);
                esValido = false;
            } else {
                UI.limpiarError('telefono');
            }
        }
        
        if (!datos.genero) {
            UI.mostrarError('genero', 'Debe seleccionar un género');
            esValido = false;
        }
        
        if (!datos.condicionSalud) {
            UI.mostrarError('condicion-salud', 'Debe seleccionar una condición de salud');
            esValido = false;
        }
        
        // Si todo es válido, agregar paciente
        if (esValido) {
            try {
                DataManager.agregarPaciente(datos);
                UI.mostrarExito();
                this.reset();
                elements.otraCondicionGroup.style.display = 'none';
                UI.limpiarTodosLosErrores();
            } catch (error) {
                alert('Error al registrar paciente: ' + error.message);
            }
        }
    });

    // Mostrar/ocultar campo "otra condición"
    elements.condicionSalud.addEventListener('change', function() {
        if (this.value === 'otra') {
            elements.otraCondicionGroup.style.display = 'block';
            document.getElementById('otra-condicion').required = true;
        } else {
            elements.otraCondicionGroup.style.display = 'none';
            document.getElementById('otra-condicion').required = false;
        }
    });

    // Configurar búsqueda
    elements.btnBuscar.addEventListener('click', function() {
        const criterios = {
            nombre: elements.buscarNombre.value.trim(),
            condicion: elements.buscarCondicion.value,
            edadMin: parseInt(elements.buscarEdadMin.value) || null,
            edadMax: parseInt(elements.buscarEdadMax.value) || null
        };
        
        const resultados = DataManager.buscarPacientes(criterios);
        mostrarResultadosBusqueda(resultados);
    });

    elements.btnLimpiarBusqueda.addEventListener('click', function() {
        elements.buscarNombre.value = '';
        elements.buscarCondicion.value = '';
        elements.buscarEdadMin.value = '';
        elements.buscarEdadMax.value = '';
        elements.listaPacientes.innerHTML = '';
    });

    // Búsqueda en tiempo real por nombre
    elements.buscarNombre.addEventListener('input', function() {
        if (this.value.trim().length >= 2) {
            const criterios = { nombre: this.value.trim() };
            const resultados = DataManager.buscarPacientes(criterios);
            mostrarResultadosBusqueda(resultados);
        } else if (this.value.trim().length === 0) {
            elements.listaPacientes.innerHTML = '';
        }
    });

    // Configurar informes
    elements.btnGenerarInforme.addEventListener('click', function() {
        const tipoInforme = elements.tipoInforme.value;
        const informe = DataManager.generarInforme(tipoInforme);
        
        elements.contenidoInforme.innerHTML = `
            <h3>${informe.titulo}</h3>
            ${informe.contenido}
        `;
    });

    // Inicializar estadísticas
    UI.actualizarEstadisticas();
});

// Función para mostrar resultados de búsqueda
function mostrarResultadosBusqueda(resultados) {
    if (resultados.length === 0) {
        elements.listaPacientes.innerHTML = '<p class="text-muted">No se encontraron pacientes que coincidan con los criterios de búsqueda.</p>';
        return;
    }
    
    let html = '';
    resultados.forEach(paciente => {
        html += `
            <div class="patient-card">
                <h4>${paciente.nombre}</h4>
                <div class="patient-info">
                    <span><strong>Edad:</strong> ${paciente.edad} años</span>
                    <span><strong>Género:</strong> ${paciente.genero}</span>
                    <span><strong>Condición:</strong> ${paciente.getCondicionCompleta()}</span>
                    <span><strong>Gravedad:</strong> ${paciente.gravedad || 'No especificada'}</span>
                    ${paciente.telefono ? `<span><strong>Teléfono:</strong> ${paciente.telefono}</span>` : ''}
                    ${paciente.email ? `<span><strong>Email:</strong> ${paciente.email}</span>` : ''}
                    ${paciente.imc ? `<span><strong>IMC:</strong> ${paciente.imc}</span>` : ''}
                </div>
            </div>
        `;
    });
    
    elements.listaPacientes.innerHTML = html;
}

// Datos de ejemplo para demostración (opcional)
function cargarDatosEjemplo() {
    const datosEjemplo = [
        {
            nombre: 'María García López',
            edad: '45',
            genero: 'femenino',
            telefono: '555-0101',
            email: 'maria.garcia@email.com',
            condicionSalud: 'diabetes',
            gravedad: 'moderada',
            peso: '68',
            altura: '165'
        },
        {
            nombre: 'Juan Pérez Martínez',
            edad: '32',
            genero: 'masculino',
            telefono: '555-0102',
            email: 'juan.perez@email.com',
            condicionSalud: 'hipertension',
            gravedad: 'leve',
            peso: '75',
            altura: '178'
        },
        {
            nombre: 'Ana Rodríguez Silva',
            edad: '28',
            genero: 'femenino',
            telefono: '555-0103',
            condicionSalud: 'saludable',
            peso: '60',
            altura: '162'
        }
    ];
    
    datosEjemplo.forEach(datos => {
        DataManager.agregarPaciente(datos);
    });
    
    UI.actualizarEstadisticas();
}

// Función para exportar datos (funcionalidad adicional)
function exportarDatos() {
    if (pacientes.length === 0) {
        alert('No hay datos para exportar');
        return;
    }
    
    const csvContent = "data:text/csv;charset=utf-8," 
        + "Nombre,Edad,Género,Condición,Gravedad,Teléfono,Email,IMC,Fecha Registro\n"
        + pacientes.map(p => {
            return `"${p.nombre}",${p.edad},"${p.genero}","${p.getCondicionCompleta()}","${p.gravedad || ''}","${p.telefono}","${p.email}","${p.imc || ''}","${p.fechaRegistro.toLocaleDateString()}"`;
        }).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "pacientes_censo_salud.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Hacer función disponible globalmente para uso en consola
window.cargarDatosEjemplo = cargarDatosEjemplo;
window.exportarDatos = exportarDatos;