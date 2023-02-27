import axios from "axios";

const ProductsDataBaseAPI = {
  products: axios.create({
    baseURL:
      "https://products-a5ef0-default-rtdb.europe-west1.firebasedatabase.app/products", 
  }),

  async removeProduct(id) {
    this.products
        .delete(`/${id}.json`)
        .then((response) => {
          console.log(`product id ${id} was deleted seccesfully`);
          return "Product Was Deleted!";
        })
        .catch((error) => {
          return "Error while deleting product";
        });
    },

    async getProduct() {
      try {
        const response = await this.products.get(".json");
        if (response.status !== 200) {
          console.error("cant get product from the api");
          return;
        }
        return response.data;
      } catch (error) {
        console.error("Error getting product", error);
      }
    },
    async addProduct(newProduct) {
      this.products
        .post(".json", newProduct)
        .then((response) => {
          console.log("Product added successfully");
        })
        .catch((error) => {
          console.error("Error adding product", error);
        });
    },
    async editProduct(updatedData, id) {
      this.products
        .put(`/${id}.json`, updatedData)
        .then((response) => {
          console.log("Product updated successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error updating product:", error);
        });
    },
  };

  export default ProductsDataBaseAPI;