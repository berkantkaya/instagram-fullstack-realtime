import React from 'react'

const Icons = ({setContent,content,theme}) => {
    const reactions=[
        '😀','😂','🤣','😍','😎','🤓','🤔','😬',
        '😷','🤢','❤️','💑','👼','🙋','🕵️','🤜',
        '🤙','🙌','👎', '😺','🐥','🐣','🐆','🌼',
        '🌏','🌘','☃️','☔','🌈','🚙','✈','🛴',
        '🚲','🚘','🌅','🗿','🏚','🏘','🏡','🚇'
    ]
    return (
        <div class="dropdown" style={{opacity:1,marginTop:'3px',filter: theme ? 'invert(1)' : 'invert(0)'}} >
        <span class="btn btn-light dropdown-toggle px-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{opacity:1,border:'none',outline:'none'}}>
        <span style={{fontSize:'14px'}}>😀</span>
        </span>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li className="reactions">
              {
               reactions.map(icon=>(
                   <span key={icon} onClick={()=>setContent(content + icon)}>
                       {icon}
                   </span>
               ))
              }
          </li>
        </ul>
      </div>
    )
}

export default Icons
