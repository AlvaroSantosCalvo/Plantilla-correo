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

    const previewHtml = generateEmailHtml(recipients[0].name);
    document.getElementById('previewContent').innerHTML = previewHtml;
    document.getElementById('previewModal').classList.add('show');
}

// Cerrar vista previa
function closePreview() {
    document.getElementById('previewModal').classList.remove('show');
}

// Generar HTML del email
function generateEmailHtml(name) {
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

    const place = `${eventData.venue}, ${eventData.city}${eventData.country ? `, ${eventData.country}` : ''}`;

    return `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background-color: #f7f7f7; color: #333;">
            <div style="max-width: 600px; margin: auto; background-color: #fff;">
                <div style="width: 100%; height: 20px; background-color: #c2002f;"></div>
                
                <div style="display: flex; justify-content: space-around; align-items: center; background-color: #c2002f; color: #fff; padding: 15px 20px; font-size: 13px; font-weight: 500;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span>📅</span>
                        <span>${dateFormatted}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span>🕐</span>
                        <span>${timeFormatted}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span>📍</span>
                        <span>${place}</span>
                    </div>
                </div>

                <div style="display: flex; padding: 30px 40px; gap: 30px;">
                    <div style="flex: 1; font-size: 15px; line-height: 1.6;">
                        <div style="margin-bottom: 20px;">
                            <div style="font-size: 20px; font-weight: bold; color: #c2002f; margin-bottom: 5px;">Estimado/a ${name},</div>
                            <div style="margin-top: 10px; margin-bottom: 20px;">
                                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 140 50'%3E%3Ctext y='35' font-size='20' font-weight='bold' fill='%23c2002f'%3ENebrijaInnova%3C/text%3E%3C/svg%3E" alt="logo Nebrija Innova" style="width: 140px; height: auto;">
                            </div>
                        </div>

                        <div style="margin-bottom: 15px;">
                            <p style="margin-bottom: 15px;">
                                Nos complace invitarle a la
                                <span style="font-weight: 600;">${eventData.eventName}</span>.
                            </p>
                            <p style="margin-bottom: 15px;">
                                La jornada, que este año se desarrollará bajo el lema
                                <span style="font-style: italic;">«${eventData.eventLemma || eventData.eventDescription}»</span>, constituye un
                                referente anual en la Universidad Nebrija para la reflexión,
                                formación e investigación en innovación docente, con especial
                                protagonismo de los proyectos desarrollados por el profesorado en
                                el curso <span style="font-weight: 600;">${eventData.academicYear}</span>.
                            </p>
                            <p style="margin-bottom: 15px;">
                                Contará con la participación de
                                <span style="font-weight: 600;">${eventData.speaker1Name}</span>
                                <span style="font-weight: 600;">(${eventData.speaker1Association})</span> y
                                <span style="font-weight: 600;">${eventData.speaker2Name}</span>
                                <span style="font-weight: 600;">(${eventData.speaker2Association})</span>,
                                reconocidos expertos en educación digital e innovación educativa.
                                Puedes inscribirte en <span style="font-weight: 600;"><a href="${eventData.registrationLink}" style="color: #c2002f; text-decoration: none;">este enlace</a></span> hasta el
                                <span style="font-weight: 600;">${eventData.registrationDeadline ? new Date(eventData.registrationDeadline).toLocaleDateString('es-ES') : ''}</span>.
                            </p>
                        </div>

                        <p style="font-size: 16px; font-weight: bold; color: #c2002f; margin-top: 15px;">¡Te esperamos!</p>
                    </div>

                    <div style="width: 160px; display: flex; flex-direction: column; gap: 15px;">
                        <div style="width: 160px; height: 200px; border: 8px solid #c2002f; background: #f0f0f0; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #999;">
                            Foto 1
                        </div>
                        <div style="width: 160px; height: 200px; background: linear-gradient(135deg, #d8a5e0 0%, #c97dd8 100%); border: 8px solid #000; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #fff;">
                            Foto 2
                        </div>
                        <div style="display: flex; justify-content: center; margin-top: 10px;">
                            <div style="width: 120px; height: auto; background: #f0f0f0; display: flex; align-items: center; justify-content: center; font-size: 11px; color: #999; padding: 10px;">
                                Logo
                            </div>
                        </div>
                    </div>
                </div>

                <div style="width: 100%; height: 20px; background-color: #c2002f;"></div>
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
                        subject: `¡Te invitamos a ${eventData.eventName}!`,
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

    // Scroll automático al mensaje
    messageEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Auto-desaparecer
    setTimeout(() => {
        messageEl.className = 'message';
    }, 6000);
}
