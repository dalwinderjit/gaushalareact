import React, { Component } from 'react'
import $ from 'jquery';
import CowProfileModals from './CowProfileModals';
import Header from "../components/Header";
import Loader from "../components/Loader";
import SvgIcons from "../components/SvgIcons";
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Search from '../pages/Search';
import TablePaginate from '../components/TablePaginate';

export default class CowProfile2 extends Component {
    constructor(props){
        super(props);
        this.state = {
            cow:{
                id:0,
                picture:'cow_default.jpg'
            },
            imageUrl:'http://localhost:4000/images/',
            calvingDetail:{
                data:[
                    /*{
                      "sno": 1,
                      "id": 2784,
                      "cow_service_id": 23108,
                      "dateOfService": "22/08/2017",
                      "bullID": 1532,
                      "cowNo": "SW-719",
                      "deliveryDate": "25/01/2018",
                      "lactationNo": 1,
                      "deliveryStatus": "1",
                      "damWeight": "85",
                      "gender": "Female",
                      "tagNo": "SW-789",
                      "birthWeight": "20",
                      "remarks": "NEw Heifer",
                      "bullSemenNo": "Balram"
                    },
                    {
                      "sno": 2,
                      "id": 2785,
                      "cow_service_id": 23109,
                      "dateOfService": "19/05/2019",
                      "bullID": 1532,
                      "cowNo": "SW-719",
                      "deliveryDate": "20/06/2019",
                      "lactationNo": 2,
                      "deliveryStatus": "1",
                      "damWeight": "85",
                      "gender": "Female",
                      "tagNo": "SW-790",
                      "birthWeight": "25",
                      "remarks": "BIrth takes place",
                      "bullSemenNo": "Balram"
                    },
                    {
                      "sno": 3,
                      "id": 2786,
                      "cow_service_id": 23113,
                      "dateOfService": "20/02/2020",
                      "bullID": 1532,
                      "cowNo": "SW-719",
                      "deliveryDate": "20/03/2020",
                      "lactationNo": 3,
                      "deliveryStatus": "1",
                      "damWeight": "85",
                      "gender": "Male",
                      "tagNo": "SW-895",
                      "birthWeight": "25",
                      "remarks": "New Calf Born",
                      "bullSemenNo": "Balram"
                    },
                    {
                      "sno": 4,
                      "id": 2787,
                      "cow_service_id": 23115,
                      "dateOfService": "16/09/2022",
                      "bullID": 2679,
                      "cowNo": "SW-719",
                      "deliveryDate": "16/06/2023",
                      "lactationNo": 4,
                      "deliveryStatus": "1",
                      "damWeight": "350",
                      "gender": "Female",
                      "tagNo": "SW-350",
                      "birthWeight": "26",
                      "remarks": "Successfulll new female calf born",
                      "bullSemenNo": "J-4658"
                    },
                    {
                      "sno": 5,
                      "id": 2788,
                      "cow_service_id": 23116,
                      "dateOfService": "23/07/2023",
                      "bullID": 1777,
                      "cowNo": "SW-719",
                      "deliveryDate": "21/04/2024",
                      "lactationNo": 5,
                      "deliveryStatus": "1",
                      "damWeight": "400",
                      "gender": "Male",
                      "tagNo": "SW-351",
                      "birthWeight": "28",
                      "remarks": "Successfal new calf gunnu",
                      "bullSemenNo": "S-094"
                    },
                    {
                      "sno": 6,
                      "id": 2789,
                      "cow_service_id": 23114,
                      "dateOfService": "23/08/2024",
                      "bullID": 2658,
                      "cowNo": "SW-719",
                      "deliveryDate": "23/05/2025",
                      "lactationNo": 6,
                      "deliveryStatus": "1",
                      "damWeight": "300",
                      "gender": "Male",
                      "tagNo": "SW-500",
                      "birthWeight": "25",
                      "remarks": "Successfull Calf moti",
                      "bullSemenNo": "ANAND"
                    },
                    {
                      "sno": 7,
                      "id": 2790,
                      "cow_service_id": 23118,
                      "dateOfService": "23/08/2025",
                      "bullID": 2661,
                      "cowNo": "SW-719",
                      "deliveryDate": "23/05/2026",
                      "lactationNo": 7,
                      "deliveryStatus": "1",
                      "damWeight": "250",
                      "gender": "Female",
                      "tagNo": "SW-600",
                      "birthWeight": "20",
                      "remarks": "New heifer nirmala abnormal birth",
                      "bullSemenNo": "Bansidhar"
                    }*/
                  ],
                status:true,
                recordsFiltered:0,
                recordsTotal:0,
                pageNo:1,
                recordsPerPage:10
            },
            interCalvPeriod:{}
        }
        this.calv= {saveCalvData:()=>{console.log("Saving Calv data")}}
        this.serviceDetail = {showAddCowServiceModal:()=>{console.log("Showing Service detail")}};
        this.milkingObj = {showCowMilkStartStopDetailModal:()=>{console.log("Cow milking start stop detail")}};
        this.cowComparison = {GetCowComaprisonData:()=>{console.log("Cow comparison data")}};
        this.medication = {
            getSetDoctor:()=>{console.log("get set doctors")},
            addMedication:()=>{console.log("Adding medication")},
            clearMedicationDataForm:()=>{console.log("Clearing medication data")} 
        };
    }
    componentDidMount() {
        console.log('mount')
        this.props.app.hideLoading();
    }
    
