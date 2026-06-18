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

### 📖 **¿Qué es una Terminal y cómo usarla?**

La terminal es un programa donde puedes escribir comandos (órdenes) en lugar de hacer clic en botones. Parece complicado pero es fácil:

**Consejos básicos:**
- ℹ️ La terminal muestra un símbolo `>` o `$` esperando tus comandos
- 📋 Cuando escribas un comando, presiona **Enter** para ejecutarlo
- ⏳ Algunos comandos tardan en terminar (verás muchas líneas de texto)
- ✂️ Para copiar: Presiona **Ctrl + C** en el teclado
- 📌 Para pegar en la terminal: **Clic derecho del ratón** o **Ctrl + V**
- ❌ Si algo sale mal, puedes cerrar la ventana y empezar de nuevo

**Tipos de terminal en Windows:**
- **PowerShell** (recomendado): Más moderno y fácil de usar
- **CMD o Símbolo del Sistema**: El tradicional, funciona igual

---

### **PASO 1: Preparación inicial (Una sola vez)**

Antes de empezar, necesitas:

1. **Una cuenta de correo activa** (Gmail, Outlook, o similar)
2. **Crear una "contraseña de aplicación"**
   
   **Opción A: Si usas Gmail**
   - Ve a: https://myaccount.google.com/apppasswords
   - Selecciona **Teléfono** y **Windows** (o tu dispositivo)
   - Gmail te generará una contraseña de 16 caracteres
   - **Cópiala y guárdala** (la necesitarás)

   **Opción B: Si usas Outlook**
   - Ve a: https://account.microsoft.com/security
   - Haz clic en **"Contraseña de aplicación"** (en la sección de seguridad)
   - Si no aparece, primero habilita la **autenticación de dos pasos**:
     - En la misma página, ve a "Opciones de seguridad"
     - Haz clic en "Agregación autenticación en dos pasos"
     - Sigue los pasos para verificar tu identidad
   - Una vez habilitada la autenticación de dos pasos, vuelve a "Contraseña de aplicación"
   - Selecciona **Correo** y **Windows**
   - Outlook te generará una contraseña de 16 caracteres
   - **Cópiala y guárdala** (la necesitarás)

3. **Node.js instalado en tu computadora**
   - Descarga desde: https://nodejs.org/ (versión LTS)
   - Instálalo siguiendo los pasos

---

### **PASO 2: Configurar el sistema (Una sola vez)**

#### 2.1 - Abre la carpeta del proyecto
1. Haz clic derecho en la **carpeta del proyecto** (`Plantilla-correo`)
2. Selecciona **"Abrir en terminal"** o **"Abrir PowerShell aquí"**
   - Si no ves esta opción, ve a la carpeta en Explorador de Archivos
   - En la barra superior donde dice la ruta, haz clic
   - Escribe `cmd` o `powershell` y presiona Enter

#### 2.2 - Instala las dependencias
En la terminal que se abrió, verás algo como esto:
```
C:\Usuarios\TuNombre\Desktop\Plantilla-correo>
```

1. **Copia y pega este comando** (presiona clic derecho en la terminal para pegar):
```bash
cd src/backend
```

2. Presiona **Enter** y verás:
```
C:\Usuarios\TuNombre\Desktop\Plantilla-correo\src\backend>
```

3. Ahora **copia y pega este otro comando:**
```bash
pnpm install
```

4. Presiona **Enter** - verás que comienza a descargar las dependencias
5. Espera a que termine (pueden ser 2-5 minutos)
6. Cuando veas el símbolo `>` de nuevo, significa que terminó ✅

#### 2.3 - Edita el archivo `.env`
1. Navega a la carpeta: `Plantilla-correo → src → backend`
2. Busca el archivo llamado **`.env`** (ya está creado)
3. Haz clic derecho en el archivo `.env`
4. Selecciona **"Abrir con"** → **"Bloc de Notas"** (o tu editor de texto favorito)
5. Verás el contenido del archivo:
```env
EMAIL_USER = 'tucorreo@gmail.com'
EMAIL_PASS = aaaa bbbb cccc dddd
PORT=5000
```

