import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { logout } from '../../redux/actions/authAction'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import Avatar from '../Avatar'
import NotifyModal from '../NotifyModal'

const Menu = () => {
    const navLinks=[
        {label:'Home',icon:'home',path:'/'},
        {label:'Message',icon:'near_me',path:'/message'},
        {label:'Discover',icon:'explore',path:'/discover'},
    ]
    const {auth,theme,notify} =useSelector(state=>state)
    const dispatch = useDispatch()
    const {pathname}=useLocation()

    const isActive=(pn)=>{
        if(pn===pathname) return 'active'
    }
    return (
        <div className="menu">
        <ul className="navbar-nav flex-row ">
            {
                navLinks.map((link,index)=>(
           <li className={ `nav-item px-2  ${isActive(link.path)}`}key={index}>
              <Link className="nav-link mt-2" to={link.path}>
                  <span className="material-icons">
                      {link.icon}
                  </span>
              </Link>
          </li>
                ))
            }


          <div class="dropdown" style={{opacity:1,marginTop:'8px'}} >
  <span class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{opacity:1,border:'none',outline:'none'}}>
  <span className="material-icons" style={{color:notify.data.length > 0 ? 'crimson' : ''}}>
                      favorite
                  </span>
                  <span className="notify_length">
                    {notify.data.length}
                  </span>
  </span>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><NotifyModal/></li>
  </ul>
</div>
  
          
          
          <li className="nav-item dropdown" style={{opacity:1}}>
            <span className="nav-link dropdown-toggle"id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <Avatar src={auth.user.avatar}/>
            </span>
            <ul style={{position:'absolute',maxWidth:'50px',fontSize:'12px',marginRight:'5px'}} className="dropdown-menu " aria-labelledby="navbarDropdown">
              <li><Link className="dropdown-item" to={`/profile/${auth.user._id}`} >Profile</Link></li>
              <li><label onClick={()=>dispatch({type:GLOBALTYPES.THEME,payload:!theme})} htmlFor="theme" className="dropdown-item">{theme ? 'Light Mode' : 'Dark Mode' }</label></li>
              <li><hr className="dropdown-divider"/></li>
              <li><Link className="dropdown-item" to="/" onClick={()=>dispatch(logout())}>
                  Logout
                  </Link></li>
            </ul>
          </li>
  
        </ul>
       
      </div>
    
    )
}

export default Menu
