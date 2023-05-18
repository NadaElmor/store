import React, { useContext, useEffect } from "react";
import { CartContext } from "../CartStoreProvider/CartStoreProvider";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import $ from "jquery";
import { useNavigate } from "react-router-dom";

function Cart(props) {
  const {getUserCart,
    products,
    numOfProducts,
    totalPrice,
    upadateProductCount,
    removeProduct,
    clearUserCart,
  } = useContext(CartContext);
  const navigate=useNavigate();
  console.log(products);
  useEffect(function(){
      getUserCart();
  },[])
  return (
    <>
      <div
       
        className="d-flex justify-content-center align-items-center p-3"
      >
        <p  style={{ display: "none" }}
        id="cart-msg" className="bg-danger p-3 rounded-1 text-white">
          No Products in the cart
        </p>
      
      </div>
      {products ? (
        <div className="container p-5">
          <div className="d-flex justify-content-between align-items-center">
            <div className="left">
              <h2>Your Cart</h2>
              <span className="p-3 text-secondary">
                ({numOfProducts} items)
              </span>
              <span className="p-3 text-danger">
                Total Price : {totalPrice}
              </span>
            </div>
            <div className="right">
            <button className=" btn btn-success mx-2" onClick={function(){
                navigate('/payment')
            }}>
                Cash order
              </button>
              <button className=" btn btn-danger" onClick={clearUserCart}>
                Clear Cart
              </button>
             
            </div>
          </div>
          <div className="row p-3">
            {products.map(function (pro, indx) {
              return (
                <div className="col-md-3" key={indx}>
                  <div className="card">
                    <img
                      src={pro.product.imageCover}
                      alt={pro.product.title}
                      className="img-fluid"
                    />
                    <div className="item p-3">
                      <h3>{pro.product.title}</h3>
                      <h3 className="text-success">Price:{pro.price}</h3>
                    </div>

                    <div className="count p-3 d-flex justify-content-center align-items-center">
                      <i
                        className="px-2 fa-2x text-danger fa-solid fa-square-plus plus"
                        style={{ cursor: "pointer" }}
                        onClick={async function () {
                          let c = pro.count;
                          $(`#count${indx}`).html(++c);
                          await upadateProductCount(pro.product._id, c);
                        }}
                      ></i>
                      <span id={`count${indx}`}>{pro.count}</span>

                      <i
                        className="px-2 fa-2x text-danger fa-solid fa-square-minus minus"
                        style={{ cursor: "pointer" }}
                        onClick={async function () {
                          let c = pro.count;
                          if (c > 0) {
                            $(`#count${indx}`).html(--c);
                            await upadateProductCount(pro.product._id, c);
                          }
                        }}
                      ></i>
                    </div>
                    <button
                      id={`deletebtn${indx}`}
                      className="btn btn-danger m-lg-2"
                      onClick={function () {
                        removeProduct(pro.product._id);
                      }}
                    >
                      remove from cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}

export default Cart;
