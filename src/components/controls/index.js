import React from "react";
import plural from 'plural-ru';
import './styles.css';

function Controls({cartSum, cartAmount}){

  return (
    <div className='Controls'>
      <div className='Controls__cart'>
        <span>В корзине:</span>
        <div className='Controls__total'>
          {cartAmount ? cartAmount + plural(cartAmount, ' товар', ' товара', ' товаров') + ' / ' + cartSum.toLocaleString() + ' ₽' : 'пусто'}
        </div>
      </div>
      <a href="#popup" className='Controls__open'>Перейти</a>
    </div>
  )
}

export default React.memo(Controls);