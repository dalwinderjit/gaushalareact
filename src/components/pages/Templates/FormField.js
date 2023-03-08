import React, { Component } from 'react';
import { ErrorMessage, Field } from 'formik';
import TextError from './TextError';
import Select from "react-select";
import { apiUrl } from '../../../context/AppContext';
import DateTimePicker from 'react-datetime-picker';
import ErrorBoundary from '../../ErrorBoundary';
import { object } from 'yup';

export default class FormField extends Component {
  ajax = false;
  afterContent = '';
  before_label = '';
  error_after = '';
  inputElement = {
    className: 'form-control kg-input'
  };
  selectElement ={
    className : 'col-md-8'
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
  }
  getContent=()=>{
    switch(this.props.as){
      case 'select':
        return <Select
        options={this.getSelectOptions()}
        value={this.props.value}
        autoSize={true}
        width={'100%'}
        className={this.selectElement.className}
        onChange={(val) => { this.props.setFieldValue(this.props.name, val);if(this.props.onChange){this.props.onChange(val)};}}
        onInputChange = {(val)=>{if(this.props.ajax===true){;this.loadAjaxData(val)}else{this.getSelectOptions()}}}
        isMulti={this.props.isMulti}
        placeholder={this.props.placeholder}
        ref={(ref)=>{this.currentElement = ref;}}
      />
        break;
      case 'input':
          return <Field
          className={this.inputElement.className}
          id={this.props.id}
          name={this.props.name}
        />
        break;
      case 'hidden':
        return <>{this.props.field_component_before}<Field
          type="hidden"
          id={this.props.id}
          name={this.props.name}
        /></>
        break;
      case 'date':
        return <DateTimePicker
          className={this.dateElement.className}
          id={this.props.id}
          name={this.props.name}
          value={this.props.value}
          onChange={(val) => {
            this.setState({value:val});
            this.props.setFieldValue(this.props.name, val);
          }}
        />
      case 'empty':
          return this.props.content;
    }
  }
  render() {
    return (
      <div className="input-group mb-3">
        {this.props.before_label}
        <label
          className="input-group-text kg-label"
          htmlFor={this.props.id}
        >
          {this.props.label}
        </label>
        <ErrorBoundary>
       {this.getContent()}
       </ErrorBoundary>
       {this.afterConte}
        <br />
        <ErrorMessage
          name={this.props.name}
          component={TextError}
        />
        {this.error_after}
      </div>
    )
  }
  loadAjaxData=async (inputValue) => {
    if(inputValue!=""){
      let data = await this.props.ajaxSource(inputValue);
      this.setState({ options: data });
    }
  }
  getSelectOptions = () => {
      let options = [];
      //console.log(this.state.options);
      let options2 = Object.entries(this.state.options);
      //console.log(options2);
      options.push({
        label: 'Select One',
        value: ''
      })
      for (let i = 0; i < options2.length; i++) {
        let items = Object.entries(options2[i]);
        //console.log("ITEM",items);
        options.push({
          label: items[1][1],
          value: items[0][1]
        })
      }
      return options;
  }
  clearValue=()=>{
    switch(this.props.as){
      case 'select':
        this.currentElement.setValue(null);
        this.props.setFieldValue(this.props.name,'');
        break;
    }    
  }
  setValue=(val)=>{
    console.log(val);
    switch(this.props.as){
      case 'select':
        console.log('select')
        let value1 = null;
        if(val instanceof Object === true){
            value1 = parseInt(val.value);
        }else{
          value1 = val;
        }
        let option = {label:'Select One',value:''};
        console.log(this.state.options);
        let options2 = Object.entries(this.state.options);
        if(options2.length>0){
          for (let i = 0; i < options2.length; i++) {
            let items = Object.entries(options2[i]);
            if(parseInt(items[0][1])===parseInt(value1)){
              option = {
                label: items[1][1],
                value: items[0][1]
              };
            }
          }
          if(option!=null){
            this.currentElement.setValue(option);
          }
        }else{
          if(val instanceof Object === true){
            option = val;
          }else{
            option = {
              label:'',
              value:value1
            }
          }
          this.currentElement.setValue(option);
        }
        break;
      case 'date':
        this.props.setFieldValue(this.props.name,val);
        break;
    }    
  }
}
