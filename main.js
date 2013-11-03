enchant(); //the magic words that start enchant.js
//Stage Variables
var moveSpeed = 2;
var health = 5;
var stgWidth = 320;
var stgHeight = 160;
var map = [];
var curLevel = 0;
var tiles = [];

var bgMusic = new Howl({
  urls: ['bgmusic.mp3'],
  loop: true
});

function LoadLevel(level) {
    for (var i = 0; i < tiles.length; i++) {
        game.rootScene.removeChild(tiles[i]);
    }
    player.lastDirection = [0,0];
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
        map.push([]);
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
        map.push([3, 0]);
        map.push([]);
        player.x = 0 * 16;
        player.y = 9 * 16;
        break;
    case 2: //Level 3
        map.push("GBBBBBBBBBBBBBBBBBBB");
        map.push("BBBBBBBBBBBBBBBBBBBB");
        map.push("BBBBBBBBBBBBBBBBBBBB");
        map.push("BBBBBBBBBBBBBBBBBBBB");
        map.push("BBBBBBBBBBBBBBBBBBBB");
        map.push("BBBBBBBBBBBBBBBBBBBB");
        map.push("--------BB----------");
        map.push("BBBBBBBBBBBBBBBBBBBB");
        map.push("BB------------------");
        map.push("BBBBBBBBBBBBBBBBBBBB");
        map.push([0, 0]);
        map.push([]);
        player.x = 19 * 16;
        player.y = 9 * 16;
        break;
    case 3: //Level 4
        map.push("----------RRRRRDGGGG");
        map.push("----------U----DGGGG");
        map.push("--------GGU----D----"); // Needs moving platforms on each of the circular lava paths.
        map.push("--RRRRRDGGULLLLL----");
        map.push("--U----D------------");
        map.push("--U----D------------");
        map.push("--U----D------------");
        map.push("--ULLLLL------------");
        map.push("GGGG----------------");
        map.push("GGGG----------------");
        map.push([19, 0]);
        map.push([[7, 3],[10,3]]);
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
        map.push("GGGGGGGGGGGGGGGGGGGG"); // Needs a water droplet on the lower half of the level somewhere.
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
    case 6: //Level 7 
        map.push("GGGGGGGGGGGGGGGGGGGG");
        map.push("GGGGGGGGGGGGGGGGGGGG");
        map.push("GGGGGGGGGGGGGGGGGGGG"); //Needs water buckets on every line of ground between the flowing lava.
        map.push("LLLLLLLLLLLLLLLLLLLL"); //Needs coding where flowing lava turns to stationary lava
        map.push("GGGGGGGGGGGGGGGGGGGG"); //if the source / beginning point of the flowing lava line is
        map.push("LLLLLLLLLLLLLLLLLLLL"); //turned into a platform by the player using a water droplet.
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
        map.push("------UUUDDD--UGGUGG"); //Needs moving platforms on the first 3 U-flowing-lava-lines 
        map.push("------UUUDDD--UGGUGG"); //and on the first 3 D-flowing-lava-lines.
        map.push("------UUUDDD--UGGUGG");
        map.push("------UUUDDD--UGGUGG");
        map.push("------UUUDDDGGUGGUGG");
        map.push("------UUUDDD--UGGUGG"); //Needs water on the first G in this line.
        map.push("GGGGGGUUUDDD--UGGUGG");
        map.push("GGGGGGUUUDDD--UGGUGG");
        map.push("GGGGGGUUUDDDGGUGGUGG"); //Needs water on the fourth to last G in this line.
        map.push([19,0]);
        map.push([]);
        player.x = 0*16;
        player.y = 9*16;
        break;
    case 8: //Level 9
        map.push("----GGGG-D----GG----"); //Needs water on the first and the second G of this line.
        map.push("----B----D----GG----");
        map.push("----B----D----GG----");
        map.push("----RRRRDD----GG----"); //Needs a moving platform on the circular flowing lava.
        map.push("----U---DD----GG----"); //Needs a moving platform on the line of D-flowing lava.
        map.push("----U---DD----GG----");
        map.push("----ULLLLD----------");
        map.push("----GG---D---G------");
        map.push("----GG---D---BG-----");
        map.push("----GG---DGGGGG-----"); //Needs a water droplet on the first and fourth G of this line.
        map.push([15,0]);
        map.push([]);
        player.x = 4*16;
        player.y = 9*16;
        break;
    case 9: //Level 10
        map.push("GGGGGGGGGGGGGGGGGGGG");
        map.push("RRRRRRRRRRRRRRRRRRRR"); //Needs a moving platform on this line.
        map.push("LLLLLLLLLLLLLLLLLLLL"); //Needs a moving platform on this line.
        map.push("--------BBBBBBBBBBBB");
        map.push("--------G-----------");
        map.push("GG------G-----------"); //Needs a water droplet on the first G of this line.
        map.push("RRRRRRRRRRRRRRRRRRRR");
        map.push("GGGG----G-----------"); //Needs a water droplet on the first and fifth G of this line.
        map.push("GGGG----G-----------"); 
        map.push("GGGGBGGBBGG---------"); //Needs a water droplet on the 5 and 7th G of this line.
        map.push([19,0]);
        map.push([]);
        player.x = 0*16;
        player.y = 9*16;
        break;
    case 10: //Level 11
        map.push("--D--GGG-G-GGGRRRRRD"); //Needs a moving platform on the D-flowing lava line (starts at [2,0])
        map.push("GGDG---RD-----U----D"); //Needs a water droplet on the first G in this line.
        map.push("--DB---UD-----ULLLLL");
        map.push("--DB---UD-----------");
        map.push("--DB---UD-----------"); //Needs a moving platform on the circular flowing lava spiral at the end
        map.push("--DB---UD-----------"); // and the circular flowing lava spiral in the middle of the level.
        map.push("--DB---UD-----------");
        map.push("--DB---UL-----------");
        map.push("GGDB-GGGGG----------"); //Needs water on the fifth G in this line.
        map.push("GGDG-G--------------"); //Needs a water droplet on the first G in this line.
        map.push([19,0]);
        map.push([]);
        player.x = 0*16;
        player.y = 9*16;
        break;
    }
    for (var i = 0; i < 10; i++) {
        var row = [];
        for (var j = 0; j < 20; j++) {
            bg = new Tile();
            var tile = map[i][j];
            bg.c = tile;
            bg.age2 = 0;
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
            row.push(bg);
        }
        map[i] = row;
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
        bg = new Tile(16, 16);
        bg.image = game.assets['MovingBlock.png'];
        bg.c = 'M';
        game.rootScene.addChild(bg);
        bg.x = map[11][i][0] * 16;
        bg.y = map[11][i][1] * 16;
        tiles.push(bg);
    }

    game.rootScene.removeChild(player);
    game.rootScene.addChild(player);
}

