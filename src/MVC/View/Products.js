/* eslint-disable react-hooks/exhaustive-deps */
import '../../styles/Products.modules.css';
import React, {useEffect, useRef} from 'react';
import Card                       from '../../components/Card';
import {Link, useNavigate}        from 'react-router-dom';
import { useGlobalContext }       from '../../context/context';

const Products = () => {
  const {controller, arrayIds, updateArrayIds, isLoading, setIsLoading} = useGlobalContext();
  const navigate                               = useNavigate();
  
  const nameRef                                = useRef();
  const priceRef                               = useRef();
  const imageRef                               = useRef();
  const stockRef                               = useRef();

  let products                                 = JSON.parse(localStorage.getItem('products'));
  const loggedInUser                           = JSON.parse(localStorage.getItem('loggedInUser'));
  const isAdmin                                = (loggedInUser?.type === 'admin');

  const deleteClickHandler = () => {
    if (nameRef.current.value.length > 0) {
      controller.productsDelete(arrayIds, products, nameRef, navigate, updateArrayIds, setIsLoading);
    }
  }

  const addClickHandler    = () => {
    if (nameRef.current.value.length  > 0 && priceRef.current.value.length > 0 && imageRef.current.value.length > 0) {
      controller.productsAdd(nameRef, priceRef, imageRef, stockRef, navigate, updateArrayIds, setIsLoading);
    }
  }

  const editClickHandler   = () => {
    if (nameRef.current.value.length  > 0 && priceRef.current.value.length > 0 && imageRef.current.value.length > 0) {
      controller.productsEdit(arrayIds, products, nameRef, priceRef, imageRef, stockRef, navigate, updateArrayIds, setIsLoading);
    }
  }

  useEffect(() => {
    controller.checkDB(products, updateArrayIds);
    setIsLoading(false);
  }, []);
  
  return (
    <div className='products'>
      {isAdmin && <h1>Admin Area</h1>}
      {isAdmin && <div className='admin-container'><input ref={nameRef} type='text' width='100%' placeholder='Product Name'/><input ref={priceRef} type='text' width='100%' placeholder='Product Price'/><input ref={imageRef} type='text' width='100%' placeholder='Product Image Url'/><input ref={stockRef} type='text' width='100%' placeholder='Stock'/><button onClick={deleteClickHandler} className='btn-delete-admin'>DELETE</button><button onClick={addClickHandler} className='btn-add-admin'>ADD</button><button onClick={editClickHandler} className='btn-edit-admin'>EDIT</button></div>}
      <h1>Products</h1>
      <div className='products-container'>
      {isLoading && <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
      {!isLoading && products && arrayIds.map((id) => <Link key={id} to={`/products/${id}`}><Card 
          name={products[id]?.name} 
          price={products[id]?.price}
          src={products[id]?.imgUrl}
          /></Link>)}
      </div>
    </div>
  )
}

export default Products;
