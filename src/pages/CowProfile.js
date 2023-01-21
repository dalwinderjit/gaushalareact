import React from 'react'
import CowProfileModals from './CowProfileModals';
import Header from "../components/Header";
import Loader from "../components/Loader";
import SvgIcons from "../components/SvgIcons";
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

export default function CowProfile() {
  let milkingChartStyle = {
    minWidth:'max-content',marginTop:'25px'
  }
  let padding_right_20= {paddingRight:'20px'}
  let float_right = {float:'right'}
  let medication_button = {width:'100%',height:'50px'}



  return (
    <>
      <Loader/>
      <SvgIcons/>
      <Header/>
      <section class="row" style={{height:'calc(100vh - 54px)',margin:'0px'}}>
      <Sidebar/>
      <div className="main-content multicollapse collapse-horizontal2 cow-profile"  id="main-content">
        <div className="row page-title">
          <div>
            <h1>Cow Profile</h1>
          </div>
          <div style={{zIndex:1}}>
            <input type="text" className="search" id="search-bar"/>
            <span className="fa fa-search"></span>
            <ul className="search-result-list" id="search-result-list">
              <li>SW-101</li>
              <li>SW-101</li>
              <li>SW-101</li>
              <li>SW-101</li>
              <li>SW-101</li>
              <li>SW-101</li>
              <li>SW-101</li>
              <li>SW-101</li>
              <li>SW-101</li>
              <li>SW-101</li>
              <li>SW-101</li>
              <li>SW-101</li>
              <li>SW-101</li>
            </ul>
          </div>
        </div>
        <form id="cow_edit_cow_form">
          <div className="row">
            <div className="col-md-6">
                <div className="title">General Information</div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th colspan="2">
                          <div>Cow General Information</div>
                          <span className="fa fa-edit editCowBtn"><br/><span>Edit</span></span>
                          <span className="fa fa-save saveCowBtn"><br/><span>Save</span></span>
                          <span className="fa fa-plus-circle newCowBtn" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{float:'right'}}><br/><span>New</span></span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
          
                      <tr><td>Cow No/Tag</td><td><input type="hidden" value="1" id="cow_edit_cow_id"/><input type="text" className="cpinput-disabled" value="SW - 1001" disabled id="cow_edit_cow_tag_no" name="cow_edit_cow_tag_no" /></td></tr>
                      <tr><td>Cow Name</td><td><input type="text" className="cpinput-disabled" value="Jugni" disabled id="cow_edit_cow_name" name="cow_edit_cow_name" /></td></tr>
                      <tr><td>Date of Birth</td><td><input type="text" className="cpinput-disabled datepicker" value="11/11/1991" disabled id="cow_edit_cow_dob" name="cow_edit_cow_dob" /></td></tr>
                      <tr>
                        <td>Breed</td>
                        <td>
                          <select className="kgsdropdown cpinput-disabled" id="cow_edit_cow_breed" name="cow_edit_cow_breed" disabled>
                            <option value="">Select One</option>
                            <option value="Sahiwal">Sahiwal</option>
                            <option value="Kapila">Kapila</option>
                            <option value="Gir">Gir</option>
                            <option value="Thar Parkar">Thar Parkar</option>
                            <option value="Kankrej">Kankrej</option>
                          </select>
                        </td>
                      </tr>
                      <tr><td>Lactation</td><td><input type="text" className="cpinput-disabled" value="0" disabled id="cow_edit_cow_lactation" name="cow_edit_cow_lactation" /></td></tr>
                      <tr><td>Best Lactation Yield</td><td>3000 Litre</td></tr>
                      <tr><td>Dam No/Tag</td><td><span id="cow_edit_cow_dam_tag_no">SW-123</span><span className="fa fa-edit disabled" id="cow_edit_cow_select_dam" title="Select Dam"></span><input type="hidden" id="cow_edit_cow_dam_id" name="cow_edit_cow_dam_id"/></td></tr>
                      <tr><td>Dam Name</td><td><span id="cow_edit_cow_dam_name">Dhamu</span></td></tr>
                      <tr><td>Dam's Bly</td><td><span id="cow_edit_cow_dam_bly">--</span></td></tr>
                      <tr><td>Sire No/Tag</td><td><span id="cow_edit_cow_sire_tag_no">SW - 189 </span><span className="fa fa-edit disabled" id="cow_edit_cow_select_sire" title="Select Sire"></span><input type="hidden" id="cow_edit_cow_sire_id" name="cow_edit_cow_sire_id"/></td></tr>
                      <tr><td>Sire Name</td><td><span id="cow_edit_cow_sire_name">Gaumata</span></td></tr>
                      <tr><td>Sire's DBLY</td><td><span id="cow_edit_cow_sire_dam_bly"></span></td></tr>
                      <tr><td>Color</td><td><select className="kgsdropdown cpinput-disabled" id="cow_edit_cow_color" name="cow_edit_cow_color" disabled>
                                  <option value="">Choose One</option>
                          <option value="Brown">Brown</option>
                          <option value="White">White</option>
                          <option value="Black">Black</option>
                          <option value="BlackWhite">Black+White</option>
                          <option value="REDDISH BROWN">REDDISH BROWN</option>  
                          <option value="RED">RED</option>
                        </select>
                        </td></tr>
                      <tr><td>Pregnancy Status</td><td><select className="kgsdropdown cpinput-disabled" id="cow_edit_cow_pregnancy_status" name="cow_edit_cow_pregnancy_status" disabled>
                                <option value="">Choose One</option>
                        <option value="1">Pregnant</option>
                        <option value="0">Not Pregnant</option>
                      </select>
                      </td></tr>
                      <tr><td>Weight</td><td><input type="text" className="cpinput-disabled" value="75 Kg" disabled id="cow_edit_cow_weight" name="cow_edit_cow_weight" /></td></tr>
                      <tr><td>Height</td><td><input type="text" className="cpinput-disabled" value="5 feet" disabled id="cow_edit_cow_height" name="cow_edit_cow_height" /></td></tr>
                      <tr><td>Teats Working</td>
                        <td>
                          <select className="kgsdropdown cpinput-disabled" id="cow_edit_cow_teats_working" name="cow_edit_cow_teats_working" disabled>
                            <option value="">Choose One</option>
                            <option value="0">0 Teats Working</option>
                            <option value="1">1 Teats Working</option>
                            <option value="2">2 Teats Working</option>
                            <option value="3">3 Teats Working</option>
                            <option value="4">4 Teats Working</option>
                          </select>
                        </td>
                      </tr>
                      <tr><td>Fat</td><td><input type="text" className="cpinput-disabled" value="4.5" disabled id="cow_edit_cow_butter_fat" name="cow_edit_cow_butter_fat" /></td></tr>
                      <tr><td>Cow Sold</td><td><button onclick="cow.showSellCowModal();return false;" className="btn btn-success btn-sm">Sell Cow</button></td></tr>
                      <tr><td>Cow Location</td>
                        <td>
                          <select className="kgsdropdown cpinput-disabled" id="cow_edit_cow_location" name="cow_edit_cow_location" disabled>
                            <option value="">Choose One</option>
                            <option value="1">Shed A</option>
                            <option value="2">Shed B</option>
                            <option value="3">Shed C</option>
                            <option value="4">Shed D</option>
                            <option value="5">Shed E</option>
                          </select>
                        </td>
                      </tr>
                      <tr><td>Remarks</td><td><textarea className="cpinput-disabled" disabled id="cow_edit_cow_remarks" name="cow_edit_cow_remarks" style={{width:'100%'}}>Remarks</textarea></td></tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="2">
                          <div className="onoff-switch">
                            Turn Milking
                            <input type="checkbox" id="cowStatus" />
                            <span className="left-on">ON</span><span className="right-off">OFF</span>
                          </div>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                
            </div>
            <div className="col-md-6">
              <div>
                <div className="title title2" id="cow-title">SW - 1001</div>
                <img src="./images/images/cow-profile.png" className="profile-pic" id="profile-pic" alt="cow profile"/><br/><br/>
                <input className="file-input" type="file" placeholder="" id="cow_edit_cow_image" name="cow_edit_cow_image" accept="image/png, image/jpeg"/>
              </div>
            </div>
          </div>
        </form>
        <div className="row">
          <div className="col-md-12">
            <div className="title">Calving Detail</div>
              <table className="calv-detail-table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date of Service </th>
                    <th>Cow</th>
                    <th>Bull/Semen</th>
                    <th>Dt. Calved</th>
                    <th>L. NO.</th>
                    <th>Birth Status</th>
                    <th>Dam's Wt</th>
                    <th>Sex</th>
                    <th>Calf Number</th>
                    <th>Birth Wt.</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1<input type="hidden" id="cd-id"/></td>
                    <td><input type="text" className="cpinput" value="10/01/2022" id="cd-dateofservice"/></td>
                    <td><input type="text" className="cpinput" value="SW-101" id="cd-cow-name"/></td>
                    <td><input type="text" className="cpinput" value="bL-901" id="cd-bull-semen"/></td>
                    <td><input type="text" className="cpinput datepicker" value="10/01/2022" id="cd-date-calved"/></td>
                    <td><input type="text" className="cpinput" value="221" id="cd-lactation-number"/></td>
                    <td style={{width:'100px'}}>	
                      <select className="kgsdropdown cpinput-disabled" id="cd-birth-status">
                        <option>Normal</option>
                        <option>abnormal</option>
                        <option>Born Dead</option>
                      </select>
                    </td>
                    <td><input type="text" className="cpinput" value="45 kg" id="cd-damweight"/></td>
                    <td><input type="text" className="cpinput" value="Male" id="cd-sex"/></td>
                    <td><input type="text" className="cpinput" value="SW-345" id="cd-calf-number"/></td>
                    <td><input type="text" className="cpinput" value="10 kg" id="cd-birth-weight"/></td>
                    <td><input type="text" className="cpinput" value="Nice calv." id="cd-remarks"/></td>
                  </tr>
                </tbody>
              </table>
              <div style={{padding:'10px'}}>
                <input className="kgsbtn btn kgsbtn-success" value="Save" onClick="calv.saveCalvData()"/>
                <input className="kgsbtn btn kgsbtn-update" value="Update"/>
                <input className="kgsbtn btn kgsbtn-clear" value="Clear"/>
                <input className="kgsbtn btn kgsbtn-delete" value="Delete" onClick="calv.deleteCalv()"/>
              </div>
              <table className="calv-detail-table table-bordered" id="calving-detail-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date of Service </th>
                    <th>Cow</th>
                    <th>Bull/Semen</th>
                    <th>Dt. Calved</th>
                    <th>L. NO.</th>
                    <th>Birth Status</th>
                    <th>Dam's Wt</th>
                    <th>Sex</th>
                    <th>Calf Number</th>
                    <th>Birth Wt.</th>
                    <th>Remarks</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    (false)?""
                      /*for(let i=1;i<34;i++){
                      document.write('<tr><td>'+i+'</td><td>11/11/1991</td><td>SW-101'+i+'</td><td>SW-908'+i+'</td><td>14/09/2018</td><td>12</td><td>NORMAL</td><td>10 KG</td><td>MALE</td><td>12</td><td>45 KG</td><td>ok</td><td><i className="fa fa-edit edit-button-icon" onclick="calv.editCalvingDetail('+i+')"></i></td></tr>');
                      }*/
                    :""
                  }
                </tbody>
                
              </table>
          </div>
			  </div>

        <div className="row">
				<div className="col-md-12">
				
					<div className="title">Service Detail</div>
						<table className="calv-detail-table table-bordered" style={{display:'none'}}>
							<thead>
								
								<tr>
									<th>#</th>
									<th>Cow No/Tag<i className="fa fa-sort-amount-down disabled"></i></th>
									<th>Service</th>
									<th>Status</th>
									<th>Datetime of Service</th>
									<th>Doctor</th>
									<th>Semen</th>
									<th>Remarks</th>
	</tr>
							</thead>
							<tbody>
								<tr>
									<td>1<input type="hidden" id="cd-id"/></td>
									<td><input type="text" className="cpinput" value="SW-101" id="csd-cow-tagno"/></td>
									<td><input type="text" className="cpinput" value="bL-901" id="csd-service"/></td>
									
									<td style={{width:'100px'}}>	
										<select className="kgsdropdown cpinput-disabled" id="csd-status">
											<option>Confirmed</option>
											<option>Pending</option>
											<option>Failed</option>
											<option>Successful</option>
										</select>
									</td>
									<td><input type="text" className="cpinput" value="10/01/2022" id="csd-datetimeofservice"/></td>
									
									<td><input type="text" className="cpinput" value="45 kg" id="csd-doctor"/></td>
									<td><input type="text" className="cpinput" value="--" id="csd-semen"/></td>
									<td><input type="text" className="cpinput" value="Nice calv." id="cd-remarks"/></td>
								</tr>
							</tbody>
						</table>
						<div style={{padding:'10px'}}>
							<input className="kgsbtn btn kgsbtn-success" value="Add New Service" onClick="cow.serviceDetail.showAddCowServiceModal();"/>
							<input className="kgsbtn btn kgsbtn-clear" value="Clear"/>
							<input className="kgsbtn btn kgsbtn-delete" value="Delete"/>
						</div>
						
					<table className="calv-detail-table" id="service-detail-table">
						<thead>
							<tr>
								<th>S. No.</th>
								<th>Cow No/Tag</th>
								<th>Service</th>
								<th>Status</th>
								<th>Date TIme of Service</th>
								<th>Mating Type</th>
								<th>Doctor</th>
								<th>Remarks</th>
								<th>Action</th>
