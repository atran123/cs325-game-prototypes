var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

//----------------------------------------------------------------------------------------
// load resources

function preload() {
    game.load.spritesheet('cards', 'assets/cards.gif', 81, 81);
    game.load.image('bg', 'assets/wood.jpg');
    game.load.image('restart', 'assets/restart.png');
    game.load.audio('completeMusic', ['assets/Level_Clear.mp3']);
    game.load.audio('gameoverMusic', ['assets/Game_Over.mp3']);
    game.load.audio('gameMusic', ['assets/casino.mp3']);
}

//----------------------------------------------------------------------------------------
// global variables

var i, j, k;

var background;
var music;

var card = [];
var goal = [];

var emptySquare;

var movesText, goalText, text;

var moves;
var restartButton;

//----------------------------------------------------------------------------------------
function quitGame() {
    //  Here you should destroy anything you no longer need.
    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
}
//----------------------------------------------------------------------------------------

function create() {

	var range = [0,1,2,3,4,5,6,7,8];

    // Add music
    music = game.add.audio('gameMusic');
    music.loop = true;
    music.play();
    
    gameover = game.add.audio('gameoverMusic');
    complete = game.add.audio('completeMusic');
    
    moves = 0;
    
    //------------------------------------------------------------------------------------
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //------------------------------------------------------------------------------------
    //  Resize our game world to be a 2000 x 2000 square
    //game.world.setBounds(-1000, -1000, 2048, 2048);

    //  A simple background for our game
    background = game.add.sprite( 0, 0, 'bg' );

    //------------------------------------------------------------------------------------
   	// Create player card sprites
   	
   	for (i=0; i<3; i++){
   		card[i]= new Array(3);
   	}
   	
   	card[0][0] = game.add.sprite(100, game.world.height-404, 'cards',0);
   	card[0][1] = game.add.sprite(100+83, game.world.height-404, 'cards',1);
   	card[0][2] = game.add.sprite(100+83*2, game.world.height-404, 'cards',2);
   	
   	card[1][0] = game.add.sprite(100, game.world.height-322, 'cards',3);
   	card[1][1] = game.add.sprite(100+83, game.world.height-322, 'cards',4);
   	card[1][2] = game.add.sprite(100+83*2, game.world.height-322, 'cards',5);
   	
   	card[2][0] = game.add.sprite(100, game.world.height-240, 'cards',6);
   	card[2][1] = game.add.sprite(100+83, game.world.height-240, 'cards',7);
   	card[2][2] = game.add.sprite(100+83*2, game.world.height-240, 'cards',52);
   	
   	for (i=0; i<3; i++)
   		for (j=0; j<3; j++)
			card[i][j].anchor.setTo(0.5,0.5);
			
	// randomize
	emptySquare = card[2][2];
	for (k=0; k<100000; k++){
		randomizer();
	}
   	
   	// enable input and click events on cards
   	for (i=0; i<3; i++){
   		for (j=0; j<3; j++){
			card[i][j].inputEnabled = true;
			card[i][j].events.onInputDown.add(listener, this);
   		}
   	}
   	
   	//------------------------------------------------------------------------------------
   	// Create goal sprites
   	
   	goal[0] = game.add.sprite(530, game.world.height-404, 'cards',26);
   	goal[1] = game.add.sprite(530+83, game.world.height-404, 'cards',27);
   	goal[2] = game.add.sprite(530+83*2, game.world.height-404, 'cards',28);
   	
   	goal[3] = game.add.sprite(530, game.world.height-322, 'cards',29);
   	goal[4] = game.add.sprite(530+83, game.world.height-322, 'cards',30);
   	goal[5] = game.add.sprite(530+83*2, game.world.height-322, 'cards',31);
   	
   	goal[6] = game.add.sprite(530, game.world.height-240, 'cards',32);
   	goal[7] = game.add.sprite(530+83, game.world.height-240, 'cards',33);
   	goal[8] = game.add.sprite(530+83*2, game.world.height-240, 'cards',52);
   	
   	for (i=0; i<9; i++)
		goal[i].anchor.setTo(0.5,0.5);
		
	//------------------------------------------------------------------------------------
		
	restartButton = game.add.sprite(322, game.world.height-80, 'restart');
	restartButton.inputEnabled = true;
	restartButton.events.onInputDown.add(clickToRestart, this);
   	
   	//------------------------------------------------------------------------------------
   	
   	movesText = game.add.text(game.world.centerX-300, 50, 'Moves: 0', { fontSize: '40px', fill: '#fF0', align: "center"  });
   	goalText = game.add.text(game.world.centerX+165, 50, 'Goal', { fontSize: '40px', fill: '#EE0000', align: "center"  });
   	text = game.add.text(game.world.centerX-360, 460, '', { fontSize: '40px', fill: '#228bff', align: "center"  });
   	
	//------------------------------------------------------------------------------------
	
    //restartButton = game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
    
}

