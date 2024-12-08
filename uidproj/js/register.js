// js/register.js

import { register } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('#register-form');

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = registerForm['email'].value;
        const password = registerForm['password'].value;
        const username = registerForm['username'].value;

        register(email, password, username);
    });
});
