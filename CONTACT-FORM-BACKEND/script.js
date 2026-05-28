// Contact Form Handler - Formulario de Contacto

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
});

// Manejar envío del formulario
async function handleFormSubmit(e) {
  e.preventDefault();

  // Obtener elementos del formulario
  const nameInput = document.querySelector('#name');
  const emailInput = document.querySelector('#email');
  const phoneInput = document.querySelector('#phone');
  const subjectInput = document.querySelector('#subject');
  const messageInput = document.querySelector('#message-text');
  const submitBtn = document.querySelector('#submitBtn');
  const messageDiv = document.querySelector('#message');
  const loading = document.querySelector('#loading');
  const btnText = document.querySelector('#btnText');

  // Obtener valores
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const subject = subjectInput.value.trim();
  const message = messageInput.value.trim();

  // Validar campos
  if (!name || !email || !phone || !subject || !message) {
    showMessage('Por favor completa todos los campos obligatorios (*)', 'error', messageDiv);
    return;
  }

  // Validar email
  if (!isValidEmail(email)) {
    showMessage('Por favor ingresa un email válido', 'error', messageDiv);
    return;
  }

  // Crear objeto con datos del formulario
  const formData = { name, email, phone, subject, message };

  // Mostrar estado de carga
  submitBtn.disabled = true;
  loading.style.display = 'inline-block';

  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      showMessage('✅ ¡Tu mensaje fue enviado exitosamente! Nos pondremos en contacto pronto.', 'success', messageDiv);

      // Limpiar formulario
      nameInput.value = '';
      emailInput.value = '';
      phoneInput.value = '';
      subjectInput.value = '';
      messageInput.value = '';
    } else {
      const errorData = await response.json();
      showMessage(`❌ Error: ${errorData.error || 'No se pudo enviar el mensaje'}`, 'error', messageDiv);
    }
  } catch (error) {
    console.error('Error:', error);
    showMessage(`❌ Error de conexión: ${error.message}. Verifica que el servidor está corriendo.`, 'error', messageDiv);
  } finally {
    // Ocultar estado de carga
    submitBtn.disabled = false;
    loading.style.display = 'none';
  }
}

// Validar email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Mostrar mensaje
function showMessage(text, type, messageDiv) {
  messageDiv.textContent = text;
  messageDiv.className = `message ${type}`;

  // Auto-desaparecer después de 6 segundos
  setTimeout(() => {
    messageDiv.className = 'message';
  }, 6000);
}