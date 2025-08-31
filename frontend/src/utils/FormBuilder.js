// /src/builders/FormBuilder.js
class FormBuilder {
    createInput({ type = "text", placeholder = "", dataName = "" }) {
        const input = document.createElement("input");
        input.type = type;
        input.placeholder = placeholder;
        input.dataset.name = dataName;
        input.className = "form-control";
        return input;
    }

    createButton({ text, className = "" }) {
        const btn = document.createElement("button");
        btn.textContent = text;
        btn.className = `btn ${className}`;
        return btn;
    }

    createForm({ title, inputs, button }) {
        const form = document.createElement("div");
        form.className = "login_form";

        const h2 = document.createElement("h2");
        h2.textContent = title;
        form.appendChild(h2);

        inputs.forEach(i => form.appendChild(i));
        form.appendChild(button);

        return form;
    }
}

export default new FormBuilder();
