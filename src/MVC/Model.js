import UsersDB    from './DB/UsersDB';
import ProductsDB from './DB/ProductsDB';
import CoursesDB  from './DB/CoursesDB';

class Model {
  constructor() {
    this.usersDB    = UsersDB;
    this.productsDB = ProductsDB;
    this.coursesDB  = CoursesDB;
  }

  getLocal    = str          => {
    return JSON.parse(localStorage.getItem(str));
  }

  setLocal    = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeLocal = key          => {
    localStorage.removeItem(key);
  }
}

export default Model;