import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/fontawesome-free';
import { faBell, faBiking, faHome } from '@fortawesome/free-solid-svg-icons';
function Footer(props) {
    return (
        <footer>
          <div className="container-fluid p-5">
            <h4>Get the fresh card app</h4>
            <p>we will send you a link ,open it on youtr phone to download the app</p>
            <div className="container ">
               <div className="d-flex justify-content-center align-items-center">
               <input type="email" placeholder='email' className='form-control w-75 mx-2' />
                <button className='btn btn-success'>Share App Link</button>
               </div>
               <div className="d-flex py-4 border-bottom border-top border-2 mt-4  justify-content-between align-items-center">
                <div className="leftPart">
                    <ul className='d-flex list-unstyled align-items-center'>
                        <li className='me-2'>payment partners</li>
                        <li className='me-2 text-primary'><i className="fa-brands fa-cc-mastercard"></i></li>
                        <li className='me-2 text-primary'><i className="fa-brands fa-paypal"></i></li>
                        <li className='me-2 text-primary'><i className="fa-brands fa-amazon-pay"></i></li>
                       
                    </ul>
                </div>
                <div className="rightPart d-flex align-items-center">
                    <h6 className='me-2'>get deliveries with fresh cart</h6>
                    <button className='bg-dark text-white btn me-2'><i className="fa-brands fa-apple me-2"></i><span>App Store</span></button>
                    <button className='bg-dark text-white btn'><i class="fa-brands fa-google-play me-2"></i><span>Google Play</span></button>

                </div>
               </div>
            </div>
            </div>  
        </footer>
    );
}

export default Footer;