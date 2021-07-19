
// const promise1 = new Promise((resolve,reject)=>{
//     let x = Math.floor(Math.random() * 800);
//     let y = Math.floor(Math.random() * 800);
    
//     resolve(Math.floor(Math.random() * 800))
// })

const promise1 = () =>{
    let x = Math.floor(Math.random() * -100)
    let y = Math.floor(Math.random() * 100)
    let ok = Math.floor(Math.random() * 100)
    if (ok>50){
        return x
    } 
    if (ok<50){
        return y
    }
    
}

export default promise1