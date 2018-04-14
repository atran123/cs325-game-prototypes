var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

//----------------------------------------------------------------------------------------
// load resources

function preload() {
    game.load.spritesheet('cards', 'assets/cards.gif', 81, 81);
    game.load.image('bg', 'assets/wood.jpg');
    game.load.audio('completeMusic', ['assets/Level_Clear.mp3']);
    game.load.audio('gameoverMusic', ['assets/Game_Over.mp3']);
    game.load.audio('gameMusic', ['assets/casino.mp3']);
}

//----------------------------------------------------------------------------------------
// global variables

var background;
var i, j, k;

var music;
var complete = false;

var card = [];
var series = [0,1,2,3,4,5,6,7];

var movesText;
var moves;

//----------------------------------------------------------------------------------------
function quitGame() {
    //  Here you should destroy anything you no longer need.
    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
}
//----------------------------------------------------------------------------------------

function create() {

	var random = [];
	var range = [0,1,2,3,4,5,6,7,8];

    // Add music
    music = game.add.audio('gameMusic');
    music.loop = true;
    music.play();
    
    gameover = game.add.audio('gameoverMusic');
    complete = game.add.audio('completeMusic');
    
    moves = 0;
    
    //------------------------------------------------------------------------------------
    // Random frames for the cards
	/*
    for (i=0; i<8; i++){
   		randIndex = Math.floor(Math.random()*range.length);
    	random[i] = range[randIndex];
    	range.splice(randIndex, 1);
   	}*/
   	
   	random[0] = 0;
   	random[1] = 1;
	random[2] = 2;
	random[3] = 3;
	random[4] = 4;
	random[5] = 5;
	random[6] = 6;
	random[7] = 7;
   	random[8] = 52;
    
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
   	
   	card[0][0] = game.add.sprite(310, game.world.height-364, 'cards',random[0]);
   	card[0][1] = game.add.sprite(310+83, game.world.height-364, 'cards',random[1]);
   	card[0][2] = game.add.sprite(310+83*2, game.world.height-364, 'cards',random[2]);
   	
   	card[1][0] = game.add.sprite(310, game.world.height-282, 'cards',random[3]);
   	card[1][1] = game.add.sprite(310+83, game.world.height-282, 'cards',random[4]);
   	card[1][2] = game.add.sprite(310+83*2, game.world.height-282, 'cards',random[5]);
   	
   	card[2][0] = game.add.sprite(310, game.world.height-200, 'cards',random[6]);
   	card[2][1] = game.add.sprite(310+83, game.world.height-200, 'cards',random[7]);
   	card[2][2] = game.add.sprite(310+83*2, game.world.height-200, 'cards',random[8]);
   	
   	for (i=0; i<3; i++)
   		for (j=0; j<3; j++)
			card[i][j].anchor.setTo(0.5,0.5);
			
	// randomize
	for (k=0; k<1000000; k++){
		randI = Math.floor(Math.random()*3);
		randJ = Math.floor(Math.random()*3);
		randomizer(card[randI][randJ]);
	}
   	
   	// enable input and click events on cards
   	for (i=0; i<3; i++){
   		for (j=0; j<3; j++){
			card[i][j].inputEnabled = true;
			card[i][j].events.onInputDown.add(listener, this);
   		}
   	}
   	
   	movesText = game.add.text(game.world.centerX-100, 20, 'Moves: 0', { fontSize: '40px', fill: '#fF0', align: "center"  });
   	text = game.add.text(game.world.centerX-350, 100, '', { fontSize: '40px', fill: '#228bff', align: "center"  });
   	
	//------------------------------------------------------------------------------------
	
   	//------------------------------------------------------------------------------------
    
    //------------------------------------------------------------------------------------
    
    restartButton = game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
    
    //------------------------------------------------------------------------------------
    
    
}

//----------------------------------------------------------------------------------------

//function update() {}

function update() {

	movesText.text = "Moves: " + moves;
    
    //the "click to restart" handler
    //game.input.onTap.addOnce(function() { resetScores();music.stop();game.state.restart();}, this);
    
    if (complete === true){
        //the "press ENTER to restart" handler
        if (restartButton.isDown) {resetScores();game.state.restart();}
    }
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
		complete = true;
		text.text = "COMPLETED! Press ENTER to restart";
		for (i=0; i<3; i++){
			for (j=0; j<3; j++){
				card[i][j].inputEnabled = false;
   			}
   		}
	}
}

