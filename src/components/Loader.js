import { render } from '@testing-library/react';
import React, { Component } from 'react';
import TemplateContext from '../context/TemplateContext';

export default class Loader extends Component {
    static contextType = TemplateContext;
    render(){
      let loaderStyle = {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: 'auto',
        zIndex: 4
    }
    let hide = {display:'none'};
      return (
        <>
          <div className="loader-body" style={hide}>
              <h1 className="text-center"><svg className="menu-icon"><use xlinkHref="#bull"/></svg></h1>
              <h2 className="loader-text-message" id="loader-text-message"></h2>
              <div className="loader" style={loaderStyle}>
              </div>
        </div>
        </>
      );
    }
}
