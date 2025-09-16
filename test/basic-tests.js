#!/usr/bin/env node

// Script para verificar el funcionamiento básico de la aplicación
const fs = require('fs');
const path = require('path');

console.log('🔍 Ejecutando pruebas básicas...');

const healthAnalysisDir = path.join(__dirname, '..', 'healthAnalysis');

// Verificar que existen los archivos principales
const requiredFiles = [
    'index.html',
    'styles.css',
    'script.js'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
    const filePath = path.join(healthAnalysisDir, file);
    if (fs.existsSync(filePath)) {
        console.log(`✅ ${file} existe`);
    } else {
        console.log(`❌ ${file} no encontrado`);
        allFilesExist = false;
    }
});

// Verificar node_modules
const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
    console.log('✅ node_modules existe');
    
    // Verificar dependencias específicas
    const dependencies = ['bootstrap', 'chart.js', 'font-awesome'];
    dependencies.forEach(dep => {
        const depPath = path.join(nodeModulesPath, dep);
        if (fs.existsSync(depPath)) {
            console.log(`✅ ${dep} instalado`);
        } else {
            console.log(`❌ ${dep} no instalado`);
        }
    });
} else {
    console.log('❌ node_modules no encontrado');
    allFilesExist = false;
}

if (allFilesExist) {
    console.log('\n🎉 ¡Todas las pruebas básicas pasaron!');
    console.log('📝 Para ejecutar la aplicación:');
    console.log('   npm start    - Servidor de desarrollo con live-reload');
    console.log('   npm run serve - Servidor HTTP simple');
    process.exit(0);
} else {
    console.log('\n❌ Algunas pruebas fallaron');
    process.exit(1);
}