    isCowValid(){
        return true;
    }
    async getDataByCowId(id) {
        this.props.app.showLoading("Loading Cow Data");
		$('#search-result-list').css('display','none');
        let data = await fetch("https://localhost:5001/api/Cows/GetCowById/"+id)
          .then(res => res.json())
          .then(
            (result) => {
                console.log('result retrieved')
                return result
            },
            (error) => {
                console.log("error");
                console.log(error);
                return error
            }
          )
          console.log(data);
		  console.log(this);
          await this.setState(prevState=>{
            let cow = Object.assign({}, prevState.cow);
            cow = data;
            return {cow}
          });
          console.log(this.state.cow);
          console.log('hiding get');
          
          this.props.app.hideLoading();
		  
    }
    loadCowWholeData = async (id)=>{
        this.getDataByCowId(id);
       console.log('hi');
         this.getCalvingDetailByCowId(id);
        console.log('bi');
        
    }
     getCalvingDetailByCowId = async (id)=>{
        console.log('getting calv data');
        //this.props.app.showLoading("Loading Cow Data");
		const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            //body: JSON.stringify({ tagNo: tag_no,pageNo:1 })
        };
        console.log(this.state);
        if((this.state.cow && this.state.cow.id !==null && this.state.cow.id !== undefined) ||(id!=null)){
            let data = await fetch(`https://localhost:5001/api/Cows/GetCalvingDetailByCowId?id=${id}`,requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    //console.log('result retrieved')
                    return result
                },
                (error) => {
                    console.log("error");
                    console.log(error);
                    return error
                }
            )
            console.log(data);
            await this.setState(prevState => {
                if(data.status==="success"){
                    let calvingDetail = Object.assign({}, prevState.calvingDetail);  // creating copy of state variable jasper
                    calvingDetail.data = data.data;                     // update the name property, assign a new value                 
                    calvingDetail.recordsTotal = data.recordsTotal;                     // update the name property, assign a new value                 
                    calvingDetail.recordsFiltered = data.recordsFiltered;                    // update the name property, assign a new value                 
                    return {calvingDetail};                                 // return new object jasper object
                }
            },()=>{ console.log('data fetched')});
        }else{
            console.log('id not found');
        }
    }
    saveCowData(){
		$('label.error-label').remove();
		if(this.isCowValid()===true){
		//if(true){
			var formData = new FormData();
			formData.append('formFile',$('#cow_edit_cow_image')[0].files[0]);
			var contentType = false;
			var processData = false;
			var data_ = {
				id:this.state.cow.id,
				tagNo : this.state.cow.tagNo,
				name :  this.state.cow.name,
				category : this.state.cow.category,
				dob : this.app.convertDateTo(this.state.cow.dob),
				breed : this.state.cow.breed,
				lactation : this.state.cow.lactation,
					//$('#cow_edit_cow_dam_tag_no').html('');
				damID :	this.state.cow.damID,
					//$('#cow_edit_cow_dam_name').html();
					//$('#cow_edit_cow_sire_tag_no').html('');
					//$('#cow_edit_cow_sire_name').html('');
				sireID : this.state.cow.sireID,
				colour : this.state.cow.colour,
				weight : this.state.cow.weight,
				height : this.state.cow.height,
				//$('#cow_edit_cow_dam_bly').html('');
				//	$('#cow_edit_cow_sire_dam_bly').html('');
				butterFat : this.state.cow.butterFat,
				noOfTeatsWorking : this.state.cow.noOfTeatsWorking,
				location : this.state.cow.location,
				remarks : this.state.cow.remarks
			};
			$.each(data_,function(k,val){
				formData.append(k,val);
			});
			console.log(formData);
			var cow_ = this;
			console.log(data_);
			//this.app.showLoading('Updating Cow');
			$.ajax({
				url: this.app.apiUrl +'Cows/SaveCow/',
				async: true,
				crossDomain: true,
				type: 'POST',
				data: formData,
				enctype: "multipart/form-data", //change to your own, else read my note above on enabling the JsonValueProviderFactory in MVC
				contentType: contentType,
				processData: processData,
				success: function (response, status) {
					var data = response;
					console.log("SUccessful");
					console.log(response);
					if(status==='success'){
						if(response.hasOwnProperty('data') && response.data.status==="Success"){
							cow_.app.hideLoading();
							cow_.app.showSuccessMessage("Cow Updated Successfully!");
							cow_.disableEditForm();
							cow_.showEditCowButton();
							cow_.hideSaveCowButton();
						}else{
							cow_.app.hideLoading();
							cow_.app.showErrorMessage(`${data.data.message}`);//apppend message over here
							// console.log(data);
							$.each(data.errors,function(k,val){
								console.log(k+ val);
								console.log($('#cow_edit_cow_'+cow_.fields[k]).val());
								//$('#cow_new_cow_'+cow_.fields[k]).append(`<label id="cow_new_cow_tag_no-error" class="error-label" for="cow_new_cow_tag_no">Please enter Cow Tag Name</label>`);
								$(`<label id="cow_edit_cow_${cow_.fields[k]}-error" class="error-label" for="cow_edit_cow_${cow_.fields[k]}">${val}</label>`).insertAfter('#cow_edit_cow_'+cow_.fields[k]);
							});
						}
					}else{
						cow_.app.hideLoading();
						cow_.app.showErrorMessage("Cow Updation Failed!");//apppend message over here
						// console.log(data);
					}
				},
				error:function(XMLHttpRequest, textStatus, errorThrown) { 
					console.log(textStatus);
					console.log(errorThrown);
					//console.log(textStatus);
					cow_.app.hideLoading();
					cow_.app.showErrorMessage("Failed To Save Data","Error Message","Not Connected !");
					cow_.disableEditForm();
					cow_.showEditCowButton();
					cow_.hideSaveCowButton();
				}      
			});
			//submit the form
		}else{
			//do nothing
		}
	}
    updateState=(e)=>{
        //this.setState(prevState=>({name:"RamanDeep"}));
    }
    convertToEditForm=()=>{
        console.log('converting..');
		var ids = ['cow_id','cow_tag_no','cow_name','cow_dob','cow_breed','cow_lactation','cow_color','cow_weight','cow_height','cow_butter_fat','cow_teats_working','cow_location','cow_pregnancy_status','cow_remarks'];
		var ids2 = ['cow_select_dam','cow_select_sire']
		$.each(ids,function(id,val){
			$('#cow_edit_'+val).addClass('cpinput').removeAttr('disabled').removeClass('cpinput-disabled');
		});
		$.each(ids2,function(id,val){
			$('#cow_edit_'+val).removeClass('disabled');
			$('#cow_edit_'+val).attr('disabled','disabled');
		});
		//$('.cpinput-disabled').addClass('cpinput');
		//$('.cpinput-disabled').removeAttr('disabled');
		//$('.cpinput-disabled').removeClass('cpinput-disabled');
		this.hideEditCowButton();
		this.showSaveCowButton();
	}
    showEditCowButton(){
		$('.editCowBtn').css('display','');
	}
    hideEditCowButton(){
		$('.editCowBtn').css('display','none');
	}
    showSaveCowButton(){
		$('.saveCowBtn').css('display','block');
	}
	hideSaveCowButton(){
		$('.saveCowBtn').css('display','none');
	}
  render() {
    //this.app.showLoading('Loading Data');
    let milkingChartStyle = {
        minWidth:'max-content',marginTop:'25px'
    }
    let padding_right_20= {paddingRight:'20px'}
    let float_right = {float:'right'}
    let medication_button = {width:'100%',height:'50px'}
    
    return (
      <>
      <Loader/>
      <SvgIcons/>
      <Header/>
      <section className="row" style={{height:'calc(100vh - 54px)',margin:'0px'}}>
      <Sidebar/>
      <div className="main-content multicollapse collapse-horizontal2 cow-profile"  id="main-content" style={{zIndex:101}}>
        <div className="row page-title">
          <div>
            <h1>Cow Profile </h1>
          </div>
		  <Search cowObject={this}/>
          
        </div>
        <form id="cow_edit_cow_form">
          <div className="row">
            <div className="col-md-6">
                <div className="title">General Information</div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th colSpan="2">
                          <div>Cow General Information</div>
                          <span className="fa fa-edit editCowBtn" onClick={this.convertToEditForm}><br/><span>Edit</span></span>
                          <span className="fa fa-save saveCowBtn"><br/><span>Save</span></span>
                          <span onClick={this.updateState} className="fa fa-plus-circle newCowBtn" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{float:'right'}}><br/><span>New</span></span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>Cow No/Tag</td><td><input type="hidden" id="cow_edit_cow_id" value={this.state.cow.id} onChange={()=>{}}/><input type="text" value={this.state.cow.tagNo} className="cpinput-disabled" id="cow_edit_cow_tag_no" name="cow_edit_cow_tag_no"  onChange={this.tagNoOnChange}/></td></tr>
                      <tr><td>Cow Name</td><td><input type="text" className="cpinput-disabled"  disabled id="cow_edit_cow_name" name="cow_edit_cow_name" value={this.state.cow.name} onChange={this.nameOnChange}/></td></tr>
                      <tr><td>Date of Birth</td><td><input type="text" className="cpinput-disabled datepicker"  id="cow_edit_cow_dob" name="cow_edit_cow_dob" onChange={this.dobOnChange} value={this.state.cow.dob}/></td></tr>
                      <tr>
                        <td>Breed</td>
                        <td>
                          <select className="kgsdropdown cpinput-disabled" id="cow_edit_cow_breed" name="cow_edit_cow_breed" disabled onChange={this.cowBreedOnChange} defaultValue={""} value={this.state.cow.breed}>
                            <option value="">Select One</option>
                            <option value="1">Sahiwal</option>
                            <option value="2">Gir</option>
                            <option value="3">Thar Parkar</option>
                            <option value="4">Kapila</option>
                            <option value="5">Kankrej</option>
                          </select>
                        </td>
                      </tr>
                      <tr><td>Lactation</td><td><input type="text" className="cpinput-disabled" disabled id="cow_edit_cow_lactation" name="cow_edit_cow_lactation" onChange={this.cowLactationOnChange} value={this.state.cow.lactation}/></td></tr>
                      <tr><td>Best Lactation Yield</td><td>3000 Litre</td></tr>
                      <tr><td>Dam No/Tag</td><td><span id="cow_edit_cow_dam_tag_no">{this.state.cow.damNo}</span><span className="fa fa-edit disabled" id="cow_edit_cow_select_dam" title="Select Dam"></span><input type="hidden" id="cow_edit_cow_dam_id" name="cow_edit_cow_dam_id" onChange={this.cowDamIDOnChange} value={this.state.cow.damID}/></td></tr>
                      <tr><td>Dam Name</td><td><span id="cow_edit_cow_dam_name">{this.state.cow.damName}</span></td></tr>
                      <tr><td>Dam's Bly</td><td><span id="cow_edit_cow_dam_bly">{this.state.cow.damBLY}</span></td></tr>
                      <tr><td>Sire No/Tag</td><td><span id="cow_edit_cow_sire_tag_no">{this.state.cow.sireNo}</span><span className="fa fa-edit disabled" id="cow_edit_cow_select_sire" title="Select Sire"></span><input type="hidden" id="cow_edit_cow_sire_id" name="cow_edit_cow_sire_id" value={this.state.cow.sireID} onChange={this.cowSireIDOnChange}/></td></tr>
                      <tr><td>Sire Name</td><td><span id="cow_edit_cow_sire_name">{this.state.cow.sireName}</span></td></tr>
                      <tr><td>Sire's DBLY</td><td><span id="cow_edit_cow_sire_dam_bly">{this.state.cow.sireDBLY}</span></td></tr>
                      <tr><td>Color</td><td><select className="kgsdropdown cpinput-disabled" id="cow_edit_cow_color" name="cow_edit_cow_color" disabled onChange={this.cowColourOnChange} defaultValue={""} value={this.state.cow.colour}>
                          <option value="">Choose One</option>
                          <option value="1">Brown</option>
                          <option value="2">White</option>
                          <option value="3">Black</option>
                          <option value="4">Black+White</option>
                          <option value="5">REDDISH BROWN</option>  
                          <option value="6">RED</option>
                        </select>
                        </td>
                      </tr>
                      <tr><td>Pregnancy Status</td><td><select className="kgsdropdown cpinput-disabled" id="cow_edit_cow_pregnancy_status" name="cow_edit_cow_pregnancy_status" disabled onChange={this.cowPregnancyStatusOnChange} value={this.state.cow.pregnancyStatus}>
                            <option value="">Choose One</option>
                        <option value={true}>Pregnant</option>
                        <option value={false}>Not Pregnant</option>
                      </select>
                      </td></tr>
                      <tr><td>Weight</td><td><input type="text" className="cpinput-disabled" value={this.state.cow.weight} onChange={this.cowWeightOnChange} disabled id="cow_edit_cow_weight" name="cow_edit_cow_weight"/></td></tr>
                      <tr><td>Height</td><td><input type="text" className="cpinput-disabled" disabled id="cow_edit_cow_height" name="cow_edit_cow_height" value={this.state.cow.height}  onChange={this.cowHeightOnChange}/></td></tr>
                      <tr><td>Teats Working</td>
                        <td>
                          <select className="kgsdropdown cpinput-disabled" id="cow_edit_cow_teats_working" name="cow_edit_cow_teats_working" disabled onChange={this.cowNoOfTeatsWorkingOnChange} value={this.state.cow.noOfTeatsWorking}>
                            <option value="">Choose One</option>
                            <option value="0">0 Teats Working</option>
                            <option value="1">1 Teats Working</option>
                            <option value="2">2 Teats Working</option>
                            <option value="3">3 Teats Working</option>
                            <option value="4">4 Teats Working</option>
                          </select>
                        </td>
                      </tr>
                      <tr><td>Fat</td><td><input type="text" className="cpinput-disabled" value={this.state.cow.butterFat} disabled id="cow_edit_cow_butter_fat" name="cow_edit_cow_butter_fat"  onChange={this.cowButterFatOnChange}/></td></tr>
                      <tr><td>Cow Sold</td><td><button onClick={this.showSellCowModal} className="btn btn-success btn-sm">Sell Cow</button></td></tr>
                      <tr><td>Cow Location</td>
                        <td>
                          <select className="kgsdropdown cpinput-disabled" id="cow_edit_cow_location" name="cow_edit_cow_location" disabled value={this.state.cow.location} onChange={this.cowLactationOnChange}>
                            <option value="">Choose One</option>
                            <option value="1">Shed A</option>
                            <option value="2">Shed B</option>
                            <option value="3">Shed C</option>
                            <option value="4">Shed D</option>
                            <option value="5">Shed E</option>
                          </select>
                        </td>
                      </tr>
                      <tr><td>Remarks</td><td><textarea className="cpinput-disabled" disabled id="cow_edit_cow_remarks" name="cow_edit_cow_remarks" style={{width:'100%'}} value={this.state.cow.remarks} onChange={this.cowRemarksOnChange}></textarea></td></tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="2">
                          <div className="onoff-switch">
                            Turn Milking
                            <input type="checkbox" id="cowStatus" value={this.state.cow.milkingStatus}/>
                            <span className="left-on">ON</span><span className="right-off">OFF</span>
                          </div>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                
            </div>
            <div className="col-md-6">
              <div>
                <div className="title title2" id="cow-title">{this.state.cow.tagNo}</div>
                <img src={this.state.imageUrl+this.state.cow.picture} className="profile-pic" id="profile-pic" alt="cow profile"/><br/><br/>
                <input className="file-input" type="file" placeholder="" id="cow_edit_cow_image" name="cow_edit_cow_image" accept="image/png, image/jpeg" onChange={this.cowImageOnChange}/>
              </div>
            </div>
          </div>
        </form>
        <div className="row">
          <div className="col-md-12">
            <div className="title">Calving Detail</div>
              <table className="calv-detail-table table-bordered" id="calving-detail-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date of Service </th>
                    <th>Cow</th>
                    <th>Bull/Semen</th>
                    <th>Dt. Calved</th>
                    <th>L. NO.</th>
                    <th>Birth Status</th>
                    <th>Dam's Wt</th>
                    <th>Sex</th>
                    <th>Calf Number</th>
                    <th>Birth Wt.</th>
                    <th>Remarks</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {this.state.calvingDetail.recordsFiltered===0?<tr><td>No childs to display</td></tr>: 
                    this.state.calvingDetail.data.map((row)=>{
                        return (
                            <tr key={row.sno}>
                                <td>{row.sno}</td>
                                <td>{row.dateOfService}</td>
                                <td>{row.cowNo}</td>
                                <td>{row.bullSemenNo}</td>
                                <td>{row.deliveryDate}</td>
                                <td>{row.lactationNo}</td>
                                <td>{row.deliveryStatus}</td>
                                <td>{row.damWeight}</td>
                                <td>{row.gender}</td>
                                <td>{row.tagNo}</td>
                                <td>{row.birthWeight}</td>
                                <td>{row.remarks}</td>
                                <td><span className="fa fa-edit" onClick={()=>{console.log("serviceDetail.getSetEditServiceDeatil({row.id})")}}></span></td>
                            </tr>
                        )
                    })
                }
                </tbody>
              </table>
              <TablePaginate state={this.state.calvingDetail.pageNo} pageNo={this.state.calvingDetail.pageNo} 
              recordsPerPage={this.state.calvingDetail.recordsPerPage} 
              recordsTotal={this.state.calvingDetail.recordsTotal} 
              recordsFiltered={this.state.calvingDetail.recordsFiltered}
              totalPages={Math.ceil(this.state.calvingDetail.recordsTotal/this.state.calvingDetail.recordsPerPage)}/>
              <div className="row">
              {/*recordsFiltered:8,
                recordsTotal:20,
                pageNo:1,
            recordsPerPage:10*/}
                <div className="col-md-6">Showing {((this.state.calvingDetail.pageNo-1)*this.state.calvingDetail.recordsPerPage)+1} to {((this.state.calvingDetail.pageNo-1)*this.state.calvingDetail.recordsPerPage)+this.state.calvingDetail.recordsFiltered} of {this.state.calvingDetail.recordsTotal} entries</div>
                <div className="col-md-6">
                    <span className="paginate_button previous">Previous</span>
                    <span className="paginate_button current">1</span>
                    <span className="paginate_button">2</span>
                    <span className="paginate_button">3</span>
                    <span className="paginate_button next">Next</span>
                </div>
              </div>
          </div>
		</div>
        <div className="row">
<div className="col-md-12">

    <div className="title">Service Detail</div>
        <table className="calv-detail-table table-bordered" style={{display:'none'}}>
            <thead>
                
                <tr>
                    <th>#</th>
                    <th>Cow No/Tag<i className="fa fa-sort-amount-down disabled"></i></th>
                    <th>Service</th>
                    <th>Status</th>
                    <th>Datetime of Service</th>
                    <th>Doctor</th>
                    <th>Semen</th>
                    <th>Remarks</th>
</tr>
            </thead>
            <tbody>
                <tr>
                    <td>1<input type="hidden" id="cd-id" onChange={()=>{}}/></td>
                    <td><input type="text" className="cpinput" defaultValue={"SW-101"} id="csd-cow-tagno" onChange={()=>{}}/></td>
                    <td><input type="text" className="cpinput" defaultValue={"bL-901"} id="csd-service" onChange={()=>{}}/></td>
                    
                    <td style={{width:'100px'}}>	
                        <select className="kgsdropdown cpinput-disabled" id="csd-status">
                            <option>Confirmed</option>
                            <option>Pending</option>
                            <option>Failed</option>
                            <option>Successful</option>
                        </select>
                    </td>
                    <td><input type="text" className="cpinput" value="10/01/2022" id="csd-datetimeofservice"  onChange={()=>{}}/></td>
                    
                    <td><input type="text" className="cpinput" value={"45 kg"} id="csd-doctor"  onChange={()=>{}}/></td>
                    <td><input type="text" className="cpinput" value={"--"} id="csd-semen"  onChange={()=>{}}/></td>
                    <td><input type="text" className="cpinput" value={"Nice calv."} id="cd-remarks"  onChange={()=>{}}/></td>
                </tr>
            </tbody>
        </table>
        <div style={{padding:'10px'}}>
            <input className="kgsbtn btn kgsbtn-success" value="Add New Service" onClick={this.serviceDetail.showAddCowServiceModal}  onChange={()=>{}}/>
            <input className="kgsbtn btn kgsbtn-clear" value="Clear"  onChange={()=>{}}/>
            <input className="kgsbtn btn kgsbtn-delete" value="Delete"  onChange={()=>{}}/>
        </div>
        
    <table className="calv-detail-table" id="service-detail-table">
        <thead>
            <tr>
                <th>S. No.</th>
                <th>Cow No/Tag</th>
                <th>Service</th>
                <th>Status</th>
                <th>Date TIme of Service</th>
                <th>Mating Type</th>
                <th>Doctor</th>
                <th>Remarks</th>
                <th>Action</th>
</tr>
        </thead>
        <tbody>
            <tr><td>1</td><td>sw-1</td><td>1001</td><td>1001</td><td>1001</td><td>1001</td><td>1</td><td>1</td></tr>
            <tr><td>2</td><td>sw-1801</td><td>1001</td><td>1001</td><td>1001</td><td>1001</td><td>1</td><td>1</td></tr>
            <tr><td>3</td><td>sw-8901</td><td>1001</td><td>1001</td><td>1001</td><td>1001</td><td>1</td><td>1</td></tr>
            <tr><td>4</td><td>sw-8701</td><td>1001</td><td>1001</td><td>1001</td><td>1001</td><td>1</td><td>1</td></tr>
            
        </tbody>
        
    </table>
</div>
</div>
<div className="row">
<div className="col-md-12">

    <div className="title">Milking Chart</div>
    <div className="row" style={{marginLeft:'0px'}}>
        <div className="col-md-6">
            <div className="div-borderd">
                <table className="milking-chart" id="milking-chart-table">
                    <thead>
                        <tr>
                            <th>Cow</th>
                            <th>Lactation Number</th>
                            <th>Total Yield</th>
                            <th>305 Days Yield</th>
                            <th>Wet Days</th>
                            <th>Peak Yield</th>
                            <th>Average</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Cow No/Tag</td><td>1001</td><td>1001</td><td>1001</td><td>1001</td></tr>
                        <tr><td>Cow No/Tag</td><td>1001</td><td>1001</td><td>1001</td><td>1001</td></tr>
                        <tr><td>Cow No/Tag</td><td>1001</td><td>1001</td><td>1001</td><td>1001</td></tr>
                        <tr><td>Cow No/Tag</td><td>1001</td><td>1001</td><td>1001</td><td>1001</td></tr>
                        
                    </tbody>
                </table>
            </div>
            <div>
                <table className="milking-detail-filter-table">
                    <tbody>
                    <tr>
                        <td>
                            
                                <label className="label">Starting Date</label> <input className="input" type="text"/>
                            
                        </td><td></td>
                    </tr>
                    <tr>
                        <td>
                            
                                <label className="label">Starting Date</label> <input className="input" type="text"/>
                            
                        </td>
                        <td>
                            <button className="btn kg-button2" >Submit</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="col-md-6">
            <button className="btn kg-button2" onClick={this.milkingObj.showCowMilkStartStopDetailModal}>Add Start/Stop Detail</button>
            <table className="calv-detail-table milk-stop-table" id="cow-milking-start-stop-datatable">
                <thead>
                    <tr>
                        <th>S. No.</th>
                        <th>Milk Status</th>
                        <th>Date</th>
                        <th>Lactation No</th>
                        <th>Remarks</th>
                        <th>Action</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
</div>

<div className="row">
<div className="graph col-md-12">
    <div>
        <div>
            <ul className="comp-list" id="comparison-cow-list">
                <li>
                    <span className="circle red"></span> <label className="label2">Comparison A </label> 
                    <select id="milkComparisonSelectCow1">
                        <option>Select One</option>
                        <option>SW 101</option>
                        <option>SW 102</option>
                    </select>
                 </li>
                <li>
                    <span className="circle green"></span> <label className="label2">Comparison B </label> 
                    <select id="milkComparisonSelectCow2">
                        <option>Select One</option>
                        <option>SW 101</option>
                        <option>SW 102</option>
                    </select>
                 </li>
            </ul>
        </div>
        <div >
            <select id="milkComparison_type">
                <option>Lactation</option>
                <option>Time</option>
            </select><br/>
            <span>
                <select id="cow-comparison-lactation-no" multiple>
                    <option>1</option>
                    <option>2</option>
                </select><br/>
            </span>
            <span id="cow-comparison-day-from-to">
                Day from<input className="dayFrom kg-input2" id="cow-comparison-day-from"/><br/>
                Day To<input className="dayFrom kg-input2" id="cow-comparison-day-to"/><br/>
            </span>
            <span id="cow-comparison-day-from-to">
                Date from<input className="dayFrom kg-input2" id="cow-comparison-date-from"/><br/>
                Date To<input className="dayFrom kg-input2" id="cow-comparison-date-to"/><br/>
                Date separator<input className="dayFrom kg-input2" id="cow-comparison-day-separator"/><br/>
            </span>
        </div>
        <div>
            <input type="number" className="kg-input2" id="cow-comparison-no-of-cows"/>
            <br/><br/>
            <input type="submit" className="btn kg-button3" onClick={this.cowComparison.GetCowComaprisonData}/>
        </div>
    </div>
    <canvas id="myChart"aria-label="chart" role="img"></canvas>
</div>
</div>
<div className="row">
<div className="col-md-12">

    <div className="title">Medication Detail</div>
    <div className="row">
        <div className="col-md-6">
            <div className="medication_form">
                <form id="medication-form">
                <div>
                    <div className="input-group mb-3">
                        <input type="hidden" name="mdication_id" id="medication_id"/>
                      <label className="input-group-text kg-label" htmlFor="inputGroupSelect01">Date</label>
                      <input className="form-control kg-input" id="medication_date" name="medication_date"/>
                    </div>
                    <div className="input-group mb-3">
                      <label className="input-group-text kg-label" htmlFor="inputGroupSelect01">Animal No</label>
                      <label className="form-control kg-input bg-white" id="medication_animal_no" name="medication_animal_no"/>
                    </div>
                    <div className="input-group mb-3">
                      <label className="input-group-text kg-label" htmlFor="inputGroupSelect01">Disease</label>
                      <input className="form-control kg-input" id="medication_disease" name="medication_disease"/>
                    </div>
                    <div className="input-group mb-3">
                      <label className="input-group-text kg-label" htmlFor="inputGroupSelect01">Symptoms</label>
                      <input className="form-control kg-input" id="medication_symptoms" name="medication_symptoms"/>
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text kg-label" htmlFor="inputGroupSelect01">Diagnosis</label>
                        <input className="form-control kg-input" id="medication_diagnosis" name="medication_diagnosis"/>
                      </div>
                    <div className="input-group mb-3">
                      <label className="input-group-text kg-label" htmlFor="inputGroupSelect01">Treatment</label>
                      <input className="form-control kg-input"  id="medication_treatment" name="medication_treatment"/>
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text kg-label" htmlFor="inputGroupSelect01">Prognosis</label>
                        <select className="kgsdropdown form-control kg-input"  id="medication_prognosis" name="medication_prognosis">
                            <option>Select Prognosis</option>
                            <option value="1">Poor</option>
                            <option value="2">Good</option>
                            </select>
                      </div>
                    <div className="input-group mb-3">
                      <label className="input-group-text kg-label" htmlFor="inputGroupSelect01">Result</label>
                      <input className="form-control kg-input" id="medication_result" name="medication_result"/>
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text kg-label" htmlFor="inputGroupSelect01">Cost of Treatment</label>
                        <input className="form-control kg-input" type="number"  id="medication_cost_of_treatment" name="medication_cost_of_treatment"/>
                    </div>
                    <div className="input-group mb-3">
                      <label className="input-group-text kg-label" htmlFor="inputGroupSelect01">Doctor</label>
                      <label className="form-control kg-input bg-white" onClick={this.medication.getSetDoctor} id="medication_doctor_name"></label>
                      <input type ="hidden" className="form-control kg-input" id="medication_doctor_id" name="medication_doctor_id"/>
                    </div>
                    <div className="input-group mb-3">
                      <label className="input-group-text kg-label" htmlFor="inputGroupSelect01">Remarks</label>
                      <input className="form-control kg-input" id="medication_remarks" name="medication_remarks"/>
                    </div>
  
                    <div style={medication_button}>
                        <div style={float_right}>
                            
                            <button className="btn btn-secondary kg-button" style={float_right} onClick={this.medication.addMedication}>Save</button>&nbsp;&nbsp;
                            <button className="btn btn-secondary kg-button" style={float_right} onClick={this.medication.clearMedicationDataForm}>Reset</button>&nbsp;&nbsp;
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </div>
    </div>
    <div className="row" style={padding_right_20}>
        <h3>Past Medication Report</h3>
        <div className="col-md-12 div-borderd">
            <table className="milking-chart" id="medication-chart-table">
                <thead>
                    <tr>
                        <th>&nbsp;</th>
                        <th>Date</th>
                        <th>Animal No.</th>
                        <th>Disease</th>
                        <th>Symptoms</th>
                        <th>Treatment</th>
                        <th>Prognosis</th>
                        <th>Result</th>
                        <th>Doctor</th>
                        <th>Remarks</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td></td><td>Cow No/Tag</td><td>1001</td><td>1001</td><td>1001</td><td>1001</td><td></td><td></td><td></td></tr>
                    <tr><td></td><td>Cow No/Tag</td><td>1001</td><td>1001</td><td>1001</td><td>1001</td><td></td><td></td><td></td></tr>
                    <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td>Cow No/Tag</td><td>1001</td><td>1001</td><td>1001</td><td>1001</td><td></td><td></td><td></td></tr>
                    <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td>Cow No/Tag</td><td>1001</td><td>1001</td><td>1001</td><td>1001</td><td></td><td></td><td></td></tr>
                    
                </tbody>
            </table>
            
            
            
        </div>
    </div>
</div>
</div>
<div className="row">
<div className="col-md-12">
    <div className="row"  style={padding_right_20}>
        <div className="title">Summary</div>
        
        <div className="col-md-12 div-borderd">
            <table className="milking-chart">
                <thead>
                    <tr>
                        <th>&nbsp;</th>
                        <th>Total</th>
                        <th>Failed </th>
                        <th>Pending </th>
                        <th>Cow Sold </th>
                        <th>Confirmed </th>
                        <th>Died </th>
                        <th>Successful</th>
                        <th>Female</th>
                        <th>Male</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                        <td id="summary_total">4</td>
                        <td id="summary_failed">1</td>
                        <td id="summary_pending">0</td>
                        <td id="summary_sold">0</td>
                        <td id="summary_confirmed">0</td>
                        <td id="summary_died">0</td>
                        <td id="summary_successful">3</td>
                        <td id="summary_female">1</td>
                        <td id="summary_male">2</td>
                    </tr>
                </tbody>	
            </table>
        </div>
        {

}
        <div className="col-md-3 div-borderd" style={milkingChartStyle}>
            
            <table className="milking-chart" id="inter-calv-period">
                <thead>
                    <tr>
                        <th>Lactation<i className="fa fa-sort-amount-up"></i></th>
                        <th>Intercalving Period<i className="fa fa-sort-amount-up"></i></th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr><td>1-2</td><td>15 month</td></tr>
                    <tr><td>2-3</td><td>18 month</td></tr>
                    <tr><td>3-4</td><td>15 month</td></tr>
                    <tr><td></td><td></td></tr>
                </tbody>	
            </table>
        </div>
        <div className="col-md-9 div-borderd cow-quanlity-div">
            <div className="row">
                <div className="col-md-9">
                    <h2>Cow Quality <svg className="menu-icon"><use xlinkHref="#cow-icon"/></svg></h2>
                    <div><button className="btn kdgs-btn kdgs-btn-good kdgs-btn-bold">Good</button><button className="btn kdgs-btn kdgs-btn-better kdgs-btn-bold">Better</button><button className="btn kdgs-btn kdgs-btn-best kdgs-btn-bold">Best</button><button className="btn kdgs-btn kdgs-btn-average kdgs-btn-bold">Average</button><br/></div>
                    <div><button className="btn kdgs-btn kdgs-btn-primary2">Save</button><span></span><button className="btn kdgs-btn kdgs-btn-userdefined1">Update</button></div>
                </div>
                <div className="col-md-3">
                    <div>
                        BEST
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
<div className="row">
<br/><br/><br/><br/><br/><br/>
</div>
      <Footer/>
      </div>
      </section>
      {/*<CowProfileModals/>*/}
    </>
    )
  }
    idOnChange=(e)=>{
        //this.state.cow.id = e.target.value;
    }
    tagNoOnChange=(e)=>{
        this.setState(prevState => {
            let cow = Object.assign({}, prevState.cow);
            cow.tagNo = e.target.value;
            return {cow}
        });
    }
    nameOnChange=(e)=>{
        this.setState(prevState => {
            let cow = Object.assign({}, prevState.cow);
            cow.name = e.target.value;
            return {cow};
        });
    }
    dobOnChange=(e)=>{
        this.setState(prevState => {
            let cow = Object.assign({}, prevState.cow);
            cow.dob = e.target.value;
            return {cow};
        });
    }
    cowBreedOnChange=(e)=>{
        this.setState(prevState => {
            let cow = Object.assign({}, prevState.cow);
            cow.breed = e.target.value;
            return {cow};
        });
    }
    cowCategoryOnChange=(e)=>{
        this.setState(prevState => {
            let cow = Object.assign({}, prevState.cow);
            cow.category = e.target.value;
            return {cow};
        });
    }
    cowColourOnChange=(e)=>{
        this.setState(prevState => {
            let cow = Object.assign({}, prevState.cow);
            cow.colour = e.target.value;
            return {cow};
        });
    }
    cowSireIDOnChange=(e)=>{
        this.setState(prevState => {
            let cow = Object.assign({}, prevState.cow);
            cow.sireID = e.target.value;
            return {cow};
        });
    }
    cowDamIDOnChange=(e)=>{
        this.setState(prevState => {
            let cow = Object.assign({}, prevState.cow);
            cow.damID = e.target.value;
            return {cow};
        });
    }
    cowButterFatOnChange=(e)=>{
        this.setState(prevState => {
            let cow = Object.assign({}, prevState.cow);
            cow.butterFat = e.target.value;
            return {cow};
        });
    }
    cowPregnancyStatusOnChange=(e)=>{
        this.setState(prevState => {
            let cow = Object.assign({}, prevState.cow);
            cow.pregnancyStatus = e.target.value;
            return {cow};
        });
    }
    cowWeightOnChange=(e)=>{
        this.setState(prevState => {
            let cow = Object.assign({}, prevState.cow);
            cow.weight = e.target.value;
            return {cow};
        });
    }
    cowHeightOnChange=(e)=>{
        this.setState(prevState => {
            let cow = Object.assign({}, prevState.cow);
            cow.height = e.target.value;
            return {cow};
        });
    }
    cowNoOfTeatsWorkingOnChange=(e)=>{
        this.setState(prevState => {
            let cow = Object.assign({}, prevState.cow);
            cow.noOfTeatsWorking = e.target.value;
            return {cow};  
        });
    }
    cowLocationOnChange=(e)=>{
        this.setState(prevState => {
            let cow = Object.assign({}, prevState.cow);
            cow.location = e.target.value;
            return {cow};
        });
    }
    cowRemarksOnChange=(e)=>{
        this.setState(prevState => {
            let cow = Object.assign({}, prevState.cow);
            cow.remarks = e.target.value;
            return {cow};
        });
    }
    cowMilkingStatusOnChange=(e)=>{
        this.setState(prevState => {
            let cow = Object.assign({}, prevState.cow);
            cow.milkingStatus = e.target.value;
            return {cow};
        });
    }
    cowLactationOnChange=(e)=>{
        this.setState(prevState => {
            let cow = Object.assign({}, prevState.cow);  // creating copy of state variable jasper
            cow.lactation = e.target.value;                     // update the name property, assign a new value                 
            return {cow};                                 // return new object jasper object
        });
    }
    cowImageOnChange=(e)=>{
        console.log('Image on Change');
    }
}
