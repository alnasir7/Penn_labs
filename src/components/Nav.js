import React from 'react'
import {Link} from "react-router-dom"
import { useSelector } from 'react-redux';

const Navbar = ({changeModalState}) => {

  const courses = useSelector (store => store.cartReducer);
  // the navigation bar component displays the name of the app, the cart icon and the number of courses on the carts
  return (
    <nav className="navbar custom-nav" id="navbar">
      <div className="flex-nav-container container">
        <Link to = "/" style ={{color:"black", textDecoration: "none"}}>
      <div className="flexItem img-container">
          Penn Course Cart
        </div>
        </Link>
        <div className="spacer"></div>
        <div style={{marginRight:"10px"}} className="flexItem">
        {courses.length || null}
        </div>
        <div className="flexItem " style ={{cursor: "pointer"}} onClick = {changeModalState}>
        <i class="fas fa-shopping-cart" ></i>
        </div>
      </div>
    </nav>
    );
}
 
export default Navbar;