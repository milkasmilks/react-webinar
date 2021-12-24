import React, {useCallback, useEffect, useState} from "react";
import propTypes from 'prop-types';
import './styles.css';
import FormField from "../form-field";


function FormEdit({fields, countries, categories, onChange, onSubmit, onDelete, error}){
  return (
    <>
    <form className='FormEdit' onSubmit={event => onSubmit(event)}>
      <FormField
        label={'Название'}
        input={<input type="text" name='title' value={fields.title} onChange={(event) => onChange(event)}/>}
        theme='big'
      />
      <FormField
        label={'Описание'}
        input={<textarea name='description' value={fields.description} onChange={(event) => onChange(event)}/>}
      />
      <FormField
        label={'Страна производитель'}
        input={
          <select name='countryId' onChange={(event) => onChange(event)} value={fields.countryId}>
            {countries.map(item => (
              <option key={item.value} value={item.value}>{item.title}</option>
            ))}
          </select>}
      />
      <FormField
        label={'Категория'}
        input={
          <select name='categoryId' onChange={(event) => onChange(event)} value={fields.categoryId}>
            {categories.map(item => (
              <option key={item.value} value={item.value}>{item.title}</option>
            ))}
          </select>}
      />
      <FormField
        label={'Год выпуска'}
        input={<input type="number" name='edition' value={fields.edition} onChange={(event) => onChange(event)}/>}
      />
      <FormField
        label={'Цена (₽)'}
        input={<input type="number" name='price' value={fields.price} onChange={(event) => onChange(event)}/>}
      />
      <div className="FormEdit__row">
        <button className="FormEdit__submit" type="submit">Сохранить</button>
        <div className="FormEdit__error">
          {error}
        </div>
      </div>
    </form>
    <button className="FormEdit__delete" onClick={onDelete}>Удалить</button>
    </>
  );
}

FormEdit.propTypes = {
  fields: propTypes.object.isRequired,
  countries: propTypes.arrayOf(propTypes.object),
  categories: propTypes.arrayOf(propTypes.object),
  onChange: propTypes.func,
  onSubmit: propTypes.func,
  onDelete: propTypes.func,
  error: propTypes.string
}

FormEdit.defaultProps = {
  fields: {},
  countries: [],
  categories: [],
  onChange: () => {},
  onSubmit: () => {},
  onDelete: () => {},
  error: ''
}

export default React.memo(FormEdit);