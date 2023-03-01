import React, { Component } from "react";
import Footer from "../../Footer";
import Search from "../Search";
import CowCalvingDetail from "./CowCalvingDetail";
import CowProfileEditForm from "./CowProfileEditForm";
import CowContext from "../../../context/CowContext";
import TemplateContext from "../../../context/TemplateContext";
import SelectDamModal from "./SelectDamModal";
import SelectSireModal from "./SelectSireModal";
import CowProfileNewFormModal from "./CowProfileNewFormModal";
import CowServiceDetail from "./CowServiceDetail";
import AddCowServiceModal from "./AddCowServiceModal";
import SelectUserModal from "../User/SelectUserModal";
import MilkingChart from "./MilkingChart";
import AddCowMilkingStartStopDetail from "./AddCowMilkingStartStopDetail";
import CowComparisonChart from "./CowComparisonChart";
import CowMedicationDetail from "./CowMedicationDetail";
import CowSummary from "./CowSummary";
import SellCowModal from "./SellCowModal";
import ErrorBoundary from "../Templates/ErrorBoundary";
import axios from "axios";
import { apiUrl } from "../../../context/AppContext";
//const Footer = React.lazy(()=>{import("../../Footer")});

export default class CowProfile extends Component {
  static contextType = CowContext;
  constructor(props) {
    super(props);
    this.birthStatus = {
      1: "Normal",
      2: "Abnormal",
      3: "Child Died",
    };
    
  }
  loadCowWholeData = async (id) => {
    await this.cowEditForm.getDataByCowId(id);
    this.cowCalvingDetail.table.loadData();
    this.cowServiceDetail.table.loadData();
    this.milkingChart.table.loadData();
    this.milkingChart.tableMilkStartStopDetail.loadData();
    this.medicationDetail.table.loadData();
    this.sellCowModal.resetSellForm();
    this.sellCowModal.updateSelectedCow();
  };
  componentDidMount(props) {
    this.search.cowEditForm = this.cowEditForm;
    this.selectDamModal.cowEdit = this.cowEditForm;
    this.context.initializeData();
    this.templateManager.hideLoading();
  }
  render() {
    if (this.context) {
      this.context.activeUrl = "/admin/cow-profile";
    }
    return (
      <TemplateContext.Consumer>
        {(data) => {
          this.templateManager = data.templateManager;
          return (
            <>
              <div
                className="main-content multicollapse collapse-horizontal2 cow-profile"
                id="main-content"
                style={{ zIndex: 1 }}
              >
                <div className="row page-title">
                  <div>
                    <h1>Cow Profile</h1>
                  </div>
                  <Search
                    ref={(ref) => {
                      this.search = ref;
                    }}
                    cowObject={this.cowEditForm}
                    cowProfile={this}
                    searchApi={"Cows/GetCowsIDNamePairByTagNo"}
                    loadDataOnClick={this.loadCowWholeData}
                  />
                </div>
                <CowProfileEditForm
                  ref={(ref) => {
                    this.cowEditForm = ref;
                  }}
                  cowProfile={this}
                  templateManager={data.templateManager}
                  //selectDam={this.selectDam}
                  //selectSire={this.selectSire}
                />
                <CowCalvingDetail
                  ref={(ref) => {
                    this.cowCalvingDetail = ref;
                  }}
                  cowProfile={this}
                />
                <CowServiceDetail
                  ref={(ref) => {
                    this.cowServiceDetail = ref;
                  }}
                  cowProfile={this}
                />
                <MilkingChart
                  ref={(ref) => {
                    this.milkingChart = ref;
                  }}
                  cowProfile={this}
                />
                <CowComparisonChart />
                <CowMedicationDetail
                  cowProfile={this}
                  ref={(ref) => {
                    this.medicationDetail = ref;
                  }}
                  templateManager={data.templateManager}
                />
                <CowSummary
                  ref={(ref) => {
                    this.cowSummary = ref;
                  }}
                />
                {/*
            <CowSummary/>
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
              <CowProfileNewFormModal
                ref={(ref) => {
                  this.cowNewModal = ref;
                }}
                cowProfile={this}
                templateManager={data.templateManager}
              />
              <ErrorBoundary>
              <AddCowServiceModal
                ref={(ref) => {
                  this.addCowServiceModal = ref;
                  this.context.addCowServiceModal = ref;
                }}
                cowProfile={this}
                templateManager={data.templateManager}
              />
              </ErrorBoundary>
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
                cowProfile={this}
              />
              <AddCowMilkingStartStopDetail
                ref={(ref) => {
                  this.addCowMilkingStartStopDetail = ref;
                  this.context.addCowMilkingStartStopDetail = ref;
                }}
                cowProfile={this}
                templateManager={data.templateManager}
              />
              <SellCowModal
                ref={(ref)=>{this.sellCowModal = ref;}} 
                cowProfile={this}
                templateManager={data.templateManager}
              />
            </>
          );
        }}
      </TemplateContext.Consumer>
    );
  }
  showNewCowModal = () => {
    this.cowNewModal.show();
  };
  setDataForCowProfile= async()=>{
    this.context.initializeData();
  }
  
}
CowProfile.contextType = CowContext;
