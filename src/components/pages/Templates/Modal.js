import React, { Component } from 'react'
import $ from 'jquery';
export default class Modal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            show:true
        }
        window.onkeydown = ( event ) =>{
          if ( event.keyCode == 27 ) {
            console.log("Base modal 123",this)
            this.hide();
          }
        };
    }
  render() {
    return (
      <>
      <div
        className="modal fade"
        id="selectDamModal"
        tabIndex="-1"
        aria-labelledby="selectDamModal_"
        aria-hidden="true"
        style={{ zIndex: 11 }}
      >
      {this.props.children}
      </div>
      </>
    )
  }
  show = async () => {
    this.setState({show:true});
    if(this.state.data=== undefined || this.state.data.length===0){
        this.search();
    }
    $("body").css("overflow", "hidden");
    //await $("#selectDamModal").css("display", "block");
    await $(this.modal).css('display','block');
    setTimeout(() => {
      $(this.modal).addClass("show");
    }, 1);
  };
  hide = async () => {
    this.setState({show:false});
    $("body").css("overflow", "");
    await $(this.modal).css("display", "");
    $(this.modal).removeClass("show");
  };
  search(){}
  componentWillUnmount=()=>{
    $("body").css("overflow", "");
  }
}
