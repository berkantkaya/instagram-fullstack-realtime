import React from 'react'

const Avatar = ({src}) => {
    return (
        <img className="avatar mb-1" style={{border:'1px',borderRadius:'50%',width:'50px',height:'40px',objectFit:'cover',filter:'invert(1)'}} alt="" src={src}/>
    )
}

export default Avatar
