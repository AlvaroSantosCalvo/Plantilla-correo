// Admin Panel Script - Gestión de datos del evento

// Cargar datos guardados al iniciar
document.addEventListener('DOMContentLoaded', () => {
    loadEventData();
    initializeEventListeners();
});

// Inicializar eventos
function initializeEventListeners() {
    const form = document.getElementById('eventForm');
    form.addEventListener('submit', handleFormSubmit);
}

// Manejar envío del formulario
async function handleFormSubmit(e) {
    e.preventDefault();

    // Recopilar datos del formulario
    const eventData = {
        eventName: document.getElementById('eventName').value.trim(),
        eventEdition: document.getElementById('eventEdition').value.trim(),
        eventLemma: document.getElementById('eventLemma').value.trim(),
        academicYear: document.getElementById('academicYear').value.trim(),
        eventDescription: document.getElementById('eventDescription').value.trim(),
        eventDate: document.getElementById('eventDate').value,
        eventTime: document.getElementById('eventTime').value,
        eventDuration: document.getElementById('eventDuration').value || 0,
        registrationDeadline: document.getElementById('registrationDeadline').value,
        venue: document.getElementById('venue').value.trim(),
        city: document.getElementById('city').value.trim(),
        country: document.getElementById('country').value.trim(),
        address: document.getElementById('address').value.trim(),
        registrationLink: document.getElementById('registrationLink').value.trim(),
        zoomLink: document.getElementById('zoomLink').value.trim(),
        speaker1Name: document.getElementById('speaker1Name').value.trim(),
        speaker1Association: document.getElementById('speaker1Association').value.trim(),
        speaker1Photo: document.getElementById('speaker1Photo').value.trim(),
        speaker2Name: document.getElementById('speaker2Name').value.trim(),
        speaker2Association: document.getElementById('speaker2Association').value.trim(),
        speaker2Photo: document.getElementById('speaker2Photo').value.trim(),
        savedAt: new Date().toISOString()
    };

    // Validar campos obligatorios
    if (!eventData.eventName || !eventData.eventLemma || !eventData.academicYear || 
        !eventData.eventDate || !eventData.eventTime || !eventData.venue || 
        !eventData.city ||
        !eventData.speaker1Name || !eventData.speaker1Association ||
        !eventData.speaker2Name || !eventData.speaker2Association) {
        showMessage('Por favor completa todos los campos obligatorios (*)', 'error');
        return;
    }

    try {
        // Enviar al servidor
        const response = await fetch('http://localhost:5000/api/event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        });

        if (response.ok) {
            // Guardar en localStorage también
            localStorage.setItem('eventData', JSON.stringify(eventData));
            showMessage('✅ ¡Datos del evento guardados exitosamente!', 'success');
        } else {
            const error = await response.json();
            showMessage(`❌ Error: ${error.error}`, 'error');
        }
    } catch (error) {
        // Guardar en localStorage si el servidor no está disponible
        localStorage.setItem('eventData', JSON.stringify(eventData));
        showMessage('✅ Datos guardados localmente (servidor no disponible)', 'success');
        console.error('Error:', error);
    }
}

// Cargar datos guardados
function loadEventData() {
    const savedData = localStorage.getItem('eventData');

    if (savedData) {
        const eventData = JSON.parse(savedData);
        populateForm(eventData);
    }
}

// Poblar formulario con datos
function populateForm(data) {
    document.getElementById('eventName').value = data.eventName || '';
    document.getElementById('eventEdition').value = data.eventEdition || '';
    document.getElementById('eventLemma').value = data.eventLemma || '';
    document.getElementById('academicYear').value = data.academicYear || '';
    document.getElementById('eventDescription').value = data.eventDescription || '';
    document.getElementById('eventDate').value = data.eventDate || '';
    document.getElementById('eventTime').value = data.eventTime || '';
    document.getElementById('eventDuration').value = data.eventDuration || '';
    document.getElementById('registrationDeadline').value = data.registrationDeadline || '';
    document.getElementById('venue').value = data.venue || '';
    document.getElementById('city').value = data.city || '';
    document.getElementById('country').value = data.country || '';
    document.getElementById('address').value = data.address || '';
    document.getElementById('registrationLink').value = data.registrationLink || '';
    /* document.getElementById('zoomLink').value = data.zoomLink || ''; */
    
    // Poblar speakers
    document.getElementById('speaker1Name').value = data.speaker1Name || '';
    document.getElementById('speaker1Association').value = data.speaker1Association || '';
    document.getElementById('speaker1Photo').value = data.speaker1Photo || '';
    document.getElementById('speaker2Name').value = data.speaker2Name || '';
    document.getElementById('speaker2Association').value = data.speaker2Association || '';
    document.getElementById('speaker2Photo').value = data.speaker2Photo || '';
}

// Mostrar mensaje
function showMessage(text, type) {
    const messageEl = document.getElementById('message');
    messageEl.textContent = text;
    messageEl.className = `message ${type}`;

    // Auto-desaparecer después de 5 segundos
    setTimeout(() => {
        messageEl.className = 'message';
    }, 5000);
}
