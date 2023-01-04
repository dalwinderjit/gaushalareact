import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
export default class SidebarItem extends Component {
    static contextType = AuthContext;
    constructor(props){
        super(props);
        this.state={
            active:"active",
            isActive:false,
            chevron:"fa-chevron-down",
            childUrls:[],
            url:props.data.path
        }
        this.state.chevron = "fa-chevron-down";
        this.active = "collapse2";
        let urls = [];
        if(this.props.data.hasChildren===true){
            this.props.data.children.map(item=>{
                urls.push(item.path);
                let b = this.props.isActive(item.path);
                if(b===true){
                    this.state={
                        isActive:true
                    }
                    this.state.chevron = "fa-chevron-up";
                    this.active = "active";
                }
            });
            this.state={childUrls:urls};
        }else{
           let b = this.props.isActive("/admin"+this.props.data.path);
           
           if(b===true){
                this.state={
                    isActive:true
                }
                this.state.chevron = "fa-chevron-up"
                this.active = "active";
            }
        }
    }
    isActive=(pageUrl)=>{
        //if(pageUrl==this.context.activeUrl){
      //console.log("Sidebar Item is active called");
        let active =false;
        if(this.props.data.hasChildren===true){
            this.props.data.children.map(item=>{
                let b = this.props.isActive(item.path);
                if(b===true){
                    active = true;
                    this.state={
                        isActive:true,
                        chevron:"fa-chevron-up"
                    };
                    this.active = "active";
                }
            });
            if(active===true){
                return "active";
            }else{
                this.state={
                    chevron:"fa-chevron-down"
                }
                return "collapse2";
                
            }
        }else{
            let b = this.props.isActive("/admin"+this.props.data.path);
            if(b===true){
                this.state={
                    isActive:true
                }
                this.state.chevron = "fa-chevron-up"
                this.active = "active";
                return "active";
            }else{
                this.state={
                    isActive:true
                }
                return "";
            }
        }
    }
    
    render() {
      //console.log("SIDEBAR ITEM RENDER"+this.props.data.title);
        const children = [];
        if(this.props.data.hasChildren===true){
            this.props.data.children.map((child,index)=>{
                if(this.props.isActive(child.path)){
                    children.push(<li key={index} className="active"><Link to={child.path} className="cp-link rounded">{child.title}</Link></li>)
                }else{
                    children.push(<li key={index}><Link to={child.path} className="cp-link rounded">{child.title}</Link></li>)
                }
            });
        }
        let title = '';
        if(this.props.data.hasChildren===true){
            title = <Link to={this.props.data.path}>{this.props.data.title}</Link>;
        }else{
            title = this.props.data.title;
        }
        
        return (
            <li className={"menu-item "+this.isActive(this.props.path)}>
                <div>
                    <svg className="menu-icon"><use xlinkHref={"#"+this.props.data.svgIcon}/></svg>
                    {this.props.data.hasChildren===true?<><i className={"fa "+this.getChevron()+ " collapse-symbol"} onClick={this.props.toggleMenu}> </i><span>{title}</span></>
                    :<span><Link to={"/admin"+this.props.data.path}>{title}</Link></span>}
                </div>
                {this.props.data.hasChildren===true?
                    <div id={""/*+this.isActive("/admin/cow-profile")*/}>
                        <ul className="list-unstyled child-menu">
                            {children}
                        </ul>
                    </div>
                :""}
            </li>
        
        )
    }
    getChevron(){
        return this.state.chevron;
    }
}
