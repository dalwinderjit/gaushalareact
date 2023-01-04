import React, { Component } from "react";
import Table from "../../Table";
import $ from "jquery";
import Modal from "../Templates/Modal";

export default class SelectUserModal extends Modal {
  constructor(props) {
    super(props);
    this.state = {
      selectedDoctorIds: [],
      selectedDoctorId: "",
      multipleSelection: false,
    };
  }
  
  setMultipleSelection = (type) => {
    this.setState({ multipleSelection: type });
  };
  setDoctor = async (data, type = "add") => {
    let added =false;
    if (this.state.multipleSelection === true) {
      if (type === "add") {
        if (!this.state.selectedDoctorIds.includes(data.id)) {
          if(!this.state.selectedDoctorIds.includes(data.id)){

            await this.setState((prevState) => {
              console.log(prevState);
              let selectedDoctorIds = prevState.selectedDoctorIds;
              console.log('SDIDS',selectedDoctorIds);
              if(typeof selectedDoctorIds !== 'object'){
                selectedDoctorIds = [];
              }
              if(!selectedDoctorIds.includes(data.id)){
                selectedDoctorIds.push(data.id);
              }
              prevState.selectedDoctorIds = selectedDoctorIds;
              return prevState;
            });
            added =true;
          }
        }else{
          await this.setState((prevState) => {
            let selectedDoctorIds = prevState.selectedDoctorIds;
            let index = selectedDoctorIds.indexOf(data.id);
            if (index > -1) {
              selectedDoctorIds.splice(index, 1);
            }
            prevState.selectedDoctorIds = selectedDoctorIds;
            return prevState;
          });
        }
      } else {
        if (!this.state.selectedDoctorIds.includes(data.id)) {
          await this.setState((prevState) => {
            let selectedDoctorIds = prevState.selectedDoctorIds;
            //remove id
            let index = selectedDoctorIds.indexOf(data.id);
            if (index > -1) {
              selectedDoctorIds.splice(index, 1);
            }
            prevState.selectedDoctorIds = selectedDoctorIds;
            return prevState;
          });
        }
      }
    } else {
      if (type === "add") {
        this.setState({ selectedDoctorId: data.id });
        added=true;
      } else {
        this.setState({ selectedDoctorId: "" });
      }
    }
    return added;
  };
  actionLinks = (row) => {
    let type = "";
    if (this.state.multipleSelection === true) {
      type = "checkbox";
    } else {
      type = "radio";
    }
    return (
      <>
        <input
          type={type}
          name="userSelectRadio"
          checked={
            this.state.multipleSelection === false
              ? this.state.selectedDoctorId === row.id
              : this.state.selectedDoctorIds.includes(row.id)
          }
          onChange={async (e) => {
            let added = await this.setDoctor(row, "add");
            let type = 'add';
            if(!added){
              type='delete;'
            }
            console.log("type",type);
            this.currentObject.setDoctors(row, type);
            if(this.state.multipleSelection===false){
              this.hide();
            }
          }}
        />
      </>
    );
  };
  getUsersData = () => {
    //call get doctors api here
    return {
      data: [
        {
          sno: 1,
          id: 2,
          usertype: "doctor",
          name: "Dr. Satbir Singh",
          username: "satbir",
          created: "05/06/2022 15:30:30",
        },
        {
          sno: 2,
          id: 3,
          usertype: "doctor",
          name: "Dr. Harbans Singh",
          username: "Harbans.doctor",
          created: "07/08/2022 15:44:00",
        },
        {
          sno: 3,
          id: 4,
          usertype: "doctor",
          name: "Dr. Jagjit Singh",
          username: "Jagjit.doctor",
          created: "07/08/2022 15:44:00",
        },
        {
          sno: 4,
          id: 5,
          usertype: "doctor",
          name: "Dr. Jagjit Singh",
          username: "jugraj.doc",
          created: "07/08/2022 15:44:00",
        },
      ],
      recordsFiltered: 4,
      recordsTotal: 4,
    };
  };
  
  render() {
    return (
      <div
        className="modal fade"
        id="selectUserModal"
        tabIndex="-1"
        aria-hidden="true"
        ref={(ref) => {
          this.modal = ref;
        }}
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="">
                Select Doctor
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={this.hide}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control cpinput"
                          placeholder="Dam name"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          id="damtable_dam_name"
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control cpinput"
                          placeholder="Dam Tag no"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          id="damtable_dam_no"
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control cpinput"
                          placeholder="Cow name"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control cpinput"
                          placeholder="Cow name"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-9"></div>
                    <div className="col-md-3 text-end">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          /*cow.select_dam_datatable.draw();*/
                        }}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                  <Table
                    ref={(ref) => {
                      this.table = ref;
                    }}
                    colsName={[
                      "#",
                      "Username",
                      "Name",
                      "Created",
                      "User Type",
                      "Select Doctor",
                    ]}
                    cols={[
                      "sno",
                      "username",
                      "name",
                      "created",
                      "usertype",
                      "id",
                    ]}
                    link={"id"}
                    action={this.actionLinks}
                    getData={this.getUsersData}
                  />
                </div>
              </div>
            </div>
            {/*<div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={this.hide}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
                </div>*/}
          </div>
        </div>
      </div>
    );
  }
  getChecked = (row) => {
    if (this.state.multipleSelection === false) {
      if (this.state.selectedDoctorId === row.id) {
        return true;
      } else {
        return false;
      }
    } else {
      console.log("seledocid", this.state.selectedDoctorIds);
      if (this.state.selectedDoctorIds.includes(row.id)) {
        return true;
      } else {
        return false;
      }
    }
  };
  clearDoctorSelection=()=>{
    this.setState({selectedDoctorIds:[],selectedDoctorId:''});
  }
  
}