</tr>
						</thead>
						<tbody>
							<tr><td>1</td><td>sw-1</td><td>1001</td><td>1001</td><td>1001</td><td>1001</td><td>1</td><td>1</td></tr>
							<tr><td>2</td><td>sw-1801</td><td>1001</td><td>1001</td><td>1001</td><td>1001</td><td>1</td><td>1</td></tr>
							<tr><td>3</td><td>sw-8901</td><td>1001</td><td>1001</td><td>1001</td><td>1001</td><td>1</td><td>1</td></tr>
							<tr><td>4</td><td>sw-8701</td><td>1001</td><td>1001</td><td>1001</td><td>1001</td><td>1</td><td>1</td></tr>
							
						</tbody>
						
					</table>
				</div>
			</div>
			<div className="row">
				<div className="col-md-12">
				
					<div className="title">Milking Chart</div>
					<div className="row" style={{marginLeft:'0px'}}>
						<div className="col-md-6">
							<div className="div-borderd">
								<table className="milking-chart" id="milking-chart-table">
									<thead>
										<tr>
											<th>Cow</th>
											<th>Lactation Number</th>
											<th>Total Yield</th>
											<th>305 Days Yield</th>
											<th>Wet Days</th>
											<th>Peak Yield</th>
											<th>Average</th>
										</tr>
									</thead>
									<tbody>
										<tr><td>Cow No/Tag</td><td>1001</td><td>1001</td><td>1001</td><td>1001</td></tr>
										<tr><td>Cow No/Tag</td><td>1001</td><td>1001</td><td>1001</td><td>1001</td></tr>
										<tr><td>Cow No/Tag</td><td>1001</td><td>1001</td><td>1001</td><td>1001</td></tr>
										<tr><td>Cow No/Tag</td><td>1001</td><td>1001</td><td>1001</td><td>1001</td></tr>
										
									</tbody>
								</table>
							</div>
							<div>
								<table className="milking-detail-filter-table">
									<tr>
										<td>
											
												<label className="label">Starting Date</label> <input className="input" type="text"/>
											
										</td><td></td>
									</tr>
									<tr>
										<td>
											
												<label className="label">Starting Date</label> <input className="input" type="text"/>
											
										</td>
										<td>
											<button className="btn kg-button2" >Submit</button>
										</td>
									</tr>
								</table>
							</div>
						</div>
						<div className="col-md-6">
							<button className="btn kg-button2" onClick="cow.milkingObj.showCowMilkStartStopDetailModal()">Add Start/Stop Detail</button>
							<table className="calv-detail-table milk-stop-table" id="cow-milking-start-stop-datatable">
								<thead>
									<tr>
										<th>S. No.</th>
										<th>Milk Status</th>
										<th>Date</th>
										<th>Lactation No</th>
										<th>Remarks</th>
										<th>Action</th>
									</tr>
								</thead>
							</table>
						</div>
					</div>
				</div>
			</div>
			
      <div class="row">
				<div class="graph col-md-12">
					<div>
						<div>
							<ul class="comp-list" id="comparison-cow-list">
								<li>
									<span class="circle red"></span> <label class="label2">Comparison A </label> 
									<select id="milkComparisonSelectCow1">
										<option>Select One</option>
										<option>SW 101</option>
										<option>SW 102</option>
									</select>
								 </li>
								<li>
									<span class="circle green"></span> <label class="label2">Comparison B </label> 
									<select id="milkComparisonSelectCow2">
										<option>Select One</option>
										<option>SW 101</option>
										<option>SW 102</option>
									</select>
								 </li>
							</ul>
						</div>
						<div >
							<select id="milkComparison_type">
								<option>Lactation</option>
								<option>Time</option>
							</select><br/>
							<span>
								<select id="cow-comparison-lactation-no" multiple>
									<option>1</option>
									<option>2</option>
								</select><br/>
							</span>
							<span id="cow-comparison-day-from-to">
								Day from<input class="dayFrom kg-input2" id="cow-comparison-day-from"/><br/>
								Day To<input class="dayFrom kg-input2" id="cow-comparison-day-to"/><br/>
							</span>
							<span id="cow-comparison-day-from-to">
								Date from<input class="dayFrom kg-input2" id="cow-comparison-date-from"/><br/>
								Date To<input class="dayFrom kg-input2" id="cow-comparison-date-to"/><br/>
								Date separator<input class="dayFrom kg-input2" id="cow-comparison-day-separator"/><br/>
							</span>
						</div>
						<div>
							<input type="number" class="kg-input2" id="cow-comparison-no-of-cows"/>
							<br/><br/>
							<input type="submit" class="btn kg-button3" onClick="cowComparison.GetCowComaprisonData()"/>
						</div>
					</div>
				  <canvas id="myChart"aria-label="chart" role="img"></canvas>
				</div>
			</div>
			<div className="row">
				<div className="col-md-12">
				
					<div className="title">Medication Detail</div>
					<div className="row">
						<div className="col-md-6">
							<div className="medication_form">
								<form id="medication-form">
								<div>
									<div className="input-group mb-3">
										<input type="hidden" value="" name="mdication_id" id="medication_id"/>
									  <label className="input-group-text kg-label" for="inputGroupSelect01">Date</label>
									  <input className="form-control kg-input" id="medication_date" name="medication_date"/>
									</div>
									<div className="input-group mb-3">
									  <label className="input-group-text kg-label" for="inputGroupSelect01">Animal No</label>
									  <label className="form-control kg-input bg-white" id="medication_animal_no" name="medication_animal_no"/>
									</div>
									<div className="input-group mb-3">
									  <label className="input-group-text kg-label" for="inputGroupSelect01">Disease</label>
									  <input className="form-control kg-input" id="medication_disease" name="medication_disease"/>
									</div>
									<div className="input-group mb-3">
									  <label className="input-group-text kg-label" for="inputGroupSelect01">Symptoms</label>
									  <input className="form-control kg-input" id="medication_symptoms" name="medication_symptoms"/>
									</div>
									<div className="input-group mb-3">
										<label className="input-group-text kg-label" for="inputGroupSelect01">Diagnosis</label>
										<input className="form-control kg-input" id="medication_diagnosis" name="medication_diagnosis"/>
									  </div>
									<div className="input-group mb-3">
									  <label className="input-group-text kg-label" for="inputGroupSelect01">Treatment</label>
									  <input className="form-control kg-input"  id="medication_treatment" name="medication_treatment"/>
									</div>
									<div className="input-group mb-3">
										<label className="input-group-text kg-label" for="inputGroupSelect01">Prognosis</label>
										<select className="kgsdropdown form-control kg-input"  id="medication_prognosis" name="medication_prognosis">
											<option>Select Prognosis</option>
											<option value="1">Poor</option>
											<option value="2">Good</option>
											</select>
									  </div>
									<div className="input-group mb-3">
									  <label className="input-group-text kg-label" for="inputGroupSelect01">Result</label>
									  <input className="form-control kg-input" id="medication_result" name="medication_result"/>
									</div>
									<div className="input-group mb-3">
										<label className="input-group-text kg-label" for="inputGroupSelect01">Cost of Treatment</label>
										<input className="form-control kg-input" type="number"  id="medication_cost_of_treatment" name="medication_cost_of_treatment"/>
									</div>
									<div className="input-group mb-3">
									  <label className="input-group-text kg-label" for="inputGroupSelect01">Doctor</label>
									  <label className="form-control kg-input bg-white" onclick="cow.medication.getSetDoctor()" id="medication_doctor_name"></label>
									  <input type ="hidden" className="form-control kg-input" id="medication_doctor_id" name="medication_doctor_id"/>
									</div>
									<div className="input-group mb-3">
									  <label className="input-group-text kg-label" for="inputGroupSelect01">Remarks</label>
									  <input className="form-control kg-input" id="medication_remarks" name="medication_remarks"/>
									</div>
                  
									<div style={medication_button}>
										<div style={float_right}>
											
											<button className="btn btn-secondary kg-button" style={float_right} onClick="cow.medication.addMedication();return false;">Save</button>&nbsp;&nbsp;
											<button className="btn btn-secondary kg-button" style={float_right} onClick="cow.medication.clearMedicationDataForm();return false;">Reset</button>&nbsp;&nbsp;
										</div>
									</div>
								</div>
								</form>
							</div>
						</div>
					</div>
					<div className="row" style={padding_right_20}>
						<h3>Past Medication Report</h3>
						<div className="col-md-12 div-borderd">
							<table className="milking-chart" id="medication-chart-table">
								<thead>
									<tr>
										<th>&nbsp;</th>
										<th>Date</th>
										<th>Animal No.</th>
										<th>Disease</th>
										<th>Symptoms</th>
										<th>Treatment</th>
										<th>Prognosis</th>
										<th>Result</th>
										<th>Doctor</th>
										<th>Remarks</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									<tr><td></td><td>Cow No/Tag</td><td>1001</td><td>1001</td><td>1001</td><td>1001</td><td></td><td></td><td></td></tr>
									<tr><td></td><td>Cow No/Tag</td><td>1001</td><td>1001</td><td>1001</td><td>1001</td><td></td><td></td><td></td></tr>
									<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td>Cow No/Tag</td><td>1001</td><td>1001</td><td>1001</td><td>1001</td><td></td><td></td><td></td></tr>
									<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td>Cow No/Tag</td><td>1001</td><td>1001</td><td>1001</td><td>1001</td><td></td><td></td><td></td></tr>
									
								</tbody>
							</table>
							
							
							
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-md-12">
					<div className="row"  style={padding_right_20}>
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
									<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
										<td id="summary_total">4</td>
										<td id="summary_failed">1</td>
										<td id="summary_pending">0</td>
										<td id="summary_sold">0</td>
										<td id="summary_confirmed">0</td>
										<td id="summary_died">0</td>
										<td id="summary_successful">3</td>
										<td id="summary_female">1</td>
										<td id="summary_male">2</td>
									</tr>
								</tbody>	
							</table>
						</div>
						{
              
            }
						<div className="col-md-3 div-borderd" style={milkingChartStyle}>
							
							<table className="milking-chart" id="inter-calv-period">
								<thead>
									<tr>
										<th>Lactation<i className="fa fa-sort-amount-up"></i></th>
										<th>Intercalving Period<i className="fa fa-sort-amount-up"></i></th>
									    
									</tr>
								</thead>
								<tbody>
									<tr><td>1-2</td><td>15 month</td></tr>
								    <tr><td>2-3</td><td>18 month</td></tr>
									<tr><td>3-4</td><td>15 month</td></tr>
									<tr><td></td><td></td></tr>
								</tbody>	
							</table>
						</div>
						<div className="col-md-9 div-borderd cow-quanlity-div">
							<div className="row">
								<div className="col-md-9">
									<h2>Cow Quality <svg className="menu-icon"><use xlinkHref="#cow-icon"/></svg></h2>
									<div><button className="btn kdgs-btn kdgs-btn-good kdgs-btn-bold">Good</button><button className="btn kdgs-btn kdgs-btn-better kdgs-btn-bold">Better</button><button className="btn kdgs-btn kdgs-btn-best kdgs-btn-bold">Best</button><button className="btn kdgs-btn kdgs-btn-average kdgs-btn-bold">Average</button><br/></div>
									<div><button className="btn kdgs-btn kdgs-btn-primary2">Save</button><span></span><button className="btn kdgs-btn kdgs-btn-userdefined1">Update</button></div>
								</div>
								<div className="col-md-3">
									<div>
										BEST
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<br/><br/><br/><br/><br/><br/>
			</div>
      <Footer/>
      </div>
      </section>
      <CowProfileModals/>
    </>
  )
}
