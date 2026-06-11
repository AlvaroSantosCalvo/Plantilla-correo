# 📧 Sistema de Plantilla de Email - Invitaciones a Evento Anual

Un sistema completo para gestionar y enviar invitaciones personalizadas a eventos anuales de forma fácil y rápida.

---

## 🎯 ¿Qué puedo hacer con esto?

✅ Guardar la información de tu evento (fecha, lugar, conferencistas, etc.)  
✅ Enviar invitaciones personalizadas por correo electrónico  
✅ Los datos del evento se guardan automáticamente para reutilizarlos  
✅ Enviar a múltiples personas sin tener que escribir cada correo  

---

## 📋 GUÍA PASO A PASO (Para principiantes)

### **PASO 1: Preparación inicial (Una sola vez)**

Antes de empezar, necesitas:

1. **Una cuenta de Gmail activa** (puede ser de la universidad o personal)
2. **Crear una "contraseña de aplicación"** para Gmail:
   - Ve a: https://myaccount.google.com/apppasswords
   - Selecciona **Teléfono** y **Windows** (o tu dispositivo)
   - Gmail te generará una contraseña de 16 caracteres
   - **Cópiala y guárdala** (la necesitarás)

3. **Node.js instalado en tu computadora**
   - Descarga desde: https://nodejs.org/ (versión LTS)
   - Instálalo siguiendo los pasos

---

### **PASO 2: Configurar el sistema (Una sola vez)**

1. **Abre la carpeta del proyecto** en tu computadora
2. **Abre una terminal** (PowerShell o CMD) dentro de la carpeta
3. **Escribe estos comandos uno por uno:**

```bash
cd src/backend
pnpm install
```

4. **Crea un archivo llamado `.env`** en la carpeta `src/backend/`:
   - En el archivo, copia esto:
   ```env
   EMAIL_USER=tu-email@gmail.com
   EMAIL_PASS=la-contraseña-de-16-caracteres
   PORT=5000
   ```
   - Reemplaza con tus datos reales
   - **Guarda el archivo**

---

### **PASO 3: Iniciar el sistema (Cada vez que uses)**

1. **Abre la terminal** en la carpeta `src/backend`
2. **Escribe:**
```bash
pnpm start
```

3. Deberías ver un mensaje que dice: `Server is Running on http://localhost:5000`
4. **Mantén esta ventana abierta** mientras uses el sistema

---

### **PASO 4: Llenar los datos del evento (Primera vez)**

1. **Abre en tu navegador:** `src/frontend/pages/index.html`
2. **Haz clic en "Panel Administrativo"**
3. **Completa todos los campos:**
   - Nombre del evento
   - Fecha y hora
   - Ubicación (ciudad y lugar)
   - Nombre de los conferencistas (speakers)
   - Lema o descripción del evento
   - Año académico

4. **Haz clic en "Guardar Datos del Evento"**
5. Verás un mensaje de confirmación ✅

---

### **PASO 5: Enviar invitaciones (Cada vez que quieras)**

1. **Desde la página principal, haz clic en "Enviar Invitaciones"**
2. **En la sección "Agregar Persona":**
   - Escribe el **nombre** de la persona
   - Escribe su **correo electrónico**
   - Haz clic en **"Agregar a lista"**

3. **Repite el paso anterior** para cada persona que quieras invitar
4. **Revisa la "Lista de Invitados"** - verás todas las personas agregadas
5. **Personaliza el asunto** del correo (ej: "¡Estás invitado a nuestro evento!")
6. **Personaliza el mensaje** si lo deseas
7. **Haz clic en "Enviar Invitaciones"**
8. Espera a que aparezca el mensaje de confirmación ✅

---

## ⚠️ Solución de problemas comunes

### **Problema: "Server is not running" o error de conexión**
- ✅ **Solución:** Abre la terminal en `src/backend` y ejecuta `pnpm start`
- ✅ Asegúrate de que la ventana de terminal esté abierta

### **Problema: No llegan los correos**
- ✅ Verifica que la contraseña en `.env` sea la de 16 caracteres
- ✅ Asegúrate de usar una cuenta de Gmail
- ✅ Revisa la carpeta de "Correo no deseado" del destinatario

### **Problema: No puedo guardar los datos del evento**
- ✅ Asegúrate de que todos los campos estén completos
- ✅ Verifica que el servidor esté corriendo

