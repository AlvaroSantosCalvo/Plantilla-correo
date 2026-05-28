# 🗺️ MAPA DEL PROYECTO - Guía Visual Completa

## 📍 UBICACIÓN: Tu Proyecto Reorganizado

```
c:\Users\grana\OneDrive\Escritorio\Prácticas\PlantillaEmail\Plantilla-correo\
```

---

## 📂 ESTRUCTURA JERÁRQUICA VISUAL

```
Plantilla-correo/  ← Raíz del proyecto
│
├─ 📁 src/  ⭐ AQUÍ ESTÁ TODO EL CÓDIGO
│  │
│  ├─ 📁 frontend/  ← Interfaz de usuario
│  │  ├─ 📁 pages/  ← 4 páginas HTML
│  │  │  ├─ 📄 index.html                ← Centro de control
│  │  │  ├─ 📄 admin.html                ← Panel administrativo
│  │  │  ├─ 📄 send-invitations.html     ← Envío de mails
│  │  │  └─ 📄 contact.html              ← Formulario contacto
│  │  └─ 📁 scripts/  ← 3 scripts JavaScript
│  │     ├─ 📄 admin.js                  ← Lógica admin
│  │     ├─ 📄 send-invitations.js       ← Lógica invitaciones
│  │     └─ 📄 contact.js                ← Lógica contacto
│  │
│  ├─ 📁 backend/  ← Servidor y API
│  │  ├─ 📄 server.js                    ← Express server
│  │  ├─ 📄 package.json                 ← Dependencias
│  │  └─ 📄 .env.example                 ← Plantilla config
│  │
│  └─ 📁 templates/  ← Para el futuro
│
├─ 📁 docs/  ← Documentación técnica
│  ├─ 📄 ESTRUCTURA.md                   ← Detalles de carpetas
│  └─ 📄 MIGRACION.md                    ← Cambios de rutas
│
├─ 📁 extras/  ← Archivos antiguos (vacío, espera tus archivos)
│
├─ 🎯 DOCUMENTOS DE INICIO
│  ├─ 📄 README-LEEME-PRIMERO.txt        ← ⭐ COMIENZA AQUÍ
│  ├─ 📄 00-COMIENZA-AQUI.txt            ← Alternativo
│  └─ 📄 README-REORGANIZACION.txt       ← Resumen visual
│
├─ 📖 DOCUMENTOS DE GUÍA
│  ├─ 📄 ARCHIVO-ARCHIVOS-ANTIGUOS.md    ← Cómo limpiar
│  ├─ 📄 QUICKSTART.md                   ← Inicio rápido
│  ├─ 📄 RESUMEN-REORGANIZACION.md       ← Guía completa
│  ├─ 📄 INICIO-RAPIDO.txt               ← Inicio visual
│  └─ 📄 INDICE-COMPLETO.md              ← Índice
│
├─ ✅ DOCUMENTOS DE REFERENCIA
│  ├─ 📄 CHECKLIST-COMPLETADO.md         ← Lo que se hizo
│  ├─ 📄 VERIFICACION-FINAL.md           ← Verificación
│  └─ 📄 README.md                       ← Original (sin cambios)
│
└─ ⚙️ ARCHIVOS ORIGINALES (Sin cambios)
   ├─ 📄 QUICKSTART.md                   ✅ Sin cambios
   ├─ 📄 SETUP-CHECKLIST.md              ✅ Sin cambios
   ├─ 📄 FILE-GUIDE.md                   ✅ Sin cambios
   └─ ... (otros archivos)

ARCHIVOS ANTIGUOS (Para mover a extras/):
├─ 📄 admin.html                  ❌ Antigua
├─ 📄 admin-script.js             ❌ Antigua
├─ 📄 send-invitations.html       ❌ Antigua
├─ 📄 send-invitations-script.js  ❌ Antigua
├─ 📄 formulario.html             ❌ Antigua
├─ 📁 CONTACT-FORM-BACKEND/       ❌ Antigua (carpeta)
└─ 📄 test-email.html             ❌ Sin usar
```

---

## 🎯 FLUJO DE DATOS

```
USUARIO ABRE NAVEGADOR
        ↓
index.html (src/frontend/pages/)
        ↓
[Centro de Control]
        ↓
    ┌───┴───┬──────────┐
    ↓       ↓          ↓
  Admin   Invites    Contact
   │         │         │
   ├─────────┴─────────┤
         ↓
  [Frontend Scripts]
   admin.js
   send-invitations.js
   contact.js
         ↓
  [API Calls]
   /api/event
   /api/send-invitation
   /api/contact
         ↓
  [Backend - server.js]
   Express Server
   Nodemailer
         ↓
  [Gmail SMTP]
   Email enviado
```

---

## 📍 DÓNDE ENCONTRAR CADA COSA

### 🔍 ¿Dónde está...?

**La página principal**
→ `src/frontend/pages/index.html`

**El panel administrativo**
→ `src/frontend/pages/admin.html` + `src/frontend/scripts/admin.js`

