import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

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

app.post("/api/contact", (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if(!name || !email || !phone || !subject || !message) {
    return res.status(400).json({error: "All fields are required."});
  }

  // Admin Email Template
  const adminHtml = `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Message:</strong></p>
    <p>>${message}</p>
  </div>
  `;

  // User Acknowledgement Email Template
  const userHtml = `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
    <h2>New Contact Form Submission</h2>
    <p>Dear ${name}</p>
    <p>Thank you for contacting us</p>
  </div>
  `;

  // Email to You
  const adminMailOptions = {
    from: email,
    to: process.env.EMAIL_USER, // Your email (admin email)
    subject: `${subject}`,
    html: adminHtml,
  }

  // Acknowlodgement Email to User
  const userMailOptions = {
    from: process.env.EMAIL_USER, // Your email
    to: email, // User's email
    subject: 'Thank you for contacting us!',
    html: userHtml,
  }

  // Send Emails
  transporter.sendMail(adminMailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email to admin: ', error);
        return res.status(500).json({ error: 'Failed to send email to admin.' });
    }

    console.log('Admin email sent: ', info.response);

    transporter.sendMail(userMailOptions, (error, info) => {
        if (error) {
            console.error('Error sending acknowledgement email to user: ', error);
            return res.status(500).json({ error: 'Failed to send acknowledgement email.'});
        }

        console.log('Acknowledgement email sent: ', info.response);
        res.status(200).json({ success: true, message: 'Emails sent successfully!' });
    });
  });
})

// Almacenamiento en memoria para datos del evento (en producción usar base de datos)
let eventData = null;

// Endpoint para guardar/actualizar datos del evento
app.post("/api/event", (req, res) => {
  const { eventName, eventDate, eventTime, venue, city, contactEmail, ...otherData } = req.body;

  // Validar campos obligatorios
  if (!eventName || !eventDate || !eventTime || !venue || !city || !contactEmail) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Guardar datos del evento
  eventData = req.body;

  console.log("Event data saved:", eventName, eventDate);
  res.status(200).json({ 
    success: true, 
    message: "Event data saved successfully",
    event: eventData 
  });
});

// Endpoint para obtener datos del evento
app.get("/api/event", (req, res) => {
  if (!eventData) {
    return res.status(404).json({ error: "No event data found" });
  }

  res.status(200).json(eventData);
});

// Endpoint para enviar invitaciones personalizadas
app.post("/api/send-invitation", (req, res) => {
  const { recipientName, recipientEmail, subject, message: personalMessage, eventData: event } = req.body;

  if (!recipientName || !recipientEmail || !subject || !event) {
    return res.status(400).json({ error: "Missing required fields" });
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
      console.error("Error sending invitation to " + recipientEmail + ":", error);
      return res.status(500).json({ error: "Failed to send invitation email" });
    }

    console.log("Invitation email sent to:", recipientEmail);
    res.status(200).json({ 
      success: true, 
      message: `Invitation sent to ${recipientEmail}` 
    });
  });
});

// Función para generar HTML de invitación
function generateInvitationHtml(recipientName, personalMessage, event) {
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

  let speakersHtml = "";
  if (event.speakers && event.speakers.length > 0) {
    speakersHtml = `
      <div style="margin: 20px 0;">
        <h3 style="color: #c2002f; margin-bottom: 10px;">🎤 Conferencistas</h3>
        ${event.speakers
          .map(
            (s) => `
          <div style="margin-bottom: 10px; padding: 10px; background: #f5f5f5; border-radius: 4px;">
            <strong>${s.name}</strong><br>
            <small style="color: #666;">${s.title}</small>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  }

  const registrationButtonHtml = event.registrationLink
    ? `
    <div style="margin: 20px 0;">
      <a href="${event.registrationLink}" style="background: #c2002f; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">
        Registrate Aquí
      </a>
    </div>
  `
    : "";

  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #c2002f 0%, #a00026 100%); color: white; padding: 30px; border-radius: 4px 4px 0 0; text-align: center;">
        <h2 style="margin: 0; font-size: 28px;">¡${event.eventName} ${event.eventEdition}!</h2>
      </div>
      
      <div style="padding: 30px; background: #f9f9f9; border-radius: 0 0 4px 4px;">
        <h3 style="color: #333; margin-top: 0;">Hola ${recipientName},</h3>
        
        <p style="font-size: 16px; margin: 20px 0; color: #555;">
          Nos complace cordialmente invitarte a participar en nuestro evento anual. Será una excelente oportunidad para conectar, aprender y crecer juntos.
        </p>
        
        <div style="background: white; border-left: 4px solid #c2002f; padding: 20px; margin: 20px 0; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h4 style="color: #c2002f; margin-top: 0; font-size: 18px;">📋 Detalles del Evento</h4>
          
          <div style="margin: 12px 0; padding: 8px 0; border-bottom: 1px solid #e0e0e0;">
            <strong>Nombre del Evento:</strong><br>
            ${event.eventName}
          </div>
          
          <div style="margin: 12px 0; padding: 8px 0; border-bottom: 1px solid #e0e0e0;">
            <strong>📅 Fecha:</strong><br>
            ${dateFormatted}
          </div>
          
          <div style="margin: 12px 0; padding: 8px 0; border-bottom: 1px solid #e0e0e0;">
            <strong>⏰ Hora:</strong><br>
            ${timeFormatted}
          </div>
          
          <div style="margin: 12px 0; padding: 8px 0; border-bottom: 1px solid #e0e0e0;">
            <strong>📍 Lugar:</strong><br>
            ${event.venue}, ${event.city}${event.country ? `, ${event.country}` : ""}
          </div>
          
          ${event.address ? `
          <div style="margin: 12px 0; padding: 8px 0; border-bottom: 1px solid #e0e0e0;">
            <strong>Dirección Completa:</strong><br>
            ${event.address}
          </div>
          ` : ""}
          
          ${event.eventDescription ? `
          <div style="margin: 12px 0; padding: 8px 0; border-bottom: 1px solid #e0e0e0;">
            <strong>Descripción:</strong><br>
            ${event.eventDescription}
          </div>
          ` : ""}
          
          ${event.registrationDeadline ? `
          <div style="margin: 12px 0; padding: 8px 0; border-bottom: 1px solid #e0e0e0;">
            <strong>Fecha Límite de Registro:</strong><br>
            ${new Date(event.registrationDeadline).toLocaleDateString("es-ES")}
          </div>
          ` : ""}
          
          ${registrationButtonHtml}
        </div>
        
        ${speakersHtml}
        
        ${personalMessage ? `
        <div style="margin: 20px 0; padding: 15px; background: #e3f2fd; border-left: 4px solid #2196f3; border-radius: 4px;">
          <strong>📝 Mensaje Especial:</strong><br>
          ${personalMessage.replace(/\n/g, "<br>")}
        </div>
        ` : ""}
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 13px;">
          <p>Esperamos con entusiasmo tu participación en este importante evento. Si tienes alguna pregunta, no dudes en contactarnos.</p>
          <p style="margin: 10px 0;">
            <strong>Email de Contacto:</strong> ${event.contactEmail}
          </p>
          ${event.contactPhone ? `<p style="margin: 10px 0;"><strong>Teléfono:</strong> ${event.contactPhone}</p>` : ""}
        </div>
        
        <div style="margin-top: 20px; text-align: center; color: #999; font-size: 11px; border-top: 1px solid #e0e0e0; padding-top: 20px;">
          <p>© ${new Date().getFullYear()} ${event.eventName}. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  `;
}

app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`)
})
