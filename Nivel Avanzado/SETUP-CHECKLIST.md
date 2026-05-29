# ✅ Checklist de Instalación y Configuración

## 🔧 Configuración Inicial

### Paso 1: Clonar/Descargar el Proyecto
- [ ] Proyecto descargado/clonado
- [ ] Todos los archivos en `PlantillaEmail/`

### Paso 2: Instalar Node.js y npm/pnpm
- [ ] Node.js instalado (`node --version`)
- [ ] npm o pnpm instalado (`npm --version` o `pnpm --version`)

### Paso 3: Instalar Dependencias Backend
```bash
cd CONTACT-FORM-BACKEND
pnpm install
```
- [ ] `node_modules/` creado
- [ ] `pnpm-lock.yaml` actualizado (si usas pnpm)

### Paso 4: Configurar Credenciales de Gmail

#### 4a. Habilitar "Less secure app access" (alternativa antigua)
- [ ] Opción 1: Ir a https://myaccount.google.com/lesssecureapps
- [ ] Permitir acceso a aplicaciones menos seguras

#### 4b. Usar Contraseña de Aplicación (RECOMENDADO)
- [ ] Ir a https://myaccount.google.com/apppasswords
- [ ] Seleccionar: Mail → Windows Computer (o tu dispositivo)
- [ ] Copiar la contraseña de 16 caracteres generada

### Paso 5: Crear archivo .env
```bash
cd CONTACT-FORM-BACKEND
cp .env.example .env
```
- [ ] Archivo `.env` creado en `CONTACT-FORM-BACKEND/`
- [ ] EMAIL_USER completado con tu email de Gmail
- [ ] EMAIL_PASS completado con tu contraseña de aplicación
- [ ] PORT configurado (por defecto 5000)

**⚠️ Verificar:**
```env
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
PORT=5000
```

---

## 🚀 Iniciar el Sistema

### Paso 6: Iniciar el Servidor Backend
```bash
cd CONTACT-FORM-BACKEND
pnpm start
# o: npm start
```
- [ ] Servidor iniciado correctamente
- [ ] Ver en terminal: `Server is Running on http://localhost:5000`

### Paso 7: Abrir en Navegador
- [ ] Abrir `index.html` en el navegador
- [ ] Verificar que se ve el "Centro de Control"

---

## 📋 Verificar Conexiones

### Verificar Servidor Backend
En "Centro de Control" (index.html):
- [ ] Estado del Servidor: ✓ Conectado
- [ ] Debería decir: "✓ Conectado http://localhost:5000"

### Verificar LocalStorage
En "Centro de Control":
- [ ] Almacenamiento Local: ✓ Disponible
- [ ] Debería mostrar: "Disponible (X item(s) guardado(s))"

### Verificar Gmail
- [ ] Abre tu email de Gmail
- [ ] Busca un email de prueba
- [ ] Si recibes emails: ✓ Gmail conectado correctamente

---

## 🎯 Primera Prueba

### Test 1: Guardar Datos del Evento
1. [ ] Abre `admin.html` desde el Centro de Control
2. [ ] Completa los campos:
   - Nombre del Evento: "Test Event"
   - Fecha: Hoy
   - Hora: 10:00
   - Lugar: "Test Venue"
   - Ciudad: "Test City"
   - Email: tu-email@gmail.com
3. [ ] Agrega un Speaker
4. [ ] Click en "💾 Guardar Datos del Evento"
5. [ ] Debería ver: "✅ ¡Datos del evento guardados exitosamente!"

### Test 2: Ver Datos Guardados
1. [ ] Regresa a `send-invitations.html`
2. [ ] El Resumen del Evento debe mostrar los datos guardados
3. [ ] Debe decir: "Test Event"

### Test 3: Enviar Invitación de Prueba
1. [ ] En `send-invitations.html`
2. [ ] Agrega destinatario:
   - Nombre: "Tu Nombre"
   - Email: tu-email@gmail.com
3. [ ] Click en "👁️ Vista Previa"
4. [ ] Verifica que se ve correctamente
5. [ ] Cierra la vista previa
6. [ ] Click en "📨 Enviar Invitaciones"
7. [ ] Espera a que se envíe
8. [ ] Debería ver: "✅ Se enviaron 1 invitación(es) exitosamente"

### Test 4: Verificar Email
1. [ ] Abre tu email
2. [ ] Busca el email recibido
3. [ ] Verifica:
   - [ ] Asunto personalizado
   - [ ] Datos del evento corretos
   - [ ] Botón de registro
   - [ ] Información de contacto
   - [ ] Speakers listados

---

## 🐛 Troubleshooting

### Problema: "Server is not running"
- [ ] ¿Ejecutaste `pnpm start`?
- [ ] ¿El terminal sigue abierto?
- [ ] ¿Puerto 5000 está disponible?
- [ ] Solución: Abre nueva terminal y ejecuta: `cd CONTACT-FORM-BACKEND && pnpm start`

### Problema: "No hay datos de evento"
- [ ] ¿Guardaste datos en `admin.html`?
- [ ] ¿Actualiza la página (`F5`)?
- [ ] ¿Limpiaste el caché?
- [ ] Solución: Ve a `admin.html`, completa y guarda nuevamente

### Problema: "Error al enviar emails"
- [ ] ¿EMAIL_USER es correcto en `.env`?
- [ ] ¿EMAIL_PASS es la contraseña de app (no la contraseña normal)?
- [ ] ¿Habilitaste "Less secure apps" O creaste contraseña de app?
- [ ] Solución: Verifica `.env` y reinicia servidor

### Problema: "SMTP Error: Invalid login"
- [ ] La contraseña de Gmail es incorrecta
- [ ] Solución: Genera nueva contraseña de aplicación en https://myaccount.google.com/apppasswords

### Problema: "Connect ECONNREFUSED"
- [ ] El servidor no está corriendo
- [ ] Solución: `cd CONTACT-FORM-BACKEND && pnpm start`

---

## 📊 Verificación Final

**Ejecuta esta checklist antes de dar por completo el setup:**

- [ ] Node.js funcionando
- [ ] Dependencias instaladas (`node_modules/` existe)
- [ ] Archivo `.env` configurado correctamente
- [ ] Servidor Backend corriendo (`pnpm start` activo)
- [ ] Se puede acceder a `index.html`
- [ ] Centro de Control muestra servidor conectado ✓
- [ ] Se pueden guardar datos en `admin.html`
- [ ] Los datos aparecen en `send-invitations.html`
- [ ] Se puede enviar email de prueba
- [ ] Email llega a tu bandeja de entrada
- [ ] Email contiene todos los datos correctamente

---

## 🎉 ¡Listo!

Si todo está verde (✓), tu sistema está 100% funcional.

**Siguiente paso:** Lee `QUICKSTART.md` para empezar a usar el sistema.

---

## 📞 Ayuda

Si algo no funciona:
1. Revisa los logs del servidor (terminal donde corre `pnpm start`)
2. Abre DevTools en el navegador (F12 → Console)
3. Verifica que `.env` está bien configurado
4. Intenta reiniciar el servidor
5. Lee `README.md` para más detalles
