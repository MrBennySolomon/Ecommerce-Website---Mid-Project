/* eslint-disable react-hooks/exhaustive-deps */
import "../../styles/Products.modules.css";
import React, { useEffect } from "react";
import Card from "../../components/Card";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import constants from "../../utils/constants";

const Products = () => {

  const { controller, 
          arrayIds, 
          updateArrayIds, 
          isLoading, 
          setIsLoading } = useGlobalContext();
  
  const navigate         = useNavigate();
  const products         = controller.model.getLocal(constants.PRODUCTS);
  const loggedInUser     = controller.model.getLocal(constants.LOGGED_IN_USER);

  useEffect(() => {
    controller.checkDB(
      products,
      updateArrayIds,
      loggedInUser,
      setIsLoading,
      navigate
    );
    setIsLoading(false);
  }, []);
  
  return (
    <div className="products">
      <h1>Products</h1>
      <div className="products-container">
        {isLoading && (
          <div className="lds-default">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
        {!isLoading &&
          products &&
          arrayIds.map((id) => (
            <Link key={id} to={`/products/${id}`}>
              <Card
                name={products[id]?.name}
                price={products[id]?.price}
                src={products[id]?.imgUrl}
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Products;
