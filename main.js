enchant(); //the magic words that start enchant.js
//Stage Variables
var moveSpeed = 4;
var health = 5;
var stgWidth = 320;
var stgHeight = 320;
var map = [];


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

    onenterframe: function() {
        
        //03 Player Controls
        console.log(map[0][0]);
        this.lastDirection[0] = 0;
        this.lastDirection[1] = 0;
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
        if (map[Math.floor(this.y / 16) - 1][Math.floor((this.x + this.lastDirection[0]) / 16)] != 0)
            this.x += this.lastDirection[0];
        if (map[Math.floor((this.y + this.lastDirection[1]) / 16)][Math.floor(this.x / 16)] != 0)
            this.y += this.lastDirection[1];
        
        //04 Mouse Update
    }
});

//05 Gem Class
// Gem = Class.create(Sprite, {
//     initialize: function() {
//         Sprite.call(this, 16, 16);
//         this.image = game.assets['diamond-sheet.png'];
//     },

//     onenterframe: function() {

//         //Rotating using scaleX
        
//         //07 Collision Check
//     }
// });

// //08 Bomb Class
// Bomb = Class.create(Sprite, {
//     initialize: function() {
//         Sprite.call(this, 16, 16);
//         this.image = game.assets['icon0.png'];
//         this.x = Math.random() * (stgWidth - 16);
//         this.y = Math.random() * (stgHeight - 16); //Account for the bottom part
//         if (this.y < 50) {
//             this.y = 50;
//         }

//         this.frame = 24;
//     },

//     onenterframe: function() {
//         if (this.age === 60) {
//             game.rootScene.removeChild(this);
//         }

//         if (this.intersect(player)) {
//             player.health--;
//             game.rootScene.removeChild(this);
//             console.log("ouch!");
//         }

//         if (this.age % 10 === 0) {
//             if (this.frame === 25) {
//                 this.frame = 24;
//             } else {
//                 this.frame++;
//             }
//         }
//     }

// });


//Begin game code
window.onload = function() {
    game = new Game(stgWidth, stgHeight);
    //Preload images
    //Any resources not preloaded will not appear
    game.preload('icon0.png', 'diamond-sheet.png', 'bg.png', 'Lavasmall.png', 'Walkable.png');

    game.onload = function() { //Prepares the game
        //01 Add Background
        map.push([0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
        map.push([0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
        console.log(map);
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
                //02 Add Player
        player = new Player();
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
