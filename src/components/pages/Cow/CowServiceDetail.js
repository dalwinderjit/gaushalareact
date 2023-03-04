import React, { Component } from "react";
import Table from "../../Table";
import CowContext from "../../../context/CowContext";
import { apiUrl } from "../../../context/AppContext";
export default class CowServiceDetail extends Component {
  static contextType = CowContext;
  constructor(props) {
    super(props);
    this.state = {
      cowID: "",
      data: [],
      status: true,
      recordsFiltered: 20,
      recordsTotal: 20,
      pageNo: 1,
      recordsPerPage: 2,
      search: "",
    };
    //this.props.cowProfile.addCowServiceModal = this.props.cowProfile.addCowServiceModal;
  }
  actionLinks = (row) => {
    return (
      <span
        className="fa fa-edit"
        onClick={() => {
            this.getCowServiceDataById(row.id);
        }}
      ></span>
    );
  };
  action = async () => {
    const requestOptions = {
      method: "POST"
      
    };
    //console.log(this.state);
    //console.log(this.state.pageNo)
    //console.log(this.state.recordsPerPage)
    //let start = (this.state.pageNo - 1) * this.state.recordsPerPage + 1;
    let data = await fetch(
      `https://localhost:5001/api/CowsService/GetServiceDetailByCowId?id=${this.context.cowID}`,
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
      this.props.cowProfile.cowSummary.setSummary(data.serviceDetail);
      this.formatData(data);
    return data;
  };
  render() {
    return (
      <>
        <div className="row">
          <div className="col-md-12">
            <div className="title">Service Detail</div>
            <div style={{ padding: "10px" }}>
              <button
                className="kgsbtn btn kgsbtn-success"
                onClick={() => {
                    
                  this.props.cowProfile.addCowServiceModal.show();
                }}
              >
                Add
              </button>
              <button className="kgsbtn btn kgsbtn-clear" onClick={() => {
                    this.props.cowProfile.addCowServiceModal.setState({taskType:'Add'});
                    this.props.cowProfile.addCowServiceModal.show();
                  }}>Clear</button>
              <button className="kgsbtn btn kgsbtn-delete" onClick={() => {
                    this.props.cowProfile.addCowServiceModal.setState({taskType:'Edit'});
                    this.props.cowProfile.addCowServiceModal.show();
                  }}>Delete</button>
            </div>
            <Table
              ref={(ref) => {
                this.table = ref;
              }}
              colsName={[
                "S. No.",
                "Cow No/Tag ",
                "Service",
                "Status",
                "Date Time of Service",
                "Mating Type",
                "Doctor",
                "Remarks",
                "Action",
              ]}
              cols={[
                "sno",
                "cowName",
                "bullsName",
                "pregnancyStatus",
                "dateOfService",
                "matingProcessType",
                "doctorsName",
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
      </>
    );
  }
  async getCowServiceDataById(id) {
    //this.templateManager.showLoading("Loading Cow Data");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    let data = await fetch(
      apiUrl+"CowsService/GetServiceDetailById?id="+id,
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
    //console.log(data);
    if(data.status==='success'){
        this.props.cowProfile.templateManager.showSuccessMessage(data.message);
        this.props.cowProfile.addCowServiceModal.setDataToForm(data.data);
        this.props.cowProfile.addCowServiceModal.show();
    }
    return;
    
  }
  formatData=(data)=>{
    for(let i=0;i<data.data.length;i++){
      //console.log(data.data[i]);
      data.data[i].pregnancyStatus = this.context.pregnancy_status[data.data[i].pregnancyStatus];
      data.data[i].matingProcessType = this.context.mating_type[data.data[i].matingProcessType];
    }
    return data;
  }
}
