import React, { Component } from "react";
import $ from "jquery";
import Table from "../../Table";
import { apiUrl } from "../../../context/AppContext";
import Modal from "../Templates/Modal";

export default class SelectSireModal extends Modal {
  constructor(props) {
    super(props);
    this.state = {
      data: [
      ],
      recordsTotal: 0,
      recordsFiltered: 0,
      pageNo: 1,
      recordsPerPage: 10,
      multipleSelection: false,
      selectedRecord:''
    };
  }

  getSireData = async (length_ = 10, start_ = 0) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    //console.log(this.state);
    //console.log(this.state.pageNo);
    //console.log(this.state.recordsPerPage);
    //let start = (this.state.pageNo - 1) * this.state.recordsPerPage + 1;
    let data = await fetch(
      `${apiUrl}Cows/GetSires?length=${length_}&start=${start_}`,
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
    //console.log(data);
    //this.setState({data:data.data})
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
          type={type}
          value={row.id}
          name="selectSireRadio"
          checked = {this.state.selectedRecord === row.id}
          onChange={(e) => {
            this.setState({selectedRecord : row.id});
            if (this.currentObject!=null) {
              this.currentObject.setSire(row);
            }else{
              if (this.type && this.type === "newCow") {
                this.cowNew.setSire(row);
              } else {
                if (this.currentObject) {
                  this.currentObject.setSire(row);
                } else {
                  this.cowEdit.setSire(row);
                }
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
  search = () => {
    this.table.loadData();
  };
  render() {
    return (
      <div
        className="modal fade"
        id="selectSireModal"
        tabIndex="-1"
        aria-labelledby="selectSireModal_"
        aria-hidden="true"
        style={{ zIndex: 11 }}
        ref={ref=>{this.modal = ref;}}
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="">
                Select Sire
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
                          placeholder="Sire name"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          id="siretable_sire_name"
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control cpinput"
                          placeholder="Sire Tag no"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          id="siretable_sire_no"
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
                      "Sire Tag No",
                      "Sire Name",
                      "Date of Birth",
                      "Breed",
                      "Sire's Wt",
                      "Color",
                      "Select Sire",
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
                    getData={this.getSireData}
                  />
                  <div style={{ padding: "10px" }}>
                    {/*
                    <input
                      className="kgsbtn btn kgsbtn-success"
                      value="Select Sire"
                      onClick="cow.setSire"
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
}
