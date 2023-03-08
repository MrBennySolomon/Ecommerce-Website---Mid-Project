import UsersDB from "./DB/UsersDB";
import ProductsDB from "./DB/ProductsDB";
import CoursesDB from "./DB/CoursesDB";
import  secureLocalStorage  from  "react-secure-storage";

class Model {
  constructor() {
    this.usersDB = UsersDB;
    this.productsDB = ProductsDB;
    this.coursesDB = CoursesDB;
  }

  getLocal = (str) => {
    return JSON.parse(secureLocalStorage.getItem(str));
  };

  setLocal = (key, value) => {
    secureLocalStorage.setItem(key, JSON.stringify(value));
  };

  removeLocal = (key) => {
    secureLocalStorage.removeItem(key);
  };
}

export default Model;
