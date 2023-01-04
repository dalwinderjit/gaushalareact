import React,{Component} from "react";
import $ from 'jquery';
const TemplateContext = React.createContext();
export const TemplateConsumer = TemplateContext.Consumer;

export class TemplateProvider extends Component{
    constructor(props){
		super(props);
		this.state ={loading_counter:0};
	}
    showLoading = async (message='')=>{ 
		await this.setState({loading_counter:++this.state.loading_counter});
		$('#loader-text-message').html(message);
		$('.loader-body').show();
	}
	hideLoading = async ()=>{ 
		await this.setState({loading_counter:--this.state.loading_counter});
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
    render(){
        //const {loading_counter} = this.state;
        //const {closeModal,convertDateTo,convertDateTo3,convertDateTo2,showLoading,hideLoading,readURL,showSuccessMessage,showErrorMessage } = this;
		const templateManager = this;
        return(
            <TemplateContext.Provider value={{
                templateManager
            }}>
                {this.props.children}
            </TemplateContext.Provider>
        )
    }
}

export default TemplateContext;