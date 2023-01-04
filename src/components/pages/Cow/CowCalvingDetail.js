import React, { Component } from "react";
import Table from "../../Table";
import CowContext from "../../../context/CowContext";
import { apiUrl } from "../../../context/AppContext";

export default class CowCalvingDetail extends Component {
  static contextType = CowContext;
  constructor(props) {
    super(props);
    this.state = {
      cowID: "",
      data: [/*
        {
          sno: 1,
          id: 2784,
          cow_service_id: 23108,
          dateOfService: "22/08/2017",
          bullID: 1532,
          cowNo: "SW-719",
          deliveryDate: "25/01/2018",
          lactationNo: 1,
          deliveryStatus: "1",
          damWeight: "85",
          gender: "Female",
          tagNo: "SW-789",
          birthWeight: "20",
          remarks: "NEw Heifer",
          bullSemenNo: " Dalwinder singhsdf sdf asdf asd",
        },
        {
          sno: 2,
          id: 2785,
          cow_service_id: 23109,
          dateOfService: "19/05/2019",
          bullID: 1532,
          cowNo: "SW-719",
          deliveryDate: "20/06/2019",
          lactationNo: 2,
          deliveryStatus: "1",
          damWeight: "85",
          gender: "Female",
          tagNo: "SW-790",
          birthWeight: "25",
          remarks: "BIrth takes place",
          bullSemenNo: " Dalwinder singh",
        },
        {
          sno: 3,
          id: 2786,
          cow_service_id: 23113,
          dateOfService: "20/02/2020",
          bullID: 1532,
          cowNo: "SW-719",
          deliveryDate: "20/03/2020",
          lactationNo: 3,
          deliveryStatus: "1",
          damWeight: "85",
          gender: "Male",
          tagNo: "SW-895",
          birthWeight: "25",
          remarks: "New Calf Born",
          bullSemenNo: " Dalwinder singh",
        },
        {
          sno: 4,
          id: 2787,
          cow_service_id: 23115,
          dateOfService: "16/09/2022",
          bullID: 2679,
          cowNo: "SW-719",
          deliveryDate: "16/06/2023",
          lactationNo: 4,
          deliveryStatus: "1",
          damWeight: "350",
          gender: "Female",
          tagNo: "SW-350",
          birthWeight: "26",
          remarks: "Successfulll new female calf born",
          bullSemenNo: "J-4658",
        },
        {
          sno: 5,
          id: 2788,
          cow_service_id: 23116,
          dateOfService: "23/07/2023",
          bullID: 1777,
          cowNo: "SW-719",
          deliveryDate: "21/04/2024",
          lactationNo: 5,
          deliveryStatus: "1",
          damWeight: "400",
          gender: "Male",
          tagNo: "SW-351",
          birthWeight: "28",
          remarks: "Successfal new calf gunnu",
          bullSemenNo: "S-094",
        },
        {
          sno: 6,
          id: 2789,
          cow_service_id: 23114,
          dateOfService: "23/08/2024",
          bullID: 2658,
          cowNo: "SW-719",
          deliveryDate: "23/05/2025",
          lactationNo: 6,
          deliveryStatus: "1",
          damWeight: "300",
          gender: "Male",
          tagNo: "SW-500",
          birthWeight: "25",
          remarks: "Successfull Calf moti",
          bullSemenNo: "ANAND",
        },
        {
          sno: 7,
          id: 2790,
          cow_service_id: 23118,
          dateOfService: "23/08/2025",
          bullID: 2661,
          cowNo: "SW-719",
          deliveryDate: "23/05/2026",
          lactationNo: 7,
          deliveryStatus: "1",
          damWeight: "250",
          gender: "Female",
          tagNo: "SW-600",
          birthWeight: "20",
          remarks: "New heifer nirmala abnormal birth",
          bullSemenNo: "Bansidhar",
        },
      */],
      status: true,
      recordsFiltered: 20,
      recordsTotal: 20,
      pageNo: 1,
      recordsPerPage: 2,
      search: "",
    };
  }

  onRecordsPerPageChange = (recordsPerPage) => {
    this.setState({ recordsPerPage: recordsPerPage });
  };
  onSearchValueChange = (value) => {
    this.setState({ search: value });
  };
  
  action = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    //console.log(this.state);
    //console.log(this.state.pageNo)
    //console.log(this.state.recordsPerPage)
    //let start = (this.state.pageNo - 1) * this.state.recordsPerPage + 1;
    if(this.context.selectedCow && this.context.selectedCow.id!==undefined){
      let data = await fetch(
        `${apiUrl}Cows/GetCalvingDetailByCowId?id=${this.context.selectedCow.id}`,
        requestOptions
      )
        .then((res) => res.json())
        .then(
          (result) => {
            return result;
          },
          (error) => {
            //console.log("error");
            //console.log(error);
            return error;
          }
        );
        if(data.interCalvPeriod===undefined){
          data.interCalvPeriod = {};
        }
        this.props.cowProfile.cowSummary.setInterCalvPeriodData(data.interCalvPeriod);
        this.formatData(data);
      return data;
    }
    
  };
  actionLinks = (row) => {
    return (
      <span
        className="fa fa-edit"
        onClick={() => {
          console.log("editcalving Detail ",row);
          //this.props.cowProfile.cowServiceDetail.getCowServiceDataById(row.id);
          this.getCalvingDetailById(row.id);
        }}
      ></span>
    );
  };
  getCalvingDetailById= async (id)=>{
    //this.templateManager.showLoading("Loading Cow Data");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    let data = await fetch(
      apiUrl+"Calvs/GetCalvingDetailById?id="+id,
      requestOptions
    )
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
    console.log(data);
    if(data.status=='success'){
      console.log('success')
        this.props.cowProfile.templateManager.showSuccessMessage(data.message);
        data.data["lactationNo"] = data.data['birthLactationNumber']
        data.data["bullID"] = data.data['sireID']
        data.data["cowID"] = data.data['damID']
        this.props.cowProfile.addCowServiceModal.setDataToForm(data.data);
        this.props.cowProfile.addCowServiceModal.show();
    }
    return;
  }
  setCowID = (cow_id) => {
    this.setState((prevState) => {
      let cow_id_ = prevState.cowID;
      cow_id_ = cow_id;
      return cow_id_;
    });
  };
  render() {
    //console.log("Cow calving render");
    if (this.state.cowID != this.context.cowID) {
      this.state.cowID = this.context.cowID;
    }
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="title">Calving Detail</div>
          <Table
            ref={(ref) => {
              this.table = ref;
            }}
            colsName={[
              "#",
              "Date of Service ",
              "Cow",
              "Bull/Semen",
              "Dt. Calved",
              "L. NO.",
              "Birth Status",
              "Dam's Wt",
              "Sex",
              "Calf Number",
              "Birth Wt.",
              "Remarks",
              "Action",
            ]}
            cols={[
              "sno",
              "dateOfService",
              "cowNo",
              "bullSemenNo",
              "deliveryDate",
              "lactationNo",
              "deliveryStatus",
              "damWeight",
              "gender",
              "tagNo",
              "birthWeight",
              "remarks",
              "id",
            ]}
            link={"id"}
            action={this.actionLinks}
            data={this.state.data}
            getData={this.action}
          />
        </div>  
      </div>
    );
  }
  formatData=(data)=>{
    for(let i=0;i<data.data.length;i++){
      data.data[i].deliveryStatus = this.context.delivery_status[data.data[i].deliveryStatus];
      
    }
    return data;
  }
}
