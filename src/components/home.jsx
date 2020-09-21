import React from 'react';
import CartModal from './cartModal';
import Courses from './Courses';



const Home = ({props, modalState, changeModalState}) => {
  
    return ( 
        <React.Fragment>
                <CartModal props={props} modalState = {modalState} changeModalState = {changeModalState} />
                <Courses props = {props} /> 
                
        </React.Fragment>
     );
}
 
export default Home;