import { Button } from "@mui/material"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { examContinue, examStart } from '../store/actions/examActions';

const ExamApproachButton = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const examRowData = props.examData.row

    return (
      <Button
        variant="contained"
        color="primary"
        disabled={props.disabled}
        onClick={(event) => {
            examRowData.approaches_in_progress.length > 0 ?
            dispatch(examContinue(examRowData.approaches_in_progress[examRowData.approaches_in_progress.length - 1], navigate)) :
            dispatch(examStart(props.examData.id, navigate))
      }}
    >
        {
            examRowData.approaches_in_progress.length > 0 ? "Kontynuuj podejście" : "Rozpocznij podejść"
        }
    </Button>
    )
}

export default ExamApproachButton