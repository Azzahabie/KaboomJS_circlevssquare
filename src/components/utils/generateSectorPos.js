export default function generateSectorPos(bound,negativeBound){
    let x = Math.floor(Math.random() * negativeBound)
    let y = Math.floor(Math.random() * bound)
    let ok = Math.floor(Math.random() * 100)
    if (ok>50){
        return x
    } 
    if (ok<50){
        return y
    }
    
}

