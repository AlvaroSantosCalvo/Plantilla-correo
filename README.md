# 📧 Sistema de Plantilla de Email - Invitaciones a Evento Anual

Un sistema completo para gestionar y enviar invitaciones personalizadas a eventos anuales. Incluye panel administrativo para guardar datos del evento y formulario para enviar invitaciones.

---

## 📁 Estructura del Proyecto (Reorganizada)

```
src/
├── frontend/
│   ├── pages/
│   │   ├── index.html                    # Centro de control
│   │   ├── admin.html                    # Panel administrativo
│   │   └── send-invitations.html         # Envío de invitaciones
│   └── scripts/
│       ├── admin.js                      # Scripts del panel
│       ├── send-invitations.js           # Scripts de invitaciones
├── backend/
│   ├── server.js                         # Servidor Express
│   ├── package.json                      # Dependencias
│   ├── .env.example                      # Ejemplo de configuración
│   └── pnpm-lock.yaml                   # Lock file
└── templates/                            # Plantillas de email (futuro)
docs/
├── ESTRUCTURA.md                         # Documentación de estructura
README.md                                 # Este archivo
QUICKSTART.md                             # Inicio rápido
```

---

## 🚀 Instalación y Configuración

### 1. **Instalar Dependencias**

```bash
cd src/backend
pnpm install
# o npm install
```

### 2. **Configurar Variables de Entorno**

Crear archivo `.env` en `src/backend/`:

```env
# Gmail Configuration
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-contraseña-app-especifica
PORT=5000
```

**Nota:** Para Gmail, usa una [contraseña de aplicación](https://myaccount.google.com/apppasswords) en lugar de tu contraseña normal.

### 3. **Iniciar el Servidor**

```bash
npm start
# O con pnpm
pnpm start
```

Debería ver: `Server is Running on http://localhost:5000`

---

## 📋 Flujo de Uso

### Primera vez:
1. **Abre** `src/frontend/pages/index.html` en el navegador
2. **Ve a** "Panel Administrativo" → completa datos del evento → guarda
3. **Ve a** "Enviar Invitaciones" → agrega personas → envía

### Siguientes veces:
1. Los datos se recuerdan automáticamente
2. Solo agrega nuevas personas y envía

---

## 🔗 Endpoints de API

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
- 🔗 **Links** (registro, zoom)
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
- Verifica que ejecutaste `npm start` en `src/backend/`
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
