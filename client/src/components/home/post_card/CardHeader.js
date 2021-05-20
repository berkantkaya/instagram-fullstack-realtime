import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import Avatar from '../../Avatar'
import moment from 'moment'
import { useSelector,useDispatch } from 'react-redux'
import {GLOBALTYPES} from '../../../redux/actions/globalTypes'
import { deletePost } from '../../../redux/actions/postAction'
import { BASE_URL } from '../../../utils/config'

const CardHeader = ({post}) => {
    const {auth,socket} =useSelector(state=>state)
    const dispatch=useDispatch()
    const history=useHistory()

    const handleEditPost =()=>{
        dispatch({type:GLOBALTYPES.STATUS,payload:{...post,onEdit:true}})
    }

    const handleDeletePost=()=>{
        if(window.confirm("Are you sure want to delete this post?")){
            dispatch(deletePost({post,auth,socket}))
            return history.push("/")
        }
        
    }

    const handleCopyLink=()=>{
       navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`)
    }

    return (
        <div className="card_header">
            <div className="d-flex">
              <Avatar src={post.user.avatar}/>
               <div className="card_name">
                <h6 className="m-0">
                    <Link style={{textDecoration:'none'}} to={`${post.user._id}`} className="text-dark">
                        {post.user.username}
                    </Link>
                </h6>
                <small style={{fontSize:'10px'}} className="text-muted">
                    {moment(post.createdAt).fromNow()}
                </small>
               </div>
            </div>
           
           
            <div className="dropdown">
  <span className="material-icons "  id="moreLink" data-bs-toggle="dropdown" aria-expanded="false">
  more_horiz
  </span>
  <ul className="dropdown-menu" aria-labelledby="moreLink">
  {
    auth.user._id === post.user._id  &&  <>
       <div className="dropdown-item" onClick={handleEditPost} >
           <span className="material-icons">create</span> Edit Post
       </div>

       <div className="dropdown-item" onClick={handleDeletePost}>
           <span className="material-icons">delete_outline</span> Remove Post
       </div>

       
    </>
}

         <div className="dropdown-item" onClick={handleCopyLink}>
           <span className="material-icons">content_copy</span> Copy Link
       </div>
    
  </ul>
</div>
           
        </div>
    )
}

export default CardHeader






