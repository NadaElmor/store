import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { useParams } from 'react-router-dom';
import { CartContext } from '../CartStoreProvider/CartStoreProvider';
import $ from 'jquery'

function ProductDetails(props) {

    const {id}=useParams();
    const specsificProduct=null;
    const [product, setproduct] = useState(specsificProduct);
    const {addToCart}=useContext(CartContext);
    async function getProductDetails() {
        try {
            const response = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`);
        console.log(response.data.data);
        setproduct(response.data.data);
        } catch (error) {
            console.log("error: " + error);
        }
    }
    async function addMyProduct(proId){
       await addToCart(proId);
       if(await addToCart(proId)){
            $("#successMsg").fadeIn(500,function(){
               setTimeout(() => {
                    $("#successMsg").fadeOut(500)
                }, 2000);
            });
            $("#addBtn").fadeOut(500);
            $("#removeBtn").fadeIn(500);
       }else{
        $("#failMsg").fadeIn(500,function(){
            setTimeout(() => {
                 $("#failMsg").fadeOut(500)
             }, 2000);
         })
       }
    }
    useEffect(function(){
        getProductDetails();
    },[]);
    console.log(specsificProduct);
    return <>
   {product? <div className="container p-5">
        <div className="row align-items-center">
            <div className="col-lg-4">
                <div className="item"><img src={product.imageCover} alt="img" className='img-thumbnail' /></div>
            </div>
            <div className="col-lg-8">
                <div className="item">
                    <div className="item-content">
                        <div className="item-inner">
                            <div className="item-title py-2"><h2>{product.title}</h2></div>
                            <div className="item-subtitle text-secondary py-2"><p>{product.description}</p></div>
                            <h4>{product.category.name}</h4>
                            <h4 className='text-success p-3 text-center '>{product.price} EGP</h4>
                           
                            <button id='addBtn' className=' btn bg-success text-white  w-100' onClick={function(){
                                addMyProduct(product.id);
                            }}>+ Add to Card</button>
                            <button id='removeBtn' className=' btn bg-danger text-white  w-100' style={{'display':'none'}} >- remove from card</button>
                            <div className="alert alert-success" id='successMsg' style={{'display':'none'}}>
                                Product has been added successfully
                            </div>
                            <div className="alert alert-danger" id='failMsg' style={{'display':'none'}}>
                                Product has not been added..
                            </div>
                        </div>
            
                </div>
            </div>

        </div>
    </div>
    </div>:<LoadingScreen/>}
    </>
}

export default ProductDetails;