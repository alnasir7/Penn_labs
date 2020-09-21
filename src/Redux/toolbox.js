import {uploadToolbox} from "../Actions/Actions";

const initial_State = {}

export default function (state=initial_State, {type, payload}) {
    switch (type) {
case uploadToolbox :
    return payload;
    break;
    default :
    return state;
    }
}