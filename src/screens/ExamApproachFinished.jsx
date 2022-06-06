import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom';
import { httpProtected } from "../lib/axios";
import ExamApproachResultButton from '../components/ExamApproachResultButton';
import { Button } from '@mui/material';


function scoreGenerator(params) {
    return `${params.row.score}/${params.row.max_points}`
}

const columns = [
  { field: 'id', headerName: 'Id', width: 70 },
  { field: 'approach_id', headerName: 'Approach id', width: 70 },
  { field: 'score', headerName: 'Wynik', width: 70, valueGetter: scoreGenerator},
  { field: 'results', headerName: 'Podejście', width: 200, renderCell: (cellValues) => {
    return (
        <ExamApproachResultButton approachId={cellValues.row.approach_id} />
    );
  }},
];

const ExamApproachFinished = () => {
    const { examId } = useParams()
    const [approachesData, setApproachesData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        httpProtected(token).get("/exams/" + examId).then(async ({data}) => {
            let finished_approaches = data.finished_approaches
            let all_approaches_data = []
            for (let approach of finished_approaches) {
                try {
                    let { data } = await httpProtected(token).get("/exams/approaches/" + approach + "/score")
                    all_approaches_data.push({"id": finished_approaches.indexOf(approach),"approach_id": approach, ...data})
                } catch(reason) {}
            }
            setApproachesData([...all_approaches_data])
        }).catch(() => {});
    }, [examId])
  
    if (approachesData.length === 0) {
        return <div>Loading...</div>
    } 
    return (
      <>
        <div style={{ height: 400, width: '100%' }}>
          <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ flexGrow: 1 }}>
              <DataGrid
                rows={approachesData}
                columns={columns}
              />
            </div>
          </div>
        </div>
        <Button variant="contained" color="primary"
          onClick={() => { navigate(`/tests/`) }}>"Powrót do testów"</Button>
      </>
  );
  }
  
  export default ExamApproachFinished
