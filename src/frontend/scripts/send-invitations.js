// Send Invitations Script - Gestión de envío de invitaciones

let eventData = null;
let recipients = [];

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    loadEventData();
    initializeEventListeners();
});

// Inicializar eventos
function initializeEventListeners() {
    document.getElementById('addRecipientBtn').addEventListener('click', addRecipient);
    document.getElementById('sendBtn').addEventListener('click', sendInvitations);
    document.getElementById('previewBtn').addEventListener('click', showPreview);
    document.getElementById('closePreview').addEventListener('click', closePreview);

    // Permitir agregar destinatario con Enter
    document.getElementById('recipientEmail').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addRecipient();
        }
    });
}

// Cargar datos del evento
function loadEventData() {
    const saved = localStorage.getItem('eventData');

    if (saved) {
        eventData = JSON.parse(saved);
        displayEventSummary();
        document.getElementById('emailSubject').value = `¡Estamos felices de invitarte al ${eventData.eventName}!`;
    } else {
        showMessage('⚠️ No hay datos de evento. Por favor, ve al panel administrativo primero.', 'error');
        document.getElementById('sendBtn').disabled = true;
        document.getElementById('previewBtn').disabled = true;
    }
}

// Mostrar resumen del evento
function displayEventSummary() {
    const summary = document.getElementById('eventSummary');

    const dateObj = new Date(`${eventData.eventDate}T${eventData.eventTime}`);
    const dateFormatted = dateObj.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const timeFormatted = dateObj.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
    });

    let speakersHtml = '';
    if (eventData.speakers && eventData.speakers.length > 0) {
        speakersHtml = eventData.speakers.map(s => `<div style="font-size: 12px; color: #666;">${s.name} - ${s.title}</div>`).join('');
    }

    summary.innerHTML = `
        <div style="margin-bottom: 10px;">
            <h4 style="color: #c2002f; margin: 0 0 10px 0; font-size: 16px;">${eventData.eventName} ${eventData.eventEdition}</h4>
        </div>
        
        <div class="summary-item">
            <span class="summary-label">📅 Fecha:</span>
            <span class="summary-value">${dateFormatted}</span>
        </div>
        
        <div class="summary-item">
            <span class="summary-label">⏰ Hora:</span>
            <span class="summary-value">${timeFormatted}</span>
        </div>
        
        <div class="summary-item">
            <span class="summary-label">📍 Lugar:</span>
            <span class="summary-value">${eventData.venue}, ${eventData.city}</span>
        </div>
        
        ${eventData.registrationLink ? `
        <div class="summary-item">
            <span class="summary-label">🔗 Registro:</span>
            <span class="summary-value"><a href="${eventData.registrationLink}" style="color: #c2002f;">Ver</a></span>
        </div>
        ` : ''}
        
        ${speakersHtml ? `
        <div style="padding: 10px 0; border-top: 1px solid #e0e0e0; margin-top: 10px;">
            <div style="font-weight: 600; color: #333; margin-bottom: 8px; font-size: 13px;">🎤 Speakers:</div>
            ${speakersHtml}
        </div>
        ` : ''}
    `;
}

// Agregar destinatario
function addRecipient() {
    const name = document.getElementById('recipientName').value.trim();
    const email = document.getElementById('recipientEmail').value.trim();

    // Validar
    if (!name || !email) {
        showMessage('Por favor completa nombre y email', 'error');
        return;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        showMessage('Email inválido', 'error');
        return;
    }

    // Verificar duplicados
    if (recipients.some(r => r.email === email)) {
        showMessage('Este email ya está en la lista', 'error');
        return;
    }

    // Agregar
    recipients.push({ name, email });
    updateRecipientsList();

    // Limpiar inputs
    document.getElementById('recipientName').value = '';
    document.getElementById('recipientEmail').value = '';
    document.getElementById('recipientName').focus();
}

// Actualizar lista de destinatarios
function updateRecipientsList() {
    const list = document.getElementById('recipientsList');
    const count = document.getElementById('recipientCount');

    count.textContent = recipients.length;

    if (recipients.length === 0) {
        list.innerHTML = '<p style="color: #999; font-size: 13px;">No hay destinatarios agregados</p>';
        return;
    }

    list.innerHTML = recipients.map((recipient, index) => `
        <div class="recipient-item">
            <div class="recipient-info">
                <div class="recipient-name">${recipient.name}</div>
                <div class="recipient-email">${recipient.email}</div>
            </div>
            <button type="button" class="remove-recipient-btn" onclick="removeRecipient(${index})">
                ✕ Eliminar
            </button>
        </div>
    `).join('');
}

// Eliminar destinatario
function removeRecipient(index) {
    recipients.splice(index, 1);
    updateRecipientsList();
}

// Vista previa del email
function showPreview() {
    if (!eventData) {
        showMessage('No hay datos de evento disponibles', 'error');
        return;
    }

    if (recipients.length === 0) {
        showMessage('Agrega al menos un destinatario', 'error');
        return;
    }

    const subject = document.getElementById('emailSubject').value;
    const personalMessage = document.getElementById('emailMessage').value;

    const previewHtml = generateEmailHtml(recipients[0].name, subject, personalMessage);
    document.getElementById('previewContent').innerHTML = previewHtml;
    document.getElementById('previewModal').classList.add('show');
}

// Cerrar vista previa
function closePreview() {
    document.getElementById('previewModal').classList.remove('show');
}

