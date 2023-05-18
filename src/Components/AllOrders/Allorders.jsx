import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

function Allorders({ user }) {
  const [orders, setOrders] = useState(null);
  async function getAllOrders() {
    try {
      const { data } = await axios.get(
        `https://route-ecommerce.onrender.com/api/v1/orders/user/${user.id}`
      );
      console.log(data);
      setOrders(data);
    } catch (error) {
      console.log("error", error);
    }
  }
  useEffect(function () {
    getAllOrders();
  }, []);
  //  console.log(user);
  return (
    <>
      {orders ? (
        <div>
          <div>
            <div className="container p-5">
              <h2 className="text-success">All Orders:</h2>
              <ul className="list-unstyled">
                {orders.map(function (order, indx) {
                  return (
                    <li key={indx} className="py-3">
                      <div>
                        <h3 className="p-3 text-warning">
                          Order number {indx + 1} :
                        </h3>
                        <p>
                          <span className="text-success px-3">
                            Total Price:{" "}
                          </span>{" "}
                          {order.totalOrderPrice}
                        </p>
                        <p>
                          <span className="text-success px-3">City: </span>
                          {order.shippingAddress.city}
                        </p>
                        <p>
                          <span className="text-success px-3">Phone: </span>
                          {order.shippingAddress.phone}
                        </p>
                        <p>
                          <span className="text-success px-3">
                            Payment Method :
                          </span>
                          {order.paymentMethodType}
                        </p>
                        <p>
                          <h5 className="text-success px-3">Products</h5>
                          {order.cartItems.map(function (item, i) {
                            return (
                              <div key={i} className="px-3">
                                <div className="row">
                                  <div className="col-md-3">
                                    <div className="item">
                                      {item.product.title} 
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <div className="item">
                                     Count: {item.count}
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <div className="item">
                                     Price: {item.price}
                                    </div>
                                  </div>
                                </div>
                                <hr />
                              </div>
                            );
                          })}
                        </p>
                      </div>
                      <hr />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}

export default Allorders;
