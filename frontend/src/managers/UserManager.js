// /src/managers/UserManager.js
class UserManager {
    constructor() {
        this.user = null;
    }

    setData(user) {
        this.user = user;
    }

    getData() {
        return this.user;
    }

    getName() {
        return this.user ? this.user.name : "";
    }

    hasRole(role) {
        return this.user?.roles?.includes(role);
    }
}

export default new UserManager();