//----------------------------------------------------------------------------------------

function update() {
	movesText.text = "Moves: " + moves;
}

//----------------------------------------------------------------------------------------

function listener (sprite) {

	if (sprite == card[0][0]){
		if (card[0][1].animations.frame == 52){
			card[0][1].animations.frame = card[0][0].animations.frame;
			card[0][0].animations.frame = 52;
			moves++;
		}
		else if (card[1][0].animations.frame == 52){
			card[1][0].animations.frame = card[0][0].animations.frame;
			card[0][0].animations.frame = 52;
			moves++;
		}
	} 
	
	else if (sprite == card[0][1]){
		if (card[0][0].animations.frame == 52){
			card[0][0].animations.frame = card[0][1].animations.frame;
			card[0][1].animations.frame = 52;
			moves++;
		}
		else if (card[1][1].animations.frame == 52){
			card[1][1].animations.frame = card[0][1].animations.frame;
			card[0][1].animations.frame = 52;
			moves++;
		}
		else if (card[0][2].animations.frame == 52){
			card[0][2].animations.frame = card[0][1].animations.frame;
			card[0][1].animations.frame = 52;
			moves++;
		}
	}
	
	else if (sprite == card[0][2]){
		if (card[0][1].animations.frame == 52){
			card[0][1].animations.frame = card[0][2].animations.frame;
			card[0][2].animations.frame = 52;
			moves++;
		}
		else if (card[1][2].animations.frame == 52){
			card[1][2].animations.frame = card[0][2].animations.frame;
			card[0][2].animations.frame = 52;
			moves++;
		}
	}
	
	else if (sprite == card[1][0]){
		if (card[1][1].animations.frame == 52){
			card[1][1].animations.frame = card[1][0].animations.frame;
			card[1][0].animations.frame = 52;
			moves++;
		}
		else if (card[0][0].animations.frame == 52){
			card[0][0].animations.frame = card[1][0].animations.frame;
			card[1][0].animations.frame = 52;
			moves++;
		}
		else if (card[2][0].animations.frame == 52){
			card[2][0].animations.frame = card[1][0].animations.frame;
			card[1][0].animations.frame = 52;
			moves++;
		}
	}
	
	else if (sprite == card[1][1]){
		if (card[1][0].animations.frame == 52){
			card[1][0].animations.frame = card[1][1].animations.frame;
			card[1][1].animations.frame = 52;
			moves++;
		}
		else if (card[1][2].animations.frame == 52){
			card[1][2].animations.frame = card[1][1].animations.frame;
			card[1][1].animations.frame = 52;
			moves++;
		}
		else if (card[0][1].animations.frame == 52){
			card[0][1].animations.frame = card[1][1].animations.frame;
			card[1][1].animations.frame = 52;
			moves++;
		}
		else if (card[2][1].animations.frame == 52){
			card[2][1].animations.frame = card[1][1].animations.frame;
			card[1][1].animations.frame = 52;
			moves++;
		}
	}
	
	else if (sprite == card[1][2]){
		if (card[0][2].animations.frame == 52){
			card[0][2].animations.frame = card[1][2].animations.frame;
			card[1][2].animations.frame = 52;
			moves++;
		}
		else if (card[1][1].animations.frame == 52){
			card[1][1].animations.frame = card[1][2].animations.frame;
			card[1][2].animations.frame = 52;
			moves++;
		}
		else if (card[2][2].animations.frame == 52){
			card[2][2].animations.frame = card[1][2].animations.frame;
			card[1][2].animations.frame = 52;
			moves++;
		}
	}
	else if (sprite == card[2][0]){
		if (card[1][0].animations.frame == 52){
			card[1][0].animations.frame = card[2][0].animations.frame;
			card[2][0].animations.frame = 52;
			moves++;
		}
		else if (card[2][1].animations.frame == 52){
			card[2][1].animations.frame = card[2][0].animations.frame;
			card[2][0].animations.frame = 52;
			moves++;
		}
	}
	
	else if (sprite == card[2][1]){
		if (card[2][0].animations.frame == 52){
			card[2][0].animations.frame = card[2][1].animations.frame;
			card[2][1].animations.frame = 52;
			moves++;
		}
		else if (card[1][1].animations.frame == 52){				
			card[1][1].animations.frame = card[2][1].animations.frame;
			card[2][1].animations.frame = 52;
			moves++;
		}
		else if (card[2][2].animations.frame == 52){
			card[2][2].animations.frame = card[2][1].animations.frame;
			card[2][1].animations.frame = 52;
			moves++;
		}
	}
	
	else if (sprite == card[2][2]){
		if (card[2][1].animations.frame == 52){
			card[2][1].animations.frame = card[2][2].animations.frame;
			card[2][2].animations.frame = 52;
			moves++;
		}
		else if (card[1][2].animations.frame == 52){
			card[1][2].animations.frame = card[2][2].animations.frame;
			card[2][2].animations.frame = 52;
			moves++;
		}
	}
	
	if ((card[0][0].animations.frame == 0) && (card[0][1].animations.frame == 1) 
		&& (card[0][2].animations.frame == 2) && (card[1][0].animations.frame == 3) 
		&& (card[1][1].animations.frame == 4) && (card[1][2].animations.frame == 5) 
		&& (card[2][0].animations.frame == 6) && (card[2][1].animations.frame == 7)){

		text.text = "COMPLETED! Click 'Restart' to restart";
		for (i=0; i<3; i++){
			for (j=0; j<3; j++){
				card[i][j].inputEnabled = false;
   			}
   		}
	}
}

