import React from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import { Link } from 'react-router-dom';
import useStore from "../../utils/use-store";

import './styles.css';

function ItemBasket({item}) {
  const store = useStore();

  return (
    <div className='ItemBasket'>
      <div className='ItemBasket__number'>{item.basketIndex}</div>
      <Link to={'/items/' + item._id} className='ItemBasket__title' onClick={() => store.modals.close()}>{item.title}</Link>
      <div className='ItemBasket__right'>
        <span className="ItemBasket__cell">{numberFormat(item.price || 0)} ₽</span>
        <span className="ItemBasket__cell">{numberFormat(item.amount || 0)} шт</span>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
}

ItemBasket.defaultProps = {

}

export default React.memo(ItemBasket);
