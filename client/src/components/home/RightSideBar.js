import React from 'react'
import UserCard from '../UserCard'
import FollowBtn from '../FollowBtn'
import { useDispatch, useSelector } from 'react-redux'
import LoadIcon from '../../images/loading.gif'
import { getSuggestions } from '../../redux/actions/suggestionsAction'

const RightSideBar = () => {
    const {auth,suggestions}=useSelector(state=>state)
    const dispatch=useDispatch()
    return (
        <div className="mt-3" >
            <UserCard user={auth.user}/>

            <div className="d-flex justify-content-between align-items-center my-2">
                <h5 className="text-danger">Suggestions for you</h5>
                {
                    !suggestions.loading && 
                    <i className="fas fa-redo" style={{cursor:'pointer'}}
                    onClick={()=>dispatch(getSuggestions(auth.token))} />
                }
                
                
            </div>

              {
                  suggestions.loading ? 
                  <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4"/> : 
                  <div className="suggestions">
                    {
                        suggestions.users.map(user=>(
                           <UserCard key={user._id} user={user}>
                              <FollowBtn user={user}/>
                           </UserCard>
                        ))
                    }
                  </div>
              }
              <div style={{opacity:0.5}}>
                 <a style={{fontSize:'12px'}} href="http://youtube.com" target="_blank" rel="noreferrer">
                    http://youtube.com/berkantkaya
                    </a>
                    <small style={{fontSize:"10px",marginTop:'5px'}} className="d-block text-muted">
                        Welcome to our channel "Berkant Kaya"
                    </small>
                    <small style={{fontSize:"10px",marginTop:'5px'}} className="d-block text-muted">
                        &copy; 2021 BK-MEDIA FROM TURKIYE
                    </small>
                </div>
        </div>
    )
}

export default RightSideBar
