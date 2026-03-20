// State Management
const State = {
    user: null,
    activeChat: null,
    messages: []
};

// Elements
const authForm = document.getElementById('auth-form');
const chatView = document.getElementById('chat-view');
const authView = document.getElementById('auth-view');

// 1. Handle Auth Transitions
function switchAuth(type) {
    const title = document.querySelector('.logo-text');
    title.innerText = type === 'login' ? 'WELCOME BACK' : 'JOIN THE SQUAD';
    // Add a quick shake animation
    title.classList.add('bounce-in');
    setTimeout(() => title.classList.remove('bounce-in'), 500);
}

authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // In a real app, you'd call Supabase.auth.signIn() here
    State.user = document.getElementById('username').value;
    
    // Transition to Chat with Animation
    authView.classList.remove('active');
    chatView.classList.add('active');
    showNotification(`Welcome, ${State.user}!`);
});

// 2. Chat Logic
const sendBtn = document.getElementById('send-btn');
const chatInput = document.getElementById('chat-input');
const messagesArea = document.getElementById('chat-messages');

function addMessage(text, isMe = true) {
    const div = document.createElement('div');
    div.className = `bubble ${isMe ? 'me' : 'them'} bounce-in`;
    div.innerText = text;
    messagesArea.appendChild(div);
    
    // Auto-scroll to bottom
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

sendBtn.addEventListener('click', () => {
    if(!chatInput.value) return;
    addMessage(chatInput.value, true);
    chatInput.value = '';
});

// 3. Professional Polish: Notifications
function showNotification(msg) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed; bottom: 20px; left: 50%;
        transform: translateX(-50%);
        background: var(--secondary); color: #000;
        padding: 10px 20px; border: 3px solid #000;
        font-weight: bold; z-index: 1000;
    `;
    toast.innerText = `POW! ${msg}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Handle Enter Key
chatInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') sendBtn.click();
});
