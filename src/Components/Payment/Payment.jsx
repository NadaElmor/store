import axios from "axios";
import React, { useContext } from "react";
import $ from "jquery";
import { CartContext } from "../CartStoreProvider/CartStoreProvider";
import { useNavigate } from "react-router-dom";

function Payment(props) {
    const {CartID,clearData}=useContext(CartContext);
    const navigate=useNavigate();
  async function crateCahOrder() {
    const info = {
      shippingAddress: {
        details: $(".details").val(),
        phone: $(".phone").val(),
        city: $(".city").val(),
      },
    };
 //   console.log(info);
    if (info.shippingAddress.phone.match(/^01[0125][0-9]{8}$/)) {
      try {
        const { data } = await axios.post(
          `https://route-ecommerce.onrender.com/api/v1/orders/${CartID}`,
          info,
          {
            headers: {
              token: localStorage.getItem("user"),
            },
          }
        );
        if(data.status === "success"){
                clearData();
                navigate('/allorders')
        }
        console.log(data);
      } catch (error) {
        console.log("error: " + error);
        $('#errMsgAdding').fadeIn(1000,function(){
            setTimeout(() => {
              $('#errMsgAdding').fadeOut(2000);
              navigate('/home');
            }, 2000);
          });
        
      }
    }else {
        console.log("invalid password");
        $('#errMsg').fadeIn(1000,function(){
          setTimeout(() => {
            $('#errMsg').fadeOut(2000);
          }, 2000);
        });
    }
  }

  return (
    <>
    
      <div className="container p-5">
        <form>
          <h2 className="text-success py-3">Shipping informatin:</h2>
          <input
            type="text"
            placeholder="Enter your address"
            className="details form-control my-2"
            required
          />
          <input
            type="text"
            placeholder="Enter your number"
            className="phone form-control my-2"
            required
          />
          <input
            type="text"
            placeholder="Enter your city"
            className="city form-control my-2"
            required
          />
          <div id="errMsg" className="alert alert-danger" style={{'display':'none'}}>Enter correct phone number</div>
          <button
            className="btn btn-success"
            type="button"
            onClick={function () {
              console.log("hello!");
              crateCahOrder();
            }}
          >
            Place Order
          </button>
          <div id="errMsgAdding" className="alert alert-danger" style={{'display':'none'}}>add products to the cart first!!</div>
        </form>
      </div>
    </>
  );
}

export default Payment;
