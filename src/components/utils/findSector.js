function lol(px,py,ex,ey){

    return new Promise(function(resolve,reject){
        const v = {
            x:(px-ex)/2.13,
            y:(py-ey)/2.13
        }
        resolve(v)
    })
}

export default lol