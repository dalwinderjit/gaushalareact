import React, { Component } from 'react';
import { ErrorMessage, Field } from 'formik';
import TextError from './TextError';
import Select from "react-select";
import { apiUrl } from '../../../context/AppContext';
import DateTimePicker from 'react-datetime-picker';
import FormField from './FormField';

export default class TableFormField extends FormField {
  inputElement = {
    className: 'cpinput'
  };
  selectElement ={
    className : ''
  }
  dateElement ={
    className : 'form-control kg-input'
  }
  constructor(props) {
    super(props)
    this.state = {
      options:props.options,
      options2:props.options
    }
    this.inputElement.className= 'cpinput';
    this.dateElement.className= '';
  }
  render() {
    return (
      <>
        <tr>
          <td>{this.props.before_label}{this.props.label}</td>
          <td>
            {this.getContent()}
            <ErrorMessage name={this.props.name} component={TextError}/>
            {this.error_after}
          </td>
        </tr>
      </>
    )
  }
  
}
