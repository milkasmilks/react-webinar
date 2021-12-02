import React from "react";
import propTypes from 'prop-types';
import './styles.css';

function CartItem({cartItem}){
  return (
    <div className={'CartItem'}>
      <div className='CartItem__number'>{cartItem.cartCode}</div>
      <div className='CartItem__row'>
        <div className='CartItem__title'>
          {cartItem.item.title}
        </div>
        <div className="CartItem__info">
          <div className='CartItem__price'>
            {cartItem.item.price.toLocaleString() + ' ₽'}
          </div>
          <div className='CartItem__amount'>
            {cartItem.amount + ' шт'}
          </div>
        </div>
      </div>
    </div>
  )
}

CartItem.propTypes = {
  cartItem: propTypes.object.isRequired,
}

export default React.memo(CartItem);