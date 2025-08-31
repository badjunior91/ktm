// /src/services/HookService.js
import authManager from "../managers/AuthManager.js";

class HookService {
    useLogin() {
        document.body.addEventListener("click", e => {
            if (e.target.classList.contains("login_btn")) {
                const username = document.querySelector("[data-name='username']").value;
                const password = document.querySelector("[data-name='password']").value;
                authManager.login(username, password);
            }
        });
    }

    useDashboard() {
        // bind κουμπιά dashboard
    }
}

export default new HookService();
