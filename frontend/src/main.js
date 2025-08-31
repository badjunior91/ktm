import './libs/setup'
import AuthManager from './managers/AuthManager.js';
document.body.onload = () => {
    AuthManager.checkAuth();
};
