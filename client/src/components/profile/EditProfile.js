import React, { useEffect, useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { updateProfileUser } from '../../redux/actions/profileAction'
import { checkImage } from '../../utils/imageUpload'

const EditProfile = ({setOnEdit}) => {
    const initState={
        fullname:'',mobile:'',address:'',website:'',story:'',gender:''
    }
    const [userData,setUserData]=useState(initState)
    const {fullname,mobile,website,story,address,gender}=userData

    const [avatar,setAvatar]=useState('')
     const {auth,theme}=useSelector(state=>state)
     const dispatch=useDispatch()

     useEffect(()=>{
        setUserData(auth.user)
     },[auth.user])

      const changeAvatar=(e)=>{
       const file=e.target.files[0]
       const err=checkImage(file)
       if(err) return dispatch({type:GLOBALTYPES.ALERT,payload:{error:err}})
       setAvatar(file)
      }

      const handleInput=e=>{
          const {name,value}=e.target
          setUserData({...userData,[name]:value})
      }
      
      const handleSubmit=e=>{
        e.preventDefault();
        dispatch(updateProfileUser({userData,avatar,auth}))
    }

    return (
        <div className="edit_profile">
            <button className="btn btn-danger btn_close" onClick={()=>setOnEdit(false)}>
                 Close
            </button>

            <form onSubmit={handleSubmit}>
                <div className="info_avatar">
                   <img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} style={{
                       filter : theme ? 'invert(1)' : 'invert(0)'
                   }} alt=""/>
                   <span>
                       <i className="fas fa-camera"/>
                       <p>Change</p>
                       <input type="file" name="file" id="file_up" accept="image/*" onChange={changeAvatar} />
                   </span>
                </div>

                 <div className="form-group">
                    <label htmlFor="fullname">Full Name</label>
                    <div className="position-relative">
                        <input type="text" className="form-control" id="fullname"
                        name="fullname" value={fullname} onChange={handleInput}/>
                        <small className=" text-danger position-absolute" style={{top:'50%',right:'5px',transform:'translateY(-50%)'}}>
                            {fullname.length}/25
                        </small>
                    </div>
                 </div>

                 <div className="form_group">
                 <label htmlFor="mobile">Mobile</label>
                    
                        <input type="text" className="form-control" id="mobile"
                        name="mobile" value={mobile} onChange={handleInput}/>
                 </div>

                 <div className="form_group">
                 <label htmlFor="address">Address</label>
                    
                        <input type="text" className="form-control" id="address"
                        name="address" value={address} onChange={handleInput}/>
                 </div>

                 <div className="form_group">
                 <label htmlFor="website">Website</label>
                    
                        <input type="text" className="form-control" id="website"
                        name="website" value={website} onChange={handleInput}/>
                 </div>

                 <div className="form_group">
                 <label htmlFor="story">Story</label>
                    
                        <textarea cols="30" rows="4" className="form-control" id="story"
                        name="story" value={story} onChange={handleInput}/>
                         <small className="text-danger d-block  text-right mb-2">
                            {story.length}/200
                        </small>
                 </div>

                 <label htmlFor="gender">Gender</label>
                 <div className="input-group-prepend px-0 mb-4 ">
                 <select name="gender" id="gender"  class="form-select form-select-sm" aria-label=".form-select-sm example" onChange={handleInput} value={gender}>

                       <option value="male">Male</option>
                        <option value="female">Female</option>
                      <option value="other">Other</option>
                </select>
                 </div>

                 <button className="btn btn-dark w-100" type="submit">Save</button>
            </form>
        </div>
    )
}

export default EditProfile
