import React, { Component } from 'react'
import $ from 'jquery';
import { Formik } from "formik";
import * as yup from 'yup';
import CalfContext from '../../../context/CalfContext';
import { apiUrl,imageUrl, convertDateTo1 } from '../../../context/AppContext';
export const FILE_SIZE = 102400;
export const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

export default class CalfProfileNewFormModal extends Component {
  static contextType = CalfContext;
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: `${imageUrl}/`,
      defaultImage:'calf_default.jpg',
      calf:{
        damID:'',
        sireID:''
      }
    }
    this.calfNewSchema = yup.object().shape({
      tagNo: yup.string().required("Please Enter TagNo"),
      name: yup.string().required("Please Enter name"),
      dob: yup.string().matches(/^(([0][1-9])|([1-2][0-9])|([3][0-1]))\/(([0][1-9])|([1][1-2]))\/\d{4}$/, 'Invalid Date Format (dd/mm/yyyy').required("Please Enter Date of Birth"),
      breed: yup.string().required("Please Select Breed"),
      colour: yup.string().required("Please Select Colour"),
      sireID: yup.number().typeError("Invalid Sire Selection").required("Please Select Sire"),
      damID: yup.number().typeError("Invalid Dam Selection").required("Please Select Dam"),
      butterFat: yup.number().typeError("Invalid Butter Fat").required("Please Enter Butter Fat"),
      milkingStatus: yup.boolean().required("Please Select Milking Status"),
      remarks: yup.string(),
      lactation: yup.number().required("Please Enter Lactation Number"),
      weight: yup.number().typeError("Invalid Weight").required("Please Enter Weight"),
      height: yup.number().typeError("Invalid Height").required("Please Enter height"),
      noOfTeatsWorking: yup.number().required("Please Select Number of Teats Working"),
      location: yup.number().required("Please Select Location"),
      picture:yup.mixed().test("fileSize", "File Size is too large",(value)=>{console.log(value.size); return value.size<=FILE_SIZE;}).test('fileType', "Unsupported File Format", (value)=>{ console.log(value); return SUPPORTED_FORMATS.includes(value.type)} ),
    });
    this.newCalf = {
      id: 1,
      tagNo: 'sw-890',
      name: "sumitra001",
      dob: "11/11/2000",
      category: "COW",
      gender: "FEMALE",
      breed: "1",
      colour: '1',
      colour_: "1",
      sireID: '',
      damID: '',
      sireNo: "",
      sireName: "",
      damNo: "",
      damName: "",
      dbly: "",
      sdbly: "",
      butterFat: '22',
      pregnancyStatus: false,
      status: '',
      reproductiveStatus: false,
      milkingStatus: false,
      remarks: "hello",
      additionalInfo: "",
      picture: "calf_default.jpg",
      lactation: '0',
      type: "",
      weight: '300',
      height: 5,
      semenDoses: '',
      noOfTeatsWorking: '0',
      location: '2',
      calfDataSet: false
    };
    this.formikProps = {
      initialValues: this.newCalf,
      enableReinitialize: true,
      validateOnBlur: true,
      validateOnchange: true,
      validationSchema: this.calfNewSchema,
      onSubmit: async (formValues, { setSubmitting, setFieldError }) => {
        //console.log(this.templateManager);
        //console.log("Add Calf Data");
        var formData = new FormData();
        //console.log(document.getElementById('calf_new_image'))
        //console.log(document.getElementById('calf_new_image').files)
        //console.log(document.getElementById('calf_new_image').files[0])
        formData.append('formFile', document.getElementById('calf_new_image').files[0]);
        //console.log(this.context);
        var data_ = {
          id: formValues.id,
          tagNo: formValues.tagNo,
          name: formValues.name,
          dob: convertDateTo1(formValues.dob),
          breed: formValues.breed,
          lactation: formValues.lactation,
          damID: formValues.damID,
          sireID: formValues.sireID,
          colour: formValues.colour,
          weight: formValues.weight,
          height: formValues.height,
          butterFat: formValues.butterFat,
          noOfTeatsWorking: formValues.noOfTeatsWorking,
          location: formValues.location,
          remarks: formValues.remarks
        };
        $.each(data_, function (k, val) {
          formData.append(k, val);
        });
        //this.templateManager.showLoading('Adding Calf');
        const requestOptions = {
          method: 'POST',
          body: formData
        };
        let data = await fetch(`${apiUrl}api/Calfs/AddCalf/`, requestOptions)
          .then(res => res.json())
          .then(
            (result) => {
              return result
            },
            (error) => {
              return error
            }
          )
        //this.templateManager.hideLoading();
        //console.log(data);
        if (data.data.status === "Success") {
          //this.templateManager.showSuccessMessage(data.data.message);
          alert(data.data.message)
        } else {
          //console.log(data.errors);
          if(data.errors){
            let errors = Object.entries(data.errors);
            for(let i=0;i<errors.length;i++){
              let value = errors[i];
              setFieldError(value[0], value[1]);
            }
            /*Object.entries(data.errors).map((value,key)=>{
              //console.log(value,key);
              setFieldError(value[0], value[1]);
              
            })*/
          }
          //this.templateManager.showErrorMessage(data.data.message);
          //alert(data.data.message);
        }
      },
    };
    this.templateManager = props.templateManager;
  }
  error(error, touched) {
    if (error || touched) {
      return (<label className="error-label">{error}</label>)
    } else {
      return "";
    }
  }
  selectDam = () => {
    //console.log("selection dam modal")
    //this.props.calfProfile.selectDamModal.type = 'newCalf';
    //this.props.calfProfile.selectDamModal.calfNew = this;
    this.props.calfProfile.selectDamModal.currentObject = this;
    this.props.calfProfile.selectDamModal.setState({selectedRecord:this.state.calf.damID})
    this.props.calfProfile.selectDamModal.show();
  }
  selectSire = () => {
    //console.log("selection sire modal 123")
    //this.props.calfProfile.selectSireModal.type = 'newCalf';
    //this.props.calfProfile.selectSireModal.calfNew = this;
    this.props.calfProfile.selectSireModal.currentObject = this;
    this.props.calfProfile.selectSireModal.setState({selectedRecord:this.state.calf.sireID})
    this.props.calfProfile.selectSireModal.show();
    //this.props.calfProfile.selectSireModal.show();
  }
  setDam = async (data) => {
    //console.log("setting dam");
    //console.log(data);
    this.setState((prevState)=>{
      let calf = prevState.calf;
      calf.damID = data.id;
      return calf;
    })
    this.formikProps.initialValues.damNo = data.tagNo;
    this.formikProps.initialValues.damName = data.name;
    this.formikProps.initialValues.damID = data.id;
    this.forceUpdate();
  }
  setSire = async (data) => {
    this.setState((prevState)=>{
      let calf = prevState.calf;
      calf.sireID = data.id;
      return calf;
    })
    //console.log('settign sire', data);
    this.formikProps.initialValues.sireNo = data.tagNo;
    this.formikProps.initialValues.sireName = data.name;
    this.formikProps.initialValues.sireID = data.id;
    this.forceUpdate();
  }
  render() {
    //this.formikProps.initialValues = this.state.calf;
    //console.log("COW PROFILE New FORM render");
    return (
      <>
        <div className="modal fade" id="addNewCalfModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false" style={{zIndex:10}}>
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add New Calf</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={this.hide}></button>
              </div>
              <div className="modal-body">
                <Formik {...this.formikProps}>
                  {({ values, errors, handleSubmit, isSubmitting, touched, handleBlur, handleChange, setFieldValue }) => (
                    <form id="calf_new_form">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="title">General Information</div>

                          <table className="table">
                            <thead>
                              <tr>
                                <th colSpan="2">
                                  <div>Calf General Information</div>
                                  <span className="fa fa-save addCalfBtn" onClick={handleSubmit}><br /><span>Save</span></span>
                                </th>
                              </tr>
                            </thead>
                            <tbody>

                              <tr><td>Calf No/Tag</td><td><input type="text" className="cpinput" value={values.tagNo || ""} id="calf_new_calf_tag_no" name="tagNo" onChange={handleChange} onBlur={handleBlur} />{this.error(errors.tagNo, errors.touched)}</td></tr>
                              <tr><td>Calf Name</td><td><input type="text" className="cpinput" value={values.name || ""} id="calf_new_calf_name" name="name" onChange={handleChange} onBlur={handleBlur} />{this.error(errors.name, errors.touched)}</td></tr>
                              <tr><td>Date of Birth</td><td><input type="text" className="cpinput datepicker" value={values.dob || ""} id="calf_new_calf_dob" name="dob" onChange={handleChange} onBlur={handleBlur} />{this.error(errors.dob, errors.touched)}</td></tr>
                              <tr>
                                <td>Breed</td>
                                <td>
                                  <select className="kgsdropdown cpinput cpinput" id="calf_new_calf_breed" name="breed" value={values.breed || ""} onChange={handleChange} onBlur={handleBlur}>
                                    <option value="">Select One</option>
                                    {Object.entries(this.context.breeds).map((value, key) => {
                                      return <option key={key} value={value[0]}>{value[1]}</option>
                                    })}
                                  </select>
                                  {this.error(errors.breed, errors.touched)}
                                </td>
                              </tr>
                              <tr><td>Dam No/Tag</td><td><input type="hidden" id="calf_new_dam_id" name="damID" onChange={handleChange} onBlur={handleBlur} value={values.damID || ""} /><span id="calf_new_dam_tag_no">{values.damNo}</span><span className="fa fa-edit " id="calf_new_calf_select_dam" title="Select Dam" onClick={this.selectDam}></span>{this.error(errors.damID, errors.touched)}</td></tr>
                              <tr><td>Dam Name</td><td><span id="calf_new_dam_name">{values.damName}</span></td></tr>
                              <tr><td>Dam's Bly</td><td><span id="calf_new_dam_bly">--</span></td></tr>
                              <tr><td>Sire No/Tag</td><td><span id="calf_new_sire_tag_no">{values.sireNo}</span><input type="hidden" id="calf_new_sire_id" name="sireID" value={values.sireID || ""} onChange={handleChange} onBlur={handleBlur} /><span className="fa fa-edit " id="calf_new_calf_select_sire" title="Select Sire" onClick={this.selectSire}></span>{this.error(errors.sireID, errors.touched)}</td></tr>
                              <tr><td>Sire Name</td><td><span id="calf_new_sire_name">{values.sireName}</span></td></tr>
                              <tr><td>Sire's DBLY</td><td><span id="calf_new_sire_dam_bly"></span></td></tr>
                              <tr><td>Color</td><td><select className="kgsdropdown cpinput" id="calf_new_calf_color" name="colour" value={values.colour || ""} onChange={handleChange} onBlur={handleBlur}>
                                <option value="">Choose One</option>
                                {Object.entries(this.context.colors).map((value,key)=>{
                                  return <option key={key}  value={value[0]}>{value[1]}</option>
                                })}
                              </select>
                                {this.error(errors.colour, errors.touched)}
                              </td></tr>
                              <tr><td>Weight</td><td><input type="text" className="cpinput" id="calf_new_calf_weight" name="weight" value={values.weight || ""} onChange={handleChange} onBlur={handleBlur} />{this.error(errors.weight, errors.touched)}</td></tr>
                              <tr><td>Height</td><td><input type="text" className="cpinput" id="calf_new_calf_height" name="height" value={values.height || ""} onChange={handleChange} onBlur={handleBlur} />{this.error(errors.height, errors.touched)}</td></tr>
                              <tr><td>Calf Location</td>
                                <td>
                                  <select className="kgsdropdown cpinput" id="calf_new_calf_location" name="location" value={values.location || ""} onChange={handleChange} onBlur={handleBlur}>
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
                              <tr><td>Remarks</td><td><textarea className="cpinput" id="calf_new_calf_remarks" name="remarks" style={{ width: '100%' }} value={values.remarks || ""} onChange={handleChange} onBlur={handleBlur}></textarea>{this.error(errors.remarks, errors.touched)}</td></tr>
                            </tbody>
                            
                          </table>

                        </div>
                        <div className="col-md-6">
                          <div>
                            <div className="title title2" id="new-calf-title">SW - 1001</div>
                            <img src={this.state.imageUrl + this.state.defaultImage} className="profile-pic" id="profile-pic2" alt="Calf Profile" /><br /><br />
                            <input className="file-input" type="file" placeholder="" id="calf_new_image" name="picture" accept="image/png, image/jpeg" onChange={this.calfImageOnChange}/>
                            {this.error(errors.picture, errors.touched)}
                          </div>
                        </div>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>

      </>
    )
  }
  calfImageOnChange = (e) => {
    this.formikProps.initialValues.picture = e.target.files[0];
    this.templateManager.readURL(e.target, 'profile-pic2');
    //console.log('Image on Change');
  }
  show = async () => {
    $('body').css('overflow', 'hidden');
    await $("#addNewCalfModal").css("display", "block");
    setTimeout(() => {
      $("#addNewCalfModal").addClass("show");
    }, 1);
  };
  hide = async () => {
    $('body').css('overflow', 'auto');
    await $("#addNewCalfModal").css("display", "");
    $("#addNewCalfModal").removeClass("show");
  };
}