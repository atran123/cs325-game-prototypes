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
    random1 = Math.floor(Math.random() * 52);
    random2 = Math.floor(Math.random() * 52);
    random3 = Math.floor(Math.random() * 52);
    random4 = Math.floor(Math.random() * 52);
    random5 = Math.floor(Math.random() * 52);
    random6 = Math.floor(Math.random() * 52);
    
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
    card1 = game.add.sprite(110, game.world.height-84, 'cards',random1);
    card2 = game.add.sprite(200, game.world.height-84, 'cards',random2);
    card3 = game.add.sprite(290, game.world.height-84, 'cards',random3);
    
    // Create computer card sprites
    card4 = game.add.sprite(110, 84, 'cards', random4);
    card5 = game.add.sprite(200, 84, 'cards', random5);
    card6 = game.add.sprite(290, 84, 'cards', random6);
	
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
    //  The scores
    if ((random1 >=0) && (random1 <=8))
    	score1 = random1 +2;
    else if ((random1 >=13) && (random1 <=21))
    	score1 = random1 -11;
    else if ((random1 >=26) && (random1 <=34))
    	score1 = random1 -24;
    else if ((random1 >=39) && (random1 <=47))
    	score1 = random1 -37;
    else if ((random1 == 9) || (random1 == 10) || (random1 == 11)
    		|| (random1 == 22) || (random1 == 23) || (random1 == 24)
    		|| (random1 == 35) || (random1 == 36) || (random1 == 37)
    		|| (random1 == 48) || (random1 == 49) || (random1 == 50))
    	score1 = 10;
    else if ((random1 == 12) || (random1 == 25) || (random1 == 38) || (random1 == 51))
    	score1 = 1;
    	
    if ((random2 >=0) && (random2 <=8))
    	score2 = random2 +2;
    else if ((random2 >=13) && (random2 <=21))
    	score2 = random2 -11;
    else if ((random2 >=26) && (random2 <=34))
    	score2 = random2 -24;
    else if ((random2 >=39) && (random2 <=47))
    	score2 = random2 -37;
    else if ((random2 == 9) || (random2 == 10) || (random2 == 11)
    		|| (random2 == 22) || (random2 == 23) || (random2 == 24)
    		|| (random2 == 35) || (random2 == 36) || (random2 == 37)
    		|| (random2 == 48) || (random2 == 49) || (random2 == 50))
    	score2 = 10;
    else if ((random2 == 12) || (random2 == 25) || (random2 == 38) || (random2 == 51))
    	score2 = 1;
    	
    if ((random3 >=0) && (random3 <=8))
    	score3 = random3 +2;
    else if ((random3 >=13) && (random3 <=21))
    	score3 = random3 -11;
    else if ((random3 >=26) && (random3 <=34))
    	score3 = random3 -24;
    else if ((random3 >=39) && (random3 <=47))
    	score3 = random3 -37;
    else if ((random3 == 9) || (random3 == 10) || (random3 == 11)
    		|| (random3 == 22) || (random3 == 23) || (random3 == 24)
    		|| (random3 == 35) || (random3 == 36) || (random3 == 37)
    		|| (random3 == 48) || (random3 == 49) || (random3 == 50))
    	score3 = 10;
    else if ((random3 == 12) || (random3 == 25) || (random3 == 38) || (random3 == 51))
    	score3 = 1;
    	
    if ((random4 >=0) && (random4 <=8))
        score4 = random4 +2;
    else if ((random4 >=13) && (random4 <=21))
        score4 = random4 -11;
    else if ((random4 >=26) && (random4 <=34))
        score4 = random4 -24;
    else if ((random4 >=39) && (random4 <=47))
        score4 = random4 -37;
    else if ((random4 == 9) || (random4 == 10) || (random4 == 11)
            || (random4 == 22) || (random4 == 23) || (random4 == 24)
            || (random4 == 35) || (random4 == 36) || (random4 == 37)
            || (random4 == 48) || (random4 == 49) || (random4 == 50))
        score4 = 10;
    else if ((random4 == 12) || (random4 == 25) || (random4 == 38) || (random4 == 51))
        score4 = 1;
        
    if ((random5 >=0) && (random5 <=8))
        score5 = random5 +2;
    else if ((random5 >=13) && (random5 <=21))
        score5 = random5 -11;
    else if ((random5 >=26) && (random5 <=34))
        score5 = random5 -24;
    else if ((random5 >=39) && (random5 <=47))
        score5 = random5 -37;
    else if ((random5 == 9) || (random5 == 10) || (random5 == 11)
            || (random5 == 22) || (random5 == 23) || (random5 == 24)
            || (random5 == 35) || (random5 == 36) || (random5 == 37)
            || (random5 == 48) || (random5 == 49) || (random5 == 50))
        score5 = 10;
    else if ((random5 == 12) || (random5 == 25) || (random5 == 38) || (random5 == 51))
        score5 = 1;
        
    if ((random6 >=0) && (random6 <=8))
        score6 = random6 +2;
    else if ((random6 >=13) && (random6 <=21))
        score6 = random6 -11;
    else if ((random6 >=26) && (random6 <=34))
        score6 = random6 -24;
    else if ((random6 >=39) && (random6 <=47))
        score6 = random6 -37;
    else if ((random6 == 9) || (random6 == 10) || (random6 == 11)
            || (random6 == 22) || (random6 == 23) || (random6 == 24)
            || (random6 == 35) || (random6 == 36) || (random6 == 37)
            || (random6 == 48) || (random6 == 49) || (random6 == 50))
        score6 = 10;
    else if ((random6 == 12) || (random6 == 25) || (random6 == 38) || (random6 == 51))
        score6 = 1;
    
}

//----------------------------------------------------------------------------------------

//function update() {}

function update() {
	//  Add and update the score
	compScore = (score4 + score5 + score6)%10;
	compScoreText.text = "COMPUTER'S SCORE: " + compScore;
	
	playerScore = (score1 + score2 + score3)%10;
	playerScoreText.text = "YOUR SCORE: " + playerScore;
	
	if (compScore < playerScore)
    {
        //reset score, change text
        gameText.text = "YOU WON! Click to restart";
        gameText.visible = true;
        won = true;

        //stop music
        //music.stop();
        //complete.play();
    }
    else if (compScore > playerScore)
    {
        //reset score, change text
        gameText.text = "YOU LOST! Click to restart";
        gameText.visible = true;
        won = true;

        //stop music
        //music.stop();
        //complete.play();
    } 
    else 
    {
        //reset score, change text
        gameText.text = "TIE! Click to restart";
        gameText.visible = true;
        won = true;

        //stop music
        //music.stop();
        //complete.play();
    }
    
    //the "click to restart" handler
    //game.input.onTap.addOnce(function() { resetScores();music.stop();game.state.restart();}, this);
    game.input.onTap.addOnce(function() { resetScores();game.state.restart();}, this);
}

function resetScores(){
    compScore=0;
    playerScore=0;
}

//----------------------------------------------------------------------------------------
