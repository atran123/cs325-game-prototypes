var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

//----------------------------------------------------------------------------------------
// load resources

function preload() {
    game.load.image('gun', 'assets/gun.png');
    game.load.image('bullet', 'assets/bullet.png');
    game.load.spritesheet('chicken', 'assets/chicken.png', 37.5, 37.5);
    game.load.image('bg', 'assets/farm.jpg');
    game.load.audio('completeMusic', ['assets/Level_Clear.mp3']);
    game.load.audio('gameoverMusic', ['assets/Game_Over.mp3']);
    game.load.audio('gameMusic', ['assets/River Valley Breakdown.mp3']);
}

//----------------------------------------------------------------------------------------
// global variables

var player;
var cursors;
var bullets;
var targets;
var background;
var fireButton = null;
var bulletTime = 0;

var score = 0;
var scoreText;
var chickenCount = 0;
var chickenCountText;
var text;
var loop;
var music;
var lost = false;

//var target; 
//var counter = 0;

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

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //------------------------------------------------------------------------------------

    //  A simple background for our game
    background = game.add.sprite( 0, 0, 'bg' );
    //background = game.add.tileSprite(0, 0, 800, 600, 'bg');

    //------------------------------------------------------------------------------------

    bullets = game.add.group();
    targets = game.add.group();
    targets.physicsBodyType = Phaser.Physics.ARCADE;

    //------------------------------------------------------------------------------------

    // create targets on the screen, and repeat at 1 secs interval for 59 times
    //  The first parameter is how long to wait before the event fires. In this case 1 seconds (you could pass in 2000 as the value as well.)
    //  The second parameter is how many times the event will run in total. Here we'll run it 59 times.
    //  The next two parameters are the function to call ('createTargets') and the context under which that will happen.
    //  Once the event has been called 59 times it will never be called again.
    createTargets();
    loop = game.time.events.repeat(Phaser.Timer.SECOND * 1, 59, createTargets, this);


    //------------------------------------------------------------------------------------

    //  Creates 1 single bullet, using the 'bullet' graphic
    //  Our bullet group
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(1, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    //------------------------------------------------------------------------------------

    // Create a player sprite at the bottom of the screen using the 'gun' image.
    player = game.add.sprite(game.world.centerX, game.world.height-70, 'gun');
    player.anchor.setTo( 0.4, 0.5 );
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    //  And some controls to play the game with
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    //------------------------------------------------------------------------------------

    //  The score
    scoreText = game.add.text(190, 8, 'Score: 0', { fontSize: '40px', fill: '#f40' });
    chickenCountText = game.add.text(480, 8, 'Chickens: 0', { fontSize: '40px', fill: '#0000FF' });
    text = game.add.text( game.world.centerX-360, game.world.height-40, "Shoot 20/60 chickens. Use mouse or touch", { fontSize: '32px', fill: '#00FFFF', align: "center" } );
}

//----------------------------------------------------------------------------------------

function update() {

    if ((chickenCount == 60) && (score < 20))
    {
        //reset score, stop creating targets, change text
        game.time.events.remove(loop);
        text.text = " You Lost! Click to restart";
        text.visible = true;

        music.stop();
        lost =true;
    }

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -250;
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 250;
    }
    else
    {
        //  Stand still
         player.body.velocity.x = 0;
    }

    // When fire button is pressed
    if (fireButton.isDown)
    {
        fireBullet();
    }

    //update the chopper count text
    chickenCountText.text = 'Chickens: ' + chickenCount;

    // collision handling
    game.physics.arcade.overlap(bullets, targets, targetHit, null, this);

    if (lost === true){
        //music = game.add.audio('gameoverMusic');
        //music.play();
        //the "click to restart" handler
        game.input.onTap.addOnce(function() { resetScores();music.stop();game.state.restart();}, this);
    }
    
    /*
    //  if target overlapping the mouse pointer
    if (Phaser.Rectangle.contains(player.body, game.input.x, game.input.y)){
    	if (game.input.mousePointer.isDown){
    		target.kill();
    	}
    }*/
    
}

//----------------------------------------------------------------------------------------

//create targets
function createTargets(){

    var randomLR = Math.round(Math.random());
    var randomY = Math.round(Math.random()) + Math.round(Math.random());

    targets.enableBody = true;
    
    if (randomLR === 0){ // target appears from the left
    	// Create a sprite at the left edge of the screen using the 'chicken' image.
		target = targets.create((Math.random()/2)*game.world.width,randomY*128+128, 'chicken');
		
		//  Enables all kind of input actions on this image (click, etc)
    	//target.inputEnabled = true;
    	// target.events.onInputDown.add(listener, this);
		
		// Turn on the arcade physics engine for this sprite.
		game.physics.arcade.enable(target);
		// move target sprite horizontally across the screen
        //target.body.velocity.x = (Math.random() + 1) * 150;
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
		// move target sprite horizontally across the screen
        //target.body.velocity.x = - (Math.random() + 1) * 150;
        target.body.velocity.setTo(-(Math.random() + 1) * 150, -(Math.random() + 1) * 150);
        //  Our 3 animations, flying left, right, and up.
        target.animations.add('up', [0, 1, 2, 3], 10, true);
   		target.animations.add('right', [4, 5, 6, 7], 10, true);
    	target.animations.add('left', [8, 9, 10, 11], 10, true);
    	// play animation
    	target.animations.play('left');
    }
    
    //update the chicken count
    chickenCount += 1;
    
    text = game.add.text(250, 16, '', { fill: '#ffffff' });

}

/*
function listener () {
    counter++;
    text.text = "You clicked " + counter + " times!";
}*/

//when bullet hits targets
function targetHit (object, target) {

    // Removes the target from the screen
    object.kill()
    target.kill();

    //  Add and update the score
    score += 1;
    scoreText.text = 'Score: ' + score;

    if (score === 10)
    {
        //reset score, stop creating targets, change text
        game.time.events.remove(loop);
        text.text = " You Won! Click to restart";
        text.visible = true;

        //stop music
        music.stop();
        music = game.add.audio('completeMusic');
        music.play();

        //the "click to restart" handler
        game.input.onTap.addOnce(function() { resetScores();music.stop();game.state.restart();}, this);
    }
}

// when fire button is pressed
function fireBullet () {
    if (game.time.now > bulletTime)
    {
        //  Grab the first bullet we can from the pool
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            //  And fire it
            bullet.reset(player.x+8, player.y+12);
            bullet.body.velocity.y = -450;
            bulletTime = game.time.now + 200;
        }
    }
}

//  Called if the bullet goes out of the screen
function resetBullet (bullet) {
    bullet.kill();
}

function resetScores(){
    score=0;
    chickenCount=0;
}
