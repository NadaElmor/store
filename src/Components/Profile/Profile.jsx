import React from 'react';
import { useNavigate } from 'react-router-dom';

function Profile({crrUser}) {
    console.log(crrUser);
    const navigate=useNavigate();
    return<>
    <h2 className='text-center p-4 '>Welcome {crrUser.name}</h2>
     
     <div className="container p-3">
   <span>want to see your last orders? press here.. </span>
   <button className='btn btn-success' onClick={function(){
    navigate('/allorders');
   }}>Orders</button>
<br />
   <span>explore more? press here... </span>
   <button className='btn btn-success' onClick={function(){
    navigate('/home');
   }}>explore</button>

     </div>
    </>
}

export default Profile;