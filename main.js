enchant(); //the magic words that start enchant.js
//Stage Variables
var moveSpeed = 2;
var health = 5;
var stgWidth = 320;
var stgHeight = 160;
var map = [];
var curLevel = 0;
var tiles = [];

function LoadLevel(level) {
    for (var i = 0; i < tiles.length; i++) {
        game.rootScene.removeChild(tiles[i]);
    }
    tiles = [];
    map = [];
    switch (level) {
    case 0: //Level 1
        map.push("-------GGGG---------");
        map.push("-------GGGGG--------");
        map.push("--------GGGGG-------");
        map.push("---------GGGGG------");
        map.push("----------GGGGG-----");
        map.push("------------GGG-----");
        map.push("------------GGG-----");
        map.push("-------GGGGGGGG-----");
        map.push("-------GGGGGGG------");
        map.push("-------GGGGGG-------");
        map.push([8, 0]);
        map.push([[4, 0]]);
        player.x = 7 * 16;
        player.y = 7 * 16;
        break;
    case 1: //Level 2
        map.push("GGGGGGGGGGGGGG------");
        map.push("GGGGGGGGGGGGGG------");
        map.push("------BB----GG------");
        map.push("------BB----BB------");
        map.push("----BBBB----BB------");
        map.push("----BBBB----GG------");
        map.push("BBBBBB----GGGG------");
        map.push("BBBBBB----GGGG------");
        map.push("GGGGGGGGGGGG--------");
        map.push("GGGGGGGGGGGG--------");
        map.push([0, 0]);
        map.push([]);
        player.x = 0 * 16;
        player.y = 9 * 16;
        break;
    case 2: //Level 3
        map.push("BBBBBBBBBBBBBBBBBBBB");
        map.push("BBBBBBBBBBBBBBBBBBBB");
        map.push("BBBBBBBBBBBBBBBBBBBB");
        map.push("BBBBBBBBBBBBBBBBBBBB");
        map.push("BBBBBBBBBBBBBBBBBBBB");
        map.push("BBBBBBBBBBBBBBBBBBBB");
        map.push("BBBBBBBBBBBBBBBBBBBB");
        map.push("BBBBBBBBBBBBBBBBBBBB");
        map.push("BBBBBBBBBBBBBBBBBBBB");
        map.push("BBBBBBBBBBBBBBBBBBBB");
        map.push([19, 0]);
        map.push([]);
        player.x = 0 * 16;
        player.y = 9 * 16;
        break;
    case 3: //Level 4
        map.push("----------RRRRRDGGGG");
        map.push("----------U----DGGGG");
        map.push("--------GGU----D----");
        map.push("--RRRRRDGGULLLLL----");
        map.push("--U----D------------");
        map.push("--U----D------------");
        map.push("--U----D------------");
        map.push("--ULLLLL------------");
        map.push("GGGG----------------");
        map.push("GGGG----------------");
        map.push([19, 0]);
        map.push([]);
        player.x = 0 * 16;
        player.y = 9 * 16;
        break;
    case 4: //Level 5
        map.push("GGGGGGGGGGGGGGGGGGGG");
        map.push("GGGGGGGGGGGGGGGGGGGG");
        map.push("GGGGGGGGGGGGGGGGGGGG");
        map.push("--------GGGG--------");
        map.push("--------------------");
        map.push("--------GGGG--------");
        map.push("GGGGGGGGGGGGGGGGGGGG");
        map.push("GGGGGGGGGGGGGGGGGGGG");
        map.push("GGGGGGGGGGGGGGGGGGGG");
        map.push("GGGGGGGGGGGGGGGGGGGG");
        map.push([19, 0]);
        map.push([]);
        player.x = 0 * 16;
        player.y = 9 * 16;
        break;
    case 5: //Level 6  Needs moving platforms on every line of lava.
        map.push("GGGGGGGGGGGGGGGGGGGG");
        map.push("GGGGGGGGGGGGGGGGGGGG");
        map.push("LLLLLLLLLLLLLLLLLLLL");
        map.push("RRRRRRRRRRRRRRRRRRRR");
        map.push("LLLLLLLLLLLLLLLLLLLL");
        map.push("RRRRRRRRRRRRRRRRRRRR");
        map.push("LLLLLLLLLLLLLLLLLLLL");
        map.push("RRRRRRRRRRRRRRRRRRRR");
        map.push("GGGGGGGGGGGGGGGGGGGG");
        map.push("GGGGGGGGGGGGGGGGGGGG");
        map.push([19, 0]);
        map.push([]);
        player.x = 0 * 16;
        player.y = 9 * 16;
        break;
    case 6: //Level 7 Needs water buckets / refills every other line of ground.
        map.push("GGGGGGGGGGGGGGGGGGGG");
        map.push("GGGGGGGGGGGGGGGGGGGG");
        map.push("GGGGGGGGGGGGGGGGGGGG");
        map.push("LLLLLLLLLLLLLLLLLLLL");
        map.push("GGGGGGGGGGGGGGGGGGGG");
        map.push("LLLLLLLLLLLLLLLLLLLL");
        map.push("GGGGGGGGGGGGGGGGGGGG");
        map.push("LLLLLLLLLLLLLLLLLLLL");
        map.push("GGGGGGGGGGGGGGGGGGGG");
        map.push("GGGGGGGGGGGGGGGGGGGG");
        map.push([19, 0]);
        map.push([]);
        player.x = 0 * 16;
        player.y = 9 * 16;
        break;
    case 7: //Level 8 
        map.push("------UUUDDD--UGGUGG");
        map.push("------UUUDDD--UGGUGG");
        map.push("------UUUDDD--UGGUGG");
        map.push("------UUUDDD--UGGUGG");
        map.push("------UUUDDD--UGGUGG");
        map.push("------UUUDDDGGUGGUGG");
        map.push("------UUUDDD--UGGUGG");
        map.push("GGGGGGUUUDDD--UGGUGG");
        map.push("GGGGGGUUUDDD--UGGUGG");
        map.push("GGGGGGUUUDDDGGUGGUGG");
        map.push([19,0]);
        player.x = 0*16;
        player.y = 9*16;
        break;
    }
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 20; j++) {
            bg = new Sprite(16, 16);
            var tile = map[i][j];
            switch (tile) {
                case '-':
                    bg.image = game.assets['Lavasmall.png'];
                    break;
                case 'G':
                    bg.image = game.assets['Walkable.png'];
                    break;
                case 'B':
                    bg.image = game.assets['Breaking.png'];
                    break;
                case 'U':
                    bg.image = game.assets['FlowingLava.png'];
                    break;
                case 'D':
                    bg.image = game.assets['FlowingLava.png'];
                    bg.rotation = 180;
                    break;
                case 'L':
                    bg.image = game.assets['FlowingLava.png'];
                    bg.rotation = 270;
                    break;
                case 'R':
                    bg.image = game.assets['FlowingLava.png'];
                    bg.rotation = 90;
                    break;
            }
            bg.frame = tile;
            game.rootScene.addChild(bg);
            bg.x = j * 16;
            bg.y = i * 16;
            tiles.push(bg);
        }
    }

    //Goal
    bg = new Sprite(16, 16);
    bg.image = game.assets['icon0.png'];
    bg.frame = 10;
    game.rootScene.addChild(bg);
    bg.x = map[10][0] * 16;
    bg.y = map[10][1] * 16;
    tiles.push(bg);

    //Moving Platforms
    for (var i = 0; i < map[11].length; i++) {
        bg = new Sprite(16, 16);
        bg.image = game.assets['MovingBlock.png'];
        game.rootScene.addChild(bg);
        bg.x = map[11][0] * 16;
        bg.y = map[11][1] * 16;
        tiles.push(bg);
    }

    game.rootScene.removeChild(player);
    game.rootScene.addChild(player);
}

