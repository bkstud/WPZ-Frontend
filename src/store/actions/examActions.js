import { EXAM_ENDED, EXAM_END_REQUEST, EXAM_NO_MORE_APPROACHES, EXAM_STARTED, EXAM_START_REQUEST } from "../../constants/examConstants";
import { httpProtected } from "../../lib/axios";

export const examStart = (examId, navigate) => async dispatch => {
    const token = JSON.parse(localStorage.getItem("token"));
    dispatch({ type: EXAM_START_REQUEST })
    httpProtected(token).post("/exams/" + examId + "/start").then(({data}) => {
        dispatch({ type: EXAM_STARTED, payload: data})
        navigate("/tests/approaches")
    }).catch(() => {
        dispatch({ type: EXAM_NO_MORE_APPROACHES })
    });
}

export const examContinue = (approachId, navigate) => async dispatch => {
    const token = JSON.parse(localStorage.getItem("token"));
    dispatch({ type: EXAM_START_REQUEST })
    httpProtected(token).get("/exams/approaches/" + approachId  + "/questions").then(({data}) => {
        dispatch({ type: EXAM_STARTED, payload: {"approach_id": approachId, "questions": data}})
        navigate("/tests/approaches")
    }).catch(() => {
        dispatch({ type: EXAM_NO_MORE_APPROACHES })
    });
}

export const examEnd = (approachId) => async dispatch => {
    const token = JSON.parse(localStorage.getItem("token"));
    dispatch({ type: EXAM_END_REQUEST })
    httpProtected(token).post("/exams/approaches/" + approachId  + "/end").then(({data}) => {
        dispatch({ type: EXAM_ENDED })
    }).catch(() => {});
}