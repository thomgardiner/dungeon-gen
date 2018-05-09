let map = [];
let height = rowCount;
let width = colCount;
let spawnChance = 50;
let treasureChance = 3;
let birthLimit = 4;
let deathLimit = 3;
let treasureLayer = [];
let roomLayer = [];
let roomKey = [];


//generate base map
//cellular automata x5++ for smoothest results
//determine rooms
//
//
//
//
//
//
const generatePercentage = function(){
    let result = Math.floor(Math.random() * 100);
    if(result < spawnChance){
        return true;
    }
    else{
        return false;
    }
}

const generateTreasurePercentage = function(){
    let result = Math.floor(Math.random() * 1000);
    if(result < treasureChance){
        return true;
    }
    else{
        return false;
    }
}



const generateBase = function(){
for(let i=0; i < height; i++){
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

const generateTreasure = function(){
    treasureLayer = map;
    for(let i=0; i < height; i++){
        for(j=0; j < width; j++){
            if(treasureLayer[i][j] == 0){
                if(generateTreasurePercentage() == true){
                    treasureLayer[i][j] = 2;
                }

            }
        }
    }
}

const stepForward = function(){
    let newArr = [];
    for(let i=0; i < height; i++){
        let newRow = [];
        for(j=0; j < width; j++){
            let count = detectNeighbors(i, j);
            let index = map[i][j];
            //console.log("the count for " + "x: " + i + " y: " + j + " is " + count);
            if(index == 1){
                if(count > deathLimit){
                    newRow.push(1);
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

const fillWall = function(height, width){
    for(let i=0; i < height; i++){
        console.log(map[i][width]);
        map[i][width-1] = 1;
    }
}

const flood = function(x, y, replacement){
    roomKey = map;
    floodFill(x, y, replacement);
    map = roomKey;
    roomKey = [];
    createTileMap();
}

const floodFill = function(x, y, replacement){
    if(x < 0 || x > height-1 || y < 0 || y > width-1){
        return;
    }
    else if(roomKey[x][y] == replacement){
        return;
    }
    else if(roomKey[x][y] > 0){
        return;
    }
    else{
        roomKey[x][y] = replacement;
        floodFill(x-1, y, replacement);
        floodFill(x+1, y, replacement);
        floodFill(x, y-1, replacement);
        floodFill(x, y+1, replacement);
        return;
    }
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

const detectRooms = function(x, y){
    let count = 0;
    let map = 0;

    for(let i=-1; i<2; i++){
        for(let j=-1; j<2; j++){
            let neighborX = x+i;
            let neighborY = y+j;
            //console.log("this is x: + "  + neighborX + " y: " + neighborY);
            
            if(neighborY < 0 || neighborY > width || neighborX < 0 || neighborX >= height){
                //console.log(i + ',' + j + " is outside ")
                
            }
            else if(i == 0 && j== 0){
                //console.log(i + ',' + j + " is the center point");
            }
            else if(map[neighborX][neighborY] == 1){
                //console.log(i + ',' + j + " is " + map[neighborX][neighborY]);
                count++
            }
        }
    }
    
    return count;
}

const detect = function(x, y){
    let roomKey = map;
    let roomCount = 1;
    



}


const stepThroughWall = function(){
    fillWall(height, width);
    stepForward();
    fillWall(height, width);
    createTileMap();

}

const stepThrough = function(){
    fillWall(height, width);
    stepForward();
    createTileMap();
}

const generateMap = function(n){  
    createCanvas();
    generateBase();

    for(let i=0;i<n;i++){
        stepForward();
    }
    createTileMap();
}


//flood fill to get rooms
//get center of each room
//connect points

//







// vectors = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];

 //     (-1, -1)    (-1, 0)     (-1, 1)
//      map[0][3] | map[0][4] | map[0][5]
//(0,-1)map[1][3] | map[1][4] | map[1][5] (0, 1)
//      map[2][3] | map[2][4] | map[2][5]
//      (1, 1)     (1, 0)       (1, 1)