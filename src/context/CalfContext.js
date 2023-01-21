import { Component, createContext } from "react";

const CalfContext = createContext();
export class CalfProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calfID: "",
      tagNo: "SW-719",
      selectedCalf:{
        id:'',
        tagNo:"",
        name:''
      },
      calf: {
        id: 1,
        tagNo: "SW-101",
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
      breeds: {
        1: "Sahiwal",
        2: "Gir",
        3: "Thar Parkar",
        4: "Kapila",
        5: "Kankrej",
      },
      colors: {
        1: "Brown",
        2: "White",
        3: "Black",
        4: "Black+White",
        5: "REDDISH BROWN",
        6: "RED",
      },
      pregnancy_status: {
        1: "Confirmed",
        2: "Pending",
        3: "Failed",
        4: "Successful",
      },
      mating_type: { 1: "Natural", 2: "Aritficial" },
      delivery_status: { 1: "Normal", 2: "Abnormal", 3: "Child Died" },
      gender:{'Male':'Male','Female':'Female'},
      locations:{
        1:"Shed A",
        2:"Shed B",
        3:"Shed C",
        4:"Shed D",
        5:"Shed E"
      },
      milkStatus:{
        'START':'Start',
        'STOP':'Stop'
      },
      birthStatus : {
        1: "Normal",
        2: "Abnormal",
        3: "Child Died"
      },
      countries: {
        1: "INDIA",
        2: "USA",
      },
      states:{
        1: "PUNJAB",
        2: "UP",
        3: "RAJASTHAN",
        4: "GUJRAT",
      },
      districts:{
        1: "JALANDHAR",
        2: "AMRITSAR",
        3: "BATHINDA",
        4: "FARIDKOT"
      },
      imageUrl: "http://localhost:4000/images/",
      calvingDetail: {
        data: [],
        status: true,
        recordsFiltered: 0,
        recordsTotal: 0,
        pageNo: 1,
        recordsPerPage: 10
      },
      interCalvPeriod: {},
    };
    this.convertDateTo1 = (date) => {
      if (date !== "") {
        var a = date.split("/");
        return a[2] + "-" + a[1] + "-" + a[0];
      }
    };
  }
  render() {
    //const {calf,tagNo} = this.state;
    const { calfID, breeds, colors,pregnancy_status,mating_type,delivery_status,gender ,selectedCalf,
      locations,milkStatus,birthStatus,countries,states,districts} = this.state;
    const { convertDateTo1 } = this;
    //console.log(calf);
    return (
      <CalfContext.Provider
        value={{
          calfID,
          selectedCalf,
          breeds,
          colors,
          pregnancy_status,
          mating_type,
          delivery_status,
          gender,
          locations,
          milkStatus,
          birthStatus,
          countries,
          states,
          districts,
          convertDateTo1,
        }}
      >
        {this.props.children}
      </CalfContext.Provider>
    );
  }
}

export default CalfContext;