6. **Edita estos valores:**
   - Reemplaza `tucorreo@gmail.com` con tu correo real (Gmail, Outlook, etc.)
   - Reemplaza `aaaa bbbb cccc dddd` con tu contraseña de 16 caracteres (la que generaste en el PASO 1)
   - **NO toques** `PORT=5000`

7. **Ejemplo de cómo debe verse:**
```env
EMAIL_USER = 'maria@gmail.com'
EMAIL_PASS = 1234 5678 9abc defg
PORT=5000
```

8. Presiona **Ctrl + S** para guardar
9. Cierra el editor

---

### **PASO 3: Iniciar el sistema (Cada vez que uses)**

1. **Abre la terminal en la carpeta `src/backend`:**
   - Ve a la carpeta: `Plantilla-correo → src → backend`
   - Haz clic derecho en la carpeta vacía
   - Selecciona **"Abrir en terminal"** o **"Abrir PowerShell aquí"**
   - Si no aparece, en la barra superior copia la ruta, presiona `Windows + R`, escribe `cmd` y presiona Enter
   - Luego escribe: `cd` (espacio) y pega la ruta

2. **En la terminal, escribe:**
```bash
pnpm start
```

3. Presiona **Enter**

4. **Espera 3-5 segundos** y deberías ver un mensaje similar a:
```
Server is Running on http://localhost:5000
```

5. ⚠️ **IMPORTANTE:** Mantén esta ventana de terminal ABIERTA mientras uses el sistema
   - No la cierres ni minimices
   - Si la cierras, el sistema dejará de funcionar

6. Ahora ve al siguiente PASO 4

---

### **PASO 4: Llenar los datos del evento (Primera vez)**

1. **Abre el navegador** (Chrome, Firefox, Edge, etc.)

2. **Abre el archivo del formulario del evento:**
   - Presiona **Ctrl + O** (o ve a Archivo → Abrir)
   - Navega a: `Plantilla-correo → src → frontend → pages`
   - Selecciona el archivo **`admin.html`**
   - Haz clic en **Abrir**

3. **Deberías ver el formulario del evento en el navegador**

4. **Completa todos los campos:**
   - ✏️ Nombre del evento
   - 📅 Fecha y hora
   - 📍 Ubicación (ciudad y lugar)
   - 🎤 Nombre de los conferencistas (speakers)
   - 📝 Lema o descripción del evento
   - 🎓 Año académico

5. **Haz clic en el botón "Guardar Datos del Evento"**

6. **Espera un segundo** - deberías ver un mensaje de confirmación ✅
   - Si ves un error, verifica que:
     - La terminal con el servidor sigue abierta
     - Todos los campos están completos
     - Escribiste bien el correo en el `.env`

---

### **PASO 5: Enviar invitaciones (Cada vez que quieras)**

1. **Abre el formulario de invitaciones:**
   - En tu navegador, presiona **Ctrl + O**
   - Navega a: `Plantilla-correo → src → frontend → pages`
   - Selecciona **`send-invitations.html`**
   - Haz clic en **Abrir**

2. **En la sección "Agregar Persona":**
   - 📝 Escribe el **nombre** de la persona (ej: "María López")
   - ✉️ Escribe su **correo electrónico** (ej: "maria@gmail.com")
   - Haz clic en **"Agregar a lista"**

3. **Repite el paso anterior** para cada persona que quieras invitar
   - Verás que aparecen en la lista debajo

4. **Revisa la "Lista de Invitados"**
   - Puedes eliminar personas haciendo clic en la ✖️ al lado de su nombre

5. **Haz clic en "Enviar Invitaciones"**

6. **Espera 10-30 segundos** (depende de cuántas personas haya)
   - Verás un mensaje de confirmación ✅
   - Los correos se están enviando en segundo plano

