enchant(); //the magic words that start enchant.js
//Stage Variables
var moveSpeed = 2;
var health = 5;
var stgWidth = 320;
var stgHeight = 160;
var map = [];
var curLevel = 0;
var tiles = [];
var platformTimers = [];

var bgMusic = new Howl({
  urls: ['bgmusic.mp3'],
  loop: true
});

var blackOut;

function SpawnBlock(x, y, c) {
    var tile = new Tile();
    tile.c = c;
    tile.x = x;
    tile.y = y;
    switch (c) {
        case '-':
            tile.image = game.assets['Lavasmall.png'];
            break;
        case 'G':
            tile.image = game.assets['Walkable.png'];
            break;
        case 'B':
            tile.image = game.assets['Breaking.png'];
            break;
        case 'U':
            tile.image = game.assets['FlowingLava.png'];
            break;
        case 'D':
            tile.image = game.assets['FlowingLava.png'];
            tile.rotation = 180;
            break;
        case 'L':
            tile.image = game.assets['FlowingLava.png'];
            tile.rotation = 270;
            break;
        case 'R':
            tile.image = game.assets['FlowingLava.png'];
            tile.rotation = 90;
            break;
        case 'M':
            tile.image = game.assets['MovingBlock.png'];
            break;
        case 'g':
            tile.image = game.assets['icon0.png'];
            tile.frame = 10;
            break;
        case 'W':
            tile.image = game.assets['WaterDrop.png'];
            break;
    }
    tiles.push(tile);
    game.rootScene.addChild(tile);
    return tile;
}

function LavaSpawnClosure(x, y, t, dt) {
    var closure = function() {
        if (--closure.timer <= 0) {
            closure.timer = t;
            SpawnBlock(x, y, 'M');
            game.rootScene.removeChild(player);
            game.rootScene.removeChild(blackOut);
            game.rootScene.addChild(player);
            game.rootScene.addChild(blackOut);
        }
    };
    closure.timer = t + dt;
    return closure;
}

