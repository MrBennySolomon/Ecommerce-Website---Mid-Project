import React from 'react';
import '../styles/Products.modules.css';
import Card from '../components/Card';
import {Link} from 'react-router-dom';

const Products = () => {
  return (
    <div className='products'>
      <h1>Products</h1>
      <div className='products-container'>
        <Link to='/products/1'><Card/></Link>
        <Link to='/products/2'><Card/></Link>
        <Link to='/products/3'><Card/></Link>
        <Link to='/products/4'><Card/></Link>
        <Link to='/products/5'><Card/></Link>
        
      </div>
    </div>
  )
}

export default Products;

// {data && arrayIds.map((id) => <Link key={id} to={`/shoes/${id}`}><img 
//           key={id} 
//           alt={data[id]?.description}
//           src={data[id]?.imgUrl}
//           width='100%'
//           /></Link>)}