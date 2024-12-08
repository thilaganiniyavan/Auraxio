// js/chatroom.js

let currentUserUid;
let currentChatId;

// Check if user is logged in
auth.onAuthStateChanged((user) => {
    if (user) {
        currentUserUid = user.uid;
        const urlParams = new URLSearchParams(window.location.search);
        currentChatId = urlParams.get('dm') || urlParams.get('gc');
        if (currentChatId) {
            loadMessages();
        } else {
            alert('Invalid chat selected.');
            window.location.href = 'home.html';
        }
    } else {
        window.location.href = 'login.html';
    }
});

function loadMessages() {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = ''; // Clear existing messages

    db.collection('chats').doc(currentChatId).collection('messages').orderBy('timestamp').onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
                const message = change.doc.data();
                if (message.type === 'text') {
                    const messageDiv = document.createElement('div');
                    messageDiv.textContent = `${message.sender}: ${message.content}`;
                    messagesDiv.appendChild(messageDiv);
                } else if (message.type === 'image') {
                    const imageDiv = document.createElement('div');
                    const image = document.createElement('img');
                    image.src = message.imageUrl;
                    image.alt = 'Sent Image';
                    imageDiv.appendChild(image);
                    messagesDiv.appendChild(imageDiv);
                }
            }
        });
    });
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageContent = messageInput.value.trim();
    messageInput.value = ''; // Clear input field

    if (messageContent) {
        db.collection('chats').doc(currentChatId).collection('messages').add({
            sender: currentUserUid,
            content: messageContent,
            type: 'text',
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .catch((error) => {
            console.error("Error sending message: ", error);
        });
    }
}

function sendImage() {
    const imageInput = document.getElementById('imageInput');
    const image = imageInput.files[0];

    if (image) {
        const storageRef = firebase.storage().ref(`images/${image.name}`);
        storageRef.put(image)
        .then((snapshot) => {
            return snapshot.ref.getDownloadURL();
        })
        .then((imageUrl) => {
            db.collection('chats').doc(currentChatId).collection('messages').add({
                sender: currentUserUid,
                imageUrl: imageUrl,
                type: 'image',
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        })
        .catch((error) => {
            console.error("Error uploading image: ", error);
        });
    }
}

function goToHome() {
    window.location.href = 'home.html';
}
