import React from "react";
import propTypes from 'prop-types';
import './styles.css';

function Item({item, onAdd, onUpdateCartSum, onUpdateCartAmount}){
  return (
    <div className={'Item'}>
      <div className='Item__number'>{item.code}</div>
      <div className='Item__row'>
        <div className='Item__title'>
          {item.title}
        </div>
        <div className='Item__price'>
          {item.price.toLocaleString() + ' ₽'}
        </div>
      </div>
      <div className='Item__actions'>
        <button onClick={() => {
          onAdd(item);
          onUpdateCartSum(item);
          onUpdateCartAmount()}}>
          Добавить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func.isRequired,
  onUpdateCartSum: propTypes.func,
  onUpdateCartAmount: propTypes.func
}

Item.defaultProps = {
  onAdd: () => {},
  onUpdateCartSum: () => {},
  onUpdateCartAmount: () => {}
}

export default React.memo(Item);