import React, { Component } from 'react'
import DateTimePicker from 'react-datetime-picker';
import $ from 'jquery';
import TemplateContext from '../../../context/TemplateContext';
import { Formik } from "formik";
import * as yup from 'yup';
import CowContext from '../../../context/CowContext';
import { convertDate2,apiUrl, imageUrl } from '../../../context/AppContext';
export const FILE_SIZE = 102400; //100KB
export const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg','images/jpg','image/JPEG','images/JPG', 'image/png'];

export default class CowProfileEditForm extends Component {
  static contextType = CowContext;
  constructor(props) {
    super(props);
    this.formikReference = React.createRef();
    this.state = {
      milkingStatus:false,
      cow: {
        id: 1,
        tagNo: "",
        name: "",
        dob: "",
        category: "",
        gender: "",
        breed: "",
        colour: '',
        colour_: "",
        sireID: '',
        damID: '',
        sireNo: "",
        sireName: "",
        damNo: "",
        damName: "",
        dbly: "",
        sdbly: "",
        butterFat: '',
        pregnancyStatus: '',
        status: '',
        reproductiveStatus: false,
        milkingStatus: false,
        remarks: "",
        additionalInfo: "",
        picture: "cow_default.jpg",
        lactation: 0,
        type: "",
        weight: '',
        height: '',
        semenDoses: '',
        noOfTeatsWorking: '',
        location: '',
        cowDataSet: false
      },
      imageUrl: imageUrl,
      calvingDetail: {
        data: [

        ],
        status: true,
        recordsFiltered: 0,
        recordsTotal: 0,
        pageNo: 1,
        recordsPerPage: 10
      },
      interCalvPeriod: {}
    }
    this.cowEditSchema = yup.object().shape({
      id: yup.number().required("Please Enter Username"),
      tagNo: yup.string().required("Please Enter TagNo"),
      name: yup.string().required("Please Enter name"),
      dob: yup.date().typeError('Invalid Date of Birth Entered').required("Please Enter Date of Birth"),
      category: yup.string().required("Please Select Category"),
      gender: yup.string().required("Please Select gender"),
      breed: yup.string().required("Please Select Breed"),
      colour: yup.string().required("Please Select Colour"),
      //colour_: "",
      sireID: yup.number().typeError("Invalid Sire Selection").required("Please Select Sire"),
      damID: yup.number().typeError("Invalid Dam Selection").required("Please Select Dam"),
      //sireNo: "",
      //sireName: "",
      //damNo: "",
      //damName: "",
      //dbly: "",
      //sdbly: "",
      butterFat: yup.number().typeError("Invalid Butter Fat").required("Please Enter Butter Fat"),
      pregnancyStatus: yup.boolean().required("Please Select Pregnancy Status"),
      //status: yup.number().required("Please Select Sire"),
      //reproductiveStatus: false,
      //milkingStatus: yup.boolean().required("Please Select Milking Status"),
      remarks: yup.string(),
      //additionalInfo: "",
      picture:yup.mixed().nullable().test("fileSize", "File Size is too large", (value) => {console.log(value); if(value && value.size) {  return  value.size<=FILE_SIZE;}else { console.log("not found"); return true;}}).test('fileType', "Unsupported File Format", (value) =>{ console.log(value); if(value && value.type) {return SUPPORTED_FORMATS.includes(value.type)}else{return true;}} ),
      lactation: yup.number().required("Please Enter Lactation Number"),
      //type: "",
      weight: yup.number().typeError("Invalid Weight").required("Please Enter Weight"),
      height: yup.number().typeError("Invalid Height").required("Please Enter height"),
      //semenDoses: '',
      noOfTeatsWorking: yup.number().required("Please Select Number of Teats Working"),
      location: yup.number().required("Please Select Location"),
      //cowDataSet:false,

    });
    this.editCow = {
      id: 1,
      tagNo: "",
      name: "",
      dob: "",
      category: "",
      gender: "",
      breed: "",
      colour: '',
      colour_: "",
      sireID: '',
      damID: '',
      sireNo: "",
      sireName: "",
      damNo: "",
      damName: "",
      dbly: "",
      sdbly: "",
      butterFat: '',
      pregnancyStatus: '',
      status: '',
      reproductiveStatus: false,
      milkingStatus: false,
      remarks: "",
      additionalInfo: "",
      picture: "",
      lactation: 0,
      type: "",
      weight: '',
      height: '',
      semenDoses: '',
      noOfTeatsWorking: '',
      location: '',
      cowDataSet: false,
      sold:false
    };
    this.apiUrl = '';
    this.formikProps = {
      initialValues: this.editCow,
      enableReinitialize: true,
      validateOnBlur: true,
      validateOnchange: true,
      validationSchema: this.cowEditSchema,
      onSubmit: async (formValues, { setSubmitting,setFieldError }) => {
        //console.log(this.templateManager);
        //console.log("Saving Cow Data");
        $('label.error-label').remove();
        if (this.isCowValid() === true) {
          var formData = new FormData();
          formData.append('formFile', $('#cow_edit_cow_image')[0].files[0]);
          //console.log(this.context);
          var data_ = {
            id: formValues.id,
            tagNo: formValues.tagNo,
            name: formValues.name,
            category: formValues.category,
            dob: convertDate2(formValues.dob),
            breed: formValues.breed,
            lactation: formValues.lactation,
            //$('#cow_edit_cow_dam_tag_no').html('');
            damID: formValues.damID,
            //$('#cow_edit_cow_dam_name').html();
            //$('#cow_edit_cow_sire_tag_no').html('');
            //$('#cow_edit_cow_sire_name').html('');
            sireID: formValues.sireID,
            colour: formValues.colour,
            weight: formValues.weight,
            height: formValues.height,
            //$('#cow_edit_cow_dam_bly').html('');
            //	$('#cow_edit_cow_sire_dam_bly').html('');
            butterFat: formValues.butterFat,
            noOfTeatsWorking: formValues.noOfTeatsWorking,
            location: formValues.location,
            remarks: formValues.remarks,
            pregnancyStatus:formValues.pregnancyStatus,
            milkingStatus:formValues.milkingStatus
          };
          $.each(data_, function (k, val) {
            formData.append(k, val);
          });
          this.templateManager.showLoading('Updating Cow');
          const requestOptions = {
            method: 'POST',
            /*headers: {
              'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
            },*/
            body: formData
          };
          let data = await fetch(`${apiUrl}Cows/SaveCow/`, requestOptions)
            .then(res => res.json())
            .then(
              (result) => {
                return result
              },
              (error) => {
                return error
              }
            )
          this.templateManager.hideLoading();
              
          if (data.data.status === "Success") {
            this.templateManager.showSuccessMessage(data.data.message);
            this.disableEditForm();
          } else {
            //console.log(data.errors);
            setFieldError('tagNo',data.errors.tagNo);
            this.templateManager.showErrorMessage(data.data.message);
          }
        } else {
          this.templateManager.showErrorMessage("Invalid Cow Data");
        }
      },
    };
    this.templateManager = props.templateManager;
    //console.log(this.templateManager);
  }
  async getDataByCowId(id) {
    //this.templateManager.showLoading("Loading Cow Data");
    $('#search-result-list').css('display', 'none');
    let data = await fetch(`${apiUrl}Cows/GetCowById/` + id)
      .then(res => res.json())
      .then(
        (result) => {
          //console.log('result retrieved')
          return result
        },
        (error) => {
          //console.log("error");
          //console.log(error);
          return error
        }
      )
    if (data.success === true) {
      this.context.cowID = data.data.id;
      this.context.selectedCow.id = data.data.id;
      this.context.selectedCow.name = data.data.name;
      this.context.selectedCow.tagNo = data.data.tagNo;

      this.context.addCowServiceModal.updateSelectedCow();
      this.context.addCowMilkingStartStopDetail.updateSelectedCow();
      this.props.cowProfile.medicationDetail.updateSelectedAnimal();
      
      data = await this.formatCowData(data);
      await this.setState({milkingStatus:data.data.milkingStatus});
      await this.setState(prevState => {
        let cow = Object.assign({}, prevState.cow);
        cow = data.data;
        cow.cowDataSet = true;
        return { cow }
      });
      this.formikProps.initialValues = data.data;
      //this.props.templateManager.showSuccessMessage(data.message);
    } else {
      //show error message
      //console.log('show error message');
      await this.setState(prevState => {
        let cow = Object.assign({}, prevState.cow);
        cow.cowDataSet = false;
        return { cow }
      });
      
      this.props.templateManager.showErrorMessage(data.message);
    }
    this.props.templateManager.hideLoading();

  }
  async formatCowData(data) {
    let cow = data.data;
    for (const [key, value] of Object.entries(data.data)) {
      if(key==='dob'){
        if(value!==null && value!==""){
          cow['dob'] = new Date(Date.parse(value));
        }
      }else 
      if (value === null) {
        cow[`${key}`] = '';
      }
    }
    data.data = cow;
    return data;
  }
  loadCowWholeData = async (id) => {
    this.getDataByCowId(id);
  }
  isCowValid() {
    return true;
  }

