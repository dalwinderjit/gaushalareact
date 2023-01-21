import React, { Component } from "react";
import * as yup from "yup";
import $ from "jquery";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { convertDate, apiUrl } from "../../../context/AppContext";
import Select, { components } from "react-select";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import SelectCow from "../../SelectCow";
import "react-datepicker/dist/react-datepicker.css";
import DateTimePicker from "react-datetime-picker";
import TextError from "../Templates/TextError";
import ErrorBoundary from "../../ErrorBoundary";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export default class CowComparisonChart extends Component {
  noOfCows = 2;
  TimePeriod = 1;
  color = {
    0: "red",
    1: "green",
    3: "blue",
    4: "yellow",
    5: "orange",
    6: "purple",
  };
  comparison = { 0: "A", 1: "B", 2: "C", 3: "D", 4: "E", 5: "F", 6: "G" };
  TimePeriodOptions = { 1: "Today", 2: "Week", 3: "Month", 4: "Year" };
  comparisonType = { 1: "Lactation", 2: "Time Period" };
  maxLactationNumber = 20;
  constructor(props) {
    super(props);
    this.state = {
      ChartData: {
        labels: [],
        datasets: [],
      }
    };

    this.templateManager = props.templateManager;
    this.cowComparisonFormValidation = yup.object().shape({
      cow_ids: yup.array().of(
        yup.object().shape({
            label:yup.string(),
            value:yup.number()
        })
      ).min(1,"Please Select atleast one cow").required("Please select the cow_ids"),
      comparisonType:
        yup.object().shape({
            label:yup.string(),
            value:yup.number().required("Plsease select the comparison Type")
        }).required("Please select Comparison Type")
    });

    this.formikProps = {
      initialValues: {
        id: "",
        cow_ids: [],
        lactations: "",
        comparisonType: "",
        dayFrom: "",
        dayTo: "",
        dateFrom: "",
        dateTo: "",
        daysSeparator: "",
      },
      enableReinitialize: true,
      validateOnBlur: true,
      validateOnchange: true,
      validationSchema: this.cowComparisonFormValidation,
      //setFieldValue:true,
      onSubmit: async (
        formValues,
        { setSubmitting, setFieldError, resetForm }
      ) => {
        let queryString = '';
        for (let i = 0; i < formValues.cow_ids.length; i++) {
          queryString += 'CowIds='+formValues.cow_ids[i].value+'&';
        }
        queryString += 'comparisonType='+formValues.comparisonType.value+'&';
        if ([1,'1'].includes(formValues.comparisonType.value)) {
          if (formValues.lactations && formValues.lactations.length > 0) {
            for (let i = 0; i < formValues.lactations.length; i++) {
              queryString += 'lactations='+formValues.lactations[i].value+'&';
            }
          }
          queryString += 'dayFrom='+formValues.dayFrom+'&';
          queryString += 'dayTo='+formValues.dayTo+'&';
          queryString += 'daysSeparator='+formValues.daysSeparator+'&';
        } else if (formValues.comparisonType.value === 2) {
            queryString += 'dateFrom='+convertDate(formValues.dateFrom)+'&';
            queryString += 'dateTo='+convertDate(formValues.dateTo)+'&';
            queryString += 'daysSeparator='+formValues.daysSeparator+'&';
        }
        let data = await this.GetCowComaprisonData(queryString);
      },
    };
    this.formRef = React.createRef();
  }
  render() {
    let cow_list = this.AddCowsList();
    let lactations = [];
    for (let i = 0; i < this.maxLactationNumber; i++) {
      lactations.push({
        value: i + 1,
        label: (i + 1),
      });
    }
    return (
      <div className="row">
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
              <Form>
                <div className="graph col-md-12">
                  <div>
                    {errors && errors.length > 0 ? <h1>Error</h1> : null}
                    <div>
                      <ul className="comp-list" id="comparison-cow-list">
                        {cow_list}
                      </ul>
                      <ErrorMessage name="cow_ids" component={TextError}/>
                    </div>
                    <div>
                      <Select
                        options={[
                          { value: 1, label: "Lactation" },
                          { value: 2, label: "Time" },
                        ]}
                        name="comparisonType"
                        value={values.comparisonType}
                        onChange={async (val) => {
                          await setFieldValue("comparisonType", val);
                          this.changeForm();
                        }}
                      />
                      <ErrorBoundary>
                      <ErrorMessage name="comparisonType" component={TextError}/>
                      </ErrorBoundary>
                      <span>
                        <Select
                          id="cow-comparison-lactation-no"
                          name="lactations"
                          isMulti={true}
                          options={lactations}
                          value={values.lactations}
                          onChange={(value) => {
                            console.log(value);
                            setFieldValue("lactations", value);
                          }}
                        />
                        
                      </span>
                      <span id="cow-comparison-day-from-to">
                        Day from<br/>
                        <input
                          className="dayFrom kg-input2"
                          id="cow-comparison-day-from"
                          value={values.dayFrom}
                          name="dayFrom"
                          onChange={handleChange}
                        />
                        Day To<br/>
                        <input
                          className="dayFrom kg-input2"
                          id="cow-comparison-day-to"
                          value={values.dayTo}
                          name="dayTo"
                          onChange={handleChange}
                        />
                        
                      </span>
                      <span id="cow-comparison-day-from-to">
                        Date from
                        <DateTimePicker
                          id="cow-comparison-date-from"
                          value={values.dateFrom}
                          onChange={(date) => {
                            setFieldValue("dateFrom", date);
                            /*this.handleOnDateOfServiceChagne(date,setFieldValue);*/
                          }}
                          format="dd/MM/yyyy"
                        />
                        <br />
                        Date To
                        <DateTimePicker
                          id="cow-comparison-date-to"
                          value={values.dateTo}
                          onChange={(date) => {
                            setFieldValue("dateTo", date);
                            /*this.handleOnDateOfServiceChagne(date,setFieldValue);*/
                          }}
                          format="dd/MM/yyyy"
                        />
                        <br />
                        Days separator
                        <input
                          className="dayFrom kg-input2"
                          id="cow-comparison-day-separator"
                          name="daysSeparator"
                          value={values.daysSeparator}
                          onChange={handleChange}
                        />
                        <br />
                      </span>
                    </div>
                    <div>
                      <input
                        type="number"
                        className="kg-input2"
                        id="cow-comparison-no-of-cows"
                        onKeyUp={(e) => {
                          if (e.target.value != "") {
                            this.noOfCows = e.target.value;
                            this.forceUpdate();
                            //this.AddCowsList();
                          }
                        }}
                      />
                      <br />
                      <br />
                      <input
                        type="submit"
                        className="btn kg-button3"
                        onClick={handleSubmit}
                      />
                    </div>
                  </div>
                  <Bar
                    data={this.state.ChartData}
                    options={{
                      plugins: {
                        title: {
                          display: true,
                          text: "Cow Comparison Data",
                        }
                      },
                    }}
                  />
                </div>
              </Form>
            </>
          )}
        </Formik>
      </div>
    );
  }

  AddCowsList = () => {
    var data = "";
    let cowsList = [];
    for (var i = 0; i < this.noOfCows; i++) {
      cowsList.push(
        <li key={i}>
          <span className={"circle " + this.color[i]}></span>{" "}
          <label className="label2">Comparison {this.comparison[i]} </label>
          <SelectCow
            index={i}
            name={"cow_ids" + i}
            value={
              this.formRef.current &&
              this.formRef.current.values &&
              this.formRef.current.values.cow_ids &&
              this.formRef.current.values.cow_ids[i] != undefined
                ? this.formRef.current.values.cow_ids[i]
                : ""
            }
            id={"milkComparisonSelectCow" + { i }}
            onChange={this.setCow}
          />
        </li>
      );
    }
    if (
      this.formRef.current &&
      this.formRef.current.values &&
      this.formRef.current.values.cow_ids &&
      this.formRef.current.values.cow_ids.length
    ) {
      this.formRef.current.values.cow_ids.splice(this.noOfCows);
    }
    return cowsList;
  };
  GetCowComaprisonData = async (queryString) => {
    var response = await this.ajaxGetCowComaprisonData(queryString);
    await this.setState(
      { ChartData: this.prepareChartData(response) }
    ,()=>{console.log(this.state);}
    );
    console.log(this.state.ChartData);
  };
  ajaxGetCowComaprisonData = async (queryString) => {
    const requestOptions = {
      method: "POST",
    };
    return await fetch(
      `${apiUrl}Milking/GetCowMilkingComaprisonData?`+queryString,
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
    /*return $.ajax({
			url:medication.app.apiUrl+"Milking/GetCowMilkingComaprisonData",
			async: true,
			crossDomain: true,
			type: 'POST',
			data: data,
			success: function (response, status) {
				return response;
			},error:function(XMLHttpRequest, textStatus, errorThrown) { 
				console.log("Text Status :" + textStatus);
				console.log("Error " + errorThrown);
				var data = {'status':'error','message':errorThrown,'textStatus':textStatus};
				console.log(data);
				return data;
			}
		});*/
  };
  changeForm = (val) => {
    let { comparisonType } = this.formRef.current.values;
    if (comparisonType) {
      if (comparisonType.value === 1) {
        document.getElementById(
          "cow-comparison-lactation-no"
        ).parentElement.style.display = "";
        document.getElementById("cow-comparison-day-from-to").style.display =
          "";
      } else if (comparisonType === 2) {
        document.getElementById(
          "cow-comparison-lactation-no"
        ).parentElement.style.display = "none";
        document.getElementById("cow-comparison-day-from-to").style.display =
          "none";
      } else {
        document.getElementById(
          "cow-comparison-lactation-no"
        ).parentElement.style.display = "none";
        document.getElementById("cow-comparison-day-from-to").style.display =
          "none";
      }
    }
    console.log(val);
    return;
  
  };
  prepareChartData = (data) => {
    let ChartData = { labels: [], datasets: [] };
    try {
      let emptyQuantities = [];
      Object.values(data.labels).map((value, index) => {
        emptyQuantities.push(0);
        ChartData.labels.push(value);
      });
      //let title = '';
      Object.entries(data.cow_detail).map((value, index) => {
        //console.log("Index",index);
        //console.log(value[0]);
        let quantities = [];
        if (data.data[value[0]] != undefined) {
          //data.data[value[0]];
          let values__ = Object.values(data.data[value[0]]);
          for (let i = 0; i < values__.length; i++) {
            quantities.push(values__[i].quantity);
          }
        } else {
          quantities = emptyQuantities;
        }
        let backgroundColor = `rgba(${index*20*index}, ${index*30*index}, ${index*70*index-90} , 0.5)`;
        let obj = {
          label:value[1].name + "/" + value[1].tagNo,
          data: quantities,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: backgroundColor,
        };
        ChartData.datasets.push(obj);
      });
      return ChartData;
    } catch (error) {
      alert("Error in manipulating CowComparisonData");
      return ChartData;
    }
  };
  setCow = (index, val) => {
    let { setFieldValue, values } = this.formRef.current;
    if (val != "") {
      let oldValue = values.cow_ids;
      oldValue[index] = val;
      values.cow_ids = oldValue;
      setFieldValue("cow_ids" + index, val);
    } else {
      setFieldValue("cow_ids" + index, val);
    }
  };
}
