const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  async getUsers() {
    await delay(500);
    return JSON.parse(localStorage.getItem("users") || "[]");
  },

  async createUser(userData) {
    await delay(500);
    const users = await this.getUsers();
    const newUser = {
      ...userData,
      id: users.length + 1,
    };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    return newUser;
  },

  async updateUser(id, userData) {
    await delay(500);
    const users = await this.getUsers();
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...userData, id } : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    return userData;
  },

  async deleteUser(id) {
    await delay(500);
    const users = await this.getUsers();
    const filteredUsers = users.filter((user) => user.id !== id);
    localStorage.setItem("users", JSON.stringify(filteredUsers));
  },

  async getRoles() {
    await delay(500);
    return JSON.parse(localStorage.getItem("roles") || "[]");
  },

  async createRole(roleData) {
    await delay(500);
    const roles = await this.getRoles();
    const newRole = {
      ...roleData,
      id: roles.length + 1,
    };
    localStorage.setItem("roles", JSON.stringify([...roles, newRole]));
    return newRole;
  },

  async updateRole(id, roleData) {
    await delay(500);
    const roles = await this.getRoles();
    const updatedRoles = roles.map((role) =>
      role.id === id ? { ...roleData, id } : role
    );
    localStorage.setItem("roles", JSON.stringify(updatedRoles));
    return roleData;
  },

  async deleteRole(id) {
    await delay(500);
    const roles = await this.getRoles();
    const filteredRoles = roles.filter((role) => role.id !== id);
    localStorage.setItem("roles", JSON.stringify(filteredRoles));
  },
};
