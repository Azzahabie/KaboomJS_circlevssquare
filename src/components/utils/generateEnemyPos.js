
// const promise1 = new Promise((resolve,reject)=>{
//     let x = Math.floor(Math.random() * 800);
//     let y = Math.floor(Math.random() * 800);
    
//     resolve(Math.floor(Math.random() * 800))
// })

const promise1 = () =>{
    let x = Math.floor(Math.random() * 800)
    console.log(x)
    return x
}

export default promise1