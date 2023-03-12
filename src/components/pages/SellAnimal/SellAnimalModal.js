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

export default class SellAnimalModal extends Modal {
  //static contextType = CowContext;
  animalType = 'Cow';
  constructor(props) {
    super(props);
    if(props.animalType){
      this.animalType = props.animalType
    }
    this.state = {
      imageUrl: imageUrl,
      doctorMultipleSelection: false,
      defaultImage: "cow_default.jpg",
      addSoldDetail:{
        animalID:'',
        superVisorID:''
      },
      animalID:'',
      animalName:'',
      animalTagNo:'',
      taskType:'Add',
      animal_type:this.animalType
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
          return yup.number().typeError("Invalid Record Selected").required(`Please select the ${this.animalType} Sell Record again`)
        }
      }),//typeError("Invalid animal Service ID"),
      AnimalId: yup
        .number()
        .typeError("Invalid Animal Selected")
        .required(`Please Select the ${this.animalType}`),
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
        .required("Please Enter the Date of Selling animal!"),
      remarks: yup.string().typeError("Invalid Remarks"),
      Name: yup.string().when("BuyerSellerId", (val) => {
        //console.log("val",val)
        if (val=== null || val=== undefined) {
          return yup.string().required("Please Enter the Name");
        }
      }),
      Country: yup
        .object()
        .shape({
          label: yup.string(),
          value: yup.number().required("Plsease select the Country"),
      }),
      State: yup
        .object()
        .shape({
          label: yup.string(),
          value: yup.number().required("Plsease select the State"),
        }),
      District: yup
        .object()
        .shape({
          label: yup.string(),
          value: yup.number().required("Plsease select the District"),
      }),
      Tehsil: yup
        .object()
        .shape({
          label: yup.string(),
          value: yup.number().required("Plsease select the Tehsil"),
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
      animalID:'',
      AnimalId: '',
      Price: '',
      BuyerSellerId: "",
      Date: new Date(),
      SupervisorId: "",
      SupervisorName:"",
      SalePurchase: "SALE",
      AnimalNo: '',
      Remarks: '',
      Name: '',
      Country: '',
      State: '',
      District: '',
      Tehsil: '',
      VillMohalla: "",
      StreetNo: "",
      HouseNo:"",
      PIN: "",
      PhoneNumber:"",
      Email: "",
      animalName:""
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
        //if(formValues.animalID && formValues.animalID===this.props.animalProfile.context.selectedCow.id)
        //let fields = ['Id','AnimalId','Price','BuyerSellerId','Date','SupervisorId','SupervisorName',
        //'AnimalNo','Name','Country','State','District','VillMohalla','StreetNo','HouseNo','PIN','PhoneNumber',
        //'Email'];
        var data_ = {
          AnimalId: this.props.animalProfile.context.getSelectedAnimalID(),
          Price: formValues.Price,
          BuyerSellerId: formValues.BuyerSellerId,
          Date: convertDate(formValues.Date),
          SupervisorId:formValues.SupervisorId,
          Remarks:formValues.Remarks,
        }
        if(this.state.taskType==='Edit' || formValues.BuyerSellerId===null || formValues.BuyerSellerId===undefined || formValues.BuyerSellerId===''){
            data_.Name = formValues.Name;
            data_.Country = formValues.Country.value;
            data_.State = formValues.State.value;
            data_.District = formValues.District.value;
            data_.Tehsil = formValues.Tehsil.value;
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
        console.log(data_);
        $.each(data_, function (k, val) {
          formData.append(k, val);
        });
        let api_type = 'Add';
        if(this.state.taskType==='Edit'){
          api_type="Edit"
        }
        this.templateManager.showLoading(`Selling ${this.animalType}`);
        const requestOptions = {
          method: "POST",
          /*headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
          },*/
          body: formData,
        };
        let data = await fetch(
          `${apiUrl}${this.props.sellApi[1]}/${api_type}${this.props.sellApi[2]}/`,
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
          this.props.animalProfile.setSellAnimal(true);
          //this.props.animalProfile.cowEditForm.setSellCow(true);
          this.templateManager.showSuccessMessage(data.data.message);
          this.resetSellForm();
          this.hide();
          //this.props.animalProfile.cowServiceDetail.table.loadData();
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
  updateSelectedAnimal(){  //required 
    this.formRef.current.setFieldValue('AnimalId',this.props.animalProfile.context.getSelectedAnimalID());
    //this.formRef.current.setFieldValue('cowID',this.props.animalProfile.context.selectedCow.id);
    this.formRef.current.setFieldValue('animalName',`${this.props.animalProfile.context.getSelectedAnimalName()}-${this.props.animalProfile.context.getSelectedAnimalTagNo()}`);
  }
  render() {
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
                  Sell {this.animalType}
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
                          <div className="title">Sell {this.animalType}</div>
                          {/*this.showErrors(errors)*/}
                          <table className="table">
                            <thead>
                              <tr>
                                <th colSpan="2">
                                  <div id="cs_table_title">
                                    Fill the Sell {this.animalType} Form
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
                              
                              <TableFormField as="empty" name="AnimalId" label={`${this.animalType} No`} content={<span id="cow_service_cow_dam_tag_no">{values.animalName}</span>}
                                error_after={<ErrorMessage name="animalID" component={TextError} />} />
                              <TableFormField as="date" id="Date" name="Date" label={`Date of Selling`} value={values.Date} 
                                  afterContent={<><input
                                    type="hidden"
                                    value={this.props.animalProfile.context.getSelectedAnimalID()}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="animalID"
                                    id="cow_service_cow_id"
                                  />{values.Date}</>
                                  }
                                ref={(ref)=>{this.DateElement = ref;}}
                                setFieldValue={setFieldValue} error_after={<ErrorMessage name="id" component={TextError}/>}
                              />
                              <TableFormField as="input" id="Price" name="Price" label={`${this.animalType} Price`}/>
                              <TableFormField as="empty" id="Price" name="Price" label="Select Super visor (selling person)" 
                                content={<><span id="">
                                    {values.SupervisorName}
                                  </span>
                                  <input type="hidden" id="" name="SupervisorId" value={values.SupervisorId} onChange={handleChange} onBlur={handleBlur}/>
                                  <span
                                    className="fa fa-edit "
                                    id="cow_service_cow_select_supervisor"
                                    title="Select Super Visor"
                                    onClick={async () => {
                                      //console.log("select doctors");
                                      this.props.animalProfile.selectUserModal.currentObject =this;
                                      //fetch Supervisors
                                      this.props.animalProfile.selectUserModal.setState({selectedDoctorId : this.state.addSoldDetail.superVisorID});
                                      this.props.animalProfile.selectUserModal.show();
                                    }}
                                  ></span></>}/>
                             
                              <TableFormField as="input" id="Name" name="Name" label="Buyer Name"/>
                              <ErrorBoundary>
                                
                              <TableFormField as="select" id="Country" name="Country" label="Select Country"
                                options={this.props.animalProfile.context.countries} 
                                setFieldValue={setFieldValue}
                                ajax={false}
                                onChange={this.getSetStates}
                                ref={(ref)=>{this.countryField = ref;}} 
                                placeholder="Select Country"
                                value={values.Country}
                               
                              />
                              </ErrorBoundary>
                              <TableFormField as="select" id="cow_service_cow_delivery_status" name="State" label="Select State"
                                options={this.props.animalProfile.context.states} 
                                setFieldValue={setFieldValue}
                                ajax={false}
                                onChange={this.getSetDistricts}
                                ref={(ref)=>{this.stateField = ref;}} 
                                placeholder="Select State"
                               
                              />
                              <TableFormField as="select" id="District" name="District" label="Select District"
                                options={this.props.animalProfile.context.districts}
                                setFieldValue={setFieldValue}
                                ajax={false}
                                onChange={this.getSetTehsils}
                                ref={(ref)=>{this.districtField = ref;}} 
                                placeholder="Select District"
                                
                              />
                              <TableFormField as="select" id="Tehsil" name="Tehsil" label="Select Tehsil"
                                options={this.props.animalProfile.context.tehsils}
                                setFieldValue={setFieldValue}
                                ajax={false}
                                ref={(ref)=>{this.tehsilField = ref;}} 
                                placeholder="Select Tehsil"
                                
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
    let fields = ['Id','Price','BuyerSellerId','Date','SupervisorId','SupervisorName','AnimalNo','Name','Country','State','District','Tehsil','VillMohalla','StreetNo','HouseNo','PIN','PhoneNumber','Email']; //getlocation
    fields.map((value,index)=>{
      this.formRef.current.setFieldValue(value,'');
    });
    this.updateSelectedAnimal();
    await this.setState({taskType: 'Add'},()=>{this.setModalState('Add');});
  }
  
  setModalState=(taskType='Add')=>{
    if(taskType==='Add'){
      $('#cs_save_update').parent().removeClass('updateBtn');
      $('#cs_save_update').html("Save");
      $('#cs_table_title').html(`Add ${this.state.animal_type} Sell Information`);
      $('#addServiceDetailModal div.modal-header>h5.modal-title').html(`Add Sell Cow Detail`);
    }else if(taskType==='Edit'){

      $('#cs_save_update').parent().addClass('updateBtn');
      $('#cs_save_update').html("Update");
      $('#cs_table_title').html(`Update ${this.state.animal_type} Sell Information`);
      $('#addServiceDetailModal div.modal-header>h5.modal-title').html(`Update Sell ${this.state.animal_type} Detail`);
    }else{
      taskType = 'Add';
      $('#cs_save_update').parent().removeClass('updateBtn');
      $('#cs_save_update').html("Save");
      $('#cs_table_title').html(`Add ${this.state.animal_type} Sell Information`);
      $('#addServiceDetailModal div.modal-header>h5.modal-title').html(`Add Sell Cow Detail`);
    }
  } 
  getSellAnimalDetail=async ()=>{
    console.log(`Get sell ${this.animalType}animal detail called`)
    let data = {animal_id:this.props.animalProfile.context.getSelectedAnimalID()};
    if(this.props.animalProfile.context.getSelectedAnimalID()!==null && this.props.animalProfile.context.getSelectedAnimalID()!==undefined){
      //let data1 = await axios.post(`${apiUrl}Cows/GetSellCowDetailByCowId?cow_id=${data.cow_id}`);
      //let data1 = await axios.post(`${apiUrl}Bulls/GetSellBullDetailByBullId?bull_id=${data.bull_id}`);
      let data1 = await axios.post(`${apiUrl}${this.props.getSellDetailApi}${data.animal_id}`);
      return await this.setSellAnimalDetail(data1);
    }else{
      return false;
    }
  }
  setSellAnimalDetail=(data)=>{
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
              this.DateElement.setValue(new Date(Date.parse(data1[i][1])));
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
      "tehsil": "Tehsil",
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
          if(field ==='Country'){
            this.countryField.setValue(data1[i][1]);
          }else if(field ==='State'){
            this.stateField.setValue(data1[i][1]);
          }else if(field ==='District'){
            this.districtField.setValue(data1[i][1]);
          }else if(field ==='Tehsil'){
            this.tehsilField.setValue(data1[i][1]);
          }else{
            this.formRef.current.setFieldValue(field,data1[i][1]);
          }
        }
      }
      this.formRef.current.setErrors({});
      return true;
    }else{
      return false;
    }
  }
  getSetStates=async (val)=>{
    if(val!=null){
      let countryID = val.value;
      const config = {
        headers: {
            Accept: '*/*',
            //Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      };
      let data = await axios.post(`${apiUrl}AddressState/GetAddressStateIDNamePair?CountryID=`+countryID, {},config);
      this.stateField.setState({options:data.data},()=>{this.stateField.setValue(this.formRef.current.values.State)});
    }
  }
  getSetDistricts=async (val)=>{
    if(val!=null){
      let stateID = val.value;
      const config = {
        headers: {
            Accept: '*/*',
            //Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      };
      let data = await axios.post(`${apiUrl}AddressDistrict/GetAddressDistrictIDNamePair?StateID=`+stateID, {},config);
      this.districtField.setState({options:data.data},()=>{if(this.districtField){this.districtField.setValue(this.formRef.current.values.District);}});
    }
  }
  getSetTehsils=async (val)=>{
    if(val!=null){
      let districtID = val.value;
      const config = {
        headers: {
            Accept: '*/*',
            //Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      };
      let data = await axios.post(`${apiUrl}AddressTehsil/GetAddressTehsilIDNamePair?DistrictID=`+districtID, {},config);
      this.tehsilField.setState({options:data.data},()=>{
        if(this.tehsilField){
          this.tehsilField.setValue(this.formRef.current.values.Tehsil);
        }
      });
    }
  }
}
