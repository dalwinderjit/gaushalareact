import React, { Component } from "react";
import DateTimePicker from "react-datetime-picker";
import $ from "jquery";
import TemplateContext from "../../../context/TemplateContext";
import { Formik } from "formik";
import * as yup from "yup";
import CalfContext from "../../../context/CalfContext";
import { convertDate2, apiUrl, imageUrl } from "../../../context/AppContext";
export const FILE_SIZE = 102400; //100KB
export const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "images/jpg",
  "image/JPEG",
  "images/JPG",
  "image/png",
];

export default class CalfProfileEditForm extends Component {
  static contextType = CalfContext;
  constructor(props) {
    super(props);
    this.formikReference = React.createRef();
    this.state = {
      calf: {
        id: 1,
        tagNo: null,
        name: "",
        dob: "",
        category: "",
        gender: "",
        breed: "",
        colour: "",
        colour_: "",
        sireID: "",
        damID: "",
        sireNo: "",
        sireName: "",
        damNo: "",
        damName: "",
        dbly: "",
        sdbly: "",
        butterFat: "",
        pregnancyStatus: "",
        status: "",
        reproductiveStatus: false,
        milkingStatus: false,
        remarks: "",
        additionalInfo: "",
        picture: "calf_default.jpg",
        lactation: 0,
        type: "",
        weight: "",
        height: "",
        semenDoses: "",
        noOfTeatsWorking: "",
        location: "",
        calfDataSet: false,
      },
      imageUrl: imageUrl,
      calvingDetail: {
        data: [],
        status: true,
        recordsFiltered: 0,
        recordsTotal: 0,
        pageNo: 1,
        recordsPerPage: 10,
      },
      interCalvPeriod: {},
    };
    this.calfEditSchema = yup.object().shape({
      id: yup.number().required("Please Enter Username"),
      tagNo: yup.string().required("Please Enter TagNo"),
      name: yup.string().required("Please Enter name"),
      dob: yup
        .date()
        .typeError("Invalid Date of Birth Entered")
        .required("Please Enter Date of Birth"),
      category: yup.string().required("Please Select Category"),
      gender: yup.string().required("Please Select gender"),
      breed: yup.string().required("Please Select Breed"),
      colour: yup.string().required("Please Select Colour"),
      sireID: yup
        .number()
        .typeError("Invalid Sire Selection")
        .required("Please Select Sire"),
      damID: yup
        .number()
        .typeError("Invalid Dam Selection")
        .required("Please Select Dam"),
      remarks: yup.string(),
      picture: yup
        .mixed()
        .nullable()
        .test("fileSize", "File Size is too large", (value) => {
          console.log(value);
          if (value && value.size) {
            return value.size <= FILE_SIZE;
          } else {
            console.log("not found");
            return true;
          }
        })
        .test("fileType", "Unsupported File Format", (value) => {
          console.log(value);
          if (value && value.type) {
            return SUPPORTED_FORMATS.includes(value.type);
          } else {
            return true;
          }
        }),
      weight: yup
        .number()
        .typeError("Invalid Weight")
        .required("Please Enter Weight"),
      height: yup
        .number()
        .typeError("Invalid Height")
        .required("Please Enter height"),
      location: yup.number().required("Please Select Location"),
    });
    this.editCalf = {
      id: "",
      tagNo: null,
      name: "",
      dob: "",
      category: "",
      gender: "",
      breed: "",
      colour: "",
      colour_: "",
      sireID: "",
      damID: "",
      sireNo: "",
      sireName: "",
      damNo: "",
      damName: "",
      dbly: "",
      sdbly: "",
      status: "",
      remarks: "",
      additionalInfo: "",
      picture: null,
      type: "",
      weight: "",
      height: "",
      location: "",
      calfDataSet: false,
      sold: false,
    };
    this.formikProps = {
      initialValues: this.editCalf,
      enableReinitialize: true,
      validateOnBlur: true,
      validateOnchange: true,
      validationSchema: this.calfEditSchema,
      onSubmit: async (formValues, { setSubmitting, setFieldError }) => {
        $("label.error-label").remove();
        var formData = new FormData();
        formData.append("formFile", $("#calf_edit_calf_image")[0].files[0]);
        //console.log(this.context);
        var data_ = {
          id: formValues.id,
          tagNo: formValues.tagNo,
          name: formValues.name,
          category: formValues.category,
          dob: convertDate2(formValues.dob),
          breed: formValues.breed,
          lactation: formValues.lactation,
          //$('#calf_edit_calf_dam_tag_no').html('');
          damID: formValues.damID,
          //$('#calf_edit_calf_dam_name').html();
          //$('#calf_edit_calf_sire_tag_no').html('');
          //$('#calf_edit_calf_sire_name').html('');
          sireID: formValues.sireID,
          colour: formValues.colour,
          weight: formValues.weight,
          height: formValues.height,
          //$('#calf_edit_calf_dam_bly').html('');
          //	$('#calf_edit_calf_sire_dam_bly').html('');
          butterFat: formValues.butterFat,
          noOfTeatsWorking: formValues.noOfTeatsWorking,
          location: formValues.location,
          remarks: formValues.remarks,
          pregnancyStatus: formValues.pregnancyStatus,
          milkingStatus: formValues.milkingStatus,
        };
        $.each(data_, function (k, val) {
          formData.append(k, val);
        });
        this.templateManager.showLoading("Updating Calf");
        const requestOptions = {
          method: "POST",
          /*headers: {
              'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
            },*/
          body: formData,
        };
        let data = await fetch(`${apiUrl}Calfs/SaveCalf/`, requestOptions)
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

        if (data.data.status === "Success") {
          this.templateManager.showSuccessMessage(data.data.message);
          this.disableEditForm();
        } else {
          //console.log(data.errors);
          setFieldError("tagNo", data.errors.tagNo);
          this.templateManager.showErrorMessage(data.data.message);
        }
      },
    };
    this.templateManager = props.templateManager;
    //console.log(this.templateManager);
  }
  async getDataByCalfId(id) {
    //this.templateManager.showLoading("Loading Calf Data");
    $("#search-result-list").css("display", "none");
    let data = await fetch(`${apiUrl}Calfs/GetCalfById/` + id)
      .then((res) => res.json())
      .then(
        (result) => {
          //console.log('result retrieved')
          return result;
        },
        (error) => {
          //console.log("error");
          //console.log(error);
          return error;
        }
      );
    if (data.success === true) {
      this.context.calfID = data.data.id;
      this.context.selectedCalf.id = data.data.id;
      this.context.selectedCalf.name = data.data.name;
      this.context.selectedCalf.tagNo = data.data.tagNo;
      this.props.calfProfile.medicationDetail.updateSelectedCalf();
      data = await this.formatCalfData(data);
      await this.setState((prevState) => {
        let calf = Object.assign({}, prevState.calf);
        calf = data.data;
        calf.calfDataSet = true;
        return { calf };
      });
      alert("Set Calf Data from api here,Provide the list of variable need to be set! in array")
      let tempData_ = Object.entries(data.data);
      for(let i=0;i<tempData_.length;i++){
        this.formikref.setFieldValue(tempData_[i][0],tempData_[i][1]);
      }
      //this.formikProps.initialValues = data.data;
      //this.props.templateManager.showSuccessMessage(data.message);
    } else {
      //show error message
      //console.log('show error message');
      await this.setState((prevState) => {
        let calf = Object.assign({}, prevState.calf);
        calf.calfDataSet = false;
        return { calf };
      });
      this.props.templateManager.showErrorMessage(data.message);
    }
    this.props.templateManager.hideLoading();
  }
  async formatCalfData(data) {
    let calf = data.data;
    for (const [key, value] of Object.entries(data.data)) {
      if (key === "dob") {
        if (value !== null && value !== "") {
          calf["dob"] = new Date(Date.parse(value));
        }
      } else if (value === null) {
        calf[`${key}`] = "";
      }
    }
    data.data = calf;
    return data;
  }
  loadCalfWholeData = async (id) => {
    this.getDataByCalfId(id);
  };

