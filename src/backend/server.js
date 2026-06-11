import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000 || process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

// Nodemailer Transporterr Configuration
const transporter = nodemailer.createTransport({
  service: "gmail", // Replace with your email provider (ej, Outlook, Yahoo)
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your app-specific password
  },
});

// Almacenamiento en memoria para datos del evento (en producción usar base de datos)
let eventData = null;

// Endpoint para guardar/actualizar datos del evento
app.post("/api/event", (req, res) => {
  const { eventName, eventDate, eventTime, venue, city, eventLemma, academicYear, speaker1Name, speaker1Association, speaker2Name, speaker2Association } = req.body;

  // Validar campos obligatorios
  if (!eventName || !eventDate || !eventTime || !venue || !city || !eventLemma || !academicYear || !speaker1Name || !speaker1Association || !speaker2Name || !speaker2Association) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  // Guardar datos del evento (aceptar todos los campos del request)
  eventData = req.body;

  console.log("Event data saved:", eventName, eventDate);
  res.status(200).json({ 
    success: true, 
    message: "Datos del evento guardados",
    event: eventData 
  });
});

// Endpoint para obtener datos del evento
app.get("/api/event", (req, res) => {
  if (!eventData) {
    return res.status(404).json({ error: "No se han guardado datos del evento" });
  }

  res.status(200).json(eventData);
});

// Endpoint para enviar invitaciones personalizadas
app.post("/api/send-invitation", (req, res) => {
  const { recipientName, recipientEmail, subject, message: personalMessage, eventData: event } = req.body;

  if (!recipientName || !recipientEmail || !subject || !event) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  // Generar HTML del email
  const emailHtml = generateInvitationHtml(recipientName, personalMessage, event);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: subject,
    html: emailHtml,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error enviando email a " + recipientEmail + ":", error);
      return res.status(500).json({ error: "Fallo al enviar el email de invitación" });
    }

    console.log("Email de invitación enviado a:", recipientEmail);
    res.status(200).json({ 
      success: true, 
      message: `Invitación enviada a ${recipientEmail}` 
    });
  });
});

// Función para generar HTML de invitación usando la plantilla
function generateInvitationHtml(recipientName, personalMessage, event) {
  try {
    // Ruta a la plantilla
    const templatePath = path.join(__dirname, '..', 'templates', 'email-template.html');
    console.log("Leyendo template de:", templatePath);
    
    let template = fs.readFileSync(templatePath, 'utf-8');
    console.log("Template cargado exitosamente, longitud:", template.length);

    // Formatear fecha y hora
    const dateObj = new Date(`${event.eventDate}T${event.eventTime}`);
    const dateFormatted = dateObj.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const timeFormatted = dateObj.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Obtener info de speakers
    let speaker1Name = event.speaker1Name || (event.speakers && event.speakers[0] ? event.speakers[0].name : "");
    let speaker1Assoc = event.speaker1Association || (event.speakers && event.speakers[0] ? event.speakers[0].title : "");
    let speaker2Name = event.speaker2Name || (event.speakers && event.speakers[1] ? event.speakers[1].name : "");
    let speaker2Assoc = event.speaker2Association || (event.speakers && event.speakers[1] ? event.speakers[1].title : "");

    // Preparar lugar (venue + city)
    const place = `${event.venue}, ${event.city}${event.country ? `, ${event.country}` : ""}`;

    // Obtener fecha límite de registro
    const registerDeadline = event.registrationDeadline 
      ? new Date(event.registrationDeadline).toLocaleDateString("es-ES")
      : "";

    console.log("Variables to replace:");
    console.log("- name:", recipientName);
    console.log("- event_name:", event.eventName);
    console.log("- event_lemma:", event.eventLemma);
    console.log("- academic_year:", event.academicYear);
    console.log("- speaker1:", speaker1Name);
    console.log("- speaker2:", speaker2Name);

    // Reemplazar variables en la plantilla
    let html = template
      .replace(/{{name}}/g, recipientName || "")
      .replace(/{{date}}/g, dateFormatted || "")
      .replace(/{{time}}/g, timeFormatted || "")
      .replace(/{{place}}/g, place || "")
      .replace(/{{event_name}}/g, event.eventName || "")
      .replace(/{{event_lemma}}/g, event.eventLemma || event.eventDescription || "")
      .replace(/{{academic_year}}/g, event.academicYear || "")
      .replace(/{{speaker1}}/g, speaker1Name || "")
      .replace(/{{speaker1_association}}/g, speaker1Assoc || "")
      .replace(/{{speaker2}}/g, speaker2Name || "")
      .replace(/{{speaker2_association}}/g, speaker2Assoc || "")
      .replace(/{{register_link}}/g, `<a href="${event.registrationLink}" style="color: #c2002f; text-decoration: none;">este enlace</a>` || "")
      .replace(/{{register_deadline}}/g, registerDeadline || "");

    console.log("HTML generado, longitud:", html.length);
    return html;
  } catch (error) {
    console.error("Error leyendo template:", error);
    console.error("Stack trace:", error.stack);
    
    // Fallback: return simple HTML if template not found
    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Invitación</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f7f7f7;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px;">
          <div style="background-color: #c2002f; color: white; padding: 20px; text-align: center; margin-bottom: 20px;">
            <h2 style="margin: 0;">${event.eventName}</h2>
          </div>
          
          <h3>Estimado/a ${recipientName},</h3>
          
          <p>Nos complace invitarle a <strong>${event.eventName}</strong>.</p>
          
          <div style="background: #f5f5f5; padding: 15px; margin: 20px 0; border-left: 4px solid #c2002f;">
            <h4>📋 Detalles del Evento:</h4>
            <p><strong>Fecha:</strong> ${event.eventDate} a las ${event.eventTime}</p>
            <p><strong>Lugar:</strong> ${event.venue}, ${event.city}${event.country ? `, ${event.country}` : ""}</p>
            <p><strong>Lema:</strong> ${event.eventLemma || event.eventDescription}</p>
            <p><strong>Año Académico:</strong> ${event.academicYear}</p>
            ${event.speaker1Name ? `<p><strong>Oradores:</strong> ${event.speaker1Name} (${event.speaker1Association}) y ${event.speaker2Name} (${event.speaker2Association})</p>` : ""}
            ${event.registrationLink ? `<p><a href="${event.registrationLink}" style="background: #c2002f; color: white; padding: 10px 20px; text-decoration: none; display: inline-block; border-radius: 4px;">Inscribirse</a></p>` : ""}
          </div>
          
          <p><strong style="color: #c2002f;">¡Te esperamos!</strong></p>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="font-size: 12px; color: #666; text-align: center;">
            Contacto: ${event.contactEmail}
            ${event.contactPhone ? `<br>Teléfono: ${event.contactPhone}` : ""}
          </p>
        </div>
      </body>
      </html>
    `;
  }
}

app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`)
})
