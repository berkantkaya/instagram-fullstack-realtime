import React from 'react'
import { imageShow, videoShow } from '../../utils/mediaShow'
import Avatar from '../Avatar'

const MsgDisplay = ({user,msg,theme}) => {
    console.log('message',msg)
    return (
        <>
            <div className="chat_title">
              <Avatar src={user.avatar}/>
              <span>{user.username}</span>
            </div>

            {
                msg.text &&  <div className="chat_text" style={{fontSize:'13px',filter:theme ? 'invert(1)' : 'invert(0)'}}>{msg.text}</div>
            }
            {
                msg.media.map((item,index)=>(
                    <div key={index}>
                         {
                             item.url.match(/video/i) ? videoShow(item.url,theme) : imageShow(item.url,theme)
                         }
                    </div>
                ))
            }
           
                
            
            <div className="chat_time">
                 {new Date(msg.createdAt).toLocaleString()}
            </div>
        </>

    )
}

export default MsgDisplay
