document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profileForm');
    const questionForm = document.getElementById('questionForm');
    const settingsForm = document.getElementById('settingsForm');
    const shareLink = document.getElementById('shareLink');
    const messagesList = document.getElementById('messagesList');

    if (profileForm) {
        profileForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const profilePic = document.getElementById('profilePic').files[0];
            const link = generateLink(username);
            localStorage.setItem('username', username);
            localStorage.setItem('profilePic', profilePic ? URL.createObjectURL(profilePic) : '');
            localStorage.setItem('messages', JSON.stringify([]));
            window.location.href = `generated-link.html?link=${encodeURIComponent(link)}`;
        });
    }

    if (questionForm) {
        questionForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const question = document.getElementById('question').value;
            const urlParams = new URLSearchParams(window.location.search);
            const username = urlParams.get('user');
            let messages = JSON.parse(localStorage.getItem('messages')) || [];
            messages.push({ user: username, question });
            localStorage.setItem('messages', JSON.stringify(messages));
            alert('Question sent: ' + question);
            document.getElementById('question').value = '';
        });
    }

    if (settingsForm) {
        settingsForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const newUsername = document.getElementById('newUsername').value;
            const newProfilePic = document.getElementById('newProfilePic').files[0];
            if (newUsername) {
                localStorage.setItem('username', newUsername);
            }
            if (newProfilePic) {
                localStorage.setItem('profilePic', URL.createObjectURL(newProfilePic));
            }
            alert('Profile updated successfully!');
            window.location.href = 'generated-link.html';
        });
    }

    if (shareLink) {
        const urlParams = new URLSearchParams(window.location.search);
        const link = urlParams.get('link');
        shareLink.textContent = link;
    }

    if (messagesList) {
        let messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.forEach(message => {
            const li = document.createElement('li');
            li.textContent = message.question;
            messagesList.appendChild(li);
        });
    }
});

function generateLink(username) {
    return `${window.location.origin}/answer.html?user=${encodeURIComponent(username)}`;
}

function copyLink() {
    const link = document.getElementById('shareLink').textContent;
    navigator.clipboard.writeText(link).then(() => {
        alert('Link copied to clipboard');
    });
}

function shareOnWhatsApp() {
    const link = document.getElementById('shareLink').textContent;
    window.open(`https://wa.me/?text=${encodeURIComponent(link)}`, '_blank');
}

function shareOnInstagram() {
    alert('Share on Instagram feature is not implemented yet.');
}

function shareOnFacebook() {
    alert('Share on Facebook feature is not implemented yet.');
}

