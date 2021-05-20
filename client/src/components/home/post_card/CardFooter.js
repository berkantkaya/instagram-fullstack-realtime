import React, { useEffect, useState } from 'react'
import { Children } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { likePost, savePost, unLikePost, unSavePost } from '../../../redux/actions/postAction'
import { BASE_URL } from '../../../utils/config'
import LikeButton from '../../LikeButton'
import ShareModal from '../../ShareModal'
const CardFooter = ({post}) => {
    const [isLike,setIsLike]=useState(false)
    const [loadLike,setLoadLike]=useState(false)

    const [isShare,setIsShare]=useState(false)
    const [saved,setSaved]=useState(false)

    

    const dispatch=useDispatch()
    const {auth,theme,socket}=useSelector(state=>state)


        useEffect(()=>{
            if(post.likes.find(like=>like._id===auth.user._id)){
                setIsLike(true)
            }else{
                setIsLike(false)
            }
        },[post.likes,auth.user._id])

      const handleLike = async()=>{
          if(loadLike) return;
         
          setLoadLike(true)
          await dispatch(likePost({post,auth,socket}))
          setLoadLike(false)

      }
      const handleUnLike = async()=>{
        if(loadLike) return;
          
          setLoadLike(true)
          await dispatch(unLikePost({post,auth,socket}))
          setLoadLike(false)
      }

       useEffect(()=>{
         if(auth.user.saved.find(id=>id===post._id)){
           setSaved(true)
         }else{
             setSaved(false)
         }
     },[auth.user.saved,post._id])

    return (
        <div className="card_footer">
            <div className="card_icon_menu">
                 <div>
                     <LikeButton isLike={isLike} 
                     handleLike={handleLike}
                     handleUnLike={handleUnLike}/>

                     <Link to={`/post/${post._id}`} className="text-dark">
                     <i className="far fa-comment" />
                     </Link>

                     <i className="fas fa-paper-plane" onClick={()=>setIsShare(!isShare)}></i>

                 </div>
                 {
                 
                 saved ? <i className="fas fa-bookmark text-info" onClick={()=> dispatch(unSavePost({post,auth}))} /> : <i className="far fa-bookmark" onClick={()=> dispatch(savePost({post,auth}))}/>
                 }

                
                
            </div>
               
               <div className="d-flex justify-content-between">
                  <h6 style={{padding:'0 25px',cursor:'pointer'}}>{post.likes.length} likes</h6>
                  <h6 style={{padding:'0 25px',cursor:'pointer'}}>{post.comments.length} comments</h6>
               </div>

               {
                   isShare && <ShareModal url={`${BASE_URL}/post/${post._id}`} theme={theme}/>
               }
        </div>
    )
}

export default CardFooter
