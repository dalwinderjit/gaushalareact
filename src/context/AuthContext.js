import React,{Component} from "react";
const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;
export class AuthProvider extends Component{
    constructor(props){
        super(props);
        //console.log("Autho provider");
        //console.log(props);
        //console.log(localStorage.getItem('user'));
        if(localStorage.getItem('user')===null){
            this.state = {
                username:"",
                name:"",
                isAuthenticated : false,
                accessToken:"",
                userType:1,
                activeUrl:"/login"
            };
            this.props.setLogIn("LOGGED_OUT");
        }else{
            try{
                this.state = JSON.parse(localStorage.getItem('user'));
                //console.log("UER FOUND");
                //console.log(this.state);

                this.props.setLogIn("LOGGED_IN");
            }catch(err){
                //console.log("errro")
                this.state = {
                    username:"",
                    name:"",
                    isAuthenticated : false,
                    accessToken:"",
                    userType:1,
                    activeUrl:"/login"
                };
                
                this.props.setLogIn("LOGGED_OUT");  
            }
        }
        //this.props.setLogin(false);
        //console.log(this.props.navigate);
        //console.log(this.state);
    }
    /*state={
        username:"shiv99safdsfad",
        name:"Shiv Kumar",
        isAuthenticated : false,
        accessToken:"",
        userType:1,
        activeUrl:"/admin/dashboard"
    }*/
/*
    state={
        username:"",
        name:"",
        isAuthenticated : false,
        accessToken:"",
        userType:1,
        activeUrl:"/login"
    }*/
    logIn =async (data)=>{
        //console.log(data);
        await this.setState({username:data.username,name:data.name,isAuthenticated:data.isSuccess,accessToken:data.accessToken,userType:data.userType});
        //console.log(this.state);
        //this.props.setLogIn("LOGGED_IN");
        this.props.setToken(data.accessToken);
    }
    setuserName= (name) =>{
        this.setState({username:name});
    }
    logOut = ()=>{
        this.setState({username:"",isAuthenticated:false,
        name:"",
        accessToken:"",
        userType:0,
        activeUrl:"/login"});
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.props.setLogIn("LOGGED_OUT"); 

        this.props.setToken(null);  
    }
    componentDidMount(){
        //this.setuserName("HELLO LKJK");
    }
    render(){
        const {username,name,isAuthenticated,activeUrl} = this.state;
        const {logIn,logOut,setuserName} = this;
        return(
            <AuthContext.Provider value={{
                username,
                name,
                isAuthenticated,
                activeUrl,
                logIn,
                logOut,
                setuserName,
            }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
    convertDateTo=()=>{

    }
    //from dd/mm/yyyy to d-m-y
    convertDateTo1(date){
		if(date!==''){
			var a = date.split('/');
			return a[2]+"-"+a[1]+"-"+a[0];
		}
	}
    //dd/mm/yyyy HH:i:ss
	convertDateTo3(date){
		if(date!==''){
			var a = date.split(' ');
			var b = a[0].split('/');
			return b[2]+"-"+b[1]+"-"+b[0]+" "+a[1];

		}
	}
    //
	convertDateTo2(date){	//1991-11-11T00:00:00 to 11/11/1991
		if(date!=='' && date.trim()!==""){
			var a = date.split('T');
			var b = a[0].split('-');
			return b[2]+"/"+b[1]+"/"+b[0];
		}
	}
}

export default AuthContext;