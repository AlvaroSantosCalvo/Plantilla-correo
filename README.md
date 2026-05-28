# 📧 Sistema de Plantilla de Email - Invitaciones a Evento Anual

Un sistema completo para gestionar y enviar invitaciones personalizadas a eventos anuales. Incluye panel administrativo para guardar datos del evento y formulario para enviar invitaciones.

---

## 📁 Estructura del Proyecto

```
PlantillaEmail/
├── admin.html                    # Panel administrativo para gestionar datos del evento
├── admin-script.js              # Script del panel administrativo
├── send-invitations.html        # Formulario para enviar invitaciones
├── send-invitations-script.js   # Script para gestionar envío de invitaciones
├── formulario.html              # Formulario de contacto general
├── CONTACT-FORM-BACKEND/        # Backend Node.js/Express
│   ├── server.js               # Servidor con endpoints
│   ├── script.js               # Script para formulario de contacto
│   ├── package.json            # Dependencias
│   └── pnpm-lock.yaml         # Lock file
├── EMAIL-TEMPLATE/              # Plantillas de email
│   ├── email-template.html     # Plantilla base
│   └── assets/                 # Imágenes y recursos
└── imgs/                        # Imágenes globales
```

---

## 🚀 Instalación y Configuración

### 1. **Instalar Dependencias**

```bash
cd CONTACT-FORM-BACKEND
pnpm install
# o npm install
```

### 2. **Configurar Variables de Entorno**

Crear archivo `.env` en `CONTACT-FORM-BACKEND/`:

```env
# Gmail Configuration
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-contraseña-app-especifica
PORT=5000
```

**Nota:** Para Gmail, usa una [contraseña de aplicación](https://myaccount.google.com/apppasswords) en lugar de tu contraseña normal.

### 3. **Iniciar el Servidor**

```bash
cd CONTACT-FORM-BACKEND
pnpm start
# o npm start
```

El servidor estará disponible en `http://localhost:5000`

---

## 📖 Cómo Usar

### **Paso 1: Acceder al Panel Administrativo**

Abre `admin.html` en tu navegador:
- Completa los datos del evento:
  - **Información General:** Nombre, edición/año, descripción
  - **Fecha y Hora:** Fecha, hora de inicio, duración
  - **Ubicación:** Lugar, ciudad, país, dirección
  - **Enlaces:** Links de registro y streaming
  - **Contacto:** Email y teléfono
  - **Speakers:** Agrega conferencistas con su nombre y cargo

Haz clic en **"💾 Guardar Datos del Evento"** para guardar (se almacena localmente y en el servidor si está disponible).

### **Paso 2: Enviar Invitaciones**

Abre `send-invitations.html` en tu navegador:

1. **Verifica el Resumen del Evento:** Los datos guardados aparecerán automáticamente
2. **Personaliza el Mensaje:**
   - Modifica el **Asunto** del email
   - Escribe un **Mensaje Personalizado** (opcional)
3. **Agrega Destinatarios:**
   - Ingresa nombre y email
   - Haz clic en **"+ Agregar Destinatario"**
4. **Vista Previa:** Haz clic en **"👁️ Vista Previa"** para ver cómo se vería el email
5. **Envía:** Haz clic en **"📨 Enviar Invitaciones"**

---

## 🔧 Endpoints de la API

### **POST /api/event**
Guardar o actualizar datos del evento.

**Body:**
```json
{
  "eventName": "Summit 2026",
  "eventEdition": "2026",
  "eventDate": "2026-05-28",
  "eventTime": "09:00",
  "venue": "Centro de Convenciones",
  "city": "La Paz",
  "country": "Bolivia",
  "contactEmail": "contacto@evento.com",
  "speakers": [
    { "name": "Juan Pérez", "title": "CEO" }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Event data saved successfully",
  "event": { ... }
}
```

---

### **GET /api/event**
Obtener datos del evento guardado.

**Response:**
```json
{
  "eventName": "Summit 2026",
  "eventEdition": "2026",
  ...
}
```

---

### **POST /api/send-invitation**
Enviar invitación personalizada.

**Body:**
```json
{
  "recipientName": "María López",
  "recipientEmail": "maria@ejemplo.com",
  "subject": "¡Te invitamos al Summit 2026!",
  "message": "Mensaje personalizado aquí",
  "eventData": { ... }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Invitation sent to maria@ejemplo.com"
}
```

---

## 💾 Almacenamiento de Datos

- **LocalStorage:** Los datos se guardan en el navegador del cliente (persiste entre sesiones)
- **Servidor:** Opcional. Si el servidor está disponible, también se guardan en el backend
- **Email:** Se envía a través de Nodemailer + Gmail

---

## 🎨 Personalización

### **Cambiar Colores**

El color principal es `#c2002f` (rojo). Para cambiar:

1. **En admin.html:** Busca `.header { background: linear-gradient(...)`
2. **En send-invitations.html:** Busca `.header { background: linear-gradient(...)`
3. **En send-invitations-script.js:** Busca `color: #c2002f`

Reemplaza con tu color preferido.

### **Modificar Campos del Evento**

En `admin.html`, agrega nuevos campos dentro de `<div class="form-section">`:

```html
<label for="newField">Mi Campo</label>
<input type="text" id="newField" name="newField" placeholder="...">
```

Luego en `admin-script.js`, agrega en la función `collectSpeakers()`:

```javascript
eventData.newField = document.getElementById('newField').value;
```

---

## 🐛 Solución de Problemas

### **"No hay datos de evento"**
- Asegúrate de haber guardado los datos en `admin.html` primero
- Limpia el caché del navegador y actualiza

### **"Error al enviar emails"**
- Verifica que el servidor está corriendo: `http://localhost:5000`
- Comprueba las credenciales de Gmail en `.env`
- Asegúrate que la contraseña de aplicación de Gmail es correcta
- El servidor debe estar corriendo: `pnpm start`

### **"El servidor no está disponible"**
- Inicia el servidor: `cd CONTACT-FORM-BACKEND && pnpm start`
- Los datos se guardarán localmente si el servidor no está disponible

### **Emails no llegan**
- Revisa carpeta de Spam/Correo no deseado
- Verifica el email de destino
- Comprueba los logs del servidor para errores

---

## 📝 Notas Importantes

1. **Seguridad:** 
   - No commits `.env` con credenciales reales a repositorios públicos
   - Usa contraseñas de aplicación, no contraseñas de cuenta
   - En producción, usa una base de datos en lugar de almacenamiento en memoria

2. **Límites:**
   - Por defecto, se pueden enviar invitaciones a múltiples personas
   - Gmail tiene límites de envío (~500 emails/día)
   - Para proyectos grandes, considera usar servicios como SendGrid

3. **Base de Datos:**
   - Actualmente se usa almacenamiento en memoria en el servidor
   - Para persistencia, implementa MongoDB, PostgreSQL, etc.

---

## 📞 Soporte

Si tienes problemas:
1. Revisa la consola del navegador (F12 → Console)
2. Revisa los logs del servidor (terminal donde corre Node)
3. Verifica que todos los puertos están disponibles
4. Intenta reiniciar el servidor

---

**¡Listo!** Ahora puedes gestionar y enviar invitaciones a tu evento anual. 🎉
