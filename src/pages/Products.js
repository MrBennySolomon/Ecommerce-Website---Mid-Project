/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import '../styles/Products.modules.css';
import Card from '../components/Card';
import {Link} from 'react-router-dom';
import { useGlobalContext } from '../context/context';


const Products = () => {
  const {arrayIds, updateArrayIds} = useGlobalContext();
  let products = JSON.parse(localStorage.getItem('products'));

  useEffect(() => {
    
    updateArrayIds(Object.keys(products));
    localStorage.setItem('arrayIds', JSON.stringify(Object.keys(products)));
  }, []);
  
  
  return (
    <div className='products'>
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
