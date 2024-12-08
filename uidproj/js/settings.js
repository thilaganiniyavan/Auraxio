// js/settings.js

const updateProfileForm = document.getElementById('updateProfileForm');
const changePasswordForm = document.getElementById('changePasswordForm');

updateProfileForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newUsername = document.getElementById('newUsername').value;

    if (newUsername) {
        updateProfile(newUsername);
    }
});

changePasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;

    if (currentPassword && newPassword) {
        changePassword(currentPassword, newPassword);
    } else {
        alert('Please enter both current and new passwords.');
    }
});

function updateProfile(newUsername) {
    const currentUser = firebase.auth().currentUser;

    // Update the user's display name in Firebase Auth
    currentUser.updateProfile({
        displayName: newUsername
    })
    .then(() => {
        // Update the username in Firestore
        db.collection('users').doc(currentUser.uid).update({
            username: newUsername
        })
        .then(() => {
            alert('Profile updated successfully.');
        })
        .catch((error) => {
            console.error("Error updating username in Firestore: ", error);
        });
    })
    .catch((error) => {
        console.error("Error updating profile: ", error);
    });
}

function changePassword(currentPassword, newPassword) {
    const currentUser = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(currentUser.email, currentPassword);

    // Re-authenticate user
    currentUser.reauthenticateWithCredential(credential)
    .then(() => {
        // Update password in Firebase Auth
        currentUser.updatePassword(newPassword)
        .then(() => {
            alert('Password changed successfully.');
        })
        .catch((error) => {
            console.error("Error updating password: ", error);
        });
    })
    .catch((error) => {
        alert('Incorrect current password.');
    });
}
