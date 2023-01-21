import React, { Component } from 'react'

import { useNavigate} from "react-router-dom";
import Loader from '../Loader';
import SvgIcons from '../SvgIcons';
import $ from 'jquery';
import {apiUrl} from '../../context/AppContext';
import { Formik } from 'formik';
import * as yup from 'yup';

import '../../css/bootstrap.css';
import '../../css/font-awesome-all.css';
import '../../css/login.css';
import '../../css/stylesheet.css';
import  '../../css/login2.css';

import AuthContext from '../../context/AuthContext';

class Login extends Component {
  static contextType = AuthContext;
  constructor(props){
    super(props);
    this.state ={
      username:'',
      password:'',
      message:'',
      user:{
        username:'dd',
        password:'ss'
      },
      initialUser:{
        username:'',
        password:''
      }
    }
    
    if(this.context){
      console.log("Context exists");
    }
    this.loginSchema = yup.object().shape({
        username: yup.string().required("Please Enter Username"),
        password: yup.string().required("Please Enter Password")
    });
    this.userData = {
      username:'raman',
      password:'hello123'
    }
    this.userData2 = {
      username:'dalwinder',
      password:'hello123'
    }
    this.formikProps = {
      //initialValues: this.state.user,
      validateOnBlur: true,
      validateOnchange: true,
      validationSchema: this.loginSchema,
      enableReinitialize:true,
      onSubmit: async (formValues, { setSubmitting,setFieldError }) => {
          console.log('submit', formValues);
          let data = await fetch(apiUrl+"Users/Login",{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({'username':formValues.username,'password':formValues.password})})
          .then(res => res.json())
          .then(
            (result) => {
                return result
            },
            (error) => {
                return error
            }
          )
          console.log(data);
          if(data.isSuccess===true){
            localStorage.setItem('token',data.accessToken);
            console.log(JSON.stringify(data));

            localStorage.setItem('user',JSON.stringify(data));
            console.log(data);

            //console.log(data);
            await this.context.logIn(data);
            console.log(this.context);
            //console.log("HI");
            this.props.navigate('../admin/dashboard');
            //setTimeout(()=>{this.props.navigate('../login2')},3000)
            
          }else{
            if(data.errors){
              if(data.errors.error){
                this.state.message = data.errors.error;
                setFieldError('error',data.errors.error);
              }else if(data.errors.username){
                setFieldError('username',data.errors.username);
                //this.state.message = data.errors.username;
              }else if(data.errors.password){
                //this.state.message = data.errors.password;
                setFieldError('password',data.errors.password);
              }else{
                this.state.message = `Unable to login! Don't Know what happen.`;  
              }
            }else{
              this.state.message = 'Invalid Username Password';
            }
            //alert("INVALID USERNAME PASSWORD");
          }
          return false;
      },
    };
  }
 