// Generar HTML del email
function generateEmailHtml(name, subject, personalMessage) {
    const dateObj = new Date(`${eventData.eventDate}T${eventData.eventTime}`);
    const dateFormatted = dateObj.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const timeFormatted = dateObj.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
    });

    let speakersHtml = '';
    if (eventData.speakers && eventData.speakers.length > 0) {
        speakersHtml = `
            <div style="margin: 20px 0;">
                <h3 style="color: #c2002f; margin-bottom: 10px;">🎤 Conferencistas</h3>
                ${eventData.speakers.map(s => `
                    <div style="margin-bottom: 10px; padding: 10px; background: #f5f5f5; border-radius: 4px;">
                        <strong>${s.name}</strong><br>
                        <small style="color: #666;">${s.title}</small>
                    </div>
                `).join('')}
            </div>
        `;
    }

    return `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <div style="background: #c2002f; color: white; padding: 20px; border-radius: 4px 4px 0 0;">
                <h2 style="margin: 0; font-size: 24px;">¡${eventData.eventName} ${eventData.eventEdition}}!</h2>
            </div>
            
            <div style="padding: 30px; background: #f9f9f9;">
                <h3 style="color: #333; margin-top: 0;">Hola ${name},</h3>
                
                <p style="font-size: 16px; margin: 20px 0;">
                    Nos complace cordialmente invitarte a participar en nuestro evento anual.
                </p>
                
                <div style="background: white; border-left: 4px solid #c2002f; padding: 20px; margin: 20px 0; border-radius: 4px;">
                    <h4 style="color: #c2002f; margin-top: 0;">📋 Detalles del Evento</h4>
                    
                    <div style="margin: 10px 0;">
                        <strong>Nombre:</strong> ${eventData.eventName}
                    </div>
                    
                    <div style="margin: 10px 0;">
                        <strong>📅 Fecha:</strong> ${dateFormatted}
                    </div>
                    
                    <div style="margin: 10px 0;">
                        <strong>⏰ Hora:</strong> ${timeFormatted}
                    </div>
                    
                    <div style="margin: 10px 0;">
                        <strong>📍 Lugar:</strong> ${eventData.venue}, ${eventData.city}${eventData.country ? `, ${eventData.country}` : ''}
                    </div>
                    
                    ${eventData.eventDescription ? `
                    <div style="margin: 10px 0;">
                        <strong>Descripción:</strong> ${eventData.eventDescription}
                    </div>
                    ` : ''}
                    
                    ${eventData.registrationLink ? `
                    <div style="margin: 20px 0;">
                        <a href="${eventData.registrationLink}" style="background: #c2002f; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">
                            Registrate Aquí
                        </a>
                    </div>
                    ` : ''}
                </div>
                
                ${speakersHtml}
                
                ${personalMessage ? `
                <div style="margin: 20px 0; padding: 15px; background: #e3f2fd; border-left: 4px solid #2196f3; border-radius: 4px;">
                    <strong>📝 Mensaje:</strong><br>
                    ${personalMessage.replace(/\n/g, '<br>')}
                </div>
                ` : ''}
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
                    <p>Esperamos tu participación en este importante evento.</p>
                    <p>Si tienes preguntas, no dudes en contactarnos a <strong>${eventData.contactEmail}</strong></p>
                    ${eventData.contactPhone ? `<p>Teléfono: ${eventData.contactPhone}</p>` : ''}
                </div>
            </div>
        </div>
    `;
}

// Enviar invitaciones
async function sendInvitations() {
    if (!eventData) {
        showMessage('No hay datos de evento disponibles', 'error');
        return;
    }

    if (recipients.length === 0) {
        showMessage('Agrega al menos un destinatario', 'error');
        return;
    }

    const subject = document.getElementById('emailSubject').value.trim();
    if (!subject) {
        showMessage('Por favor ingresa un asunto para el email', 'error');
        return;
    }

    const personalMessage = document.getElementById('emailMessage').value.trim();

    // Mostrar loading
    document.getElementById('loading').style.display = 'block';
    document.getElementById('sendBtn').disabled = true;

    try {
        // Enviar cada invitación
        const results = {
            success: [],
            failed: []
        };

        for (const recipient of recipients) {
            try {
                const response = await fetch('http://localhost:5000/api/send-invitation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        recipientName: recipient.name,
                        recipientEmail: recipient.email,
                        subject: subject,
                        message: personalMessage,
                        eventData: eventData
                    })
                });

                if (response.ok) {
                    results.success.push(recipient.email);
                } else {
                    results.failed.push(recipient.email);
                }
            } catch (error) {
                results.failed.push(recipient.email);
                console.error('Error enviando a', recipient.email, error);
            }
        }

        // Mostrar resultado
        document.getElementById('loading').style.display = 'none';
        document.getElementById('sendBtn').disabled = false;

        if (results.success.length > 0) {
            let message = `✅ Se enviaron ${results.success.length} invitación(es) exitosamente`;
            if (results.failed.length > 0) {
                message += ` (${results.failed.length} fallaron)`;
            }
            showMessage(message, 'success');

            // Limpiar si todo fue exitoso
            if (results.failed.length === 0) {
                recipients = [];
                updateRecipientsList();
                document.getElementById('emailMessage').value = '';
            }
        } else {
            showMessage('❌ No se pudieron enviar las invitaciones', 'error');
        }
    } catch (error) {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('sendBtn').disabled = false;
        showMessage('❌ Error: ' + error.message, 'error');
        console.error('Error:', error);
    }
}

// Mostrar mensaje
function showMessage(text, type) {
    const messageEl = document.getElementById('message');
    messageEl.textContent = text;
    messageEl.className = `message ${type}`;

    // Auto-desaparecer
    setTimeout(() => {
        messageEl.className = 'message';
    }, 6000);
}
