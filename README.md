# 🤖 Funnelhot AI Assistant Manager

**Funnelhot AI Assistant Manager** es un módulo de gestión de asistentes virtuales basados en IA, desarrollado como prueba técnica para **Funnelhot**. Permite crear, listar, editar, eliminar y entrenar asistentes diseñados para automatizar la interacción con leads.

## 🚀 Funcionalidades Principales

### 1. Gestión de Asistentes (Dashboard)

- **Listado dinámico**: Visualización de todos los asistentes existentes en formato de tarjetas.
- **Información detallada**: Cada tarjeta muestra el nombre, idioma y tono del asistente.
- **Acciones rápidas**: Opciones para Editar, Eliminar o Entrenar directamente desde la tarjeta.
- **Estado vacío**: Interfaz guiada cuando no existen asistentes creados.

### 2. Constructor Progresivo (Modal de 2 pasos)

- **Flujo de creación dividido** en dos pasos con validaciones obligatorias.
- **Paso 1 – Datos básicos**:
  - Nombre del asistente (mínimo 3 caracteres)
  - Idioma: Español, Inglés o Portugués
  - Tono: Formal, Casual, Profesional o Amigable
- **Paso 2 – Configuración de respuestas**:
  - Distribución de longitud de respuestas (Cortas, Medias, Largas), cuya suma debe ser exactamente 100%.
  - Opción para habilitar respuestas en audio.
- **Persistencia**: Todos los datos se almacenan en `localStorage` para mantenerlos después de refrescar la página.

### 3. Centro de Entrenamiento y Simulación

- **Entrenamiento**: Área de texto para ingresar prompts e instrucciones personalizadas.
- **Chat simulado**: Interfaz de mensajería para probar el comportamiento del asistente.
- **Experiencia realista**: Respuestas simuladas con un retraso de 1 a 2 segundos para emular el procesamiento de IA real.

## 🛠️ Stack Tecnológico

- **Framework**: Next.js (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: CSS Modules (Diseño modular y escalable, responsive)
- **Persistencia**: LocalStorage

## 📋 Decisiones Técnicas

- **Arquitectura escalable**: Componentes reutilizables y estructura modular.
- **UX/UI**: Estados de carga, validaciones en tiempo real y mensajes claros de éxito/error.
- **Simulación**: Datos de ejemplo preconfigurados para asistentes de “Ventas” y “Soporte Técnico” para pruebas iniciales.

## ⚙️ Instalación y Ejecución

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/funnelhot-assistant.git
   ```
2. **Instalar dependencias**:
   ```bash
   cd funnelhot-assistant
   npm install
   ```
3. **Ejecutar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```
4. **Acceder a la aplicación**:

- **Acceder a la aplicación**:
- Localmente: http://localhost:3000
- Red local: según configuración del sistema operativo
- Online: https://funnelhot-assistant.vercel.app
