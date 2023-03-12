import React, { Component } from "react";
import DateTimePicker from "react-datetime-picker";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from "../Templates/TextError";
import Select, { components } from "react-select";
import { convertDate, apiUrl } from "../../../context/AppContext";
import $ from "jquery";
import Table from "../../Table";
import FormField from "../Templates/FormField";
import axios from "axios";


export default class AnimalMedicationDetail extends Component {
  /*static contextType = BullContext;*/
  animalType = 'Cow';
  constructor(props) {
    super(props);
    this.state = {
      taskType: "Add",
      doctorMultipleSelection: true,
      data:[],
      diseaseOptions:[]
    };
    if(props.animalType){
      this.animalType = props.animalType;
    }
    
    /*this.propnosis_options = [
      { value: 1, label: "Poor" },
      { value: 2, label: "Good" },
    ];*/
    this.prognosis_options = { 1: "Poor", 2: "Good"};
    this.medicationValidation = yup.object().shape({
      Id: yup.number().when([], () => {
        if (this.state.taskType === "Edit") {
          return yup
            .number()
            .typeError("Invalid cow Medication ID")
            .required(`Please select the ${this.animalType} Medication again`);
        }
      }),
      Date: yup
        .date()
        .typeError("Invalid Date Entered")
        .required("Please Enter Date"),
      AnimalID: yup.number().required(`Please Select the ${this.animalType}`),
      //AnimalNo:yup.number().required("Please Select the Cow"),,
      //Disease: yup.string().required("Please Enter the Disease"),
      DiseaseID:  yup
      .object()
      .shape({
        label: yup.string(),
        value: yup.number().required("Plsease select the Disease"),
      })
      .required("Please select Disease"),
      Symptoms: yup.string().required("Please Enter the Symptoms"),
      Diagnosis: yup.string().required("Please Enter the Diagnosis"),
      Treatment: yup.string().required("Please Enter the Treatment"),
      //Prognosis: yup.number().required("Please Select the Prognosis"),
      Prognosis: yup
        .object()
        .shape({
          label: yup.string(),
          value: yup.number().required("Plsease select the Prognosis"),
        })
        .required("Please select Prognosis"),
      Result: yup.string().required("Please Enter the Result"),
      CostOfTreatment2: yup
        .number()
        .min(0, "Please enter valid Cost")
        .required("Please Enter the Cost of Treatment"),
      Remarks: yup.string().required("Please Enter the Remarks"),
      //DoctorDetail:'',
      DoctorIDs: yup
        .array()
        .of(yup.number())
        .required("Please Select the Doctors"),
    });
    
    
    this.formikProps = {
      initialValues: {
        Id: "",
        Date: "",
        AnimalID: '',
        AnimalNo: '',
        AnimalName: '',
        Disease: "",
        DiseaseID: "",
        Symptoms: "",
        Diagnosis: "",
        Treatment: "",
        Prognosis: "",
        Result: "",
        CostOfTreatment2: "",
        Remarks: "",
        DoctorDetail: "",
        DoctorIDs: "",
        doctors: {},
      },
      enableReinitialize: true,
      validateOnBlur: true,
      validateOnchange: true,
      validationSchema: this.medicationValidation,
      //setFieldValue:true,
      onSubmit: async (
        formValues,
        { setSubmitting, setFieldError, resetForm }
      ) => {
        let queryString = "";
        //console.log(formValues.Date);
        //console.log(convertDate(formValues.Date));
        //return;
        var data_ = {
          Id:formValues.Id,
          Date: convertDate(formValues.Date),
          AnimalID: this.props.animalProfile.context.getSelectedAnimalID(),
          //Disease: formValues.Disease,
          DiseaseID: formValues.DiseaseID.value,
          Symptoms: formValues.Symptoms,
          Diagnosis: formValues.Diagnosis,
          Treatment: formValues.Treatment,
          Prognosis: formValues.Prognosis.value,
          Result: formValues.Result,
          CostOfTreatment2: formValues.CostOfTreatment2,
          Remarks: formValues.Remarks
          //DoctorIDs: formValues.DoctorIDs,
        };

        $.each(data_, function (k, val) {
          if (queryString != "") {
            queryString += `&`;
          }
          queryString += `${k}=${val}`;
        });
        for(let i=0;i<formValues.DoctorIDs.length;i++){
          if (queryString != "") {
            queryString += `&`;
          }
          queryString += `DoctorIDs=${formValues.DoctorIDs[i]}`;
        }
        let api_type = "Add";
        if (this.state.taskType === "Edit") {
          api_type = "Edit";
        }
        this.templateManager.showLoading(
          `${api_type}ing ${this.animalType} Medication Detail`
        );
        const requestOptions = {
          method: "POST",
        };
        let data = await fetch(
          `${apiUrl}Medication/${api_type}MedicationDetail?${queryString}`,
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
          this.resetMedicationForm();
          this.table.loadData();
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
    this.templateManager = this.props.templateManager;
  }
  render() {
    let milkingChartStyle = {
      minWidth: "max-content",
      marginTop: "25px",
    };
    let padding_right_20 = { paddingRight: "20px" };
    let float_right = { float: "right" };
    let medication_button = { width: "100%", height: "50px" };
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="title">Medication Detail</div>
          <div className="row">
            <div className="col-md-6">
              <div className="medication_form">
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
                      <Form id="medication-form" onSubmit={handleSubmit}>
                        <div>
                          <FormField as="date" value={values.Date} id="Date" name="Date" label="Date" 
                          before_label={<Field type="hidden" name="Id" id="medication_id" />} setFieldValue={setFieldValue} 
                          content={<label className="form-control kg-input bg-white" id="medication_animal_no" name="medication_animal_no">{values.AnimalName} - {values.AnimalNo}</label>}
                          error_after={<ErrorMessage name="Id" component={TextError} />}
                          />
                          <FormField as="empty" id="medication_animal_no" name="AnimalID" label="Animal No" 
                          content={<label className="form-control kg-input bg-white" id="medication_animal_no" name="medication_animal_no">{values.AnimalName} - {values.AnimalNo}</label>}/>
                          <FormField as="select" id="medication_disease_id" name="DiseaseID" label="Select Disease" options={this.state.diseaseOptions} 
                            setFieldValue={setFieldValue}
                            ajax={true}
                            ajaxSource={this.loadDiseases2}
                            placeholder="Select Disease"
                            ref={(ref)=>{this.diseaseField = ref;}}
                            value={values.DiseaseID}
                            fetchOnEmptyInput={true} 
                          />
                          <FormField as="input" id="medication_symptoms" name="Symptoms" label="Symptoms"/>
                          <FormField as="input" id="medication_diagnosis" name="Diagnosis" label="Diagnosis"/>
                          <FormField as="input" id="medication_treatment" name="Treatment" label="Treatment"/>
                          <FormField as="select" id="inputGroupSelect01" name="Prognosis" label="Prognosis" 
                            options={this.prognosis_options} 
                            setFieldValue={setFieldValue}
                            placeholder="Select Prognosis"
                            ref={(ref)=>{this.prognosis_field = ref;}}
                          />
                          <FormField as="input" id="medication_result" name="Result" label="Result"/>
                          <FormField as="input" id="medication_cost_of_treatment" name="CostOfTreatment2" label="Cost of Treatment"/>
                          <FormField as="hidden" id="medication_doctor_name" name="DoctorIDs" label="Doctor" field_component_before={<label className="form-control kg-input bg-white" onClick={this.selectDoctor} id="medication_doctor_name">{values.DoctorDetail}</label>}/>
                          <FormField as="input" id="medication_remarks" name="Remarks" label="Remarks"/>
                          <div style={medication_button}>
                            <div style={float_right}>
                              <button
                                className="btn btn-secondary kg-button"
                                style={float_right}
                                onClick={handleSubmit}
                                type="button"
                              >
                                Save
                              </button>
                              &nbsp;&nbsp;
                              <button
                                className="btn btn-secondary kg-button"
                                style={float_right}
                                type="button"
                                onClick={this.resetMedicationForm}
                              >
                                Reset
                              </button>
                              &nbsp;&nbsp;
                            </div>
                          </div>
                        </div>
                      </Form>
                    </>
                  )}
                </Formik>
              </div>
            </div>
          </div>
          <div className="row" style={padding_right_20}>
            <h3>Past Medication Report</h3>
            <div className="col-md-12 div-borderd">
              <Table
                ref={(ref) => {
                  this.table = ref;
                }}
                colsName={[
                    "#",
                    "Date",
                    "Animal No.",
                    "Disease",
                    "Symptoms",
                    "Treatment",
                    "Prognosis",
                    "Result",
                    "Doctor",
                    "Remarks",
                    "Action",
                ]}
                cols={[
                  "sno",
                  "Date",
                  "AnimalNo",
                  "Disease",
                  "Symptoms",
                  "Treatment",
                  "Prognosis",
                  "Result",
                  "DoctorDetail",
                  "Remarks",
                  "Id"
                ]}
                link={"Id"}
                action={this.actionLinks}
                data={this.state.data}
                getData={this.action}
                className="milking-chart"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  resetMedicationForm = () => {
    let fields = ['Id','Date',"AnimalID","AnimalNo", "AnimalName", "Disease", "Symptoms", "Diagnosis", 
      "Treatment", "Prognosis", "Result", "CostOfTreatment2:", "Remarks", "DoctorDetail", "DoctorIDs"];
    for(let i=0;i<fields.length;i++){
      this.formRef.current.setFieldValue(fields[i],'');
    }
    this.formRef.current.setFieldValue("doctors",{});
    this.props.animalProfile.selectUserModal.clearDoctorSelection(); //reset doctors in usermodal
    this.updateSelectedAnimal();
  };
  selectDoctor = async () => {
    await this.props.animalProfile.selectUserModal.setMultipleSelection(
      this.state.doctorMultipleSelection
    );
    this.props.animalProfile.selectUserModal.setState({selectedDoctorIds:this.formRef.current.values.DoctorIDs})
    this.props.animalProfile.selectUserModal.currentObject = this;
    this.props.animalProfile.selectUserModal.show();
  };
  setDoctors = async (data, type = "add") => {
    if (this.state.doctorMultipleSelection === true) {
      let doctors = this.formRef.current.values.doctors;
      if(doctors===undefined || doctors===""){
        doctors = {};
      }
      //console.log(doctors);
      if (type === "add") {
        if (doctors && doctors[data.id] === undefined) {
          console.log('adding');
          doctors[data.id] = {
            id: data.id,
            name: data.name,
          };
          this.formRef.current.setFieldValue("doctors", doctors);
        } else {
          delete doctors[data.id];
          this.formRef.current.setFieldValue("doctors", doctors);
        }
      } else if ((type = "delete")) {
        delete doctors[data.id];
        this.formRef.current.setFieldValue("doctors", doctors);
      }
      console.log(doctors);
      console.log(this.getDoctorIDs());
      console.log(this.getDoctorNames());
      this.formRef.current.setFieldValue("DoctorIDs", this.getDoctorIDs());
      this.formRef.current.setFieldValue("DoctorDetail", this.getDoctorNames());

    } else {
      if (type === "add") {
        this.formRef.current.setFieldValue("DoctorIDs", data.id);
        this.formRef.current.setFieldValue("DoctorDetail", data.name);
      } else if ((type = "delete")) {
        this.formRef.current.setFieldValue("DoctorIDs", "");
        this.formRef.current.setFieldValue("DoctorDetail", "");
      }
    }
  };
  getDoctorIDs = () => {
    let id = [];
    Object.entries(this.formRef.current.values.doctors).map((value, key) => {
      id.push(value[1].id);
    });
    return id;
    //return id.join(",");
  };
  getDoctorNames = () => {
    let names = [];
    Object.entries(this.formRef.current.values.doctors).map((value, key) => {
      names.push(value[1].name);
    });
    return names.join(",");
  };
  updateSelectedAnimal(){  //required 
    this.formRef.current.setFieldValue('AnimalID',this.props.animalProfile.context.getSelectedAnimalID());
    this.formRef.current.setFieldValue('AnimalNo',`${this.props.animalProfile.context.getSelectedAnimalTagNo()}`);
    this.formRef.current.setFieldValue('AnimalName',`${this.props.animalProfile.context.getSelectedAnimalName()}`);
  }
  action = async (length,start,page) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    /*let page = Math.ceil((start-1)/length)+1; //10 20 30
    console.log(page,start);*/
    let data = await fetch(
      `${apiUrl}Medication/GetMedicationDetailByAnimalId?id=${this.props.animalProfile.context.getSelectedAnimalID()}&start=${page}&length=${length}`,
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

    return this.format_data(data);
  };
  actionLinks =  (row) => {
    return (
      <span
        className="fa fa-edit"
        onClick={async() => {
          console.log("Edit Medication",row);
          //this.props.animalProfile.cowServiceDetail.getCowServiceDataById(row.id);
          let data = await this.getMedicationDetailById(row.Id);
          if(data.status==='success'){
             this.setDataToForm(data.medication);
          }
        }}
      ></span>
    );
  };
  setDataToForm= async (medication)=>{
    this.formRef.current.setFieldValue('Id',medication.id);
    this.formRef.current.setFieldValue('Date',new Date(Date.parse(medication.date)));
    this.formRef.current.setFieldValue('AnimalID',medication.animalID);
    //this.diseaseField.setValue(medication.diseaseID);
    //fetchSetTheDiseaseOptions by Disease ID
    console.log(this.diseaseField);
    console.log("Fetching Diseases for ")
    let diseases = await this.getSetDiseases(medication.diseaseID);
    console.log(diseases)
    //this.diseaseField.setState({options:data});
    //fetch the diseases over here
    //this.diseaseField.setValue({label:''+medication.disease,value:medication.diseaseID});
    //this.diseaseField.setValue(medication.diseaseID);
    this.formRef.current.setFieldValue('Disease',medication.disease);
    this.formRef.current.setFieldValue('Symptoms',medication.symptoms);
    this.formRef.current.setFieldValue('Diagnosis',medication.diagnosis);
    this.formRef.current.setFieldValue('Treatment',medication.treatment);
    console.log("Settign pRognios");
    console.log(this.prognosis_options);
    let option = null;
    if(medication.prognosis){
      if(this.prognosis_options[medication.prognosis]){
        option = {label : this.prognosis_options[medication.prognosis],value:medication.prognosis};
      }else{
        option = {label : 'Not Found',value:medication.prognosis};
      }
    }else{
      option = {label : 'Select One',value:''};
    }
    console.log(option);
    this.prognosis_field.setValue(option);
    this.formRef.current.setFieldValue('Prognosis',option);
    this.formRef.current.setFieldValue('Result',medication.result);
    this.formRef.current.setFieldValue('CostOfTreatment2',medication.costOfTreatment2);
    this.formRef.current.setFieldValue('Remarks',medication.remarks);
    this.formRef.current.setFieldValue('DoctorDetail',medication.doctorDetail);
    this.formRef.current.setFieldValue('DoctorIDs',medication.doctorIDs);
    this.formRef.current.setFieldValue('doctors',medication.doctors);
    this.setState({taskType:'Edit'});
  }
  getMedicationDetailById= async (id)=>{
    const requestOptions = {
      method: "POST"
    };
    let data = await fetch(
      `${apiUrl}Medication/GetMedicationDetailById?id=${id}`,
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
    return data;
  }
  format_data=(data)=>{
    let prognosis = {};
    for(let i=0;i<this.prognosis_options.length;i++){
      prognosis[this.prognosis_options[i].value] = this.prognosis_options[i].label;
    }
    for(let i=0;i<data.data.length;i++){
      if(prognosis[data.data[i].Prognosis]!==undefined){
        data.data[i].Prognosis = prognosis[data.data[i].Prognosis];
      }
    }
    return data;
  }  
  loadDiseases=async (inputValue) => {
    let data = new FormData();
    data.append("DiseaseName", inputValue);
    data.append("PageNo", 1);
    data.append("RecordsPerPage", 10);
    const requestOptions = {
      method: "POST",
      body: data,
    };
    let response = await fetch(
      `${apiUrl}Disease/GetDiseaseIdNamePairByDiseaseName`,
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
    var data_ = Object.entries(response);
    let new_data = [];
    for (let i = 0; i < data_.length; i++) {
      new_data.push({
        value: data_[i][0],
        label: data_[i][1],
      });
    }
    this.setState({ diseaseOptions: new_data });
  }
  loadDiseases2=async (inputValue) => {
    let data = new FormData();
    data.append("DiseaseName", inputValue);
    data.append("PageNo", 1);
    data.append("RecordsPerPage", 10);
    const requestOptions = {
      method: "POST",
      body: data,
    };
    let response = await fetch(
      `${apiUrl}Disease/GetDiseaseIdNamePairByDiseaseName`,
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
    return response;
    
  }
  getSetDiseases=async (val)=>{
    //console.log("GEt Set Disease");
    if(val!=null){
      let countryID = val.value;
      const config = {
        headers: {
            Accept: '*/*',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      };
      let data1 = new FormData();
      let ids = null;
      if(val instanceof Object === true){
        ids = [val.value];
      }else{
        ids = [val];
      }
      data1.append("Ids", ids);
      data1.append("PageNo", 1);
      data1.append("RecordsPerPage", 10);
      //let data = await axios.post(`${apiUrl}Disease/GetDiseaseIdNamePairByDiseaseName?DiseaseName=`+countryID+``, {},config);
      let data = await axios.post(`${apiUrl}Disease/GetDiseaseIdNamePairByDiseaseName`, data1,config);
      if(this.diseaseField){
        let a = this.diseaseField;
        this.diseaseField.setState({options:data.data},()=>{a.setValue(val);});
      }else{
        //console.log("Disease Field not set");
      }
    }
  }
}
