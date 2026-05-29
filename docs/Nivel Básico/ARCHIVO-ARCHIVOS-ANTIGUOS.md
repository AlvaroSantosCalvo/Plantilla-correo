# 🗑️ ARCHIVOS ANTIGUOS - QUÉ HACER CON ELLOS

## 📌 Archivos que Deben Ser Movidos a "Extras"

Los siguientes archivos **ya tienen nuevas versiones** en la estructura correcta y pueden ser movidos sin problemas:

### 1. Archivos HTML Antiguos (4 archivos)
```
✅ admin.html                      → Nueva ubicación: src/frontend/pages/admin.html
✅ index.html                      → Nueva ubicación: src/frontend/pages/index.html  
✅ send-invitations.html           → Nueva ubicación: src/frontend/pages/send-invitations.html
✅ formulario.html                 → Nueva ubicación: src/frontend/pages/contact.html
```
**Acción:** Mueve estos 4 a `extras/archivos-html-antiguos/`

### 2. Archivos JavaScript Antiguos (3 archivos)
```
✅ admin-script.js                 → Nueva ubicación: src/frontend/scripts/admin.js
✅ send-invitations-script.js      → Nueva ubicación: src/frontend/scripts/send-invitations.js
```
**Acción:** Mueve estos 2 a `extras/archivos-js-antiguos/`

### 3. Carpeta Backend Antigua
```
✅ CONTACT-FORM-BACKEND/           → Nueva ubicación: src/backend/
   ├── server.js                   → src/backend/server.js
   ├── script.js                   → src/frontend/scripts/contact.js
   ├── package.json                → src/backend/package.json
   └── pnpm-lock.yaml              → src/backend/pnpm-lock.yaml
```
**Acción:** Mueve toda la carpeta a `extras/CONTACT-FORM-BACKEND-antigua/`

### 4. Archivos Opcionales (Decide según tu uso)
```
? test-email.html                  → ¿Lo necesitas? Si no, mueve a extras/
? Email_v2.pdf                     → ¿Documentación importante? Si no, mueve a extras/
? assets/                          → ¿Lo usas? Si no, mueve a extras/
? EMAIL-TEMPLATE/                  → ¿Lo usas? Si no, mueve a extras/
```

---

## 🚀 Cómo Mover los Archivos (Paso a Paso)

### Opción A: Manualmente en Windows
1. Abre el explorador de archivos
2. Navega a `Plantilla-correo/`
3. Crea carpetas en `extras/`:
   - `extras/archivos-html-antiguos/`
   - `extras/archivos-js-antiguos/`
   - `extras/CONTACT-FORM-BACKEND-antigua/`
4. Arrastra los archivos antiguos a sus carpetas respectivas

### Opción B: Usando Terminal (PowerShell)

```powershell
# Navega a la carpeta del proyecto
cd "tu-ruta\Plantilla-correo"

# Crea la estructura de extras
mkdir "extras\archivos-html-antiguos"
mkdir "extras\archivos-js-antiguos"
mkdir "extras\CONTACT-FORM-BACKEND-antigua"

# Mueve archivos HTML
Move-Item "admin.html" "extras\archivos-html-antiguos\"
Move-Item "index.html" "extras\archivos-html-antiguos\"
Move-Item "send-invitations.html" "extras\archivos-html-antiguos\"
Move-Item "formulario.html" "extras\archivos-html-antiguos\"

# Mueve archivos JS
Move-Item "admin-script.js" "extras\archivos-js-antiguos\"
Move-Item "send-invitations-script.js" "extras\archivos-js-antiguos\"

# Mueve la carpeta backend antigua
Move-Item "CONTACT-FORM-BACKEND" "extras\CONTACT-FORM-BACKEND-antigua\"

# Opcional: mueve otros archivos
Move-Item "test-email.html" "extras\"
Move-Item "Email_v2.pdf" "extras\"
```

---

## 📋 Lista de Verificación - Archivos a Mover

**Copia esto para verificar:**

```
☐ admin.html                        → extras/archivos-html-antiguos/
☐ index.html                        → extras/archivos-html-antiguos/
☐ send-invitations.html             → extras/archivos-html-antiguos/
☐ formulario.html                   → extras/archivos-html-antiguos/
☐ admin-script.js                   → extras/archivos-js-antiguos/
☐ send-invitations-script.js        → extras/archivos-js-antiguos/
☐ CONTACT-FORM-BACKEND/             → extras/CONTACT-FORM-BACKEND-antigua/
☐ test-email.html                   → extras/
☐ Email_v2.pdf                      → extras/
☐ assets/                           → extras/ (si no lo usas)
☐ EMAIL-TEMPLATE/                   → extras/ (si no lo usas)
```

