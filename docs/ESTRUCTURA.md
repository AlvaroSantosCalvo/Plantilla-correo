# Estructura Organizada del Proyecto

## 📁 Descripción de Carpetas

### `src/frontend/pages/`
Contiene todos los archivos HTML de las páginas principales:
- `index.html` - Centro de control principal
- `admin.html` - Panel administrativo para gestionar datos del evento
- `send-invitations.html` - Formulario para enviar invitaciones
- `contact.html` - Formulario de contacto general

### `src/frontend/scripts/`
Scripts JavaScript asociados a cada página:
- `admin.js` - Lógica del panel administrativo
- `send-invitations.js` - Lógica para enviar invitaciones
- `contact.js` - Lógica del formulario de contacto

### `src/backend/`
Contiene la aplicación Node.js/Express:
- `server.js` - Servidor principal con todos los endpoints
- `package.json` - Dependencias del proyecto

### `src/templates/`
Plantillas de email (para uso futuro si se requiere templates externas)

### `docs/`
Documentación del proyecto:
- Guías de uso
- Documentación técnica
- Notas de desarrollo

### `extras/`
Archivos no utilizados en la estructura principal (para referencia o futura expansión)

## 🚀 Cómo Empezar

1. **Instalar dependencias del backend:**
   ```bash
   cd src/backend
   pnpm install
   ```

2. **Configurar variables de entorno:**
   Crear archivo `.env` en `src/backend/`:
   ```env
   EMAIL_USER=tu-email@gmail.com
   EMAIL_PASS=tu-contraseña-app-gmail
   PORT=5000
   ```

3. **Iniciar el servidor:**
   ```bash
   npm start
   ```

4. **Abrir la aplicación:**
   - Abre `src/frontend/pages/index.html` en tu navegador
   - O sirve los archivos con un servidor local

## 🔗 Rutas de API

### `POST /api/contact`
Envía formularios de contacto

### `POST /api/event`
Guarda datos del evento

### `GET /api/event`
Obtiene datos guardados del evento

### `POST /api/send-invitation`
Envía invitaciones personalizadas

## ⚙️ Notas Técnicas

- Los datos del evento se guardan en memoria en el servidor (en producción usar base de datos)
- Los datos también se guardan en localStorage del navegador como respaldo
- Se requiere Gmail con contraseña de aplicación específica
- CORS está habilitado para desarrollo local
