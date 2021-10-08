import React, { useState }  from 'react'
import './form.css'
import "react-datepicker/dist/react-datepicker.css";
import swal from 'sweetalert';

const moment = require('moment')
const Form = ()=>{
    const [empData , setEmpData] = useState({
        name :"" ,Date:"",  start_time:"", start_break:"", end_break:"", end_time:"",total_Hours:"",total_break:"",worked_Hours:""
        })
    

    let name , value;
    const handleInputs = (e)=>{
        console.log(e)
        name= e.target.name;
        value = e.target.value;

        setEmpData({...empData , [name]:value})
    }
 
    const PostData = async (e)=>{

        e.preventDefault();
    
        const {name , start_time , start_break , end_break , end_time} = empData
        const IndDate = moment(empData.Date).format('DD/MM/YYYY');
        console.log(IndDate, "In API calling");
        const res = await fetch("https://nameless-temple-50881.herokuapp.com/addData", {
          method:"POST",
          headers:{"Content-Type" : "application/json"},
          body:JSON.stringify({
            name:name , Date:IndDate , start_time:start_time , start_break:start_break , end_break:end_break,end_time:end_time,total_break:data.totalBreakHours ,worked_Hours:data.totalWorkHours ,total_Hours:data.actualWorkingHour
          })
        })
        const data1 = await res.json();
        
        if ( !data  ){
            swal({
                title: "Error!",
                text: "Please field all Data ",
                icon: "warning",
                timer: 2000,
                button: false
              })
            }
            else{
        swal({
            title: "Done!",
            text: "Data Record Succesfully",
            icon: "success",
            timer: 2000,
            button: false
          })
          console.log("Login Successfully")
            }
          console.log("Registration Successfully", data1)
      }

    
   function calculateHours(results) {
        // Initialize variables
        var hoursWorked = 0;
        var minutesWorked = 0;
        var hoursOnBreak = 0;
        var minutesOnBreak = 0;
        var totalWorkHours = 0;
        var totalBreakHours = 0;
        var totalShiftHours = 0;
        // var totalAmount = 0;
        var actualWorkingHour = 0
        
        // Fetch data from props
        // const payRate = results.pay_rate;
        const startTime = empData.start_time;
        const endTime = empData.end_time;
        const startBreak = empData.start_break;
        const endBreak = empData.end_break;

        if (startTime !== "" && endTime !== "")
        {
            // Start Time
            const startTimeHour = startTime.split(":")[0];
            const startTimeMin = startTime.split(":")[1];
            const startTimeInHours = Number(startTimeHour) + startTimeMin / 60;

            // End Time
            const endTimeHour = endTime.split(":")[0];
            const endTimeMin = endTime.split(":")[1];
            const endTimeInHours = Number(endTimeHour) + endTimeMin / 60;
            
            if (startBreak !== "" && endTime !== "")
            {
                // Start Break
                const startBreakHour = startBreak.split(":")[0];
                const startBreakMin = startBreak.split(":")[1];
                const startBreakInHours = Number(startBreakHour) + startBreakMin / 60;

                // End Break
                const endBreakHour = endBreak.split(":")[0];
                const endBreakMin = endBreak.split(":")[1];
                const endBreakInHours = Number(endBreakHour) + endBreakMin / 60;

                totalBreakHours = endBreakInHours - startBreakInHours;
            }
            // Total Hours
            totalShiftHours = endTimeInHours - startTimeInHours;
            totalWorkHours = totalShiftHours - totalBreakHours;
            //totalAmount = payRate * multiplier * totalWorkHours;
            actualWorkingHour = totalShiftHours
            // Rounded Values
            hoursWorked = Math.floor(totalWorkHours);
            minutesWorked = Math.round((totalShiftHours % 1) * 60);
            hoursOnBreak = Math.floor(totalBreakHours);
            minutesOnBreak = Math.round((totalBreakHours % 1) * 60);
            
            // Fixed Decimal Places
            totalWorkHours = totalWorkHours.toFixed(2);
            totalBreakHours = totalBreakHours.toFixed(2);
            actualWorkingHour = actualWorkingHour.toFixed(2);
            // totalAmount = totalAmount.toFixed(2);
        }
        return {
            hoursWorked: hoursWorked,
            minutesWorked: minutesWorked,
            hoursOnBreak: hoursOnBreak,
            minutesOnBreak: minutesOnBreak,
            totalWorkHours: totalWorkHours,
            totalBreakHours: totalBreakHours,
            actualWorkingHour: actualWorkingHour
            // totalAmount: totalAmount
        };
    }
    const data = calculateHours();
      return(
          <>
          <div className="shiftTimes flexItem">
                <h3>Employye Name</h3>
                <input type="text" onChange={handleInputs} name="name" value={empData.name} id="name" list="name_list" />
                <h3>Date</h3>
                <input type="date"  name="Date" onChange={handleInputs} value={empData.Date}/><br/>
                <h3>Shift Times</h3>
                <form id="shift_times">
                    <div>Start Time: &nbsp; <input type="time" value={empData.start_time}  onChange={handleInputs} name="start_time" id="start_time" list="times_list" /></div>
                    <h4>Breaks</h4>
                    <div>Start Break: &nbsp; <input type="time" value={empData.start_break}  onChange={handleInputs} name="start_break" id="start_break" list="times_list" /></div>
                    <br />
                    <div>End Break: &nbsp; <input type="time" vResultsalue={empData.end_break}  onChange={handleInputs} name="end_break" id="end_break" list="times_list" /></div>
                    <br />
                    <div>End Time: &nbsp; <input type="time" value={empData.end_time} onChange={handleInputs} name="end_time" id="end_time" list="times_list" /></div>
                </form>
                <datalist id="times_list">
                    <option value="06:00" />
                    <option value="07:00" />
                    <option value="08:00" />
                    <option value="09:00" />
                    <option value="10:00" />
                    <option value="11:00" />
                    <option value="12:00" />
                    <option value="13:00" />
                    <option value="14:00" />
                    <option value="15:00" />
                    <option value="16:00" />
                    <option value="17:00" />
                    <option value="18:00" />
                    <option value="19:00" />
                    <option value="20:00" />
                    <option value="21:00" />
                    <option value="22:00" />
                    <option value="23:00" />￼

                </datalist>
                <datalist id="name_list">
                    <option value="Jay Patel" />
                    <option value="Zaid Mansuri" />
                    <option value="Vipul shukla" />
                    <option value="Jignesh" />
                    <option value="Darshan" />
                    <option value="Sneh Bhavsar" />

                </datalist>
                <br />
            </div> 

            <div className="results flexItem">
                <h3>Calculate Hours </h3>
                <p id="hours_worked">Hours Worked: {data.hoursWorked}h {data.minutesWorked}m | {data.totalWorkHours} hours</p>
                <p id="total_breaks">Total Breaks: {data.hoursOnBreak}h {data.minutesOnBreak}m | {data.totalBreakHours} hours</p>
                <p id="total_breaks">Total Hour:  {data.actualWorkingHour} hours</p>
                {/* <p id="gross_pay">Gross Pay: ${data.totalAmount}</p> */}
                

                <button onClick={PostData}>
                    Submit
                </button>
                
                <br /><br />
            </div>
          </>
      )

}

export default Form
