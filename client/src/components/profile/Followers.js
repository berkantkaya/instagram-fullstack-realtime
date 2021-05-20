import React from 'react'
import { useSelector } from 'react-redux'
import FollowBtn from '../FollowBtn'
import UserCard from '../UserCard'

const Followers = ({users,setShowFollowers}) => {
    const {auth} = useSelector(state => state)
    return (
        <div className="follow">
            <div className="follow_box">
                <h5 className="text-center">Followers</h5>
                <hr/>
                {
                 users.map(user=>(
                     <UserCard key={user._id} user={user} setShowFollowers={setShowFollowers}>
                        {
                            auth.user._id !== user._id  && <FollowBtn user={user}/>
                         }
                     </UserCard>
                 ))
                }

               <div className="close" onClick={()=>setShowFollowers(false)}>&times;</div>

            </div>
        </div>
    )
}

export default Followers
