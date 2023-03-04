/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import '../styles/Products.modules.css';
import Card from '../components/Card';
import {Link, useNavigate} from 'react-router-dom';
import { useGlobalContext } from '../context/context';
import ProductsDataBaseAPI from '../utils/ProductsDataBaseAPI';

const Products = () => {
  const {arrayIds, updateArrayIds} = useGlobalContext();
  const navigate = useNavigate();
  const nameRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  const stockRef = useRef();
  let products = JSON.parse(localStorage.getItem('products'));

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const isAdmin = (loggedInUser.type === 'admin');

  const deleteClickHandler = () => {
    if (nameRef.current.value.length > 0) {
      let id = 0;
      for (let i = 0; i < arrayIds.length; i++) {
        console.log(products[arrayIds[i]].name === nameRef.current.value, products[arrayIds[i]].name, nameRef.current.value)
        if (products[arrayIds[i]].name === nameRef.current.value) {
          id = arrayIds[i];
        }
      }
      ProductsDataBaseAPI.removeProduct(id);
      navigate('/');
    }
  }

  const addClickHandler = () => {
    console.log('inside add')
    if(nameRef.current.value.length > 0 && priceRef.current.value.length > 0 && imageRef.current.value.length > 0 && stockRef.current.value.length > 0) {
      ProductsDataBaseAPI.addProduct({
        name: nameRef.current.value,
        price: priceRef.current.value,
        imgUrl: imageRef.current.value,
        stock: stockRef.current.value
      });
      navigate('/');
    }
  }

  const editClickHandler = () => {
  
  }

  useEffect(() => {
    const keys = Object.keys(products);
    const newKeys = []
    for (let i = 0; i < keys.length; i++) {
      if (products[keys[i]] !== null) {
        newKeys.push(keys[i]);
      }
    }
    updateArrayIds(newKeys);
    localStorage.setItem('arrayIds', JSON.stringify(newKeys));
  }, []);
  
  
  return (
    <div className='products'>
      {isAdmin && <h1>Admin Area</h1>}
      {isAdmin && <div className='admin-container'><input ref={nameRef} type='text' width='100%' placeholder='Product Name'/><input ref={priceRef} type='text' width='100%' placeholder='Product Price'/><input ref={imageRef} type='text' width='100%' placeholder='Product Image Url'/><input ref={stockRef} type='text' width='100%' placeholder='Stock'/><button onClick={deleteClickHandler} className='btn-delete-admin'>DELETE</button><button ocClick={addClickHandler} className='btn-add-admin'>ADD</button><button onClick={editClickHandler} className='btn-edit-admin'>EDIT</button></div>}
      <h1>Products</h1>
      <div className='products-container'>
      {products && arrayIds.map((id) => <Link key={id} to={`/products/${id}`}><Card 
          title={products[id]?.name} 
          price={products[id]?.price}
          src='https://i.etsystatic.com/7211054/r/il/bdb222/3947951920/il_1140xN.3947951920_bqg3.jpg'
          /></Link>)}
      </div>
    </div>
  )
}

export default Products;
