import { isEmptyArray } from 'formik';
import React, { Component } from 'react'

export default class Table extends Component {
    maxPages = 5;
    constructor(props){
        super(props);
        this.state={
            tableClassName:this.props.className || "calv-detail-table table-bordered",
            recordsFiltered:0,
            recordsTotal:0,
            recordsPerPage:10,
            pageNo:1,
            totalPages:0,
            stateChange:true,
            search:'',
            pageNoOption:{2:2,3:3,10:10,25:25,50:50,'All':'All'},
            data:[],
        }
        
    }
    udpateState= async (data)=>{
        //console.log("table State updated")
        await this.setState({
            recordsFiltered:data.recordsFiltered,
            recordsTotal:data.recordsTotal,
            pageNo:data.pageNo,
            recordsPerPage:data.recordsPerPage,
            totalPages:Math.ceil(data.recordsTotal/data.recordsPerPage),
        });
        //console.log(this.state);
    }
    increasePageNumber= async ()=>{
        if(this.state.pageNo<this.state.totalPages){
            await this.setState({
                pageNo:(this.state.pageNo+1)
            },()=>{this.loadData()});
            //this.props.onTablePaginateChange({pageNo:(this.props.pageNo+1)});
            //this.loadData();
        }
    }
    decreasePageNumber= async ()=>{
        if(this.state.pageNo>1){
            await this.setState({
                pageNo:(this.state.pageNo-1)
            },()=>{this.loadData()});
        }
    }
    setPageNumber=(pageNo)=>{
        //console.log("setPageNo_")
        if(this.state.pageNo!=pageNo){
            //console.log("setPageNo")
            this.setState({pageNo:pageNo},()=>{this.loadData()});
            //this.props.onTablePaginateChange({pageNo:pageNo});
        }
    }
    getPaginateButton=()=>{
        this.state.totalPages = Math.ceil(this.state.recordsTotal/this.state.recordsPerPage);
        const rows = [];
        let class_  ="paginate_button previous";
        if(this.state.pageNo===1){
            class_ += " disabled";
        }
        rows.push(<span key={0} className={class_} onClick={this.decreasePageNumber}>Previous</span>);
        let start = 1;
        let end = this.maxPages;
        if(this.state.totalPages>this.maxPages){
            start = this.state.totalPages-this.maxPages;
            if(start+2!==this.state.pageNo){
                start = this.state.pageNo-2;
            }
            end = start+this.maxPages-1;
            if(end>this.state.totalPages){
                end = this.state.totalPages;
            }
            if(end-start<this.maxPages){
                //4
                //this.maxPages - (end-start) //2    
                //7
                //6
                start = start - (this.maxPages - (end-start))+1;
                if(start<1){
                    start=1;
                    end = this.maxPages;
                }
            }
        }
        if(end>=this.state.totalPages){
            end = this.state.totalPages;
        }
        for(let i=start;i<=end;i++){
            let class_="paginate_button";
            if(i===this.state.pageNo){
                class_ += " current";
            }
            rows.push(<span key={i} className={class_} onClick={()=>{this.setPageNumber(i)}}>{i}</span>);
        }
        class_ = "paginate_button next";
        if(this.state.pageNo===this.state.totalPages ||this.state.totalPages===0){
            class_ += " disabled";
        }
        rows.push(<span key={end+1} className={class_} onClick={this.increasePageNumber}>Next</span>);
        return <>{rows}</>;
    }
    getPaginateMessage= ()=>{
        let message = '';
        if(this.state.recordsTotal===0){
            message = 'No records Found';
        }else if(this.state.recordsFiltered===0){
            message = `Zero records filtered out of ${this.state.recordsTotal} records`;
        }else{
            let to = ((this.state.pageNo)*this.state.recordsPerPage);
            if(to>this.state.recordsFiltered){
                to = this.state.recordsFiltered;
            }
            let from = ((this.state.pageNo-1)*this.state.recordsPerPage)+1;
            message = `Showing ${from} to ${to} of ${this.state.recordsFiltered} filtered from ${this.state.recordsTotal} total entries`;
        }
        return message;
    }
    componentDidMount(props){
        //console.log("did moount")
        //console.log(props);
    }
    onChangeSelect=async (e)=>{
        let totalPages = Math.ceil(this.state.recordsTotal/e.target.value);
        //console.log("TP"+totalPages);
        await this.setState({
            recordsPerPage:e.target.value,
            totalPages : totalPages
        },()=>{this.loadData()});
        //console.log(this.state);
        //this.props.onRecordsPerPageChange(e.target.value);
    }
    onChangeSearch= async (e)=>{
        await this.setState({
            search:e.target.value
        });
        //call the searc api
        //this.props.onSearchValueChange(e.target.value);
    }
    getSearchBar=()=>{
        return(<input type="text" className="search" onChange={this.onChangeSearch} value={this.state.search}/>)
    }
    getAvailabePageOptions=()=>{
        let options = [];
        Object.entries(this.state.pageNoOption).map(([key,value])=>{
            options.push(<option key={key} value={key}>{value}</option>);
        });
        return(<select key={1} onChange={this.onChangeSelect} value={this.state.recordsPerPage}>{options}</select>);
    }
    loadData = async () => {
        //console.log("Retrieving Data");
        let data = await this.props.getData(this.state.recordsPerPage,((this.state.pageNo-1)*this.state.recordsPerPage)+1,this.state.pageNo);
        this.setState((prevState)=>{
            let data_ = prevState;
            data_.data = data.data;
            data_.recordsFiltered = data.recordsFiltered;
            data_.recordsTotal = data.recordsTotal;
            data_.totalPages = Math.ceil(this.props.recordsTotal/this.props.recordsPerPage)
            return data_;
        })
      };
      editLink=(id)=>{
        return <span className="fa fa-edit" onClick={()=>{console.log("editCalvingDetail")}}></span>;
      }
    componentDidMount=()=>{
        if(isEmptyArray(this.state.data)){
            //this.loadData();
        }
    }  
  render() {
    //console.log("Table render");
    
    let buttons = this.getPaginateButton();
    let message = this.getPaginateMessage();
    let table = "";
    if(this.props.colsName){
        let row = this.props.colsName;
        let row1 = this.props.cols;
        table = 
            <table className={this.state.tableClassName}>
                <thead>
                    <tr>
                        {row.map((item,index)=>{return(<th key={index}>{item}</th>)})}
                    </tr>
                </thead>
                <tbody>
                    {this.state.recordsFiltered === 0 ? <tr><td colSpan={row.length} className="text-center">No childs to display</td></tr> :
                        this.state.data.map((row,index) => {
                            return (
                                <tr key={index}>
                                    {row1.map((item,index)=>{return(<td key={index}>{(item==this.props.link)?this.props.action(row):row[item]}</td>)})}
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        ;
    }
    return (
        <>
            <div className="row">
                <div className="col-md-6">
                    {this.getAvailabePageOptions()}
                </div>
                <div className="col-md-6">
                    {this.getSearchBar()}
                </div>
            </div>
            {table}
            <div className="row">
            <div className="col-md-6">{message}</div>
            <div className="col-md-6 text-end">
                {buttons}
            </div>
            </div>
        </>
    )
  }
}
