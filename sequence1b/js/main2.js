var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

//----------------------------------------------------------------------------------------
// load resources

function preload() {
    game.load.spritesheet('cards', 'assets/cards.gif', 81, 117.4);
    game.load.image('bg', 'assets/table.jpg');
    game.load.audio('completeMusic', ['assets/Level_Clear.mp3']);
    game.load.audio('gameoverMusic', ['assets/Game_Over.mp3']);
    game.load.audio('gameMusic', ['assets/casino.mp3']);
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

var random = [];

var score1, score2, score3, score4, score5, score6;
var compScore, playerScore;

var random1, random2, random3, random4, random5, random6;

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
    // Random frames for the cards
    
    random[0] = Math.floor(Math.random() * 52);
    random[1] = Math.floor(Math.random() * 52);
    random[2] = Math.floor(Math.random() * 52);
    random[3] = Math.floor(Math.random() * 52);
    random[4] = Math.floor(Math.random() * 52);
    random[5] = Math.floor(Math.random() * 52);
    
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
   	// Create player card sprites
    card1 = game.add.sprite(110, game.world.height-84, 'cards',random[0]);
    card2 = game.add.sprite(200, game.world.height-84, 'cards',random[1]);
    card3 = game.add.sprite(290, game.world.height-84, 'cards',random[2]);
    
    // Create computer card sprites
    card4 = game.add.sprite(110, 84, 'cards', random[3]);
    card5 = game.add.sprite(200, 84, 'cards', random[4]);
    card6 = game.add.sprite(290, 84, 'cards', random[5]);
	
    // Anchor the sprites at their center, as opposed to its top-left corner.
    // so it will be truly centered.
    card1.anchor.setTo( 0.5, 0.5 );
    card2.anchor.setTo( 0.5, 0.5 );
    card3.anchor.setTo( 0.5, 0.5 );
    
    card4.anchor.setTo( 0.5, 0.5 );
    card5.anchor.setTo( 0.5, 0.5 );
    card6.anchor.setTo( 0.5, 0.5 );
    
    //------------------------------------------------------------------------------------
    //  The scores texts
    //compScoreText = game.add.text(400, 20, "COMPUTER'S SCORE: 0", { fontSize: '30px', fill: '#f40' });
    compScoreText = game.add.text(400, 20, "COMPUTER'S SCORE: 0", { fontSize: '30px', fill: '#ff0' });
    playerScoreText = game.add.text(400, game.world.height-60, "YOUR SCORE: 0", { fontSize: '30px', fill: '#f40' });
	//------------------------------------------------------------------------------------
	
    //  The scores
	gameText = game.add.text( game.world.centerX-200, game.world.height-340, "", { fontSize: '24px', fill: '#00FFFF', align: "center" } );

	//------------------------------------------------------------------------------------
    //  And some controls to play the game with
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    
    //------------------------------------------------------------------------------------
    
    restartButton = game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
    
    //------------------------------------------------------------------------------------
    
    
}

//----------------------------------------------------------------------------------------

//function update() {}

function update() {
    
    //the "click to restart" handler
    //game.input.onTap.addOnce(function() { resetScores();music.stop();game.state.restart();}, this);
    game.input.onTap.addOnce(function() { game.state.restart();}, this);
}

//----------------------------------------------------------------------------------------
