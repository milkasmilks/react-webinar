import React from "react";
import propTypes from 'prop-types';
import CartItem from "../cartitem";
import './styles.css';

function CartList({cartItems}) {
  return (
    <div className='CartList'>
      {cartItems.map(cartItem =>
        <div className='CartList__item' key={cartItem.cartCode}>
          <CartItem cartItem={cartItem}/>
        </div>
       )}
    </div>
  )
}

CartList.propTypes = {
  cartItems: propTypes.arrayOf(propTypes.object).isRequired,
}

CartList.defaultProps = {
  cartItems: [],
}

export default React.memo(CartList);