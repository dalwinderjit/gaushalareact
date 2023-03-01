import React, { Component } from "react";
import $ from "jquery";
import { ErrorMessage,Field,Form, Formik } from "formik";
import * as yup from "yup";
import Modal from "../Templates/Modal";
import CowContext from "../../../context/CowContext";
import { apiUrl, convertDate, imageUrl } from "../../../context/AppContext";
//import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateTimePicker from "react-datetime-picker";
import "../../../css/mystyle.css";
import TextError from "../Templates/TextError";
import axios from "axios";
import ErrorBoundary from "../Templates/ErrorBoundary";
import TableFormField from "../Templates/TableFormField";
export const FILE_SIZE = 102400;
export const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export default class SellCowModal extends Modal {
  static contextType = CowContext;
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: imageUrl,
      doctorMultipleSelection: false,
      defaultImage: "cow_default.jpg",
      addSoldDetail:{
        cowID:'',
        superVisorID:''
      },
      cowID:'',
      cowName:'',
      cowTagNo:'',
      taskType:'Add',
      animal_type:'Cow'
      /*countries:{},
      states:{},
      districts:{}*/
    };
    this.templateManager = props.templateManager;
    //    let fields = ['Id','AnimalId','Price','BuyerSellerId','Date','SupervisorId','SupervisorName',
    //'AnimalNo','Name','Country','State','Distric','VillMohalla','StreetNo','HouseNo','PIN','PhoneNumber',
    //'Email']; //getlocation    
    this.sellCowValidation = yup.object().shape({
      Id:yup.number().when([],()=>{
        if(this.state.taskType==='Edit'){
          return yup.number().typeError("Invalid Record Selected").required("Please select the Cow Sell Record again")
        }
      }),//typeError("Invalid cow Service ID"),
      AnimalId: yup
        .number()
        .typeError("Invalid Animal Selected")
        .required("Please Select the Cow"),
      Price: yup
        .number()
        .typeError("Invalid Price Entered")
        .min(0,"Please Enter Valid Price (above 0)")
        .required("Please Enter the Price"),
      BuyerSellerId: yup.number(),
      SupervisorId: yup.number().required("Please select the Supervisor"),
      Date: yup
        .date()
        .typeError("Invalid Date Entered")
        .required("Please Enter the Date of Selling cow!"),
      remarks: yup.string().typeError("Invalid Remarks"),
      Name: yup.string().when("BuyerSellerId", (val) => {
        //console.log("val",val)
        if (val=== null || val=== undefined) {
          return yup.string().required("Please Enter the Name");
        }
      }),
      Country: yup.string().when("BuyerSellerId", (val) => {
        if (val=== null || val=== undefined) {
          return yup.number().required("Please Select the Country");
        }
      }),
      State: yup.string().when("BuyerSellerId", (val) => {
        if (val=== null || val=== undefined) {
          return yup.number().required("Please Select the State");
        }
      }),
      District: yup.string().when("BuyerSellerId", (val) => {
        if (val=== null || val=== undefined) {
          return yup.number().required("Please Select the District");
        }
      }),
      VillMohalla: yup.string().when("BuyerSellerId", (val) => {
        if (val=== null || val=== undefined) {
          return yup.string().required("Please enter the Village/Mohalla.");
        }
      }),
      StreetNo: yup.string().when("BuyerSellerId", (val) => {
        if (val=== null || val=== undefined) {
          return yup.string().required("Please enter the Street Number.");
        }
      }),
      HouseNo: yup.string().when("BuyerSellerId", (val) => {
        if (val=== null || val=== undefined) {
          return yup.string().required("Please enter the House Number.");
        }
      }),
      PIN: yup.string().when("BuyerSellerId", (val) => {
        if (val=== null || val=== undefined) {
          return yup.string().required("Please enter the PIN.");
        }
      }),
      Email: yup.string().when("BuyerSellerId", (val) => {
        if (val=== null || val=== undefined) {
          return yup.string().required("Please enter the Email.");
        }
      }),
      PhoneNumber: yup.string().when("BuyerSellerId", (val) => {
        if (val=== null || val=== undefined) {
          return yup.string().required("Please enter the PhoneNumber.");
        }
      }),
    });
    
    this.sellCow = {
      Id: '',
      cowID:'',
      AnimalId: '',
      Price: '',
      BuyerSellerId: "",
      Date: new Date(),
      SupervisorId: "",
      SupervisorName:"",
      SalePurchase: "SALE",
      AnimalNo: '',
      Name: '',
      Country: '',
      State: '',
      Distric: '',
      VillMohalla: "",
      StreetNo: "",
      HouseNo:"",
      PIN: "",
      PhoneNumber:"",
      Email: "",
      cowName:""
    };
    this.formikProps = {
      initialValues: this.sellCow,
      enableReinitialize: true,
      validateOnBlur: true,
      validateOnchange: true,
      validationSchema: this.sellCowValidation,
      //setFieldValue:true,
      onSubmit: async (formValues, { setSubmitting, setFieldError,resetForm}) => {
        //console.log("Add Cow Service");
        var formData = new FormData();
        //if(formValues.cowID && formValues.cowID===this.context.selectedCow.id)
        //let fields = ['Id','AnimalId','Price','BuyerSellerId','Date','SupervisorId','SupervisorName',
        //'AnimalNo','Name','Country','State','District','VillMohalla','StreetNo','HouseNo','PIN','PhoneNumber',
        //'Email'];
        var data_ = {
          AnimalId: this.context.selectedCow.id,
          Price: formValues.Price,
          BuyerSellerId: formValues.BuyerSellerId,
          Date: convertDate(formValues.Date),
          SupervisorId:formValues.SupervisorId,
          Remarks:formValues.Remarks,
        }
        if(this.state.taskType==='Edit' || formValues.BuyerSellerId===null || formValues.BuyerSellerId===undefined || formValues.BuyerSellerId===''){
            data_.Name = formValues.Name;
            data_.Country = formValues.Country;
            data_.State = formValues.State;
            data_.District = formValues.District;
            data_.VillMohalla = formValues.VillMohalla;
            data_.StreetNo = formValues.StreetNo;
            data_.HouseNo = formValues.HouseNo;
            data_.PIN = formValues.PIN;
            data_.PhoneNumber = formValues.PhoneNumber;
            data_.Email = formValues.Email;
        }
        if(this.state.taskType==='Edit'){
          data_.Id = formValues.Id;
        }
        $.each(data_, function (k, val) {
          formData.append(k, val);
        });
        let api_type = 'Add';
        if(this.state.taskType==='Edit'){
          api_type="Edit"
        }
        this.templateManager.showLoading(`Selling Cow`);
        const requestOptions = {
          method: "POST",
          /*headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
          },*/
          body: formData,
        };
        let data = await fetch(
          `${apiUrl}Cows/${api_type}SellCow/`,
          requestOptions
        )
          .then((res) => res.json())
          .then(
            (result) => {
              return result;
            },
            (error) => {
              return error;
            }
          );
        this.templateManager.hideLoading();
        console.log(data);
        if (data.data.status === "success") {
          this.props.cowProfile.cowEditForm.setSellCow(true);
          this.templateManager.showSuccessMessage(data.data.message);
          this.resetSellForm();
          this.hide();
          this.props.cowProfile.cowServiceDetail.table.loadData();
          await this.setState({taskType: 'Add'},()=>{this.setModalState('Add')});
        } else {
          if (data.errors) {
            Object.entries(data.errors).map((value, key) => {
              setFieldError(value[0], value[1]);
            });
          }
          this.templateManager.showErrorMessage(data.data.message);
        }
      },
    };
    this.formRef = React.createRef();
    console.log("context",this.context);
   
  }
  componentWillUnmount(){
    $("body").css("overflow", "scroll");
  }
  componentDidMount =async () => {
  };
  error(error, touched) {
        if (error || touched) {
      if (error && error!==undefined && error!==null && error.trim().length > 0) {
        try{
          return <ErrorBoundary><label className="error-label">{error}</label></ErrorBoundary>;
        }catch(ex){
          console.log(ex);
          return ""
        }
      } else {
        //return <></><label className="error-label">No errro</label>;
        return "";
      }
    }else{
      //return <label className="error-label">No error 123</label>;
      return "";
    }
  }
  
  
  setDoctors = async (data, type = "add") => {
    
    if (this.state.doctorMultipleSelection === true) {
      let doctors = this.formikProps.initialValues.doctors;
      if (type === "add") {
        doctors[data.id] = {
          id: data.id,
          name: data.name
        };
        this.formRef.current.setFieldValue('doctors',doctors);
      } else if ((type = "delete")) {
        delete doctors[data.id];
        this.formRef.current.setFieldValue('doctors',doctors);
      }
      this.formRef.current.setFieldValue('doctorID',this.getDoctorIDs());
      this.formRef.current.setFieldValue('doctorsName',this.getDoctorNames());
    } else {
      if (type === "add") {
        //console.log("HJLOE");
        //console.log(data);
        await this.setState((prevState)=>{
          let addSoldDetail = prevState.addSoldDetail;
          addSoldDetail.superVisorID = data.id;
          return addSoldDetail;
        });
        this.formRef.current.setFieldValue('SupervisorId',data.id);
        this.formRef.current.setFieldValue('SupervisorName',data.name);
      } else if ((type = "delete")) {
        await this.setState((prevState)=>{
          let addSoldDetail = prevState.addSoldDetail;
          addSoldDetail.superVisorID = '';
          return addSoldDetail;
        });
        this.formRef.current.setFieldValue('SupervisorId','');
        this.formRef.current.setFieldValue('SupervisorName','');
      }
    }
  };
  getDoctorIDs = () => {
    let id = [];
    Object.entries(this.formikProps.initialValues.doctors).map((value, key) => {
      id.push(value[1].id);
    });
    return id.join(",");
  };
  getDoctorNames = () => {
    let names = [];
    Object.entries(this.formikProps.initialValues.doctors).map((value, key) => {
      names.push(value[1].name);
    });
    return names.join(",");
  };
  showErrors = (errors) => {
    console.log(errors);
  };
  updateSelectedCow(){  //required 
    //console.log(this.formRef.current);
    //debugger;
    this.formRef.current.setFieldValue('AnimalId',this.context.selectedCow.id);
    //this.formRef.current.setFieldValue('cowID',this.context.selectedCow.id);
    this.formRef.current.setFieldValue('cowName',`${this.context.selectedCow.name}-${this.context.selectedCow.tagNo}`);
  }
  render() {
    //console.log(this.context);
    console.log('render sell cow model');
    return (
      <>
        <div
          ref={(ref) => {
            this.modal = ref;
          }}
          className="modal fade"
          id="addServiceDetailModal"
          tabIndex="-5"
          aria-hidden="true"
          style={{zIndex:10}}
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Sell Cow
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={this.hide}
                ></button>
              </div>
              <div className="modal-body">

                <Formik innerRef={this.formRef} {...this.formikProps}>
                  {({
                    values,
                    errors,
                    handleSubmit,
                    isSubmitting,
                    touched,
                    handleBlur,
                    handleChange,
                    setFieldValue,
                  }) => (
                    <>
                      {/*this.setFieldValue=setFieldValue*/}
                      
                      
                    <Form id="cow_service_form" onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="title">Sell Cow</div>
                          {/*this.showErrors(errors)*/}
                          <table className="table">
                            <thead>
                              <tr>
                                <th colSpan="2">
                                  <div id="cs_table_title">
                                    Fill the Sell Cow Form
                                  </div>
                                  <span
                                    className="fa fa-save addCowConceiveBtn"
                                    onClick={handleSubmit}
                                  >
                                    <br />
                                    <span id="cs_save_update">Save</span>
                                  </span>
                                  <span
                                    className="fa fa-redo addCowConceiveBtn"
                                    onClick={this.resetSellForm}
                                  >
                                    <br />
                                    <span id="cs_reset">Reset&nbsp;</span>
                                  </span>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              
                              <TableFormField as="empty" name="AnimalId" label="Cow No" content={<span id="cow_service_cow_dam_tag_no">{values.cowName}</span>}
                                error_after={<ErrorMessage name="cowID" component={TextError} />} />
                              <TableFormField as="date" id="Date" name="Date" label="Date of Selling" value={values.Date} afterContent={<input
                                    type="hidden"
                                    value={this.context.selectedCow.id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="cowID"
                                    id="cow_service_cow_id"
                                  />}
                                setFieldValue={setFieldValue} error_after={<ErrorMessage name="id" component={TextError}/>}
                              />
                              {/*<tr>
                                <td>Date of Selling</td>
                                <td>
                                  
                                  <DateTimePicker
                                    value={values.Date}
                                    onChange={(date) => {setFieldValue('Date',date);
                                      
                                    }}
                                    format="dd/MM/yyyy HH:mm:ss"
                                  />
                                  <br />
                                  
                                  <input
                                    type="hidden"
                                    value={this.context.selectedCow.id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="cowID"
                                    id="cow_service_cow_id"
                                  />
                                  <ErrorMessage name="Date" component={TextError}/>
                                  <ErrorMessage name="id" component={TextError}/>
                                </td>
                                  </tr>*/}
                              <TableFormField as="input" id="Price" name="Price" label="Cow Price"/>
                              <TableFormField as="empty" id="Price" name="Price" label="Select Super visor (selling person)" 
                                content={<><span id="">
                                    {values.SupervisorName}
                                  </span>
                                  <input
                                    type="hidden"
                                    id=""
                                    name="SupervisorId"
                                    value={values.SupervisorId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  <span
                                    className="fa fa-edit "
                                    id="cow_service_cow_select_supervisor"
                                    title="Select Super Visor"
                                    onClick={async () => {
                                      //console.log("select doctors");
                                      this.props.cowProfile.selectUserModal.currentObject =this;
                                      //fetch Supervisors
                                      this.props.cowProfile.selectUserModal.setState({selectedDoctorId : this.state.addSoldDetail.superVisorID});
                                      this.props.cowProfile.selectUserModal.show();
                                    }}
                                  ></span></>}/>
                             
                              <TableFormField as="input" id="Name" name="Name" label="Buyer Name"/>
                              <ErrorBoundary>
                                
                              <TableFormField as="select" id="Country" name="Country" label="Select Country"
                                options={this.context.countries} 
                                setFieldValue={setFieldValue}
                                ajax={false}
                                onChange={this.getSetStates}
                                /*ajaxSource={this.loadDiseases2}*/
                              />
                              </ErrorBoundary>
                              {/*<FormField as="select" id="medication_disease_id" name="DiseaseID" label="Select Disease" options={this.context.countries} 
                                setFieldValue={setFieldValue}
                                ajax={true}
                                ajaxSource={this.loadDiseases2}
                                />*/}
                              <TableFormField as="select" id="cow_service_cow_delivery_status" name="State" label="Select State"
                                options={this.context.states} 
                                setFieldValue={setFieldValue}
                                ajax={false}
                                onChange={this.getSetDistricts}
                                ref={(ref)=>{this.stateField = ref;}} 
                                /*ajaxSource={this.loadDiseases2}*/
                              />
                              <TableFormField as="select" id="District" name="District" label="Select District"
                                options={this.context.districts}
                                setFieldValue={setFieldValue}
                                ajax={false}
                                onChange={this.getSetTehsils}
                                ref={(ref)=>{this.districtField = ref;}} 
                                /*ajaxSource={this.loadDiseases2}*/
                              />
                              <TableFormField as="select" id="Tehsil" name="Tehsil" label="Select Tehsil"
                                options={this.context.tehsils}
                                setFieldValue={setFieldValue}
                                ajax={false}
                                ref={(ref)=>{this.tehsilField = ref;}} 
                                /*ajaxSource={this.loadDiseases2}*/
                              />
                              <TableFormField as="input" id="VillMohalla" name="VillMohalla" label="Village/Mohalla"/>
                              <TableFormField as="input" id="StreetNo" name="StreetNo" label="Street Number"/>
                              <TableFormField as="input" id="HouseNo" name="HouseNo" label="House Number"/>
                              <TableFormField as="input" id="PIN" name="PIN" label="PIN"/>
                              <TableFormField as="input" id="PhoneNumber" name="PhoneNumber" label="Phone Number"/>
                              <TableFormField as="input" id="Email" name="Email" label="Email"/>
                              <TableFormField as="input" id="Remarks" name="Remarks" label="Remarks"/>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </Form>
                    </>
                  )}
                </Formik>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={this.hide}
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
   
  resetSellForm =async()=>{
    let fields = ['Id','Price','BuyerSellerId','Date','SupervisorId','SupervisorName','AnimalNo','Name','Country','State','Distric','VillMohalla','StreetNo','HouseNo','PIN','PhoneNumber','Email']; //getlocation
    fields.map((value,index)=>{
      this.formRef.current.setFieldValue(value,'');
    });
    this.updateSelectedCow();
    await this.setState({taskType: 'Add'},()=>{this.setModalState('Add');});
  }
  
  setModalState=(taskType='Add')=>{
    if(taskType==='Add'){
      $('#cs_save_update').parent().removeClass('updateBtn');
      $('#cs_save_update').html("Save");
      $('#cs_table_title').html(`Add ${this.state.animal_type} Sell Information`);
      $('#addServiceDetailModal div.modal-header>h5.modal-title').html(`Add Sell Cow Detail`);
    }else if(taskType==='Edit'){
      console.log('Edit');
      $('#cs_save_update').parent().addClass('updateBtn');
      $('#cs_save_update').html("Update");
      $('#cs_table_title').html(`Update ${this.state.animal_type} Sell Information`);
      $('#addServiceDetailModal div.modal-header>h5.modal-title').html(`Update Sell ${this.state.animal_type} Detail`);
    }else{
      console.log('Add');
      taskType = 'Add';
      $('#cs_save_update').parent().removeClass('updateBtn');
      $('#cs_save_update').html("Save");
      $('#cs_table_title').html(`Add ${this.state.animal_type} Sell Information`);
      $('#addServiceDetailModal div.modal-header>h5.modal-title').html(`Add Sell Cow Detail`);
    }
  } 
  getSellCowDetail=async ()=>{
    let data = {cow_id:this.context.selectedCow.id};
    
    if(this.context.selectedCow.id!==null && this.context.selectedCow.id!==undefined){
      let data1 = await axios.post(`${apiUrl}Cows/GetSellCowDetailByCowId?cow_id=${data.cow_id}`);
      return await this.setSellCowDetail(data1);
    }else{
      return false;
    }
  }
  setSellCowDetail=(data)=>{
    console.log(data);
    if(data.data.status==='success'){
      this.setState({taskType:'Edit'});
      this.setModalState('Edit');
      let data1 = Object.entries(data.data.salePurchaseAnimal);
      let fields = {"id": "Id",
      "animalId": "AnimalId",
      "price": "Price",
      "buyerSellerId": "BuyerSellerId",
      "date": "Date",
      "supervisorId": "SupervisorId",
      "supervisorName": "SupervisorName",
      "salePurchase": "SalePurchase",
      "animalNo": "AnimalNo",
      "remarks":"Remarks"
    };
      
    //console.log(fields);
      for(let i=0;i<data1.length;i++){
        //console.log(data1[i][0]);
        if(['errors'].includes(data1[i][0])===false){
          if(fields[data1[i][0]]!==undefined){
            let field = fields[data1[i][0]];
            if(field ==='Date'){
              this.formRef.current.setFieldValue(field,new Date(Date.parse(data1[i][1])));
            }else{
              this.formRef.current.setFieldValue(field,data1[i][1]);
            }
          }
        }
      }
      fields = {"name": "Name",
      "country": "Country",
      "state": "State",
      "district": "District",
      "villMohalla": "VillMohalla",
      "streetNo": "StreetNo",
      "houseNo": "HouseNo",
      "pin": "PIN",
      "phoneNumber": "PhoneNumber",
      "email": "Email"};
      data1 = Object.entries(data.data.buyerSellerDetail);
      for(let i=0;i<data1.length;i++){
        if(fields[data1[i][0]]!==undefined){
          let field = fields[data1[i][0]];
          this.formRef.current.setFieldValue(field,data1[i][1]);
        }
      }
      this.formRef.current.setErrors({});
      return true;
    }else{
      return false;
    }
  }
  getSetStates=async (val)=>{
    let countryID = val.value;
    const config = {
      headers: {
          Accept: '*/*',
          //Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };
    let data = await axios.post(`${apiUrl}AddressState/GetAddressStateIDNamePair?CountryID=`+countryID, {},config);
    //this.setState({states:data.data});
    this.stateField.setState({options:data.data});
    this.stateField.forceUpdate();
    this.stateField.clearValue();
  }
  getSetDistricts=async (val)=>{
    let stateID = val.value;
    const config = {
      headers: {
          Accept: '*/*',
          //Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };
    let data = await axios.post(`${apiUrl}AddressDistrict/GetAddressDistrictIDNamePair?StateID=`+stateID, {},config);
    //this.setState({states:data.data});
    this.districtField.setState({options:data.data});
    this.districtField.forceUpdate();
    this.districtField.clearValue();
  }
  getSetTehsils=async (val)=>{
    let districtID = val.value;
    const config = {
      headers: {
          Accept: '*/*',
          //Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };
    let data = await axios.post(`${apiUrl}AddressTehsil/GetAddressTehsilIDNamePair?DistrictID=`+districtID, {},config);
    //this.setState({states:data.data});
    this.tehsilField.setState({options:data.data});
    this.tehsilField.clearValue();
    this.tehsilField.forceUpdate();
  }
}
