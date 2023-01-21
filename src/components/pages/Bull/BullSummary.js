import React, { Component } from "react";

export default class BullSummary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cowId: 0,
      total: 0,
      failed: 0,
      pending: 0,
      sold: 0,
      confirmed: 0,
      successful: 0,
      female: 0,
      male: 0,
      died: 0,
      interCalvPeriod: {/*
        "1-2": "17 Months, 1 Days",
        "2-3": "9 Months, 5 Days",
        "3-4": "39 Months, 13 Days",
        "4-5": "10 Months, 10 Days",
        "5-6": "13 Months, 7 Days",
        "6-7": "12 Months, 4 Days",
        "7-8": "1 Months, 9 Days",
        "8-9": "0 Months, -1 Days",
        "9-10": "16 Months, 29 Days",
        "10-13": "0 Months, -9 Days",
        "13-14": "-60 Months, -3 Days",*/
      },
    };
  }

  render() {
    let milkingChartStyle = {
      minWidth: "max-content",
      marginTop: "25px",
    };
    let padding_right_20 = { paddingRight: "20px" };
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="row" style={padding_right_20}>
            <div className="title">Summary</div>

            <div className="col-md-12 div-borderd">
              <table className="milking-chart">
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>Total</th>
                    <th>Failed </th>
                    <th>Pending </th>
                    <th>Cow Sold </th>
                    <th>Confirmed </th>
                    <th>Died </th>
                    <th>Successful</th>
                    <th>Female</th>
                    <th>Male</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    <td id="summary_total">{this.state.total}</td>
                    <td id="summary_failed">{this.state.failed}</td>
                    <td id="summary_pending">{this.state.pending}</td>
                    <td id="summary_sold">{this.state.sold}</td>
                    <td id="summary_confirmed">{this.state.confirmed}</td>
                    <td id="summary_died">{this.state.died}</td>
                    <td id="summary_successful">{this.state.successful}</td>
                    <td id="summary_female">{this.state.female}</td>
                    <td id="summary_male">{this.state.male}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="col-md-3 div-borderd" style={milkingChartStyle}>
              <table className="milking-chart" id="inter-calv-period">
                <thead>
                  <tr>
                    <th>
                      Lactation
                    </th>
                    <th>
                      Intercalving Period
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(this.state.interCalvPeriod).map((values,index)=>{
                    return (<tr key={index}><td>{values[0]}</td><td>{values[1]}</td></tr>)
                  })}
                  <tr>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-9 div-borderd cow-quanlity-div">
              <div className="row">
                <div className="col-md-9">
                  <h2>
                    Bull Quality{" "}
                    <svg className="menu-icon">
                      <use xlinkHref="#cow-icon" />
                    </svg>
                  </h2>
                  <div>
                    <button className="btn kdgs-btn kdgs-btn-good kdgs-btn-bold">
                      Good
                    </button>
                    <button className="btn kdgs-btn kdgs-btn-better kdgs-btn-bold">
                      Better
                    </button>
                    <button className="btn kdgs-btn kdgs-btn-best kdgs-btn-bold">
                      Best
                    </button>
                    <button className="btn kdgs-btn kdgs-btn-average kdgs-btn-bold">
                      Average
                    </button>
                    <br />
                  </div>
                  <div>
                    <button className="btn kdgs-btn kdgs-btn-primary2">
                      Save
                    </button>
                    <span></span>
                    <button className="btn kdgs-btn kdgs-btn-userdefined1">
                      Update
                    </button>
                  </div>
                </div>
                <div className="col-md-3">
                  <div>BEST</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  setSummary = (data) => {
    this.setState({
      cowId: data.cowId,
      total: data.total,
      failed: data.failed,
      pending: data.pending,
      sold: data.sold,
      confirmed: data.confirmed,
      successful: data.successful,
      female: data.female,
      male: data.male,
      died: data.died,
    });
  };
  setInterCalvPeriodData = (data) => {
    this.setState({interCalvPeriod:data})
  };
}
