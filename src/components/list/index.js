import React from "react";
import propTypes from 'prop-types';
import Item from "../item";
import './styles.css';

function List({items, onAddItem, onUpdateCartSum, onUpdateCartAmount}){
  return (
    <div className='List'>{items.map(item =>
      <div className='List__item' key={item.code}>
        <Item item={item} onAdd={onAddItem} onUpdateCartSum={onUpdateCartSum} onUpdateCartAmount={onUpdateCartAmount}/>
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onAddItem: propTypes.func,
  onUpdateCartSum: propTypes.func,
  onUpdateCartAmount: propTypes.func
}

List.defaultProps = {
  items: [],
  onAddItem: () => {},
  onUpdateCartSum: () => {},
  onUpdateCartAmount: () => {}
}

export default React.memo(List);