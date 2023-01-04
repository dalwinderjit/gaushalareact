import React from 'react'

export default function CowProfileModals() {
	
  return (
	<>
	<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div className="modal-dialog modal-xl">
	  <div className="modal-content">
		<div className="modal-header">
		  <h5 className="modal-title" id="exampleModalLabel">Add New Cow</h5>
		  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		</div>
		<div className="modal-body">
		  <form id="cow_new_form">
			  <div className="row">
				  <div className="col-md-6">
					  <div className="title">General Information</div>
					  
					  <table className="table">
						  <thead>
							  <tr>
								  <th colspan="2">
									  <div>Cow General Information</div>
									  <span className="fa fa-save addCowBtn"><br/><span>Save</span></span>
								  </th>
							  </tr>
						  </thead>
						  <tbody>
	  
							  <tr><td>Cow No/Tag</td><td><input type="hidden" value="1" id="cow_new_cow_id"/><input type="text" className="cpinput" value="SW - 1001"  id="cow_new_cow_tag_no" name="cow_new_cow_tag_no" /></td></tr>
							  <tr><td>Cow Name</td><td><input type="text" className="cpinput" value="Jugni"  id="cow_new_cow_name" name="cow_new_cow_name" /></td></tr>
							  <tr><td>Date of Birth</td><td><input type="text" className="cpinput datepicker" value="11/11/1991"  id="cow_new_cow_dob" name="cow_new_cow_dob" /></td></tr>
							  <tr>
								  <td>Breed</td>
								  <td>
									  <select className="kgsdropdown cpinput" id="cow_new_cow_breed" name="cow_new_cow_breed">
										  <option value="">Select One</option>
										  <option value="Sahiwal">Sahiwal</option>
										  <option value="Kapila">Kapila</option>
										  <option value="Gir">Gir</option>
										  <option value="Thar Parkar">Thar Parkar</option>
										  <option value="Kankrej">Kankrej</option>
									  </select>
								  </td>
							  </tr>
							  <tr><td>Lactation</td><td><input type="text" className="cpinput" value="0"  id="cow_new_lactation" name="cow_new_lactation" /></td></tr>
							  <tr><td>Best Lactation Yield</td><td>3000 Litre</td></tr>
							  <tr><td>Dam No/Tag</td><td><input type="hidden" id="cow_new_dam_id" name="cow_new_dam_id" value="1"/><span id="cow_new_dam_tag_no">SW-123</span><span className="fa fa-edit " id="cow_new_cow_select_dam" title="Select Dam"></span></td></tr>
							  <tr><td>Dam Name</td><td><span id="cow_new_dam_name">Dhamu</span></td></tr>
							  <tr><td>Dam's Bly</td><td><span id="cow_new_dam_bly">--</span></td></tr>
							  <tr><td>Sire No/Tag</td><td><span id="cow_new_sire_tag_no">SW - 189 </span><input type="hidden" id="cow_new_sire_id" name="cow_new_sire_id" value="1017"/><span className="fa fa-edit " id="cow_new_cow_select_sire" title="Select Sire"></span></td></tr>
							  <tr><td>Sire Name</td><td><span id="cow_new_sire_name">Gaumata</span></td></tr>
							  <tr><td>Sire's DBLY</td><td><span id="cow_new_sire_dam_bly"></span></td></tr>
							  <tr><td>Color</td><td><select className="" id="cow_new_cow_color" name="cow_new_cow_color">
													  <option value="">Choose One</option>
									  <option value="Brown">Brown</option>
									  <option value="White">White</option>
									  <option value="Black">Black</option>
									  <option value="BlackWhite">Black+White</option>
									  <option value="REDDISH BROWN">REDDISH BROWN</option>
									  <option value="RED">RED</option>
								  </select>
								  </td></tr>
							  <tr><td>Weight</td><td><input type="text" className="cpinput" value="75"  id="cow_new_cow_weight" name="cow_new_cow_weight" /></td></tr>
							  <tr><td>Height</td><td><input type="text" className="cpinput" value="5"  id="cow_new_cow_height" name="cow_new_cow_height" /></td></tr>
							  <tr><td>Teats Working</td>
								<td>
									<select className="kgsdropdown cpinput-disabled" id="cow_new_cow_teats_working" name="cow_new_cow_teats_working">
										<option value="">Choose One</option>
										<option value="0">0 Teats Working</option>
										<option value="1">1 Teats Working</option>
										<option value="2">2 Teats Working</option>
										<option value="3">3 Teats Working</option>
										<option value="4">4 Teats Working</option>
									</select>
								</td>
							</tr>
							  <tr><td>Butter Fat</td><td><input type="text" className="cpinput" value="4.01"  id="cow_new_cow_butter_fat" name="cow_new_cow_butter_fat" /></td></tr>
								<tr><td>Cow Location</td>
									<td>
										<select className="kgsdropdown cpinput-disabled" id="cow_new_cow_location" name="cow_new_cow_location">
											<option value="">Choose One</option>
											<option value="1">Shed A</option>
											<option value="2">Shed B</option>
											<option value="3">Shed C</option>
											<option value="4">Shed D</option>
											<option value="5">Shed E</option>
										</select>
									</td>
								</tr>
								<tr><td>Remarks</td><td><textarea className="cpinput" id="cow_new_cow_remarks" name="cow_new_cow_remarks" style={{width:'100%'}}>Remarks</textarea></td></tr>
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
						  <div className="title title2" id="new-cow-title">SW - 1001</div>
						  <img src="./images/images/cow-profile.png" className="profile-pic" id="profile-pic2" alt=""/><br/><br/>
						  <input className="file-input" type="file" placeholder="" id="cow_new_image" name="cow_new_image" accept="image/png, image/jpeg"/>
					  </div>
				  </div>
			  </div>
		  </form>
		</div>
		<div className="modal-footer">
		  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
		  <button type="button" className="btn btn-primary">Save changes</button>
		</div>
	  </div>
	</div>
  </div>
  <div className="modal fade" id="addServiceDetailModal" tabIndex="-5" aria-hidden="true">
	<div className="modal-dialog modal-xl">
	  <div className="modal-content">
		<div className="modal-header">
		  <h5 className="modal-title" id="exampleModalLabel">Add Service of Cow</h5>
		  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		</div>
		<div className="modal-body">
		  <form id="cow_service_form">
			  <div className="row">
				  <div className="col-md-12">
					  <div className="title">Service Information</div>
					  <table className="table">
						  <thead>
							  <tr>
								  <th colspan="2">
									  <div id="cs_table_title">Add Cow Service Information</div>
									  <span className="fa fa-save addCowConceiveBtn updateBtn"><br/><span id="cs_save_update">Save</span></span>
									</th>
								</tr>
							</thead>
							<tbody>
								
							  <tr><td>Date of Service</td><td><input type="text" className="cpinput datepicker" value="11/11/1991"  id="cow_service_cow_date" name="cow_service_cow_date" /><input type="hidden" value=""  id="cow_service_cow_id" name="cow_service_cow_id" /></td></tr>
							  <tr><td>Cow No</td><td><span id="cow_service_cow_dam_tag_no">SW - 189 </span></td></tr>
							  <tr><td>Bull/Semen/Sire No/Tag</td><td><span id="cow_service_cow_sire_tag_no">SW - 189 </span><input type="hidden" id="cow_service_cow_sire_id" name="cow_service_cow_sire_id" value="2661"/><span className="fa fa-edit " id="cow_service_cow_select_sire" title="Select Sire"></span></td></tr>
							  <tr>
								  <td>Pregnancy Status</td>
								  <td>
									  <select className="kgsdropdown cpinput" id="cow_service_cow_pregnancy_status" name="cow_service_cow_pregnancy_status">
									  </select>
								  </td>
							  </tr>
							  <tr>
								<td>Delivery Status</td>
								<td>
									<select className="kgsdropdown cpinput" id="cow_service_cow_delivery_status" name="cow_service_cow_delivery_status">
									</select>
								</td>
							  </tr>
							  <tr className="succNorDel"><td>Lactation Number of Cow</td><td><input type="number" className="cpinput" value=""  id="cow_service_cow_lactation_number" name="cow_service_cow_lactation_number" /></td></tr>
							  <tr className="succNorDel succDied"><td id="td_cow_service_date_of_delivery">Date of Delivery</td><td><input type="text" className="cpinput datepicker" value="11/11/1991"  id="cow_service_cow_delivery_date" name="cow_service_cow_delivery_date" /></td></tr>
							  <tr className="succNorDel"><td>Birth Weight</td><td><input type="text" className="cpinput" value=""  id="cow_service_cow_birth_weight" name="cow_service_cow_birth_weight" /></td></tr>
							  <tr className="succNorDel"><td>Birth Height</td><td><input type="text" className="cpinput" value=""  id="cow_service_cow_birth_height" name="cow_service_cow_birth_height" /></td></tr>
							  <tr className="succNorDel"><td>Dam Weight</td><td><input type="text" className="cpinput" value=""  id="cow_service_cow_dam_weight" name="cow_service_cow_dam_weight" /></td></tr>
							  <tr className="succNorDel"><td>Assign Tag No</td><td><input type="text" className="cpinput" value=""  id="cow_service_cow_tag_no" name="cow_service_cow_tag_no" /></td></tr>
							  <tr className="succNorDel"><td>Assign Name</td><td><input type="text" className="cpinput" value=""  id="cow_service_cow_name" name="cow_service_cow_name" /></td></tr>
							  <tr className="succNorDel">
								<td>Colour</td>
								<td>
									<select className="kgsdropdown cpinput" id="cow_service_cow_color" name="cow_service_cow_color">
										<option value="">Select Color</option>
										<option value="Sahiwal">Sahiwal</option>
									</select>
								</td>
							  </tr>
							  <tr className="succNorDel">
								<td>Breed</td>
								<td>
									<select className="kgsdropdown cpinput" id="cow_service_cow_breed" name="cow_service_cow_breed">
										<option value="">Select Breed</option>
										<option value="Sahiwal">Sahiwal</option>
									</select>
								</td>
							  </tr>
							  <tr className="succNorDel">
								<td>Gender</td>
								<td>
									<select className="kgsdropdown cpinput" id="cow_service_cow_gender" name="cow_service_cow_gender">
										<option value="">Select One</option>
										<option value="Male">Male</option>
										<option value="Female">Female</option>
									</select>
								</td>
							  </tr>
							  <tr><td>Select Doctor</td><td><span id="cow_service_cow_doctor_name">Satbir</span><input type="hidden" id="cow_service_cow_doctor_id" name="cow_service_cow_doctor_id" value="3"/><span className="fa fa-edit " id="cow_service_cow_select_doctor" title="Select Doctor"></span></td></tr>
							  <tr>
								<td>Mating Type</td>
								<td>
									<select className="kgsdropdown cpinput" id="cow_service_cow_mating_type" name="cow_service_cow_mating_type">
										
									</select>
								</td>
							</tr>
							  <tr><td>Remarks</td><td><textarea className="cpinput w-100" value="SW - 1001"  id="cow_service_cow_remarks" name="cow_service_cow_remarks"></textarea></td></tr>
							  <tr className="succNorDel"><td>Profile Pic</td>
								<td><img src="./images/images/cow-profile.png" className="profile-pic" id="profile-pic-child" alt=""/><br/><br/>
								<input className="file-input" type="file" placeholder="" id="cow_service_cow_image" name="cow_service_cow_image" accept="image/png, image/jpeg"/>
								</td>
							</tr>
							  
						  </tbody>
						  
					  </table>
						  
				  </div>
				  
			  </div>
		  </form>
		</div>
		<div className="modal-footer">
		  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
		  <button type="button" className="btn btn-primary">Save changes</button>
		</div>
	  </div>
	</div>
  </div>
  <div className="modal fade" id="addCowMilkStartStopDetailModal" tabIndex="-5" aria-hidden="true">
	<div className="modal-dialog modal-xl">
	  <div className="modal-content">
		<div className="modal-header">
		  <h5 className="modal-title" id="exampleModalLabel">Add Cow's Milking Start/Stop Detail</h5>
		  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		</div>
		<div className="modal-body">
		  <form id="cow_milk_start_stop_form">
			  <div className="row">
				  <div className="col-md-12">
					  <div className="title">Cow's Milk Start/Stop Detail</div>
					  
					  <table className="table">
						  <thead>
							  <tr>
								  <th colspan="2">
									  <div id="cs_table_title">Add Cow Milk Start/Stop Information</div>
									  <span className="fa fa-save addCowMilkStartStopBtn"><br/><span id="cs_save_update">Save</span></span>
									</th>
								</tr>
							</thead>
							<tbody>
							  <tr><td>Cow No</td><td><span id="cow_milk_start_stop_cow_tag_no">SW - 189 </span>
								<input type="hidden" value=""  id="cow_milk_start_stop_id" name="cow_milk_start_stop_id" /></td></tr>
							  <tr><td>Date </td><td><input type="text" className="cpinput datepicker" value="11/11/1991"  id="cow_milk_start_stop_cow_date" name="cow_milk_start_stop_cow_date" /><input type="hidden" value=""  id="cow_milk_start_stop_id" name="cow_milk_start_stop_id" /></td></tr>
							  <tr><td>Lactation Number </td><td><input type="text" className="cpinput" value=""  id="cow_milk_start_stop_cow_lactation_number" name="cow_milk_start_stop_cow_lactation_number" /></td></tr>
							  <tr>
								  <td>Select Status</td>
								  <td>
									  <select className="kgsdropdown cpinput" id="cow_milk_start_stop_status" name="cow_milk_start_stop_status">
									  </select>
								  </td>
							  </tr>
							  <tr><td>Reason</td><td><textarea className="cpinput w-100" value="..."  id="cow_milk_start_stop_reason" name="cow_milk_start_stop_reason"></textarea></td></tr>
						  </tbody>
					  </table>
				  </div>
			  </div>
		  </form>
		</div>
		<div className="modal-footer">
		  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
		  <button type="button" className="btn btn-primary">Save changes</button>
		</div>
	  </div>
	</div>
  </div>
	<div className="modal fade" id="confirm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div className="modal-dialog">
		  <div className="modal-content">
			<div className="toast-header">
			  <span className="fa fa-times failure"></span> &nbsp;&nbsp;&nbsp;
				  <strong className="me-auto">Success Message</strong>
				<small></small>
				<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				  
			</div>
			<div className="toast-body success">
				Cow is set to milking
			  </div>
			</div>
		</div>
	  </div>


<div className="modal fade" id="selectDamModal" tabIndex="-1" aria-labelledby="selectDamModal_" aria-hidden="true">
  <div className="modal-dialog modal-xl">
	<div className="modal-content">
	  <div className="modal-header">
		<h5 className="modal-title" id="">Select Dam</h5>
		<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
	  </div>
	  <div className="modal-body">
		 <div className="row">
			<div className="col-md-12">
				<div className="row">
					
					<div className="col-md-3">
					  <div className="input-group mb-3">
						  <input type="text" className="form-control cpinput" placeholder="Dam name" aria-label="Username" aria-describedby="basic-addon1" id="damtable_dam_name"/>
						</div>
					</div>
					<div className="col-md-3">
					  <div className="input-group mb-3">
						  <input type="text" className="form-control cpinput" placeholder="Dam Tag no" aria-label="Username" aria-describedby="basic-addon1" id="damtable_dam_no"/>
						</div>
					</div>
					<div className="col-md-3">
					  <div className="input-group mb-3">
						  <input type="text" className="form-control cpinput" placeholder="Cow name" aria-label="Username" aria-describedby="basic-addon1"/>
						</div>
					</div>
					<div className="col-md-3">
					  <div className="input-group mb-3">
						  <input type="text" className="form-control cpinput" placeholder="Cow name" aria-label="Username" aria-describedby="basic-addon1"/>
						</div>
					</div>
				</div>
				<div className="row">
				  <div className="col-md-9"></div>
				  <div className="col-md-3 text-end"><button type="button" className="btn btn-primary" onClick="cow.select_dam_datatable.draw();">Search</button></div>
				</div>
				  <table className="calv-detail-table table-bordered" id="damtable">
					  <thead>
						  <tr>
							  <th>#</th>
							  <th>Dam Tag no</th>
							  <th>Dame Name</th>
							  <th>Date of birth</th>
							  <th>Breed</th>
							  <th>Dam's Wt</th>
							  <th>Color</th>
							  <th>Select Bull</th>
						  </tr>
					  </thead>
					  <tbody>
						  <script type="text/javascript">
							  {/*if(false){
								  var add_button="<button className='btn btn-success btn-sm' onClick='cow.selectDam()'>Select</button>"
								  for(i=1;i<34;i++){
									  add_button =`<button className='btn btn-success btn-sm' onClick='cow.selectDam(${i},"SW-899","Nandi","nandi bly")'>Select</button>`
									  
								  document.write('<tr><td>'+i+'</td>'+
									  '<td>SW - 101'+i+'</td>'+
									  '<td>Jugnu</td><td>11/11/1991</td><td>Gheer</td><td>100kg</td><td>Brown</td><td>'+add_button+'</td></tr>');
								  }
							  }*/
							}

						  </script>
					  </tbody>
					  
				  </table>
				  <div style={{padding:'10px'}}>
					  <input className="kgsbtn btn kgsbtn-success" value="Select Dam" onClick="cow.setDam"/>
					  <input className="kgsbtn btn kgsbtn-update" value="Update"/>
					  <input className="kgsbtn btn kgsbtn-clear" value="Clear"/>
					  <input className="kgsbtn btn kgsbtn-delete" value="Delete"/>
				  </div>
			</div>
		</div>
	  </div>
	  <div className="modal-footer">
		<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
		<button type="button" className="btn btn-primary">Save changes</button>
	  </div>
	</div>
  </div>
</div>
  



<div className="modal fade" id="selectSireModal" tabIndex="-1" aria-labelledby="selectSireModal" aria-hidden="true">
<div className="modal-dialog modal-xl">
  <div className="modal-content">
	<div className="modal-header">
	  <h5 className="modal-title" id="">Select Sire</h5>
	  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
	</div>
	<div className="modal-body">
	   <div className="row">
		  <div className="col-md-12">
			  <div className="row">
				  
				  <div className="col-md-3">
					<div className="input-group mb-3">
						<input type="text" className="form-control cpinput" placeholder="Sire name" aria-label="Username" aria-describedby="basic-addon1" id="siretable_sire_name"/>
					  </div>
				  </div>
				  <div className="col-md-3">
					<div className="input-group mb-3">
						<input type="text" className="form-control cpinput" placeholder="Sire Tag no" aria-label="Username" aria-describedby="basic-addon1" id="siretable_sire_no"/>
					  </div>
				  </div>
				  <div className="col-md-3">
					<div className="input-group mb-3">
						<input type="text" className="form-control cpinput" placeholder="Cow name" aria-label="Username" aria-describedby="basic-addon1"/>
					  </div>
				  </div>
				  <div className="col-md-3">
					<div className="input-group mb-3">
						<input type="text" className="form-control cpinput" placeholder="Cow name" aria-label="Username" aria-describedby="basic-addon1"/>
					  </div>
				  </div>
			  </div>
			  <div className="row">
				<div className="col-md-9"></div>
				<div className="col-md-3 text-end"><button type="button" className="btn btn-primary" onClick="cow.select_sire_datatable.draw();">Search</button></div>
			  </div>
				<table className="calv-detail-table table-bordered" id="siretable">
					<thead>
						<tr>
							<th>#</th>
							<th>Dam Tag no</th>
							<th>Dame Name</th>
							<th>Date of birth</th>
							<th>Breed</th>
							<th>Dam's Wt</th>
							<th>Color</th>
							<th>Select Bull</th>
						</tr>
					</thead>
					<tbody>
						<script type="text/javascript">
							{
								/*if(false){
									var add_button="<button className='btn btn-success btn-sm' onClick='cow.selectDam()'>Select</button>"
									for(i=1;i<34;i++){
										add_button =`<button className='btn btn-success btn-sm' onClick='cow.selectDam(${i},"SW-899","Nandi","nandi bly")'>Select</button>`
										
									document.write('<tr><td>'+i+'</td>'+
										'<td>SW - 101'+i+'</td>'+
										'<td>Jugnu</td><td>11/11/1991</td><td>Gheer</td><td>100kg</td><td>Brown</td><td>'+add_button+'</td></tr>');
									}
								}*/
							}
						</script>
					</tbody>
				</table>
				<div style={{padding:'10px'}}>
					<input className="kgsbtn btn kgsbtn-success" value="Select Dam" onClick="cow.setDam"/>
					{/*<input className="kgsbtn btn kgsbtn-update" value="Update"/>
					<input className="kgsbtn btn kgsbtn-clear" value="Clear"/>
						<input className="kgsbtn btn kgsbtn-delete" value="Delete"/>*/}
				</div>
		  </div>
		  
	  </div>
	</div>
	<div className="modal-footer">
	  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
	  <button type="button" className="btn btn-primary">Save changes</button>
	</div>
  </div>
</div>
</div>
<div className="modal fade" id="selectUserModal" tabIndex="-1" aria-hidden="true">
  <div className="modal-dialog modal-xl">
	<div className="modal-content">
	  <div className="modal-header">
		<h5 className="modal-title" id="">Select Doctor</h5>
		<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
	  </div>
	  <div className="modal-body">
		 <div className="row">
			<div className="col-md-12">
				<div className="row">
					
					<div className="col-md-3">
					  <div className="input-group mb-3">
						  <input type="text" className="form-control cpinput" placeholder="Dam name" aria-label="Username" aria-describedby="basic-addon1" id="damtable_dam_name"/>
						</div>
					</div>
					<div className="col-md-3">
					  <div className="input-group mb-3">
						  <input type="text" className="form-control cpinput" placeholder="Dam Tag no" aria-label="Username" aria-describedby="basic-addon1" id="damtable_dam_no"/>
						</div>
					</div>
					<div className="col-md-3">
					  <div className="input-group mb-3">
						  <input type="text" className="form-control cpinput" placeholder="Cow name" aria-label="Username" aria-describedby="basic-addon1"/>
						</div>
					</div>
					<div className="col-md-3">
					  <div className="input-group mb-3">
						  <input type="text" className="form-control cpinput" placeholder="Cow name" aria-label="Username" aria-describedby="basic-addon1"/>
						</div>
					</div>
				</div>
				<div className="row">
				  <div className="col-md-9"></div>
				  <div className="col-md-3 text-end"><button type="button" className="btn btn-primary" onClick="cow.select_dam_datatable.draw();">Search</button></div>
				</div>
				  <table className="calv-detail-table table-bordered" id="userTable">
					  <thead>
						  <tr>
							  <th>#</th>
							  <th>Username</th>
							  <th>Name</th>
							  <th>Created</th>
							  <th>User Type</th>
							  <th>Select Doctor</th>
						  </tr>
					  </thead>
					  <tbody>
					  </tbody>
				  </table>
				  
			</div>
		</div>
	  </div>
	  <div className="modal-footer">
		<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
		<button type="button" className="btn btn-primary">Save changes</button>
	  </div>
	</div>
  </div>
</div>
</>
  )
}
