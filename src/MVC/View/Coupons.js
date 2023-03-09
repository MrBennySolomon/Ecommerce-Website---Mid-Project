import React    from 'react'
import discount from '../../img/discount.png';

const Coupons = () => {
  return (
    <div className='coupons-page'>
      <div className='coupons-container'>
        <img alt='discount img'src={discount} width='100%' height='100%'></img>
      </div>
    </div>
  )
}

export default Coupons;