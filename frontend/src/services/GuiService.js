// /src/services/GuiService.js
import formBuilder from "../utils/FormBuilder.js";
import hookService from "./HookService.js";

class GuiService {
    loginPage() {
        document.body.innerHTML = "";

        const username = formBuilder.createInput({ placeholder: "Email ή Τηλέφωνο", dataName: "username" });
        const password = formBuilder.createInput({ type: "password", placeholder: "Κωδικός πρόσβασης", dataName: "password" });
        const button = formBuilder.createButton({ text: "Σύνδεση", className: "btn-primary login_btn" });

        const form = formBuilder.createForm({
            title: "Login Form",
            inputs: [username, password],
            button
        });

        document.body.appendChild(form);

        hookService.useLogin(); // bind event
    }

    dashboardPage() {
        document.body.innerHTML = `<div id="dashboard">Welcome to dashboard</div>`;
    }
}

export default new GuiService();
