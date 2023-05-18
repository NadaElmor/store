import axios from 'axios';
import { Button } from 'bootstrap/dist/js/bootstrap.bundle';
import { useFormik } from 'formik';
import React from 'react';
import { Navigate, useNavigate, useSubmit } from 'react-router-dom';
import $ from 'jquery'
function Register(props) {

    let user={
        name:'',email:'',password:'',rePassword:'',phone:''
    }
   async function register(user){
      const res= await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/signup",user);
      console.log(res);
    }
    const navigate=useNavigate();
    let formik=useFormik(
        {
            initialValues:user,
            onSubmit:async function(values){
                console.log(values);
                try {
                    $(".btn").attr("disabled","true");
                    await register(values);
                    $(" .successMsg").fadeIn(500,function(){
                        setTimeout(function(){ navigate('/login');},2000);
                    });
                  
                    
                } catch (error) {
                    console.log(error.response.data.message);
                    $(".errMsg").fadeIn(500,function(){
                        setTimeout(function(){$(".errMsg").fadeOut(500);
                        $(".btn").removeAttr("disabled");},3000);
                    });
                }
            },
            validate:function(){
                const errors={};
                
                if(!formik.values.name.match(/^[A-Za-z]+/)){
                    errors.name='name must contain only alphabets and numbers';
                }
                if(!formik.values.email.includes("@")&&!formik.values.email.includes(".com")){
                    errors.email='Invalid email address';
                }
                if(formik.values.password.length<6){
                    errors.password='Password must be at least 6 characters';
                }
                if(formik.values.password!==formik.values.rePassword){
                    errors.rePassword='Passwords do not match';
                }
                if(!formik.values.phone.match(/^01[0125][0-9]{8}$/)){
                    errors.phone='Invalid phone number';
                }

            
                
                return errors
            }
        }
    )
    return (
        <div>
            <div className="container p-5">
           <div className='errMsg alert alert-danger' style={{'display':'none'}}>authentication failed .. account already exists!!</div>
           <div className='successMsg alert alert-success' style={{'display':'none'}}>register has been done successfully!</div>
            <h2 className='py-2'>Register Now:</h2>
            <form className='row g-4 container' onSubmit={formik.handleSubmit}>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} type="text" name="name" placeholder="name" className='form-control'  />
                {formik.errors.name&&formik.touched.name?  <div className='alert alert-danger'>{formik.errors.name}</div>:''}
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" name="email" placeholder="email" className='form-control' />
                {formik.errors.email&&formik.touched.email?  <div className='alert alert-danger'>{formik.errors.email}</div>:''}
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" name="password" placeholder="password" className='form-control' />
                {formik.errors.password&&formik.touched.password?  <div className='alert alert-danger'>{formik.errors.password}</div>:''}
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} type="password" name="rePassword" placeholder="confirm password" className='form-control' />
                {formik.errors.rePassword&&formik.touched.rePassword?  <div className='alert alert-danger'>{formik.errors.rePassword}</div>:''}
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="text" name="phone" placeholder="number" className='form-control' />
                {formik.errors.phone&&formik.touched.phone?  <div className='alert alert-danger'>{formik.errors.phone}</div>:''}
                <button className='btn bg-success text-white col-lg-1 ms-auto' type='submit'>Register</button>
            </form>
            </div>
        </div>
    );
}

export default Register;