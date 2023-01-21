import React, { Component } from 'react'

export default class TablePaginate extends Component {
    maxPages = 5;
    constructor(props){
        super(props);
        console.log('hi im paginate constructor');
        this.state={
            recordsFiltered:this.props.recordsFiltered,
            recordsTotal:this.props.recordsTotal,
            recordsPerPage:this.props.recordsPerPage,
            pageNo:this.props.pageNo,
            totalPages:Math.ceil(this.props.recordsTotal/this.props.recordsPerPage),
            stateChange:true
        }
        console.log(this.props);
        console.log(this.state);
        console.log("Page NO " + this.props.pageNo);
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
    increasePageNumber=()=>{
        if(this.props.pageNo<this.props.totalPages){
            this.props.onTablePaginateChange({pageNo:(this.props.pageNo+1)});
        }
    }
    decreasePageNumber= async ()=>{
        if(this.props.pageNo>1){
            await this.setState({
                pageNo:(this.state.pageNo-1)
            });
            this.props.onTablePaginateChange({pageNo:(this.props.pageNo-1)});
        }
    }
    setPageNumber=(pageNo)=>{
        console.log("setting pageNo");
        if(this.state.pageNo!=pageNo){
            this.setState({pageNo:pageNo});
            this.props.onTablePaginateChange({pageNo:pageNo});
        }
    }
    getPaginateButton=()=>{
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
        console.log("did moount")
        console.log(props);
    }
  render() {
    console.log('hi im paginate')
    let buttons = this.getPaginateButton();
    let message = this.getPaginateMessage();
    return (
        <div className="row">
          <div className="col-md-6">{message}</div>
          <div className="col-md-6 text-end">
              {buttons}
          </div>
        </div>
    )
  }
}
