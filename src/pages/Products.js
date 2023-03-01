import React from 'react';
import '../styles/Products.modules.css';
import Card from '../components/Card';
import {Link} from 'react-router-dom';

const Products = () => {
  return (
    <div className='products'>
      <h1>Products</h1>
      <div className='products-container'>
        <Link to='/products/1'><Card title='product 1' description='nails polish pink' price='60 NIS'/></Link>
        <Link to='/products/2'><Card title='product 2' description='nails polish red' price='60 NIS'/></Link>
        <Link to='/products/3'><Card title='product 3' description='nails polish blue' price='60 NIS'/></Link>
        <Link to='/products/4'><Card title='product 4' description='nails polish green' price='60 NIS'/></Link>
        <Link to='/products/5'><Card title='product 5' description='nails polish yellow' price='60 NIS'/></Link>
        
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