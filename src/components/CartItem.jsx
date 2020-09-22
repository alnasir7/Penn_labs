import React from 'react';
import { useSelector } from 'react-redux';



const CartItem = ({course, closeModal, goto, addElement, removeElement, moveUp, moveDown}) => {
    
    //This is the component for a single course on the cart list where you can interact (change priority, remove, view details)
    //with that course

    const cartData = useSelector (store => store.cartReducer) 
    const view = () => {
        //navigate to the page for the course
       goto( `/course/${course.number}`);
    }
    return ( 
<div class="card" style={{textAlign:"start", marginBottom:"20px"}}>
  <div class="card-body">
    <h5 class="card-title">{course.dept} {course.number} </h5>
    <p class="card-text">{course.title}</p>
    
    <button type="button" onClick={view} className="btn btn-light" style={{marginLeft:"10px"}}>view</button>
  
    { // show remove or add button depending on wether the course is already in the cart or not
    cartData.includes(course) ? <button onClick = {()=>{removeElement(course)}} type="button" className="btn btn-light " style={{marginLeft:"10px"}}>Remove</button> : <button type="button" className="btn btn-light " style={{marginLeft:"10px"}}>Add</button>}
    
    <button onClick = {()=> {moveUp(course)}} type="button" className="btn btn-light" style={{marginLeft:"10px"}}>Up</button>
    <button onClick = {()=> {moveDown(course)}} type="button" className="btn btn-light" style={{marginLeft:"10px"}}>Down</button>
 
  </div>
</div>
     );
}
 
export default CartItem;