//02 Player Class
Player = Class.create(Sprite, {
    initialize: function() {
        Sprite.call(this, 12, 12);
        this.image = game.assets['Character.png'];
        this.x = stgWidth/2;
        this.y = stgHeight/2;
        this.frame = 0;
        this.health = 4;
        this.lastDirection = [0,0];
        //03 Bind Keys
        game.keybind(65, 'left');
        game.keybind(68, 'right');
        game.keybind(87, 'up');
        game.keybind(83, 'down');
        //04 Mouse Variables
    },

    blockLogic: function(y, x) {
        block = map[y][x];
        switch (block) {
        case '-':
            LoadLevel(curLevel);
            return;
        }

        if (map[10][0] == x && map[10][1] == y) {
            LoadLevel(++curLevel);
        }
    },

    checkBlocks: function() {
        var minX = Math.floor(this.x / 16);
        var minY = Math.floor((this.y + 5) / 16);
        var maxX = Math.floor((this.x + 7) / 16);
        var maxY = Math.floor((this.y + 12) / 16);
        this.blockLogic(minY, minX);
        this.blockLogic(minY, maxX);
        this.blockLogic(maxY, minX);
        this.blockLogic(maxY, maxX);
    },

    onenterframe: function() {
        
        //03 Player Controls
        if(game.input.left && !game.input.right && !game.input.up && !game.input.down){
            this.frame = 1;
            this.lastDirection[0] = -moveSpeed;
            this.lastDirection[1] = 0;
        }
        else if(game.input.right && !game.input.left && !game.input.up && !game.input.down){
            this.frame = 0;
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
        
        this.checkBlocks();
    }
});

//Begin game code
window.onload = function() {
    game = new Game(stgWidth, stgHeight);
    //Preload images
    //Any resources not preloaded will not appear
    game.preload(
        'Character.png',
        'diamond-sheet.png',
        'bg.png',
        'Lavasmall.png',
        'Walkable.png',
        'icon0.png',
        'Breaking.png',
        'FlowingLava.png',
        'MovingBlock.png'
    );

    game.onload = function() { //Prepares the game
        player = new Player();
        LoadLevel(curLevel);
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
