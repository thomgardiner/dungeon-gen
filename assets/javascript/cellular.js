let map = [];
let height = 60;
let width = 60;
let spawnChance = 45;
let birthLimit = 5;
let deathLimit = 3;
let overpopLimit = 15;

// good settings
// let birthLimit = 5;
// let deathLimit = 3;
// let overpopLimit = 15;

// good settings
// let birthLimit = 5;
// let deathLimit = 3;
// let overpopLimit = 8;


const generatePercentage = function(){
    let result = Math.floor(Math.random() * 100);
    if(result > spawnChance){
        return true;
    }
    else{
        return false;
    }
}


const generateBase = function(){
for(i=0; i < height; i++){
    let newRow = [];
    for(j=0; j < width; j++){
            if(generatePercentage() == true){
                newRow.push(1);
            }
            else{
                newRow.push(0);
            }
        }
        map.push(newRow);
    }
}

const stepForward = function(){
    let newArr = [];
    for(i=0;i < height; i++){
        let newRow = [];
        for(j=0; j < width; j++){
            let count = detectNeighbors(i, j);
            let index = map[i][j];
            //console.log("the count for " + "x: " + i + " y: " + j + " is " + count);
            if(index == 1){
                if(count > deathLimit){
                    newRow.push(1);
                }
                else if(count > overpopLimit){
                    newRow.push(0);
                }
                else{
                    newRow.push(0);
                }
            }        
            else{
                if(count > birthLimit){
                    newRow.push(1);
                }
                else{
                newRow.push(0);
                }
            }
        }
        newArr.push(newRow);
    }
    return map = newArr;
}


const detectNeighbors = function(x, y){
    let count = 0;
    for(let i=-1; i<2; i++){
        for(let j=-1; j<2; j++){
            let neighborX = x+i;
            let neighborY = y+j;
            //console.log("this is x: + "  + neighborX + " y: " + neighborY);
            
            if(neighborY < 0 || neighborY > width || neighborX < 0 || neighborX >= height){
                //console.log(i + ',' + j + " is outside ");
                //count++ for map edge consideration
                count++
            }
            else if(i == 0 && j== 0){
                //console.log(i + ',' + j + " is the center point");
            }
            else if(map[neighborX][neighborY] == 1){
                //console.log(i + ',' + j + " is " + map[neighborX][neighborY]);
                count++;
            }
        }
    }
    
    return count;
}

const stepThrough = function(){
    stepForward();
    createTileMap();
}

const generateMap = function(){  
    generateBase();
    createTileMap();
}




// vectors = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];

 //     (-1, -1)    (-1, 0)     (-1, 1)
//      map[0][3] | map[0][4] | map[0][5]
//(0,-1)map[1][3] | map[1][4] | map[1][5] (0, 1)
//      map[2][3] | map[2][4] | map[2][5]
//      (1, 1)     (1, 0)       (1, 1)