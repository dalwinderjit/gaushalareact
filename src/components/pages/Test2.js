import React, { Component } from "react";
import TemplateContext from "../../context/TemplateContext";
import ErrorBoundary from "../ErrorBoundary";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { each } from "jquery";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export default class Test2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: {
        7: {
          1: {
            quantity: 0,
            otherQuantity: 0,
            lactaionNo: 1,
            startDate: "0001-01-01T00:00:00",
            percentage: 0,
            dateFrom: "0001-01-01T00:00:00",
            dateTo: "0001-01-01T00:00:00",
          },
          2: {
            quantity: 0,
            otherQuantity: 0,
            lactaionNo: 2,
            startDate: "0001-01-01T00:00:00",
            percentage: 0,
            dateFrom: "0001-01-01T00:00:00",
            dateTo: "0001-01-01T00:00:00",
          },
          3: {
            quantity: 0,
            otherQuantity: 0,
            lactaionNo: 3,
            startDate: "0001-01-01T00:00:00",
            percentage: 0,
            dateFrom: "0001-01-01T00:00:00",
            dateTo: "0001-01-01T00:00:00",
          },
          4: {
            quantity: 80,
            otherQuantity: 0,
            lactaionNo: 4,
            startDate: "0001-01-01T00:00:00",
            percentage: 0,
            dateFrom: "0001-01-01T00:00:00",
            dateTo: "0001-01-01T00:00:00",
          },
          5: {
            quantity: 90,
            otherQuantity: 0,
            lactaionNo: 5,
            startDate: "0001-01-01T00:00:00",
            percentage: 0,
            dateFrom: "0001-01-01T00:00:00",
            dateTo: "0001-01-01T00:00:00",
          },
          6: {
            quantity: 100.796,
            otherQuantity: 2895.172,
            lactaionNo: 6,
            startDate: "2011-12-26T00:00:00",
            percentage: 53.25,
            dateFrom: "0001-01-01T00:00:00",
            dateTo: "0001-01-01T00:00:00",
          },
          7: {
            quantity: 189.296,
            otherQuantity: 4061.42,
            lactaionNo: 7,
            startDate: "2013-05-30T00:00:00",
            percentage: 100,
            dateFrom: "0001-01-01T00:00:00",
            dateTo: "0001-01-01T00:00:00",
          },
          8: {
            quantity: 127.13,
            otherQuantity: 0,
            lactaionNo: 8,
            startDate: "2015-03-31T08:38:00",
            percentage: 67.16,
            dateFrom: "0001-01-01T00:00:00",
            dateTo: "0001-01-01T00:00:00",
          },
        },
      },
      cow_detail: {
        1: {
          name: "Gujrati34",
          tagNo: "SW-719",
        },
        7: {
          name: "Radha/REDDY died",
          tagNo: "GR 006",
        },
      },
      labels: {
        1: "Lactation 1",
        2: "Lactation 2",
        3: "Lactation 3",
        4: "Lactation 4",
        5: "Lactation 5",
        6: "Lactation 6",
        7: "Lactation 7",
        8: "Lactation 8",
      },
      Data: [
        {
          id: 1,
          year: 2016,
          userGain: 80000,
          userLost: 823,
        },
        {
          id: 2,
          year: 2017,
          userGain: 45677,
          userLost: 345,
        },
        {
          id: 3,
          year: 2018,
          userGain: 78888,
          userLost: 555,
        },
        {
          id: 4,
          year: 2019,
          userGain: 90000,
          userLost: 4555,
        },
        {
          id: 5,
          year: 2020,
          userGain: 4300,
          userLost: 234,
        },
      ],
    };
    this.data = {
      labels: this.state.Data.map((data) => data.year),
      // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
      datasets: [
        {
          label: "Users Gained ",
          data: this.state.Data.map((data) => data.userGain),
          backgroundColor: "rgba(75,192,192,1)" /* [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ], */,
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    };
    //console.log("Data:",data);
  }

  componentDidMount = () => {
    this.templateManager.hideLoading();
  };
  prepareChartData = (data) => {
    try {
      let ChartData = { labels: [], datasets: [] };
      let emptyQuantities = [];
      Object.values(data.labels).map((value, index) => {
        emptyQuantities.push(10 * index);
        ChartData.labels.push(value);
      });
      //let title = '';
      Object.entries(data.cow_detail).map((value, index) => {
        //console.log("Index",index);
        //console.log(value[0]);
        let quantities = [];
        if (data.data[value[0]] != undefined) {
          //data.data[value[0]];
          let values__ = Object.values(data.data[value[0]]);
          for (let i = 0; i < values__.length; i++) {
            quantities.push(values__[i].quantity);
          }
        } else {
          quantities = emptyQuantities;
          /*console.log("not exists");
        for(let i=0;i<this.state.labels.length;i++){
          console.log(i);
          quantities.push(0);
        }*/
        }
        //console.log("Quantities",quantities);
        let obj = {
          label: value[1].name + "/" + value[1].tagNo + "HELLO",
          data: quantities,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        };
        ChartData.datasets.push(obj);
        //title += value[1].name+"/"+value[1].tagNo;
      });
      //console.log("chartData",ChartData);
      return ChartData;
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    let chartDATA = {
      data: {
        5: {
          1: {
            quantity: 0,
            otherQuantity: 0,
            lactaionNo: 1,
            startDate: "0001-01-01T00:00:00",
            percentage: 0,
            dateFrom: "0001-01-01T00:00:00",
            dateTo: "0001-01-01T00:00:00",
          },
          2: {
            quantity: 0,
            otherQuantity: 0,
            lactaionNo: 2,
            startDate: "0001-01-01T00:00:00",
            percentage: 0,
            dateFrom: "0001-01-01T00:00:00",
            dateTo: "0001-01-01T00:00:00",
          },
          3: {
            quantity: 0,
            otherQuantity: 0,
            lactaionNo: 3,
            startDate: "0001-01-01T00:00:00",
            percentage: 0,
            dateFrom: "0001-01-01T00:00:00",
            dateTo: "0001-01-01T00:00:00",
          },
          4: {
            quantity: 2505.04,
            otherQuantity: 0,
            lactaionNo: 4,
            startDate: "0001-01-01T00:00:00",
            percentage: 58.93,
            dateFrom: "0001-01-01T00:00:00",
            dateTo: "0001-01-01T00:00:00",
          },
          5: {
            quantity: 2714.55,
            otherQuantity: 0,
            lactaionNo: 5,
            startDate: "0001-01-01T00:00:00",
            percentage: 63.86,
            dateFrom: "0001-01-01T00:00:00",
            dateTo: "0001-01-01T00:00:00",
          },
          6: {
            quantity: 2374.532,
            otherQuantity: 0,
            lactaionNo: 6,
            startDate: "0001-01-01T00:00:00",
            percentage: 55.86,
            dateFrom: "0001-01-01T00:00:00",
            dateTo: "0001-01-01T00:00:00",
          },
          7: {
            quantity: 3203.836,
            otherQuantity: 0,
            lactaionNo: 7,
            startDate: "0001-01-01T00:00:00",
            percentage: 75.37,
            dateFrom: "0001-01-01T00:00:00",
            dateTo: "0001-01-01T00:00:00",
          },
          8: {
            quantity: 2611.56,
            otherQuantity: 0,
            lactaionNo: 8,
            startDate: "0001-01-01T00:00:00",
            percentage: 61.44,
            dateFrom: "0001-01-01T00:00:00",
            dateTo: "0001-01-01T00:00:00",
          },
          9: {
            quantity: 2819.968,
            otherQuantity: 0,
            lactaionNo: 9,
            startDate: "0001-01-01T00:00:00",
            percentage: 66.34,
            dateFrom: "0001-01-01T00:00:00",
            dateTo: "0001-01-01T00:00:00",
          },
          10: {
            quantity: 1420.774,
            otherQuantity: 0,
            lactaionNo: 10,
            startDate: "0001-01-01T00:00:00",
            percentage: 33.42,
            dateFrom: "0001-01-01T00:00:00",
            dateTo: "0001-01-01T00:00:00",
          },
          11: {
            quantity: 702.012,
            otherQuantity: 0,
            lactaionNo: 11,
            startDate: "0001-01-01T00:00:00",
            percentage: 16.52,
            dateFrom: "0001-01-01T00:00:00",
            dateTo: "0001-01-01T00:00:00",
          },
        },
        7: {
          1: {
            quantity: 0,
            otherQuantity: 0,
            lactaionNo: 1,
            startDate: "0001-01-01T00:00:00",
            percentage: 0,
            dateFrom: "0001-01-01T00:00:00",
            dateTo: "0001-01-01T00:00:00",
          },
          2: {
            quantity: 0,
            otherQuantity: 0,
            lactaionNo: 2,
            startDate: "0001-01-01T00:00:00",
            percentage: 0,
            dateFrom: "0001-01-01T00:00:00",
            dateTo: "0001-01-01T00:00:00",
          },
          3: {
            quantity: 0,
            otherQuantity: 0,
            lactaionNo: 3,
            startDate: "0001-01-01T00:00:00",
            percentage: 0,
            dateFrom: "0001-01-01T00:00:00",
            dateTo: "0001-01-01T00:00:00",
          },
          4: {
            quantity: 0,
            otherQuantity: 0,
            lactaionNo: 4,
            startDate: "0001-01-01T00:00:00",
            percentage: 0,
            dateFrom: "0001-01-01T00:00:00",
            dateTo: "0001-01-01T00:00:00",
          },
          5: {
            quantity: 0,
            otherQuantity: 0,
            lactaionNo: 5,
            startDate: "0001-01-01T00:00:00",
            percentage: 0,
            dateFrom: "0001-01-01T00:00:00",
            dateTo: "0001-01-01T00:00:00",
          },
          6: {
            quantity: 2995.968,
            otherQuantity: 0,
            lactaionNo: 6,
            startDate: "0001-01-01T00:00:00",
            percentage: 70.48,
            dateFrom: "0001-01-01T00:00:00",
            dateTo: "0001-01-01T00:00:00",
          },
          7: {
            quantity: 4250.716,
            otherQuantity: 0,
            lactaionNo: 7,
            startDate: "0001-01-01T00:00:00",
            percentage: 100,
            dateFrom: "0001-01-01T00:00:00",
            dateTo: "0001-01-01T00:00:00",
          },
          8: {
            quantity: 127.13,
            otherQuantity: 0,
            lactaionNo: 8,
            startDate: "0001-01-01T00:00:00",
            percentage: 2.99,
            dateFrom: "0001-01-01T00:00:00",
            dateTo: "0001-01-01T00:00:00",
          },
          9: {
            quantity: 0,
            otherQuantity: 0,
            lactaionNo: 9,
            startDate: "0001-01-01T00:00:00",
            percentage: 0,
            dateFrom: "0001-01-01T00:00:00",
            dateTo: "0001-01-01T00:00:00",
          },
          10: {
            quantity: 0,
            otherQuantity: 0,
            lactaionNo: 10,
            startDate: "0001-01-01T00:00:00",
            percentage: 0,
            dateFrom: "0001-01-01T00:00:00",
            dateTo: "0001-01-01T00:00:00",
          },
          11: {
            quantity: 0,
            otherQuantity: 0,
            lactaionNo: 11,
            startDate: "0001-01-01T00:00:00",
            percentage: 0,
            dateFrom: "0001-01-01T00:00:00",
            dateTo: "0001-01-01T00:00:00",
          },
        },
      },
      cow_detail: {
        1: {
          name: "Gujrati34",
          tagNo: "SW-719",
        },
        5: {
          name: "Shobha",
          tagNo: "GR 004",
        },
        7: {
          name: "Radha/REDDY died",
          tagNo: "GR 006",
        },
      },
      labels: {
        1: "Lactation 1",
        2: "Lactation 2",
        3: "Lactation 3",
        4: "Lactation 4",
        5: "Lactation 5",
        6: "Lactation 6",
        7: "Lactation 7",
        8: "Lactation 8",
        9: "Lactation 9",
        10: "Lactation 10",
        11: "Lactation 11",
      },
    };
    let ChartData = this.prepareChartData(chartDATA);

    this.data = ChartData;
    //console.log("ChartData1" ,ChartData);
    return (
      <TemplateContext.Consumer>
        {(data) => {
          this.templateManager = data.templateManager;
          return (
            <>
              <div>Test 2</div>
              <p>Using Chart.js in React</p>
              <ErrorBoundary>
                <Bar
                  data={this.data}
                  options={{
                    plugins: {
                      title: {
                        display: true,
                        text: "Users Gained between 2016-2020",
                      },
                    },
                  }}
                />
              </ErrorBoundary>
            </>
          );
        }}
      </TemplateContext.Consumer>
    );
  }
}
