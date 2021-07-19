function shootToSector(posX, posY) {
    return new Promise(function (resolve, reject) {
        //topleft
        if (posX < 400 && posY < 400) {
           return resolve(1)
          

        }
        
        //bottom left
        if (posX < 400 && posY > 400) {
            
           return resolve(3)
        }

        //top right
        if (posX > 400 && posY < 400) {
          return  resolve(2)
            
        }
        //bottom right
        if (posX > 400 && posY > 400) {
           return  resolve(4)
           
        }

    }
    )
}

export default shootToSector