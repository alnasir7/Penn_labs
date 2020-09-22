import React, {useState} from 'react'
import {useSelector} from "react-redux"
import Grid from "./Grid"
import Toolbox from "./Toolbox"
import Pagination from "./Pagination"
import { useEffect } from 'react'


const Courses = ({props}) => {
  const goto = (locationString) => {
    props.history.push(locationString);
  }

  const courseData = useSelector ((store) => store.courseReducer);
  const filterData = useSelector ((store) => store.toolboxReducer);
  const [pageSize, changePageSize] = useState (6);
  const  [currentPage, changePage] = useState (1);
  const [filteredLength, changeLength] = useState (40);
  const [displayedArray, changeDisplayedArray] = useState(courseData);
  

  const changeCurrentPage = (newPage) => {
    changePage(newPage);
    findDisplayedArray();
  }


  useEffect(()=>{
   findDisplayedArray();
  },[currentPage, courseData, filterData])
  
  const findDisplayedArray = () => {
   
    if (courseData){ const newArray = courseData
    .filter ((course) => {return !(filterData && filterData.dept && filterData.dept.length>0 && !filterData.dept.includes(course.dept));})
    .filter ((course) => {
      const length = course.prereqs ? course.prereqs.length : 0;   
      return !(filterData && filterData.prereqs && filterData.prereqs.length>0 && (parseInt(filterData.prereqs) < length));})
    .filter ((course) => {
      
      if (filterData && filterData.searchString && filterData.searchString.length>3 ) {
      const keywords = course.description.split(" ").filter(word => word.length > 3);
      const searchKeywords = filterData.searchString.split(" ").filter(word => word.length > 3);
        return searchKeywords.reduce ((acc, outerItem) => acc || keywords.reduce((acc, innerItem) => acc || innerItem.startsWith(outerItem), false),false) 
      }
      else return 1;
    });
    changeLength(newArray.length);
    const newDisplayedArray = newArray .filter((course, index) => Math.ceil((index+1) / pageSize) === currentPage );
    changeDisplayedArray(newDisplayedArray);}
  }




  return (     

    <div>
      <div className="container">
      <div className="row">
        <div className="col col-4">
        <Toolbox />
        </div>

      <div className="col col-8">
      <Grid 
     goto ={goto}
      data = {displayedArray} />
      <Pagination
                currentPage ={currentPage}
                pageSize = {pageSize}
                length = {filteredLength}
                data = {displayedArray || courseData}
                changeCurrentPage = {changeCurrentPage}
                 />
                 </div>
    
    </div>
    </div>
    </div>
   );
}
 
export default Courses;
