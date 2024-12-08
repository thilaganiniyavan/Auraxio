// js/home.js

let currentUserUid;

// Check if user is logged in
auth.onAuthStateChanged((user) => {
    if (user) {
        currentUserUid = user.uid;
        loadDirectMessages();
        loadGroupChats();
    } else {
        window.location.href = 'login.html';
    }
});

function logout() {
    auth.signOut().then(() => {
        window.location.href = 'login.html';
    }).catch((error) => {
        alert(error.message);
    });
}

function loadDirectMessages() {
    db.collection('users').doc(currentUserUid).collection('directMessages').get()
        .then((querySnapshot) => {
            const dmSelect = document.getElementById('dmSelect');
            dmSelect.innerHTML = ''; // Clear existing options
            querySnapshot.forEach((doc) => {
                const option = document.createElement('option');
                option.value = doc.id;
                option.text = doc.data().username;
                dmSelect.appendChild(option);
            });
        })
        .catch((error) => {
            console.error("Error loading direct messages: ", error);
        });
}

function loadGroupChats() {
    db.collection('users').doc(currentUserUid).collection('groupChats').get()
        .then((querySnapshot) => {
            const gcSelect = document.getElementById('gcSelect');
            gcSelect.innerHTML = ''; // Clear existing options
            querySnapshot.forEach((doc) => {
                const option = document.createElement('option');
                option.value = doc.id;
                option.text = doc.data().name;
                gcSelect.appendChild(option);
            });
        })
        .catch((error) => {
            console.error("Error loading group chats: ", error);
        });
}

function openDM() {
    const dmId = document.getElementById('dmSelect').value;
    if (dmId) {
        // Navigate to chatroom with selected DM
        window.location.href = `chatroom.html?dm=${dmId}`;
    } else {
        alert('Please select a direct message.');
    }
}

function openGC() {
    const gcId = document.getElementById('gcSelect').value;
    if (gcId) {
        // Navigate to chatroom with selected group chat
        window.location.href = `chatroom.html?gc=${gcId}`;
    } else {
        alert('Please select a group chat.');
    }
}
