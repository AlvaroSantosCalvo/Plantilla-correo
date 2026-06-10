// Admin Panel Script - Gestión de datos del evento

let speakersCount = 0;

// Cargar datos guardados al iniciar
document.addEventListener('DOMContentLoaded', () => {
    loadEventData();
    initializeEventListeners();
});

// Inicializar eventos
function initializeEventListeners() {
    const form = document.getElementById('eventForm');
    const addSpeakerBtn = document.getElementById('addSpeakerBtn');

    form.addEventListener('submit', handleFormSubmit);
    addSpeakerBtn.addEventListener('click', addSpeakerField);

    // Agregar un speaker vacío por defecto
    addSpeakerField();
}

// Agregar campo de speaker
function addSpeakerField() {
    const container = document.getElementById('speakersContainer');
    const speakerId = `speaker-${speakersCount}`;

    const speakerItem = document.createElement('div');
    speakerItem.className = 'speaker-item';
    speakerItem.id = speakerId;
    speakerItem.innerHTML = `
        <input type="text" placeholder="Nombre del Speaker" class="speaker-name" required>
        <input type="text" placeholder="Cargo/Especialidad" class="speaker-title" required>
        <button type="button" class="remove-btn" onclick="removeSpeaker('${speakerId}')">✕ Eliminar</button>
    `;

    container.appendChild(speakerItem);
    speakersCount++;
}

// Eliminar speaker
function removeSpeaker(speakerId) {
    const element = document.getElementById(speakerId);
    if (element) {
        element.remove();
    }
}

// Manejar envío del formulario
async function handleFormSubmit(e) {
    e.preventDefault();

    // Recopilar datos del formulario
    const eventData = {
        eventName: document.getElementById('eventName').value.trim(),
        eventEdition: document.getElementById('eventEdition').value.trim(),
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
        contactEmail: document.getElementById('contactEmail').value.trim(),
        contactPhone: document.getElementById('contactPhone').value.trim(),
        speakers: collectSpeakers(),
        savedAt: new Date().toISOString()
    };

    // Validar campos obligatorios
    if (!eventData.eventName || !eventData.eventDate || !eventData.eventTime || !eventData.venue || !eventData.city || !eventData.contactEmail) {
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

// Recopilar datos de speakers
function collectSpeakers() {
    const speakers = [];
    const speakerItems = document.querySelectorAll('.speaker-item');

    speakerItems.forEach(item => {
        const name = item.querySelector('.speaker-name').value.trim();
        const title = item.querySelector('.speaker-title').value.trim();

        if (name && title) {
            speakers.push({
                name,
                title
            });
        }
    });

    return speakers;
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
    document.getElementById('contactEmail').value = data.contactEmail || '';
    document.getElementById('contactPhone').value = data.contactPhone || '';

    // Poblar speakers
    if (data.speakers && data.speakers.length > 0) {
        const container = document.getElementById('speakersContainer');
        container.innerHTML = ''; // Limpiar speakers por defecto
        speakersCount = 0;

        data.speakers.forEach(speaker => {
            addSpeakerField();
            const lastSpeaker = container.lastChild;
            lastSpeaker.querySelector('.speaker-name').value = speaker.name;
            lastSpeaker.querySelector('.speaker-title').value = speaker.title;
        });
    }
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
