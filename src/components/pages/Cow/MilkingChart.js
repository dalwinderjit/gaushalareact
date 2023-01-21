import React, { Component } from "react";
import Table from "../../Table";
import CowContext from "../../../context/CowContext";
import { apiUrl } from "../../../context/AppContext";

export default class MilkingChart extends Component {
  static contextType = CowContext;
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          CowName: "Radha/REDDY died / GR 006",
          LactationNo: 6,
          TotalYield: 2995.968,
          Total305DaysYield: 2638.066,
          WetDays: 395,
          PeakYield: 12.506,
          Average: 7.584729113924051,
        },
        {
          CowName: "Radha/REDDY died / GR 006",
          LactationNo: 7,
          TotalYield: 4250.716,
          Total305DaysYield: 4075.516,
          WetDays: 336,
          PeakYield: 20.86,
          Average: 12.650940476190476,
        },
        {
          CowName: "Radha/REDDY died / GR 006",
          LactationNo: 8,
          TotalYield: 127.13,
          Total305DaysYield: 127.13,
          WetDays: 10,
          PeakYield: 16.25,
          Average: 12.713,
        },
      ],
      recordsTotal: 3,
      recordsFiltered: 3,
    };
  }
  action = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    //let start = (this.state.pageNo - 1) * this.state.recordsPerPage + 1;
    let data = await fetch(
      `https://localhost:5001/api/Cows/GetMilkingDetailByCowId?cowId=${this.context.cowID}`,
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
    return data;
  };
  actionMilkStatus = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    //let start = (this.state.pageNo - 1) * this.state.recordsPerPage + 1;
    let data = await fetch(
      `https://localhost:5001/api/Milking/GetCowMilkingStartStopDetailByCowId?CowID=${this.context.cowID}`,
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
    return data;
  };
  actionLinks = () => {return""};
  actionLinksMilkStatus = (row) => {
    return (
      <span
        className="fa fa-edit"
        onClick={() => {
          this.getCowMilkStartStopById(row.id);
        }}
      ></span>
    );
  };
   
  render() {
    
    return (
      <>
      <div className="row">
        <div className="col-md-12">
          <div className="title">Milking Chart</div>
          <div className="row" style={{ marginLeft: "0px" }}>
            <div className="col-md-6">
              <div className="div-borderd">
                <Table
                    className="milking-chart"
                  ref={(ref) => {
                    this.table = ref;
                  }}
                  colsName={[
                    "Cow",
                    "Lactation Number",
                    "Total Yield",
                    "305 Days Yield",
                    "Wet Days",
                    "Peak Yield",
                    "Average",
                  ]}
                  cols={[
                    'CowName',
                    'LactationNo',
                    'TotalYield',
                    'Total305DaysYield',
                    'WetDays',
                    'PeakYield',
                    'Average'
                  ]}
                  link={""}
                  action={this.actionLinks}
                  data={this.state.data}
                  getData={this.action}
                />
                
              </div>
              <div>
                <table className="milking-detail-filter-table">
                  <tbody>
                    <tr>
                      <td>
                        <label className="label">Starting Date</label>{" "}
                        <input className="input" type="text" />
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>
                        <label className="label">Starting Date</label>{" "}
                        <input className="input" type="text" />
                      </td>
                      <td>
                        <button className="btn kg-button2">Submit</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-6">
              <button
                className="btn kg-button2"
                onClick={()=>{this.props.cowProfile.addCowMilkingStartStopDetail.show();}}
              >
                Add Start/Stop Detail
              </button>
              <Table
                    className="calv-detail-table milk-stop-table"
                  ref={(ref) => {
                    this.tableMilkStartStopDetail = ref;
                  }}
                  colsName={[
                    "S. No.",
                    "Milk Status",
                    "Date",
                    "Lactation No",
                    "Remarks",
                    "Action"
                  ]}
                  cols={[
                    "sno",
                    "MilkStatus",
                    "Date",
                    "lactationNo",
                    "Reason",
                    "id"
                  ]}
                  link={"id"}
                  action={this.actionLinksMilkStatus} 
                  data={this.state.data}
                  getData={this.actionMilkStatus}
                />
              
            </div>
          </div>
        </div>
      </div>
      
      </>
    );
  }
  async getCowMilkStartStopById(id) {
    this.props.cowProfile.templateManager.showLoading("Fetching Cow Milking Stop/Start Record");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    let data = await fetch(
      apiUrl+"Milking/GetCowMilkingStartStopDetailById?Id="+id,
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
    this.props.cowProfile.templateManager.hideLoading();
    if(data.data.status==='success'){
        //this.props.cowProfile.templateManager.showSuccessMessage(data.data.message);
        this.props.cowProfile.addCowMilkingStartStopDetail.setDataToForm(data.milkingDetail);
        this.props.cowProfile.addCowMilkingStartStopDetail.show();
    }else{
      this.props.cowProfile.templateManager.showErrorMessage(data.data.message);
    }
    
  }
}
