import "./App.css";
import { Navigate, RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Logout from "./Components/Logout/Logout";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Home from "./Components/Home/Home";
import err from "./assets/error.svg";
import Brands from "./Components/Brands/Brands";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import BrandProducts from "./Components/BrandProducts/BrandProducts";
import Cart from "./Components/Cart/Cart";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import Profile from "./Components/Profile/Profile";
import CartStoreProvider from "./Components/CartStoreProvider/CartStoreProvider";
import Payment from "./Components/Payment/Payment";
import Allorders from "./Components/AllOrders/Allorders";

function App() {
  const [crrUser, setCrrUser] = useState(null);
  function getUserData() {
    if(localStorage.getItem("user")!=null){
      const user = jwtDecode(localStorage.getItem("user"));
      setCrrUser(user);
    }
   
  }
  function deleteUser() {
    setCrrUser(null);
  }
  function ProtectedRoute({children}) {
    if(localStorage.getItem("user")==null){
      return <Navigate to='/login'/>
    }else{
      return children;
    }
  }
  function reload() {
   
    if(localStorage.getItem("user")!=null&&crrUser==null){
      getUserData();
    }
    console.log("hello reloading...");
  }
  useEffect(function(){
     reload();
   
    getUserData();
  
  },[])
  const router = createHashRouter([
    {
      path: "",
      element: <Layout deleteUser={deleteUser} user={crrUser} />,
      children: [
        { path: "/home", element: <CartStoreProvider><Home /></CartStoreProvider> },
        { path: "", element:<CartStoreProvider><Home /></CartStoreProvider> },
        { path: "brands", element: <Brands /> },
        { path: "profile", element: <ProtectedRoute><Profile crrUser={crrUser} /></ProtectedRoute> },
        { path: "cart", element:<ProtectedRoute> <CartStoreProvider><Cart /></CartStoreProvider></ProtectedRoute> },
        { path: "payment", element:<ProtectedRoute> <CartStoreProvider><Payment /></CartStoreProvider></ProtectedRoute> },
        { path: "allorders", element:<ProtectedRoute> <CartStoreProvider><Allorders user={crrUser} /></CartStoreProvider></ProtectedRoute> },
        { path: "productDetails/:id", element: <CartStoreProvider><ProductDetails /></CartStoreProvider> },
        { path: "brandProducts/:id", element: <BrandProducts /> },
        { path: "logout", element: <ProtectedRoute><Logout /></ProtectedRoute> },
        {
          path: "login",
          element: <Login crruser={crrUser} getUserData={getUserData} />,
        },
        { path: "register", element: <Register /> },
        {
          path: "*",
          element: (
            <>
              <div className="err vh-75 text-center">
                <img src={err} alt="error" />
              </div>
            </>
          ),
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
