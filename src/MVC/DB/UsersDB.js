import axios from "axios";

const UsersDB = {
  users: axios.create({
    baseURL:
      "https://nails-art-server.onrender.com/users", 
  }),

  async removeUser(id) {
    this.users
        .delete(`/${id}`)
        .then((response) => {
          console.log(`user id ${id} was deleted successfully`);
          return "User Was Deleted!";
        })
        .catch((error) => {
          return "Error while deleting user";
        });
  },

  async getAllUsers() {
    try {
      const response = await this.users.get("");
      if (response.status !== 200) {
        console.error("cant get user from the api");
        return;
      }
      return response.data;
    } catch (error) {
      console.error("Error getting users", error);
    }
  },

  async addUser(newUser) {
    this.users
      .post("", newUser)
      .then((response) => {
        console.log("User added successfully");
      })
      .catch((error) => {
        console.error("Error adding user", error);
      });
  },
  
  async editUser(updatedData, id) {
    this.users
      .put(`/${id}`, updatedData)
      .then((response) => {
        console.log("User updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  },
};

  export default UsersDB;