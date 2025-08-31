// /src/services/HookService.js
import authManager from "../managers/AuthManager.js";

class HookService {
    constructor() {
        this.boundEvents = {};
        console.log(this.boundEvents);

    }

    bindOnce(key, callback) {
        if (this.boundEvents[key]) return;
        this.boundEvents[key] = true;
        console.log(this.boundEvents);
        callback();
    }

    useLogin() {
        this.bindOnce("login", () => {
            document.body.addEventListener("click", e => {
                if (e.target.classList.contains("login_btn")) {
                    const username = document.querySelector("[data-name='username']").value;
                    const password = document.querySelector("[data-name='password']").value;
                    authManager.login(username, password);
                }
            });
        });
    }

    useDashboard() {
        this.bindOnce("dashboard", () => {
            document.body.addEventListener("click", e => {
                if (e.target.classList.contains("db_user_logout")) {
                    authManager.logout();
                }
            });
        });
    }
}


export default new HookService();
