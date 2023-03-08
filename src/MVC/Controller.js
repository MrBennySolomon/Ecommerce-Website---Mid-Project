import constants from "../utils/constants";
import img0 from "../img/img0.jpg";
import img1 from "../img/img1.jpg";
import img2 from "../img/img2.jpg";
import img3 from "../img/img3.jpg";
import img4 from "../img/img4.jpg";
import img5 from "../img/img5.jpg";
import img6 from "../img/img6.jpg";
import img7 from "../img/img7.jpg";
import img8 from "../img/img8.jpg";
import img9 from "../img/img9.jpg";
import img10 from "../img/img10.jpg";

class Controller {
  constructor(model) {
    this.model = model;
  }

  plusClickHandler = (e, updateCountFn, updateTotalFn) => {
    const productsCart = this.model.getLocal("productsCart");
    const coursesCart = this.model.getLocal("coursesCart");

    const selectedProduct = productsCart.find(
      (item) => item.name === e.target.getAttribute("name")
    );
    const selectedCourse = coursesCart.find(
      (item) => item.name === e.target.getAttribute("name")
    );
    const count = Number(this.model.getLocal("cartCount")) + 1;

    this.model.setLocal("cartCount", count);
    updateCountFn(constants.PLUS);

    const total =
      Number(this.model.getLocal("cartTotal")) +
      (selectedCourse
        ? Number(selectedCourse.price)
        : Number(selectedProduct.price));
    this.model.setLocal("cartTotal", total);
    updateTotalFn(
      constants.PLUS,
      selectedCourse
        ? Number(selectedCourse.price)
        : Number(selectedProduct.price)
    );

    if (selectedProduct) {
      selectedProduct.stock = selectedProduct.stock - 1;
      for (let i = 0; i < productsCart.length; i++) {
        if (productsCart[i].name === selectedProduct.name) {
          productsCart[i].cartCount = Number(productsCart[i].cartCount) + 1;
        }
      }
      this.model.setLocal("productsCart", productsCart);
    } else {
      coursesCart.push(selectedCourse);
      this.model.setLocal("coursesCart", coursesCart);
    }
  };

  updateCourseCartCount = (courses, selectedCourse) => {
    const updatedArr = [];

    for (let i = 0; i < courses.length; i++) {
      if (courses[i].name === selectedCourse.name) {
        const tempCourse = courses[i];
        tempCourse.cartCount = Number(tempCourse.cartCount) + 1;
        updatedArr.push(tempCourse);
      } else {
        updatedArr.push(courses[i]);
      }
    }
    this.model.setLocal("coursesCart", updatedArr);
  };

  updateProductCartCount(products, selectedProduct) {
    const updatedArr = [];

    for (let i = 0; i < products.length; i++) {
      if (products[i].name === selectedProduct.name) {
        const tempCourse = products[i];
        tempCourse.cartCount = Number(tempCourse.cartCount) + 1;
        updatedArr.push(tempCourse);
      } else {
        updatedArr.push(products[i]);
      }
    }
    this.model.setLocal("productsCart", updatedArr);
  }

  minusClickHandler = (e, updateCountFn, updateTotalFn) => {
    const productsCart = this.model.getLocal("productsCart");
    const coursesCart = this.model.getLocal("coursesCart");

    const selectedProduct = productsCart.find(
      (item) => item.name === e.target.getAttribute("name")
    );
    const selectedCourse = coursesCart.find(
      (item) => item.name === e.target.getAttribute("name")
    );
    const count = Number(this.model.getLocal("cartCount")) - 1;
    this.model.setLocal("cartCount", count);
    updateCountFn(constants.MINUS);

    const total =
      Number(this.model.getLocal("cartTotal")) -
      (selectedCourse
        ? Number(selectedCourse.price)
        : Number(selectedProduct.price));
    this.model.setLocal("cartTotal", total);
    updateTotalFn(
      constants.MINUS,
      selectedCourse
        ? Number(selectedCourse.price)
        : Number(selectedProduct.price)
    );

    if (selectedProduct) {
      selectedProduct.stock = selectedProduct.stock + 1;
    }

    if (selectedCourse) {
      let flag = true;
      const newArr = [];
      for (let i = 0; i < coursesCart.length; i++) {
        if (flag && coursesCart[i].name === selectedCourse.name) {
          flag = false;
        } else {
          newArr.push(coursesCart[i]);
        }
      }
      this.model.setLocal("coursesCart", newArr);
    }

    if (selectedProduct) {
      if (Number(selectedProduct.cartCount) === 1) {
        let flag = true;
        const newArr = [];
        for (let i = 0; i < productsCart.length; i++) {
          if (flag && productsCart[i].name === selectedProduct.name) {
            flag = false;
          } else {
            newArr.push(productsCart[i]);
          }
        }
        this.model.setLocal("productsCart", newArr);
      } else {
        for (let i = 0; i < productsCart.length; i++) {
          if (productsCart[i].name === selectedProduct.name) {
            productsCart[i].cartCount = Number(productsCart[i].cartCount) - 1;
          }
        }
        this.model.setLocal("productsCart", productsCart);
      }
    }
  };

