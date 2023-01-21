import React, { Component }  from 'react';
import $ from 'jquery';
import AuthContext from '../context/AuthContext';
import {Link,useNavigate,useLocation,useParams} from "react-router-dom";
 class Header extends Component {
    static contextType = AuthContext;
    constructor(props){
        super(props);
        this.state = {
            sidebar : {collapse:false}
        };
    }
    
    logout=()=>{
        //console.log(this.context);
        this.context.logOut();
        const { navigation } = this.props;
        navigation('/login');
        //this.context.logOut();
    }
    toggleSideBar = () => {
        if(this.state.sidebar.collapse===false){
            $('div.sidebar').addClass('collapse');
            $('div.sidebar').removeClass('multicollapse');
            $('div.sidebar').removeClass('show');
            $('div.sidebar').css({'transition':'width 0.35s'});
            $('div.sidebar').css({'width':'80px'});
            $('div.main-content').css({'transition':'width 0.35s'});
            $('div.main-content').css('width','-webkit-calc(100% - 80px)');
            this.setState({sidebar:{collapse:true}});
        }else{
            
            $('div.sidebar').removeClass('multicollapse');
            $('div.sidebar').removeClass('collpase');
            $('div.sidebar').css({'transition':'width 0.35s'});
            $('div.sidebar').css({'width':'250px'});
            $('div.main-content').css({'transition':'width 0.35s'});
            $('div.main-content').css('width','-webkit-calc(100% - 250px)');
            setTimeout(()=>{$('div.sidebar').addClass('show');},350);
            //$('div.sidebar').addClass('show');
            this.setState({sidebar:{collapse:false}});
        }
        //console.log(this.state.sidebar.collapse);
    }
    toggleOptionMenu=()=>{
        if($('#optionsmenu').hasClass('collapse')===true){
            $('#optionsmenu').addClass('show');
            $('#optionsmenu').removeClass('collapse');
        }else{
            $('#optionsmenu').addClass('collapse');
            $('#optionsmenu').removeClass('show');
        }
    }
    toggleNotification=()=>{
        if($('#notifications').hasClass('collapse')===true){
            $('#notifications').addClass('show');
            $('#notifications').removeClass('collapse');
        }else{
            $('#notifications').addClass('collapse');
            $('#notifications').removeClass('show');
        }
    }
  render() {
    //console.log("header Render")
    //console.log(this.context);
    const{username,name,isAuthenticated,logIn,logOut,setuserName} = this.context;
    return (
        <header>
        <nav className="navbar " aria-label="Dashboard Navbar">
        <div className="container-fluid">
            <div>
                <span className="navbar-toggler-icon1" onClick={this.toggleSideBar}></span>
                <h3 className="main-title">Kamdhenu Gaushala</h3>
            </div>
            <div className="right-option-bar"  id="optionbar">
                <ul>
                    <li><span className="far fa-bell" onClick={this.toggleNotification} role="button" data-bs-toggle="collapse" data-bs-target="#notifications" aria-expanded="false"></span><span>1</span></li>
                    <li><span className="fas fa-cog"></span></li>
                    <li><img/> {name.substring(0,13)} <span className="fas fa-caret-circle-down" onClick={this.toggleOptionMenu} data-bs-toggle="collapse" data-bs-target="#optionsmenu" aria-expanded="false" role="button"></span></li>
                </ul>
                <div id="optionsmenu" className="menuoptions collapse" data-bs-parent="#optionbar">
                    <div className="tranparent-background"></div>
                    <ul>
                        <li>New User</li>
                        <li onClick={()=>{setuserName("Dalwidner")}}>Change Password</li>
                        <li><a herf="#" onClick={this.logout}>Logout</a></li>
                    </ul>
                </div>
                <div id="notifications" className="notifications collapse" data-bs-parent="#optionbar">
                    
                    <div>
                        <span>View All</span><span>Mark All as Read</span><br/>
                    </div>
                    <ul> 
                        <li>Please Update the SW 825 Picture</li>
                        <li>2 Cows pregnant</li>
                        <li>5 Cows ready to dry</li>
                    </ul>
                    <div className="tranparent-background"></div>
                </div>
            </div>
        </div>
      </nav>
    </header>
    )
  }
}
export default function(props){
        let navigation = useNavigate();
        return <Header navigation={navigation}/>;
}

//export default Header;