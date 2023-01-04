import React, { Component } from 'react'
import $ from 'jquery';

export default class Search extends Component {
    constructor(){
        super();
        this.state = {tagNo:'',searchResults:{}};
    }
    getDataByCowTagNo = async (tag_no)=>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            //body: JSON.stringify({ tagNo: tag_no,pageNo:1 })
        };
        let data = await fetch(`https://localhost:5001/api/Cows/GetCowsIDNamePairByTagNo?tagNo=${tag_no}&pageNo=1`,requestOptions)
          .then(res => res.json())
          .then(
            (result) => {
                //console.log('result retrieved')
                return result
            },
            (error) => {
                console.log("error");
                console.log(error);
                return error
            }
          )
          //console.log(data);
          this.setState({searchResults:data})
	}
    tagNoOnChange = async (e)=>{
        $('#search-result-list').css('display','block');
        if(this.state.tagNo!==e.target.value){
            await this.setState({tagNo:e.target.value});
            this.getDataByCowTagNo(this.state.tagNo);
        }
    }
  render() {
    return (
        <div style={{zIndex:1}}>
        <input type="text" className="search" id="search-bar"  onChange={this.tagNoOnChange} value={this.state.tagNo} onFocus={this.tagNoOnChange}/>
        <span className="fa fa-search"></span>
        <ul className="search-result-list" id="search-result-list" style={{display:'block'}}>
            {
                Object.keys(this.state.searchResults).map((key,index)=>{
                    return (<li key={key} onClick={()=>{this.props.cowProfile.loadCowWholeData(key)}}>{this.state.searchResults[key]}</li>)
                })
            }
        </ul>
      </div>
    )
  }
}
