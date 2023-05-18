import React from 'react';


import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function SliderHome(props) {
    
  const settings = {
    dots: true,
    infinite: true,
    speed: 500
  };
    return <>
    <div className="App p-5 container">
      <Slider {...settings}>
        <div>
        <img style={{"height":"300px"}} className='w-100 img-thumbnail' src={require('../../assets/slider-image-1.jpeg')} alt="fresh cart" />
        </div>
        <div>
        <img style={{"height":"300px"}} className='w-100 img-thumbnail' src={require('../../assets/slider-image-2.jpeg')} alt="fresh cart" />

        </div>
        <div>
        <img style={{"height":"300px"}} className='w-100 img-thumbnail' src={require('../../assets/slider-image-3.jpeg')} alt="fresh cart" />

        </div>
        <div>
        <img style={{"height":"300px"}} className='w-100 img-thumbnail' src={require('../../assets/grocery-banner-2.jpeg')} alt="fresh cart" />
        </div>
        <div>
        <img style={{"height":"300px"}} className='w-100 img-thumbnail' src={require('../../assets/slider-2.jpeg')} alt="fresh cart" />
        </div>
      </Slider>
    </div>
    </>
}

export default SliderHome;