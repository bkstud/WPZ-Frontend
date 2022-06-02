import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import DetailsIcon from '@mui/icons-material/Details';

const ExamApproachResultButton = (props) => {
    const navigate = useNavigate()

    return (
      <Button
        startIcon={<DetailsIcon />}
        variant="contained"
        color="primary"
        onClick={() => {
            navigate(`/tests/approaches/${props.approachId}/results`)
      }}
    >
        {
            "Zobacz podejście"
        }
    </Button>
    )
}

export default ExamApproachResultButton