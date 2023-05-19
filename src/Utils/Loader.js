import React from 'react';
import Loader from "react-js-loader";

const LoaderComponent = () => {
  return (
    <div className="loaderDiv">
    <Loader type="box-rectangular" bgColor={"#221FFF"} color={'#2D5794'} size={75} />      
    </div>
  )
}

export default LoaderComponent