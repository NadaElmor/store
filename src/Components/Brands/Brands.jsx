import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Link } from 'react-router-dom';


function Brands(props) {
    const allBrands=null;
    const [brands,setBrands]=useState(allBrands);

    async function getBarnds() {
        try {
            const {data}=await axios.get("https://route-ecommerce.onrender.com/api/v1/brands");
            console.log(data.data);
             setBrands(data.data);
        } catch (error) {
            console.log("error: " + error);
        }
    }

    useEffect(function(){
        getBarnds();
    },[])
    return <>
        <div className="container p-5 ">
            <h2 className='py-3'>Brands</h2>
            <div className="row g-3">
                {brands?brands.map(function(brand,indx) {
                   return <Link className="col-lg-3 col-md-4" key={indx} to={`/brandProducts/${brand._id}`}>
                    <div className="card bg-success">
                        <div className="card-body">
                            <img src={brand.image} className="img-thumbnail" alt={brand.name} />
                            <div className="card-body">
                                <h5 className="card-title">{brand.name}</h5>
                              
                            </div>
                        </div>
                    </div>
                </Link>
                }):<LoadingScreen/>}
                
            </div>
        </div>
      
    
    </>
}

export default Brands;