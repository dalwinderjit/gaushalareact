import React, { Component } from "react";
import $ from "jquery";
import TemplateContext, {
  TemplateProvider,
} from "../../../context/TemplateContext";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import CowContext from "../../../context/CowContext";
import { apiUrl, convertDate, imageUrl } from "../../../context/AppContext";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateTimePicker from "react-datetime-picker";
import "../../../css/mystyle.css";
import TextError from "../Templates/TextError";
export const FILE_SIZE = 102400;
export const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export default class AddCowMilkingStartStopDetail extends Component {
  static contextType = CowContext;
  constructor(props) {
    super(props);
    this.state = {
      taskType: "Add",
      animal_type: "Cow",
    };
    this.templateManager = props.templateManager;
    this.cowMilkStartStopValidation = yup.object().shape({
      Id: yup.number().when([], () => {
        if (this.state.taskType === "Edit") {
          return yup
            .number()
            .typeError("Invalid cow Service ID")
            .required("Please select the Cow Milk Status");
        }
      }), //typeError("Invalid cow Service ID"),
      CowID: yup.number().required("Please Select the Cow!"),
      Date: yup
        .date()
        .typeError("Invalid Date Entered!")
        .required("Please Enter Start Stop Date!"),
      LactationNo: yup.number().required("Please Enter the Lactation Number!"),
      MilkStatus: yup.string().required("Please select the Milk Status!"),
      Reason: yup.string().typeError("Invalid Reason!").required("Please Enter the Reason"),
    });
    this.newCowMilkStartStop = {
      Id: "",
      CowID: '',
      CowName:'',
      Date: "",
      LactationNo: '',
      Reason: "",
      MilkStatus: ""
    };
    this.cowMilkStartStopInitialValues = {
      Id: "",
      CowID: '',
      CowName:'',
      Date: "",
      LactationNo: '',
      Reason: "",
      MilkStatus: ""
    };
    this.formikProps = {
      initialValues: this.cowMilkStartStopInitialValues,
      enableReinitialize: true,
      validateOnBlur: true,
      validateOnchange: true,
      validationSchema: this.cowMilkStartStopValidation,
      //setFieldValue:true,
      onSubmit: async (
        formValues,
        { setSubmitting, setFieldError, resetForm }
      ) => {
        //console.log("Add Cow Service");
        
        //if(formValues.cowID && formValues.cowID===this.context.selectedCow.id)
        var formData = new FormData();
        formData.append(
          "formFile",
          document.getElementById("cow_service_cow_image").files[0]
        );
        var data_ = {
          Id: formValues.Id,
          CowID: this.context.selectedCow.id,
          LactationNo: formValues.LactationNo,
          Date: convertDate(formValues.Date),
          MilkStatus: formValues.MilkStatus,
          Reason: formValues.Reason
        };
        Object.entries(data_).map((values,index)=>{
          formData.append(values[0],values[1]);
        })
        let api_type = "Add";
        if (this.state.taskType === "Edit") {
          api_type = "Edit";
        }
        this.templateManager.showLoading(`${api_type}ing Cow Milking Status`);
        const requestOptions = {
          method: "POST",
          body: formData
        };
        let data = await fetch(
          `${apiUrl}Milking/${api_type}CowMilkingStartStopDetail/`,
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
        //console.log(data);
        if (data.data.status === "success") {
          this.templateManager.showSuccessMessage(data.data.message);
          this.resetCowMilkStartStop();
          this.hide();
          this.props.cowProfile.milkingChart.tableMilkStartStopDetail.loadData();
          await this.setState({ taskType: "Add" }, () => {
            this.setModalState("Add");
          });
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
  componentDidMount = async () => {};
  error(error, touched) {
    if (error || touched) {
      if (error && error.trim().length > 0) {
        return <label className="error-label">{error}</label>;
      } else {
        return "";
      }
    }
  }
  updateSelectedCow() {
    //required
    this.formRef.current.setFieldValue("CowID", this.context.selectedCow.id);
    this.formRef.current.setFieldValue(
      "CowName",
      `${this.context.selectedCow.name}-${this.context.selectedCow.tagNo}`
    );
  }
  render() {
    return (
      <>
        <div
          ref={(ref) => {
            this.modal = ref;
          }}
          className="modal fade"
          id="addCowMilkStartStopDetailModal"
          tabIndex="-5"
          aria-hidden="true"
          style={{ zIndex: 10 }}
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Cow's Milking Start/Stop Detail
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
                <Form id="cow_milk_start_stop_form" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="title">Cow's Milk Start/Stop Detail</div>

                      <table className="table">
                        <thead>
                          <tr>
                            <th colSpan="2">
                              <div id="cs_table_title">
                                Add Cow Milk Start/Stop Information
                              </div>
                              <span className="fa fa-save addCowMilkStartStopBtn" onClick={handleSubmit}>
                                <br />
                                <span id="cs_save_update">Save</span>
                              </span>
                              <span
                                    className="fa fa-redo addCowConceiveBtn"
                                    onClick={this.resetCowMilkStartStop}
                                  >
                                    <br />
                                    <span id="cs_reset">Reset&nbsp;</span>
                                  </span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Cow No</td>
                            <td>
                              <span id="cow_milk_start_stop_cow_tag_no">
                              {values.CowName}
                              </span>
                              <ErrorMessage name="Id" component={TextError}/>
                              <ErrorMessage name="CowID" component={TextError}/>
                            </td>
                          </tr>
                          <tr>
                            <td>Date </td>
                            <td>
                              <DateTimePicker value={values.Date} onChange={(date) => {setFieldValue('Date',date);}}/><br/>
                              <Field
                                type="hidden"
                                id="Id"
                                name="Id"
                                value={values.Id}
                              />
                              <ErrorMessage name="Date" component={TextError}/>
                            </td>
                          </tr>
                          <tr>
                            <td>Lactation Number </td>
                            <td>
                              <Field className="cpinput" id="LactationNo" name="LactationNo"/>
                              <ErrorMessage name="LactationNo" component={TextError}/>
                            </td>
                          </tr>
                          <tr>
                            <td>Select Status</td>
                            <td>
                              <Field as="select"
                                className="kgsdropdown cpinput"
                                id="MilkStatus"
                                name="MilkStatus"
                              >
                                <option value=''>Please Select Status</option>
                                {Object.entries(this.context.milkStatus).map((value,index)=>{
                                  return <option key={index} value={value[0]}>{value[1]}</option>
                                })}
                              </Field>
                              <ErrorMessage name="MilkStatus" component={TextError}/>
                            </td>
                          </tr>
                          <tr>
                            <td>Reason</td>
                            <td>
                              <Field as="textarea"
                                className="cpinput w-100"
                                id="Reason"
                                name="Reason"
                              />
                              <ErrorMessage name="Reason" component={TextError}/>
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
              
            </div>
          </div>
        </div>
      </>
    );
  }
  show = async () => {
    $("body").css("overflow", "hidden");
    this.setModalState(this.state.taskType);
    await $("#addCowMilkStartStopDetailModal").css("display", "block");
    setTimeout(() => {
      $("#addCowMilkStartStopDetailModal").addClass("show");
    }, 1);
  };
  hide = async () => {
    console.log('hiding');
    $("body").css("overflow", "auto");
    await $("#addCowMilkStartStopDetailModal").css("display", "");
    $("#addCowMilkStartStopDetailModal").removeClass("show");
  };
  setDataToForm = async (data) => {
    if (data.Date != "") {
      data.Date = new Date(Date.parse(data.Date));
    } else {
      data.Date = "";
    }
    let fields = [
      "Id",
      "CowID",
      "Date",
      "LactationNo",
      "MilkStatus",
      "Reason"
    ];
    console.log(this.formRef.current);
    fields.map((value, index) => {
        this.formRef.current.setFieldValue(value, data[value]);
    });
    await this.setCowData();
    await this.setState({ taskType: "Edit" }, () => {
      this.setModalState("Edit");
      this.formRef.current.validateForm();
    });
  };
  resetCowMilkStartStop = async () => {
    let fields = [
      "Id",
      "CowID",
      "Date",
      "LactationNo",
      "MilkStatus",
      "Reason"
    ];
    fields.map((value, index) => {
      this.formRef.current.setFieldValue(value, "");
    });
    this.setCowData();
    await this.setState({ taskType: "Add" }, () => {
      this.setModalState("Add");
    });
  };
  setCowData = () => {
    this.formRef.current.setFieldValue("CowID", this.context.selectedCow.id);
    this.formRef.current.setFieldValue(
      "CowName",
      `${this.context.selectedCow.name}-${this.context.selectedCow.tagNo}`
    );
  };
  setModalState = (taskType = "Add") => {
    if (taskType === "Add") {
      $("#cs_save_update").parent().removeClass("updateBtn");
      $("#cs_save_update").html("Save");
      $("#cs_table_title").html(
        `Add Cow Milk Start/Stop Information`
      );
      $("#addCowMilkStartStopDetailModal div.modal-header>h5.modal-title").html(
        `Add Cow Milk Start/Stop Information`
      );
    } else if (taskType === "Edit") {
      console.log("Edit");
      $("#cs_save_update").parent().addClass("updateBtn");
      $("#cs_save_update").html("Update");
      $("#cs_table_title").html(
        `Update Cow Milk Start/Stop Information`
      );
      $("#addCowMilkStartStopDetailModal div.modal-header>h5.modal-title").html(
        `Update Cow Milk Start/Stop Information`
      );
    } else {
      console.log("Add");
      taskType = "Add";
      $("#cs_save_update").parent().removeClass("updateBtn");
      $("#cs_save_update").html("Save");
      $("#cs_table_title").html(
        `Add Cow Milk Start/Stop Information`
      );
      $("#addCowMilkStartStopDetailModal div.modal-header>h5.modal-title").html(
        `Add Cow Milk Start/Stop Information`
      );
    }
  };
}
