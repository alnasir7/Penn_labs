import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import {addToCart, loadCart} from "../Actions/Actions"
import { removeFromCart, emptyCart } from '../Actions/Actions';

const CartModal = ({ modalState, changeModalState, props }) => {


    //This is the component where you can view your cart and edit it (changing priority and items)

    //The following functions are passed to the single item page and allow adding/removing/changing prority
    const empty = () => {
        dispatch({type:emptyCart})
    }

    const addElement = (course => {
        dispatch ({type : addToCart , payload: course});
    });
    const removeElement = (course => {
        dispatch ({type : removeFromCart , payload: course});
    });

    const goto = (locationString) => {
        props.history.push(locationString);
      }

      const handleCheckout = () => {
          props.history.push("/checkout");
      }

      const moveUp = (course) => {
          //this functions changes the priority of the course by finding its position in the list and slicing the list to all
          //elements before and after it and inserting the elemnt in the correct order and rejoining the lists
          const index = courses.indexOf(course);
        const newArray = courses
        .filter (item => item != course);
        
        const finalArray = [...newArray.slice(0, index-1), course, ...newArray.slice(index-1)];
        dispatch({type:emptyCart});
        dispatch({type:loadCart, payload:finalArray});

      }

      const moveDown = (course) => {
          //similar to the above function
        const index = courses.indexOf(course);
        const newArray = courses
        .filter (item => item != course);
        
        const finalArray = [...newArray.slice(0, index+1), course, ...newArray.slice(index+1)];
        dispatch({type:emptyCart});
        dispatch({type:loadCart, payload:finalArray});
      }

    const dispatch = useDispatch();
    const courses = useSelector (store => store.cartReducer);
   

  return (

    <Modal
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(150, 150, 150, 0.75)",
        },
        content: {
          position: "absolute",
          top: "18vh",
          left: "12vw",
          right: "12vw",
          bottom: "18vh",
          border: "1px solid #ccc",
          textAlign: "center",
          background: "white",
          color: "black",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "12px",
          outline: "none",
          padding: "20px",
        },
      }}
      isOpen={modalState}
      onRequestClose={() => changeModalState(false)}
      className="image-modal"
    >


      <div style={{marginBottom:"20px", position:"relative"}}>
      {courses.length > 0 && <button onClick ={empty} style={{position:"absolute", top :"5", right:"0"}} className="btn btn-primary">empty cart</button>}
          <h1>
              Course Cart
          </h1> 
          {courses.length > 0 ? 
          <div>
            
          {courses.map ((course, index)  => {
              //mapping the courses on the cart to single course components
              return( <CartItem
                index = {index}
                 addElement={addElement}
                 moveDown = {moveDown}
                 moveUp = {moveUp}
                  removeElement={removeElement}
                   goto ={goto
                } closeModal = {changeModalState}
                 course = {course} />);
             
          })}
     
      {
          //only allow procceding if the cart has elements
      courses.length>0 && <button onClick ={handleCheckout} className = "btn custom-button">
          Procced to checkout
      </button>}
      </div>
         : 
         <h1 style={{marginTop:"20%"}}>
             Your cart is empty</h1>}
             </div>
    </Modal>
  );
};

export default CartModal;