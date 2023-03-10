import React, { Component } from 'react'
import Header from '../../Header'
import Loader from '../../Loader'
import Sidebar from '../../Sidebar'
import SvgIcons from '../../SvgIcons'
import TemplateManager from '../../TemplateManager'
import CowProfile from '../Cow/CowProfile'
import '../../../css/bootstrap.css';
import '../../../css/font-awesome-all.css';
import '../../../css/sidebars.css';
import '../../../css/stylesheet.css';
import '../../../css/cow-profile.css';
import {
   
    Routes,
    Route
  } from "react-router-dom";
import AuthContext,{AuthProvider,Abc} from '../../../context/AuthContext';
import TemplateContext ,{TemplateProvider}from '../../../context/TemplateContext';
import CowContext,{CowProvider} from '../../../context/CowContext';
import Dashboard from '../Dashboard/Dashboard'
import Test2 from '../Test2'
import { BullProvider } from '../../../context/BullContext'
import BullProfile from '../Bull/BullProfile'

export default class Admin extends Component {
  static contextType = AuthContext;
  constructor(props){
    super(props);
  }
    componentDidMount(){
        //this.templateManager.hideLoading();
        
      }
  render() {
    //console.log("Admin render");
    //console.log(this.context);
    //console.log(this);
    return (
        <>
              <Loader/>
              <SvgIcons/>
              <Header/>
              <TemplateManager ref={(ref) => {this.templateManager = ref}}/>
              <section className="row" style={{height:'calc(100vh - 54px)',margin:'0px'}}>
                  <Sidebar/>
                  <Routes>
                      <Route path="dashboard" element={<TemplateProvider><Dashboard/></TemplateProvider>}/>
                      <Route exact path="cow-profile" element={<TemplateProvider><CowProvider><CowProfile /></CowProvider></TemplateProvider>}/>
                      {/*<Route exact path="cow-profile" element={<CowProfile />}/>*/}
                      <Route path="bull-profile" element={<TemplateProvider><BullProvider><BullProfile/></BullProvider></TemplateProvider>}/>
                      <Route path="*" element={<>404 Not found</>}/>
                  </Routes>
              </section>
            
        </>
    )
  }
}
