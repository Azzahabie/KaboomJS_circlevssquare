// var min = 0
// var max = 800

// function getRandomArbitrary() {
//     return Math.floor(Math.random() * (max - min) + min);
// }



export default function checkSector(positionX,positionY){

    var posX = positionX
    var posY = positionY
    console.log(posX);
    console.log(posY);
//top LEFT
if(posX < 400 && posY < 400){
    console.log("top Left");
}
//bottom left
if(posX<400 && posY > 400){
    console.log("bottom left");
}

//top right
if(posX > 400 && posY < 400){
    console.log("top right");
}

if (posX > 400 && posY > 400){
    console.log("bottom right");
}

}



