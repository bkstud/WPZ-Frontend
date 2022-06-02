import { Box, Button, Paper } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { httpProtected } from "../lib/axios";
import { examEnd } from "../store/actions/examActions";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        marginTop: "7%",
        margin: "auto",
        backgroundColor: "#ffffff",
      },
    },
    box: {
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.up("sm")]: {
        width: "70%",
      },
      [theme.breakpoints.up("md")]: {
        width: "60%",
      },
      [theme.breakpoints.up("lg")]: {
        width: "40%",
      },
      borderColor: "black",
    },
    loader: {
      marginTop: "3%",
      width: "90%",
    },
    register: {
      fontSize: "1.1em",
      background: "linear-gradient(to right, #ece9e6, #ffffff)",
      border: 0,
      borderRadius: 5,
      boxShadow: "0 3px 5px 2px #A9A9A9",
      color: "#696969",
      height: 46,
      padding: "0 15px",
      cursor: "pointer",
      marginTop: 5,
    },
    loginButton: {
      cursor: "pointer",
      fontSize: "1.1rem",
    },
  }),
);

const ExamResults = (props) => {
    const exam = useSelector(state => state.exam);
    const { approachId } = useParams()
    const [results, setResults] = useState({})
    const classes = useStyles();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        if (exam.approachData !== null) {
            httpProtected(token).get("/exams/approaches/" + exam.approachData.approach_id + "/detailed_score")
                .then(response => {
                    setResults({...response.data})
                }).catch(() => {})
        } else if (approachId !== undefined) {
            httpProtected(token).get("/exams/approaches/" + approachId + "/detailed_score")
                .then(response => {
                    setResults({...response.data})
                }).catch(() => {})
        }
    }, [exam.approachData, approachId])

    const finishApproach = () => {
        if (exam.approachData !== null) {
            dispatch(examEnd(exam.approachData.approach_id))
            navigate("/tests", { replace: true })
        } else if (approachId !== undefined) {
            navigate(-1)
        }
    }

    if (results.score !== undefined) {
        return (
            <div className={classes.root}>
                <Box className={classes.box}>
                    <Paper elevation={3}>
                        <h2>Twój wynik: {results.score}/{results.max_points}</h2>
                        {
                            results.detailed_score.map((question, i) => {
                                return (
                                    <div key={i}>
                                        <p>Pytanie {i}: {question.text}, score: {question.correct ? 1 : 0}</p>
                                    </div>
                                )
                            })
                        }
                        <Button variant="contained" color="primary" 
                          onClick={() => finishApproach()}>{exam.approachData !== null ? "Zakończ podejście" : "Powrót do podejść"}</Button>
                    </Paper>
                </Box>
            </div>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
}

export default ExamResults