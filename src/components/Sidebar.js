import React, { Component } from 'react'
import $ from 'jquery';
import { useHistory} from "react-router";
import { Link ,useLocation,history,useNavigate, useParams } from 'react-router-dom';
import AuthContext, {AuthProvider,AuthConsumer} from '../context/AuthContext';
import SidebarItem from './SidebarItem';
 class Sidebar extends Component {
    constructor(props){
        super(props);
        this.state = {
            activePage:this.props.router.location.pathname
        }
        this.urls=[
            {'Admin':
                {
                    path:'/admin',
                    hasChildren:true,
                    children:[
                        {
                            title:'Dashboard',
                            path:'/dashboard',
                            svgIcon:'dashboard-svg-icon',
                            hasChildren:false
                        },
                        {
                            title:'Profile',
                            path:'#',
                            svgIcon:'bull',
                            hasChildren:true,
                            children:[
                                    {
                                        title:'Cow Profile',
                                        path:'/admin/cow-profile',
                                        hasChildren:false
                                    },
                                    {
                                        title:'Bull Profile',
                                        path:'/admin/bull-profile',
                                        hasChildren:false
                                    },
                                    {
                                        title:'Heifer Profile',
                                        path:'/admin/heifer-profile',
                                        hasChildren:false
                                    },
                                    {
                                        title:'Male Calf Profile',
                                        path:'/admin/calf-profile',
                                        hasChildren:false
                                    }
                            ]
                        },
                        {
                            title:'Milking',
                            path:'#',
                            svgIcon:'milking-svg-icon',
                            hasChildren:true,
                            children:[
                                    {
                                        title:'Milking overView',
                                        path:'/admin/milking-overview',
                                        hasChildren:false
                                    },
                                    {
                                        title:'Milking Updates',
                                        path:'/admin/milking-updates',
                                        hasChildren:false
                                    },
                                    {
                                        title:'Milking Reports',
                                        path:'/admin/reports',
                                        hasChildren:false
                                    }
                            ]
                        },
                        {
                            title:'Breeding',
                            path:'/admin/breeding',
                            svgIcon:'cow-icon',
                            hasChildren:false,
                        },
                        {
                            title:'Medication',
                            path:'/admin/medication',
                            svgIcon:'medication-svg-icon',
                            hasChildren:true,
                            children:[
                                {
                                    title:'Individual',
                                    path:'/admin/medication',
                                    hasChildren:false
                                },
                                {
                                    title:'Vaccination',
                                    path:'/admin/vaccination',
                                    hasChildren:false
                                }
                        ]
                        },
                        {
                            title:'Miscelleneous',
                            path:'/admin/miscelleneous',
                            svgIcon:'medication-svg-icon',
                            hasChildren:false
                        },
                        {
                            title:'PD List',
                            path:'/admin/pd-list',
                            svgIcon:'medication-svg-icon',
                            hasChildren:false
                        },
                        {
                            title:'Semen',
                            path:'/admin/Semen',
                            svgIcon:'sperm-svg-icon',
                            hasChildren:false
                        },
                        {
                            title:'Reminders',
                            path:'/admin/reminders',
                            svgIcon:'reminder-svg-icon',
                            hasChildren:false
                        },
                        {
                            title:'Reports',
                            path:'/admin/reports',
                            svgIcon:'report-svg-icon',
                            hasChildren:false
                        },

                    ]
                }
            }
        ]
    }
    getSideBar=()=>{
      //console.log("URLS");
        const sidebar_items = [];
        let path = this.urls[0]['Admin'].path;
        let children = this.urls[0]['Admin'].children;
        children.map((item,index)=>{
          //console.log("HI");
            sidebar_items.push(<SidebarItem key={index} data={item} active="active" toggleMenu={this.toggleMenu} isActive={this.isActive} activePage={this.state.activePage} />)
        })
        return sidebar_items;
    }
    isActive=(pageUrl)=>{
        if(pageUrl===this.state.activePage){
            return true;
        }else{
            return false;
        }
    }
    getActive=(pageUrl)=>{
        if(this.isActive(pageUrl)===true){
            return "active";
        }else{
            return "";
        }
    }
    getStyle=(pageUrl,e)=>{
        if(pageUrl===this.props.router.location.pathname){
            return {'overflow':'hidden',height:'160px'};
        }else{
            return {}
        }
    }
    toggleMenu = (e)=>{
        let obj = e.target;
        let menu_items = $('div.sidebar>div>ul>li');
        let li = $(obj).parent().parent();
        $.each(menu_items,(k,val)=>{
            var i = $(val).children('div:nth-child(1)').children('i.collapse-symbol');
            if(i.length!==0){
                 //console.log('hi');
                 if(val!==e.target){
                    //console.log('hi');
                    //this.hide($(i));
                 }
            }
        });
        //collapse them
        if(li.hasClass("collapse2")){       //it is hidden so we have to show it
            this.show(obj);
            li.removeClass("collapse2");
        }else{  //hide it
            this.hide(obj);
            li.addClass("collapse2");
        }
    }
    show= (obj)=>{
        let childDiv =	$(obj).parent().parent().children('div:nth-child(2)');
        let icon = $(obj).parent().parent().children('div:nth-child(1)').children('i.collapse-symbol');
        let li = $(obj).parent().parent();
        let height = childDiv.css('height');
        childDiv.css({'height':'0px','overflow':'hidden','display':'block'});
        icon.css({'border':'3px solid transparent','transform':'rotate(0deg)'});
        setTimeout(()=>{childDiv.addClass('animateMenu');icon.addClass('animateMenuIcon');},1)
        setTimeout(()=>{
            icon.css('transform','rotate(180deg)');
            childDiv.css('height',height);
        },2);
        setTimeout(()=>{
            childDiv.removeClass('animateMenu');
            icon.removeClass("fa-chevron-down");
            icon.addClass("fa-chevron-up");
            icon.removeClass('animateMenuIcon');
            icon.css({transform:'',border:''});
            childDiv.css({'height':'','display':'',overflow:''});
            icon.removeAttr('style');
            childDiv.removeAttr('style');
        },2002);
    }
    hide=(obj)=>{
        let childDiv =	$(obj).parent().parent().children('div:nth-child(2)');
        //console.log(childDiv);
        let icon = $(obj).parent().parent().children('div:nth-child(1)').children('i.collapse-symbol');
        //console.log(icon);
        let li = $(obj).parent().parent();
        let height = childDiv.css('height');
      //console.log(height);
        childDiv.removeClass('show');
        childDiv.css({'overflow':'hidden','display':'block','height':'160px'});
        childDiv.addClass('animateMenu');
        icon.css({'border':'3px solid transparent',transform:'rotate(0deg)'});
        icon.addClass('animateMenuIcon');
        setTimeout(()=>{
            childDiv.css('height','0px');
            icon.css('transform','rotate(180deg)');
        },1)
        setTimeout(()=>{
            childDiv.removeClass('animateMenu');
            icon.removeClass('animateMenuIcon');
            icon.addClass("fa-chevron-down");
            icon.removeClass('fa-chevron-up');
            icon.css({border:'',transform:''});
            li.addClass("collapse2");
            childDiv.css({'height':'','display':''});
            childDiv.addClass('show');
        },2000)
    }
    setPage=()=>{
        //console.log("Setting active page");
        this.setState({activePage:'admin/cow-profile'})
    }
  render() {
  //console.log(this.context);
  //console.log('Sidebar render');
    this.context.activeUrl = this.props.router.location.pathname;
    this.state.activePage = this.props.router.location.pathname;
    return (
        <div className="col-md-3  multicollapse show sidebar" id="sidebar01">
            <div className="col-md-12">
                <ul className="sidemenu" id="accordionSidebar">
                    {this.getSideBar()}
                
                </ul>
            </div>
        </div>
    )
  }
}
Sidebar.contextType = AuthContext;
function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      
      return (
        <Sidebar
          {...props}
          router={{ location, navigate, params }}
        />
      );
    }
  
    return ComponentWithRouterProp;
  }

export default withRouter(Sidebar);