var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

//----------------------------------------------------------------------------------------
// load resources

function preload() {
    game.load.spritesheet('ship', 'assets/ship.png', 80, 96);
    game.load.image('bg', 'assets/water1.png');
    game.load.audio('completeMusic', ['assets/Level_Clear.mp3']);
    game.load.audio('gameoverMusic', ['assets/Game_Over.mp3']);
    game.load.audio('gameMusic', ['assets/Pirates_Of_The_Caribbean.mp3']);
}

//----------------------------------------------------------------------------------------
// global variables

var background;
var fireButton = null;

var cursors;
var ship;

var music;
var lost = false;
var won = false;

function quitGame() {
    //  Here you should destroy anything you no longer need.
    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
}

//----------------------------------------------------------------------------------------

function create() {

    // Add music
    music = game.add.audio('gameMusic');
    music.loop = true;
    music.play();
    
    gameover = game.add.audio('gameoverMusic');
    complete = game.add.audio('completeMusic');
    
    //------------------------------------------------------------------------------------

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //------------------------------------------------------------------------------------
    
    //  Resize our game world to be a 2000 x 2000 square
    //game.world.setBounds(-1000, -1000, 2048, 2048);

    //  A simple background for our game
    background = game.add.sprite( 0, 0, 'bg' );
    //background = game.add.tileSprite(0, 0, 800, 600, 'bg');

    //------------------------------------------------------------------------------------

   	// Create a player and ship sprite at X,Y
    ship = game.add.sprite(70, game.world.height-84, 'ship');
    
    // Anchor the sprites at their center, as opposed to its top-left corner.
    // so it will be truly centered.
    ship.anchor.setTo( 0.5, 0.5 );
    
    //  We need to enable physics on the ship
    game.physics.arcade.enable(ship);
    ship.enableBody = true;
    ship.body.collideWorldBounds = true;
    
    //  Our two animations, walking left and right.
    ship.animations.add('down', [0, 1, 2, 3], 10, true);
    ship.animations.add('left', [4, 5, 6, 7], 10, true);
    ship.animations.add('right', [8, 9, 10, 11], 10, true);
    ship.animations.add('up', [12, 13, 14, 15], 10, true);
    
    //  This sets the image bounce energy for the horizontal 
    //  and vertical vectors (as an x,y point). "1" is 100% energy return
    ship.body.bounce.setTo(1, 1);

	//------------------------------------------------------------------------------------

    //  And some controls to play the game with
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    
    //------------------------------------------------------------------------------------
    
    restartButton = game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
    
}

//----------------------------------------------------------------------------------------

//function update() {}

function update() {

	//  Reset the players velocity (movement)
    ship.body.velocity.x = 0;
    ship.body.velocity.y = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        ship.body.velocity.setTo(-100, 0);
        ship.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        ship.body.velocity.setTo(100, 0);
        ship.animations.play('right');
    }
    else if (cursors.up.isDown)
    {
        //  Move up
        ship.body.velocity.setTo(0, -100);
        ship.animations.play('up');
    }
    else if (cursors.down.isDown)
    {
        //  Move down
        ship.body.velocity.setTo(0, 100);
        ship.animations.play('down');
    }
    else
    {
    //  Stand still
    ship.animations.stop();
    ship.body.velocity.setTo(0, 0);
    }
}

//----------------------------------------------------------------------------------------
