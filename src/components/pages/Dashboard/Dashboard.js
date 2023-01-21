import React, { Component } from 'react'
import Footer from '../../Footer';
import Cards from './Cards';
import PieChart from './PieChart';
import AuthContext from '../../../context/AuthContext';
import TemplateContext from '../../../context/TemplateContext';
export default class Dashboard extends Component {
    static contextType = AuthContext;
    constructor(props) {
      super(props)
    
      this.state = {
         
      }
    }
    componentDidMount=()=>{
      console.log(this.templateManager);
      this.templateManager.hideLoading();
    }

  render() {
    console.log("Dashboard render");    
    return (
      <TemplateContext.Consumer>
        {(data) => {
          this.templateManager = data.templateManager;
          return (
        <div className="main-content multicollapse collapse-horizontal2" id="main-content">
            <Cards/>
            <PieChart/>
            <Footer/>
        </div>
        );
      }}
    </TemplateContext.Consumer>
    )
  }
}
