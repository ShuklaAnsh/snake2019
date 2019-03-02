var body = [
    {
        x: 0,
        y: 0
    },
    {
        x: 0,
        y: 1
    },
    {
        x: 0,
        y: 2
    }
];
var board_width = 15;
var board_height = 17;
var nomnoms = [{x:10, y:11}, {x:1, y:3}];


var grid = [];

for(var x = 0; x < board_width; x++){
    grid.push([])
    for(var y = 0; y < board_height; y++){
      grid[x].push("empty")
    }
}

//make food
for(let i = 0; i < nomnoms.length; i++){
    grid[nomnoms[i].x][nomnoms[i].y]='nomnom'
}
//return true if coord is part of self
function isSelf(x, y){
    for(var i = 0; i < body.length; i++){
        if(body[i].x == x && body[i].y==y){
            return true;
        }
    }
    return false;
}
function isFood(x, y){
    for(var i = 0; i < nomnoms.length; i++){
        if(nomnoms[i].x == x && nomnoms[i].y==y){
            return true;
        }
    }
    return false;
}

console.log(isFood(1,3));