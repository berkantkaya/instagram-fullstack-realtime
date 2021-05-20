let users=[]

const SocketServer=(socket)=>{
    // connect-disconnect
    socket.on('joinUser',id=>{
        users.push({id,socketId:socket.id})
    })

    socket.on('disconnect', ()=>{
        users=users.filter(user=>user.socketId !== socket.id)
    })


    //likes
    socket.on('likePost',newPost=>{
        const ids=[...newPost.user.followers,newPost.user._id]
       const clients=users.filter(user=>ids.includes(user.id))
       if(clients.length>0){
           clients.forEach(client=>{
               socket.to(`${client.socketId}`).emit('likeToClient',newPost)
           })
       }

    })

   //unLikes

    socket.on('unLikePost',newPost=>{
        const ids=[...newPost.user.followers,newPost.user._id]
       const clients=users.filter(user=>ids.includes(user.id))
       if(clients.length>0){
           clients.forEach(client=>{
               socket.to(`${client.socketId}`).emit('unLikeToClient',newPost)
           })
       }

    })

    //comment

    socket.on('createComment',newPost=>{
        const ids=[...newPost.user.followers,newPost.user._id]
       const clients=users.filter(user=>ids.includes(user.id))
       if(clients.length>0){
           clients.forEach(client=>{
               socket.to(`${client.socketId}`).emit('createCommentToClient',newPost)
           })
       }

    })
    
    //delete

    socket.on('deleteComment',newPost=>{
        const ids=[...newPost.user.followers,newPost.user._id]
       const clients=users.filter(user=>ids.includes(user.id))
       if(clients.length>0){
           clients.forEach(client=>{
               socket.to(`${client.socketId}`).emit('deleteCommentToClient',newPost)
           })
       }

    })
    //follow

    socket.on('follow',newUser=>{
        const user=users.find(user=>user.id===newUser._id)
        user && socket.to(`${user.socketId}`).emit('followToClient',newUser)
    })
   
    //unFollow

    socket.on('unFollow',newUser=>{
        const user=users.find(user=>user.id===newUser._id)
        user && socket.to(`${user.socketId}`).emit('unFollowToClient',newUser)
    })

    //Notify

    socket.on('createNotify',msg=>{
        const clients=users.filter(user=>msg.recipients.includes(user.id))
        if(clients.length>0){
            clients.forEach(client=>{
                socket.to(`${client.socketId}`).emit('createNotifyToClient',msg)
            })
        }
    })

    //Delete Notify
    socket.on('removeNotify',msg=>{
        const clients=users.filter(user=>msg.recipients.includes(user.id))
        if(clients.length>0){
            clients.forEach(client=>{
                socket.to(`${client.socketId}`).emit('removeNotifyToClient',msg)
            })
        }
    })

    //message

     socket.on('addMessage',msg=>{
        const user=users.find(user=>user.id===msg.recipient)
       user && socket.to(`${user.socketId}`).emit('addMessageToClient',msg)
            })
}

module.exports=SocketServer