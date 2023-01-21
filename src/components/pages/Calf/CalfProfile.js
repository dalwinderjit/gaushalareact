import React, { Component } from "react";
import Footer from "../../Footer";
import Search from "../Search";
//import CalfCalvingDetail from "./CalfCalvingDetail";
import CalfProfileEditForm from "./CalfProfileEditForm";
import CalfContext from "../../../context/CalfContext";
import TemplateContext from "../../../context/TemplateContext";
import SelectDamModal from "../Cow/SelectDamModal";
import SelectSireModal from "../Cow/SelectSireModal";
import CalfProfileNewFormModal from "./CalfProfileNewFormModal";
//import CalfServiceDetail from "./CalfServiceDetail";
//import AddCalfServiceModal from "./AddCalfServiceModal";
import SelectUserModal from "../User/SelectUserModal";
//import MilkingChart from "./MilkingChart";
//import AddCalfMilkingStartStopDetail from "./AddCalfMilkingStartStopDetail";
//import CalfComparisonChart from "./CalfComparisonChart";
import CalfMedicationDetail from "./CalfMedicationDetail";
//import CalfSummary from "./CalfSummary";
import SellCalfModal from "./SellCalfModal";
//const Footer = React.lazy(()=>{import("../../Footer")});

export default class CalfProfile extends Component {
  static contextType = CalfContext;
  constructor(props) {
    super(props);
    this.birthStatus = {
      1: "Normal",
      2: "Abnormal",
      3: "Child Died",
    };
  }
  loadCalfWholeData = async (id) => {
    await this.calfEditForm.getDataByCalfId(id);
    this.calfCalvingDetail.table.loadData();
    this.calfServiceDetail.table.loadData();
    this.milkingChart.table.loadData();
    this.milkingChart.tableMilkStartStopDetail.loadData();
    this.medicationDetail.table.loadData();
    this.sellCalfModal.resetSellForm();
    this.sellCalfModal.updateSelectedCalf();
  };
  componentDidMount(props) {
    this.search.calfEditForm = this.calfEditForm;
    this.selectDamModal.calfEdit = this.calfEditForm;
    this.templateManager.hideLoading();
  }
  render() {
    if (this.context) {
      this.context.activeUrl = "/admin/calf-profile";
    }
    return (
      <TemplateContext.Consumer>
        {(data) => {
          this.templateManager = data.templateManager;
          return (
            <>
              <div
                className="main-content multicollapse collapse-horizontal2 calf-profile"
                id="main-content"
                style={{ zIndex: 1 }}
              >
                <div className="row page-title">
                  <div>
                    <h1>Male Calf Profile</h1>
                  </div>
                  <Search
                    ref={(ref) => {
                      this.search = ref;
                    }}
                    calfObject={this.calfEditForm}
                    calfProfile={this}
                    searchApi={"Calfs/GetCalfsIDNamePairByTagNo"}
                    loadDataOnClick={this.loadCalfWholeData}
                  />
                </div>
                <CalfProfileEditForm
                  ref={(ref) => {
                    this.calfEditForm = ref;
                  }}
                  calfProfile={this}
                  templateManager={data.templateManager}
                  //selectDam={this.selectDam}
                  //selectSire={this.selectSire}
                />
                {/*<CalfCalvingDetail
                  ref={(ref) => {
                    this.calfCalvingDetail = ref;
                  }}
                  calfProfile={this}
                />*/}
                <CalfMedicationDetail
                  calfProfile={this}
                  ref={(ref) => {
                    this.medicationDetail = ref;
                  }}
                  templateManager={data.templateManager}
                />
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
              <CalfProfileNewFormModal
                ref={(ref) => {
                  this.calfNewModal = ref;
                }}
                calfProfile={this}
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
                calfProfile={this}
              />
              {/*
              <AddCalfMilkingStartStopDetail
                ref={(ref) => {
                  this.addCalfMilkingStartStopDetail = ref;
                  this.context.addCalfMilkingStartStopDetail = ref;
                }}
                calfProfile={this}
                templateManager={data.templateManager}
              />*/}
              <SellCalfModal
                ref={(ref)=>{this.sellCalfModal = ref;}} 
                calfProfile={this}
                templateManager={data.templateManager}
              />
            </>
          );
        }}
      </TemplateContext.Consumer>
    );
  }
  showNewCalfModal = () => {
    this.calfNewModal.show();
  };
}
CalfProfile.contextType = CalfContext;