### **Problema: Los correos no tienen el diseño correcto**
- ✅ Esto es normal, los correos se envían en formato de texto simple
- ✅ Los datos del evento aparecen en el cuerpo del mensaje

---

## 📁 Estructura del Proyecto

```
src/
├── frontend/                          # Lo que ves en pantalla
│   ├── pages/
│   │   ├── index.html                # Página principal
│   │   ├── admin.html                # Formulario del evento
│   │   └── send-invitations.html     # Envío de invitaciones
│   └── scripts/                      # Programas que hacen funcionar todo
├── backend/                          # El servidor (parte técnica)
│   ├── server.js                     # El "cerebro" del sistema
│   ├── package.json                  # Dependencias
│   └── .env                          # Archivo con contraseña (SECRETO)
└── templates/                        # Plantillas de correos
```

---

## 🚀 Instalación y Configuración (Técnica)

### 1. **Instalar Dependencias**

```bash
cd src/backend
pnpm install
```

### 2. **Configurar Variables de Entorno**

Crear archivo `.env` en `src/backend/`:

```env
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-contraseña-app-especifica
PORT=5000
```

### 3. **Iniciar el Servidor**

```bash
pnpm start
```

---

## 🔗 Endpoints de API (Para desarrolladores)

### `POST /api/event`
**Descripción:** Guarda/actualiza datos del evento
**Body:** Objeto con datos del evento (nombre, fecha, ubicación, speakers, etc.)

### `GET /api/event`
**Descripción:** Obtiene los datos guardados del evento

### `POST /api/send-invitation`
**Descripción:** Envía invitación personalizada
**Body:**
```json
{
  "recipientName": "María",
  "recipientEmail": "maria@ejemplo.com",
  "subject": "¡Invitación!",
  "message": "Mensaje personalizado...",
  "eventData": { /* datos del evento */ }
}
```

---

## 📊 Campos del Evento

- 📅 **Fecha y hora**
- 📍 **Lugar** (venue, ciudad, país)
- 🎤 **Speakers** (conferencistas)
-  **Descripción**

---

## 🎯 Próximos Pasos

1. ✅ Verifica que el servidor Node.js esté corriendo
2. ✅ Configura el archivo `.env` con tus credenciales de Gmail
3. ✅ Guarda los datos de tu evento en el Panel Administrativo
4. ✅ Agrega destinatarios y envía invitaciones
5. ✅ Verifica la vista previa antes de enviar

---

## ⚙️ Tecnologías Utilizadas

- **Frontend:**
  - HTML5
  - CSS3 (Responsive)
  - Vanilla JavaScript
  - LocalStorage para persistencia

- **Backend:**
  - Node.js
  - Express.js
  - Nodemailer (para envío de emails)
  - CORS (para desarrollo local)
  - Body Parser (para JSON)

---

## 📝 Notas Importantes

- Los datos del evento se guardan en **memoria del servidor** (resetearse al reiniciar)
- Backup automático en **localStorage** del navegador
- En producción, implementar base de datos real
- CORS habilitado para desarrollo local
- Se requiere Gmail con contraseña de aplicación específica

---

## 🐛 Solución de Problemas

### "Server not responding"
- Verifica que ejecutaste `pnpm start` en `src/backend/`
- Comprueba que el puerto 5000 está disponible

### "Email no se envía"
- Verifica credenciales de Gmail en `.env`
- Usa contraseña de aplicación, no la contraseña normal
- Habilita [acceso a aplicaciones menos seguras](https://myaccount.google.com/lesssecureapps)

### "Datos no se guardan"
- Abre la consola del navegador (F12) para ver errores
- Verifica que el servidor está corriendo

---

## 📦 Archivos Adicionales

En la carpeta `extras/` encontrarás:
- Archivos de versiones anteriores
- Plantillas de referencia
- Archivos de prueba
- Documentación histórica

---

## 📄 Licencia

ISC

---

## ✨ ¿Necesitas Ayuda?

Consulta los archivos de documentación:
- [QUICKSTART.md](QUICKSTART.md) - Inicio rápido
- [docs/ESTRUCTURA.md](docs/ESTRUCTURA.md) - Estructura del proyecto
- [SETUP-CHECKLIST.md](SETUP-CHECKLIST.md) - Lista de verificación

---

**Última actualización:** Mayo 2026
**Versión:** 1.0.0
