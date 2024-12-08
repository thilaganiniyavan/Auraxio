// js/storage.js

import { storage } from './script.js';

// Upload image to Firebase Storage
export function uploadImage(file, filename) {
    const storageRef = storage.ref().child("images/" + filename);
    storageRef.put(file).then((snapshot) => {
        alert("Image uploaded successfully!");
    }).catch((error) => {
        alert("An error occurred while uploading the image.");
    });
}
