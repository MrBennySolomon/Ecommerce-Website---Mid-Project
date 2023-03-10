/* eslint-disable react-hooks/exhaustive-deps */
import                                 "../../styles/Product.modules.css";
import React, {useRef, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext }       from "../../context/context";
import constants                  from "../../utils/constants";

const Product = () => {
  const { controller, 
          updateCount, 
          updateTotal, 
          isError, 
          setIsError, 
          setIsLoading, 
          updateArrayIds, 
          showEditFields, 
          setShowEditFields} = useGlobalContext();

  const params               = useParams();
  const navigate             = useNavigate();
  const nameRef              = useRef();
  const priceRef             = useRef();
  const imageRef             = useRef();
  const stockRef             = useRef();

  const products             = controller.model.getLocal(constants.PRODUCTS);
  const selectedProduct      = products[params.id];
  const loggedInUser         = controller.model.getLocal(constants.LOGGED_IN_USER);
  const isAdmin              = loggedInUser?.type === constants.ADMIN;

  const addToCartHandler     = () => {
    controller.addProductToCart(
      selectedProduct,
      setIsError,
      updateCount,
      updateTotal,
      navigate
    );
  };

  const deleteHandler        = () => {
    controller.deleteSpecificProduct(params.id, setIsLoading, updateArrayIds);
    navigate(constants.PRODUCTS_PAGE);
  };

  const addHandler           = () => {
    controller.productsAddSame(selectedProduct, updateArrayIds, setIsLoading);
    navigate(constants.PRODUCTS_PAGE);
  };

  const showHandler          = () => {
    setShowEditFields(true);
    setTimeout(() => {
      editHandler();
    }, 0.1);
  }

  const editHandler          = () => {
    nameRef.current.value = selectedProduct.name;
    priceRef.current.value = selectedProduct.price;
    imageRef.current.value = selectedProduct.imgUrl;
    stockRef.current.value = selectedProduct.stock;
  };

  const doneHandler          = () => {
    controller.editSpecificProduct(nameRef, priceRef, imageRef, stockRef, params.id, setIsLoading, updateArrayIds);
    setShowEditFields(false);
    navigate(constants.PRODUCTS_PAGE);
  }

  useEffect(() => {
    setShowEditFields(false);
  }, []);

  return (
    <div className="product">
      <div className="product-img-container">
        <img alt={selectedProduct.name} src={selectedProduct.imgUrl} width="100%" height="100%" />
      </div>
      <div className="product-description-container">
        <h1>{selectedProduct.name}</h1>
        <h2>{selectedProduct.price}</h2>
        <button onClick={addToCartHandler} className="add-to-cart-btn">
          Add to Cart
        </button>
        {isAdmin &&
          <button className="labels">
            <label onClick={deleteHandler}>
              <i className="fa-solid fa-trash-can fa-2x"></i>
            </label>
            <label onClick={addHandler}>
              <i className="fa-solid fa-plus fa-2x"></i>
            </label>
            <label onClick={showHandler}>
              <i className="fa-solid fa-pen-to-square fa-2x"></i>
            </label>
          </button>
          }
          {showEditFields && 
            <>
              <input
              ref={nameRef}
              type="text"
              width="100%"
              placeholder="Product Name"
              />
              <input
                ref={priceRef}
                type="text"
                width="100%"
                placeholder="Product Price"
              />
              <input
                ref={imageRef}
                type="text"
                width="100%"
                placeholder="Product Image Url"
              />
              <input ref={stockRef} type="text" width="100%" placeholder="Stock" />
              <button onClick={doneHandler}>Done</button>
            </>
          }
        
        {isError && (
          <h3 className="error-msg">sorry ... this product is out of stock</h3>
        )}
      </div>
    </div>
  );
};

export default Product;
