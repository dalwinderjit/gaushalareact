import { Component, createContext } from "react";

const BullContext = createContext();
export class BullProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BullID: "",
      tagNo: "SW-719",
      selectedBull: {
        id: "",
        tagNo: "",
        name: "",
      },
      bull: {
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
        picture: "bull_default.jpg",
        lactation: 0,
        type: "",
        weight: "",
        height: "",
        semenDoses: "",
        noOfTeatsWorking: "",
        location: "",
        bullDataSet: false,
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
      gender: { Male: "Male", Female: "Female" },
      locations: {
        1: "Shed A",
        2: "Shed B",
        3: "Shed C",
        4: "Shed D",
        5: "Shed E",
      },
      milkStatus: {
        START: "Start",
        STOP: "Stop",
      },
      birthStatus: {
        1: "Normal",
        2: "Abnormal",
        3: "Child Died",
      },
      performances: {
        ARTIFICIAL: "Artificial Intelligence",
        NATURAL: "Natural",
      },
      countries: {
        1: "INDIA",
        2: "USA",
      },
      states:{
        1: "PUNJAB",
        2: "UP"
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
        recordsPerPage: 10,
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
    //const {bull,tagNo} = this.state;
    const {
      bullID,
      breeds,
      colors,
      pregnancy_status,
      mating_type,
      delivery_status,
      gender,
      selectedBull,
      locations,
      milkStatus,
      birthStatus,
      performances,
      countries,
      states,
      districts,
      tehsils
    } = this.state;
    const { convertDateTo1,getSelectedAnimalID,getSelectedAnimalName, getSelectedAnimalTagNo, getSelectedAnimal } = this;
    //console.log(bull);
    return (
      <BullContext.Provider
        value={{
          bullID,
          selectedBull,
          breeds,
          colors,
          pregnancy_status,
          mating_type,
          delivery_status,
          gender,
          locations,
          performances,
          milkStatus,
          birthStatus,
          countries,
          states,
          districts,
          tehsils,
          convertDateTo1,
          getSelectedAnimalID,getSelectedAnimalName, getSelectedAnimalTagNo, getSelectedAnimal
        }}
      >
        {this.props.children}
      </BullContext.Provider>
    );
  }
  getSelectedAnimalID=()=>{
    return this.state.selectedBull.id;
  }
  getSelectedAnimalTagNo=()=>{
    return this.state.selectedBull.tagNo;
  }
  getSelectedAnimalName=()=>{
    return this.state.selectedBull.name;
  }
  getSelectedAnimal=()=>{
    return this.state.selectedBull;
  }
}

export default BullContext;
