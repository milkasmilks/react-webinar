import React from "react";
import CartList from "../cartlist";
import propTypes from 'prop-types';
import './styles.css';

function Cart({cartItems, cartAmount, cartSum}){
  return (
    <div className="Cart">
      <CartList cartItems={cartItems}/>
      <div className="Cart__total">
        <div>Итого</div>
        <div className="Cart__sum">{cartSum.toLocaleString() + ' ₽ '}</div>
        <div className="Cart__amount">{cartAmount} шт</div>
      </div>
    </div>
    
  )
}

Cart.propTypes = {
  cartItems: propTypes.arrayOf(propTypes.object).isRequired
}

Cart.defaultProps = {
  cartItems: []
}

export default React.memo(Cart);