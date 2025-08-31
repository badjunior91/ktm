// /src/managers/AuthManager.js
import api from "../services/ApiService.js";
import gui from "../services/GuiService.js";
import userManager from "./UserManager.js";

class AuthManager {
    constructor() {
        this.token = localStorage.getItem("token");
    }

    checkAuth() {
        this.token ? this.loginWithToken() : gui.loginPage();
    }

    async login(username, password) {
        try {
            const result = await api.postJson("login", { username, password });

            if (result.success) {
                this.token = result.token;
                localStorage.setItem("token", this.token);

                userManager.setData(result.user);
                gui.dashboardPage();
            } else {
                alert("Λάθος στοιχεία");
                gui.loginPage();
            }
        } catch (err) {
            console.error("Login error:", err);
            gui.loginPage();
        }
    }

    async loginWithToken() {
        try {
            const result = await api.postJson("loginwithtoken", { token: this.token });

            if (result.success) {
                userManager.setData(result.user);
                gui.dashboardPage();
            } else {
                this.logout();
            }
        } catch (err) {
            console.error("Token login error:", err);
            this.logout();
        }
    }

    logout() {
        localStorage.removeItem("token");
        this.token = null;
        gui.loginPage();
    }
}

export default new AuthManager();
