let logic = {
    move: function(request, grid) {
        //board
        var req = request.body;
        var board = req.board;
        var board_height = board.height;    //constant after start?
        var board_width = board.width;      //constant after start?
        var nomnoms = board.food;           //locations
        var danger_noods = board.snakes;    //locations
        var left_wall = 0;
        var top_wall = 0;
        var right_wall = board_width;
        var bottom_wall = board_height;
        //me
        var me = req.you;
        var body = me.body;
        var head = body[0];
        var health = me.health;
        //update grid
        for(var x = 0; x < board_width; x++){
            for(var y = 0; y < board_height; y++){
                //update food
                if(isFood(x,y)){
                    grid[x][y] = ("( "+ x +", " + y +" ), " + "nomnom");
                    continue;
                }
                //update sneks
                if(isSnek(x,y)){
                    grid[x][y] = ("( "+ x +", " + y +" ), " + "heck");
                    continue;
                }
                if(isSelf(x,y)){
                    grid[x][y] = ("( "+ x +", " + y +" ), " + "me");
                    continue;
                }
                //update empty
                grid[x][y] = ("( "+ x +", " + y +" ), " + "empty");
            }
        }        
        return decision();

        function decision() {
            let direction = 'left'
            //avoid collisions
                //wall
                if(head.x == left_wall){
                    // go up
                    if(isSafe('up')){
                        direction = 'up'
                    } else if(isSafe('down')){
                        // down if cant go up
                        direction = 'down'
                    } else {
                        direction = 'right'
                    }
                } else if(head.x == right_wall){
                    // go up
                    if(isSafe('up')){
                        direction = 'up'
                    } else {
                        direction = 'down'
                    }
                } else if(head.y == top_wall){
                    // go right
                    if(isSafe('right')){
                        direction = 'right'
                    } else {
                        direction = 'left'
                    }
                } else if(head.y == bottom_wall){
                    // go right
                    if(isSafe('right')){
                        direction = 'right'
                    } else {
                        direction = 'left'
                    }
                }
                //snakes
                    //self
                    //others
            //hunt food
            return direction;
        }

        //decides direction safe
        function isSafe(direction){
            switch(direction){
                case 'up':
                    if(head.y == top_wall){
                        return false;
                    }
                    //going up, then head + 1 is body
                    if(isSelf(head.x, head.y+1)){
                        return false;
                    }
                break;
            }
            return true
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
        //return true if coord is food
        function isFood(x, y){
            for(var i = 0; i < nomnoms.length; i++){
                if(nomnoms[i].x == x && nomnoms[i].y==y){
                    return true;
                }
            }
            return false;
        }
        //return true if coord is danger_nood
        function isSnek(x, y){
            for(var i = 0; i < danger_noods.length; i++){
                //need another for for snek length
                if(danger_noods[i].x == x && danger_noods[i].y==y){
                    return true;
                }
            }
            return false;
        }
    }
}
module.exports = logic