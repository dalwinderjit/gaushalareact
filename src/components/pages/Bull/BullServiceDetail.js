import React, { Component } from "react";
import Table from "../../Table";
import BullContext from "../../../context/BullContext";
import { apiUrl } from "../../../context/AppContext";
export default class BullServiceDetail extends Component {
  static contextType = BullContext;
  constructor(props) {
    super(props);
    this.state = {
      bullID: "",
      data: [],
      status: true,
      recordsFiltered: 20,
      recordsTotal: 20,
      pageNo: 1,
      recordsPerPage: 2,
      search: "",
    };
    //this.props.bullProfile.addBullServiceModal = this.props.bullProfile.addBullServiceModal;
  }
  actionLinks = (row) => {
    return (
      <span
        className="fa fa-edit"
        onClick={() => {
            this.getBullServiceDataById(row.id);
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
      `${apiUrl}BullService/GetServiceDetailByBullId?id=${this.context.bullID}`,
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
      this.props.bullProfile.bullSummary.setSummary(data.serviceDetail);
    return this.formatData(data);
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
                    
                  this.props.bullProfile.addBullServiceModal.show();
                }}
              >
                Add
              </button>
              <button className="kgsbtn btn kgsbtn-clear" onClick={() => {
                    this.props.bullProfile.addBullServiceModal.setState({taskType:'Add'});
                    this.props.bullProfile.addBullServiceModal.show();
                  }}>Clear</button>
              <button className="kgsbtn btn kgsbtn-delete" onClick={() => {
                    this.props.bullProfile.addBullServiceModal.setState({taskType:'Edit'});
                    this.props.bullProfile.addBullServiceModal.show();
                  }}>Delete</button>
            </div>
            <Table
              ref={(ref) => {
                this.table = ref;
              }}
              colsName={[
                "S. No.",
                "Bull No/Tag ",
                "Cow No/Tag",
                "Status",
                "Date Time of Service",
                "Mating Type",
                "Doctor",
                "Remarks",
                "Action",
              ]}
              cols={[
                "sno",
                "bullsName",
                "cowName",
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
  async getBullServiceDataById(id) {
    //this.templateManager.showLoading("Loading Bull Data");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    let data = await fetch(
      apiUrl+"BullService/GetServiceDetailById?id="+id,
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
    if(data.status==='success'){
        
        this.props.bullProfile.templateManager.showSuccessMessage(data.message);
        this.props.bullProfile.addBullServiceModal.setDataToForm(data.data);
        this.props.bullProfile.addBullServiceModal.show();
    }
    return;
    
  }
  formatData=(data)=>{
    for(let i=0;i<data.data.length;i++){
      data.data[i].matingProcessType = this.context.mating_type[data.data[i].matingProcessType];
      data.data[i].pregnancyStatus = this.context.pregnancy_status[data.data[i].pregnancyStatus];
    }
    return data;
  }
  
}
