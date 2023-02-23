import React, { Component } from 'react';
import { ErrorMessage, Field } from 'formik';
import TextError from './TextError';
import Select from "react-select";
import { apiUrl } from '../../../context/AppContext';
import DateTimePicker from 'react-datetime-picker';

export default class FormField extends Component {
  ajax = false;
  constructor(props) {
    
    super(props)

    this.state = {
      options:props.options,
      options2:props.options
    }
    console.log("OPSTIN",this.props)
  }
  getContent=()=>{
    switch(this.props.as){
      case 'select':
        return <Select
        options={this.state.options2}
        value={this.props.value}
        autoSize={true}
        className="form-control"
        onChange={(val) => { console.log(val); this.props.setFieldValue(this.props.name, val) }}
        onInputChange = {(val)=>{if(this.props.ajax===true){console.log(val);this.loadAjaxData(val)}}}
        isMulti={this.props.isMulti}
        placeholder={this.props.placeholder}
      />
        break;
      case 'input':
          return <Field
          className="form-control kg-input"
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
          className="form-control kg-input"
          id={this.props.id}
          name={this.props.name}
          value={this.state.value}
          onChange={(val) => {
            console.log(val);
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
       {this.getContent()}
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
      this.setState({ options2: data });
    }
  }
  /*getSelectOptions = () => {
      let options = [];
      console.log(this.state.options);
      let options2 = Object.entries(this.state.options);
      console.log(options2);
      for (let i = 0; i < options2.length; i++) {
        let items = Object.entries(options2[i]);
        console.log("ITEM",items);
        options.push({
          label: items[1][1],
          value: items[0][1]
        })
      }
      console.log(options);
      //this.setState({options2:options})
      return options;
  }*/
  
}
