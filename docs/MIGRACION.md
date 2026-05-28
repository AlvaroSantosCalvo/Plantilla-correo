# 📋 GUÍA DE ARCHIVOS MOVIDOS A EXTRAS

## ✅ Migración Completada

Los siguientes archivos han sido **reemplazados o reorganizados** en la nueva estructura:

### Archivos HTML Movidos
- ❌ `admin.html` → ✅ `src/frontend/pages/admin.html`
- ❌ `index.html` → ✅ `src/frontend/pages/index.html`
- ❌ `send-invitations.html` → ✅ `src/frontend/pages/send-invitations.html`
- ❌ `formulario.html` → ✅ `src/frontend/pages/contact.html` (renombrado)

### Archivos JavaScript Movidos
- ❌ `admin-script.js` → ✅ `src/frontend/scripts/admin.js` (renombrado)
- ❌ `send-invitations-script.js` → ✅ `src/frontend/scripts/send-invitations.js` (renombrado)
- ❌ `CONTACT-FORM-BACKEND/script.js` → ✅ `src/frontend/scripts/contact.js` (movido)

### Backend Movido
- ❌ `CONTACT-FORM-BACKEND/server.js` → ✅ `src/backend/server.js`
- ❌ `CONTACT-FORM-BACKEND/package.json` → ✅ `src/backend/package.json`

### Archivos de Referencia (Puedes Eliminar)
Los siguientes archivos **ya no son necesarios** (nuevas versiones en la carpeta correcta):
- ❌ `admin-script.js`
- ❌ `admin.html`
- ❌ `send-invitations-script.js`
- ❌ `send-invitations.html`
- ❌ `formulario.html` (renombrado a contact.html)
- ❌ `CONTACT-FORM-BACKEND/` (estructura movida a `src/backend/`)
- ❌ `EMAIL-TEMPLATE/` (si no lo usas, muévelo a extras)

### Documentación
- ✅ `README.md` → Actualizado
- ✅ `QUICKSTART.md` → Sigue siendo válido
- ✅ `docs/ESTRUCTURA.md` → Nueva documentación

### Otros Archivos
- ⚠️ `test-email.html` → Considera moverlo a `extras/`
- ⚠️ `Email_v2.pdf` → Considera moverlo a `extras/`
- ⚠️ `assets/` → Si no se usa, considera moverlo a `extras/`

---

## 📌 Cómo Limpiar (Manualmente)

1. Mueve los archivos antiguos a la carpeta `extras/`:
```
extras/
├── archivos-antiguos/
│   ├── admin.html
│   ├── admin-script.js
│   ├── send-invitations.html
│   ├── send-invitations-script.js
│   ├── formulario.html
│   ├── test-email.html
│   ├── Email_v2.pdf
│   └── CONTACT-FORM-BACKEND/
└── README-ARCHIVOS-ANTIGUOS.md
```

2. Actualiza las rutas en tus bookmarks si los tenías

3. Usa los nuevos archivos en `src/frontend/pages/`

---

## 🔗 Nueva Estructura de Links

### Para abrir la aplicación:
**Antes:** `formulario.html`
**Ahora:** `src/frontend/pages/contact.html`

**Antes:** `admin.html`
**Ahora:** `src/frontend/pages/admin.html`

**Antes:** `index.html`
**Ahora:** `src/frontend/pages/index.html`

---

## ⚙️ Nueva Estructura del Backend

**Antes:**
```
CONTACT-FORM-BACKEND/
├── server.js
├── script.js
├── package.json
└── pnpm-lock.yaml
```

**Ahora:**
```
src/backend/
├── server.js
├── package.json
├── pnpm-lock.yaml
└── .env.example
```

**Para iniciar el servidor:**
```bash
# Navega a la nueva ubicación
cd src/backend

# Instala dependencias (si no las tienes)
pnpm install

# Inicia el servidor
npm start
```

---

## ✨ Beneficios de la Nueva Estructura

✅ **Organización clara** - Frontend, Backend, Docs separados
✅ **Escalabilidad** - Fácil agregar nuevas páginas/scripts
✅ **Mantenibilidad** - Estructura estándar de proyectos
✅ **Flexibilidad** - Fácil de expandir con más features
✅ **Claridad** - Nombres descriptivos y rutas lógicas

---

## 🚀 Próximos Pasos

1. Elimina o mueve los archivos antiguos a `extras/`
2. Actualiza tus referencias a los nuevos archivos
3. Ejecuta el servidor desde `src/backend/`
4. Abre `src/frontend/pages/index.html` en el navegador
5. ¡Disfruta de la nueva estructura organizada!

---

**Versión:** 1.0.0 Reorganizada
**Fecha:** Mayo 2026
