import React, { Component } from 'react'
import $ from 'jquery';
import { Formik } from "formik";
import * as yup from 'yup';
import BullContext from '../../../context/BullContext';
import { apiUrl, imageUrl, convertDate } from '../../../context/AppContext';
import Modal from '../Templates/Modal';
import DateTimePicker from 'react-datetime-picker';
export const FILE_SIZE = 102400;
export const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

export default class BullProfileNewFormModal extends Modal {
  static contextType = BullContext;
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: `${imageUrl}images/`,
      defaultImage: 'bull_default.jpg',
      bull: {
        damID: '',
        sireID: ''
      }
    }
    this.bullNewSchema = yup.object().shape({
      tagNo: yup.string().required("Please Enter TagNo"),
      name: yup.string().required("Please Enter name"),
      dob: yup.date().typeError('Invalid Date Format (dd/mm/yyyy').required("Please Enter Date of Birth"),
      breed: yup.string().required("Please Select Breed"),
      colour: yup.string().required("Please Select Colour"),
      sireID: yup.number().typeError("Invalid Sire Selection").required("Please Select Sire"),
      damID: yup.number().typeError("Invalid Dam Selection").required("Please Select Dam"),
      //butterFat: yup.number().typeError("Invalid Butter Fat").required("Please Enter Butter Fat"),
      //milkingStatus: yup.boolean().required("Please Select Milking Status"),
      remarks: yup.string(),
      lactation: yup.number().required("Please Enter Lactation Number"),
      weight: yup.number().typeError("Invalid Weight").required("Please Enter Weight"),
      height: yup.number().typeError("Invalid Height").required("Please Enter height"),
      //noOfTeatsWorking: yup.number().required("Please Select Number of Teats Working"),
      location: yup.number().required("Please Select Location"),
      picture: yup.mixed().test("fileSize", "File Size is too large", (value) => { console.log(value.size); if(typeof value !=='string') return value.size <= FILE_SIZE; else return true; }).test('fileType', "Unsupported File Format", (value) => {  if(typeof value !=='string') { console.log("hello");
         return SUPPORTED_FORMATS.includes(value.type)}else {  console.log("hello 123"); return true} }),
      semenDoses: yup.number().typeError("Invalid Semen Doses").required("Please Enter Semen Doses"),
      performance:yup.string().
        typeError("Invalid Performance Selected").
        required("Please select the Bull Performance").
        test("validValue", "Invalid Performance Type Selected", (value) => 
          { if(Object.keys(this.context.performances).includes(value)===true){ return true;}else {return false;} })
      ,
    });
    this.newBull = {
      id: 1,
      tagNo: 'sw-890',
      name: "sumitra001",
      dob: new Date(Date.parse('2000-11-11')),
      category: "COW",
      gender: "FEMALE",
      breed: "1",
      colour: '1',
      colour_: "1",
      sireID: '1200',
      damID: '1',
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
      picture: "bull_default.jpg",
      lactation: '0',
      type: "",
      weight: '300',
      height: 5,
      semenDoses: '',
      noOfTeatsWorking: '0',
      location: '2',
      semenDoses: '0',
      performance: '',
      bullDataSet: false
    };
    this.formikProps = {
      initialValues: this.newBull,
      enableReinitialize: true,
      validateOnBlur: true,
      validateOnchange: true,
      validationSchema: this.bullNewSchema,
      onSubmit: async (formValues, { setSubmitting, setFieldError }) => {
        //console.log(this.templateManager);
        //console.log("Add Bull Data");
        var formData = new FormData();
        //console.log(document.getElementById('bull_new_image'))
        //console.log(document.getElementById('bull_new_image').files)
        //console.log(document.getElementById('bull_new_image').files[0])
        formData.append('formFile', document.getElementById('bull_new_image').files[0]);
        //console.log(this.context);
        var data_ = {
          id: formValues.id,
          tagNo: formValues.tagNo,
          name: formValues.name,
          dob: convertDate(formValues.dob),
          breed: formValues.breed,
          lactation: formValues.lactation,
          damID: formValues.damID,
          sireID: formValues.sireID,
          colour: formValues.colour,
          weight: formValues.weight,
          height: formValues.height,
          semenDoses: formValues.semenDoses,
          type:formValues.performance,
          location: formValues.location,
          remarks: formValues.remarks
        };
        $.each(data_, function (k, val) {
          formData.append(k, val);
        });
        //this.templateManager.showLoading('Adding Bull');
        const requestOptions = {
          method: 'POST',
          body: formData
        };
        let data = await fetch(`${apiUrl}Bulls/AddBull/`, requestOptions)
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
        
        if (data.data.status === "Success") {
          //this.templateManager.showSuccessMessage(data.data.message);
          alert(data.data.message)
        } else {
          //console.log(data.errors);
          if (data.errors) {
            let errors = Object.entries(data.errors);
            for (let i = 0; i < errors.length; i++) {
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
    //this.props.bullProfile.selectDamModal.type = 'newBull';
    //this.props.bullProfile.selectDamModal.bullNew = this;
    this.props.bullProfile.selectDamModal.currentObject = this;
    this.props.bullProfile.selectDamModal.setState({ selectedRecord: this.state.bull.damID })
    this.props.bullProfile.selectDamModal.show();
  }
  selectSire = () => {
    //console.log("selection sire modal 123")
    //this.props.bullProfile.selectSireModal.type = 'newBull';
    //this.props.bullProfile.selectSireModal.bullNew = this;
    this.props.bullProfile.selectSireModal.currentObject = this;
    this.props.bullProfile.selectSireModal.setState({ selectedRecord: this.state.bull.sireID })
    this.props.bullProfile.selectSireModal.show();
    //this.props.bullProfile.selectSireModal.show();
  }
  setDam = async (data) => {
    //console.log("setting dam");
    //console.log(data);
    this.setState((prevState) => {
      let bull = prevState.bull;
      bull.damID = data.id;
      return bull;
    })
    this.formikRef.setFieldValue("damNo",data.tagNo);
    this.formikRef.setFieldValue("damName",data.name);
    this.formikRef.setFieldValue("damID",data.id);
    //this.formikProps.initialValues.damNo = data.tagNo;
    //this.formikProps.initialValues.damName = data.name;
    //this.formikProps.initialValues.damID = data.id;
    //this.forceUpdate();
  }
  setSire = async (data) => {
    this.setState((prevState) => {
      let bull = prevState.bull;
      bull.sireID = data.id;
      return bull;
    })
    //console.log('settign sire', data);
    this.formikRef.setFieldValue("sireNo",data.tagNo);
    this.formikRef.setFieldValue("sireName",data.name);
    this.formikRef.setFieldValue("sireID",data.id);
    //this.formikProps.initialValues.sireNo = data.tagNo;
    //this.formikProps.initialValues.sireName = data.name;
    //this.formikProps.initialValues.sireID = data.id;
    //this.forceUpdate();
  }
  render() {
    //this.formikProps.initialValues = this.state.bull;
    //console.log("COW PROFILE New FORM render");
    return (
      <>
        <div className="modal fade" id="addNewBullModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false" style={{ zIndex: 10 }} ref={ref => { this.modal = ref; }}>
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add New Bull</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={this.hide}></button>
              </div>
              <div className="modal-body">
                <Formik {...this.formikProps} innerRef={ref=>{this.formikRef = ref}}>
                  {({ values, errors, handleSubmit, isSubmitting, touched, handleBlur, handleChange, setFieldValue }) => (
                    <form id="bull_new_form">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="title">General Information</div>

                          <table className="table">
                            <thead>
                              <tr>
                                <th colSpan="2">
                                  <div>Bull General Information</div>
                                  <span className="fa fa-save addBullBtn" onClick={handleSubmit}><br /><span>Save</span></span>
                                </th>
                              </tr>
                            </thead>
                            <tbody>

                              <tr><td>Bull No/Tag</td><td><input type="text" className="cpinput" value={values.tagNo || ""} id="bull_new_bull_tag_no" name="tagNo" onChange={handleChange} onBlur={handleBlur} />{this.error(errors.tagNo, errors.touched)}</td></tr>
                              <tr><td>Bull Name</td><td><input type="text" className="cpinput" value={values.name || ""} id="bull_new_bull_name" name="name" onChange={handleChange} onBlur={handleBlur} />{this.error(errors.name, errors.touched)}</td></tr>
                              <tr><td>Date of Birth</td><td>
                                <DateTimePicker id="cow_edit_cow_dob" disabled={false} value={values.dob} onChange={(val)=>{setFieldValue('dob',val)}} format={`dd/MM/yyyy`}/><br/>
                                {this.error(errors.dob, errors.touched)}
                                </td>
                              </tr>
                              <tr>
                                <td>Breed</td>
                                <td>
                                  <select className="kgsdropdown cpinput cpinput" id="bull_new_bull_breed" name="breed" value={values.breed || ""} onChange={handleChange} onBlur={handleBlur}>
                                    <option value="">Select One</option>
                                    {Object.entries(this.context.breeds).map((value, key) => {
                                      return <option key={key} value={value[0]}>{value[1]}</option>
                                    })}
                                  </select>
                                  {this.error(errors.breed, errors.touched)}
                                </td>
                              </tr>
                              <tr><td>Color</td><td><select className="kgsdropdown cpinput" id="bull_new_bull_color" name="colour" value={values.colour || ""} onChange={handleChange} onBlur={handleBlur}>
                                <option value="">Choose One</option>
                                {Object.entries(this.context.colors).map((value, key) => {
                                  return <option key={key} value={value[0]}>{value[1]}</option>
                                })}
                              </select>
                                {this.error(errors.colour, errors.touched)}
                              </td></tr>
                              <tr><td>Weight</td><td><input type="text" className="cpinput" id="bull_new_bull_weight" name="weight" value={values.weight || ""} onChange={handleChange} onBlur={handleBlur} />{this.error(errors.weight, errors.touched)}</td></tr>
                              <tr><td>Height</td><td><input type="text" className="cpinput" id="bull_new_bull_height" name="height" value={values.height || ""} onChange={handleChange} onBlur={handleBlur} />{this.error(errors.height, errors.touched)}</td></tr>
                              <tr><td>Sire No/Tag</td><td><span id="bull_new_sire_tag_no">{values.sireNo}</span><input type="hidden" id="bull_new_sire_id" name="sireID" value={values.sireID || ""} onChange={handleChange} onBlur={handleBlur} /><span className="fa fa-edit " id="bull_new_bull_select_sire" title="Select Sire" onClick={this.selectSire}></span>{this.error(errors.sireID, errors.touched)}</td></tr>
                              <tr><td>Sire Name</td><td><span id="bull_new_sire_name">{values.sireName}</span></td></tr>
                              <tr><td>Dam No/Tag</td><td><input type="hidden" id="bull_new_dam_id" name="damID" onChange={handleChange} onBlur={handleBlur} value={values.damID || ""} /><span id="bull_new_dam_tag_no">{values.damNo}</span><span className="fa fa-edit " id="bull_new_bull_select_dam" title="Select Dam" onClick={this.selectDam}></span>{this.error(errors.damID, errors.touched)}</td></tr>
                              <tr><td>Dam Name</td><td><span id="bull_new_dam_name">{values.damName}</span></td></tr>
                              <tr><td>Dam's Bly</td><td><span id="bull_new_dam_bly">--</span></td></tr>
                              <tr><td>Sire's DBLY</td><td><span id="bull_new_sire_dam_bly"></span></td></tr>
                              
                              <tr><td>Bull Performance</td>
                                <td>
                                  <select className="kgsdropdown cpinput" id="bull_edit_bull_performance" name="performance" value={values.performance} onChange={handleChange} onBlur={handleBlur}>
                                    <option value="">Choose One</option>
                                    {Object.entries(this.context.performances).map((value, key) => {
                                      return <option key={key} value={value[0]}>{value[1]}</option>
                                    })}
                                  </select>
                                  {this.error(errors.performance, errors.touched)}
                                </td>
                              </tr>
                              <tr>
                                <td>Total Semen Doses</td>
                                <td>
                                  <input type="text" className="cpinput" id="bull_edit_semenDoses" name="semenDoses" value={values.semenDoses} onChange={handleChange} onBlur={handleBlur} />
                                  {this.error(errors.semenDoses, errors.touched)}
                                </td>
                              </tr>
                              <tr><td>Bull Location</td>
                                <td>
                                  <select className="kgsdropdown cpinput" id="bull_edit_bull_location" name="location" value={values.location} onChange={handleChange} onBlur={handleBlur}>
                                    <option value="">Choose One</option>
                                    {Object.entries(this.context.locations).map((value, key) => {
                                      return <option key={key} value={value[0]}>{value[1]}</option>
                                    })}
                                  </select>
                                  {this.error(errors.location, errors.touched)}
                                </td>
                              </tr>
                              <tr><td>Remarks</td><td><textarea className="cpinput" id="bull_new_bull_remarks" name="remarks" style={{ width: '100%' }} value={values.remarks || ""} onChange={handleChange} onBlur={handleBlur}></textarea>{this.error(errors.remarks, errors.touched)}</td></tr>
                            </tbody>
                            
                          </table>

                        </div>
                        <div className="col-md-6">
                          <div>
                            <div className="title title2" id="new-bull-title">SW - 1001</div>
                            <img src={this.state.imageUrl + this.state.defaultImage} className="profile-pic" id="profile-pic2" alt="Bull Profile" /><br /><br />
                            <input className="file-input" type="file" placeholder="" id="bull_new_image" name="picture" accept="image/png, image/jpeg" onChange={this.bullImageOnChange} />
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
  bullImageOnChange = (e) => {
    //this.formikProps.initialValues.picture = e.target.files[0];
    this.formikRef.setFieldValue('picture',e.target.files[0]);
    this.templateManager.readURL(e.target, 'profile-pic2');
    //console.log('Image on Change');
  }

}