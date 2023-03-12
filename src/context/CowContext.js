import axios from "axios";
import { Component, createContext } from "react";
import { apiUrl } from "./AppContext";

const CowContext = createContext();
export class CowProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cowID: "",
      tagNo: "SW-719",
      selectedCow:{
        id:'',
        tagNo:"",
        name:''
      },
      cow: {
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
        picture: "cow_default.jpg",
        lactation: 0,
        type: "",
        weight: "",
        height: "",
        semenDoses: "",
        noOfTeatsWorking: "",
        location: "",
        cowDataSet: false,
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
      tehsils:{

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
    //this.setDataForCowProfileBeforeMounted();
    //console.log("CC STATE",this.state);
  }
  componentDidMount= async ()=>{
    //let data = await this.setDataForCowProfile();
    //console.log(data);
    
  }
  setCountries=(countries)=>{
    this.setState({countries:countries});
  }
  render() {
    const { cowID, breeds, colors,pregnancy_status,mating_type,delivery_status,gender ,selectedCow,
      locations,milkStatus,birthStatus,countries,states,districts,tehsils} = this.state;
    const { convertDateTo1,setCountries,initializeData,getSelectedAnimalID,getSelectedAnimalName, getSelectedAnimalTagNo, getSelectedAnimal } = this;
    //console.log(cow);
    return (
      <CowContext.Provider
        value={{
          cowID,
          selectedCow,
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
          tehsils,
          convertDateTo1,
          setCountries,
          initializeData,
          getSelectedAnimalID,getSelectedAnimalName, getSelectedAnimalTagNo, getSelectedAnimal
        }}
      >
        {this.props.children}
      </CowContext.Provider>
    );
  }
  getDataForCowProfilePage= async()=>{
    const config = {
      headers: {
          Accept: '*/*',
          //Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };
    let data = await axios.post(`${apiUrl}Cows/GetDataForCowProfilePage/`, config);
    //this.setState({ employees: data.data.data });
    return data;
  }
  setDataForCowProfile= async()=>{
    let data = await this.getDataForCowProfilePage();
    if(data){
      //console.log(data);
      this.setState(
        {
          gender:data.data.Gender,
          countries:data.data.countries,
          breeds:data.data.breeds,
          colors:data.data.colors,
          pregnancy_status:data.data.pregnancyStatus2,
          mating_type:data.data.matingType,
          delivery_status:data.data.deliveryType,
          locations:data.data.animalLocations,
          milkStatus:data.data.milkStatus,
          birthStatus:data.data.birthStatus
        }
      );
      //console.log(this.state);
    }
    return data;
  }
  
  initializeData = async()=>{
    let data = this.setDataForCowProfile();
  }
  getSelectedAnimalID=()=>{
    return this.state.selectedCow.id;
  }
  getSelectedAnimalTagNo=()=>{
    return this.state.selectedCow.tagNo;
  }
  getSelectedAnimalName=()=>{
    return this.state.selectedCow.name;
  }
  getSelectedAnimal=()=>{
    return this.state.selectedCow;
  }
}

export default CowContext;
