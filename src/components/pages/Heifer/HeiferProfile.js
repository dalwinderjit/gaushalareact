import React, { Component } from "react";
import Footer from "../../Footer";
import Search from "../Search";
import HeiferProfileEditForm from "./HeiferProfileEditForm";
import HeiferContext from "../../../context/HeiferContext";
import TemplateContext from "../../../context/TemplateContext";
import SelectDamModal from "../Cow/SelectDamModal";
import SelectSireModal from "../Cow/SelectSireModal";
import HeiferProfileNewFormModal from "./HeiferProfileNewFormModal";
import SelectUserModal from "../User/SelectUserModal";
import HeiferMedicationDetail from "./HeiferMedicationDetail";
import SellHeiferModal from "./SellHeiferModal";

export default class HeiferProfile extends Component {
  static contextType = HeiferContext;
  constructor(props) {
    super(props);
    this.birthStatus = {
      1: "Normal",
      2: "Abnormal",
      3: "Child Died",
    };
  }
  loadHeiferWholeData = async (id) => {
    await this.heiferEditForm.getDataByHeiferId(id);
    //this.heiferCalvingDetail.table.loadData();
    //this.heiferServiceDetail.table.loadData();
    //this.milkingChart.table.loadData();
    //this.milkingChart.tableMilkStartStopDetail.loadData();
    this.medicationDetail.table.loadData();
    this.sellHeiferModal.resetSellForm();
    this.sellHeiferModal.updateSelectedHeifer();
  };
  componentDidMount(props) {
    this.search.heiferEditForm = this.heiferEditForm;
    this.selectDamModal.heiferEdit = this.heiferEditForm;
    this.templateManager.hideLoading();
  }
  render() {
    if (this.context) {
      this.context.activeUrl = "/admin/heifer-profile";
    }
    return (
      <TemplateContext.Consumer>
        {(data) => {
          this.templateManager = data.templateManager;
          return (
            <>
              <div
                className="main-content multicollapse collapse-horizontal2 heifer-profile"
                id="main-content"
                style={{ zIndex: 1 }}
              >
                <div className="row page-title">
                  <div>
                    <h1>Heifer Profile</h1>
                  </div>
                  <Search
                    ref={(ref) => {
                      this.search = ref;
                    }}
                    heiferObject={this.heiferEditForm}
                    heiferProfile={this}
                    searchApi={"Heifers/GetHeifersIDNamePairByTagNo"}
                    loadDataOnClick={this.loadHeiferWholeData}
                  />
                </div>
                <HeiferProfileEditForm
                  ref={(ref) => {
                    this.heiferEditForm = ref;
                  }}
                  heiferProfile={this}
                  templateManager={data.templateManager}
                />
                <HeiferMedicationDetail
                  heiferProfile={this}
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
              <HeiferProfileNewFormModal
                ref={(ref) => {
                  this.heiferNewModal = ref;
                }}
                heiferProfile={this}
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
                heiferProfile={this}
              />
              <SellHeiferModal
                ref={(ref)=>{this.sellHeiferModal = ref;}} 
                heiferProfile={this}
                templateManager={data.templateManager}
              />
            </>
          );
        }}
      </TemplateContext.Consumer>
    );
  }
  showNewHeiferModal = () => {
    this.heiferNewModal.show();
  };
}
HeiferProfile.contextType = HeiferContext;
