import React, { Component } from "react";
import Footer from "../../Footer";
import Search from "../Search";
//import BullCalvingDetail from "./BullCalvingDetail";
import BullProfileEditForm from "./BullProfileEditForm";
import BullContext from "../../../context/BullContext";
import TemplateContext from "../../../context/TemplateContext";
import SelectDamModal from "../Cow/SelectDamModal";
import SelectSireModal from "../Cow/SelectSireModal";
import SelectUserModal from "../User/SelectUserModal";
import BullProfileNewFormModal from "./BullProfileNewFormModal";
import BullServiceDetail from "./BullServiceDetail";
import BullProgenyDetail from "./BullProgenyDetail";
import BullMedicationDetail from "./BullMedicationDetail";
import BullSummary from "./BullSummary";
import AddBullServiceModal from "./AddBullServiceModal";
import SellBullModal from "./SellBullModal";
/*

import BullComparisonChart from "./BullComparisonChart";
*/

export default class BullProfile extends Component {
  static contextType = BullContext;
  constructor(props) {
    super(props);
    this.birthStatus = {
      1: "Normal",
      2: "Abnormal",
      3: "Child Died",
    };
  }
  loadBullWholeData = async (id) => {
    await this.bullEditForm.getDataByBullId(id);
    this.bullServiceDetail.table.loadData();
    this.bullProgenyDetail.table.loadData();
    this.addBullServiceModal.setBullData();
    this.medicationDetail.updateSelectedBull();
    this.medicationDetail.table.loadData();
    this.sellBullModal.updateSelectedBull();
    //this.bullCalvingDetail.table.loadData();
    //this.milkingChart.table.loadData();
    //this.milkingChart.tableMilkStartStopDetail.loadData();
  };
  componentDidMount(props) {
    this.search.bullEditForm = this.bullEditForm;
    this.selectDamModal.bullEdit = this.bullEditForm;
    this.templateManager.hideLoading();
    //this.loadBullWholeData(1532);
  }
  render() {
    if (this.context) {
      this.context.activeUrl = "/admin/bull-profile";
    }
    return (
      <TemplateContext.Consumer>
        {(data) => {
          this.templateManager = data.templateManager;
          return (
            <>
              <div
                className="main-content multicollapse collapse-horizontal2 bull-profile"
                id="main-content"
                style={{ zIndex: 1 }}
              >
                <div className="row page-title">
                  <div>
                    <h1>Bull Profile</h1>
                  </div>
                  <Search
                    ref={(ref) => {
                      this.search = ref;
                    }}
                    bullObject={this.bullEditForm}
                    cowProfile={this}
                    searchApi={"Bulls/GetBullsIDNamePairByTagNo"}
                    loadDataOnClick={this.loadBullWholeData}
                  />
                </div>
                <BullProfileEditForm
                  ref={(ref) => {
                    this.bullEditForm = ref;
                  }}
                  bullProfile={this}
                  templateManager={data.templateManager}
                />
                <BullServiceDetail
                  ref={(ref) => {
                    this.bullServiceDetail = ref;
                  }} bullProfile={this}
                />
                <BullProgenyDetail
                  ref={(ref) => {
                    this.bullProgenyDetail = ref;
                  }} bullProfile={this}
                />
                <BullMedicationDetail bullProfile={this} ref={(ref)=>{this.medicationDetail = ref;}} templateManager={data.templateManager}/>
                <BullSummary ref={(ref) => { this.bullSummary = ref; }} />
                {/*<BullCalvingDetail
                  ref={(ref) => {
                    this.bullCalvingDetail = ref;
                  }} bullProfile={this} 
                />
                
                <BullComparisonChart/>
                {/*
            <BullSummary/>
            */}
                <div className="row">
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </div>
                <Footer />
              </div>
              <BullProfileNewFormModal
                ref={(ref) => {
                  this.bullNewModal = ref;
                }}
                bullProfile={this}
                templateManager={data.templateManager}
              />
              
              <AddBullServiceModal
                ref={(ref) => {
                    this.addBullServiceModal =ref;
                  this.context.addBullServiceModal = ref;
                }}
                bullProfile={this}
                templateManager={data.templateManager}
              />
              <SelectDamModal
                ref={(ref) => {
                  this.selectDamModal = ref;
                }}
              />
              <SelectSireModal
                ref={(ref) => {
                  this.selectSireModal = ref;
                }}
              />
              <SelectUserModal
                ref={(ref) => {
                  this.selectUserModal = ref;
                }}
                bullProfile={this}
              />
              <SellBullModal
                ref={(ref)=>{this.sellBullModal = ref;}} 
                bullProfile={this}
                templateManager={data.templateManager}
                />
            </>
          );
        }}
      </TemplateContext.Consumer>
    );
  }
  showNewBullModal = () => {
    this.bullNewModal.show();
  };
}
BullProfile.contextType = BullContext;
