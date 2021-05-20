export const GLOBALTYPES={
    ALERT:'ALERT',
    AUTH:'AUTH',
    THEME:'THEME',
    STATUS:'STATUS',
    MODAL:'MODAL',
    SOCKET:'SOCKET'
}

export const EditData=(data,id,post)=>{
    const newData=data.map(item=>(item._id === id ? post : item))
    return newData
}

export const DeleteData=(data,id)=>{
    const newData=data.filter(item=>item._id !== id)
    return newData
}