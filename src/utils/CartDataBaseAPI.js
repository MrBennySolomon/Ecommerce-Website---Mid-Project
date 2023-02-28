import axios from "axios";

const CartsDataBaseAPI = {
  carts: axios.create({
    baseURL:
      "https://carts-9f8d0-default-rtdb.europe-west1.firebasedatabase.app/carts", 
  }),

  async removeCart(id) {
    this.carts
        .delete(`/${id}.json`)
        .then((response) => {
          console.log(`Cart id ${id} was deleted seccesfully`);
          return "Cart Was Deleted!";
        })
        .catch((error) => {
          return "Error while deleting cart";
        });
    },

    async getAllCarts() {
      try {
        const response = await this.carts.get(".json");
        if (response.status !== 200) {
          console.error("cant get cart from the api");
          return;
        }
        return response.data;
      } catch (error) {
        console.error("Error getting cart", error);
      }
    },
    async addCart(newCart) {
      this.carts
        .post(".json", newCart)
        .then((response) => {
          console.log("Cart added successfully");
        })
        .catch((error) => {
          console.error("Error adding cart", error);
        });
    },
    async editCart(updatedData, id) {
      this.carts
        .put(`/${id}.json`, updatedData)
        .then((response) => {
          console.log("Cart updated successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error updating cart:", error);
        });
    },
  };

  export default CartsDataBaseAPI;