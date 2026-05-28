# 📚 Guía de Archivos del Proyecto

## 🗺️ Mapa Rápido

```
¿Qué necesito hacer?                    → Abre este archivo
─────────────────────────────────────────────────────────
Ver todo el sistema                     → index.html
Guardar datos del evento anual          → admin.html
Enviar invitaciones a personas          → send-invitations.html
Recibir consultas de contacto           → formulario.html
Ejecutar el servidor                    → npm start (CONTACT-FORM-BACKEND)
```

---

## 📄 Archivos Frontend (Interfaz de Usuario)

### 🏠 **index.html** - Centro de Control Principal
**Propósito:** Página de inicio y panel de control

**Características:**
- Enlace a todos los formularios
- Verificación de estado del servidor
- Información sobre datos guardados
- Pasos siguientes

**Cuándo usarlo:** Primera vez, o siempre como punto de entrada

**Requisitos:**
- Navegador web
- No requiere servidor

---

### ⚙️ **admin.html** - Panel Administrativo del Evento
**Propósito:** Guardar/editar datos del evento que cambien cada año

**Campos disponibles:**
```
Información General
├── Nombre del evento
├── Edición/Año
└── Descripción

Fecha y Hora
├── Fecha del evento
├── Hora de inicio
├── Duración
└── Fecha límite de registro

Ubicación
├── Lugar/Venue
├── Ciudad
├── País
└── Dirección completa

Enlaces
├── Link de registro
└── Link de Zoom/Streaming

Contacto
├── Email
└── Teléfono

Speakers/Conferencistas
├── Nombre del speaker
└── Cargo/Especialidad
   (Agregar múltiples)
```

**Almacenamiento:**
- LocalStorage (navegador) - Automático
- Servidor (si está corriendo) - Opcional

**Cuándo usarlo:**
- Inicio de cada ciclo anual del evento
- Antes de enviar invitaciones
- Cuando cambien datos del evento

---

### 📧 **send-invitations.html** - Envío de Invitaciones
**Propósito:** Enviar invitaciones personalizadas a personas específicas

**Características:**
- Ver resumen del evento guardado
- Personalizar asunto del email
- Agregar mensaje personal
- Agregar/eliminar destinatarios
- Vista previa del email
- Envío masivo

**Flujo:**
1. Carga datos del evento automáticamente
2. Personaliza asunto y mensaje
3. Agrega destinatarios (nombre + email)
4. Ve preview
5. Envía

**Cuándo usarlo:**
- Después de guardar datos en `admin.html`
- Cada vez que quieras invitar personas

---

### 💬 **formulario.html** - Formulario de Contacto General
**Propósito:** Recibir mensajes de visitantes/contactos generales

**Campos:**
- Nombre
- Email
- Teléfono
- Asunto
- Mensaje

**Cuándo usarlo:**
- Página pública para contactos
- Independiente del evento anual

---

## 📄 Archivos Script (Lógica Frontend)

### **admin-script.js** - Lógica del Panel Administrativo
**Qué hace:**
- Cargar datos guardados del localStorage
- Validar formulario
- Agregar/eliminar speakers dinámicamente
- Guardar en servidor (POST /api/event)
- Mostrar mensajes de éxito/error

**Funciones principales:**
- `addSpeakerField()` - Agregar speaker
- `removeSpeaker()` - Eliminar speaker
- `handleFormSubmit()` - Guardar datos
- `loadEventData()` - Cargar datos guardados

---

### **send-invitations-script.js** - Lógica de Envío de Invitaciones
**Qué hace:**
- Cargar datos del evento
- Gestionar lista de destinatarios
- Generar HTML del email
- Mostrar vista previa
- Enviar invitaciones (POST /api/send-invitation)

**Funciones principales:**
- `loadEventData()` - Cargar evento guardado
- `addRecipient()` - Agregar persona
- `removeRecipient()` - Eliminar persona
- `showPreview()` - Mostrar vista previa
- `sendInvitations()` - Enviar emails

---

### **script.js** - Lógica del Formulario de Contacto
**Qué hace:**
- Validar formulario de contacto
- Enviar datos a servidor (POST /api/contact)
- Limpiar formulario después de enviar
- Mostrar confirmación

---

## 🖥️ Backend (Servidor Node.js)

### 📁 Carpeta: `CONTACT-FORM-BACKEND/`

#### **server.js** - Servidor Principal Express
**Puertos y Endpoints:**

