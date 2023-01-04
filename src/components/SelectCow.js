import React, { Component } from "react";
import Select, { components } from "react-select";
import { apiUrl } from "../context/AppContext";
export default class SelectCow extends Component {
  constructor(props) {
    super(props);
    this.name = this.props.name;
    this.index = this.props.index;
    this.state = {
      selectedValue: 2
    };
  }
  render() {
    return (
      <>
        <Select
          id="milkComparisonSelectCow1"
          value={this.state.selectedValue}
          options={this.state.options}
          onChange={this.handleChange}
          onInputChange={(value) => {
            if (value != "") {
              this.loadCows(value);
            }
          }}
        />
      </>
    );
  }
  loadCows = async (inputValue) => {
    let data = new FormData();
    data.append("tagNo", inputValue);
    data.append("pageNo", 1);
    const requestOptions = {
      method: "POST",
      body: data,
    };
    let response = await fetch(
      `${apiUrl}Cows/GetCowsIDNamePairByTagNo`,
      requestOptions
    )
      .then((res) => res.json())
      .then(
        (result) => {
          return result;
        },
        (error) => {
          return error;
        }
      );
    var data_ = Object.entries(response);
    let new_data = [];
    for (let i = 0; i < data_.length; i++) {
      new_data.push({
        value: data_[i][0],
        label: data_[i][1],
      });
    }
    this.setState({ options: new_data });
  };
  
  handleChange=async (value)=>{
    await this.setState({selectedValue:value})
    this.props.onChange(this.index,value);
  }
}