  loadData=()=>{
    this.setState(this.setState(prevState => {
      let user = prevState.user;
      user = this.userData2;
      return {user}
    }))
  }
  render() {
    //const initialValues = this.state.user;
    this.formikProps.initialValues = this.state.user;
    console.log("render login")
    let style = {width:'100%',background: 'linear-gradient(49deg, rgba(103,85,193,1) 0%, rgba(207,92,185,1) 73%, rgba(230,180,145,1) 100%)',borderRadius: '25px',color:'white',fontWeight:'bolder',height:'50px',border:'0px'}
    return (
      <>
      <Loader/>
      <SvgIcons/>
      <section> 
        <div className="side_div"></div>
        <div className="side_div2"></div>
        <div className="row center-login-div">
          <div className="col-md-4 login col-sm-8 col-xs-8">
            <h1 className="login-title text-center" onClick={this.login}>Kamdhenu Gaushala</h1>
            <div style={{margin:'20px',color:'black'}}>
              <Formik {...this.formikProps} >
                 {({ values,errors,handleSubmit,isSubmitting,touched,handleBlur,handleChange }) => (
                  <form key={1} id="signupForm" onSubmit={handleSubmit}> 
                    <div className={(errors.username  && touched.username)?"mb-3 input-group error":"mb-3 input-group"}>
                        <span className="djjs-input-group-text fa fa-user" id="addon-wrapping" ></span>
                        <input type="text" className="form-control djjs-form-control" id="username"  name="username" value={values.username} onChange={(e)=>{handleChange(e)}} onBlur={handleBlur}/>
                        {(errors.username  && touched.username)?<label className="error-label">{errors.username}</label>:null}
                        
                    </div>
                    <div className={(errors.password  && touched.password)?"mb-3 input-group error":"mb-3 input-group"}>
                        <span className="djjs-input-group-text fa fa-lock" id="addon-wrapping" ></span>
                        <input type="password" className="form-control djjs-form-control" id="password"  name="password" value={values.password} onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.password  && touched.password)?<label className="error-label">{errors.password}</label>:null}
                    </div>
                    
                    <div className="mb-3 justify-content-center">
                      <button type="submit" disabled={(isSubmitting)?"disabled":""} style={style}>Login</button><br/>
                      {/*<button type="button" style={style} onClick={this.loadData}>Load Data</button><br/>*/}
                      {(this.state.message && this.state.message!=='')?<label className="error-label text-center">{this.state.message}</label>:null}
                    </div>
                  </form>
                )}
              </Formik>
            </div>
            
          </div>
        </div>
      </section>
        
      </>
    )
  }
  usernameOnChange=(e)=>{
    this.formikProps.initialValues.username = e.target.value;
    this.setState(prevState => {
      let obj = prevState;
      obj.username = e.target.value;
      return {obj}
    })
  }
  passwordOnChange=(e)=>{
    this.formikProps.initialValues.password = e.target.value;
    this.setState(prevState => {
      let obj = prevState;
      obj.password = e.target.value;
      return {obj}
    })
  }
  isLoggedIn=()=>{
    console.log("Is loggedi n in lOGIN")
    console.log(this.context);
    if(this.context && this.context.isAuthenticated===true){
      //window.location= 'admin/dashboard';
      this.props.navigate('../admin/dashboard');
    }else{
      
    }
  }
  login=async ()=>{
      let data = await fetch(apiUrl+"/Users/Login",{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify({'username':this.state.username,'password':this.state.password})})
        .then(res => res.json())
        .then(
          (result) => {
              return result
          },
          (error) => {
              return error
          }
        )
        /*let data = {
          id:1,
          username:"dalwinder123",
          name:"Dalwinderjit Signh Kalsi",
          isAuthenticated : true,
          accessToken:"7896542",
          userType:1,
          activeUrl:"/admin/dashboard",
          isSuccess:true
        };*/
        console.log(data);
        
        if(data.isSuccess===true){
          sessionStorage.setItem('token',data.accessToken);
          console.log(JSON.stringify(data));
          localStorage.setItem('user',JSON.stringify(data));
          console.log(data);

          //console.log(data);
          await this.context.logIn(data);
          console.log(this.context);
          //console.log("HI");
          this.props.navigate('../admin/dashboard');
          //setTimeout(()=>{this.props.navigate('../login2')},3000)
          
        }else{
          
          alert("INVALID USERNAME PASSWORD");
        }
      return false;
  }
  componentWillUnmount(){
    $('body').css({
      background: '',
      overflow: ''});
  }
  componentDidMount(){
    //{this.isLoggedIn()}
    //console.log("MOUNT")
    $('body').css({
      background: 'linear-gradient(49deg, rgba(103,85,193,1) 0%, rgba(207,92,185,1) 73%, rgba(230,180,145,1) 100%)',
      overflow: 'hidden'
    });
    this.loadData();
  }
}

export default function(){
  const navigate = useNavigate();
  return <Login navigate={navigate}/>
}