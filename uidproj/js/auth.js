// js/auth.js

import { auth, db } from './script.js';

// Register
export function register(email, password, username) {
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            db.collection("users").doc(user.uid).set({
                username: username,
                email: email
            });
            alert("Registration successful!");
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
}

// Login
export function login(email, password) {
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Login successful!");
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
}

// Logout
export function logout() {
    auth.signOut().then(() => {
        alert("Logout successful!");
    }).catch((error) => {
        alert("An error occurred while logging out.");
    });
}
