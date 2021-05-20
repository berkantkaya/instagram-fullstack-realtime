import React from 'react'
import { useSelector } from 'react-redux'

const LikeButton = ({isLike,handleLike,handleUnLike}) => {
    const {theme}=useSelector(state=>state)
    return (
        <>
          {
             isLike ? <span className="material-icons" style={{color:'red',filter:theme ? 'invert(1)' : 'invert(0)'}} onClick={handleUnLike}>
             favorite
     </span> : 
             <span className="material-icons" style={{color:'gray',filter:theme ? 'invert(1)' : 'invert(0)'}} onClick={handleLike}>
             favorite
</span>
             
          }  
        </>
    )
}

export default LikeButton


