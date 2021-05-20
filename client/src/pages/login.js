import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import {login} from '../redux/actions/authAction'
import {useDispatch,useSelector} from 'react-redux'

const Login = () => {
    const initialState={email:'',password:''}
    const [userData,setUserData]=useState(initialState)
    const {email,password}=userData;
   const {auth} =useSelector(state=>state)
    const [typePass,setTypePass]=useState(false)
   
     const dispatch=useDispatch()
     const history=useHistory();

     useEffect(()=>{
      if(auth.token) history.push("/")
     },[auth.token,history])

    const handleChangeInput=(e)=>{
      const {name,value}=e.target
      setUserData({...userData,[name]:value})
    }
    const handleSubmit=(e)=>{
      e.preventDefault();
      dispatch(login(userData))
    }

    return (
        <div className="auth_page">
            <form onSubmit={handleSubmit}>
                <h3 className="text-uppercase text-center mb-4"><i class="fas fa-bezier-curve"></i> BK-Media</h3>
  <div className="mb-3">
   
    <input type="email" placeholder="Email address" className="form-control" name="email" id="exampleInputEmail1" onChange={handleChangeInput} value={email} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
     <div className="pass">
    <input type={typePass? "text" : "password"} placeholder="Password"  className="form-control" id="exampleInputPassword1" name="password" onChange={handleChangeInput} value={password}/>
    <small onClick={()=>setTypePass(!typePass)}>
      {typePass ? 'Hide' : 'Show'}
      </small>
    </div>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button disabled={email && password ? false : true} type="submit" className="btn btn-dark w-100">Login</button>
   <p className="my-2">
       You don't have a an account? <Link to="/register" style={{color:'crimson',textDecoration:'none'}}>Register Now</Link>
   </p>
</form>
            
        </div>
    )
}

export default Login
