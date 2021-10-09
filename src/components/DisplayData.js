import React, { useEffect, useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import axios from 'axios';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
//import AtdData from "./data/MOCK_DATA.json";

const DisplayData = () => {
  const [AtdData , setAtdData]= useState([]);
  const [gridApi, setGridApi] = useState([]);
  const [gridColumnApi, setGridColumnApi] = useState([]);
  const [rowData, setRowData] = useState([]);
  console.log(gridColumnApi)
  const getEmployeeData = async () =>{
            try{
                const data = await axios.get("https://nameless-temple-50881.herokuapp.com/showData");
                console.log(data.data);
                setAtdData(data.data)
            }
            catch(err)
            {
                console.log(err)
                    
            }  
        } 

useEffect(()=>{
            getEmployeeData()
        },[])

  useEffect(() => {
    const formattedDates = AtdData.map(data => {
      return {
        name: data.name,
        Date: data.Date,
        start_time: data.start_time,
        start_break: data.start_break,
        end_break: data.end_break,
        end_time: data.end_time,
        worked_Hours :data.worked_Hours,
        total_Hours:data.total_Hours
      };
    });
    setRowData(formattedDates);
  }, [AtdData]);

  useEffect(() => {
    console.log(gridApi);
  });

  // const resetAppliedFilters = () => {
  //   gridApi.setFilterModel(null);
  // };

  var filterParams = {
    comparator: function (filterLocalDateAtMidnight, cellValue) {
      var dateAsString = cellValue;
      if (dateAsString == null) return -1;
      var dateParts = dateAsString.split('/');
      var cellDate = new Date(
        Number(dateParts[2]),
        Number(dateParts[1]) - 1,
        Number(dateParts[0])
      );
  
      if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
        return 0;
      }
  
      if (cellDate < filterLocalDateAtMidnight) {
        return -1;
      }
  
      if (cellDate > filterLocalDateAtMidnight) {
        return 1;
      }
    },
    browserDatePicker: true,
    minValidYear: 2000,
  };
 

  const onGridReady = params => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.addGlobalListener((type, event) => {
      switch (type) {
        case "filterChanged":
          console.log(event);
          return;
        default:
          return null;
      }
    }); 
  };
console.log(onGridReady);
  return (
    <div className="App">
      {/* <Button onClick={resetAppliedFilters} variant="outlined">
        Reset Filters
      </Button> */}
      {/* <hr /> */}
      <div
        className={"ag-theme-balham"}
        style={{ height: "86vh", width: "100%" }}
      >
        <AgGridReact
          pagination={true}
          defaultColDef={{sortable: true , filter:true}}
          rowData={rowData}>
        <AgGridColumn headerName="Name" field="name" sortable={ true } filter={ true }></AgGridColumn>
        <AgGridColumn headerName="Date" field="Date"filter='agDateColumnFilter' filterParams={filterParams}></AgGridColumn>
        <AgGridColumn headerName="Start Time" field="start_time" sortable={ true } filter={ true }></AgGridColumn>
        <AgGridColumn headerName="Break In" field="start_break" sortable={ true } filter={ true }></AgGridColumn>
        <AgGridColumn headerName="Break Out" field="end_break" sortable={ true } filter={ true }></AgGridColumn>
        <AgGridColumn headerName="Logout" field="end_time" sortable={ true } filter={ true }></AgGridColumn>
        <AgGridColumn headerName="Actaul Working Hours" field="worked_Hours" sortable={ true } filter={ true }></AgGridColumn>
        <AgGridColumn headerName="Total Hours" field="total_Hours" sortable={ true } filter={ true }></AgGridColumn>

        </AgGridReact>
      </div>
    </div>
  );
};

export default DisplayData ;
