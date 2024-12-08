// js/firestore.js

import { db } from './script.js';

// Add a new group
export function addGroup(name, members) {
    const groupRef = db.collection("groups").doc();
    groupRef.set({
        name: name
    }).then(() => {
        members.forEach(member => {
            groupRef.collection("members").doc(member.uid).set({
                username: member.username
            });
        });
        alert("Group created successfully!");
    }).catch((error) => {
        alert("An error occurred while creating the group.");
    });
}

// Add a new message to a chat
export function addMessage(chatId, sender, content, type, imageUrl) {
    const chatRef = db.collection("chats").doc(chatId).collection("messages").doc();
    chatRef.set({
        sender: sender,
        content: content,
        type: type,
        imageUrl: imageUrl,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).catch((error) => {
        alert("An error occurred while sending the message.");
    });
}
