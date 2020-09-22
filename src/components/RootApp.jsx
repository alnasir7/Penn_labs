import React, { useState} from 'react';
import { Route, BrowserRouter } from "react-router-dom";
import {useDispatch} from "react-redux";
import { loadCourses } from '../Actions/Actions';
import data from "../data/courses.json"
import Nav from './Nav'
import Home from "./home"
import CoursePage from './CoursePage';
import Checkout from './Checkout';



const RootApp = () => {
    //this the root component of the application where the browser and all routes are declared it also holds the state of
    // the modal component
 
    const dispatch = useDispatch();
     dispatch({type : loadCourses, payload: data});
    const [modalState, changeModalState] = useState (false);
    return ( 
      <BrowserRouter >
      <React.Fragment>
      <Nav changeModalState = {changeModalState} />
      <div style={{paddingTop:"10vh"}}>
      <Route path = "/" exact render = {((props)=>  <Home modalState = {modalState} changeModalState={changeModalState} props={props} /> )} /> 
      <Route path = "/course/:id" render = {(props) => <CoursePage props= {props} />} />
      <Route path = "/checkout" component = {Checkout} />
      </div>
      </React.Fragment>
      </BrowserRouter>

     );
}
 
export default RootApp;



