import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { useParams } from "react-router-dom";

export default function BrandProducts() {
  const { id } = useParams();

  const [products, setproducts] = useState(null);

  async function getBrandProducts() {
    try {
      const { data } = await axios.get(
        `https://route-ecommerce.onrender.com/api/v1/products`,
        {
          params: {
            brand: id,
          },
        }
      );
    //  console.log(data.data);
      setproducts(data.data);
     // console.log(products);
    } catch (error) {
      console.log(" error: " + error);
    }
  }
  useEffect(function () {
    getBrandProducts();
   
  }, []);

  return  <>
  {products ? (
    <div className="container p-5">
      <div className="row g-3">
      { products.map(function (product, indx) {
          return (
            <div className="col-lg-4 col-md-6 col-sm-12" key={indx}>
              <div className="card">
                <div className="card-body">
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-100"
                  />
                  <p className="card-title">{product.title}</p>
                  <h5 className="card-text text-success">
                    {product.price}
                  </h5>
                </div>
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
  
  

}
