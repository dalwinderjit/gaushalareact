import React, { Component } from "react";
import Footer from "../../Footer";
import Search from "../Search";
import HeiferContext from "../../../context/HeiferContext";
import TemplateContext from "../../../context/TemplateContext";
import SelectUserModal from "../User/SelectUserModal";
import VaccinationDetail from "./VaccinationDetail";

export default class Vaccination extends Component {
  static contextType = HeiferContext;
  constructor(props) {
    super(props);
    this.birthStatus = {
      1: "Normal",
      2: "Abnormal",
      3: "Child Died",
    };
  }
  loadVaccinationData = async (id) => {
    //await this.heiferEditForm.getDataByHeiferId(id);
    this.medicationDetail.table.loadData();
  };
  componentDidMount(props) {
    //this.search.heiferEditForm = this.heiferEditForm;
    //this.selectDamModal.heiferEdit = this.heiferEditForm;
    this.templateManager.hideLoading();
  }
  render() {
    if (this.context) {
      this.context.activeUrl = "/admin/individual";
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
                    <h1>Vaccination</h1>
                  </div>
                  <Search
                    ref={(ref) => {
                      this.search = ref;
                    }}
                    searchApi={"Animals/GetAnimalIDNamePairByTagNo"}
                    loadDataOnClick={this.loadVaccinationData}
                  />
                </div>
                <VaccinationDetail
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
              <SelectUserModal
                ref={(ref) => {
                  this.selectUserModal = ref;
                }}
                heiferProfile={this}
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
Vaccination.contextType = HeiferContext;
