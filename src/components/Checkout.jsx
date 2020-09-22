import React from 'react';
import { useSelector } from 'react-redux';


const Checkout = (props) => {
    const confirm = () => {
        window.location="/";
    }
    const cart = useSelector (store => store.cartReducer);
    return ( 
        <div style={{textAlign:"center", marginTop:"10vh"}}>
            <h1>You are about to Checkout with the following courses, are you sure?</h1>
            <div style={{ width:"50%", margin:"0 auto"}}>
            <ul style={{marginTop:"10vh"}} className="list-group list-group-flush">
                {cart.map(item => 
                    
                        <li className="list-group-item">
                            {item.dept}{item.number} : {item.title}
                        </li>
                    
                )}
                </ul>
                <button onClick={confirm} style={{marginTop:"10vh"}} className="btn custom-button">
                    Confirm
                </button>
            </div>
        </div>
     );
}
 
export default Checkout;