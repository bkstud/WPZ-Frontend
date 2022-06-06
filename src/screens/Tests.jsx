import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from "react"
import { httpProtected } from "../lib/axios";
import ExamApproachButton from '../components/ExamApproadButton';
import ExamApproachListButton from '../components/ExamApproachListButton';

function statusGenerator(params) {
  const current_time = Date.now();
  const start_time = new Date(params.row.start_time)
  const end_time = new Date(params.row.end_time)

  if (params.row.canStart === false){
    if (current_time < start_time){
      return "Egzamin rozpocznie się: " + start_time.toLocaleString()
    }
    else if (end_time < current_time){
      return "Egzamin zakończył się: " + end_time.toLocaleString()
    }
  } else {
      if (params.row.max_approaches === -1) {
        return `Egzamin otwarty, zostało nielimitowana liczba podejść.`
      } else {
        return `Egzamin otwarty, zostało ${params.row.approaches_remaining} z ${params.row.max_approaches} podejść.`
      }
  }
}

function examTimeStringGenerator(date){
  return date == null ? "Bez limitu czasu" : new Date(date).toLocaleString();
}

function getStartApproachButton(params) {
  const current_time = Date.now();
  const start_time = params.row.start_time;
  const end_time = params.row.end_time;
  const start_time_date = new Date(params.row.start_time);
  const end_time_data = new Date(params.row.end_time);

  let disabled = false;
  if (start_time != null && end_time_data < current_time) {
    disabled = true;
    if (params.row.approaches_in_progress.length > 0) {
      const token = JSON.parse(localStorage.getItem("token"));
      httpProtected(token).post("/exams/approaches/" + params.row.approaches_in_progress[0] + "/end").then(() => {}).catch(() => {})
    }
  } else if (end_time != null && start_time_date > current_time) {
    disabled = true;
  } else if (params.row.canStart === false) {
    disabled = true;
  }
  return (
    <ExamApproachButton disabled={disabled} examData={params} />
  );
}

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'title', headerName: 'Nazwa egzaminu', width: 300 },
  { field: 'number_of_questions', headerName: 'Ilość pytań', width: 130 },
  { field: 'status', headerName: 'Status', width: 400, valueGetter: statusGenerator},
  { field: 'start_time', headerName: 'Początek egzaminu', width: 200,  valueGetter: (params) => (examTimeStringGenerator(params.row.start_time))},
  { field: 'end_time', headerName: 'Koniec egzaminu', width: 200, valueGetter: (params) => (examTimeStringGenerator(params.row.end_time)) },
  { field: 'approach', headerName: 'Akcja', width: 300, renderCell: (params) => (getStartApproachButton(params))},
  { field: 'results', headerName: 'Podejścia', width: 300, renderCell: (cellValues) => {
    return (
      <ExamApproachListButton examid={cellValues.id} approaches={cellValues.row.finished_approaches} />
    );
  }},
];

const Tests = () => {
    const [exams, setExams] = useState([])

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        httpProtected(token).get("/exams").then(({data}) => {
            setExams(data)
        }).catch(() => {});
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