**Envío de invitaciones**
→ `src/frontend/pages/send-invitations.html` + `src/frontend/scripts/send-invitations.js`

**Formulario de contacto**
→ `src/frontend/pages/contact.html` + `src/frontend/scripts/contact.js`

**El servidor**
→ `src/backend/server.js`

**Las dependencias**
→ `src/backend/package.json`

**Configuración de email**
→ `src/backend/.env` (tú creas esto)

**Documentación**
→ `docs/` y `ARCHIVO-ARCHIVOS-ANTIGUOS.md`

---

## 🚀 RUTAS DE ACCESO RÁPIDO

### Abre la aplicación
```
Navegador: file:///ruta/Plantilla-correo/src/frontend/pages/index.html
```

### Edita la configuración
```
Archivo: src/backend/.env
Plantilla: src/backend/.env.example
```

### Inicia el servidor
```
Terminal: cd src/backend && npm start
Resultado: http://localhost:5000/
```

### Mira la documentación
```
Inicio: README-LEEME-PRIMERO.txt ← AQUÍ
Guía: ARCHIVO-ARCHIVOS-ANTIGUOS.md
```

---

## 📋 CHECKLIST DE NAVEGACIÓN

```
✅ Encuentro src/frontend/pages/
✅ Encuentro src/frontend/scripts/
✅ Encuentro src/backend/
✅ Encuentro docs/
✅ Encuentro extras/ (vacío, listo para limpiar)
✅ Leo README-LEEME-PRIMERO.txt
✅ Leo ARCHIVO-ARCHIVOS-ANTIGUOS.md
✅ Configuro .env
✅ Ejecuto npm start
✅ Abro index.html en navegador
```

---

## 🎓 GUÍA DE LECTURA

**Lee en este orden:**

1. **POSICIÓN 1:** README-LEEME-PRIMERO.txt ← 📍 ESTÁS AQUÍ
2. **POSICIÓN 2:** ARCHIVO-ARCHIVOS-ANTIGUOS.md ← LUEGO
3. **POSICIÓN 3:** QUICKSTART.md ← DESPUÉS
4. **POSICIÓN 4:** RESUMEN-REORGANIZACION.md ← PARA MÁS DETALLES
5. **POSICIÓN 5:** docs/ESTRUCTURA.md ← REFERENCIA TÉCNICA

---

## 🔗 CONEXIONES ENTRE ARCHIVOS

```
README-LEEME-PRIMERO.txt
    ├─→ ARCHIVO-ARCHIVOS-ANTIGUOS.md (Qué mover)
    ├─→ QUICKSTART.md (Cómo empezar)
    └─→ RESUMEN-REORGANIZACION.md (Guía completa)

RESUMEN-REORGANIZACION.md
    ├─→ docs/ESTRUCTURA.md (Detalles técnicos)
    ├─→ docs/MIGRACION.md (Cambios de rutas)
    └─→ VERIFICACION-FINAL.md (Verificación)

ARCHIVO-ARCHIVOS-ANTIGUOS.md
    └─→ extras/ (Dónde guardar)

QUICKSTART.md
    ├─→ src/backend/server.js (Código)
    └─→ src/frontend/pages/ (Páginas)
```

---

## 🌳 ÁRBOL COMPLETO (Texto)

```
Plantilla-correo/
├── src/
│   ├── frontend/
│   │   ├── pages/
│   │   │   ├── index.html
│   │   │   ├── admin.html
│   │   │   ├── send-invitations.html
│   │   │   └── contact.html
│   │   └── scripts/
│   │       ├── admin.js
│   │       ├── send-invitations.js
│   │       └── contact.js
│   ├── backend/
│   │   ├── server.js
│   │   ├── package.json
│   │   ├── .env.example
│   │   └── pnpm-lock.yaml
│   └── templates/
├── docs/
│   ├── ESTRUCTURA.md
│   └── MIGRACION.md
├── extras/
├── 00-COMIENZA-AQUI.txt
├── README-LEEME-PRIMERO.txt
├── README-REORGANIZACION.txt
├── ARCHIVO-ARCHIVOS-ANTIGUOS.md
├── INICIO-RAPIDO.txt
├── QUICKSTART.md
├── RESUMEN-REORGANIZACION.md
├── INDICE-COMPLETO.md
├── CHECKLIST-COMPLETADO.md
├── VERIFICACION-FINAL.md
├── README.md
├── SETUP-CHECKLIST.md
├── FILE-GUIDE.md
└── ... (otros archivos)
```

---

## 🎯 TU PRÓXIMO PASO

**Abre:** `ARCHIVO-ARCHIVOS-ANTIGUOS.md`

**Por qué:** Te enseña a mover los archivos antiguos a extras/

**Resultado:** Tu proyecto estará 100% limpio y organizado

---

**Mapa del Proyecto v1.0**
**Creado: Mayo 2026**
**Estado: Actualizado y Verificado ✅**
