var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

//----------------------------------------------------------------------------------------
// load resources

function preload() {
    game.load.spritesheet('cards', 'assets/cards.gif', 50.69, 73.6);
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
var i,x,y;

var music;
var lost = false;
var won = false;

var text;

var nums = new Set();


function quitGame() {
    //  Here you should destroy anything you no longer need.
    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
}

//----------------------------------------------------------------------------------------

function create() {

	var text = "";
	
	var random = [];
	var card = [];
	var range = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
			21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,
			41,42,43,44,45,46,47,48,49,50,51];

    // Add music
    music = game.add.audio('gameMusic');
    music.loop = true;
    music.play();
    
    gameover = game.add.audio('gameoverMusic');
    complete = game.add.audio('completeMusic');
    
    //------------------------------------------------------------------------------------
    // Random frames for the cards
	
    for (i=0; i<52; i++){
   		randIndex = Math.floor(Math.random()*range.length);
    	random[i] = range[randIndex];
    	range.splice(randIndex, 1);
   	}
    
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
   	
    
   	for (i=0; i<13; i++){
   		card[i] = game.add.sprite(40+60*i, game.world.height-60, 'cards',random[i]);
   		// Anchor the sprites at their center, as opposed to its top-left corner.
   		// so they will be truly centered.
   		card[i].anchor.setTo( 0.5, 0.5 );
   	}
   	
   	for (i=13; i<26; i++){
   		card[i] = game.add.sprite(40+60*(i-13), game.world.height-150, 'cards',random[i]);
   		// Anchor the sprites at their center, as opposed to its top-left corner.
   		// so they will be truly centered.
   		card[i].anchor.setTo( 0.5, 0.5 );
   	}
   	
   	for (i=26; i<39; i++){
   		card[i] = game.add.sprite(40+60*(i-26), game.world.height-240, 'cards',random[i]);
   		// Anchor the sprites at their center, as opposed to its top-left corner.
   		// so they will be truly centered.
   		card[i].anchor.setTo( 0.5, 0.5 );
   	}
   	
   	for (i=39; i<52; i++){
   		card[i] = game.add.sprite(40+60*(i-39), game.world.height-330, 'cards',random[i]);
   		// Anchor the sprites at their center, as opposed to its top-left corner.
   		// so they will be truly centered.
   		card[i].anchor.setTo( 0.5, 0.5 );
   	}
   	
   	for (i=0; i<52; i++){
   		text = text + " " + random[i];
   	}
   	
   	game.add.text(0, 20, text, { fontSize: '11px', fill: '#ff0' });
   	
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
