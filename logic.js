const algo = require('./astar.js');
const globals = require('./globals.js');

let logic = {
    move: function (request, grid) {
        //board
        var req = request.body;
        var board = req.board;
        var board_height = board.height;    //constant after start?
        var board_width = board.width;      //constant after start?
        var nomnoms = board.food;           //locations
        var danger_noods = board.snakes;    //locations
        //me
        var me = req.you;
        var body = me.body;
        var head = body[0];
        var tail = body[body.length - 1];
        var health = me.health;
        //update grid //needed?
        for (var x = 0; x < board_width; x++) {
            for (var y = 0; y < board_height; y++) {
                //update food
                if (isFood(x, y)) {
                    grid[x][y] = globals.type.nomnom;
                    // console.log("found food")
                    continue;
                }
                //update sneks
                if (isSnek(x, y)) {
                    grid[x][y] = 0;
                    // console.log("found heck")
                    continue;
                }
                if (isSelf(x, y)) {
                    grid[x][y] = 0;
                    // console.log("found me")
                    continue;
                }
                else {
                    //update empty
                    grid[x][y] = globals.type.empty;
                }
            }
        }
        //tail = okay 
        // grid[tail.x][tail.y] = globals.type.empty;
        //graph
        var graph = {};
        graph = new algo.Graph(grid);
        var start = graph.grid[head.x][head.y];
        return decision();

        function decision() {
            let path = {};
            if(body.length < (board.width-3)){
                path = stageOne();
            } else {
                path = stageTwo();
            }
            let direction = pathToDir(path);
            return direction;
        }

        function stageTwo(){
            let path = {};
            if(health < 50){
                path = findNomNom();
            } else {
                path = chaseTail();
            }
            return path;
        }

        function stageOne(){
            let path = {};
            path = findNomNom();
            return path;
        }

        function stageTest(){
            let path = {};
            path = findNomNom();
            return path;
        }
        //coords to path
        function pathToDir(coords) {
            if (coords.x == head.x) {
                if (coords.y < head.y) {
                    return 'up';
                }
                return 'down';
            } else {
                if (coords.x < head.x) {
                    return 'left';
                }
                return 'right'
            }

        }

        function chaseTail() {
            let end = graph.grid[tail.x][tail.y];
            let result = algo.astar.search(graph, start, end, {closest:true});
            let first_move = result[0];
            if(body.length<=3){
                return findNomNom();
            }
            return { x: first_move.x, y: first_move.y }
        }

        //finds closest food
        function findNomNom() {
            var min = 999;
            var results = [];
            var min_index = 0;
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
            if (results[min_index].length == 0) {
                return chaseTail();
            }
            var first_move = min_result[0];
            return { x: first_move.x, y: first_move.y }
        }

        //return true if coord is part of self
        function isSelf(x, y) {
            for (var i = 0; i < body.length; i++) {
                if (body[i].x == x && body[i].y == y) {
                    return true;
                }
            }
            return false;
        }
        //return true if coord is food
        function isFood(x, y) {
            for (var i = 0; i < nomnoms.length; i++) {
                if (nomnoms[i].x == x && nomnoms[i].y == y) {
                    return true;
                }
            }
            return false;
        }
        //return true if coord is danger_nood
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
    }
}
module.exports = logic;