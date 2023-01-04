
import Header from "./components/Header";
import Loader from "./components/Loader";
import SvgIcons from "./components/SvgIcons";
import Sidebar from './components/Sidebar';
import CowProfile from './components/pages/Cow/CowProfile';
import TemplateManager from './components/TemplateManager';
import React,{useState,useEffect,Component} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useNavigation,
  useLocation,
  Navigate
  
} from "react-router-dom";

import Login from "./components/pages/Login";
import AuthContext, { AuthProvider } from "./context/AuthContext";
import Admin from "./components/pages/Admin/Admin";
import {TemplateProvider} from "./context/TemplateContext";
import {apiUrl} from './context/AppContext';
import Test from "./components/pages/Test";
import Test2 from "./components/pages/Test2";

class App extends Component {
  static contextType = AuthContext;
  constructor(props){
    super(props)
    this.state={
      
    };
   
  }
  componentDidMount(){
    //this.templateManager.hideLoading();
  }
  checkLogin=()=>{
    console.log("is logged in")
    if(this.context && this.context.isAuthenticated===false){
      console.log(this.props.location.pathname)
      if(this.props.location.pathname!=='/login'){
        this.props.setLogIn('LOGGED_OUT');
      }else{
        //this.props.navigate('/login');
      }
    }
  }
  render(){
    //console.log("app render")
    this.context.navigate = this.props.navigate;
    //this.checkLogin();
    return (
      <>
            <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/test" element={<Test/>}/>
              <Route path="test2" element={<TemplateProvider><Test2/></TemplateProvider>}/>
              <Route path="admin" element={<TemplateProvider><Admin/></TemplateProvider>}>
                <Route path="dashboard" element={<>Dashboard</>}/>
                <Route path="cow-profile" element={<>Cow PRofile</>}/>
                <Route path="bull-profile" element={<>Bull PRofile</>}/>
                <Route path="*" element={<>404 Not found</>}/>
              </Route>
              <Route path="*" element={<>Buld 404 not found</>}/>
            </Routes>
      </>
    );
  }
}
function App1(){
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [login, setLogIn] = useState(localStorage.getItem('login'))
  
  useEffect(() => {
    if(token===null){
      if(location.pathname!=='/login'){
        navigate('/login');
      }
    }else{
      if(location.pathname==='/login'){
        console.log(user);
        console.log(token);
        navigate(`${user.role}/dashboard`);
      }
    }
  });
  
  return(
  <>
    <AuthProvider navigate={navigate} location={location} setLogIn={setLogIn} setToken={setToken}><App setLogIn={setLogIn} navigate={navigate} location={location}/></AuthProvider>
  </>);
}
export default function(){
  return(<><Router><App1/></Router></>);
}
//App.contextType = AuthContext;




