import axios from 'axios';
import { Button } from 'bootstrap/dist/js/bootstrap.bundle';
import { useFormik } from 'formik';
import React from 'react';
import { Navigate, useNavigate, useSubmit } from 'react-router-dom';
import $ from 'jquery'
function Login({crruser,getUserData}) {

    let user={
       email:'',password:''
    }
   async function signin(user){
      const res= await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/signin",user);
      if(res.data.message=="success"){
       
        localStorage.setItem("user",res.data.token);
      
     //   console.log(res.data.token);
     //   console.log(crruser);
      }
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
                    await signin(values);
                    $(" .successMsg").fadeIn(500,function(){
                        setTimeout(function(){
                            navigate('/home');
                            getUserData();
                            $(".btn").removeAttr("disabled");
                        },3000)
                    });
                
                    
                } catch (error) {
                    console.log(error.response.data.message);
                    $(".errMsg").fadeIn(500,function(){
                        setTimeout(function(){$(".errMsg").fadeOut(500)
                        $(".btn").removeAttr("disabled");
                    },1000);
                    });
                }
            },
            validate:function(){
                const errors={};
                
                if(!formik.values.email.includes("@")&&!formik.values.email.includes(".com")){
                    errors.email='Invalid email address';
                }
                if(formik.values.password.length<6){
                    errors.password='Password must be at least 6 characters';
                }
               
                return errors
            }
        }
    )
    return (
        <div>
            <div className="container p-5">
           <div className='errMsg alert alert-danger' style={{'display':'none'}}>login failed .. incorrect email or password !</div>
           <div className='successMsg alert alert-success' style={{'display':'none'}}>Welcome!!!</div>
            <h2 className='py-2'>Login Now:</h2>
            <form className='row g-4 container' onSubmit={formik.handleSubmit}>
                
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" name="email" placeholder="email" className='form-control' />
                {formik.errors.email&&formik.touched.email?  <div className='alert alert-danger'>{formik.errors.email}</div>:''}
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" name="password" placeholder="password" className='form-control' />
                {formik.errors.password&&formik.touched.password?  <div className='alert alert-danger'>{formik.errors.password}</div>:''}
                
                {formik.errors.phone&&formik.touched.phone?  <div className='alert alert-danger'>{formik.errors.phone}</div>:''}
                <button className='btn bg-success text-white col-lg-1 ms-auto' type='submit'>Login</button>
            </form>
            </div>
        </div>
    );
}

export default Login;