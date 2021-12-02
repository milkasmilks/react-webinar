import React from "react";
import Cart from "../cart";
import propTypes from 'prop-types';
import './styles.css';

function Popup({cartItems, cartAmount, cartSum}) {
  return (
    <div id="popup" className="Popup">
      <div className="Popup__body">
        <div className="Popup__content">
          <div className="Popup__head">
            <h1>Корзина</h1>
            <a href="#" className="Popup__close">Закрыть</a>
          </div>
          <Cart cartItems={cartItems} cartAmount={cartAmount} cartSum={cartSum}/>
        </div>
      </div>
    </div>
  )
}

Popup.propTypes = {
  cartItems: propTypes.arrayOf(propTypes.object).isRequired,
}

Popup.defaultProps = {
cartIitems: [],
}

export default React.memo(Popup);