7. ✅ **¡Listo!** Los invitados deberían recibir sus correos en pocos minutos
   - Si no llegan, revisa la carpeta de "Correo no deseado"

---

## 💡 **TIPS ÚTILES PARA PRINCIPIANTES**

### 🚀 **Acelera tu flujo de trabajo**

1. **Abre el navegador ANTES de iniciar el servidor:**
   - Esto evita tener que esperar después de que el servidor esté corriendo

2. **Ten dos ventanas de terminal abiertas:**
   - Una para ejecutar `pnpm start` (déjala abierta siempre)
   - Otra para otros comandos que necesites

3. **Guarda los enlaces en Favoritos:**
   - En tu navegador, guarda `http://localhost:5000` en favoritos
   - Así no tienes que escribir la ruta completa cada vez

4. **Copia y guarda los correos que funcionan:**
   - Una vez que un correo llega correctamente, guarda el asunto y mensaje
   - Puedes reutilizarlos para otros eventos

### ⚠️ **Errores comunes y cómo evitarlos**

| Error | Causa | Solución |
|-------|-------|----------|
| "pnpm no se reconoce" | pnpm no está instalado | Ejecuta `npm install -g pnpm` en la terminal |
| "No se puede conectar" | El servidor no está corriendo | Verifica que la ventana de terminal del servidor está abierta |
| "Puerto 5000 en uso" | Otro programa usa el puerto | Cambia `PORT=5000` a `PORT=5001` en `.env` |
| "El archivo `.env` no funciona" | Se guardó como `.env.txt` | Comprueba que NO tiene extensión `.txt` |
| "Los correos no llegan" | Contraseña incorrecta en `.env` | Verifica que copiaste bien la contraseña de 16 caracteres |

### 📞 **¿Qué hacer si algo no funciona?**

1. **Lee el mensaje de error en la terminal:**
   - Es tu mejor pista sobre qué está mal
   - Cópialo y búscalo en Google

2. **Reinicia el servidor:**
   - Cierra la terminal con el servidor (presiona Ctrl + C)
   - Abre una nueva terminal
   - Ejecuta `cd src/backend` luego `pnpm start`

3. **Verifica los datos en `.env`:**
   - Correo sin espacios
   - Contraseña de 16 caracteres exactamente
   - Sintaxis correcta

---

## ⚠️ Solución de problemas comunes

### **Problema: "Server is not running" o error de conexión**
- ✅ **Solución:** Abre la terminal en `src/backend` y ejecuta `pnpm start`
- ✅ Asegúrate de que la ventana de terminal esté abierta

### **Problema: No llegan los correos**
- ✅ Verifica que la contraseña en `.env` sea la de 16 caracteres
- ✅ Asegúrate de usar una cuenta con contraseña de aplicación generada
- ✅ Si usas Gmail: revisa la carpeta de "Correo no deseado" del destinatario
- ✅ Si usas Outlook: asegúrate de haber habilitado autenticación de dos pasos primero

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
EMAIL_USER=tu-email@gmail.com  (o tu-email@outlook.com, o cualquier proveedor SMTP)
EMAIL_PASS=tu-contraseña-app-especifica
PORT=5000
```

**Nota:** Funciona con cualquier proveedor que soporte SMTP (Gmail, Outlook, etc.), solo necesita la contraseña de aplicación generada.

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
- Se requiere contraseña de aplicación específica (funciona con Gmail, Outlook y otros proveedores SMTP)

---

## 🐛 Solución de Problemas

### "Server not responding"
- Verifica que ejecutaste `pnpm start` en `src/backend/`
- Comprueba que el puerto 5000 está disponible

### "Email no se envía"
- Verifica credenciales en `.env`
- Usa contraseña de aplicación, no la contraseña normal
- **Para Gmail:** Habilita [acceso a aplicaciones menos seguras](https://myaccount.google.com/lesssecureapps)
- **Para Outlook:** Verifica que tengas habilitada la autenticación de dos pasos

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
