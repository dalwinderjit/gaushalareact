import { Component, createContext } from "react";
import { apiUrl } from "./AppContext";

const HeiferContext = createContext();
export class HeiferProvider extends Component {
  constructor(props) {
    super(props);
    
    
    this.state = {
      heiferID: "",
      tagNo: "SW-719",
      selectedHeifer:{
        id:'',
        tagNo:"",
        name:''
      },
      heifer: {
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
        picture: "heifer_default.jpg",
        lactation: 0,
        type: "",
        weight: "",
        height: "",
        semenDoses: "",
        noOfTeatsWorking: "",
        location: "",
        heiferDataSet: false,
      },
      breeds: {
        1: "Sahiwal sdfsdf",
        2: "Gir",
        3: "Thar Parkar",
        4: "Kapila",
        5: "Kankrej",
      },
      colors: {
        1: "Brown d d",
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
        1:"Shed A dfsdf",
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
    this.setHeifersPageData();
    this.convertDateTo1 = (date) => {
      if (date !== "") {
        var a = date.split("/");
        return a[2] + "-" + a[1] + "-" + a[0];
      }
    };
  }
  render() {
    //const {heifer,tagNo} = this.state;
    const { heiferID, breeds, colors,pregnancy_status,mating_type,delivery_status,gender ,selectedHeifer,
      locations,milkStatus,birthStatus,countries,states,districts} = this.state;
    const { convertDateTo1 } = this;
    //console.log(heifer);
    return (
      <HeiferContext.Provider
        value={{
          heiferID,
          selectedHeifer,
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
      </HeiferContext.Provider>
    );
  }
  getHeiferPageData=async ()=>{
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      //body: JSON.stringify({ tagNo: tag_no,pageNo:1 })
    };
    let data = await fetch(`${apiUrl}Heifers/GetDataForHeifersProfilePage`,requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          //console.log('result retrieved')
          return result
        },
        (error) => {
          //console.log("error");
          //console.log(error);
          return error
        }
      )
      return data;
  }
  setHeifersPageData= async() =>{
    let page_data = await this.getHeiferPageData();
    this.setState({breeds:page_data.breeds,colors:page_data.colors,location:page_data.animalLocations});
  }
}

export default HeiferContext;
