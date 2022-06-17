import { Box, Checkbox, FormControlLabel, FormGroup, Paper, Radio } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { httpProtected } from "../lib/axios";
import { useNavigate } from "react-router-dom";

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
    icon: {
      marginBottom: "50%",
    },
    form: {
      marginTop: "2%",
      marginLeft: "8%",
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
    registerBox: {
      textAlign: "center",
      marginRight: "5%",
      marginBottom: "3%",
      marginTop: "1%",
    },
  }),
);

const parseOptions = (array) => {
    return array.map(element => Number(element))
}

const ExamApproach = () => {
    const exam = useSelector(state => state.exam);
    const classes = useStyles();
    const navigate = useNavigate();
    const questions = exam.approachData.questions
    const [questionNr, setQuestionNr] = useState(questions.findIndex(x => !x["chosen_options"]?.length))

    console.log(questions[questionNr])

    const answerQuestion = async data => {
        const token = JSON.parse(localStorage.getItem("token"));
        httpProtected(token).post("/answers", {
            "approach_id": exam.approachData.approach_id,
            "question_id": questions[questionNr].id,
            "chosen_options": parseOptions(data.question instanceof Array ? data.question : [ data.question ])
        }).then(data => {
            reset()
            if (questionNr === questions.length - 1) {
                navigate("/tests/approaches/results")
            }
            setQuestionNr(questionNr + 1)
        }).catch(reason => {
        })
    }
  
    const {
      register,
      handleSubmit,
      reset,
    } = useForm();

    return (
        <div className={classes.root}>
            <Box className={classes.box}>
                <Paper elevation={3}>
                    <form onSubmit={handleSubmit(answerQuestion)}>
                        <h3>Question: {questions[questionNr].text}</h3>
                        <FormGroup>
                        {
                            
                            questions[questionNr].options.map(option => {
                                return (
                                    <FormControlLabel {...register("question")} key={option.id} value={option.id} name="question"
                                      control={questions[questionNr].type === 0 ? <Radio /> : <Checkbox />}
                                      label={option.text} />
                                )
                            })

                        }
                        </FormGroup>
                        <input type="submit" value="Next question" />
                    </form>
                </Paper>
            </Box>
        </div>
    )
}

export default ExamApproach