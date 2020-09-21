import React, { useState} from 'react';
import { Route, BrowserRouter } from "react-router-dom";
import {useDispatch} from "react-redux";
import { loadCourses } from '../Actions/Actions';
import data from "../data/courses.json"
import Nav from './Nav'
import Home from "./home"
import CoursePage from './CoursePage';



const RootApp = () => {
 
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
      </div>
      </React.Fragment>
      </BrowserRouter>

     );
}
 
export default RootApp;



