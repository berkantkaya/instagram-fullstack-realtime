    
    
    
    
    export const imageShow=(src,theme)=>{
    return(  <img alt="images" src={src} className="img-thumbnail"
      style={{filter : theme ? 'invert(1)' : 'invert(0)'}}/>
    )}

    export const videoShow=(src,theme)=>{
      return(  <video controls alt="images" src={src} className="img-thumbnail"
        style={{filter : theme ? 'invert(1)' : 'invert(0)'}}/>
      )}