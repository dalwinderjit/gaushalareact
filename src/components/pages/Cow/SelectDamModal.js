import React, { Component } from "react";
import $ from "jquery";
import Table from "../../Table";
import { apiUrl } from "../../../context/AppContext";
import Modal from "../Templates/Modal";

export default class SelectDamModal extends Modal {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      recordsTotal: 0,
      recordsFiltered: 0,
      pageNo: 1,
      recordsPerPage: 10,
      selectedRecordsIds: [],
      selectedRecord:'',
      multipleSelection:false
    };
  }
  getDamsData = async (length_ = 10, start_ = 0) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    //let start = (this.state.pageNo - 1) * this.state.recordsPerPage + 1;
    let data = await fetch(
      `${apiUrl}Cows/Get?length=${length_}&start=${start_}`,
      requestOptions
    )
      .then((res) => res.json())
      .then(
        (result) => {
          return result;
        },
        (error) => {
          return error;
        }
      );
    return data;
  };
  actionLinks = (row) => {
    let type = "";
    if (this.state.multipleSelection === false) {
      type = "radio";
    } else {
      type = "checkbox";
    }
    return (
      <>
        <input 
          name="selectDamRadio"
          checked = {this.state.selectedRecord === row.id}
          type={type}
          value={row.id}
          onChange={(e) => {
            this.setState({selectedRecord : row.id});
            if(this.currentObject!=null){
              this.currentObject.setDam(row);
            }else{
              if (this.type && this.type === "newCow") {
                this.cowNew.setDam(row);
              } else {
                this.cowEdit.setDam(row);
              }
            }
            if(this.state.multipleSelection===false){
              this.hide();
            }
          }}
        />
      </>
    );
  };
  render() {
    return (
      <div
        ref={ref=>{this.modal = ref;}}
        className="modal fade"
        id="selectDamModal"
        tabIndex="-1"
        aria-labelledby="selectDamModal_"
        aria-hidden="true"
        style={{ zIndex: 11 }}
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="">
                Select Dam
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
                        onClick={this.search}
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
                      "Dam Tag No",
                      "Dam Name",
                      "Date of Birth",
                      "Breed",
                      "Dam's Wt",
                      "Color",
                      "Select Dam",
                    ]}
                    cols={[
                      "sno",
                      "tagNo",
                      "name",
                      "dob",
                      "breed_",
                      "weight",
                      "colour_",
                      "id",
                    ]}
                    link={"id"}
                    action={this.actionLinks}
                    data={this.state.data}
                    getData={this.getDamsData}
                    
                  />
                  <div style={{ padding: "10px" }}>
                    {/*
                    <input
                      className="kgsbtn btn kgsbtn-success"
                      value="Select Dam"
                      onClick="cow.setDam"
                    />
                    <input className="kgsbtn btn kgsbtn-update" value="Update">
                    <input className="kgsbtn btn kgsbtn-clear" value="Clear">
                    <input className="kgsbtn btn kgsbtn-delete" value="Delete"> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  search = () => {
    this.table.loadData();
  };
}
