import React, { Component } from 'react'
import DateTimePicker from 'react-datetime-picker';
import $ from 'jquery';
import TemplateContext from '../../../context/TemplateContext';
import { Formik } from "formik";
import * as yup from 'yup';
import HeiferContext from '../../../context/HeiferContext';
import { convertDate2,apiUrl, imageUrl } from '../../../context/AppContext';
export const FILE_SIZE = 102400; //100KB
export const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg','images/jpg','image/JPEG','images/JPG', 'image/png'];

export default class HeiferProfileEditForm extends Component {
  static contextType = HeiferContext;
  constructor(props) {
    super(props);
    this.formikReference = React.createRef();
    this.state = {
      heifer: {
        id: 1,
        tagNo: null,
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
        picture: "heifer_default.jpg",
        lactation: 0,
        type: "",
        weight: '',
        height: '',
        semenDoses: '',
        noOfTeatsWorking: '',
        location: '',
        heiferDataSet: false
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
    this.heiferEditSchema = yup.object().shape({
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
      //heiferDataSet:false,

    });
    this.editHeifer = {
      id: 1,
      tagNo: null,
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
      picture: null,
      lactation: 0,
      type: "",
      weight: '',
      height: '',
      semenDoses: '',
      noOfTeatsWorking: '',
      location: '',
      heiferDataSet: false,
      sold:false
    };
    this.apiUrl = '';
    this.formikProps = {
      initialValues: this.editHeifer,
      enableReinitialize: true,
      validateOnBlur: true,
      validateOnchange: true,
      validationSchema: this.heiferEditSchema,
      onSubmit: async (formValues, { setSubmitting,setFieldError }) => {
        //console.log(this.templateManager);
        //console.log("Saving Heifer Data");
        $('label.error-label').remove();
        if (this.isHeiferValid() === true) {
          var formData = new FormData();
          formData.append('formFile', $('#heifer_edit_heifer_image')[0].files[0]);
          //console.log(this.context);
          var data_ = {
            id: formValues.id,
            tagNo: formValues.tagNo,
            name: formValues.name,
            category: formValues.category,
            dob: convertDate2(formValues.dob),
            breed: formValues.breed,
            lactation: formValues.lactation,
            //$('#heifer_edit_heifer_dam_tag_no').html('');
            damID: formValues.damID,
            //$('#heifer_edit_heifer_dam_name').html();
            //$('#heifer_edit_heifer_sire_tag_no').html('');
            //$('#heifer_edit_heifer_sire_name').html('');
            sireID: formValues.sireID,
            colour: formValues.colour,
            weight: formValues.weight,
            height: formValues.height,
            //$('#heifer_edit_heifer_dam_bly').html('');
            //	$('#heifer_edit_heifer_sire_dam_bly').html('');
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
          this.templateManager.showLoading('Updating Heifer');
          const requestOptions = {
            method: 'POST',
            /*headers: {
              'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
            },*/
            body: formData
          };
          let data = await fetch(`${apiUrl}Heifers/SaveHeifer/`, requestOptions)
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
          this.templateManager.showErrorMessage("Invalid Heifer Data");
        }
      },
    };
    this.templateManager = props.templateManager;
    //console.log(this.templateManager);
  }
  async getDataByHeiferId(id) {
    //this.templateManager.showLoading("Loading Heifer Data");
    $('#search-result-list').css('display', 'none');
    let data = await fetch(`${apiUrl}Heifers/GetHeiferById/` + id)
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
      this.context.heiferID = data.data.id;
      this.context.selectedHeifer.id = data.data.id;
      this.context.selectedHeifer.name = data.data.name;
      this.context.selectedHeifer.tagNo = data.data.tagNo;
      this.context.addHeiferServiceModal.updateSelectedHeifer();
      this.context.addHeiferMilkingStartStopDetail.updateSelectedHeifer();
      this.props.heiferProfile.medicationDetail.updateSelectedHeifer();
      data = await this.formatHeiferData(data);
      await this.setState(prevState => {
        let heifer = Object.assign({}, prevState.heifer);
        heifer = data.data;
        heifer.heiferDataSet = true;
        return { heifer }
      });
      this.formikProps.initialValues = data.data;
      //this.props.templateManager.showSuccessMessage(data.message);
    } else {
      //show error message
      //console.log('show error message');
      await this.setState(prevState => {
        let heifer = Object.assign({}, prevState.heifer);
        heifer.heiferDataSet = false;
        return { heifer }
      });
      this.props.templateManager.showErrorMessage(data.message);
    }
    this.props.templateManager.hideLoading();

  }
  async formatHeiferData(data) {
    let heifer = data.data;
    for (const [key, value] of Object.entries(data.data)) {
      if(key==='dob'){
        if(value!==null && value!==""){
          heifer['dob'] = new Date(Date.parse(value));
        }
      }else 
      if (value === null) {
        heifer[`${key}`] = '';
      }
    }
    data.data = heifer;
    return data;
  }
  loadHeiferWholeData = async (id) => {
    this.getDataByHeiferId(id);
  }
  isHeiferValid() {
    return true;
  }

  componentDidMount = () => {
    //console.log("COW PROFILE EDIT FORM MOUNT");
    //setTimeout(async ()=>{ await this.getDataByHeiferId(1);this.convertToEditForm()},100);  
    //console.log(this.templateManager);
    //this.templateManager.showLoading("I am Mounted");
    //setTimeout(()=>{this.templateManager.hideLoading()},2000)
    //console.log(this.formikref);
  }
  error(error, touched) {
    if (error || touched) {
      return (<label className="error-label">{error}</label>)
    } else {
      return "";
    }
  }
  selectDam = () => {
    console.log("selection dam modal")
    //this.props.heiferProfile.selectDamModal.type = 'editHeifer';
    //this.props.heiferProfile.selectDamModal.heiferEdit = this;
    this.props.heiferProfile.selectDamModal.currentObject = this;
    this.props.heiferProfile.selectDamModal.setState({selectedRecord:this.state.heifer.damID})
    this.props.heiferProfile.selectDamModal.show();
  }
  selectSire = () => {
    //console.log("selection sire modal 123")
    //this.props.heiferProfile.selectSireModal.type = 'editHeifer';
    //this.props.heiferProfile.selectSireModal.heiferEdit = this;
    this.props.heiferProfile.selectSireModal.currentObject = this;
    this.props.heiferProfile.selectSireModal.setState({selectedRecord:this.state.heifer.sireID})
    this.props.heiferProfile.selectSireModal.show();
    //this.props.heiferProfile.selectSire();
    //this.props.heiferProfile.selectSireModal.show();
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
    //this.formikProps.initialValues = this.state.heifer;
    //console.log("COW PROFILE EDIT FORM render");
    //console.log(this.context);
    return (
      <>
        <TemplateContext.Consumer>
          {(values) => { this.templateManager = values.templateManager; }}
        </TemplateContext.Consumer>
        <Formik {...this.formikProps} innerRef={(ref)=>{this.formikref =  ref;}}>
          {({ values, errors, handleSubmit, isSubmitting, touched, handleBlur, handleChange ,setFieldValue}) => (
            <form id="heifer_edit_heifer_form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="title">General Information</div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th colSpan="2">
                          <div>Heifer General Information</div>
                          <span className="fa fa-edit editCowBtn" onClick={this.convertToEditForm}><br /><span>Edit</span></span>
                          <span className="fa fa-save saveCowBtn" onClick={handleSubmit}><br /><span>Save</span></span>
                          <span className="fa fa-plus-circle newCowBtn" style={{ float: 'right' }} onClick={()=>{this.props.heiferProfile.showNewHeiferModal()}}><br /><span>New</span></span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>Heifer No/Tag</td><td><input type="hidden" id="heifer_edit_heifer_id" value={values.id} onChange={handleChange} onBlur={handleBlur} /><input type="text" value={values.tagNo || ""} className="cpinput-disabled" id="heifer_edit_heifer_tag_no" name="tagNo" onChange={handleChange} onBlur={handleBlur} />{this.error(errors.tagNo, errors.touched)}</td></tr>
                      <tr><td>Heifer Name</td><td><input type="text" className="cpinput-disabled" disabled id="heifer_edit_heifer_name" name="name" value={values.name || ""} onChange={handleChange} onBlur={handleBlur} />{this.error(errors.name, errors.touched)}</td></tr>
                      <tr>
                        <td>Date of Birth</td>
                        <td>
                          <DateTimePicker id="heifer_edit_heifer_dob" disabled={false} value={values.dob} onChange={(val)=>{setFieldValue('dob',val)}} format={`dd/MM/yyyy`}/><br/>
                          {this.error(errors.dob, errors.touched)}
                        </td>
                      </tr>
                      <tr>
                        <td>Breed</td>
                        <td>
                          <select className="kgsdropdown cpinput-disabled" id="heifer_edit_heifer_breed" name="breed" disabled onChange={handleChange} onBlur={handleBlur} value={values.breed}>
                            <option value="">Select One</option>
                            {Object.entries(this.context.breeds).map((value,key)=>{
                              return <option key={key} value={value[0]}>{value[1]}</option>
                            })}
                          </select>
                          {this.error(errors.breed, errors.touched)}
                        </td>
                      </tr>
                      <tr><td>Best Lactation Yield</td><td>3000 Litre</td></tr>
                      <tr><td>Dam No/Tag</td><td><span id="heifer_edit_heifer_dam_tag_no">{this.state.heifer.damNo}</span><span className="fa fa-edit disabled" id="heifer_edit_heifer_select_dam" title="Select Dam" onClick={(e)=>{if(!e.target.classList.contains('disabled')){this.selectDam()}}}></span><input type="hidden" id="heifer_edit_heifer_dam_id" name="damID" value={values.damID} onChange={handleChange} onBlur={handleBlur} />{this.error(errors.damID, errors.touched)}</td></tr>
                      <tr><td>Dam Name</td><td><span id="heifer_edit_heifer_dam_name">{this.state.heifer.damName}</span></td></tr>
                      <tr><td>Dam's Bly</td><td><span id="heifer_edit_heifer_dam_bly">{this.state.heifer.damBLY}</span></td></tr>
                      <tr><td>Sire No/Tag</td><td><span id="heifer_edit_heifer_sire_tag_no">{this.state.heifer.sireNo}</span><span className="fa fa-edit disabled" id="heifer_edit_heifer_select_sire" title="Select Sire" onClick={(e)=>{if(!e.target.classList.contains('disabled')){this.selectSire()}}}></span><input type="hidden" id="heifer_edit_heifer_sire_id" name="heifer_edit_heifer_sire_id" value={values.sireID} onChange={handleChange} onBlur={handleBlur} />{this.error(errors.sireID, errors.touched)}</td></tr>
                      <tr><td>Sire Name</td><td><span id="heifer_edit_heifer_sire_name">{this.state.heifer.sireName}</span></td></tr>
                      <tr><td>Sire's DBLY</td><td><span id="heifer_edit_heifer_sire_dam_bly">{this.state.heifer.sireDBLY}</span></td></tr>
                      <tr><td>Color</td><td><select className="kgsdropdown cpinput-disabled" id="heifer_edit_heifer_color" name="colour" disabled value={values.colour} onChange={handleChange} onBlur={handleBlur}>
                        <option value="">Choose One</option>
                        {Object.entries(this.context.colors).map((value,key)=>{
                              return <option key={key}  value={value[0]}>{value[1]}</option>
                            })}
                      </select>
                        {this.error(errors.colour, errors.touched)}
                      </td>
                      </tr>
                      <tr><td>Weight</td><td><input type="text" className="cpinput-disabled" value={values.weight} onChange={handleChange} onBlur={handleBlur} disabled id="heifer_edit_heifer_weight" name="weight" />{this.error(errors.weight, errors.touched)}</td></tr>
                      <tr><td>Height</td><td><input type="text" className="cpinput-disabled" disabled id="heifer_edit_heifer_height" name="height" value={values.height} onChange={handleChange} onBlur={handleBlur} />{this.error(errors.height, errors.touched)}</td></tr>
                      <tr><td>Fat</td><td><input type="text" className="cpinput-disabled" value={values.butterFat} disabled id="heifer_edit_heifer_butter_fat" name="butterFat" onChange={handleChange} onBlur={handleBlur} />{this.error(errors.butterFat, errors.touched)}</td></tr>
                      <tr><td>Heifer Sold</td><td>{values.sold===false?<button type="button" onClick={this.showSellHeiferModal} className="btn btn-success btn-sm">Sell Heifer</button>:<button type="button" onClick={this.getSellHeiferDetail} className="btn btn-success btn-sm">Edit Sell Heifer</button>} <input type="checkbox" checked={values.sold}/></td></tr>
                      <tr><td>Heifer Location</td>
                        <td>
                          <select className="kgsdropdown cpinput-disabled" id="heifer_edit_heifer_location" name="location" disabled value={values.location} onChange={handleChange} onBlur={handleBlur}>
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
                      <tr><td>Remarks</td><td><textarea className="cpinput-disabled" disabled id="heifer_edit_heifer_remarks" name="remarks" style={{ width: '100%' }} value={values.remarks} onChange={handleChange} onBlur={handleBlur}></textarea>{this.error(errors.remarks, errors.touched)}</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-md-6">
                  <div>
                    <div className="title title2" id="heifer-title">{values.tagNo}</div>
                    <img src={ this.state.imageUrl + this.state.heifer.picture} className="profile-pic" id="profile-pic" alt="heifer profile" /><br /><br />
                    <input className="file-input" type="file" placeholder="" id="heifer_edit_heifer_image" name="picture" accept="image/png, image/jpeg" onChange={(e)=>{this.heiferImageOnChange(e)}} />
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
  heiferImageOnChange = (e) => {
    this.formikProps.initialValues.picture = e.target.files[0];
    this.templateManager.readURL(e.target, 'profile-pic');
    this.forceUpdate();
    //console.log('Image on Change');
  }
  /*saveHeiferData = async () => {
    //console.log(this.templateManager);
    //console.log("Saving Heifer Data");
    $('label.error-label').remove();
    if (this.isHeiferValid() === true) {
      var formData = new FormData();
      formData.append('formFile', $('#heifer_edit_heifer_image')[0].files[0]);
      var data_ = {
        id: this.state.heifer.id,
        tagNo: this.state.heifer.tagNo,
        name: this.state.heifer.name,
        category: this.state.heifer.category,
        dob: this.templateManager.convertDateTo(this.state.heifer.dob),
        breed: this.state.heifer.breed,
        lactation: this.state.heifer.lactation,
        //$('#heifer_edit_heifer_dam_tag_no').html('');
        damID: this.state.heifer.damID,
        //$('#heifer_edit_heifer_dam_name').html();
        //$('#heifer_edit_heifer_sire_tag_no').html('');
        //$('#heifer_edit_heifer_sire_name').html('');
        sireID: this.state.heifer.sireID,
        colour: this.state.heifer.colour,
        weight: this.state.heifer.weight,
        height: this.state.heifer.height,
        //$('#heifer_edit_heifer_dam_bly').html('');
        //	$('#heifer_edit_heifer_sire_dam_bly').html('');
        butterFat: this.state.heifer.butterFat,
        noOfTeatsWorking: this.state.heifer.noOfTeatsWorking,
        location: this.state.heifer.location,
        remarks: this.state.heifer.remarks
      };
      $.each(data_, function (k, val) {
        formData.append(k, val);
      });
      this.templateManager.showLoading('Updating Heifer');
      const requestOptions = {
        method: 'POST',
        
        body: formData
      };
      let data = await fetch(`${apiUrl}Heifers/SaveHeifer/`, requestOptions)
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
      this.templateManager.showErrorMessage("Invalid Heifer Data");
    }
  }*/
  convertToEditForm=()=>{
		var ids = ['heifer_id','heifer_tag_no','heifer_name','heifer_dob','heifer_breed','heifer_lactation','heifer_color','heifer_weight','heifer_height','heifer_butter_fat','heifer_teats_working','heifer_location','heifer_pregnancy_status','heifer_remarks'];
		var ids2 = ['heifer_select_dam','heifer_select_sire']
		$.each(ids,function(id,val){
			$('#heifer_edit_'+val).addClass('cpinput').removeAttr('disabled').removeClass('cpinput-disabled');
		});
		$.each(ids2,function(id,val){
			$('#heifer_edit_'+val).removeClass('disabled');
			$('#heifer_edit_'+val).attr('disabled','disabled');
		});
		this.hideEditHeiferButton();
		this.showSaveHeiferButton();
	}
  disableEditForm(){
		var ids = ['heifer_id','heifer_tag_no','heifer_name','heifer_dob','heifer_breed','heifer_lactation','heifer_color','heifer_weight','heifer_height','heifer_butter_fat','heifer_remarks','heifer_location','heifer_teats_working','heifer_pregnancy_status'];
		var ids2 = ['heifer_select_dam','heifer_select_sire']
		$.each(ids,function(id,val){
			$('#heifer_edit_'+val).addClass('cpinput-disabled').attr('disabled',true).removeClass('cpinput');
		});
    
		$.each(ids2,function(id,val){
			$('#heifer_edit_'+val).addClass('disabled');
			$('#heifer_edit_'+val).attr('disabled','disabled');
		});
    this.showEditHeiferButton();
    this.hideSaveHeiferButton();
	}
	showEditHeiferButton(){
		$('.editCowBtn').css('display','');
	}
  hideEditHeiferButton(){
		$('.editCowBtn').css('display','none');
	}
	showSaveHeiferButton(){
		$('.saveCowBtn').css('display','block');
	}
	hideSaveHeiferButton(){
		$('.saveCowBtn').css('display','none');
	}
  showSellHeiferModal=()=>{
    this.props.heiferProfile.sellHeiferModal.show();
  }
  getSellHeiferDetail=async ()=>{
    let status = await this.props.heiferProfile.sellHeiferModal.getSellHeiferDetail();
    if(status===true){
      this.props.heiferProfile.sellHeiferModal.show();
    }
  }
  setSellHeifer=(type=true)=>{
    this.formikref.setFieldValue('sold',type);
  }
}