function LoadLevel(level) {
    game.rootScene.removeChild(blackOut);
    game.rootScene.removeChild(player);
    for (var i = 0; i < tiles.length; i++) {
        game.rootScene.removeChild(tiles[i]);
    }
    player.lastDirection = [0,0];
    player.onBlock = [];
    player.isHolding = null;
    tiles = [];
    map = [];
    switch (level) {
    case 0: //Level 1
        map.push("-GGG---GGGG----GG-G-");
        map.push("--GG---GGGGG----GGG-");
        map.push("--------GGGGG----G--");
        map.push("--GG-----GGGGGGGGG--");
        map.push("---G------GGGGG--G--");
        map.push("---G--------GGG-----");
        map.push("-GGGG-------GGG-----");
        map.push("-GG----GGGGGGGG-----");
        map.push("-------GGGGGGG------");
        map.push("-------GGGGGG-------");
        map.push([8, 0]);
        map.push([]);
        map.push([]);
        player.x = 7 * 16;
        player.y = 7 * 16;
        break;
    case 1: //Level 2
        map.push("GGGGGGGGGGGGGG-GG---");
        map.push("GGGGGGGGGGGGGG-GGG--");
        map.push("------BB----GG--GG--");
        map.push("------BB----BB--GG--");
        map.push("-----BBB----BB--GG--");
        map.push("----BBBB----GG--GG--");
        map.push("BBBBBB----GGGGGGGG--");
        map.push("BBBBBB----GGGGG-----");
        map.push("GGGGGGGGGGGG--------");
        map.push("GGGGGGGGGGGG--------");
        map.push([3, 0]);
        map.push([]);
        map.push([]);
        player.x = 0 * 16;
        player.y = 9 * 16;
        break;
    case 2: //Level 3
        map.push("GBBBBBB---BBGGGBBBBB");
        map.push("BBBBBBBBBBBBGGG---BB");
        map.push("BBBBB-----BBGGGBBBBB");
        map.push("BBBBBBBBBBBBBBBBBBBB");
        map.push("-----BBBBBB------B--");
        map.push("BBB-----BBBB--B--BBB");
        map.push("--------BB---------B");
        map.push("BBBBBBBBBBBBBBBBBBBB");
        map.push("BB------------------");
        map.push("BBBBBBBBBBBBBBBBBBBG");
        map.push([0, 0]);
        map.push([]);
        map.push([]);
        player.x = 19 * 16;
        player.y = 9 * 16;
        break;
    case 3: //Level 4
        map.push("----------RRRRRDGGGG");
        map.push("----------U----DGGGG");
        map.push("--------GGU----D----"); // Needs moving platforms on each of the circular lava paths.
        map.push("--RRRRRDGGULLLLL----");
        map.push("--U----DGG---BGG----");
        map.push("--U----D-----B------");
        map.push("--U----D---BBG------");
        map.push("--ULLLLLGGGG--------");
        map.push("GGGG----GGG---------");
        map.push("GGGG----------------");
        map.push([19, 0]);
        map.push([[7, 3, 0],[10, 3, 0]]);
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
        map.push("GGGGGGGGGGGGGGGGGGGG"); // Needs a water droplet on the lower half of the level somewhere.
        map.push("GGGGGGGGGGGGGGGGGGGG");
        map.push([0, 0]);
        map.push([]);
        map.push([[9, 9]]);
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
        map.push([
            [0, 7, 60, -50],
            [0, 5, 60, -40],
            [0, 3, 60, -30],
            [19, 6, 60, -20],
            [19, 4, 60, -10],
            [19, 2, 60, 0],
        ]);
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
        map.push([]);
        player.x = 0*16;
        player.y = 9*16;
        break;
    }
    for (var i = 0; i < 10; i++) {
        var row = [];
        for (var j = 0; j < 20; j++) {
            row.push(SpawnBlock(j * 16, i * 16, map[i][j]));
        }
        map[i] = row;
    }

    //Goal
    SpawnBlock(map[10][0] * 16, map[10][1] * 16, 'g');

    //Moving Platforms
    platformTimers = [];
    for (var i = 0; i < map[11].length; i++) {
        var blockSpawner = new LavaSpawnClosure(
            map[11][i][0] * 16,
            map[11][i][1] * 16,
            map[11][i][2],
            map[11][i][3]
        );

        blockSpawner();
        if (blockSpawner.timer > 0) {
            platformTimers.push(blockSpawner);
        }
    }

    //Water
    var waterDrops = [];
    for (var i = 0; i < map[12].length; i++) {
        waterDrops.push(SpawnBlock(map[12][i][0] * 16, map[12][i][1] * 16, 'W'));
    }
    map[12] = waterDrops;

    game.rootScene.addChild(player);
    game.rootScene.addChild(blackOut);
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
            if (TileUnder == null) {
                game.rootScene.removeChild(this);
            }
            if (TileUnder != this.LastTile) {
                this.LastTile = TileUnder;
                this.destination = [
                    Math.floor((this.x + 8) / 16) * 16,
                    Math.floor((this.y + 8) / 16) * 16
                ];
            }
            if (this.destination != null) {
               if (Math.abs(this.x - this.destination[0]) <= moveSpeed) {
                   this.dx = this.destination[0] - this.x;
               }
               else {
                   this.dx = this.destination[0] - this.x > 0 ? moveSpeed : -moveSpeed;
               }

               if (Math.abs(this.y - this.destination[1]) <= moveSpeed) {
                   this.dy = this.destination[1] - this.y;
               }
               else {
                   this.dy = this.destination[1] - this.y > 0 ? moveSpeed : -moveSpeed;
               }

               if (this.dx == 0 && this.dy == 0) {
                   this.destination = null;
               }
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
            if (this.intersect(player)) {
                var found = false;
                for (var i = 0; i < player.onBlock.length; i++) {
                    if (player.onBlock[i] == this) {
                        found = true;
                    }
                }
                if (!found) {
                    player.onBlock.push(this);
                }
            }
            break;
        case 'B':
            if (this.ttl != null && this.ttl > 0) {
                if (--this.ttl <= 0) {
                    this.image = game.assets['Lavasmall.png'];
                    this.c = '-';
                }
            }
            break;
        case 'W':
            if (this.intersect(player)) {
                player.isHolding = this;
            }
            break;
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
        this.onBlock = [];
        this.isHolding = null;
        //03 Bind Keys
        game.keybind(65, 'left');
        game.keybind(68, 'right');
        game.keybind(87, 'up');
        game.keybind(83, 'down');
        //04 Mouse Variables
    },

    blockLogic: function(y, x) {
        if (map[y] == null || map[y][x] == null) {
            return false;
        }
        block = map[y][x];
        switch (block.c) {
        case '-':
        case 'U':
        case 'D':
        case 'L':
        case 'R':
            if (this.onBlock.length == 0) {
                if (this.isHolding == null) {
                    LoadLevel(curLevel);
                    return true;
                }
                else {
                    block.c = 'G';
                    block.image = game.assets['Walkable.png'];
                    game.rootScene.removeChild(this.isHolding);
                    this.isHolding = null;
                }
            }
            return false;
        case 'B':
            var bx = block.x, by = block.y;
            if (block.ttl == null) {
                block.ttl = 20;
            }
            return false;
        }

        if (map[10][0] == x && map[10][1] == y) {
            LoadLevel(++curLevel);
            return true;
        }
    },

    checkBlocks: function() {
        var minX = Math.floor(this.x / 16);
        var minY = Math.floor((this.y + 5) / 16);
        var maxX = Math.floor((this.x + 7) / 16);
        var maxY = Math.floor((this.y + 12) / 16);
        if (this.blockLogic(minY, minX)) return;
        if (this.blockLogic(minY, maxX)) return;
        if (this.blockLogic(maxY, minX)) return;
        if (this.blockLogic(maxY, maxX)) return;
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
        
        this.x = Math.min(Math.max(this.x + this.lastDirection[0], 0), stgWidth - 12);
        this.y = Math.min(Math.max(this.y + this.lastDirection[1], 0), stgHeight - 12);
        blackOut.x = this.x - 320;
        blackOut.y = this.y - 160;

        var blockDx = 0;
        var blockDy = 0;
        var nextBlocks = [];
        for (var i = 0; i < this.onBlock.length; i++) {
            if (Math.abs(this.onBlock[i].x - this.x) > 16 || Math.abs(this.onBlock[i].y - this.y) > 16) {
                continue;
            }
            nextBlocks.push(this.onBlock[i]);
            blockDx += this.onBlock[i].dx;
            blockDy += this.onBlock[i].dy;
        }
        this.onBlock = nextBlocks;
        
        if (this.onBlock.length > 0) {
            if (this.onBlock.length >= 2) {
                console.log("Halp");
            }
            blockDx /= this.onBlock.length;
            blockDy /= this.onBlock.length;
            this.x += blockDx;
            this.y += blockDy;
        }
        
        this.checkBlocks();

        if (this.isHolding != null) {
            this.isHolding.x = this.x;
            this.isHolding.y = this.y - 16;
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
        'MovingBlock.png',
        'blackout.png',
        'WaterDrop.png'
    );

    game.onload = function() { //Prepares the game
        player = new Player();

        blackOut = new Sprite(640, 320);
        blackOut.image = game.assets['blackout.png'];

        bgMusic.play();
        LoadLevel(curLevel);

        game.rootScene.addEventListener('enterframe', function() {
            for (var i = 0; i < platformTimers.length; i++) {
                platformTimers[i]();
            }
        });
    }
    game.start(); //Begin the game
}
