import React from 'react';
import propTypes from 'prop-types';
import './styles.css';
import numberFormat from "../../utils/number-format";


function ItemInfo({item, onAdd}) {
  return (
    <div className='ItemInfo'>
      <div className='ItemInfo__description'>{item.description}</div>
      <div className='ItemInfo__madeIn'>Страна производитель: <span>{item.madeIn}</span></div>
      <div className='ItemInfo__category'>Категория: <span>{item.category}</span></div>
      <div className='ItemInfo__edition'>Год выпуска: <span>{item.edition}</span></div>
      <div className='ItemInfo__price'>Цена: <span>{numberFormat(item.price)} ₽</span></div>

      <button onClick={() => onAdd(item._id)}>Добавить</button>
    </div>
  )
}

ItemInfo.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
}

ItemInfo.defaultProps = {
  onAdd: () => {}
}

export default React.memo(ItemInfo);
