import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderHome from "../SliderHome/SliderHome";
import { CartContext } from "../CartStoreProvider/CartStoreProvider";
import $ from "jquery";


function Home(props) {
  const allProducts = null;
  const [products, setProducts] = useState(allProducts);
  const { addToCart,upadateProductCount,removeProduct } = useContext(CartContext);

function addANDremove(BtnIndx){
  $(`#addbtn${BtnIndx}`).fadeOut(500);
  $(`#deletebtn${BtnIndx}`).fadeIn(500);
}
 async function addMyProduct(proId,BtnIndx) {
  addANDremove(BtnIndx);
  $(`#cnt${BtnIndx}`).fadeIn(1000);
   await addToCart(proId);
    
  }

  
  async function getData() {
    try {
      const { data } = await axios.get(
        "https://route-ecommerce.onrender.com/api/v1/products"
      );
      //  console.log(data.data);
      setProducts(data.data);
    } catch (error) {
      console.log(" error: " + error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <SliderHome />
      <div className="container p-5">
        <div className="row g-3">
          {products ? (
            products.map(function (product, indx) {
              return (
                <div className="col-md-4 col-lg-2" key={indx}>
                  <div className="card">
                    <Link to={`/productDetails/${product.id}`}>
                      <div className="cardpro p-2">
                        <img
                          src={product.imageCover}
                          className="img-thumbnail"
                          alt={product.category.name}
                        />
                        <div className="card-body">
                          <h6 className="text-success">
                            {product.category.name}
                          </h6>
                          <h5 className="card-title">
                            {product.title.slice(
                              product.title.indexOf(" "),
                              30
                            )}
                          </h5>
                          <p className="card-text">{product.price} EGP</p>

                         
                        </div>
                      </div>
                    </Link>
                    <button id={`addbtn${indx}`}
                      className="btn btn-success  m-lg-2"
                      onClick={function () {
                        addMyProduct(product.id,indx);
                      }}
                    >
                      add to card
                    </button>
                    <button id={`deletebtn${indx}`} className="btn btn-danger m-lg-2" style={{"display":"none"}} onClick={async function(){
                      $(`#addbtn${indx}`).fadeIn(500);
                      $(`#deletebtn${indx}`).fadeOut(500);
                     await removeProduct(product.id);
                    }}>remove from cart</button>
                    <div id={`cnt${indx}`}  style={{display:'none'}} className="p-3">
                      <span>need more?</span>
                      <input id={`no${indx}`} type="number" placeholder="number" className="form-control "  min={1} onChange={
                      async  function(){
                        
                        if($(`#cnt${indx}`).val()>=1){
                          addANDremove(indx);
                        }
                         
                          $(`#msg${indx}`).fadeIn(1000,function(){
                            setTimeout(() => {
                              $(`#msg${indx}`).fadeOut(1000)
                            }, 2000);
                          });
                        await  upadateProductCount(product.id,$(`#no${indx}`).val());
                        }
                      }/>
                      <div id={`msg${indx}`} style={{display:'none'}}>
                        <p className="text-success"> added successfully</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <LoadingScreen />
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
