import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { addUser,getConservations } from '../../redux/actions/messageAction'
import { getDataAPI } from '../../utils/fetchData'
import UserCard from '../UserCard'

const LeftSide = () => {
    const {auth,message}=useSelector(state=>state)
    const dispatch=useDispatch()
    const [search,setSearch]=useState('')
    const [searchUsers,setSearchUsers]=useState([])
    const history=useHistory()
    const {id} =useParams()
    const pageEnd=useRef()
    const [page,setPage]=useState(0)


    const handleSearch= async(e)=>{
        e.preventDefault()
        if(!search) return  setSearchUsers([]);
       
        try { 
           const res=await getDataAPI(`search?username=${search}`,auth.token)
           setSearchUsers(res.data.users)
          
       } catch (err) {
        dispatch({
            type:GLOBALTYPES.ALERT,payload:{error:err.response.data.msg}
        })
       }
    }

    const handleAddUser=(user)=>{
      setSearch('')
      setSearchUsers([])
      dispatch(addUser({user,message}))
      return history.push(`/message/${user._id}`)
    }

    useEffect(()=>{
     if(message.firstLoad) return ;
     dispatch(getConservations({auth}))
    },[dispatch,auth,message.firstLoad])

    //Load More
   useEffect(()=>{
    const observer=new IntersectionObserver(entries=>{
        if(entries[0].isIntersecting){
            setPage(p=>p + 1)
        }
    },{
        threshold:0.1
    })

    observer.observe(pageEnd.current)
  },[setPage])

  useEffect(()=>{
    if(message.resultUsers >= (page - 1) * 9 && page > 1){
        dispatch(getConservations({auth,page}))
    }
  },[message.resultUsers,page,auth,dispatch])

    return (
        <>
           <form className="message_header" onSubmit={handleSearch}>
               <input type="text" value={search} placeholder="Enter to Search..." onChange={e=>setSearch(e.target.value)}/>
               <button type="submit" style={{display:'none'}}>Search</button>
           </form>

           <div className="message_chat_list">

               {
                   searchUsers.length !== 0 ?  <>
                   {
                      searchUsers.map(user=>(
                          <div key={user._id} className="message_user" onClick={()=>handleAddUser(user)}>
                            <UserCard user={user}/>
                          </div>
                      )) 
                   }
                   
               </> : 
               <>
                {
                    message.users.map(user=>(
                        <div key={user._id} className="message_user" onClick={()=>handleAddUser(user)}>
                          <UserCard user={user} msg={true}>
                              <i className="fas fa-circle "/>
                          </UserCard>
                        </div>
                    )) 
                }
               </>
               }
               <button ref={pageEnd} style={{opacity:0}}>Load More</button>
           </div>
        </>
    )
}

export default LeftSide
