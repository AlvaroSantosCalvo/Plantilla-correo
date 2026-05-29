# ⚡ Inicio Rápido

## 1️⃣ Configuración Inicial

```bash
# Ir a la carpeta del backend
cd CONTACT-FORM-BACKEND

# Instalar dependencias
pnpm install
```

## 2️⃣ Configurar Email

Crear `.env` en `CONTACT-FORM-BACKEND/`:

```env
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=contraseña-app-gmail
PORT=5000
```

🔑 [Obtén tu contraseña de aplicación de Gmail aquí](https://myaccount.google.com/apppasswords)

## 3️⃣ Iniciar el Servidor

```bash
pnpm start
```

Debería ver: `Server is Running on http://localhost:5000`

## 4️⃣ Usar la Aplicación

### **Primera vez:**
1. Abre `admin.html` → Completa datos del evento → Guarda
2. Abre `send-invitations.html` → Agrega personas → Envía invitaciones

### **Siguientes veces:**
1. El servidor se acuerda de los datos
2. Solo agrega nuevas personas y envía

---

## 📋 Campos del Evento

- 📅 Fecha y hora
- 📍 Lugar (venue, ciudad, país)
- 🔗 Links (registro, zoom)
- 🎤 Speakers (conferencistas)
- 📧 Email de contacto
- 💬 Descripción

---

## 🎯 Flujo Completo

```
admin.html (guardar datos evento)
    ↓
send-invitations.html (agregar personas + enviar)
    ↓
Backend recibe y envía emails con datos del evento
```

---

## ✅ Listo!

Ahora puedes:
- ✔️ Guardar datos anuales del evento
- ✔️ Enviar invitaciones personalizadas
- ✔️ Ver vista previa del email
- ✔️ Agregar/eliminar destinatarios

¿Problemas? Ver README.md para solución de problemas detallada.
