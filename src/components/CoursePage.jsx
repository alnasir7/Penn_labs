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
     // I am assuming in a real application I will be provided with data that has Ids.
    //for this application I will use the number of the course as the unique identifier
    const course = courses.filter(course => course.number == props.match.params.id)[0];


    //this function allows the user to call the penn labs api and access additional information about the course
    useEffect (()=> {
        //create an async function to fetch the data since letting having useEffect as an async function creates problems
        const fetchData = async () => {
            try {
                const extraCourseData = await courseServices.getCourse(course);
                changeExtraData(extraCourseData.courses[0]);       
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    },[]);

    //add a course to the cart
    const handleAdd = () => {
        if (cart.includes(course) ){
            dispatch ({type : removeFromCart , payload: course});
        }
        else {
        dispatch ({type : addToCart , payload: course});
        }

    }
  

    
   

    //in different parts of the return of this functions there will be expressions such as courseData && courseData.instructors
    //this is so that the application does not break if the api call fails and since I am not sure the properties I am
    //trying to access are available for every course
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

{
    extraData && extraData.first_meeting_days &&
    <tr>
        <th>Meeting Days</th>
        <td>
            {extraData.first_meeting_days}
        </td>
    </tr>
}


    <tr>
      <th scope="row">Course Description</th>
      <td>{course.description}</td>
    </tr>

  {extraData && extraData.instructors && (
      <tr>
          <th>
              Instructors
          </th>
          <td>
              {extraData.instructors.map(instructor => (
                  <p>{instructor.name}</p>
              ))}
          </td>

      </tr>
  )}
    

    <tr>
      <th scope="row">Prequesits</th>
            <td colspan="2">{course.prereqs ? course.prereqs.map (prereq => <div>{prereq}</div>) : <span>No Prerequesites</span>}</td>
    </tr>
    <tr>
      <th scope="row">Cross-listed</th>
            <td colspan="2">{course["cross-listed"] ? course["cross-listed"].map (item => <div>{item}</div>) : <span>No Cross-listed Courses</span>}</td>
    </tr>
    {extraData && <tr>
      <th scope="row">Max Enrollement</th>
      <td>
          {extraData.max_enrollment}
      </td>
    </tr> }
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