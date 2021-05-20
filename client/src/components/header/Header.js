import React from 'react'
import { Link } from 'react-router-dom'
import Menu from './Menu'
import Search from './Search'


const Header = () => {
    

    return (
      <div className="header bg-light">
        <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between align-middle">
  <div className="container-fluid">
    <Link className="logo" style={{textDecoration:'none'}} to="/">
       <h1 style={{fontFamily:'fantasy'}}
       onClick={()=>window.scrollTo({top:0})} className="navbar-brand text-uppercase p-0 m-0 "><i class="fab fa-earlybirds"></i> BK-Media</h1> 
        </Link>
    
    
  
  </div>
      <Search/>

       <Menu/>
</nav>
</div>
    )
}

export default Header
