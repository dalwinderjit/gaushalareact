import React, { Component } from "react";
import * as yup from "yup";
import {Formik,Form,Field,ErrorMessage} from "formik";
//import ReactDatePicker from "react-datepicker";
import DateTimePicker from "react-datetime-picker";
import 'react-datepicker/dist/react-datepicker.css';
import TextError from "./Templates/TextError";
export default class Test extends Component {
    constructor(props) {
    super(props);
    this.state = {
      startDate : new Date()
    };
    this.form = React.createRef();
    this.formValidattionSchema = yup.object().shape({
      value1: yup.number().required("Please Select the Cow"),
      value2: yup
        .string()
        .matches(
          /^(([0][1-9])|([1-2][0-9])|([3][0-1]))\/(([0][1-9])|([1][1-2]))\/\d{4}$/,
          "Invalid Date Format (dd/mm/yyyy"
        )
        .required("Please Enter Date of Service"),
      value3: yup.number().required("Please Select the Bull"),
      value4: yup.number().when(['value1','value2'], 
        (val,val2)=>{
            console.log(val);
            console.log(val2);
            switch(val){
                case 1:
                    console.log(1);
                    return yup.number().required("Pleae enter valid name 1");
                case 2:
                    return yup.number().required("Pleae enter valid name 2");
                case 3:
                    return yup.number().required("Pleae enter valid name 3");
                case 4:
                    return yup.number().required("Pleae enter valid name 4");
                default:
                    return yup.number().required("Pleae enter valid name default");
            }
        },
      ),
      date:yup.string().required('Please provide the date'),
      date2:yup.date().required('Please provide the date')
    });
    this.resetFormValues={
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      date:'',
      date2:'',
      date3:''
    }
    this.form1 = {
      value1: 1,
      value2: 2,
      value3: 3,
      value4: 4,
      date:new Date(Date.parse('1991-11-11')),
      date2:'',
      date3:''
    };
    this.formikProps = {
      initialValues: this.form1,
      enableReinitialize: true,
      validateOnBlur: true,
      validateOnchange: true,
      validationSchema: this.formValidattionSchema,
      setFieldValue:true,
      onSubmit: async (formValues, { setSubmitting, setFieldError,actions }) => {
        console.log("Add Form");
        actions.resetForm({
          values:this.resetForm
        })
      },
    };
  } 
  error(error, touched) {
    if (error || touched) {
      return <label className="error-label">{error}</label>;
    } else {
      return "";
    }
  }
  setStartDate=(date)=>{
    console.log(date);
    console.log(typeof date);
    //console.log(date.constructor);
    console.log(date.getUTCDate()+' ' + date.getDate());
    console.log(date.getUTCFullYear()+ ' ' + date.getFullYear());
    console.log(date.getUTCMonth()+ ' ' + date.getMonth());
    console.log(date.getUTCDay()+ ' ' + date.getDay());
    let date_ = date.getDate().toString()+"/"+(date.getMonth()+1).toString()+"/"+date.getFullYear().toString();
    console.log(date_);
    this.formikProps.initialValues.date = date_;
    this.formikProps.initialValues.date2 = date;
    this.forceUpdate();
  }
  setDateTime=(date,setFieldValue)=>{
    //this.formikProps.initialValues.date3 = date;
    this.setFieldValue = setFieldValue;
    setFieldValue('date3',date);
    console.log(this.formikProps);
   // this.forceUpdate();
  }
  resetForm=()=>{
    //console.log(this.form);
    //this.form.current.onReset = ()=>{alert('hi')};
    this.formikProps.initialValues = this.resetFormValues;
    
    this.forceUpdate();
  }
  setForm=()=>{
    this.formikProps.initialValues = this.form1;
    console.log(this.form1.date);
    this.setFieldValue('date3',this.form1.date)
    this.forceUpdate();
  }
  render() {
    return (
      <div>
        <h1>TEST FORMIK YUP</h1>
        <button onClick={this.resetForm}>Reset Form</button>
        <button onClick={this.setForm}>Set Form</button>
        <Formik {...this.formikProps} >
          {({
            values,
            errors,
            handleSubmit,
            isSubmitting,
            touched,
            handleBlur,
            handleChange,
            resetForm,
            setFieldValue
          }) => <Form onSubmit={handleSubmit} onReset={resetForm} ref={this.form}> 
            <Field name='value1'/><br/>
            <ErrorMessage name='value1' component={TextError}/>
            <br/>
            <input type="text" name="value2" onChange={handleChange} onBlur={handleBlur} value={values.value2}/>
            <br/>{this.error(errors.value2, touched)}<br/>
            <input type="text" name="value3" onChange={handleChange} onBlur={handleBlur} value={values.value3}/>
            <br/>{this.error(errors.value3, touched)}<br/>
            <input type="text" name="value4" onChange={handleChange} onBlur={handleBlur} value={values.value4}/>
            <br/>{this.error(errors.value4, touched)}<br/>
            HELO
            <Field name="date3" component={(props)=>{let {field} = props;console.log(props);return <DateTimePicker value={field.value} onChange={(date)=>{console.log(date);setFieldValue('date3',date);/*this.setDateTime(date,form.setFieldValue)*/}}/>}}/><br/><br/>
            HI
            {/*<ReactDatePicker selected={values.date2} onChange={(date) =>{ this.setStartDate(date)}} onBlur={handleBlur} name="date"/>*/}
            <br/>{this.error(errors.date2, touched)}<br/>
            <DateTimePicker value={values.date3} onChange={(date)=>{setFieldValue(date)}}/>
            <br/>
            <button type="reset">Reset</button>
            </Form>}

        </Formik>
      </div>
    );
  }
}
