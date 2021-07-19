// var min = 0
// var max = 800

// function getRandomArbitrary() {
//     return Math.floor(Math.random() * (max - min) + min);
// }
import generatePos from './generateSectorPos.js'
import pathFinder from './findSector.js'


function checkSector(positionX,positionY){

    return new Promise(function(resolve,reject){
        var posX = positionX
        var posY = positionY
        let ok = Math.floor(Math.random() * (4 - 1) + 1);
        var obj = {
            topRight:{
                x:607,
                y:114
            },
            bottomRight:{
                x:607,
                y:598
            },
            bottomLeft:{
                x:104,
                y:545
            },
            topLeft:{
                x:154,
                y:101
            }
        }
    //top LEFT

    if(posX < 400 && posY < 400){
      
        switch (ok) {
            case 1:
                pathFinder(obj.bottomRight.x,obj.bottomRight.y,positionX,positionY)
                .then((data)=>{
                    return resolve(data)
                })
                
                break;
            case 2:
                pathFinder(obj.topRight.x,obj.topRight.y,positionX,positionY)
                .then((data)=>{
                    return resolve(data)
                })
                break;
            case 3:
                pathFinder(obj.bottomLeft.x,obj.bottomLeft.y,positionX,positionY)
                .then((data)=>{
                    return resolve(data)
                })
                break;
        
        }
    }
    //bottom left
    if(posX<400 && posY > 400){
     
        switch (ok) {
            case 1:
                pathFinder(obj.bottomRight.x,obj.bottomRight.y,positionX,positionY)
                .then((data)=>{
                    return resolve(data)
                })
                
                break;
            case 2:
                pathFinder(obj.topRight.x,obj.topRight.y,positionX,positionY)
                .then((data)=>{
                    return resolve(data)
                })
                break;
            case 3:
                pathFinder(obj.topLeft.x,obj.topLeft.y,positionX,positionY)
                .then((data)=>{
                    return resolve(data)
                })
                break;
        
        }
    }
    
    //top right
    if(posX > 400 && posY < 400){
        
        switch (ok) {
            case 1:
                pathFinder(obj.bottomRight.x,obj.bottomRight.y,positionX,positionY)
                .then((data)=>{
                    return resolve(data)
                })
                
                break;
            case 2:
                pathFinder(obj.topLeft.x,obj.topLeft.y,positionX,positionY)
                .then((data)=>{
                    return resolve(data)
                })
                break;
            case 3:
                pathFinder(obj.bottomLeft.x,obj.bottomLeft.y,positionX,positionY)
                .then((data)=>{
                    return resolve(data)
                })
                break;
        
        }
    }
    
    if (posX > 400 && posY > 400){
        
        switch (ok) {
            case 1:
                pathFinder(obj.topLeft.x,obj.topLeft.y,positionX,positionY)
                .then((data)=>{
                    return resolve(data)
                })
                
                break;
            case 2:
                pathFinder(obj.topRight.x,obj.topRight.y,positionX,positionY)
                .then((data)=>{
                    return resolve(data)
                })
                break;
            case 3:
                pathFinder(obj.bottomLeft.x,obj.bottomLeft.y,positionX,positionY)
                .then((data)=>{
                    return resolve(data)
                })
                break;
        
        }
    }
    
    })

}

export default checkSector



