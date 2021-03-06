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
var globalTimer = 0;
var credits = null;
var creditsStarted = 0;

var taunts = [
    new Howl({urls: ["taunt1.wav"], loop: false}),
    new Howl({urls: ["taunt2.wav"], loop: false}),
    new Howl({urls: ["taunt3.wav"], loop: false}),
    new Howl({urls: ["taunt4.wav"], loop: false}),
    new Howl({urls: ["taunt5.wav"], loop: false})
];

var creditSound = new Howl({urls: ["credits.wav"], loop: false});

var bgMusic = new Howl({
  urls: ['GameMusic.mp3'],
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
            tile.image = game.assets['Ladder.png'];
	    tile.rotation = 180;
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
    if (level >= 10 && credits == null) {
        bgMusic.stop();
        creditsStarted = new Date().getTime();
        credits = new Sprite(320, 1000);
        credits.image = game.assets['credits.png'];
        credits.x = 0;
        credits.y = 0;
        game.rootScene.addChild(credits);
        creditSound.play();
        return;
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
        map.push("------BBBBRRRRRDGGGG");
        map.push("-----GG---U----DGGGG");
        map.push("----GG--GGU----D----"); // Needs moving platforms on each of the circular lava paths.
        map.push("--RRRRRDGGULLLLL----");
        map.push("--U----DGG---BGG----");
        map.push("--U----D-----B------");
        map.push("--U----D---BBG------");
        map.push("--ULLLLLGGGG--------");
        map.push("GGGG----GGG---------");
        map.push("GGGG----------------");
        map.push([19, 0]);
        map.push([[7, 3, 0, 0],[10, 3, 0, 0]]);
        map.push([]);
        player.x = 0 * 16;
        player.y = 9 * 16;
        break;
    case 4: //Level 5
        map.push("GGGGGGGGGGGGGGGGGGGG");
        map.push("GGGGGGGGGGGGGGGGGGGG");
        map.push("GGGGGGGGGGGGGGGGGGGG");
        map.push("GGGGGGGGGGGGGGGGGGGG");
        map.push("--------------------");
        map.push("GGGGGGGGGGGGGGGGGGGG");
        map.push("GGGGGGGGGGGGGGGGGGGG");
        map.push("GGGGGGGGGGGGGGGGGGGG");
        map.push("GGGGGGGGGGGGGGGGGGGG"); // Needs a water droplet on the lower half of the level somewhere.
        map.push("GGGGGGGGGGGGGGGGGGGG");
        map.push([0, 0]);
        map.push([]);
        map.push([[9, 7]]);
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
        map.push("------UUUDDD------GG");
        map.push("------UUUDDD------GG"); //Needs moving platforms on the first 3 U-flowing-lava-lines 
        map.push("------UUUDDD------GG"); //and on the first 3 D-flowing-lava-lines.
        map.push("------UUUDDDGG----GG");
        map.push("------UUUDDDGG----GG");
        map.push("------UUUDDDGG----GG"); //Needs water on the first G in this line.
        map.push("------UUUDDDGG----GG"); 
        map.push("GGGGGGUUUDDD------GG");
        map.push("GGGGGGUUUDDD---GG-GG");
        map.push("GGGGGGUUUDDDGG-GG-GG"); //Needs water on the fourth to last G in this line.
        map.push([19,0]);
        map.push([
            [6, 9, 40, 0], 
            [7, 9, 40, 0],
            [8, 9, 40, 0],
            [9, 0, 40, 0],
            [10, 0, 40, 0],
            [11, 0, 40, 0]
        ]);
        map.push([[13, 5], [15, 9]]);
        player.x = 0*16;
        player.y = 9*16;
        break;
    case 7: //Level 8
        map.push("----GGGGG-D---GG----"); //Needs water on the first and the second G of this line.
        map.push("----B-----D---GG----");
        map.push("----B-----D---GG----");
        map.push("----RRRRD-D---GG----"); //Needs a moving platform on the circular flowing lava.
        map.push("----U---D-D---GG----"); //Needs a moving platform on the line of D-flowing lava.
        map.push("----U---D-D---GG----");
        map.push("----ULLLL-D---------");
        map.push("----GG----D--G------");
        map.push("----GG----D--BG-----");
        map.push("----GG----DGGGG-----"); //Needs a water droplet on the first and fourth G of this line.
        map.push([15,0]);
        map.push([
        	[4,3,0,-60],
        	[10,0,60,-60]
        	]);
        map.push([[4,0],[5,0],[12,9],[13,9]]);
        player.x = 4*16;
        player.y = 9*16;
        break;
    case 8: //Level 9
        map.push("--DG--GG-G-GGGRRRDGG"); //Needs a moving platform on the D-flowing lava line (starts at [2,0])
        map.push("--DG--GG------U--DGG"); //Needs a water droplet on the first G in this line.
        map.push("--DG--GGRD----ULLLGG");
        map.push("GGDB--GGUD----------");
        map.push("--DB--GGUD----------"); //Needs a moving platform on the circular flowing lava spiral at the end
        map.push("--DB----UD----------"); // and the circular flowing lava spiral in the middle of the level.
        map.push("--DB----UD----------");
        map.push("--DB----UL----------");
        map.push("GGDB-GGGGG----------"); //Needs water on the fifth G in this line.
        map.push("GGDG-G--------------"); //Needs a water droplet on the first G in this line.
        map.push([19,0]);
        map.push([
        	[2,0,60,-60],
        	[14,0,0,-60],
        	[8,2,0,-60]
        	]);
        map.push([[0,3],[7,8],[0,8]]);
        player.x = 0*16;
        player.y = 9*16;
        break;
    case 9: //Level 10
        map.push("RRRRRRRRD---------GG");
        map.push("GGGGG---D---------GG"); //Needs a water droplet on both G's on this line.
        map.push("GGGGG---D-----------"); //Needs a water droplet on the first G of this line.
        map.push("--------D--RRDGGG---");
        map.push("--------DGGU-DGGG---");
        map.push("G-------DGGULLGGG---"); //Needs a water droplet on the first and third G of this line.
        map.push("BBGG----D-----------");
        map.push("GGGG--GGD-----------"); 
        map.push("GGGG--GGD-----------"); //Needs a water droplet on the 5th and 6th G on this line.
        map.push("GGGGBGBGD-----------"); //Needs a water droplet on the 5th G of this line.
        map.push([19,0]);
        map.push([
          [0,0,60,-60],
          [11,3,0,-60]
          ]);
        map.push([[4,1],[4,2],[3,2],[0,5],[10,4],[6,7],[7,7],[5,9]]);
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
        this.attachTime = 0;
    },

    onenterframe: function() {
        switch (this.c) {
        case 'M':
            var xPos = Math.floor((this.x + 8) / 16);
            var yPos = Math.floor((this.y + 8) / 16);
            if (map[yPos] == null || map[yPos][xPos] == null) {
                game.rootScene.removeChild(this);
                break;
            }
            var TileUnder = map[Math.floor((this.y + 8) / 16)][Math.floor((this.x + 8) / 16)];
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
                    this.attachTime = globalTimer;
                    player.onBlock.push(this);
                }
            }
            break;
        case 'B':
            if (this.ttl != null && this.ttl > 0) {
                if (this.ttl > 15)
		    this.image = game.assets['Breakingactive.png'];
		else if (this.ttl > 10)
		    this.image = game.assets['Breaking.png'];
		else if (this.ttl > 7)
		    this.image = game.assets['Breakingactive.png'];
                if (--this.ttl <= 0) {
                    this.image = game.assets['Lavasmall.png'];
                    this.c = '-';
                }
            }
            break;
        case 'W':
            if (this.intersect(player) && player.isHolding == null) {
                player.isHolding = this;
                player.isHolding.rotation = 0;
		this.c = 'w';
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
            if (player.onBlock.length == 0) {
                if (player.isHolding == null) {
                    LoadLevel(curLevel);
                    return true;
                }
                else {
                    block.c = 'G';
                    block.image = game.assets['Walkable.png'];
                    game.rootScene.removeChild(this.isHolding);
                    player.isHolding = null;
		    return true;
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
            taunts[Math.floor(Math.random() * 5 - 0.001)].play();
            LoadLevel(++curLevel);
            return true;
        }
    },

    checkBlocks: function() {
        var minX, maxX, minY, maxY;
        if (this.frame == 0) {
            minX = Math.floor(this.x / 16);
            minY = Math.floor((this.y + 5) / 16);
            maxX = Math.floor((this.x + 7) / 16);
            maxY = Math.floor((this.y + 12) / 16);
        }
        else {
            minX = Math.floor((this.x + 5) / 16);
            minY = Math.floor((this.y + 5) / 16);
            maxX = Math.floor((this.x + 12) / 16);
            maxY = Math.floor((this.y + 12) / 16);
        }
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

        var newest = -1;
        var newestBlock = null;
        var nextBlocks = [];
        for (var i = 0; i < this.onBlock.length; i++) {
            if (Math.abs(this.onBlock[i].x - this.x) > 16 || Math.abs(this.onBlock[i].y - this.y) > 16) {
                continue;
            }
            if (newest < 0 || this.onBlock[i].attachTime > newest) {
                newest = this.onBlock[i].attachTime;
                newestBlock = this.onBlock[i];
            }
            nextBlocks.push(this.onBlock[i]);
        }
        this.onBlock = nextBlocks;
        
        if (newestBlock != null) {
            this.x += newestBlock.dx;
            this.y += newestBlock.dy;
        }
        
        this.checkBlocks();

        if (this.isHolding != null) {
            this.isHolding.image = game.assets['WaterSwirl0.png'];
            this.isHolding.rotation += 10;
            this.isHolding.x = this.x - 2;
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
        'WaterDrop.png',
        'WaterSwirl0.png',
        'Breakingactive.png',
	'Ladder.png',
        'credits.png',
        'SuccessLowRes.png'
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

            if (credits != null) {
                var now = new Date().getTime();
                var dT = now - creditsStarted - 5750;
                if (dT > 0) {
                    if (dT >= 46500) {
                        var banner = new Sprite(320, 160);
                        banner.image = game.assets['SuccessLowRes.png'];
                    }
                    else {
                        var tween = dT / 46500.0;
                        credits.y = (-1000 - stgHeight) * tween;
                    }
                }
            }

            globalTimer++;
        });
    }
    game.start(); //Begin the game
}
