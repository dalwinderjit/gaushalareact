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
export const FILE_SIZE = 102400;
export const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export default class AddBullServiceModal extends Modal {
  static contextType = BullContext;
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: imageUrl,
      doctorMultipleSelection: false,
      defaultImage: "bull_default.jpg",
      addService:{
        bullID:'',
        doctorID:''
      },
      bullID:'',
      taskType:'Add',
      animal_type:'Bull'
    };
    this.templateManager = props.templateManager;
    this.bullNewServiceValidation = yup.object().shape({
      conceiveId:yup.number().when([],()=>{
        if(this.state.taskType==='Edit'){
          return yup.number().typeError("Invalid bull Service ID").required("Please select the Bull Service again")
        }
      }),//typeError("Invalid bull Service ID"),
      cowID: yup.number().required("Please Select the Cow"),
      dateOfService: yup
        .date()
        .typeError("Invalid Date Entered")
        .required("Please Enter Date of Service"),
      pregnancyStatus: yup
        .number()
        .required("Please Select the Pregnancy Status of Cow"),
      doctorID: yup.number().required("Please select the doctor"),
      matingProcessType: yup
        .string()
        .typeError("Invalid Mating Type")
        .required("Please Enter Child Name!"),
      remarks: yup.string().typeError("Invalid Remarks"),
      deliveryStatus: yup.number().when("pregnancyStatus", (val) => {
        if (val=== 4) {
          return yup.number().required("Please select Delivery Status");
        }
      }),
      lactationNo: yup
        .number()
        .when(["pregnancyStatus", "deliveryStatus"], (val, val2) => {
          if (val=== 4) {
            if (val2=== 1 || val2=== 2) {
              return yup
                .number()
                .min(0, "Must be greator than equal to zero")
                .typeError("Invalid Lactation Number")
                .required("Please Enter Lactation Number!");
            }
          }
        }),
      deliveryDate: yup
        .date()
        .when(["pregnancyStatus", "deliveryStatus"], (val, val2) => {
          if (val=== 4) {
            if (val2=== 3) {
              return yup
                .date()
                .typeError("Invalid date")
                .required("Please Enter Date of Death");
            } else {
              return yup
                .date()
                .typeError("Invalid date")
                .required("Please Enter Date of Delivery");
            }
          }
        }),
      birthWeight: yup
        .number()
        .when(["pregnancyStatus", "deliveryStatus"], (val, val2) => {
          if (val=== 4) {
            if (val2=== 1 || val2=== 2) {
              return yup
                .number()
                .typeError("Invalid birth Weight")
                .min(0)
                .required("Please Enter Birth Weight");
            }
          }
        }),
      birthHeight: yup
        .number()
        .when(["pregnancyStatus", "deliveryStatus"], (val, val2) => {
          if (val=== 4) {
            if (val2=== 1 || val2=== 2) {
              return yup
                .number()
                .typeError("Invalid birth Height")
                .min(0.1, "Invalid Height!")
                .required("Please Enter Birth Height!");
            }
          }
        }),
      damWeight: yup
        .number()
        .when(["pregnancyStatus", "deliveryStatus"], (val, val2) => {
          if (val=== 4) {
            if (val2=== 1 || val2=== 2) {
              return yup
                .number()
                .typeError("Invalid Dam Weight")
                .min(0.1, "Invalid Dam Weight!")
                .required("Please Enter Dam Weight!");
            }
          }
        }),
      tagNo: yup
        .string()
        .when(["pregnancyStatus", "deliveryStatus"], (val, val2) => {
          if (val=== 4) {
            if (val2=== 1 || val2=== 2) {
              return yup
                .string()
                .typeError("Invalid Dam Weight")
                .matches(
                  /^[a-zA-Z]{1,5}-[0-9]{1,}$/,
                  "Invalid Tag Number entered"
                )
                .required("Please Enter Child Tag Number!");
            }
          }
        }),
      name: yup
        .string()
        .when(["pregnancyStatus", "deliveryStatus"], (val, val2) => {
          if (val=== 4) {
            if (val2=== 1 || val2=== 2) {
              return yup
                .string()
                .typeError("Invalid Name")
                .required("Please Enter Child Name!");
            }
          }
        }),
      colour: yup
        .number()
        .when(["pregnancyStatus", "deliveryStatus"], (val, val2) => {
          if (val=== 4) {
            if (val2=== 1 || val2=== 2) {
              return yup
                .number()
                .typeError("Invalid Color")
                .required("Please Select the Color of Child!");
            }
          }
        }),
      breed: yup
        .number()
        .when(["pregnancyStatus", "deliveryStatus"], (val, val2) => {
          if (val=== 4) {
            if (val2=== 1 || val2=== 2) {
              return yup
                .number()
                .typeError("Invalid Breed")
                .required("Please Select the Breed of Child!");
            }
          }
        }),
      location: yup
        .number()
        .when(["pregnancyStatus", "deliveryStatus"], (val, val2) => {
          if (val=== 4) {
            if (val2=== 1 || val2=== 2) {
              return yup
                .number()
                .typeError("Invalid Location Selected")
                .required("Please Select the Location of Child!");
            }
          }
        }),
      gender: yup
        .string()
        .when(["pregnancyStatus", "deliveryStatus"], (val, val2) => {
          if (val=== 4) {
            if (val2=== 1 || val2=== 2) {
              return yup
                .string()
                .matches(/^(Male)|(Female)$/, "Invalid Gender selection")
                .typeError("Invalid Gender")
                .required("Please Select the Gender of Child!");
            }
          }
        }),
      picture: yup
        .mixed()
        .when(["pregnancyStatus", "deliveryStatus"], (val, val2) => {
          if (val=== 4) {
            if (val2=== 1 || val2=== 2) {
              return yup
                .mixed()
                .nullable()
                .test(
                  "validFile",
                  "It is not a file Please Select One",
                  (value) => {
                    console.log(value);
                    console.log(this.state.taskType);
                    if (this.state.taskType=='Edit'){
                      if(value===null || value===undefined || typeof value === 'string'){
                        //console.log("Validate true")
                        console.log(value);
                        return true;
                      }
                    }else{
                      yup.mixed().required("Please select the Profile Picture");
                    }
                    if( value instanceof File) {
                      return true;
                    } else {
                      return false;
                    }
                  }
                )
                .test("fileType", "Unsupported File Format", (value) => {
                  if (value && value.type) {
                    return SUPPORTED_FORMATS.includes(value.type);
                  } else {
                    return true;
                  }
                })
                .test("fileSize", "File Size is too large", (value) => {
                  if (value && value instanceof File && value.size) {
                    return value.size <= FILE_SIZE;
                  } else {
                    return true;
                  }
                })
                .test("fileType", "Unsupported File Format", (value) => {
                  if (value && value.type) {
                    return SUPPORTED_FORMATS.includes(value.type);
                  } else {
                    return true;
                  }
                })
            }
          }
        }),
    });
    this.newServiceBull = {
      id: '',
      conceiveId: '',
      //bullID: '',
      bullID: '',
      matingProcessType: '',
      pregnancyStatus: '',
      deliveryStatus: "",
      deliveryDate: '',
      lactationNo: 1,
      dateOfService: '',
      birthWeight: '',
      birthHeight: '',
      damWeight: '',
      remarks: "",
      bullsName: "",
      cowName:'',
      cowTagNo:'',
      doctorID: "",
      doctorsName: "",
      name: "",
      tagNo: "",
      gender: "",
      picture: "",
      lactation: "",
      colour: '',
      breed: '',
    };
    this.serviceBull = {
      id: '',
      conceiveId: '',
      bullID: '',
      bullID: "",
      matingProcessType: '',
      pregnancyStatus: "",
      deliveryStatus: "",
      deliveryDate: '',
      lactationNo: '',
      dateOfService: new Date(), //"22/08/2017",
      birthWeight: '',
      birthHeight: '',
      damWeight: '',
      remarks: "",
      bullsName: "",
      bullsTagNo:"",
      cowName: "",
      cowTagNo:"",
      doctorsName: "",
      doctorID: "",
      name: "",
      tagNo: "",
      gender: "",
      picture: "",
      location: "",
      colour: '',
      breed: ''
    };
    this.formikProps = {
      initialValues: this.serviceBull,
      enableReinitialize: true,
      validateOnBlur: true,
      validateOnchange: true,
      validationSchema: this.bullNewServiceValidation,
      //setFieldValue:true,
      onSubmit: async (formValues, { setSubmitting, setFieldError,resetForm}) => {
        //console.log("Add Bull Service");
        var formData = new FormData();
        formData.append(
          "formFile",
          document.getElementById("bull_service_bull_image").files[0]
        );
        //if(formValues.bullID && formValues.bullID===this.context.selectedBull.id)
        var data_ = {
          id: formValues.conceiveId,
          bullID: this.context.selectedBull.id,
          cowID: formValues.cowID,
          //category: formValues.category,
          dateOfService: convertDate(formValues.dateOfService),
          pregnancyStatus:formValues.pregnancyStatus,
          matingProcessType:formValues.matingProcessType,
          doctorID:formValues.doctorID,
          remarks:formValues.remarks,
        }
        if(formValues.pregnancyStatus==4){
          data_.deliveryStatus=formValues.deliveryStatus;
          if(formValues.deliveryStatus==1 || formValues.deliveryStatus==2){
            data_.lactationNo = formValues.lactationNo;
            data_.deliveryDate = convertDate(formValues.deliveryDate);
            data_.birthWeight = formValues.birthWeight;
            data_.birthHeight = formValues.birthHeight;
            data_.damWeight = formValues.damWeight;
            data_.tagNo = formValues.tagNo;
            data_.name = formValues.name;
            data_.breed = formValues.breed;
            data_.colour = formValues.colour;
            data_.gender = formValues.gender;
            data_.location = formValues.location;
          }else if(formValues.deliveryStatus==3){
            data_.deliveryDate = formValues.deliveryDate;
          }
        }
        $.each(data_, function (k, val) {
          formData.append(k, val);
        });
        let api_type = 'Add';
        if(this.state.taskType==='Edit'){
          api_type="Edit"
        }
        this.templateManager.showLoading(`${api_type}ing Bull Service`);
        const requestOptions = {
          method: "POST",
          /*headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
          },*/
          body: formData,
        };
        let data = await fetch(
          `${apiUrl}BullService/${api_type}BullServiceData/`,
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
          
          this.templateManager.showSuccessMessage(data.data.message);
          this.resetServiceForm();
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
          let addService = prevState.addService;
          addService.doctorID = data.id;
          return addService;
        });
        this.formRef.current.setFieldValue('doctorID',data.id);
        this.formRef.current.setFieldValue('doctorsName',data.name);
      } else if ((type = "delete")) {
        await this.setState((prevState)=>{
          let addService = prevState.addService;
          addService.doctorID = '';
          return addService;
        });
        this.formRef.current.setFieldValue('doctorID','');
        this.formRef.current.setFieldValue('doctorsName','');
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
                  Add Service of Bull
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
                          <div className="title">Service Information</div>
                          {this.showErrors(errors)}
                          <table className="table">
                            <thead>
                              <tr>
                                <th colSpan="2">
                                  <div id="cs_table_title">
                                    Add Bull Service Information
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
                                    onClick={this.resetServiceForm}
                                  >
                                    <br />
                                    <span id="cs_reset">Reset&nbsp;</span>
                                  </span>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Date of Service</td>
                                <td>
                                  {/*<Field component={(props)=>{console.log(props);return <DateTimePicker />}}/><br/>*/}
                                  <DateTimePicker
                                    value={values.dateOfService}
                                    onChange={(date) => {setFieldValue('dateOfService',date);
                                      /*this.handleOnDateOfServiceChagne(date,setFieldValue);*/
                                    }}
                                    format="dd/MM/yyyy HH:mm:ss"
                                  />
                                  <br />
                                  {/*<input
                                    type="text"
                                     className="cpinput datepicker"
                                    value={values.dateOfService}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    id="bull_service_bull_date"
                                    name="dateOfService"
                                  />*/}
                                  <input
                                    type="hidden"
                                    value={this.context.selectedBull.id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="bullID"
                                    id="bull_service_bull_id"
                                  />
                                  <ErrorMessage name="dateOfService" component={TextError}/>
                                  <ErrorMessage name="id" component={TextError}/>
                                </td>
                              </tr>
                              <tr>
                                <td>Bull No</td>
                                <td>
                                  <span id="bull_service_bull_dam_tag_no">
                                    {values.bullName}
                                    {/*{values.tagNo} - {values.bullName} */}
                                  </span>
                                  {this.error(errors.bullID, touched)}
                                </td>
                              </tr>
                              <tr>
                                <td>Cow/Dam Tag No</td>
                                <td>
                                  <span id="bull_service_bull_sire_tag_no">
                                    {values.cowName} -{values.cowTagNo}
                                  </span>
                                  <input
                                    type="hidden"
                                    id="bull_service_bull_sire_id"
                                    name="cowID"
                                    value={values.cowID}
                                    onChange={() => {}}
                                  />
                                  <span
                                    className="fa fa-edit "
                                    id="bull_service_bull_select_sire"
                                    title="Select Sire"
                                    onClick={this.selectDam}
                                  ></span>
                                  {this.error(errors.bullID, touched)}
                                </td>
                              </tr>
                              <tr>
                                <td>Pregnancy Status of Cow</td>
                                <td>
                                  <select
                                    className="kgsdropdown cpinput"
                                    id="pregnancyStatus"
                                    name="pregnancyStatus"
                                    value={values.pregnancyStatus}
                                    onChange={async (e) => {
                                      this.onChangePregnancyStatus(e,setFieldValue,values.deliveryStatus);
                                    }}
                                    onBlur={handleBlur}
                                  >
                                    <option value="">
                                      Select Pregnancy Status
                                    </option>
                                    {Object.entries(
                                      this.context.pregnancy_status
                                    ).map((value, key) => {
                                      return (
                                        <option key={key} value={value[0]}>
                                          {value[1]}
                                        </option>
                                      );
                                    })}
                                  </select>
                                  {this.error(errors.pregnancyStatus, touched)}
                                </td>
                              </tr>
                              <tr className="succNorDel succDied">
                                <td>Delivery Status</td>
                                <td>
                                  <select
                                    className="kgsdropdown cpinput"
                                    id="bull_service_bull_delivery_status"
                                    name="deliveryStatus"
                                    value={values.deliveryStatus}
                                    onChange={(e) => {
                                      this.onChangeDeliveryStatus(e, setFieldValue,values.pregnancyStatus);
                                    }}
                                    onBlur={handleBlur}
                                  >
                                    <option value="">
                                      Select Delivery Status
                                    </option>
                                    {Object.entries(
                                      this.context.delivery_status
                                    ).map((value, key) => {
                                      return (
                                        <option key={key} value={value[0]}>
                                          {value[1]}
                                        </option>
                                      );
                                    })}
                                  </select>
                                  {this.error(errors.deliveryStatus, touched)}
                                </td>
                              </tr>
                              <tr className="succNorDel">
                                <td>Lactation Number of Cow</td>
                                <td>
                                  <input
                                    type="number"
                                    className="cpinput"
                                    id="bull_service_bull_lactation_number"
                                    name="lactationNo"
                                    value={values.lactationNo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  {this.error(errors.lactationNo, touched)}
                                </td>
                              </tr>
                              <tr className="succNorDel succDied">
                                <td id="td_bull_service_date_of_delivery">
                                  Date of Delivery
                                </td>
                                <td>
                                  <DateTimePicker
                                    value={values.deliveryDate}
                                    onChange={(date) => {
                                      this.handleOnDateOfDeliveryChagne(date);
                                    }}
                                    format="dd/MM/yyyy HH:mm:ss"
                                  />
                                  <br />
                                  {this.error(errors.deliveryDate, touched)}
                                </td>
                              </tr>
                              <tr className="succNorDel">
                                <td>Birth Weight</td>
                                <td>
                                  <input
                                    type="text"
                                    className="cpinput"
                                    id="bull_service_bull_birth_weight"
                                    name="birthWeight"
                                    value={values.birthWeight}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  {this.error(errors.birthWeight, touched)}
                                </td>
                              </tr>
                              <tr className="succNorDel">
                                <td>Birth Height</td>
                                <td>
                                  <input
                                    type="text"
                                    className="cpinput"
                                    id="bull_service_bull_birth_height"
                                    name="birthHeight"
                                    value={values.birthHeight}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  {this.error(errors.birthHeight, touched)}
                                </td>
                              </tr>
                              <tr className="succNorDel">
                                <td>Dam Weight</td>
                                <td>
                                  <input
                                    type="text"
                                    className="cpinput"
                                    id="bull_service_bull_dam_weight"
                                    name="damWeight"
                                    value={values.damWeight}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  {this.error(errors.damWeight, touched)}
                                </td>
                              </tr>
                              <tr className="succNorDel">
                                <td>Assign Tag No</td>
                                <td>
                                  <input
                                    type="text"
                                    className="cpinput"
                                    id="bull_service_bull_tag_no"
                                    name="tagNo"
                                    value={values.tagNo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  {this.error(errors.tagNo, touched)}
                                </td>
                              </tr>
                              <tr className="succNorDel">
                                <td>Assign Name</td>
                                <td>
                                  <input
                                    type="text"
                                    className="cpinput"
                                    id="bull_service_bull_name"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  {this.error(errors.name, touched)}
                                </td>
                              </tr>
                              <tr className="succNorDel">
                                <td>Colour</td>
                                <td>
                                  <select
                                    className="kgsdropdown cpinput"
                                    id="bull_service_bull_color"
                                    name="colour"
                                    value={values.colour}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  >
                                    <option value="">Select Color</option>
                                    {Object.entries(this.context.colors).map(
                                      (value, key) => {
                                        return (
                                          <option key={key} value={value[0]}>
                                            {value[1]}
                                          </option>
                                        );
                                      }
                                    )}
                                  </select>
                                  {this.error(errors.colour, touched)}
                                </td>
                              </tr>
                              <tr className="succNorDel">
                                <td>Breed</td>
                                <td>
                                  <select
                                    className="kgsdropdown cpinput"
                                    id="bull_service_bull_breed"
                                    name="breed"
                                    value={values.breed}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  >
                                    <option value="">Select One</option>
                                    {Object.entries(this.context.breeds).map(
                                      (value, key) => {
                                        return (
                                          <option key={key} value={value[0]}>
                                            {value[1]}
                                          </option>
                                        );
                                      }
                                    )}
                                  </select>
                                  {this.error(errors.breed, touched)}
                                </td>
                              </tr>
                              <tr className="succNorDel">
                                <td>Gender</td>
                                <td>
                                  <select
                                    className="kgsdropdown cpinput"
                                    id="bull_service_bull_gender"
                                    name="gender"
                                    value={values.gender}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  >
                                    <option value="">Select Gender</option>
                                    {Object.entries(this.context.gender).map(
                                      (value, key) => {
                                        return (
                                          <option key={key} value={value[0]}>
                                            {value[1]}
                                          </option>
                                        );
                                      }
                                    )}
                                  </select>
                                  {this.error(errors.gender, touched)}
                                </td>
                              </tr>
                              <tr>
                                <td>Select Doctor</td>
                                <td>
                                  <span id="bull_service_bull_doctor_name">
                                    {values.doctorsName}
                                  </span>
                                  <input
                                    type="hidden"
                                    id="bull_service_bull_doctor_id"
                                    name="doctorID"
                                    value={values.doctorID}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  <span
                                    className="fa fa-edit "
                                    id="bull_service_bull_select_doctor"
                                    title="Select Doctor"
                                    onClick={async () => {
                                      //console.log("select doctors");
                                      this.props.bullProfile.selectUserModal.currentObject =this;
                                      
                                      this.props.bullProfile.selectUserModal.setState({selectedDoctorId : this.state.addService.doctorID});
                                      this.props.bullProfile.selectUserModal.show();
                                    }}
                                  ></span>
                                  {this.error(errors.doctorID, touched)}
                                </td>
                              </tr>
                              <tr>
                                <td>Mating Type</td>
                                <td>
                                  <select
                                    className="kgsdropdown cpinput"
                                    id="matingProcessType"
                                    name="matingProcessType"
                                    value={values.matingProcessType}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  >
                                    <option value="">Select Mating Type</option>
                                    {Object.entries(
                                      this.context.mating_type
                                    ).map((value, key) => {
                                      return (
                                        <option key={key} value={value[0]}>
                                          {value[1]}
                                        </option>
                                      );
                                    })}
                                  </select>
                                  {this.error(
                                    errors.matingProcessType,
                                    touched
                                  )}
                                </td>
                              </tr>
                              <tr className="succNorDel">
                                <td>Child Location</td>
                                <td>
                                <select
                                    className="kgsdropdown cpinput"
                                    id="location"
                                    name="location"
                                    value={values.location}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  >
                                    <option value="">Select Child Location</option>
                                    {Object.entries(
                                      this.context.locations
                                    ).map((value, key) => {
                                      return (
                                        <option key={key} value={value[0]}>
                                          {value[1]}
                                        </option>
                                      );
                                    })}
                                  </select>
                                  {this.error(
                                    errors.location,
                                    touched
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td>Remarks</td>
                                <td>
                                  <textarea
                                    className="cpinput w-100"
                                    value={values.remarks}
                                    id="bull_service_bull_remarks"
                                    name="remarks"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  ></textarea>
                                </td>
                              </tr>
                              <tr className="succNorDel">
                                <td>Profile Pic</td>
                                <td>
                                  <img
                                    src={
                                      this.state.imageUrl +
                                      this.state.defaultImage
                                    }
                                    className="profile-pic"
                                    id="profile-pic-child"
                                  />
                                  <br />
                                  <br />
                                  <input
                                    className="file-input"
                                    type="file"
                                    placeholder=""
                                    id="bull_service_bull_image"
                                    name="picture"
                                    accept="image/png, image/jpeg"
                                    onChange={(e) => {
                                      this.bullImageOnChange(e,setFieldValue);
                                    }}
                                    onBlur={handleBlur}
                                  />
                                  {this.error(errors.picture, errors.touched)}
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
    
    await this.setBullData();
    await this.setState({taskType: 'Edit'},()=>{this.setModalState('Edit');this.formRef.current.validateForm();});
  }
  resetServiceForm =async()=>{
    let fields = ['id','dateOfService','bullID','bullID','bullsName','bullsTagNo','bullName','pregnancyStatus','deliveryStatus','lactationNo','deliveryDate','birthWeight','birthHeight','damWeight','tagNo','name', 'colour','breed','gender','doctorID','doctorsName','matingProcessType','remarks','picture','location']; //getlocation
    fields.map((value,index)=>{
      this.formRef.current.setFieldValue(value,'');
    });
    document.getElementById('profile-pic-child').src=this.state.imageUrl+this.state.defaultImage;
    document.getElementById('bull_service_bull_image').value = "";
    var elements = document.getElementsByClassName("succNorDel"); //.style('display','none');
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }
    var elements = document.getElementsByClassName("succDied"); //.style('display','none');
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }
    this.setBullData();
    await this.setState({taskType: 'Add'},()=>{this.setModalState('Add');});
  }
  setBullData=()=>{
    this.formRef.current.setFieldValue('bullID',this.context.selectedBull.id);
    this.formRef.current.setFieldValue('bullName',`${this.context.selectedBull.name}-${this.context.selectedBull.tagNo}`);    
  }
  setModalState=(taskType='Add')=>{
    if(taskType==='Add'){
      $('#cs_save_update').parent().removeClass('updateBtn');
      $('#cs_save_update').html("Save");
      $('#cs_table_title').html(`Add ${this.state.animal_type} Service Information`);
      $('#addServiceDetailModal div.modal-header>h5.modal-title').html(`Add Service of ${this.state.animal_type}`);
    }else if(taskType==='Edit'){
      console.log('Edit');
      $('#cs_save_update').parent().addClass('updateBtn');
      $('#cs_save_update').html("Update");
      $('#cs_table_title').html(`Update ${this.state.animal_type}  Service Information`);
      $('#addServiceDetailModal div.modal-header>h5.modal-title').html(`Update Service of ${this.state.animal_type} `);
    }else{
      console.log('Add');
      taskType = 'Add';
      $('#cs_save_update').parent().removeClass('updateBtn');
      $('#cs_save_update').html("Save");
      $('#cs_table_title').html(`Add ${this.state.animal_type}  Service Information`);
      $('#addServiceDetailModal div.modal-header>h5.modal-title').html(`Add Service of ${this.state.animal_type} `);
    }
  } 
}
