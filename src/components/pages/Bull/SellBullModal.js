import React, { Component } from "react";
import $ from "jquery";
import { ErrorMessage,Field,Form, Formik } from "formik";
import * as yup from "yup";
import Modal from "../Templates/Modal";
import BullContext from "../../../context/BullContext";
import { apiUrl, convertDate, imageUrl } from "../../../context/AppContext";
//import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateTimePicker from "react-datetime-picker";
import "../../../css/mystyle.css";
import TextError from "../Templates/TextError";
import axios from "axios";
export const FILE_SIZE = 102400;
export const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export default class SellBullModal extends Modal {
  static contextType = BullContext;
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: imageUrl,
      doctorMultipleSelection: false,
      defaultImage: "bull_default.jpg",
      addSoldDetail:{
        bullID:'',
        superVisorID:''
      },
      bullID:'',
      bullName:'',
      bullTagNo:'',
      taskType:'Add',
      animal_type:'Bull'
    };
    this.templateManager = props.templateManager;
    //    let fields = ['Id','AnimalId','Price','BuyerSellerId','Date','SupervisorId','SupervisorName',
    //'AnimalNo','Name','Country','State','Distric','VillMohalla','StreetNo','HouseNo','PIN','PhoneNumber',
    //'Email']; //getlocation    
    this.sellBullValidation = yup.object().shape({
      Id:yup.number().when([],()=>{
        if(this.state.taskType==='Edit'){
          return yup.number().typeError("Invalid Record Selected").required("Please select the Bull Sell Record again")
        }
      }),//typeError("Invalid bull Service ID"),
      AnimalId: yup
        .number()
        .typeError("Invalid Animal Selected")
        .required("Please Select the Bull"),
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
        .required("Please Enter the Date of Selling bull!"),
      remarks: yup.string().typeError("Invalid Remarks"),
      Name: yup.string().when("BuyerSellerId", (val) => {
        console.log("val",val)
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
    
    this.sellBull = {
      Id: '',
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
      bullName:""
    };
    this.formikProps = {
      initialValues: this.sellBull,
      enableReinitialize: true,
      validateOnBlur: true,
      validateOnchange: true,
      validationSchema: this.sellBullValidation,
      //setFieldValue:true,
      onSubmit: async (formValues, { setSubmitting, setFieldError,resetForm}) => {
        //console.log("Add Bull Service");
        var formData = new FormData();
        
        //if(formValues.bullID && formValues.bullID===this.context.selectedBull.id)
        //let fields = ['Id','AnimalId','Price','BuyerSellerId','Date','SupervisorId','SupervisorName',
    //'AnimalNo','Name','Country','State','District','VillMohalla','StreetNo','HouseNo','PIN','PhoneNumber',
    //'Email'];
        var data_ = {
          
          AnimalId: this.context.selectedBull.id,
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
        this.templateManager.showLoading(`Selling Bull`);
        const requestOptions = {
          method: "POST",
          /*headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
          },*/
          body: formData,
        };
        let data = await fetch(
          `${apiUrl}Bulls/${api_type}SellBull/`,
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
          this.props.bullProfile.bullEditForm.setSellBull(true);
          this.templateManager.showSuccessMessage(data.data.message);
          this.resetSellForm();
          this.hide();
          this.props.bullProfile.bullServiceDetail.table.loadData();
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
      if (error && error.trim().length > 0) {
        return <label className="error-label">{error}</label>;
      } else {
        return "";
      }
    }
  }
  selectDam = () => {
    
    //console.log("selection dam modal");
    //this.props.bullProfile.selectDamModal.type = "newBull";
    this.props.bullProfile.selectDamModal.currentObject = this;
    this.props.bullProfile.selectDamModal.setState({selectedRecord:this.state.bullID})
    this.props.bullProfile.selectDamModal.show();
    //this.props.bullProfile.selectDamModal.bullNew = this;
    //this.props.bullProfile.selectDamModal.show();
  };
  selectSire = (setFieldValue) => {
    //console.log("selection sire modal in add bull service");
    //this.props.bullProfile.selectSireModal.type = "newBullService";
    //this.props.bullProfile.selectSireModal.newBullService = this;
    this.props.bullProfile.selectSireModal.currentObject = this;
    this.props.bullProfile.selectSireModal.setState({selectedRecord:this.state.bullID})
    this.props.bullProfile.selectSireModal.show();
    //this.props.bullProfile.selectSireModal.show();
  };
  setDam = async (data) => {
    this.state.cowID = data.id;
    this.formRef.current.setFieldValue('cowTagNo',data.tagNo);
    this.formRef.current.setFieldValue('cowName',data.name);
    this.formRef.current.setFieldValue('cowID',data.id);
  };
  setSire = async (data) => {
    this.state.bullID = data.id;
    this.formRef.current.setFieldValue('bullsTagNo',data.tagNo);
    this.formRef.current.setFieldValue('bullsName',data.name);
    this.formRef.current.setFieldValue('bullID',data.id);
  };
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
          addSoldDetail.doctorID = '';
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
  handleOnDateOfServiceChagne = (date,setFieldValue) => {
    setFieldValue('dateOfService',date)
  };
  handleOnDateOfDeliveryChagne = (date) => {
    this.formRef.current.setFieldValue('deliveryDate', date);
  };
  updateSelectedBull(){  //required 
    //console.log(this.formRef.current);
    
    this.formRef.current.setFieldValue('AnimalId',this.context.selectedBull.id);
    this.formRef.current.setFieldValue('bullID',this.context.selectedBull.id);
    this.formRef.current.setFieldValue('bullName',`${this.context.selectedBull.name}-${this.context.selectedBull.tagNo}`);
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
                  Sell Bull
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
                      
                      
                    <Form id="bull_service_form" onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="title">Sell Bull</div>
                          {this.showErrors(errors)}
                          <table className="table">
                            <thead>
                              <tr>
                                <th colSpan="2">
                                  <div id="cs_table_title">
                                    Fill the Sell Bull Form
                                  </div>
                                  <span
                                    className="fa fa-save addBullConceiveBtn"
                                    onClick={handleSubmit}
                                  >
                                    <br />
                                    <span id="cs_save_update">Save</span>
                                  </span>
                                  <span
                                    className="fa fa-redo addBullConceiveBtn"
                                    onClick={this.resetSellForm}
                                  >
                                    <br />
                                    <span id="cs_reset">Reset&nbsp;</span>
                                  </span>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Bull No</td>
                                <td>
                                  <span id="bull_service_bull_dam_tag_no">
                                    {values.bullName}
                                    {/*{values.tagNo} - {values.bullName} */}
                                  </span>
                                  {this.error(errors.bullID, touched)}
                                  {this.error(errors.AnimalId, touched)}
                                </td>
                              </tr>
                              <tr>
                                <td>Date of Selling</td>
                                <td>
                                  {/*<Field component={(props)=>{console.log(props);return <DateTimePicker />}}/><br/>*/}
                                  <DateTimePicker
                                    value={values.Date}
                                    onChange={(date) => {setFieldValue('Date',date);
                                      /*this.handleOnDateOfServiceChagne(date,setFieldValue);*/
                                    }}
                                    format="dd/MM/yyyy HH:mm:ss"
                                  />
                                  <br />
                                  
                                  <input
                                    type="hidden"
                                    value={this.context.selectedBull.id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="bullID"
                                    id="bull_service_bull_id"
                                  />
                                  <ErrorMessage name="Date" component={TextError}/>
                                  <ErrorMessage name="id" component={TextError}/>
                                </td>
                              </tr>
                              <tr>
                                <td>Bull Price</td>
                                <td>
                                  <input
                                    type="text"
                                    className="cpinput"
                                    name="Price"
                                    value={values.Price}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  {this.error(errors.Price, touched)}
                                </td>
                              </tr>
                              <tr>
                                <td>Select Super visor (selling person)</td>
                                <td>
                                  <span id="">
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
                                    id="bull_service_bull_select_supervisor"
                                    title="Select Super Visor"
                                    onClick={async () => {
                                      //console.log("select doctors");
                                      this.props.bullProfile.selectUserModal.currentObject =this;
                                      //fetch Supervisors
                                      this.props.bullProfile.selectUserModal.setState({selectedDoctorId : this.state.addSoldDetail.superVisorID});
                                      this.props.bullProfile.selectUserModal.show();
                                    }}
                                  ></span>
                                  {this.error(errors.SupervisorId, touched)}
                                </td>
                              </tr>
                              <tr>
                                <td>Buyer Name</td>
                                <td>
                                  <input
                                    className=" cpinput"
                                    id="Name"
                                    name="Name"
                                    value={values.Name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  {this.error(errors.Name, touched)}
                                </td>
                              </tr>
                              <tr className="succNorDel succDied">
                                <td>Select Country</td>
                                <td>
                                  <select
                                    className="kgsdropdown cpinput"
                                    id="bull_service_bull_delivery_status"
                                    name="Country"
                                    value={values.Country}
                                    onChange={(e) => {
                                       setFieldValue('Country',e.target.value);
                                    }}
                                    onBlur={handleBlur}
                                  >
                                    <option value="">
                                      Select Country
                                    </option>
                                    {Object.entries(
                                      this.context.countries
                                    ).map((value, key) => {
                                      return (
                                        <option key={key} value={value[0]}>
                                          {value[1]}
                                        </option>
                                      );
                                    })}
                                  </select>
                                  {this.error(errors.Country, touched)}
                                </td>
                              </tr>
                              <tr className="succNorDel succDied">
                                <td>Select State</td>
                                <td>
                                  <select
                                    className="kgsdropdown cpinput"
                                    id="bull_service_bull_delivery_status"
                                    name="State"
                                    value={values.State}
                                    onChange={(e) => {
                                       setFieldValue('State',e.target.value);
                                    }}
                                    onBlur={handleBlur}
                                  >
                                    <option value="">
                                      Select State
                                    </option>
                                    {Object.entries(
                                      this.context.states
                                    ).map((value, key) => {
                                      return (
                                        <option key={key} value={value[0]}>
                                          {value[1]}
                                        </option>
                                      );
                                    })}
                                  </select>
                                  {this.error(errors.State, touched)}
                                </td>
                              </tr>
                              <tr className="succNorDel succDied">
                                <td>Select District</td>
                                <td>
                                  <select
                                    className="kgsdropdown cpinput"
                                    id="bull_service_bull_delivery_status"
                                    name="District"
                                    value={values.District}
                                    onChange={(e) => {
                                       setFieldValue('District',e.target.value);
                                    }}
                                    onBlur={handleBlur}
                                  >
                                    <option value="">
                                      Select District
                                    </option>
                                    {Object.entries(
                                      this.context.districts
                                    ).map((value, key) => {
                                      return (
                                        <option key={key} value={value[0]}>
                                          {value[1]}
                                        </option>
                                      );
                                    })}
                                  </select>
                                  {this.error(errors.District, touched)}
                                </td>
                              </tr>
                              
                              <tr className="succNorDel">
                                <td>Village/Mohalla</td>
                                <td>
                                  <input
                                    type="text"
                                    className="cpinput"
                                    id="bull_service_bull_lactation_number"
                                    name="VillMohalla"
                                    value={values.VillMohalla}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  {this.error(errors.VillMohalla, touched)}
                                </td>
                              </tr>
                              <tr className="succNorDel">
                                <td>Street Number</td>
                                <td>
                                  <input
                                    type="text"
                                    className="cpinput"
                                    id="StreetNo"
                                    name="StreetNo"
                                    value={values.StreetNo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  {this.error(errors.StreetNo, touched)}
                                </td>
                              </tr>
                              <tr className="succNorDel">
                                <td>House Number</td>
                                <td>
                                  <input
                                    type="text"
                                    className="cpinput"
                                    id="HouseNo"
                                    name="HouseNo"
                                    value={values.HouseNo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  {this.error(errors.HouseNo, touched)}
                                </td>
                              </tr>
                              <tr className="succNorDel">
                                <td>PIN</td>
                                <td>
                                  <input
                                    type="text"
                                    className="cpinput"
                                    id="PIN"
                                    name="PIN"
                                    value={values.PIN}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  {this.error(errors.PIN, touched)}
                                </td>
                              </tr>
                              <tr className="succNorDel">
                                <td>Phone Number</td>
                                <td>
                                  <input
                                    type="text"
                                    className="cpinput"
                                    id="PhoneNumber"
                                    name="PhoneNumber"
                                    value={values.PhoneNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  {this.error(errors.PhoneNumber, touched)}
                                </td>
                              </tr>
                              <tr className="succNorDel">
                                <td>Email</td>
                                <td>
                                  <input
                                    type="text"
                                    className="cpinput"
                                    id="email"
                                    name="Email"
                                    value={values.Email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  {this.error(errors.Email, touched)}
                                </td>
                              </tr>
                              <tr>
                                <td>Remarks</td>
                                <td>
                                  <textarea
                                    className="cpinput w-100"
                                    value={values.Remarks}
                                    id="Remarks"
                                    name="Remarks"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  ></textarea>
                                </td>
                              </tr>
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
  bullImageOnChange = (e,setFieldValue) => {
    //this.formikProps.initialValues.picture = e.target.files[0];
    setFieldValue('picture',e.target.files[0]);
    this.templateManager.readURL(e.target, "profile-pic-child");
    //console.log("Image on Change");
    //this.forceUpdate();
  };
  onChangePregnancyStatus = (e,setFieldValue,deliveryStatus) => {
    setFieldValue('pregnancyStatus', e.target.value);
    this.changeForm(
      e.target.value,
      deliveryStatus
    );
  };
  onChangeDeliveryStatus = (e,setFieldValue,pregnancyStatus) => {
    //this.formikProps.initialValues.deliveryStatus = e.target.value;
    setFieldValue('deliveryStatus', e.target.value);
    this.changeForm(
      pregnancyStatus,
      e.target.value
    );
  };
  changeForm = (pregnancyStatus, deliveryStatus) => {
    console.log('changeForm',pregnancyStatus, deliveryStatus);
    if(pregnancyStatus!==undefined){
      pregnancyStatus = parseInt(pregnancyStatus);
    }
    if(deliveryStatus!==undefined){
      deliveryStatus = parseInt(deliveryStatus);
    };
    if (pregnancyStatus=== 4) {
      //succesfull
      console.log('successfull');
      if (deliveryStatus=== 1 || deliveryStatus=== 2) {
        //noraml/abnomal
        var elements = document.getElementsByClassName("succNorDel"); //.style('display','none');
        for (let i = 0; i < elements.length; i++) {
          console.log('showing');
          elements[i].style.display = "";
        }
      } else {
        var elements = document.getElementsByClassName("succNorDel"); //.style('display','none');
        for (let i = 0; i < elements.length; i++) {
          elements[i].style.display = "none";
        }
      }
      var elements = document.getElementsByClassName("succDied"); //.style('display','none');
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = "";
      }
    } else {
      var elements = document.getElementsByClassName("succNorDel"); //.style('display','none');
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
      }
    }
  };
  setDataToForm= async (data)=>{
    alert('hi');
    console.log(data.pregnancyStatus);
    console.log(data.deliveryStatus);
    if(data.dateOfService!=""){
      data.dateOfService = new Date(Date.parse(data.dateOfService));
    }else{
      data.dateOfService = '';
    }
    let fields = [];
    if([1,2,3].includes(parseInt(data.pregnancyStatus))){//confirmed pending failed
      console.log('confirmed pendign falild');
      let data2 = {};
      fields = ['id','dateOfService','bullID','cowID','cowName','cowTagNo','matingProcessType','pregnancyStatus','doctorID','doctorsName','remarks','conceiveId'];
      console.log("settign 1,2,3");
    }else if([4].includes(parseInt(data.pregnancyStatus))){//successful
      if(data.deliveryDate!=""){
        data.deliveryDate = new Date(Date.parse(data.deliveryDate));
      }else{
        data.deliveryDate = '';
      }
      if([1,2].includes(parseInt(data.deliveryStatus))){ //child born nomal abnormal
        console.log('succesffuyll born nomarm abcome');
        fields = ['id','dateOfService','cowID','cowName','cowTagNo','pregnancyStatus','deliveryStatus','lactationNo','deliveryDate','birthWeight','birthHeight','damWeight','tagNo','name', 'colour','breed','gender','doctorID','doctorsName','matingProcessType','remarks','picture','location','conceiveId']; //getlocation
        console.log("settign 4 1,2");
      }else if([3].includes(data.deliveryStatus)){ //child died
        console.log('succesffuyll child died');
        fields = ['id','dateOfService','cowID','cowName','cowTagNo','pregnancyStatus','deliveryStatus','deliveryDate','doctorID','doctorsName','matingProcessType','conceiveId']; //getlocation
        console.log("settign 4 3");
      }
      this.changeForm(parseInt(data.pregnancyStatus),parseInt(data.deliveryStatus));
    }
    this.setState({bullID:data.bullID});
    console.log(this.formRef.current);
    fields.map((value,index)=>{
      if(value=='picture'){
        if(data.picture!=""){
          document.getElementById('profile-pic-child').src=this.state.imageUrl+data.picture;
        }
      }else{
        this.formRef.current.setFieldValue(value,data[value]);
      }
    })
    //this.formikProps.initialValues = data;
    this.changeForm(
      data.pregnancyStatus,
      data.deliveryStatus
    );
    
    await this.updateSelectedBull();
    await this.setState({taskType: 'Edit'},()=>{this.setModalState('Edit');this.formRef.current.validateForm();});
  }
  resetSellForm =async()=>{
    let fields = ['Id','Price','BuyerSellerId','Date','SupervisorId','SupervisorName','AnimalNo','Name','Country','State','Distric','VillMohalla','StreetNo','HouseNo','PIN','PhoneNumber','Email']; //getlocation
    fields.map((value,index)=>{
      this.formRef.current.setFieldValue(value,'');
    });
    this.updateSelectedBull();
    await this.setState({taskType: 'Add'},()=>{this.setModalState('Add');});
  }
  setBullData=()=>{
    this.formRef.current.setFieldValue('AnimalId',this.context.selectedBull.id);
    this.formRef.current.setFieldValue('bullID',this.context.selectedBull.id);
    this.formRef.current.setFieldValue('bullName',`${this.context.selectedBull.name}-${this.context.selectedBull.tagNo}`);    
  }
  setModalState=(taskType='Add')=>{
    if(taskType==='Add'){
      $('#cs_save_update').parent().removeClass('updateBtn');
      $('#cs_save_update').html("Save");
      $('#cs_table_title').html(`Add ${this.state.animal_type} Sell Information`);
      $('#addServiceDetailModal div.modal-header>h5.modal-title').html(`Add Sell Bull Detail`);
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
      $('#addServiceDetailModal div.modal-header>h5.modal-title').html(`Add Sell Bull Detail`);
    }
  } 
  getSellBullDetail=async ()=>{
    let data = {bull_id:this.context.selectedBull.id};
    if(this.context.selectedBull.id!==null && this.context.selectedBull.id!==undefined){
      let data1 = await axios.post(`${apiUrl}Bulls/GetSellBullDetailByBullId?bull_id=${data.bull_id}`);
      this.setSellBullDetail(data1);
    }
  }
  setSellBullDetail=(data)=>{
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
      "animalNo": "AnimalNo"};
      
      for(let i=0;i<data1.length;i++){
        console.log(fields);
        console.log(data1[i][0]);
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
    }
  }
}
