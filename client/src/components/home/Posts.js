import React from 'react'
import {useSelector} from 'react-redux'
import PostCard from '../PostCard'


const Posts = () => {
    const {homePosts,theme} = useSelector(state => state)
    return (
        <div className="posts">
            {
                homePosts.posts.map(post=>(
                   <PostCard key={post._id} post={post} theme={theme}/> 
                ))
            }
        </div>
    )
}

export default Posts
