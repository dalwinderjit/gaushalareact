import React, { Component } from 'react'
import $ from 'jquery';
import TemplateContext from '../../../context/TemplateContext';
import { Formik } from "formik";
import * as yup from 'yup';
import BullContext from '../../../context/BullContext';
import { convertDate,apiUrl, imageUrl } from '../../../context/AppContext';
import DateTimePicker from 'react-datetime-picker';
export const FILE_SIZE = 102400; //100KB
export const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg','images/jpg','image/JPEG','images/JPG', 'image/png'];

export default class BullProfileEditForm extends Component {
  static contextType = BullContext;
  constructor(props) {
    super(props);
    this.formikReference = React.createRef();
    this.state = {
      bull: {
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
        picture: "bull_default.jpg",
        lactation: 0,
        type: "",
        weight: '',
        height: '',
        semenDoses: '',
        noOfTeatsWorking: '',
        location: '',
        sold:false,
        bullDataSet: false
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
    this.bullEditSchema = yup.object().shape({
      id: yup.number().required("Please Enter Username"),
      tagNo: yup.string().required("Please Enter TagNo"),
      name: yup.string().required("Please Enter name"),
      dob: yup.date().typeError('Invalid Date Format (dd/mm/yyyy').required("Please Enter Date of Birth"),
      category: yup.string().required("Please Select Category"),
      gender: yup.string().required("Please Select gender"),
      breed: yup.string().required("Please Select Breed"),
      colour: yup.string().required("Please Select Colour"),
      //colour_: "",
      sireID: yup.number().typeError("Invalid Sire Selection").required("Please Select Sire"),
      damID: yup.number().typeError("Invalid Dam Selection").required("Please Select Dam"),
      remarks: yup.string(),
      //additionalInfo: "",
      picture:yup.mixed().nullable().test("fileSize", "File Size is too large", (value) => {/*console.log(value);*/ if(value && value.size) {  return  value.size<=FILE_SIZE;}else { /*console.log("not found");*/ return true;}}).test('fileType', "Unsupported File Format", (value) =>{ /*console.log(value);*/ if(value && value.type) {return SUPPORTED_FORMATS.includes(value.type)}else{return true;}} ),
      //lactation: yup.number().required("Please Enter Lactation Number"),
      //type: "",
      weight: yup.number().typeError("Invalid Weight").required("Please Enter Weight"),
      height: yup.number().typeError("Invalid Height").required("Please Enter height"),
      semenDoses:yup.number().typeError("Invalid Semen Doses").required("Please Enter Semen Doses"),
      performance:yup.string().
        typeError("Invalid Performance Selected").
        required("Please select the Bull Performance").
        test("validValue", "Invalid Performance Type Selected", (value) => 
          { if(Object.keys(this.context.performances).includes(value)===true){ return true;}else {return false;} })
      ,
      //noOfTeatsWorking: yup.number().required("Please Select Number of Teats Working"),
      location: yup.number().required("Please Select Location"),
      
      //bullDataSet:false,
    });
    this.editBull = {
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
      bullDataSet: false,
      performance:'',
      sold:''
    };
    this.apiUrl = '';
    this.formikProps = {
      initialValues: this.editBull,
      enableReinitialize: true,
      validateOnBlur: true,
      validateOnchange: true,
      validationSchema: this.bullEditSchema,
      onSubmit: async (formValues, { setSubmitting,setFieldError }) => {
        //console.log(this.templateManager);
        //console.log("Saving Bull Data");
        $('label.error-label').remove();
        if (this.isBullValid() === true) {
          var formData = new FormData();
          formData.append('formFile', $('#bull_edit_bull_image')[0].files[0]);
          //console.log(this.context);
          var data_ = {
            id: formValues.id,
            tagNo: formValues.tagNo,
            name: formValues.name,
            category: formValues.category,
            dob: convertDate(formValues.dob),
            breed: formValues.breed,
            lactation: formValues.lactation,
            //$('#bull_edit_bull_dam_tag_no').html('');
            damID: formValues.damID,
            //$('#bull_edit_bull_dam_name').html();
            //$('#bull_edit_bull_sire_tag_no').html('');
            //$('#bull_edit_bull_sire_name').html('');
            sireID: formValues.sireID,
            colour: formValues.colour,
            weight: formValues.weight,
            height: formValues.height,
            //$('#bull_edit_bull_dam_bly').html('');
            //	$('#bull_edit_bull_sire_dam_bly').html('');
            butterFat: formValues.butterFat,
            noOfTeatsWorking: formValues.noOfTeatsWorking,
            location: formValues.location,
            type:formValues.performance,
            semenDoses:formValues.semenDoses,
            remarks: formValues.remarks,
            //pregnancyStatus:formValues.pregnancyStatus,
            //milkingStatus:formValues.milkingStatus
          };
          $.each(data_, function (k, val) {
            formData.append(k, val);
          });
          this.templateManager.showLoading('Updating Bull');
          const requestOptions = {
            method: 'POST',
            /*headers: {
              'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
            },*/
            body: formData
          };
          let data = await fetch(`${apiUrl}Bulls/SaveBull/`, requestOptions)
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
          this.templateManager.showErrorMessage("Invalid Bull Data");
        }
      },
    };
    this.templateManager = props.templateManager;
    //console.log(this.templateManager);
  }
  async getDataByBullId(id) {
    //this.templateManager.showLoading("Loading Bull Data");
    $('#search-result-list').css('display', 'none');
    let data = await fetch(`${apiUrl}Bulls/GetBullById/` + id)
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
    if (data.status === true) {
      this.context.bullID = data.data.id;
      this.context.selectedBull.id = data.data.id;
      this.context.selectedBull.name = data.data.name;
      this.context.selectedBull.tagNo = data.data.tagNo;
      //this.context.addBullServiceModal.updateSelectedBull();
      //this.context.addBullMilkingStartStopDetail.updateSelectedBull();
      //this.props.bullProfile.medicationDetail.updateSelectedBull();
      data = await this.formatBullData(data);
      await this.setState(prevState => {
        let bull = Object.assign({}, prevState.bull);
        bull = data.data;
        bull.bullDataSet = true;
        return { bull }
      });
      let tempdata_ = Object.entries(data.data);
      for(let i=0;i<tempdata_.length;i++){
        if(tempdata_[i][0]==='type'){
          this.formikref.setFieldValue('performance',tempdata_[i][1]);
        }else{
          this.formikref.setFieldValue(tempdata_[i][0],tempdata_[i][1]);
        }
      }
      //this.props.templateManager.showSuccessMessage(data.message);
    } else {
      //show error message
      //console.log('show error message');
      await this.setState(prevState => {
        let bull = Object.assign({}, prevState.bull);
        bull.bullDataSet = false;
        return { bull }
      });
      this.props.templateManager.showErrorMessage(data.message);
    }
    this.props.templateManager.hideLoading();

  }
  async formatBullData(data) {
    let bull = data.data;
    for (const [key, value] of Object.entries(data.data)) {
      if(key==='dob'){
        if(value!==null && value!==""){
          bull['dob'] = new Date(Date.parse(value));
        }
      }else{
        if (value === null) {
          bull[`${key}`] = '';
          
        }
      }
    }
    data.data = bull;
    return data;
  }
  loadBullWholeData = async (id) => {
    this.getDataByBullId(id);
  }
  isBullValid() {
    return true;
  }

  componentDidMount = () => {
    //this.loadBullWholeData(2554);
  }
  error(error, touched) {
    if (error || touched) {
      return (<label className="error-label">{error}</label>)
    } else {
      return "";
    }
  }
  selectDam = () => {
    //this.props.bullProfile.selectDamModal.type = 'editBull';
    //this.props.bullProfile.selectDamModal.bullEdit = this;
    this.props.bullProfile.selectDamModal.currentObject = this;
    this.props.bullProfile.selectDamModal.setState({selectedRecord:this.state.bull.damID})
    this.props.bullProfile.selectDamModal.show();
  }
  selectSire = () => {
    //console.log("selection sire modal 123")
    //this.props.bullProfile.selectSireModal.type = 'editBull';
    //this.props.bullProfile.selectSireModal.bullEdit = this;
    this.props.bullProfile.selectSireModal.currentObject = this;
    this.props.bullProfile.selectSireModal.setState({selectedRecord:this.state.bull.sireID})
    this.props.bullProfile.selectSireModal.show();
    //this.props.bullProfile.selectSire();
    //this.props.bullProfile.selectSireModal.show();
  }
  setDam = async (data) => {
    this.formikref.setFieldValue('damNo',data.tagNo);
    this.formikref.setFieldValue('damName',data.name);
    this.formikref.setFieldValue('damID',data.id);
  }
  setSire = async (data) => {
    //console.log('settign sire');
    this.formikref.setFieldValue('sireNo',data.tagNo);
    this.formikref.setFieldValue('sireName',data.name);
    this.formikref.setFieldValue('sireID',data.id);
    //this.formikProps.initialValues.sireNo = data.tagNo;
    //this.formikProps.initialValues.sireName = data.name;
    //this.formikProps.initialValues.sireID = data.id;
    //this.forceUpdate();
  }
  render() {
    //this.formikProps.initialValues = this.state.bull;
    //console.log("COW PROFILE EDIT FORM render");
    //console.log(this.context);
    return (
      <>
        <TemplateContext.Consumer>
          {(values) => { this.templateManager = values.templateManager; }}
        </TemplateContext.Consumer>
        <Formik {...this.formikProps} innerRef={(ref)=>{this.formikref =  ref;}}>
          {({ values, errors, handleSubmit, isSubmitting, touched, handleBlur, handleChange ,setFieldValue}) => (
            <form id="bull_edit_bull_form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="title">General Information</div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th colSpan="2">
                          <div>Bull General Information</div>
                          <span className="fa fa-edit editCowBtn" onClick={this.convertToEditForm}><br /><span>Edit</span></span>
                          <span className="fa fa-save saveCowBtn" onClick={handleSubmit}><br /><span>Save</span></span>
                          <span className="fa fa-plus-circle newCowBtn" style={{ float: 'right' }} onClick={()=>{this.props.bullProfile.showNewBullModal()}}><br /><span>New</span></span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>Bull No/Tag</td><td><input type="hidden" id="bull_edit_bull_id" value={values.id} onChange={handleChange} onBlur={handleBlur} /><input type="text" value={values.tagNo || ""} className="cpinput-disabled" id="bull_edit_bull_tag_no" name="tagNo" onChange={handleChange} onBlur={handleBlur} />{this.error(errors.tagNo, errors.touched)}</td></tr>
                      <tr><td>Bull Name</td><td><input type="text" className="cpinput-disabled" disabled id="bull_edit_bull_name" name="name" value={values.name || ""} onChange={handleChange} onBlur={handleBlur} />{this.error(errors.name, errors.touched)}</td></tr>
                      <tr><td>Date of Birth</td><td>
                        <DateTimePicker value={values.dob} onChange={(val)=>{setFieldValue('dob',val)}} format={`dd/MM/yyyy`}/><br/>
                        {this.error(errors.dob, errors.touched)}
                        </td>
                      </tr>
                      <tr>
                        <td>Breed</td>
                        <td>
                          <select className="kgsdropdown cpinput-disabled" id="bull_edit_bull_breed" name="breed" disabled onChange={handleChange} onBlur={handleBlur} value={values.breed}>
                            <option value="">Select One</option>
                            {Object.entries(this.context.breeds).map((value,key)=>{
                              return <option key={key} value={value[0]}>{value[1]}</option>
                            })}
                          </select>
                          {this.error(errors.breed, errors.touched)}
                        </td>
                      </tr>
                      <tr><td>Color</td>
                        <td>
                          <select className="kgsdropdown cpinput-disabled" id="bull_edit_bull_color" name="colour" disabled value={values.colour} onChange={handleChange} onBlur={handleBlur}>
                            <option value="">Choose One</option>
                              {Object.entries(this.context.colors).map((value,key)=>{
                                return <option key={key}  value={value[0]}>{value[1]}</option>
                              })}
                          </select>
                        {this.error(errors.colour, errors.touched)}
                      </td>
                      </tr>
                      <tr><td>Weight</td><td><input type="text" className="cpinput-disabled" value={values.weight} onChange={handleChange} onBlur={handleBlur} disabled id="bull_edit_bull_weight" name="weight" />{this.error(errors.weight, errors.touched)}</td></tr>
                      <tr><td>Height</td><td><input type="text" className="cpinput-disabled" disabled id="bull_edit_bull_height" name="height" value={values.height} onChange={handleChange} onBlur={handleBlur} />{this.error(errors.height, errors.touched)}</td></tr>
                      <tr><td>Sire No/Tag</td><td><span id="bull_edit_bull_sire_tag_no">{values.sireNo}</span><span className="fa fa-edit disabled" id="bull_edit_bull_select_sire" title="Select Sire" onClick={(e)=>{if(!e.target.classList.contains('disabled')){this.selectSire()}}}></span><input type="hidden" id="bull_edit_bull_sire_id" name="bull_edit_bull_sire_id" value={values.sireID} onChange={handleChange} onBlur={handleBlur} />{this.error(errors.sireID, errors.touched)}</td></tr>
                      <tr><td>Sire Name</td><td><span id="bull_edit_bull_sire_name">{values.sireName}</span></td></tr>
                      <tr><td>Dam No/Tag</td><td><span id="bull_edit_bull_dam_tag_no">{values.damNo}</span><span className="fa fa-edit disabled" id="bull_edit_bull_select_dam" title="Select Dam" onClick={(e)=>{if(!e.target.classList.contains('disabled')){this.selectDam()}}}></span><input type="hidden" id="bull_edit_bull_dam_id" name="damID" value={values.damID} onChange={handleChange} onBlur={handleBlur} />{this.error(errors.damID, errors.touched)}</td></tr>
                      <tr><td>Dam Name</td><td><span id="bull_edit_bull_dam_name">{values.damName}</span></td></tr>
                      <tr><td>Dam's Bly</td><td><span id="bull_edit_bull_dam_bly">{this.state.bull.damBLY}</span></td></tr>
                      <tr><td>Sire's DBLY</td><td><span id="bull_edit_bull_sire_dam_bly">{this.state.bull.sireDBLY}</span></td></tr>
                      <tr><td>Bull Sold</td><td>{values.sold===false?<button onClick={this.showSellBullModal} className="btn btn-success btn-sm">Sell Bull</button>:<button onClick={this.getSellBullDetail} className="btn btn-success btn-sm">Edit Sell Bull Detail</button>}  <input type="checkbox" defaultChecked={values.sold}/></td></tr>
                      <tr><td>Bull Performance {values.performance}- {values.performance}</td>
                        <td>
                          <select className="kgsdropdown cpinput-disabled" id="bull_edit_bull_performance" name="performance" disabled value={values.performance} onChange={handleChange} onBlur={handleBlur}>
                            <option value="">Choose One</option>
                              {Object.entries(this.context.performances).map((value,key)=>{
                                return <option key={key}  value={value[0]}>{value[1]}</option>
                              })}
                          </select>
                          {this.error(errors.performance, errors.touched)}
                        </td>
                      </tr>
                      <tr>
                        <td>Total Semen Doses</td>
                        <td>
                          <input type="text" className="cpinput-disabled" disabled id="bull_edit_semenDoses" name="semenDoses" value={values.semenDoses} onChange={handleChange} onBlur={handleBlur} />
                          {this.error(errors.semenDoses, errors.touched)}
                        </td>
                      </tr>
                      <tr><td>Bull Location</td>
                        <td>
                        <select className="kgsdropdown cpinput-disabled" id="bull_edit_bull_location" name="location" disabled value={values.location} onChange={handleChange} onBlur={handleBlur}>
                            <option value="">Choose One</option>
                              {Object.entries(this.context.locations).map((value,key)=>{
                                return <option key={key}  value={value[0]}>{value[1]}</option>
                              })}
                          </select>
                          {this.error(errors.location, errors.touched)}
                        </td>
                      </tr>
                      <tr><td>Remarks</td><td><textarea className="cpinput-disabled" disabled id="bull_edit_bull_remarks" name="remarks" style={{ width: '100%' }} value={values.remarks} onChange={handleChange} onBlur={handleBlur}></textarea>{this.error(errors.remarks, errors.touched)}</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-md-6">
                  <div>
                    <div className="title title2" id="bull-title">{values.tagNo}</div>
                    <img src={ this.state.imageUrl + this.state.bull.picture} className="profile-pic" id="profile-pic" alt="bull profile" /><br /><br />
                    <input className="file-input" type="file" placeholder="" id="bull_edit_bull_image" name="picture" accept="image/png, image/jpeg" onChange={(e)=>{this.bullImageOnChange(e)}} />
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
  bullImageOnChange = (e) => {
    this.formikProps.initialValues.picture = e.target.files[0];
    this.templateManager.readURL(e.target, 'profile-pic');
    this.forceUpdate();
    //console.log('Image on Change');
  }
  convertToEditForm=()=>{
    //bull_edit_bull_performance
		var ids = ['bull_id','bull_tag_no','bull_name','bull_dob','bull_breed','bull_color','bull_weight','bull_height','bull_location','bull_remarks','bull_performance','semenDoses'];
		var ids2 = ['bull_select_dam','bull_select_sire']
		$.each(ids,function(id,val){
			$('#bull_edit_'+val).addClass('cpinput').removeAttr('disabled').removeClass('cpinput-disabled');
		});
		$.each(ids2,function(id,val){
			$('#bull_edit_'+val).removeClass('disabled');
			$('#bull_edit_'+val).attr('disabled','disabled');
		});
		this.hideEditBullButton();
		this.showSaveBullButton();
	}
  disableEditForm(){
    var ids = ['bull_id','bull_tag_no','bull_name','bull_dob','bull_breed','bull_color','bull_weight','bull_height','bull_location','bull_remarks','bull_performance','semenDoses'];
		var ids2 = ['bull_select_dam','bull_select_sire']
		$.each(ids,function(id,val){
			$('#bull_edit_'+val).addClass('cpinput-disabled').attr('disabled',true).removeClass('cpinput');
		});
    
		$.each(ids2,function(id,val){
			$('#bull_edit_'+val).addClass('disabled');
			$('#bull_edit_'+val).attr('disabled','disabled');
		});
    this.showEditBullButton();
    this.hideSaveBullButton();
	}
	showEditBullButton(){
		$('.editCowBtn').css('display','');
	}
  hideEditBullButton(){
		$('.editCowBtn').css('display','none');
	}
	showSaveBullButton(){
		$('.saveCowBtn').css('display','block');
	}
	hideSaveBullButton(){
		$('.saveCowBtn').css('display','none');
	}
  showSellBullModal=()=>{
    this.props.bullProfile.sellBullModal.show();
  }
  getSellBullDetail=async ()=>{
    await this.props.bullProfile.sellBullModal.getSellBullDetail();
    this.props.bullProfile.sellBullModal.show();
  }
  setSellBull=(type=true)=>{
    this.formikref.setFieldValue('sold',type);
  }
}
