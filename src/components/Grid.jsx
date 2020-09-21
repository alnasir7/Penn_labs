import React from 'react';
import CourseCard from './CourseCard';


const Grid = ({data, goto}) => {
    return ( 
        <div className="container">
            <div className="row">
        {data.map((course, index) => {
              return (
                <CourseCard goto={goto} course={course} />
              );
            })}
            </div>
            <div className="row">
                
            </div>
        </div>

     );
}
 
export default Grid;