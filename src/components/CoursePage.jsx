import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import {addToCart} from "../Actions/Actions";
import {removeFromCart} from "../Actions/Actions";
import * as courseServices from "../Services/courseServices"

const CoursePage = ({props}) => {
    const [extraData, changeExtraData] = useState (null);
    const dispatch = useDispatch();
    const courses = useSelector(store => store.courseReducer);
    const cart = useSelector(store => store.cartReducer);
    const course = courses.filter(course => course.number == props.match.params.id)[0];

    useEffect (async ()=> {
        try {
            const extraCourseData = await courseServices.getCourse(course);
            changeExtraData(extraCourseData);
            console.log(extraCourseData.courses[0]["max_enrollment"]);
            
        } catch (error) {
            console.log(error);
        }
    },[]);

    const handleAdd = () => {
        if (cart.includes(course) ){
            dispatch ({type : removeFromCart , payload: course});
        }
        else {
        dispatch ({type : addToCart , payload: course});
        }

    }
  

    
    // I am assuming in a real application I will be provided with data that has Ids.
    //for this application I will use the number of the course as the unique identifier
    return ( 
        
        <div>
             
            { course ? (
            <div className="container">
                <div className="row">
                    <h2 style={{textAlign:"center", margin:"50PX"}}>{course.title}</h2>
                    
                </div>
                <div className="row">
                    <div className="col col-9">

            <table class="table table-borderless">
       <tbody>
       <tr>
      <th scope="row">Department</th>
      <td> {course.dept} </td>
    </tr>
    <tr>
      <th scope="row">Number</th>
      <td> {course.number} </td>
    </tr>
    <tr>
      <th scope="row">Title</th>
      <td> {course.title} </td>
    </tr>
    <tr>
      <th scope="row">Course Description</th>
      <td>{course.description}</td>
    </tr>
    {extraData && extraData.instructors ? extraData.instructors.map(instructor => <tr>
      <th scope="row">Instructors</th>
      <td>{instructor}</td>
    </tr> )  : null}
    <tr>
      <th scope="row">Prequesits</th>
            <td colspan="2">{course.prereqs ? course.prereqs.map (prereq => <div>{prereq}</div>) : <span>No Prerequesites</span>}</td>
    </tr>
    <tr>
      <th scope="row">Cross-listed</th>
            <td colspan="2">{course["cross-listed"] ? course["cross-listed"].map (item => <div>{item}</div>) : <span>No Cross-listed Courses</span>}</td>
    </tr>
    {extraData ?( <tr>
      <th scope="row">Max Enrollement</th>
      <td>
          {course.prereqs ? course.prereqs.map(item => {console.log(extraData); return 0; }): null}
      </td>
    </tr> ): null}
  </tbody>
</table>
</div>
<div className="col col-3">
    {!cart.includes(course)? <span>Add this Course</span> : <span>Remove from cart</span>}
<IconButton 
          onClick = {handleAdd}
           aria-label="add">
               {!cart.includes(course) ? <AddIcon /> : <DeleteIcon />}
          </IconButton>
</div>
</div>
            </div>
             ) : null }
        </div>
     );
}
 
export default CoursePage;