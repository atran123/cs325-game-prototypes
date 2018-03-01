var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

//----------------------------------------------------------------------------------------
// load resources

function preload() {
    game.load.spritesheet('chicken', 'assets/chicken.png', 37.5, 37.5);
    game.load.image('bg', 'assets/farm.jpg');
    game.load.audio('completeMusic', ['assets/Level_Clear.mp3']);
    game.load.audio('gameoverMusic', ['assets/Game_Over.mp3']);
    game.load.audio('gameMusic', ['assets/River Valley Breakdown.mp3']);
    game.load.audio('squawk', ['assets/killchicken.wav']);
}

//----------------------------------------------------------------------------------------
// global variables

var targets;
var background;

var score = 0;
var scoreText;
var chickenCount = 60;
var chickenCountText;
var text;
var loop;
var music;
var lost = false;

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
    squawk = game.add.audio('squawk');

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //------------------------------------------------------------------------------------

    //  A simple background for our game
    background = game.add.sprite( 0, 0, 'bg' );
    //background = game.add.tileSprite(0, 0, 800, 600, 'bg');

    //------------------------------------------------------------------------------------

    targets = game.add.group();
    targets.physicsBodyType = Phaser.Physics.ARCADE;
    targets.enableBody = true;
    //  Enables all kind of input actions on this image group (click, etc)
    targets.inputEnableChildren = true;

    //------------------------------------------------------------------------------------

    // create targets on the screen, and repeat at 1 secs interval for 59 times
    //  The first parameter is how long to wait before the event fires. In this case 1 seconds (you could pass in 2000 as the value as well.)
    //  The second parameter is how many times the event will run in total. Here we'll run it 59 times.
    //  The next two parameters are the function to call ('createTargets') and the context under which that will happen.
    //  Once the event has been called 59 times it will never be called again.
    createTargets();
    loop = game.time.events.repeat(Phaser.Timer.SECOND * 1, 59, createTargets, this);

    //------------------------------------------------------------------------------------

    //  The score
    scoreText = game.add.text(60, 8, 'SCORE: 0', { fontSize: '40px', fill: '#f40' });
    chickenCountText = game.add.text(360, 8, 'CHICKENS LEFT: 60', { fontSize: '40px', fill: '#0000FF' });
    text = game.add.text( game.world.centerX-360, game.world.height-40, "SHOOT 20/60 CHICKENS. USE MOUSE OR TOUCH.", { fontSize: '28px', fill: '#00FFFF', align: "center" } );
}

//----------------------------------------------------------------------------------------

function update() {

    if ((chickenCount == 0) && (score < 20))
    {
        //reset score, stop creating targets, change text
        game.time.events.remove(loop);
        text.text = " YOU LOST! Click to restart";
        text.visible = true;

        music.stop();
        lost = true;
    }

    //update the chicken count text
    chickenCountText.text = 'CHICKENS LEFT: ' + chickenCount;

    if (lost === true){
        //gameover.play();
        //the "click to restart" handler
        game.input.onTap.addOnce(function() { resetScores();music.stop();game.state.restart();}, this);
    }
    
}

//----------------------------------------------------------------------------------------

//create targets
function createTargets(){

    var randomLR = Math.round(Math.random());
    var randomY = Math.round(Math.random()) + Math.round(Math.random());
    
    if (randomLR === 0){ // target appears from the left
    	// Create a sprite at the left edge of the screen using the 'chicken' image.
		target = targets.create((Math.random()/2)*game.world.width,randomY*128+128, 'chicken');	
		// Turn on the arcade physics engine for this sprite.
		game.physics.arcade.enable(target);
		// move target sprite horizontally across the screen
    	target.body.velocity.setTo((Math.random() + 1) * 150, -(Math.random() + 1) * 150);
    	//  Our 3 animations, flying left, right, and up.
		target.animations.add('up', [0, 1, 2, 3], 10, true);
   		target.animations.add('right', [4, 5, 6, 7], 10, true);
    	target.animations.add('left', [8, 9, 10, 11], 10, true);
    	// play animation
    	target.animations.play('right');
    }
    else if (randomLR === 1){ // target appears from the right
    	// Create a sprite at the left edge of the screen using the 'chicken' image.
		target = targets.create((Math.random()/2+0.5)*game.world.width,randomY*128+128, 'chicken');	
		// Turn on the arcade physics engine for this sprite.
		game.physics.arcade.enable(target);
        //target.body.velocity.x = - (Math.random() + 1) * 150;
        target.body.velocity.setTo(-(Math.random() + 1) * 150, -(Math.random() + 1) * 150);
        //  Our 3 animations, flying left, right, and up.
        target.animations.add('up', [0, 1, 2, 3], 10, true);
   		target.animations.add('right', [4, 5, 6, 7], 10, true);
    	target.animations.add('left', [8, 9, 10, 11], 10, true);
    	// play animation
    	target.animations.play('left');
    }
    
    // listen for input events
    targets.onChildInputDown.add(listener, this);
    
    //update the chicken count
    chickenCount -= 1;
    
    text = game.add.text(250, 75, '', { fill: '#000000' });

}


function listener (sprite) {

	//  Add and update the score
	score += 0.5;
	scoreText.text = 'SCORE: ' + score;
	
	squawk.play();
	sprite.kill();

    if (score === 20)
    {
        //reset score, stop creating targets, change text
        game.time.events.remove(loop);
        text.text = " YOU WON! Click to restart";
        text.visible = true;

        //stop music
        music.stop();
        complete.play();

        //the "click to restart" handler
        game.input.onTap.addOnce(function() { resetScores();music.stop();game.state.restart();}, this);
    }
}

function resetScores(){
    score=0;
    chickenCount=60;
}
