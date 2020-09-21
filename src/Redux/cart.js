import { loadCart } from "../Actions/Actions";
import { addToCart} from "../Actions/Actions"
import {removeFromCart} from "../Actions/Actions"

const initial_state = [];

export default function (state = initial_state, { type, payload }) {
  switch (type) {
    case loadCart:
      return payload;
      break;
    case addToCart:
        return [...state, payload];
        break;
    case removeFromCart :
       
        const newArray  = state.filter(course => !(course === payload));
        return newArray;
        break;
    default:
      return state;
  } 
}