  addCourseToCart = (
    updateCountFn,
    updateTotalFn,
    params,
    loggedInUser,
    navigate
  ) => {
    if (loggedInUser) {
      const courses = this.model.getLocal("courses");
      const selectedCourse = courses[params.id];
      this.model.setLocal("selectedCourse", selectedCourse);

      const count = Number(this.model.getLocal("cartCount")) + 1;
      this.model.setLocal("cartCount", count);
      updateCountFn(constants.PLUS);

      const total =
        Number(this.model.getLocal("cartTotal")) + Number(selectedCourse.price);
      this.model.setLocal("cartTotal", total);
      updateTotalFn(constants.PLUS, Number(selectedCourse.price));

      const coursesCart = this.model.getLocal("coursesCart");
      coursesCart.push(selectedCourse);
      this.model.setLocal("coursesCart", coursesCart);
      navigate("/courses");
    } else {
      navigate("/login");
    }
  };

  deleteCourseFromDB = (
    arrayIds,
    courses,
    nameRef,
    navigate,
    updateArrayIds,
    setIsLoading
  ) => {
    let id = 0;
    for (let i = 0; i < arrayIds.length; i++) {
      if (courses[arrayIds[i]].name === nameRef.current.value) {
        id = arrayIds[i];
      }
    }
    setIsLoading(true);
    this.model.coursesDB.removeCourse(id).then((res) => {
      this.fetchData(setIsLoading).then((res) => {
        this.checkDB(this.model.getLocal("courses"), updateArrayIds);
        setIsLoading(false);
      });
    }).catch((err) => {
      setIsLoading(false);
      console.log('deleting course from DB failed');
      throw new Error('deleting course from DB failed');
    })
  };

  addCourseToDB = (
    nameRef,
    priceRef,
    imageRef,
    videoRef,
    navigate,
    updateArrayIds,
    setIsLoading
  ) => {
    if (
      nameRef.current.value.length > 0 &&
      priceRef.current.value.length > 0 &&
      imageRef.current.value.length > 0 &&
      videoRef.current.value.length > 0
    ) {
      const videos = videoRef.current.value.split(',');
      const newVideos = [];
      videos.forEach((item, i) => {
        newVideos.push({name: i + 1, url: item});
      });
      this.model.coursesDB
        .addCourse({
          cartCount: 1,
          imgUrl: imageRef.current.value,
          name: nameRef.current.value,
          price: priceRef.current.value,
          videos: newVideos
        })
        .then((res) => {
          this.fetchData(setIsLoading).then((res) => {
            this.checkDB(this.model.getLocal("courses"), updateArrayIds);
            setIsLoading(false);
          });
        }).catch((err) => {
          setIsLoading(false);
          console.log('adding course to DB failed');
          throw new Error('adding course to DB failed');
        })
    }
  };

