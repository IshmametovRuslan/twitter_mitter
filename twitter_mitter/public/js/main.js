document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("message-form");
    const messagesDiv = document.getElementById("messages");

    const loadMessages = async () => {
        const response = await fetch('/api/messages');
        const messages = await response.json();
        messagesDiv.innerHTML = '';
        messages.forEach(({ id, name, message, created_at }) => {
            const messageEl = document.createElement('div');
            messageEl.innerHTML = `
                <p><strong>${name}</strong> (${new Date(created_at).toLocaleString()}):</p>
                <p>${message}</p>
                <button data-id="${id}" class="delete-btn">Удалить</button>
            `;
            messagesDiv.appendChild(messageEl);
        });
    };

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        const response = await fetch('/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            form.reset();
            loadMessages();
        }
    });

    messagesDiv.addEventListener("click", async (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const id = e.target.getAttribute("data-id");
            await fetch(`/api/messages/${id}`, { method: 'DELETE' });
            loadMessages();
        }
    });

    loadMessages();
});
