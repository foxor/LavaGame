enchant(); //the magic words that start enchant.js
//Stage Variables
var moveSpeed = 4;
var health = 5;
var stgWidth = 320;
var stgHeight = 320;
var map = [];
var curLevel = 0;

function LoadLevel(level) {
    map = [];
    switch (level) {
    case 0:
        map.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([6, 7]);
        player.x = 7 * 16;
        player.y = 11 * 16;
        break;
    }
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 20; j++) {
            bg = new Sprite(16, 16);
            var tile = map[i][j];
            switch (tile) {
                case 0:
                    bg.image = game.assets['Lavasmall.png'];
                    break;
                case 1:
                    bg.image = game.assets['Walkable.png'];
                    break;
            }
            bg.frame = tile;
            game.rootScene.addChild(bg);
            bg.x = j * 16;
            bg.y = i * 16;
        }
    }
    bg = new Sprite(16, 16);
    bg.image = game.assets['icon0.png'];
    bg.x = map[20][0];
    bg.y = map[20][1];

}

//02 Player Class
Player = Class.create(Sprite, {
    initialize: function() {
        Sprite.call(this, 16, 16);
        this.image = game.assets['icon0.png'];
        this.x = stgWidth/2;
        this.y = stgHeight/2;
        this.frame = 44;
        this.health = 4;
        this.lastDirection = [0,0];
        //03 Bind Keys
        game.keybind(65, 'left');
        game.keybind(68, 'right');
        game.keybind(87, 'up');
        game.keybind(83, 'down');
        //04 Mouse Variables
    },

    checkLava: function() {
        var minX = Math.floor(this.x / 16);
        var minY = Math.floor(this.y / 16);
        var maxX = Math.ceil(this.x / 16);
        var maxY = Math.ceil(this.y / 16);
        if (map[minY][minX] == 0 ||
            map[minY][maxX] == 0 || 
            map[maxY][minX] == 0 || 
            map[maxY][maxX] == 0)
        {
            return true;
        }
        return false;
    },

    checkLevelComplete: function() {
        var minX = Math.floor(this.x / 16);
        var minY = Math.floor(this.y / 16);
        var maxX = Math.ceil(this.x / 16);
        var maxY = Math.ceil(this.y / 16);

    },

    onenterframe: function() {
        
        //03 Player Controls
        if(game.input.left && !game.input.right && !game.input.up && !game.input.down){
            this.lastDirection[0] = -moveSpeed;
            this.lastDirection[1] = 0;
        }
        else if(game.input.right && !game.input.left && !game.input.up && !game.input.down){
            this.lastDirection[0] = moveSpeed;
            this.lastDirection[1] = 0;
        }
        else if(game.input.up && !game.input.down && !game.input.left && !game.input.right){
            this.lastDirection[0] = 0;
            this.lastDirection[1] = -moveSpeed;
        }
        else if(game.input.down && !game.input.up && !game.input.left && !game.input.right){
            this.lastDirection[0] = 0;
            this.lastDirection[1] = moveSpeed;
        }
        else if(!game.input.down && !game.input.up && !game.input.left && !game.input.right) {
            this.lastDirection[0] = 0;
            this.lastDirection[1] = 0;
        }
        
        this.x += this.lastDirection[0];
        this.y += this.lastDirection[1];
        
        if (this.checkLava()) {
            console.log("Hmmm");
            //gameOver();
        }
    }
});

//Begin game code
window.onload = function() {
    game = new Game(stgWidth, stgHeight);
    //Preload images
    //Any resources not preloaded will not appear
    game.preload('icon0.png', 'diamond-sheet.png', 'bg.png', 'Lavasmall.png', 'Walkable.png');

    game.onload = function() { //Prepares the game
        player = new Player();
        LoadLevel(0);
        game.rootScene.addChild(player);
        //05 Add Gem
        
        //06 Create Label
        
        //08 Health Label
        
        //04 Touch Listener
        
        //Game Condition Check
        game.rootScene.addEventListener('enterframe', function() {
            //08 Game Over
            
            //08 Make Bomb Generator
        });

    }
    game.start(); //Begin the game
}
