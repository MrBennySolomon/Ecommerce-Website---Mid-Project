/* eslint-disable react-hooks/exhaustive-deps */
import "../../styles/Products.modules.css";
import React, { useEffect, useRef } from "react";
import Card from "../../components/Card";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import constants from "../../utils/constants";

const Products = () => {
  const { controller, arrayIds, updateArrayIds, isLoading, setIsLoading } =
    useGlobalContext();
  const navigate = useNavigate();

  const nameRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  const stockRef = useRef();

  let products = controller.model.getLocal(constants.PRODUCTS);
  const loggedInUser = controller.model.getLocal(constants.LOGGED_IN_USER);
  const isAdmin = loggedInUser?.type === constants.ADMIN;

  const deleteClickHandler = () => {
    if (nameRef.current.value.length > 0) {
      controller.productsDelete(
        arrayIds,
        products,
        nameRef,
        navigate,
        updateArrayIds,
        setIsLoading
      );
    }
  };

  const addClickHandler = () => {
    if (
      nameRef.current.value.length > 0 &&
      priceRef.current.value.length > 0 &&
      imageRef.current.value.length > 0
    ) {
      controller.productsAdd(
        nameRef,
        priceRef,
        imageRef,
        stockRef,
        navigate,
        updateArrayIds,
        setIsLoading
      );
    }
  };

  const editClickHandler = () => {
    if (
      nameRef.current.value.length > 0 &&
      priceRef.current.value.length > 0 &&
      imageRef.current.value.length > 0
    ) {
      controller.productsEdit(
        arrayIds,
        products,
        nameRef,
        priceRef,
        imageRef,
        stockRef,
        navigate,
        updateArrayIds,
        setIsLoading
      );
    }
  };

  // const adminDeleteHandler = (id, setIsLoading, updateArrayIds) => {
  //   controller.deleteSpecificProduct(id);
  // }

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

  // return isAdmin ? 
  // (
  //   <div className="products">
  //     <h1>Admin Area</h1>
  //     <div className="admin-container">
  //         <input
  //           ref={nameRef}
  //           type="text"
  //           width="100%"
  //           placeholder="Product Name"
  //         />
  //         <input
  //           ref={priceRef}
  //           type="text"
  //           width="100%"
  //           placeholder="Product Price"
  //         />
  //         <input
  //           ref={imageRef}
  //           type="text"
  //           width="100%"
  //           placeholder="Product Image Url"
  //         />
  //         <input ref={stockRef} type="text" width="100%" placeholder="Stock" />
  //         <button onClick={deleteClickHandler} className="btn-delete-admin">
  //           DELETE
  //         </button>
  //         <button onClick={addClickHandler} className="btn-add-admin">
  //           ADD
  //         </button>
  //         <button onClick={editClickHandler} className="btn-edit-admin">
  //           EDIT
  //         </button>
  //       </div>
  //       <h1>Products</h1>
  //      <div className="products-container">
  //        {isLoading && (
  //         <div className="lds-default">
  //           <div></div>
  //           <div></div>
  //           <div></div>
  //           <div></div>
  //           <div></div>
  //           <div></div>
  //           <div></div>
  //           <div></div>
  //           <div></div>
  //           <div></div>
  //           <div></div>
  //           <div></div>
  //         </div>
  //       )}
  //       {!isLoading &&
  //         products &&
  //         arrayIds.map((id) => (
  //           <>
  //             <div onClick={() => adminDeleteHandler(id)} className='btn-delete'>X</div>
  //             <Link key={id} to={`/products/${id}`}>
  //               <Card
  //                 name={products[id]?.name}
  //                 price={products[id]?.price}
  //                 src={products[id]?.imgUrl}
  //               />
  //             </Link>
  //           </>
  //         ))}
  //     </div>
  //   </div>
  // )
  // :
  // (
  //   <div className="products">
  //     <h1>Products</h1>
  //      <div className="products-container">
  //        {isLoading && (
  //         <div className="lds-default">
  //           <div></div>
  //           <div></div>
  //           <div></div>
  //           <div></div>
  //           <div></div>
  //           <div></div>
  //           <div></div>
  //           <div></div>
  //           <div></div>
  //           <div></div>
  //           <div></div>
  //           <div></div>
  //         </div>
  //       )}
  //       {!isLoading &&
  //         products &&
  //         arrayIds.map((id) => (
  //           <Link key={id} to={`/products/${id}`}>
  //             <Card
  //               name={products[id]?.name}
  //               price={products[id]?.price}
  //               src={products[id]?.imgUrl}
  //             />
  //           </Link>
  //         ))}
  //     </div>
  //   </div>
  // );

  return (
    <div className="products">
      {isAdmin && <h1>Admin Area</h1>}
      {isAdmin && (
        <div className="admin-container">
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
          <button onClick={deleteClickHandler} className="btn-delete-admin">
            DELETE
          </button>
          <button onClick={addClickHandler} className="btn-add-admin">
            ADD
          </button>
          <button onClick={editClickHandler} className="btn-edit-admin">
            EDIT
          </button>
        </div>
      )}
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
