import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from "react"
import http from "../lib/axios";
import Button from '@mui/material/Button';


function statusGenerator(params) {
  const current_time = Date.now();
  const start_time = new Date(params.row.start_time)
  const end_time = new Date(params.row.start_time)

  if (params.row.canStart === false){
    if (current_time < start_time){
      return "Egzamin rozpocznie się: " + start_time.toString()
    }
    else if (end_time < current_time){
      return "Egzamin zakończył się: " + end_time.toString()
    }
  } else {
      return `Egzamin otwarty, zostało ${params.row.approaches_remaining} z ${params.row.max_approaches} podejść.`
  }
}

function examTimeStringGenerator(date){
  return date == null ? "Bez limitu czasu" : date.toString();
}



const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'title', headerName: 'Nazwa egzaminu', width: 300 },
  { field: 'number_of_questions', headerName: 'Ilość pytań', width: 130 },
  { field: 'status', headerName: 'Status', width: 400, valueGetter: statusGenerator},
  { field: 'start_time', headerName: 'Początek egzaminu', width: 200,  valueGetter: (params) => (examTimeStringGenerator(params.row.start_time))},
  { field: 'end_time', headerName: 'Koniec egzaminu', width: 200, valueGetter: (params) => (examTimeStringGenerator(params.row.end_time)) },
  { field: 'actions', headerName: 'Akcja', width: 300,renderCell: (cellValues) => {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={(event) => {
          console.log("TODO")
        }}
      >
        Rozpocznij podejść
      </Button>
    );
  }},
];

const Tests = () => {
    const [exams, setExams] = useState([])
  

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
          http.get("/exams", 
          {
            headers: {
              'Authorization': `Basic ${token}` 
            }
          }
          ).then(({data}) => {
            setExams(data)
        });
        

    }, [])
  
    return (
      <div style={{ height: 400, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
        <DataGrid
        rows={exams}
        columns={columns}
      />
        </div>
      </div>
    </div>
  );
  }
  
  export default Tests
