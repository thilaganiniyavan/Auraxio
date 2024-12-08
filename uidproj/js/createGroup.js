// js/createGroup.js

const createGroupForm = document.getElementById('createGroupForm');

createGroupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const groupName = document.getElementById('groupName').value;

    if (groupName) {
        createGroup(groupName);
    } else {
        alert('Please enter a group name.');
    }
});

function createGroup(groupName) {
    const currentUserUid = firebase.auth().currentUser.uid;

    // Create a new group document in the 'groups' collection
    db.collection('groups').add({
        name: groupName,
        members: [currentUserUid]
    })
    .then((docRef) => {
        // Add group to user's groupChats collection
        db.collection('users').doc(currentUserUid).collection('groupChats').doc(docRef.id).set({
            name: groupName
        })
        .then(() => {
            alert('Group created successfully.');
            window.location.href = 'home.html';
        })
        .catch((error) => {
            console.error("Error adding group to user's groupChats: ", error);
        });
    })
    .catch((error) => {
        console.error("Error creating group: ", error);
    });
}