//----------------------------------------------------------------------------------------

function randomizer(){

	var random1 = Math.floor(Math.random()*2);
	var random2 = Math.floor(Math.random()*3);
	var random3 = Math.floor(Math.random()*2);
	var random4 = Math.floor(Math.random()*3);
	var random5 = Math.floor(Math.random()*4);
	var random6 = Math.floor(Math.random()*3);
	var random7 = Math.floor(Math.random()*2);
	var random8 = Math.floor(Math.random()*3);
	var random9 = Math.floor(Math.random()*2);
	
	if (emptySquare == card[0][0]){
		if (random1 == 0){
			card[0][0].animations.frame = card[0][1].animations.frame;
			card[0][1].animations.frame = 52;
			emptySquare = card[0][1];
		}
		else if (random1 == 1){
			card[0][0].animations.frame = card[1][0].animations.frame;
			card[1][0].animations.frame = 52;
			emptySquare = card[1][0];
		}
	} 
	
	else if (emptySquare == card[0][1]){
		if (random2 == 0){
			card[0][1].animations.frame = card[0][2].animations.frame;
			card[0][2].animations.frame = 52;
			emptySquare = card[0][2];
		}
		else if (random2 == 1){
			card[0][1].animations.frame = card[1][1].animations.frame;
			card[1][1].animations.frame = 52;
			emptySquare = card[1][1];
		}
		if (random2 == 2){
			card[0][1].animations.frame = card[0][0].animations.frame;
			card[0][0].animations.frame = 52;
			emptySquare = card[0][0];
		}
	}
	
	else if (emptySquare == card[0][2]){
		if (random3 == 0){
			card[0][2].animations.frame = card[1][2].animations.frame;
			card[1][2].animations.frame = 52;
			emptySquare = card[1][2];
		}
		else if (random3 == 1){
			card[0][2].animations.frame = card[0][1].animations.frame;
			card[0][1].animations.frame = 52;
			emptySquare = card[0][1];
		}
		
	}
	
	else if (emptySquare == card[1][0]){
		if (random4 == 0){
			card[1][0].animations.frame = card[0][0].animations.frame;
			card[0][0].animations.frame = 52;
			emptySquare = card[0][0];
		}
		else if (random4 == 1){
			card[1][0].animations.frame = card[1][1].animations.frame;
			card[1][1].animations.frame = 52;
			emptySquare = card[1][1];
		}
		else if (random4 == 2){
			card[1][0].animations.frame = card[2][0].animations.frame;
			card[2][0].animations.frame = 52;
			emptySquare = card[2][0];
		}
	}
	
	else if (emptySquare == card[1][1]){
		if (random5 == 0){
			card[1][1].animations.frame = card[1][0].animations.frame;
			card[1][0].animations.frame = 52;
			emptySquare = card[1][0];
		}
		else if (random5 == 1){
			card[1][1].animations.frame = card[0][1].animations.frame;
			card[0][1].animations.frame = 52;
			emptySquare = card[0][1];
		}
		else if (random5 == 2){
			card[1][1].animations.frame = card[1][2].animations.frame;
			card[1][2].animations.frame = 52;
			emptySquare = card[1][2];
		}
		else if (random5 == 3){
			card[1][1].animations.frame = card[2][1].animations.frame;
			card[2][1].animations.frame = 52;
			emptySquare = card[2][1];
		}
	}
	
	else if (emptySquare == card[1][2]){
		if (random6 == 0){
			card[1][2].animations.frame = card[2][2].animations.frame;
			card[2][2].animations.frame = 52;
			emptySquare = card[2][2];
		}
		else if (random6 == 1){
			card[1][2].animations.frame = card[1][1].animations.frame;
			card[1][1].animations.frame = 52;
			emptySquare = card[1][1];
		}
		else if (random6 == 2){
			card[1][2].animations.frame = card[0][2].animations.frame;
			card[0][2].animations.frame = 52;
			emptySquare = card[0][2];
		}
		
	}
	else if (emptySquare == card[2][0]){
		if (random7 == 0){
			card[2][0].animations.frame = card[1][0].animations.frame;
			card[1][0].animations.frame = 52;
			emptySquare = card[1][0];
		}
		else if (random7 == 1){
			card[2][0].animations.frame = card[2][1].animations.frame;
			card[2][1].animations.frame = 52;
			emptySquare = card[2][1];
		}
	}
	
	else if (emptySquare == card[2][1]){
		if (random8 == 0){
			card[2][1].animations.frame = card[2][0].animations.frame;
			card[2][0].animations.frame = 52;
			emptySquare = card[2][0];
		}
		else if (random8 == 1){				
			card[2][1].animations.frame = card[1][1].animations.frame;
			card[1][1].animations.frame = 52;
			emptySquare = card[1][1];
		}
		else if (random8 == 2){
			card[2][1].animations.frame = card[2][2].animations.frame;
			card[2][2].animations.frame = 52;
			emptySquare = card[2][2];
		}
	}
	
	else if (emptySquare == card[2][2]){
		if (random9 == 0){
			card[2][2].animations.frame = card[2][1].animations.frame;
			card[2][1].animations.frame = 52;
			emptySquare = card[2][1];
		}
		else if (random9 == 1){
			card[2][2].animations.frame = card[1][2].animations.frame;
			card[1][2].animations.frame = 52;
			emptySquare = card[1][2];
		}
	}
	
}

//----------------------------------------------------------------------------------------

function clickToRestart(){
	resetScores();
	music.stop();
	game.state.restart();
}

//----------------------------------------------------------------------------------------

function resetScores(){
    moves = 0;
}






