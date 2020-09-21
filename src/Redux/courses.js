import { loadCourses } from "../Actions/Actions";

const initial_state = [];

export default function (state = initial_state, { type, payload }) {
  switch (type) {
    case loadCourses:
      return payload;
    default:
      return state;
  }
}