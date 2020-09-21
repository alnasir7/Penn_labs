import React from 'react';
import { Link } from 'react-router-dom';
import {useHistory} from "react-router-dom";



const CartItem = ({course, closeModal, goto}) => {
    
    const view = () => {
       goto( `/course/${course.number}`);
    }
    return ( 
<div class="card" style={{textAlign:"start"}}>
  <div class="card-body">
    <h5 class="card-title">{course.dept} {course.number} </h5>
    <p class="card-text">{course.title}</p>
    
    <button type="button" onClick={view} className="btn btn-light" style={{marginLeft:"10px"}}>view</button>
 
    <button type="button" className="btn btn-light " style={{marginLeft:"10px"}}>Remove</button>
    <button type="button" className="btn btn-light" style={{marginLeft:"10px"}}>Up</button>
    <button type="button" className="btn btn-light" style={{marginLeft:"10px"}}>Down</button>
 
  </div>
</div>
     );
}
 
export default CartItem;