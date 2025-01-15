const messagesDiv = document.getElementById('messages');
const messageForm = document.getElementById('messageForm');

// Загрузка сообщений с сервера
async function loadMessages() {
  const response = await fetch('/twitter_mitter/src/controllers/messages.js');
  const messages = await response.json();

  messagesDiv.innerHTML = ''; // Очищаем старые сообщения
  messages.forEach(msg => {
    const messageBlock = document.createElement('div');
    messageBlock.classList.add('message');
    messageBlock.innerHTML = `
      <div class="info">${msg.name} — ${new Date(msg.timestamp).toLocaleString()}</div>
      <div class="content">${msg.message}</div>
      <button class="delete-btn" data-id="${msg.id}">Удалить</button>
    `;
    messagesDiv.appendChild(messageBlock);
  });
}

// Отправка нового сообщения
messageForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(messageForm);
  const data = Object.fromEntries(formData);

  const response = await fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    messageForm.reset();
    loadMessages();
  }
});

// Удаление сообщения
messagesDiv.addEventListener('click', async (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.getAttribute('data-id');
    await fetch(`/api/messages/${id}`, { method: 'DELETE' });
    loadMessages();
  }
});

// Инициализация
loadMessages();
