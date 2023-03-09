/* eslint-disable react-hooks/exhaustive-deps */
import                           "../../styles/Cart.modules.css";
import React, { useEffect } from "react";
import { useNavigate }      from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import constants            from "../../utils/constants";

const Cart = () => {
  const { controller, 
          total, 
          updateCount,
          updateTotal }   = useGlobalContext();

  const navigate          = useNavigate();

  const productsCart      = controller.model.getLocal(constants.PRODUCTS_CART);
  const coursesCart       = controller.model.getLocal(constants.COURSES_CART);

  const plusClickHandler  = (e) => controller.plusClickHandler(e, updateCount, updateTotal);
  const minusClickHandler = (e) => controller.minusClickHandler(e, updateCount, updateTotal);

  useEffect(() => {
    const loggedInUser = controller.model.getLocal(constants.LOGGED_IN_USER);
    if (!loggedInUser){ 
      navigate(constants.LOGIN_PAGE);
    }
  }, []);

  return (
    <div className="cart">
      <h1>Your Shopping Cart</h1>
      <h2 className="total">{`total: ${total} NIS`}</h2>
      <div className="cart-container">
        <table>
          <thead></thead>
          <tbody>
            {productsCart?.map((item) => (
              <tr key={new Date().getMilliseconds() + Math.random()}>
                <td>
                  <img alt="img" src={item.imgUrl} className="img-cart" />
                </td>
                <td>{item?.name} </td>
                <td>{item?.price} NIS</td>
                <td>
                  <button
                    name={item.name}
                    onClick={minusClickHandler}
                    className="btnMinus"
                  >
                    -
                  </button>
                </td>
                <td className="itemAmount">{item.cartCount}</td>
                <td>
                  <button
                    name={item.name}
                    onClick={plusClickHandler}
                    className="btnPlus"
                  >
                    +
                  </button>
                </td>
              </tr>
            ))}
            {coursesCart?.map((item) => (
              <tr key={new Date().getMilliseconds() + Math.random()}>
                <td>
                  <img alt="img" src={item.imgUrl} className="img-cart" />
                </td>
                <td>{item?.name} </td>
                <td>{item?.price} NIS</td>
                <td>
                  <button
                    name={item.name}
                    onClick={minusClickHandler}
                    className="btnMinus"
                  >
                    -
                  </button>
                </td>
                <td className="itemAmount">{item.cartCount}</td>
                <td>
                  <button
                    name={item.name}
                    onClick={plusClickHandler}
                    className="btnPlus"
                    disabled
                  >
                    +
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
