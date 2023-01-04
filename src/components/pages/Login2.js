import React, { Component } from 'react'
import TemplateContext from '../../context/TemplateContext'
import {useNavigate , useNavigation} from "react-router-dom";
import Loader from '../Loader';
import SvgIcons from '../SvgIcons';
import $ from 'jquery';
import {apiUrl} from '../../context/AppContext';

import '../../css/bootstrap.css';
import '../../css/font-awesome-all.css';
import '../../css/login.css';
import '../../css/stylesheet.css';
import  '../../css/login2.css';

import AuthContext,{AuthConsumer,AuthProvider} from '../../context/AuthContext';

class Login2 extends Component {
  constructor(props){
    super(props);
    //console.log(props)
  }
  static contextType = AuthContext;
  
  login=async ()=>{
      let data = await fetch(apiUrl+"/Users/Login",{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify({'username':'dalwinder','password':'hello123'})})
        .then(res => res.json())
        .then(
          (result) => {
              return result
          },
          (error) => {
              return error
          }
        )
        if(data.isSuccess===true){
          ///console.log(data);
          await this.context.logIn(data);
          //console.log(this.authContext);
          //console.log("HI");
          setTimeout(()=>{this.props.navigate('/')},5000)
          
        }
      return false;
  }
  componentWillUnmount(){
    $('body').css({
      background: '',
      overflow: ''});
  }
  componentDidMount(){
    ///console.log("MOUNT")
    $('body').css({
      background: 'linear-gradient(49deg, rgba(103,85,193,1) 0%, rgba(207,92,185,1) 73%, rgba(230,180,145,1) 100%)',
      overflow: 'hidden'});
      this.login();
  }
  render() {
    ///console.log("login2 render")
    ///console.log(this.context);
    let style = {width:'100%',background: 'linear-gradient(49deg, rgba(103,85,193,1) 0%, rgba(207,92,185,1) 73%, rgba(230,180,145,1) 100%)',borderRadius: '25px',color:'white',fontWeight:'bolder',height:'50px',border:'0px'}
    //let style = {width:'100%'};
    return (
      <>
      <AuthContext.Consumer>
        {(value)=>{
          ///console.log(value);
          this.authContext = value;
        }}
      </AuthContext.Consumer>
      <Loader/>
      <SvgIcons/>
      <section> 
        <div className="side_div"></div>
        <div className="side_div2"></div>
        <div className="row center-login-div">
          <div className="col-md-4 login col-sm-8 col-xs-8">
            <h1 className="login-title text-center" onClick={this.login}>{this.context.username}</h1>
            <div style={{margin:'20px',color:'black'}}>
            <form id="signupForm" onSubmit={(e)=>{e.preventDefault();this.login();return false;}}> 
              <div className="mb-3 input-group">
                <span className="djjs-input-group-text fa fa-user" id="addon-wrapping" ></span>
                <input type="text" className="form-control djjs-form-control" id="username"  name="username"/>
                </div>
              <div className="mb-3 input-group">
                <span className="djjs-input-group-text fa fa-lock" id="addon-wrapping" ></span>
                <input type="password" className="form-control djjs-form-control" id="password"  name="password"/>
              </div>
              <div className="mb-3 d-flex justify-content-center">
                <input type="button" className="" style={style} value={"LOGIN"} id="login" onClick={this.login} /><br/>
              </div>
              </form>
            </div>
            
          </div>
        </div>
      </section>
        
      </>
    )
  }
}

export default function(props){
  console.log("EXPRING LOGINT 2 FUNCTION")
  
  const navigate = useNavigate();
  
  return <Login2 navigate={navigate}/>
}