function randomizer(sprite){

	if (sprite == card[0][0]){
		if (card[0][1].animations.frame == 52){
			card[0][1].animations.frame = card[0][0].animations.frame;
			card[0][0].animations.frame = 52;
		}
		else if (card[1][0].animations.frame == 52){
			card[1][0].animations.frame = card[0][0].animations.frame;
			card[0][0].animations.frame = 52;
		}
	} 
	
	else if (sprite == card[0][1]){
		if (card[0][0].animations.frame == 52){
			card[0][0].animations.frame = card[0][1].animations.frame;
			card[0][1].animations.frame = 52;
		}
		else if (card[1][1].animations.frame == 52){
			card[1][1].animations.frame = card[0][1].animations.frame;
			card[0][1].animations.frame = 52;
		}
		else if (card[0][2].animations.frame == 52){
			card[0][2].animations.frame = card[0][1].animations.frame;
			card[0][1].animations.frame = 52;
		}
	}
	
	else if (sprite == card[0][2]){
		if (card[0][1].animations.frame == 52){
			card[0][1].animations.frame = card[0][2].animations.frame;
			card[0][2].animations.frame = 52;
		}
		else if (card[1][2].animations.frame == 52){
			card[1][2].animations.frame = card[0][2].animations.frame;
			card[0][2].animations.frame = 52;
		}
	}
	
	else if (sprite == card[1][0]){
		if (card[1][1].animations.frame == 52){
			card[1][1].animations.frame = card[1][0].animations.frame;
			card[1][0].animations.frame = 52;
		}
		else if (card[0][0].animations.frame == 52){
			card[0][0].animations.frame = card[1][0].animations.frame;
			card[1][0].animations.frame = 52;
		}
		else if (card[2][0].animations.frame == 52){
			card[2][0].animations.frame = card[1][0].animations.frame;
			card[1][0].animations.frame = 52;
		}
	}
	
	else if (sprite == card[1][1]){
		if (card[1][0].animations.frame == 52){
			card[1][0].animations.frame = card[1][1].animations.frame;
			card[1][1].animations.frame = 52;
		}
		else if (card[1][2].animations.frame == 52){
			card[1][2].animations.frame = card[1][1].animations.frame;
			card[1][1].animations.frame = 52;
		}
		else if (card[0][1].animations.frame == 52){
			card[0][1].animations.frame = card[1][1].animations.frame;
			card[1][1].animations.frame = 52;
		}
		else if (card[2][1].animations.frame == 52){
			card[2][1].animations.frame = card[1][1].animations.frame;
			card[1][1].animations.frame = 52;
		}
	}
	
	else if (sprite == card[1][2]){
		if (card[0][2].animations.frame == 52){
			card[0][2].animations.frame = card[1][2].animations.frame;
			card[1][2].animations.frame = 52;
		}
		else if (card[1][1].animations.frame == 52){
			card[1][1].animations.frame = card[1][2].animations.frame;
			card[1][2].animations.frame = 52;
		}
		else if (card[2][2].animations.frame == 52){
			card[2][2].animations.frame = card[1][2].animations.frame;
			card[1][2].animations.frame = 52;
		}
	}
	else if (sprite == card[2][0]){
		if (card[1][0].animations.frame == 52){
			card[1][0].animations.frame = card[2][0].animations.frame;
			card[2][0].animations.frame = 52;
		}
		else if (card[2][1].animations.frame == 52){
			card[2][1].animations.frame = card[2][0].animations.frame;
			card[2][0].animations.frame = 52;
		}
	}
	
	else if (sprite == card[2][1]){
		if (card[2][0].animations.frame == 52){
			card[2][0].animations.frame = card[2][1].animations.frame;
			card[2][1].animations.frame = 52;
		}
		else if (card[1][1].animations.frame == 52){				
			card[1][1].animations.frame = card[2][1].animations.frame;
			card[2][1].animations.frame = 52;
		}
		else if (card[2][2].animations.frame == 52){
			card[2][2].animations.frame = card[2][1].animations.frame;
			card[2][1].animations.frame = 52;
		}
	}
	
	else if (sprite == card[2][2]){
		if (card[2][1].animations.frame == 52){
			card[2][1].animations.frame = card[2][2].animations.frame;
			card[2][2].animations.frame = 52;
		}
		else if (card[1][2].animations.frame == 52){
			card[1][2].animations.frame = card[2][2].animations.frame;
			card[2][2].animations.frame = 52;
		}
	}
}

function resetScores(){
    moves = 0;
}






