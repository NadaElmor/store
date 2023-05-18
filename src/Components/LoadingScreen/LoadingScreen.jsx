import React from 'react';

function LoadingScreen(props) {
    return (
        <div className='vh-100 text-center bg-success bg-success bg-opacity-25 d-flex justify-content-center align-items-center'>
            <div className="loading">
   <i className='fa-solid fa-spin fa-spinner fa-5x text-success'></i>
            </div>
        </div>
    );
}

export default LoadingScreen;