  componentDidMount = () => {
    //console.log("COW PROFILE EDIT FORM MOUNT");
    //setTimeout(async ()=>{ await this.getDataByCalfId(1);this.convertToEditForm()},100);
    //console.log(this.templateManager);
    //this.templateManager.showLoading("I am Mounted");
    //setTimeout(()=>{this.templateManager.hideLoading()},2000)
    //console.log(this.formikref);
  };
  error(error, touched) {
    if (error || touched) {
      return <label className="error-label">{error}</label>;
    } else {
      return "";
    }
  }
  selectDam = () => {
    console.log("selection dam modal");
    //this.props.calfProfile.selectDamModal.type = 'editCalf';
    //this.props.calfProfile.selectDamModal.calfEdit = this;
    this.props.calfProfile.selectDamModal.currentObject = this;
    this.props.calfProfile.selectDamModal.setState({
      selectedRecord: this.state.calf.damID,
    });
    this.props.calfProfile.selectDamModal.show();
  };
  selectSire = () => {
    //console.log("selection sire modal 123")
    //this.props.calfProfile.selectSireModal.type = 'editCalf';
    //this.props.calfProfile.selectSireModal.calfEdit = this;
    this.props.calfProfile.selectSireModal.currentObject = this;
    this.props.calfProfile.selectSireModal.setState({
      selectedRecord: this.state.calf.sireID,
    });
    this.props.calfProfile.selectSireModal.show();
    //this.props.calfProfile.selectSire();
    //this.props.calfProfile.selectSireModal.show();
  };
  setDam = async (data) => {
    console.log("setting dam");
    this.formikProps.initialValues.damNo = data.tagNo;
    this.formikProps.initialValues.damName = data.name;
    this.formikProps.initialValues.damID = data.id;
    this.forceUpdate();
  };
  setSire = async (data) => {
    //console.log('settign sire');
    this.formikProps.initialValues.sireNo = data.tagNo;
    this.formikProps.initialValues.sireName = data.name;
    this.formikProps.initialValues.sireID = data.id;
    this.forceUpdate();
  };
  render() {
    //this.formikProps.initialValues = this.state.calf;
    //console.log("COW PROFILE EDIT FORM render");
    //console.log(this.context);
    return (
      <>
        <TemplateContext.Consumer>
          {(values) => {
            this.templateManager = values.templateManager;
          }}
        </TemplateContext.Consumer>
        <Formik
          {...this.formikProps}
          innerRef={(ref) => {
            this.formikref = ref;
          }}
        >
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
            <form id="calf_edit_calf_form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="title">General Information</div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th colSpan="2">
                          <div>Calf General Information</div>
                          <span
                            className="fa fa-edit editCowBtn"
                            onClick={this.convertToEditForm}
                          >
                            <br />
                            <span>Edit</span>
                          </span>
                          <span
                            className="fa fa-save saveCowBtn"
                            onClick={handleSubmit}
                          >
                            <br />
                            <span>Save</span>
                          </span>
                          <span
                            className="fa fa-plus-circle newCowBtn"
                            style={{ float: "right" }}
                            onClick={() => {
                              this.props.calfProfile.showNewCalfModal();
                            }}
                          >
                            <br />
                            <span>New</span>
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Calf No/Tag</td>
                        <td>
                          <input
                            type="hidden"
                            id="calf_edit_calf_id"
                            value={values.id}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <input
                            type="text"
                            value={values.tagNo || ""}
                            className="cpinput-disabled"
                            id="calf_edit_calf_tag_no"
                            name="tagNo"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {this.error(errors.tagNo, errors.touched)}
                        </td>
                      </tr>
                      <tr>
                        <td>Calf Name</td>
                        <td>
                          <input
                            type="text"
                            className="cpinput-disabled"
                            disabled
                            id="calf_edit_calf_name"
                            name="name"
                            value={values.name || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {this.error(errors.name, errors.touched)}
                        </td>
                      </tr>
                      <tr>
                        <td>Date of Birth</td>
                        <td>
                          <DateTimePicker
                            id="calf_edit_calf_dob"
                            disabled={false}
                            value={values.dob}
                            onChange={(val) => {
                              setFieldValue("dob", val);
                            }}
                            format={`dd/MM/yyyy`}
                          />
                          <br />
                          {this.error(errors.dob, errors.touched)}
                        </td>
                      </tr>
                      <tr>
                        <td>Breed</td>
                        <td>
                          <select
                            className="kgsdropdown cpinput-disabled"
                            id="calf_edit_calf_breed"
                            name="breed"
                            disabled
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.breed}
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
                          {this.error(errors.breed, errors.touched)}
                        </td>
                      </tr>
                      <tr>
                        <td>Color</td>
                        <td>
                          <select
                            className="kgsdropdown cpinput-disabled"
                            id="calf_edit_calf_color"
                            name="colour"
                            disabled
                            value={values.colour}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="">Choose One</option>
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
                          {this.error(errors.colour, errors.touched)}
                        </td>
                      </tr>
                      <tr>
                        <td>Weight</td>
                        <td>
                          <input
                            type="text"
                            className="cpinput-disabled"
                            value={values.weight}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled
                            id="calf_edit_calf_weight"
                            name="weight"
                          />
                          {this.error(errors.weight, errors.touched)}
                        </td>
                      </tr>
                      <tr>
                        <td>Height</td>
                        <td>
                          <input
                            type="text"
                            className="cpinput-disabled"
                            disabled
                            id="calf_edit_calf_height"
                            name="height"
                            value={values.height}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {this.error(errors.height, errors.touched)}
                        </td>
                      </tr>
                      <tr>
                        <td>Sire No/Tag</td>
                        <td>
                          <span id="calf_edit_calf_sire_tag_no">
                            {this.state.calf.sireNo}
                          </span>
                          <span
                            className="fa fa-edit disabled"
                            id="calf_edit_calf_select_sire"
                            title="Select Sire"
                            onClick={(e) => {
                              if (!e.target.classList.contains("disabled")) {
                                this.selectSire();
                              }
                            }}
                          ></span>
                          <input
                            type="hidden"
                            id="calf_edit_calf_sire_id"
                            name="calf_edit_calf_sire_id"
                            value={values.sireID}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {this.error(errors.sireID, errors.touched)}
                        </td>
                      </tr>
                      <tr>
                        <td>Sire Name</td>
                        <td>
                          <span id="calf_edit_calf_sire_name">
                            {this.state.calf.sireName}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>Dam No/Tag</td>
                        <td>
                          <span id="calf_edit_calf_dam_tag_no">
                            {this.state.calf.damNo}
                          </span>
                          <span
                            className="fa fa-edit disabled"
                            id="calf_edit_calf_select_dam"
                            title="Select Dam"
                            onClick={(e) => {
                              if (!e.target.classList.contains("disabled")) {
                                this.selectDam();
                              }
                            }}
                          ></span>
                          <input
                            type="hidden"
                            id="calf_edit_calf_dam_id"
                            name="damID"
                            value={values.damID}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {this.error(errors.damID, errors.touched)}
                        </td>
                      </tr>
                      <tr>
                        <td>Dam Name</td>
                        <td>
                          <span id="calf_edit_calf_dam_name">
                            {this.state.calf.damName}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>Dam's Bly</td>
                        <td>
                          <span id="calf_edit_calf_dam_bly">
                            {this.state.calf.damBLY}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>Sire's DBLY</td>
                        <td>
                          <span id="calf_edit_calf_sire_dam_bly">
                            {this.state.calf.sireDBLY}
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td>Calf Sold</td>
                        <td>
                          {values.sold === false ? (
                            <button
                              type="button"
                              onClick={this.showSellCalfModal}
                              className="btn btn-success btn-sm"
                            >
                              Sell Calf
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={this.getSellCalfDetail}
                              className="btn btn-success btn-sm"
                            >
                              Edit Sell Calf
                            </button>
                          )}{" "}
                          <input
                            type="checkbox"
                            checked={values.sold}
                            onChange={() => {}}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Calf Location</td>
                        <td>
                          <select
                            className="kgsdropdown cpinput-disabled"
                            id="calf_edit_calf_location"
                            name="location"
                            disabled
                            value={values.location}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
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
                      <tr>
                        <td>Remarks</td>
                        <td>
                          <textarea
                            className="cpinput-disabled"
                            disabled
                            id="calf_edit_calf_remarks"
                            name="remarks"
                            style={{ width: "100%" }}
                            value={values.remarks}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          ></textarea>
                          {this.error(errors.remarks, errors.touched)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-md-6">
                  <div>
                    <div className="title title2" id="calf-title">
                      {values.tagNo}
                    </div>
                    <img
                      src={this.state.imageUrl + this.state.calf.picture}
                      className="profile-pic"
                      id="profile-pic"
                      alt="calf profile"
                    />
                    <br />
                    <br />
                    <input
                      className="file-input"
                      type="file"
                      placeholder=""
                      id="calf_edit_calf_image"
                      name="picture"
                      accept="image/png, image/jpeg"
                      onChange={(e) => {
                        this.calfImageOnChange(e);
                      }}
                    />
                    {this.error(errors.picture, errors.touched)}
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </>
    );
  }
  calfImageOnChange = (e) => {
    this.formikProps.initialValues.picture = e.target.files[0];
    this.templateManager.readURL(e.target, "profile-pic");
    this.forceUpdate();
    //console.log('Image on Change');
  };
  convertToEditForm = () => {
    var ids = [
      "calf_id",
      "calf_tag_no",
      "calf_name",
      "calf_dob",
      "calf_breed",
      "calf_lactation",
      "calf_color",
      "calf_weight",
      "calf_height",
      "calf_butter_fat",
      "calf_teats_working",
      "calf_location",
      "calf_pregnancy_status",
      "calf_remarks",
    ];
    var ids2 = ["calf_select_dam", "calf_select_sire"];
    $.each(ids, function (id, val) {
      $("#calf_edit_" + val)
        .addClass("cpinput")
        .removeAttr("disabled")
        .removeClass("cpinput-disabled");
    });
    $.each(ids2, function (id, val) {
      $("#calf_edit_" + val).removeClass("disabled");
      $("#calf_edit_" + val).attr("disabled", "disabled");
    });
    this.hideEditCalfButton();
    this.showSaveCalfButton();
  };
  disableEditForm() {
    var ids = [
      "calf_id",
      "calf_tag_no",
      "calf_name",
      "calf_dob",
      "calf_breed",
      "calf_lactation",
      "calf_color",
      "calf_weight",
      "calf_height",
      "calf_butter_fat",
      "calf_remarks",
      "calf_location",
      "calf_teats_working",
      "calf_pregnancy_status",
    ];
    var ids2 = ["calf_select_dam", "calf_select_sire"];
    $.each(ids, function (id, val) {
      $("#calf_edit_" + val)
        .addClass("cpinput-disabled")
        .attr("disabled", true)
        .removeClass("cpinput");
    });

    $.each(ids2, function (id, val) {
      $("#calf_edit_" + val).addClass("disabled");
      $("#calf_edit_" + val).attr("disabled", "disabled");
    });
    this.showEditCalfButton();
    this.hideSaveCalfButton();
  }
  showEditCalfButton() {
    $(".editCalfBtn").css("display", "");
  }
  hideEditCalfButton() {
    $(".editCalfBtn").css("display", "none");
  }
  showSaveCalfButton() {
    $(".saveCalfBtn").css("display", "block");
  }
  hideSaveCalfButton() {
    $(".saveCalfBtn").css("display", "none");
  }
  showSellCalfModal = () => {
    this.props.calfProfile.sellCalfModal.show();
  };
  getSellCalfDetail = async () => {
    let status = await this.props.calfProfile.sellCalfModal.getSellCalfDetail();
    if (status === true) {
      this.props.calfProfile.sellCalfModal.show();
    }
  };
  setSellCalf = (type = true) => {
    this.formikref.setFieldValue("sold", type);
  };

}