  editCourseFromDB = (
    arrayIds,
    courses,
    nameRef,
    priceRef,
    imageRef,
    videoRef,
    navigate,
    updateArrayIds,
    setIsLoading
  ) => {
    if (
      nameRef.current.value.length > 0 &&
      priceRef.current.value.length > 0 &&
      imageRef.current.value.length > 0 &&
      videoRef.current.value.length > 0
    ) {
      const videos = videoRef.current.value.split(',');
      const newVideos = [];
      videos.forEach((item, i) => {
        newVideos.push({name: i + 1, url: item});
      });
      let id = 0;
      arrayIds.forEach((element) => {
        if (courses[element].name === nameRef.current.value) {
          id = element;
        }
      });
      setIsLoading(true);
      this.model.coursesDB
        .editCourse(
          {
            cartCount: 1,
            imgUrl: imageRef.current.value,
            name: nameRef.current.value,
            price: priceRef.current.value,
            videos: newVideos
          },
          id
        )
        .then((res) => {
          this.fetchData(setIsLoading).then((res) => {
            this.checkDB(this.model.getLocal("courses"), updateArrayIds);
            setIsLoading(false);
          });
        }).catch((err) => {
          setIsLoading(false);
          console.log('editing course from DB failed');
          throw new Error('editing course from DB failed');
        })
    }
  };

  fetchData = async (setIsLoading) => {
    setIsLoading(true);
    await this.model.usersDB.getAllUsers().then((res) => {
      this.model.setLocal("users", res);
      setIsLoading(false);
    }).catch((err) => {
      setIsLoading(false);
      console.log('getAllUsers from DB failed');
      throw new Error('getAllUsers from DB failed');
    })
    await this.model.productsDB.getAllProducts().then((res) => {
      this.model.setLocal("products", res);
      setIsLoading(false);
    }).catch((err) => {
      setIsLoading(false);
      console.log('getAllProducts from DB failed');
      throw new Error('getAllProducts from DB failed');
    })
    await this.model.coursesDB.getAllCourses().then((res) => {
      this.model.setLocal("courses", res);
      setIsLoading(false);
    }).catch((err) => {
      setIsLoading(false);
      console.log('getAllCourses from DB failed');
      throw new Error('getAllCourses from DB failed');
    })
  };

  initStorage = () => {
    this.model.setLocal("cartCount", "0");
    this.model.setLocal("cartTotal", "0");
    this.model.setLocal("productsCart", []);
    this.model.setLocal("coursesCart", []);
    this.model.setLocal("productsCartCount", []);
    this.model.setLocal("coursesCartCount", []);
  };

  getSlides = () => {
    return [
      { url: img0, title: "img" },
      { url: img1, title: "img" },
      { url: img2, title: "img" },
      { url: img3, title: "img" },
      { url: img4, title: "img" },
      { url: img5, title: "img" },
      { url: img6, title: "img" },
      { url: img7, title: "img" },
      { url: img8, title: "img" },
      { url: img9, title: "img" },
      { url: img10, title: "img" }
    ];
  };

  getSlidesStyle = () => {
    return {
      width: "60%",
      height: "50vmin",
      margin: "0 auto"
    };
  };

  loginSubmit = (e, emailRef, passwordRef, setIsError, navigate) => {
    e.preventDefault();

    const users = this.model.getLocal("users");
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setIsError(false);

    const loggedInUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (loggedInUser) {
      this.model.setLocal(constants.LOGGED_IN_USER, loggedInUser);
      navigate("/");
    } else {
      setIsError(true);
    }
  };

  resetLogin = (e, emailRef, passwordRef, setIsError) => {
    e.preventDefault();
    emailRef.current.value = "";
    passwordRef.current.value = "";
    setIsError(false);
  };

  addProductToCart = (
    selectedProduct,
    setIsError,
    updateCount,
    updateTotal,
    navigate
  ) => {
    const loggedInUser = this.model.getLocal("loggedInUser");
    this.model.setLocal("selectedProduct", selectedProduct);

    if (loggedInUser) {
      setIsError(false);

      if (selectedProduct.stock <= 0) {
        setIsError(true);
      } else {
        const count = Number(this.model.getLocal("cartCount")) + 1;
        this.model.setLocal("cartCount", count);
        updateCount(constants.PLUS);

        const total =
          Number(this.model.getLocal("cartTotal")) +
          Number(selectedProduct.price);
        this.model.setLocal("cartTotal", total);
        updateTotal(constants.PLUS, Number(selectedProduct.price));

        selectedProduct.stock = selectedProduct.stock - 1;
        selectedProduct.cartCount = Number(selectedProduct.cartCount) + 1;

        const productsCart = this.model.getLocal("productsCart");
        if (productsCart.find((item) => item.name === selectedProduct.name)) {
          for (let i = 0; i < productsCart.length; i++) {
            if (productsCart[i].name === selectedProduct.name) {
              productsCart[i].cartCount = Number(productsCart[i].cartCount) + 1;
            }
          }
        } else {
          productsCart.push(selectedProduct);
        }
        this.model.setLocal("productsCart", productsCart);
      }
      navigate("/products");
    } else {
      navigate("/login");
    }
  };

