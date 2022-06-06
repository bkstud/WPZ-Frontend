import {
    EXAM_START_REQUEST,
    EXAM_NO_MORE_APPROACHES,
    EXAM_STARTED,
    EXAM_END_REQUEST,
    EXAM_ENDED,
  } from "../../constants/examConstants";

export const examReducer = (state = {}, action) => {
    switch (action.type) {
      case EXAM_START_REQUEST:
        return { loading: true, approachData: null };
      case EXAM_NO_MORE_APPROACHES:
        return { loading: false, approachData: null }
      case EXAM_STARTED:
        return { loading: false, approachData: action.payload };
      case EXAM_END_REQUEST:
        return { loading: true, approachData: null };
      case EXAM_ENDED:
        return { loading: false, approachData: null };
      default:
        return state;
    }
  };