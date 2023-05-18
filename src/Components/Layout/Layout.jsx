import React from 'react';
import Nav from '../Nav/Nav';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

function Layout({deleteUser,user}) {
 // console.log(deleteUser);
    return (
        <div> 
          <Nav deleteUser={deleteUser} user={user}/>
         <Outlet/>
          <Footer/>
        </div>
    );
}

export default Layout;