import axios from "axios";
//Google firebase
const API = {
  shoes: axios.create({
    baseURL:
      "https://shoes-app-benny-default-rtdb.europe-west1.firebasedatabase.app/shoes",
  }),

  async removeShoes(id) {
    this.shoes
      .delete(`/${id}.json`)
      .then((response) => {
        console.log(`item id ${id} was deleted seccesfully`);
        return "Shoe Was Deleted!";
        
      })
      .catch((error) => {
        return "Error while deleting shoe";
      });
  },

  async getShoes() {
    try {
      const response = await this.shoes.get(".json");
      if (response.status !== 200) {
        console.error("cant get items from the api");
        return;
      }
      return response.data;
    } catch (error) {
      console.error("Error getting items", error);
    }
  },

  async addShoe(newItemData) {
    this.shoes
      .post(".json", newItemData)
      .then((response) => {
        console.log("Item added successfully");
      })
      .catch((error) => {
        console.error("Error adding item", error);
      });
  },

  async editShoe(updatedData, id) {
    this.shoes
      .put(`/${id}.json`, updatedData)
      .then((response) => {
        console.log("Shoe updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating shoe:", error);
      });
  },
};

export default API;

//mockapi.io
// /* eslint-disable no-unused-vars */
// import axios from "axios"

// const API = {
//   shoes: axios.create({
//       baseURL: 'https://63f76e57e40e087c958eadaa.mockapi.io/shoes'
//   }),

//   async addShoes(content) {
//     try {
//       const response = await this.shoes.post('/', content);
//       return response;
//     } catch (error) {
//       throw new Error ('addShoes failed ...', error);
//     }
//   },

//   async editShoes(name, field) {
//     try {
//       const allShoes = await this.getShoes();
//       const shoesToDelete = allShoes.filter(element => element.description === name);
      
//       const imgUrl = shoesToDelete[0].imgUrl;
//       const description = shoesToDelete[0].description;
//       const price = shoesToDelete[0].price;

//       const fieldToEdit = field.split('*');
      
//       let obj = {};  

//       switch (fieldToEdit[0]) {
//         case 'imgUrl':
//           obj = {imgUrl: `${fieldToEdit[1]}`}
//           break;
//         case 'description':
//           obj = {description: `${fieldToEdit[1]}`}
//           break;
//         case 'price':
//           obj = {price: `${fieldToEdit[1]}`}
//           break;
//         default: throw new Error('switch case went wrong');
//       }
      
//       this.shoes.put(`/${shoesToDelete[0].id}`, obj);
//     } catch (error) {
//       throw new Error ('deleteShoes failed ...', error);
//     }
//   },

//   async deleteShoes(description) {
//     try {
//       const allShoes = await this.getShoes();
//       const shoesToDelete = allShoes.filter(element => element.description === description);
//       console.log(shoesToDelete);
//       this.shoes.delete(`/${shoesToDelete[0].id}`);
//     } catch (error) {
//       throw new Error ('deleteShoes failed ...', error);
//     }
//   },

//   async getShoes() {
//       try {
//           const response = await this.shoes.get('/');
//           return response.data;
//       } catch (error) {
//         throw new Error ('getShoes failed ...', error);
//       }
//   }
// }

// export default API