// /src/services/ApiService.js
class ApiService {
    async postJson(url, data) {
        const res = await fetch(`/api/${url}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        return await res.json();
    }

    async getJson(url) {
        const res = await fetch(`/api/${url}`);
        return await res.json();
    }
}

export default new ApiService();
