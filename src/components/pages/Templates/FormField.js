import React, { Component } from 'react';
import { ErrorMessage, Field } from 'formik';
import TextError from './TextError';
import Select from "react-select";

export default class FormField extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
    console.log("OPSTIN",this.props)
  }
  getContent=()=>{
    switch(this.props.as){
      case 'select':
        return <Select
        options={this.getSelectOptions()}
        value={this.props.value}
        autoSize={true}
        className="form-control"
        onChange={(val) => { this.props.setFieldValue(this.props.name, val) }}
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
        case 'empty':
          return this.props.content;

    }
  }
  render() {
    return (
      <div className="input-group mb-3">
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
      </div>
    )
  }
  getSelectOptions = () => {
    let options = [];
    console.log(this.props.options);
    let options2 = Object.entries(this.props.options);
    console.log(options2);
    for (let i = 0; i < options2.length; i++) {
      let items = Object.entries(options2[i]);
      console.log("ITEM",items);
      options.push({
        label: items[1][1],
        value: items[0][1]
      })
    }
    console.log(options)
    return options;
  }
}