```
Puerto: 5000 (configurable en .env)

Endpoints:
├── POST /api/event
│   └── Guardar datos del evento
│
├── GET /api/event
│   └── Obtener datos del evento
│
├── POST /api/send-invitation
│   └── Enviar invitación personalizada
│
└── POST /api/contact
    └── Recibir mensaje de contacto (existente)
```

**Tecnologías:**
- Express.js
- Nodemailer
- CORS
- Body Parser
- Dotenv

**Cómo ejecutar:**
```bash
cd CONTACT-FORM-BACKEND
pnpm start
```

---

#### **package.json** - Configuración de Dependencias
**Dependencias incluidas:**
- `express` - Framework web
- `nodemailer` - Envío de emails
- `cors` - Control de origen cruzado
- `body-parser` - Parsear JSON
- `dotenv` - Variables de entorno

**Script:**
- `start` - Inicia el servidor

---

#### **.env.example** - Plantilla de Configuración
**Contenido:**
```env
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=contraseña-app-gmail
PORT=5000
```

**Cómo usar:**
```bash
cp .env.example .env
# Luego editar .env con tus datos reales
```

---

## 📋 Archivos de Documentación

### **README.md** - Documentación Completa
**Contiene:**
- Instalación paso a paso
- Configuración de Gmail
- Cómo usar cada página
- Descripción de endpoints
- Almacenamiento de datos
- Personalización
- Solución de problemas
- Notas de seguridad

**Cuándo leer:** Cuando necesites detalles técnicos

---

### **QUICKSTART.md** - Inicio Rápido
**Contiene:**
- Instalación en 3 pasos
- Configuración mínima
- Cómo usar (flujo básico)
- Campos principales

**Cuándo leer:** La primera vez, para empezar rápido

---

### **SETUP-CHECKLIST.md** - Checklist de Configuración
**Contiene:**
- Verificación punto por punto
- Pruebas de conexión
- Troubleshooting

**Cuándo usar:** Para verificar que todo está bien

---

### **SUMMARY.md** - Resumen de Cambios
**Contiene:**
- Archivos creados vs modificados
- Flujo de datos del sistema
- Estructura del proyecto
- Próximas mejoras

**Cuándo leer:** Para entender la arquitectura del proyecto

---

### **Este archivo (FILE-GUIDE.md)** - Guía de Archivos
**Contiene:**
- Descripción de cada archivo
- Para qué sirve cada uno
- Cuándo usarlo

---

## 📁 Carpeta: `EMAIL-TEMPLATE/`
**Contenido:**
- Plantillas base de email
- Imágenes y assets
- Referencia visual

---

## 📁 Carpeta: `imgs/`
**Contenido:**
- Imágenes generales del proyecto
- Logos
- Imágenes del evento

---

## 🔄 Flujo Completo de Archivos

```
Usuario abre index.html (Centro de Control)
        ↓
    Elige un opción:
        ├→ admin.html
        │   ├→ admin-script.js (valida + guarda)
        │   ├→ localStorage (local)
        │   └→ /api/event (servidor)
        │
        ├→ send-invitations.html
        │   ├→ send-invitations-script.js (carga + envía)
        │   ├→ localStorage (lee datos)
        │   └→ /api/send-invitation (servidor)
        │       ├→ server.js (procesa)
        │       ├→ nodemailer (Gmail)
        │       └→ Email enviado ✓
        │
        └→ formulario.html
            ├→ script.js
            └→ /api/contact (servidor)
```

---

## 📊 Archivo de Configuración

### **.gitignore** - Archivos a Ignorar en Git
**Qué ignora:**
- `.env` (credenciales)
- `node_modules/`
- Archivos de logs
- Archivos del IDE

**Cuándo importa:** Si usas Git

---

## 🎯 Matriz de Referencia Rápida

| Tarea | Archivo | Requiere |
|-------|---------|----------|
| Ver todo | `index.html` | Navegador |
| Guardar evento | `admin.html` | Navegador + `admin-script.js` |
| Enviar invitaciones | `send-invitations.html` | Navegador + `send-invitations-script.js` + Servidor |
| Recibir contactos | `formulario.html` | Navegador + `script.js` + Servidor |
| Procesar datos | `server.js` | Node.js corriendo |
| Configurar Gmail | `.env` | Credenciales Gmail |

---

## 📝 Resumen

**Si necesitas...**
- **Interfaz:** Abre los `.html` en navegador
- **Lógica frontend:** Mira los `*-script.js`
- **Backend/Emails:** Corre `server.js`
- **Ayuda:** Lee `README.md` o `QUICKSTART.md`
- **Verificar:** Usa `SETUP-CHECKLIST.md`

¡Ahora estás listo para navegar el proyecto! 🚀