---

## ✅ Después de Mover los Archivos

### 1. Verifica que todo funciona
```bash
# Desde la carpeta raíz
cd src/backend
pnpm install  # Si es primera vez
npm start
```

### 2. Abre la nueva aplicación
- En el navegador: `src/frontend/pages/index.html`
- Verifica que el centro de control se abre
- Prueba los formularios

### 3. Limpia tu raíz
La carpeta raíz debería verse así:
```
Plantilla-correo/
├── src/                    ✅ Nueva estructura
├── docs/                   ✅ Documentación
├── extras/                 ✅ Archivos antiguos
├── .gitignore              
├── README.md              
├── QUICKSTART.md          
├── (otros archivos config)
└── ❌ NO deberían estar los .html y .js antiguos
```

---

## 🔒 Crear un README en Extras

**Crea este archivo:** `extras/README.md`

```markdown
# 📦 Archivos Antiguos - Proyecto Reorganizado

Esta carpeta contiene archivos de versiones anteriores del proyecto.

## 📂 Contenido

### archivos-html-antiguos/
Versiones antiguas de páginas HTML (reemplazadas por las en src/frontend/pages/)

### archivos-js-antiguos/
Versiones antiguas de scripts JavaScript (reemplazadas por las en src/frontend/scripts/)

### CONTACT-FORM-BACKEND-antigua/
Versión antigua de la estructura del backend (movida a src/backend/)

## ℹ️ ¿Por qué están aquí?

Estos archivos fueron reorganizados en Maggio 2026 para seguir una estructura 
profesional y escalable. Se mantienen aquí como referencia.

## 🚀 Archivo Actual

El proyecto reorganizado está en:
- Frontend: `../src/frontend/`
- Backend: `../src/backend/`

## 💡 Si necesitas algo del pasado

1. Busca en la carpeta correspondiente
2. Verifica la versión actualizada en la ubicación nueva
3. Copia lo que necesites

---

**Reorganizado:** Mayo 2026
```

---

## ⚠️ Importante Antes de Mover

### Verificación Final
- [ ] Todos los nuevos archivos están en `src/`
- [ ] El servidor arranca desde `src/backend/`
- [ ] Las páginas HTML en `src/frontend/pages/` funcionan
- [ ] Los scripts en `src/frontend/scripts/` están linkedos

### No Olvides
- [ ] Crear `.env` en `src/backend/`
- [ ] No mover el archivo `.gitignore`
- [ ] No mover archivos de configuración (package.json, etc.)

---

## 🔄 Después - Estructura Final Esperada

```
Plantilla-correo/
├── 📂 src/                              ✅ NUEVO - Código funcional
│   ├── frontend/
│   ├── backend/
│   └── templates/
├── 📂 docs/                             ✅ Documentación
├── 📂 extras/                           ✅ Archivos antiguos
│   ├── archivos-html-antiguos/
│   ├── archivos-js-antiguos/
│   ├── CONTACT-FORM-BACKEND-antigua/
│   ├── test-email.html
│   ├── Email_v2.pdf
│   └── README.md
├── README.md                            ✅ Actualizado
├── QUICKSTART.md                        ✅ Funcional
├── RESUMEN-REORGANIZACION.md            ✅ Este archivo
└── SETUP-CHECKLIST.md                   ✅ Referencia
```

---

## 🎯 Tu Checklist Final

```
Paso 1: Movimiento de Archivos
☐ Crear carpetas en extras/
☐ Mover archivos HTML antiguos
☐ Mover archivos JS antiguos
☐ Mover carpeta CONTACT-FORM-BACKEND
☐ Mover archivos opcionales

Paso 2: Verificación
☐ Verificar que src/ tiene todo
☐ Verificar que extras/ tiene lo antiguo
☐ Verificar que la raíz está limpia

Paso 3: Testing
☐ Iniciar servidor desde src/backend/
☐ Abrir index.html desde src/frontend/pages/
☐ Probar cada formulario

Paso 4: Documentación
☐ Crear README.md en extras/
☐ Guardar este documento
☐ Actualizar referencias en el proyecto
```

---

## 📞 Si Necesitas Help

Consulta:
- [RESUMEN-REORGANIZACION.md](../RESUMEN-REORGANIZACION.md) - Visión general
- [docs/MIGRACION.md](../docs/MIGRACION.md) - Guía detallada
- [QUICKSTART.md](../QUICKSTART.md) - Inicio rápido

---

**¡Listo! Ahora tu proyecto está limpio y organizado profesionalmente.** ✨

Hecho: Mayo 2026
