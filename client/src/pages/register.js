import React, { useEffect, useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useHistory,Link} from 'react-router-dom'
import {register} from '../redux/actions/authAction'

const Register = () => {
    const {auth,alert}=useSelector(state=>state)
    const history=useHistory()
    const dispatch=useDispatch()

    const initialState={fullname:'',username:'',email:'',cf_password:'',password:'',gender:'male'}
    const [userData,setUserData]=useState(initialState)
    const {fullname,username,email,password,cf_password}=userData;

    const [typePass,setTypePass]=useState(false)
    const [typecfPass,setTypecfPass]=useState(false)

    useEffect(()=>{
     if(auth.token) history.push("/")
    },[auth.token,history])

    
   

    const handleChangeInput=(e)=>{
      const {name,value}=e.target
      setUserData({...userData,[name]:value})
    }
    const handleSubmit=(e)=>{
      e.preventDefault();
      dispatch(register(userData))
    }

    return (
        <div className="auth_page">
            <form onSubmit={handleSubmit}>
                <h3 className="text-uppercase text-center mb-4"><i class="fas fa-bezier-curve"></i> BK-Media</h3>
     <div className="mb-3">
    <input type="text" placeholder="Fullname" className="form-control" name="fullname" id="exampleInputEmail1" onChange={handleChangeInput} value={fullname} style={{background: `${alert.fullname ? '#fd2d6a14' : ''}`}} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text text-danger">{alert.fullname ? alert.fullname : ''}</div>
  </div>

  <div className="mb-3">
    <input type="text" placeholder="Username" className="form-control" name="username" id="exampleInputEmail1" onChange={handleChangeInput} value={username.toLowerCase().replace(/ /g,'')} style={{background: `${alert.username ? '#fd2d6a14' : ''}`}}aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text text-danger">{alert.username ? alert.username : ''}</div>
  </div>

  <div className="mb-3">
   
    <input type="email" placeholder="Email address" className="form-control" name="email" id="exampleInputEmail1" onChange={handleChangeInput} value={email} style={{background: `${alert.email ? '#fd2d6a14' : ''}`}} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text text-danger">{alert.email ? alert.email : ''}</div>
  </div>

  <div className="mb-3">
     <div className="pass">
    <input type={typePass? "text" : "password"} placeholder="Password"  className="form-control" id="exampleInputPassword1" name="password" onChange={handleChangeInput} style={{background: `${alert.password ? '#fd2d6a14' : ''}`}} value={password}/>
    <small onClick={()=>setTypePass(!typePass)}>
      {typePass ? 'Hide' : 'Show'}
      </small>
      <div id="emailHelp" className="form-text text-danger">{alert.password ? alert.password : ''}</div>
    </div></div>
    

  <div className="mb-3">
    <div className="pass">
    <input type={typecfPass? "text" : "password"} placeholder="Confirm Password"  className="form-control" id="exampleInputPassword1" name="cf_password" onChange={handleChangeInput} style={{background: `${alert.cf_password ? '#fd2d6a14' : ''}`}} value={cf_password}/>
    <small onClick={()=>setTypecfPass(!typecfPass)}>
      {typecfPass ? 'Hide' : 'Show'}
      </small>
    </div><div id="emailHelp" className="form-text text-danger">{alert.cf_password ? alert.cf_password : ''}</div>
     </div>

  
  <div className="d-flex justify-content-between mx-0 mb-2 text-dark ">
    <label className="d-flex align-items-center" htmlFor="male">
        Male: <input  type="radio" id="male" name="gender" value="male" defaultChecked onChange={handleChangeInput}/>
    </label>
    <label className="d-flex align-items-center" htmlFor="Female">
        Female:<input type="radio" id="Female" name="gender" value="Female"  onChange={handleChangeInput}/>
    </label>
    <label className="d-flex align-items-center" htmlFor="other">
        Other:<input type="radio" id="other" name="gender" value="other"  onChange={handleChangeInput}/>
    </label>
  </div>

  <button type="submit" className="btn btn-dark w-100">Register</button>
   <p className="my-2">
       You already have a an account? <Link to="/login" style={{color:'crimson',textDecoration:'none'}}>Login Now</Link>
   </p>
</form>
            
        </div>
    )
}

export default Register
