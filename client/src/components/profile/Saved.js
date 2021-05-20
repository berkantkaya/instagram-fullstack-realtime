import React, { useEffect, useState } from 'react'
import PostThumb from '../PostThumb'
import {GLOBALTYPES} from '../../redux/actions/globalTypes'
import { getDataAPI } from '../../utils/fetchData'
import { useDispatch } from 'react-redux'
import LoadIcon from '../../images/loading.gif'

const Saved = ({auth,dispatch}) => {
    const [savePosts,setSavePosts]=useState([])
    const [result,setResult]=useState(9)
    const [load,setLoad]=useState(false)

    useEffect(()=>{
     setLoad(true)
     getDataAPI('getSavePosts',auth.token)
     .then(res=>{
        setSavePosts(res.data.savePosts)
        setResult(res.data.result)
        setLoad(false)

     })
      .catch(err=>{
          dispatch({type:GLOBALTYPES.ALERT,payload:{error:err.response.data.msg}})
      })
    },[])

    return (
        <div>
            <PostThumb posts={savePosts}
             result={result}/>

             {
                 load && <img src={LoadIcon} alt="loading" className="d-block mx-auto"/>
             }
        </div>
    )
}

export default Saved

