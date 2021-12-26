import React from "react";
import propTypes from 'prop-types';
import './styles.css';
import {cn} from '@bem-react/classname'



function FormField({label, input, theme}){

  return (
    <div className="FormField">
      <div className="FormField__label">{label}</div>
      <div className="FormField__input">{input}</div>
    </div>
  );
}

FormField.propTypes = {
  label: propTypes.string,
  input: propTypes.node,
  theme: propTypes.string
}

FormField.defaultProps = {
  label: '',
  theme: ''
}

export default React.memo(FormField);