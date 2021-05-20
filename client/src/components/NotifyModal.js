import moment from 'moment'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import noNotify from '../images/notify.png'
import Avatar from './Avatar'
import {isReadNotify, NOTIFY_TYPES,deleteAllNotifies} from '../redux/actions/notifyAction'


const NotifyModal = () => {
    const {auth,notify} =useSelector(state=>state)
    const dispatch=useDispatch()

    const handleIsRead=(msg)=>{
    dispatch(isReadNotify({msg,auth}))
    }

    const handleSound=()=>{
     dispatch({type:NOTIFY_TYPES.UPDATE_SOUND,payload:!notify.sound})
    }

    const handleDeleteAll=()=>{
        const newArr=notify.data.filter(item=>item.isRead===false)
        if(newArr.length===0) return dispatch(deleteAllNotifies(auth.token))

        if(window.confirm(`You have ${newArr.length} unread notices.Are you sure you want to delete all?`)){
            return dispatch(deleteAllNotifies(auth.token))
        }
    }

    return (
        <div style={{minWidth:'280px'}}>
            <div className="d-flex justify-content-between align-items-center px-3">
                <h3>Notification</h3>
                {
                   notify.sound ? <i className="fas fa-bell text-danger" style={{fontSize:'1.2rem',cursor:'pointer'}} onClick={handleSound}/> : <i className="fas fa-bell-slash text-danger" style={{fontSize:'1.2rem',cursor:'pointer'}} onClick={handleSound}/>
                }
            </div>
            <hr className="mt-0"/>
            {
                notify.data.length===0 && 
                <img src={noNotify} alt="" className="w-80 d-block mx-auto" style={{width:'220px'}}/>
            }
           <div style={{maxHeight:'calc(100vh-200px)',overflow:'auto',overflowX:'hidden',opacity:1}}>
               {
                notify.data.map((msg,index)=>(
                    <div key={index} className="px-2 mb-3">
                        <Link style={{textDecoration:'none'}} to={`${msg.url}`} className="d-flex align-items-center text-dark" onClick={()=>handleIsRead(msg)}>
                           <Avatar src={msg.user.avatar}/>
                           <div className="mx-1 flex-fill">
                               <div>
                                   <strong style={{marginRight:'5px'}}>{msg.user.username}</strong>
                                   <span style={{fontSize:'13px'}}>{msg.text}</span>
                               </div>

                               {
                               msg.content && <small>{msg.content.slice(0,20)}...</small>
                               }
                           </div>
                            <div style={{width:'25px',marginRight:'20px'}}>
                                {msg.image && <Avatar src={msg.image}/>}
                            </div>
                        </Link>
                           <small style={{fontSize:'10px'}} className=" d-flex justify-content-between px-2">
                               {moment(msg.createdAt).fromNow()}
                               {
                                   !msg.isRead && <i className="fas fa-circle text-primary " style={{marginRight:'6px'}}/>
                               }
                           </small>
                     </div> 
                ))
               }
           </div>
           <hr className="my-1"/>
           <div className="text-danger " style={{cursor:'pointer',textAlign:'right',marginRight:'7px'}} onClick={handleDeleteAll}>
               Delete All
           </div>

        </div>
    )
}

export default NotifyModal
