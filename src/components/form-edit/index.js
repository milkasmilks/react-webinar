import React, {useCallback, useEffect, useState} from "react";
import propTypes from 'prop-types';
import './styles.css';
import FormField from "../form-field";
import Input from "../../components/input";
import Select from "../../components/select";
import Textarea from "../../components/textarea";



function FormEdit({fields, countries, categories, onChange, onSubmit, onDelete, error}){

  const onChangeHandler = useCallback((name) => {
    return (value) => onChange(name, value);
  }, [onChange]);
  
  return (
    <>
    <form className='FormEdit' onSubmit={event => onSubmit(event)}>
      <FormField
        label={'Название'}
        input={<Input type="text" onChange={onChangeHandler('title')} value={fields.title} theme="big"/>}
      />
      <FormField
        label={'Описание'}
        input={<Textarea onChange={onChangeHandler('description')} value={fields.description}/>}
      />
      <FormField
        label={'Страна производитель'}
        input={<Select onChange={onChangeHandler('countryId')} value={fields.countryId} options={countries}/>}
      />
      <FormField
        label={'Категория'}
        input={<Select onChange={onChangeHandler('categoryId')} value={fields.categoryId} options={categories}/>}
      />
      <FormField
        label={'Год выпуска'}
        input={<Input type="number" onChange={onChangeHandler('edition')} value={fields.edition}/>}
      />
      <FormField
        label={'Цена (₽)'}
        input={<Input type="number" onChange={onChangeHandler('price')} value={fields.price}/>}
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