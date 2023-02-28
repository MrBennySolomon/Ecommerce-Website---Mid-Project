import axios from "axios";

const UsersDataBaseAPI = {
  users: axios.create({
    baseURL:
      "https://users-be4a5-default-rtdb.europe-west1.firebasedatabase.app/users", 
  }),

  async removeUser(id) {
    this.users
        .delete(`/${id}.json`)
        .then((response) => {
          console.log(`user id ${id} was deleted seccesfully`);
          return "User Was Deleted!";
        })
        .catch((error) => {
          return "Error while deleting user";
        });
    },

    async getAllUsers() {
      try {
        const response = await this.users.get(".json");
        if (response.status !== 200) {
          console.error("cant get user from the api");
          return;
        }
        return response.data;
      } catch (error) {
        console.error("Error getting user", error);
      }
    },
    async addUser(newUser) {
      this.users
        .post(".json", newUser)
        .then((response) => {
          console.log("User added successfully");
        })
        .catch((error) => {
          console.error("Error adding user", error);
        });
    },
    async editUser(updatedData, id) {
      this.users
        .put(`/${id}.json`, updatedData)
        .then((response) => {
          console.log("User updated successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    },
  };

  export default UsersDataBaseAPI;