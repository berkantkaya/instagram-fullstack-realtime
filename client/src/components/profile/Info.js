import React, { useEffect, useState } from 'react'
import Avatar from '../Avatar'
import { getProfileUsers } from '../../redux/actions/profileAction'
import EditProfile from './EditProfile'
import FollowBtn from '../FollowBtn'
import Followers from './Followers'
import Following from './Following'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'

const Info = ({id,auth,profile,dispatch}) => {
    


    const [userData,setUserData]=useState([])
    const [onEdit,setOnEdit]=useState(false)

    const [showFollowers,setShowFollowers]=useState(false)
    const [showFollowing,setShowFollowing]=useState(false)

    useEffect(()=>{
        if(id===auth.user._id){
         setUserData([auth.user])
        }else{
          
           const newData=profile.users.filter(user=>user._id===id)
           setUserData(newData)
        }
    },[id,auth,dispatch,profile.users])


    useEffect(()=>{
     if(showFollowers || showFollowing || onEdit){
         dispatch({type:GLOBALTYPES.MODAL,payload:true})
     }else{
         dispatch({type:GLOBALTYPES.MODAL,payload:false})
     }
    },[showFollowers,showFollowing,onEdit,dispatch])

    return (
        <div className="info p-3">
            {
               userData.map(user=>(
                   <div className="info_container">
                   <span style={{borderBottom:'2px solid lightgrey',marginBottom:'6px',padding:'0 2px'}} className="yanyana ">
                   
                    <Avatar src={user.avatar} />
                    <h4 className="mx-2 text-uppercase">{user.username}</h4>
                    </span> 
                    <div className="p-2 mb-2 bg-ligth">
                            <button style={{backgroundColor:'lightgrey',borderRadius:'5px',fontWeight:'600',boxShadow:'2px 2px 10px black'}} className="m-2 text-danger border p-1"  onClick={()=>setShowFollowers(true)}>
                                  {user.followers.length} Followers
                              </button>
                               <button  style={{backgroundColor:'lightgrey',borderRadius:'5px',fontWeight:'600',boxShadow:'2px 2px 10px black'}}  className="m-2 text-danger  border p-1" onClick={()=>setShowFollowing(true)} >
                                   {user.following.length}    Following
                              </button>
                          </div>
                          <h6 className="text-capitalize">MERHABA {user.fullname} </h6>
                          <h6><strong className="text-danger">Phone:</strong> {user.mobile}</h6>
                          <p><strong className="text-danger">Address:</strong> {user.address}</p>
                          <h6><strong className="text-danger">Email:</strong> {user.email}</h6>
                           <a href={user.website} target="_blank" rel="noreferrer">
                               {user.website}
                           </a>
                           <p className="text-uppercase"><i class="fas fa-smile-beam"></i> {user.story}</p>

                           {
                               user._id===auth.user._id ? 
                               <button className="btn btn-danger  w-50" onClick={()=>setOnEdit(true)}>Edit Profile</button> : <FollowBtn user={user}/>
                           }
                          
                  
                          {
                              onEdit && <EditProfile setOnEdit={setOnEdit}/>
                          }
                          {
                              showFollowers && <Followers users={user.followers} setShowFollowers={setShowFollowers}/>
                          }

                          {
                              showFollowing && <Following users={user.following} setShowFollowing={setShowFollowing}/>
                          }
                            
                   </div>
               ))
            }
        </div>
    )
}

export default Info
