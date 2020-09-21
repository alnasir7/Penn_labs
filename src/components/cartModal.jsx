import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';

const CartModal = ({ modalState, changeModalState, props }) => {
    const goto = (locationString) => {
        props.history.push(locationString);
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


      <div style={{marginBottom:"20px"}}>
          <h1>
              Course Cart
          </h1>
          {courses.map (course => {
              return( <CartItem goto ={goto} closeModal = {changeModalState} course = {course} />);
             
          })}
      </div>
      {courses.length>0 && <button className = "btn custom-button">
          Procced to checkout
      </button>}
    </Modal>
  );
};

export default CartModal;