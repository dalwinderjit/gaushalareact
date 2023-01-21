import React, { Component } from 'react';
import $ from 'jquery';

export default class TemplateManager extends Component {
    constructor(props){
		super(props);
		this.state ={loading_counter:0};
	}
    showLoading = async (message='')=>{ 
		await this.setState(prevState=>{loading_counter:++prevState.loading_counter});
		$('#loader-text-message').html(message);
		$('.loader-body').show();
	}
	hideLoading = async ()=>{ return;
		await this.setState(prevState=>{loading_counter:--prevState.loading_counter});
		if(this.state.loading_counter<=0){
			$('#loader-text-message').html('');
			$('.loader-body').hide();
		}else{
			//
		}
	}
	readURL = (input,id) => {
		console.log("dal'");
		if (input.files && input.files[0]) {
			var reader = new FileReader();

			reader.onload = function (e) {
				$('#'+id).attr('src', e.target.result);
			}

			reader.readAsDataURL(input.files[0]);
		}
	}
	showSuccessMessage =(message='Data Summitted Successfully',header='Success Message',header_small='')=>{
			$('#confirm').css('display','block');
		$('#confirm>div>div>div.toast-body').removeClass('danger');
		$('#confirm>div>div>div.toast-body').addClass('success');
		$('#confirm>div>div>div.toast-header>span').removeClass('failure');
		$('#confirm>div>div>div.toast-header>span').addClass('success');
		$('#confirm>div>div>div.toast-header>span').removeClass('fa-times');
		$('#confirm>div>div>div.toast-header>span').addClass('fa-check');
		$('#confirm>div>div>div.toast-header>strong').html(`${header}`);
		$('#confirm>div>div>div.toast-header>small').html(`${header_small}`);
		$('#confirm>div>div>div.toast-body').html(`${message}`);
		$('#confirm').css('display','block');
		setTimeout(()=>{$('#confirm').addClass('show');},20);
		
	}
	showErrorMessage = async (message='Data Summitted Failed',header='Error Message',header_small='')=>{
		console.log('Show error emessge');
		$('#confirm>div>div>div.toast-body').removeClass('success');
		$('#confirm>div>div>div.toast-body').addClass('danger');
		$('#confirm>div>div>div.toast-header>span').removeClass('success');
		$('#confirm>div>div>div.toast-header>span').addClass('failure');
		$('#confirm>div>div>div.toast-header>span').removeClass('fa-check');
		$('#confirm>div>div>div.toast-header>span').addClass('fa-times');
		$('#confirm>div>div>div.toast-header>strong').html(`${header}`);
		$('#confirm>div>div>div.toast-header>small').html(`${header_small}`);
		$('#confirm>div>div>div.toast-body').html(message);
		$('#confirm').css('display','block');
		setTimeout(()=>{$('#confirm').addClass('show');},20);
	}
	convertDateTo(date){
		if(date!==''){
			var a = date.split('/');
			return a[2]+"-"+a[1]+"-"+a[0];
		}
	}
	convertDateTo3(date){
		if(date!==''){
			var a = date.split(' ');
			var b = a[0].split('/');
			return b[2]+"-"+b[1]+"-"+b[0]+" "+a[1];

		}
	}
	convertDateTo2(date){	//1991-11-11T00:00:00
		if(date!=='' && date.trim()!==""){
			var a = date.split('T');
			var b = a[0].split('-');
			return b[2]+"/"+b[1]+"/"+b[0];
		}
	}
	closeModal=()=>{
		$('#confirm').css('display','');
		$('#confirm').removeClass('show');
	}
	componentDidMount=()=>{
		this.showLoading("Loading Data");
	}
  render() {
	return (
		<>
			<div className="modal fade" id="confirm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false" style={{zIndex:15}}>
			<div className="modal-dialog">
				<div className="modal-content">
				<div className="toast-header">
					<span className="fa fa-times failure"></span> &nbsp;&nbsp;&nbsp;
						<strong className="me-auto">Success Message</strong>
					<small></small>
					<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={this.closeModal}></button>
						
				</div>
				<div className="toast-body success">
					Cow is set to milking
					</div>
				</div>
			</div>
			</div>
		</>
    )
  }
}