  productsDelete = (
    arrayIds,
    products,
    nameRef,
    navigate,
    updateArrayIds,
    setIsLoading
  ) => {
    if (nameRef.current.value.length > 0) {
      let id = 0;
      for (let i = 0; i < arrayIds.length; i++) {
        if (products[arrayIds[i]].name === nameRef.current.value) {
          id = arrayIds[i];
        }
      }
      setIsLoading(true);
      this.model.productsDB.removeProduct(id).then((res) => {
        this.fetchData(setIsLoading).then((res) => {
          this.checkDB(this.model.getLocal("products"), updateArrayIds);
          setIsLoading(false);
        });
      });
    }
  };

  productsAdd = (
    nameRef,
    priceRef,
    imageRef,
    stockRef,
    navigate,
    updateArrayIds,
    setIsLoading
  ) => {
    if (
      nameRef.current.value.length > 0 &&
      priceRef.current.value.length > 0 &&
      imageRef.current.value.length > 0 &&
      stockRef.current.value.length > 0
    ) {
      setIsLoading(true);
      this.model.productsDB
        .addProduct({
          name: nameRef.current.value,
          price: priceRef.current.value,
          imgUrl: imageRef.current.value,
          stock: stockRef.current.value
        })
        .then((res) => {
          this.fetchData(setIsLoading).then((res) => {
            this.checkDB(this.model.getLocal("products"), updateArrayIds);
            setIsLoading(false);
          });
        });
    }
  };

  productsEdit = (
    arrayIds,
    products,
    nameRef,
    priceRef,
    imageRef,
    stockRef,
    navigate,
    updateArrayIds,
    setIsLoading
  ) => {
    if (
      nameRef.current.value.length > 0 &&
      priceRef.current.value.length > 0 &&
      imageRef.current.value.length > 0 &&
      stockRef.current.value.length > 0
    ) {
      let id = 0;
      arrayIds.forEach((element) => {
        if (products[element].name === nameRef.current.value) {
          id = element;
        }
      });
      setIsLoading(true);
      this.model.productsDB
        .editProduct(
          {
            name: nameRef.current.value,
            price: priceRef.current.value,
            imgUrl: imageRef.current.value,
            stock: stockRef.current.value
          },
          id
        )
        .then((res) => {
          this.fetchData(setIsLoading).then((res) => {
            this.checkDB(this.model.getLocal("products"), updateArrayIds);
            setIsLoading(false);
          });
        });
    }
  };

  checkDB = (
    sellable,
    updateArrayIds,
    loggedInUser,
    setIsLoading,
    navigate
  ) => {
    const newKeys = [];
    if (sellable) {
      const keys = Object.keys(sellable);
      for (let i = 0; i < keys.length; i++) {
        if (sellable[keys[i]] !== null) {
          newKeys.push(keys[i]);
        }
      }
    }

    updateArrayIds(newKeys);
    this.model.setLocal("arrayIds", newKeys);
  };

  deleteSpecificProduct = (id, setIsLoading, updateArrayIds) => {
    setIsLoading(true);
      this.model.productsDB.removeProduct(id).then((res) => {
        this.fetchData(setIsLoading).then((res) => {
          this.checkDB(this.model.getLocal("products"), updateArrayIds);
          setIsLoading(false);
        });
      });
  }

  deleteSpecificCourse = (id, setIsLoading, updateArrayIds) => {
    setIsLoading(true);
    this.model.coursesDB.removeCourse(id).then((res) => {
      this.fetchData(setIsLoading).then((res) => {
        this.checkDB(this.model.getLocal("courses"), updateArrayIds);
        setIsLoading(false);
      });
    });
  }
}

export default Controller;
