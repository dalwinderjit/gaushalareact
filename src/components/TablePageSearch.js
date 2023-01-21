import React, { Component,useContext } from 'react'

import AuthContext, {AuthProvider,AuthConsumer} from '../context/AuthContext';
export default class TablePageSearch extends Component {
    //static contextType = CowContext;
    constructor(props){
        super(props);
        this.state={
            search:'',
            recordsPerPage:10,
            pageNoOption:{2:2,3:3,10:10,25:25,50:50,'All':'All'}
        }
    }
    onChangeSelect=async (e)=>{
        await this.setState({
            recordsPerPage:e.target.value
        });
        this.props.onRecordsPerPageChange(e.target.value);
    }
    onChangeSearch= async (e)=>{
        await this.setState({
            search:e.target.value
        });
        //call the searc api
        this.props.onSearchValueChange(e.target.value);
    }
    getSearchBar=()=>{
        return(<input type="text" className="search" onChange={this.onChangeSearch} value={this.state.search}/>)
    }
    getAvailabePageOptions=()=>{
        let options = [];
        Object.entries(this.state.pageNoOption).map(([key,value])=>{
            options.push(<option key={key} value={key}>{value}</option>);
        });
        return(<select key={1} onChange={this.onChangeSelect} value={this.state.recordsPerPage}>{options}</select>);
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    {this.getAvailabePageOptions()}
                </div>
                <div className="col-md-6">
                    {this.getSearchBar()}
                </div>
                {this.props.children}
                {/*<AuthProvider>
                    <Child/>
                    <Child2/> 
                </AuthProvider>*/}
            </div>
        );
    }
}
class Child extends Component{
    static contextType = AuthContext;
    render(){
        console.log(this.context);
        const{username,isAuthenticated,logIn,logOut} = this.context;
        return(
            <div>
                <h1>Child Component</h1>
                <h1>User : {username}</h1>
                <h1>Authenticate : {isAuthenticated?"Authenticate":"UnAuthenticated"}</h1>
                <button onClick={logIn}>Login</button>
                <button onClick={logOut}>Log out</button>
            </div>
        )
    }
}
class Child2 extends Component{
    render(){
        return(
            <AuthConsumer>
                {props=>{
                    const{username,isAuthenticated,logIn,logOut} = props;
                    return( <div>
                        <h1>Child Component</h1>
                        <h1>User : {username}</h1>
                        <h1>Authenticate : {isAuthenticated?"Authenticate":"UnAuthenticated"}</h1>
                        <button onClick={logIn}>Login</button>
                        <button onClick={logOut}>Log out</button>
                    </div>);
                }}
            </AuthConsumer>
        )
    }
}
//Child.contextType = AuthContext;
// TablePageSearch.contextType = CowContext;