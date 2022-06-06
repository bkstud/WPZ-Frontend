import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import InfoIcon from '@mui/icons-material/Info';

const ExamApproachListButton = (props) => {
    const navigate = useNavigate()

    if (props.approaches.length === 0) {
        return <div>brak podejść</div>
    }
    return (
      <Button
        startIcon={<InfoIcon />}
        variant="contained"
        color="primary"
        onClick={() => {
            navigate(`/tests/${props.examid}/approaches/finished`)
      }}
    >
        {
            "Zobacz podejścia"
        }
    </Button>
    )
}

export default ExamApproachListButton