const algo = require('./astar.js');

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
var head = body[0];
var tail = body[body.length-1];
console.log(tail)
var board_width = 15;
var board_height = 17;
var nomnoms = [{ x: 4, y: 4 }, { x: 1, y: 4 }, {x:3, y:0}];
var danger_noods = [
    {
        "id": "snake-id-string",
        "name": "Sneky Snek",
        "health": 90,
        "body": [
            {
                "x": 2,
                "y": 3
            }
        ]
    }
]

var grid = [];

for (var row = 0; row < 5; row++) {
    grid.push([])
    for (var col = 0; col < 5; col++) {
        grid[row].push(1)
    }
}
//grid[x][y]?
grid[1][0] = 0;
grid[1][1] = 0;
grid[1][2] = 0;
grid[2][0] = 0;
grid[3][2] = 0;
grid[3][3] = 0;
grid[3][4] = 0;
// for (var x = 0; x < board_width; x++) {
//     grid.push([])
//     for (var y = 0; y < board_height; y++) {
//         grid[x].push(   //node
//             {
//                 f: 0, //g+h
//                 g: 0, //cost
//                 h: 0, //time
//                 cost: 1,
//                 visited: false,
//                 closed: false,
//                 parent: null,
//                 type: "empty"
//             }
//         )
//     }
// }

//make food
// for (let i = 0; i < nomnoms.length; i++) {
//     grid[nomnoms[i].x][nomnoms[i].y].type = 'nomnom'
// }
//return true if coord is part of self
function isSelf(x, y) {
    for (var i = 0; i < body.length; i++) {
        if (body[i].x == x && body[i].y == y) {
            return true;
        }
    }
    return false;
}
function isFood(x, y) {
    for (var i = 0; i < nomnoms.length; i++) {
        if (nomnoms[i].x == x && nomnoms[i].y == y) {
            return true;
        }
    }
    return false;
}

function isSnek(x, y) {
    for (var i = 0; i < danger_noods.length; i++) { //array of snakes
        var snek_body = danger_noods[i].body; //one snake's body coords
        for (var block = 0; block < snek_body.length; block++) { //iterate through body
            if (snek_body[block].x == x && snek_body[block].y == y) {
                return true
            }
        }
    }
    return false;
}



//--------------------------------------- A * ---------------

var graph = new algo.Graph(grid);
var start = graph.grid[0][1];
var end = graph.grid[4][4];
var result = algo.astar.search(graph, start, end);

//finds closest food
function findNomNom() {
    var min = 999;
    var results = [];
    var min_index = 0;
    var start = graph.grid[head.x][head.y];
    for (var i = 0; i < nomnoms.length; i++) {
        let end = graph.grid[nomnoms[i].x][nomnoms[i].y];
        let result = algo.astar.search(graph, start, end);
        results.push(result);
        if (result.length < min) {
            min = result.length;
            min_index = i;
        }
    }
    var min_result = results[min_index];
    var first_move = min_result[0];
    return { x: first_move.x, y: first_move.y }
}

console.log(isSelf(1,1))