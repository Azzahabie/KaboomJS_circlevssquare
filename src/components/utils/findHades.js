function lol(px,py,ex,ey){

    return new Promise(function(resolve,reject){
        const v = {
            x:px-ex,
            y:py-ey
        }
        resolve(v)
    })
   
  
}

export default lol