  componentDidMount = () => {
    //console.log("COW PROFILE EDIT FORM MOUNT");
    //setTimeout(async ()=>{ await this.getDataByCowId(1);this.convertToEditForm()},100);  
    //console.log(this.templateManager);
    //this.templateManager.showLoading("I am Mounted");
    //setTimeout(()=>{this.templateManager.hideLoading()},2000)
    //console.log(this.formikref);
  }
  error(error, touched) {
    if (error || touched) {
      return (<label className="error-label">{error}</label>)
    } else {
      return <></>;
    }
  }
  selectDam = () => {
    console.log("selection dam modal")
    //this.props.cowProfile.selectDamModal.type = 'editCow';
    //this.props.cowProfile.selectDamModal.cowEdit = this;
    this.props.cowProfile.selectDamModal.currentObject = this;
    this.props.cowProfile.selectDamModal.setState({selectedRecord:this.state.cow.damID})
    this.props.cowProfile.selectDamModal.show();
  }
  selectSire = () => {
    //console.log("selection sire modal 123")
    //this.props.cowProfile.selectSireModal.type = 'editCow';
    //this.props.cowProfile.selectSireModal.cowEdit = this;
    this.props.cowProfile.selectSireModal.currentObject = this;
    this.props.cowProfile.selectSireModal.setState({selectedRecord:this.state.cow.sireID})
    this.props.cowProfile.selectSireModal.show();
    //this.props.cowProfile.selectSire();
    //this.props.cowProfile.selectSireModal.show();
  }
  setDam = async (data) => {
    console.log("setting dam");
    this.formikProps.initialValues.damNo = data.tagNo;
    this.formikProps.initialValues.damName = data.name;
    this.formikProps.initialValues.damID = data.id;
    this.forceUpdate();
  }
  setSire = async (data) => {
    //console.log('settign sire');
    this.formikProps.initialValues.sireNo = data.tagNo;
    this.formikProps.initialValues.sireName = data.name;
    this.formikProps.initialValues.sireID = data.id;
    this.forceUpdate();
  }
  render() {
    //this.formikProps.initialValues = this.state.cow;
    //console.log("COW PROFILE EDIT FORM render");
    //console.log(this.context);
    return (
      <>
        <TemplateContext.Consumer>
          {(values) => { this.templateManager = values.templateManager; }}
        </TemplateContext.Consumer>
        <Formik {...this.formikProps} innerRef={(ref)=>{this.formikref =  ref;}}>
          {({ values, errors, handleSubmit, isSubmitting, touched, handleBlur, handleChange ,setFieldValue}) => (
            <form id="cow_edit_cow_form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="title">General Information</div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th colSpan="2">
                          <div>Cow General Information</div>
                          <span className="fa fa-edit editCowBtn" onClick={this.convertToEditForm}><br /><span>Edit</span></span>
                          <span className="fa fa-save saveCowBtn" onClick={handleSubmit}><br /><span>Save</span></span>
                          <span className="fa fa-plus-circle newCowBtn" style={{ float: 'right' }} onClick={()=>{this.props.cowProfile.showNewCowModal()}}><br /><span>New</span></span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>Cow No/Tag</td><td><input type="hidden" id="cow_edit_cow_id" value={values.id} onChange={handleChange} onBlur={handleBlur} /><input type="text" value={values.tagNo || ""} className="cpinput-disabled" id="cow_edit_cow_tag_no" name="tagNo" onChange={handleChange} onBlur={handleBlur} />{this.error(errors.tagNo, errors.touched)}</td></tr>
                      <tr><td>Cow Name</td><td><input type="text" className="cpinput-disabled" disabled id="cow_edit_cow_name" name="name" value={values.name || ""} onChange={handleChange} onBlur={handleBlur} />{this.error(errors.name, errors.touched)}</td></tr>
                      <tr>
                        <td>Date of Birth</td>
                        <td>
                          <DateTimePicker id="cow_edit_cow_dob" disabled={false} value={values.dob} onChange={(val)=>{setFieldValue('dob',val)}} format={`dd/MM/yyyy`}/><br/>
                          {this.error(errors.dob, errors.touched)}
                        </td>
                      </tr>
                      <tr>
                        <td>Breed</td>
                        <td>
                          <select className="kgsdropdown cpinput-disabled" id="cow_edit_cow_breed" name="breed" disabled onChange={handleChange} onBlur={handleBlur} value={values.breed}>
                            <option value="">Select One</option>
                            {Object.entries(this.context.breeds).map((value,key)=>{
                              return <option key={key} value={value[0]}>{value[1]}</option>
                            })}
                          </select>
                          {this.error(errors.breed, errors.touched)}
                        </td>
                      </tr>
                      <tr><td>Lactation</td><td><input type="text" className="cpinput-disabled" disabled id="cow_edit_cow_lactation" name="lactation" value={values.lactation} onChange={handleChange} onBlur={handleBlur} />{this.error(errors.lactation, errors.touched)}</td></tr>
                      <tr><td>Best Lactation Yield</td><td>3000 Litre</td></tr>
                      <tr><td>Dam No/Tag</td><td><span id="cow_edit_cow_dam_tag_no">{this.state.cow.damNo}</span><span className="fa fa-edit disabled" id="cow_edit_cow_select_dam" title="Select Dam" onClick={(e)=>{if(!e.target.classList.contains('disabled')){this.selectDam()}}}></span><input type="hidden" id="cow_edit_cow_dam_id" name="damID" value={values.damID} onChange={handleChange} onBlur={handleBlur} />{this.error(errors.damID, errors.touched)}</td></tr>
                      <tr><td>Dam Name</td><td><span id="cow_edit_cow_dam_name">{this.state.cow.damName}</span></td></tr>
                      <tr><td>Dam's Bly</td><td><span id="cow_edit_cow_dam_bly">{this.state.cow.damBLY}</span></td></tr>
                      <tr><td>Sire No/Tag</td><td><span id="cow_edit_cow_sire_tag_no">{this.state.cow.sireNo}</span><span className="fa fa-edit disabled" id="cow_edit_cow_select_sire" title="Select Sire" onClick={(e)=>{if(!e.target.classList.contains('disabled')){this.selectSire()}}}></span><input type="hidden" id="cow_edit_cow_sire_id" name="cow_edit_cow_sire_id" value={values.sireID} onChange={handleChange} onBlur={handleBlur} />{this.error(errors.sireID, errors.touched)}</td></tr>
                      <tr><td>Sire Name</td><td><span id="cow_edit_cow_sire_name">{this.state.cow.sireName}</span></td></tr>
                      <tr><td>Sire's DBLY</td><td><span id="cow_edit_cow_sire_dam_bly">{this.state.cow.sireDBLY}</span></td></tr>
                      <tr><td>Color</td><td><select className="kgsdropdown cpinput-disabled" id="cow_edit_cow_color" name="colour" disabled value={values.colour} onChange={handleChange} onBlur={handleBlur}>
                        <option value="">Choose One</option>
                        {Object.entries(this.context.colors).map((value,key)=>{
                              return <option key={key}  value={value[0]}>{value[1]}</option>
                            })}
                      </select>
                        {this.error(errors.colour, errors.touched)}
                      </td>
                      </tr>
                      <tr><td>Pregnancy Status</td><td><select className="kgsdropdown cpinput-disabled" id="cow_edit_cow_pregnancy_status" name="pregnancyStatus" disabled value={values.pregnancyStatus} onChange={handleChange} onBlur={handleBlur}>
                        <option value="">Choose One</option>
                        <option value={true}>Pregnant</option>
                        <option value={false}>Not Pregnant</option>
                      </select>
                        {this.error(errors.pregnancyStatus, errors.touched)}
                      </td></tr>
                      <tr><td>Weight</td><td><input type="text" className="cpinput-disabled" value={values.weight} onChange={handleChange} onBlur={handleBlur} disabled id="cow_edit_cow_weight" name="weight" />{this.error(errors.weight, errors.touched)}</td></tr>
                      <tr><td>Height</td><td><input type="text" className="cpinput-disabled" disabled id="cow_edit_cow_height" name="height" value={values.height} onChange={handleChange} onBlur={handleBlur} />{this.error(errors.height, errors.touched)}</td></tr>
                      <tr><td>Teats Working</td>
                        <td>
                          <select className="kgsdropdown cpinput-disabled" id="cow_edit_cow_teats_working" name="noOfTeatsWorking" disabled value={values.noOfTeatsWorking} onChange={handleChange} onBlur={handleBlur}>
                            <option value="">Choose One</option>
                            <option value="0">0 Teats Working</option>
                            <option value="1">1 Teats Working</option>
                            <option value="2">2 Teats Working</option>
                            <option value="3">3 Teats Working</option>
                            <option value="4">4 Teats Working</option>
                          </select>
                          {this.error(errors.noOfTeatsWorking, errors.touched)}
                        </td>
                      </tr>
                      <tr><td>Fat</td><td><input type="text" className="cpinput-disabled" value={values.butterFat} disabled id="cow_edit_cow_butter_fat" name="butterFat" onChange={handleChange} onBlur={handleBlur} />{this.error(errors.butterFat, errors.touched)}</td></tr>
                      <tr><td>Cow Sold</td><td>{values.sold===false?<button type="button" onClick={this.showSellCowModal} className="btn btn-success btn-sm">Sell Cow</button>:<button type="button" onClick={this.getSellCowDetail} className="btn btn-success btn-sm">Edit Sell Cow</button>} <input type="checkbox" defaultChecked={values.sold} checked={values.sold} id="sold" name="sold"/></td></tr>
                      <tr><td>Cow Location</td>
                        <td>
                          <select className="kgsdropdown cpinput-disabled" id="cow_edit_cow_location" name="location" disabled value={values.location} onChange={handleChange} onBlur={handleBlur}>
                            <option value="">Choose One</option>
                            <option value="1">Shed A</option>
                            <option value="2">Shed B</option>
                            <option value="3">Shed C</option>
                            <option value="4">Shed D</option>
                            <option value="5">Shed E</option>
                          </select>
                          {this.error(errors.location, errors.touched)}
                        </td>
                      </tr>
                      <tr><td>Remarks</td><td><textarea className="cpinput-disabled" disabled id="cow_edit_cow_remarks" name="remarks" style={{ width: '100%' }} value={values.remarks} onChange={handleChange} onBlur={handleBlur}></textarea>{this.error(errors.remarks, errors.touched)}</td></tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="2">
                          <div className="onoff-switch">
                            Turn Milking
                            <input type="checkbox" 
                              onChange={(val)=>{ this.toggleMilking();}}  checked={this.state.milkingStatus} />
                            <span className="left-on">ON</span><span className="right-off">OFF</span>
                          </div>
                        </td>
                      </tr>
                    </tfoot>
                  </table>

                </div>
                <div className="col-md-6">
                  <div>
                    <div className="title title2" id="cow-title">{values.tagNo}</div>
                    <img src={ this.state.imageUrl + this.state.cow.picture} className="profile-pic" id="profile-pic" alt="cow profile" /><br /><br />
                    <input className="file-input" type="file" placeholder="" id="cow_edit_cow_image" name="picture" accept="image/png, image/jpeg" onChange={(e)=>{this.cowImageOnChange(e)}} />
                    {this.error(errors.picture, errors.touched)}
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </>
    )
  }
  cowImageOnChange = (e) => {
    this.formikProps.initialValues.picture = e.target.files[0];
    this.templateManager.readURL(e.target, 'profile-pic');
    this.forceUpdate();
    //console.log('Image on Change');
  }
  /*saveCowData = async () => {
    //console.log(this.templateManager);
    //console.log("Saving Cow Data");
    $('label.error-label').remove();
    if (this.isCowValid() === true) {
      var formData = new FormData();
      formData.append('formFile', $('#cow_edit_cow_image')[0].files[0]);
      var data_ = {
        id: this.state.cow.id,
        tagNo: this.state.cow.tagNo,
        name: this.state.cow.name,
        category: this.state.cow.category,
        dob: this.templateManager.convertDateTo(this.state.cow.dob),
        breed: this.state.cow.breed,
        lactation: this.state.cow.lactation,
        //$('#cow_edit_cow_dam_tag_no').html('');
        damID: this.state.cow.damID,
        //$('#cow_edit_cow_dam_name').html();
        //$('#cow_edit_cow_sire_tag_no').html('');
        //$('#cow_edit_cow_sire_name').html('');
        sireID: this.state.cow.sireID,
        colour: this.state.cow.colour,
        weight: this.state.cow.weight,
        height: this.state.cow.height,
        //$('#cow_edit_cow_dam_bly').html('');
        //	$('#cow_edit_cow_sire_dam_bly').html('');
        butterFat: this.state.cow.butterFat,
        noOfTeatsWorking: this.state.cow.noOfTeatsWorking,
        location: this.state.cow.location,
        remarks: this.state.cow.remarks
      };
      $.each(data_, function (k, val) {
        formData.append(k, val);
      });
      this.templateManager.showLoading('Updating Cow');
      const requestOptions = {
        method: 'POST',
        
        body: formData
      };
      let data = await fetch(`${apiUrl}Cows/SaveCow/`, requestOptions)
        .then(res => res.json())
        .then(
          (result) => {
            return result
          },
          (error) => {
            return error
          }
        )
      this.templateManager.hideLoading();

      if (data.data.status === "Success") {
        this.templateManager.showSuccessMessage(data.data.message);
      } else {
        this.templateManager.showErrorMessage(data.data.message);
      }
    } else {
      this.templateManager.showErrorMessage("Invalid Cow Data");
    }
  }*/
  convertToEditForm=()=>{
		var ids = ['cow_id','cow_tag_no','cow_name','cow_dob','cow_breed','cow_lactation','cow_color','cow_weight','cow_height','cow_butter_fat','cow_teats_working','cow_location','cow_pregnancy_status','cow_remarks'];
		var ids2 = ['cow_select_dam','cow_select_sire']
		$.each(ids,function(id,val){
			$('#cow_edit_'+val).addClass('cpinput').removeAttr('disabled').removeClass('cpinput-disabled');
		});
		$.each(ids2,function(id,val){
			$('#cow_edit_'+val).removeClass('disabled');
			$('#cow_edit_'+val).attr('disabled','disabled');
		});
		this.hideEditCowButton();
		this.showSaveCowButton();
	}
  disableEditForm(){
		var ids = ['cow_id','cow_tag_no','cow_name','cow_dob','cow_breed','cow_lactation','cow_color','cow_weight','cow_height','cow_butter_fat','cow_remarks','cow_location','cow_teats_working','cow_pregnancy_status'];
		var ids2 = ['cow_select_dam','cow_select_sire']
		$.each(ids,function(id,val){
			$('#cow_edit_'+val).addClass('cpinput-disabled').attr('disabled',true).removeClass('cpinput');
		});
    
		$.each(ids2,function(id,val){
			$('#cow_edit_'+val).addClass('disabled');
			$('#cow_edit_'+val).attr('disabled','disabled');
		});
    this.showEditCowButton();
    this.hideSaveCowButton();
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
  showSellCowModal=()=>{
    this.props.cowProfile.sellCowModal.show();
  }
  getSellCowDetail=async ()=>{
    try{
      let status = await this.props.cowProfile.sellCowModal.getSellAnimalDetail();
      if(status===true){
        this.props.cowProfile.sellCowModal.show();
      }
    }catch( ex){
      console.log('Exception',ex)
    }
  }
  setSellCow=(type=true)=>{
    this.formikref.setFieldValue('sold',type);
  }
  toggleMilking=async ()=>{
    //change milking status
    let status = !(this.state.milkingStatus);
    //$('label.error-label').remove();
    if (this.context.selectedCow.id !==null && this.context.selectedCow.id !==undefined && this.context.selectedCow.id !=="") {
      var formData = new FormData();
      //formData.append('formFile', $('#cow_edit_cow_image')[0].files[0]);
      //console.log(this.context);
      var data_ = {
        id: this.context.selectedCow.id,
        milking: status
      };
      $.each(data_, function (k, val) {
        formData.append(k, val);
      });
      this.templateManager.showLoading('Updating Cow');
      const requestOptions = {
        method: 'POST',
        body: formData
      };
      let data = await fetch(`${apiUrl}Cows/SetCowMilking/`, requestOptions)
        .then(res => res.json())
        .then(
          (result) => {
            return result
          },
          (error) => {
            return error
          }
        )
        console.log("DATA",data);
      this.templateManager.hideLoading();
      if (data.status === "success") {
        this.setState({milkingStatus:data.milkingStatus});
        if(data.milkingStatus===true){
          this.templateManager.showSuccessMessage(data.message);
        }else{
          this.templateManager.showErrorMessage(data.message);
        }
        //this.disableEditForm();
      } else {
        //console.log(data.errors);
        //setFieldError('tagNo',data.errors.tagNo);
        this.templateManager.showErrorMessage(data.message);
      }
    } else {
      this.templateManager.showErrorMessage("Invalid Cow Data");
    }
  }
}
