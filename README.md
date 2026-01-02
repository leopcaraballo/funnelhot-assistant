# 🤖 Funnelhot AI Assistant Manager

[cite_start]Módulo de gestión de asistentes de IA desarrollado para **Funnelhot**[cite: 1, 3]. [cite_start]Esta aplicación web responsive permite la administración completa de agentes virtuales con persistencia local de datos[cite: 5].

## 🚀 Características Implementadas

### 1. Panel de Gestión (Dashboard)

- [cite_start]**Listado de Asistentes**: Visualización en formato de tarjetas que muestran nombre, idioma y tono[cite: 12, 13, 14, 15, 16].
- [cite_start]**Acciones**: Botones integrados para Editar, Eliminar y Entrenar cada asistente[cite: 17].
- [cite_start]**Estado Vacío**: Interfaz optimizada para cuando no existen asistentes registrados[cite: 26].

### 2. Constructor de Asistentes (Modal Progresivo)

- [cite_start]**Flujo de 2 Pasos**: Implementación de un modal con validaciones obligatorias para avanzar[cite: 29, 54].
  - [cite_start]**Paso 1 - Datos Básicos**: Captura de nombre (mín. 3 caracteres), idioma (ES, EN, PT) y tono[cite: 42, 43, 44, 45].
  - [cite_start]**Paso 2 - Configuración de Respuestas**: Definición de porcentajes para respuestas cortas, medias y largas, cuya suma debe ser exactamente 100%[cite: 46, 47, 48, 53].
- [cite_start]**Opciones Avanzadas**: Checkbox para habilitar o deshabilitar respuestas de audio[cite: 49].

### 3. Centro de Entrenamiento y Simulación

- [cite_start]**Configuración**: Área para ingresar prompts e instrucciones que definen el comportamiento del asistente[cite: 63, 64].
- [cite_start]**Chat Simulado**: Interfaz de chat funcional con mensajes de usuario y respuestas automáticas[cite: 68, 69, 70].
- [cite_start]**UX Realista**: Las respuestas del asistente tienen un delay simulado de 1-2 segundos para mejorar la experiencia[cite: 72].

## 🛠️ Stack Tecnológico

- [cite_start]**Framework**: Next.js (App Router)[cite: 80].
- [cite_start]**Lenguaje**: TypeScript[cite: 81].
- [cite_start]**Estilos**: Tailwind CSS (Diseño Responsive)[cite: 83].
- [cite_start]**Persistencia**: LocalStorage[cite: 82].

## 📋 Decisiones Técnicas

- [cite_start]**Arquitectura**: Se utilizaron componentes reutilizables y una estructura de carpetas escalable[cite: 89, 91].
- [cite_start]**Validaciones**: Se implementaron mensajes de error claros y alertas para campos requeridos[cite: 52].
- [cite_start]**Simulación de Datos**: Se incluyeron datos de ejemplo para asistentes de "Ventas" y "Soporte Técnico"[cite: 122, 125, 138].

## ⚙️ Instalación y Ejecución

1. Clonar el repositorio.
2. Ejecutar `npm install`.
3. Iniciar el entorno de desarrollo con `npm run dev`.
4. Acceder localmente en `http://localhost:3000` o desde la red en `http://192.168.1.11:3000`.

---

[cite_start]**Entregable para la prueba técnica de Funnelhot.** [cite: 153]