Tile = Class.create(Sprite, {
    initialize: function() {
        Sprite.call(this, 16, 16);
        this.LastTile = null;
        this.dx = 0;
        this.dy = 0;
        this.destination = null;
    },

    onenterframe: function() {
        switch (this.c) {
        case 'M':
            var TileUnder = map[Math.floor((this.y + 8) / 16)][Math.floor((this.x + 8) / 16)];
            if (TileUnder != this.LastTile) {
                this.LastTile = TileUnder;
                this.destination = [
                    Math.floor((this.x + 8) / 16) * 16,
                    Math.floor((this.y + 8) / 16) * 16
                ];
            }
            if (this.destination == null) {
                switch (TileUnder.c) {
                case 'U':
                    this.dx = 0;
                    this.dy = -moveSpeed;
                    break;
                case 'D':
                    this.dx = 0;
                    this.dy = moveSpeed;
                    break;
                case 'L':
                    this.dx = -moveSpeed;
                    this.dy = 0;
                    break;
                case 'R':
                    this.dx = moveSpeed;
                    this.dy = 0;
                    break;
                }
            }
            else {
               if (Math.abs(this.x - this.destination[0]) <= moveSpeed) {
                   this.x = this.destination[0];
                   this.dx = 0;
               }
               else {
                   this.dx = this.destination[0] - this.x > 0 ? moveSpeed : -moveSpeed;
               }

               if (Math.abs(this.y - this.destination[1]) <= moveSpeed) {
                   this.y = this.destination[1];
                   this.dy = 0;
               }
               else {
                   this.dy = this.destination[1] - this.y > 0 ? moveSpeed : -moveSpeed;
               }

               if (this.dx == 0 && this.dy == 0) {
                   this.destination = null;
               }
            }
            if (this.intersect(player)) {
                player.onBlock = this;
            }
            break;
        case 'B':
            if (this.ttl != null && this.ttl > 0) {
                if (--this.ttl <= 0) {
                    this.image = game.assets['Lavasmall.png'];
                    this.c = '-';
                }
            }
        }
        this.x += this.dx;
        this.y += this.dy;
    }
});

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
        this.onBlock = null;
        //03 Bind Keys
        game.keybind(65, 'left');
        game.keybind(68, 'right');
        game.keybind(87, 'up');
        game.keybind(83, 'down');
        //04 Mouse Variables
    },

    blockLogic: function(y, x) {
        if (map[y] == null || map[y][x] == null) {
            return;
        }
        block = map[y][x];
        switch (block.c) {
        case '-':
        case 'U':
        case 'D':
        case 'L':
        case 'R':
            if (this.onBlock == null) {
                LoadLevel(curLevel);
            }
            return;
        case 'B':
            console.log(block.x + " " + block.y);
            var bx = block.x, by = block.y;
            if (block.ttl == null) {
                block.ttl = 20;
            }
            return;
        }

        if (map[10][0] == x && map[10][1] == y) {
            LoadLevel(++curLevel);
        }
        for (var i = 0; i < map[11].length; i++) {
            if (x == map[11][0] && y == map[11][1]) {
            }
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

        if (this.onBlock != null) {
            this.x += this.onBlock.dx;
            this.y += this.onBlock.dy;
        }
        
        this.checkBlocks();

        if (this.onBlock == null || Math.abs(this.onBlock.x - this.x) > 16 || Math.abs(this.onBlock.y - this.y) > 16) {
            this.onBlock = null;
        }
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
        bgMusic.play();
        LoadLevel(curLevel);
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
