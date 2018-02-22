
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('backdrop', 'assets/stars.jpg');
    game.load.image('ball', 'assets/ball.png');
    game.load.image('ground', 'assets/wall.jpg');
    game.load.spritesheet('guard', 'assets/dude.png', 32, 48);

}

var ball;
var speed = 200;
var time = 30000;
var timer;
var victory = true;
var cont = true;

function create() {
	
	//  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0, 0, 800, 600);
    
    //  A simple background for our game
    game.add.sprite(0, 0, 'backdrop');
    
    //  add platform
	platform = game.add.sprite(0, game.world.height-60, 'ground');
	
	//  We will enable physics for platform
	game.physics.arcade.enable(platform);
    platform.enableBody = true;
    
    //  This stops platform from falling away when sprite falls on it
    platform.body.immovable = true;
    
    // Create a player and guard sprite at X,Y
    player = game.add.sprite(game.world.width-300, 50, 'ball');
    guard = game.add.sprite(70, game.world.height-84, 'guard');
    
    // Anchor the sprites at their center, as opposed to its top-left corner.
    // so it will be truly centered.
    player.anchor.setTo( 0.5, 0.5 );
    guard.anchor.setTo( 0.5, 0.5 );
    
    //  We need to enable physics on the player
    game.physics.arcade.enable(player);
    player.enableBody = true;
    player.body.collideWorldBounds = true;
    
    //Let gravity do its thing
    player.body.gravity.y = 600;
    
    //  We need to enable physics on the guard
    game.physics.arcade.enable(guard);
    guard.enableBody = true;
    guard.body.collideWorldBounds = true;
    
    //  Our two animations, walking left and right.
    guard.animations.add('left', [0, 1, 2, 3], 10, true);
    guard.animations.add('right', [5, 6, 7, 8], 10, true);
    
    //  This gets the guard moving
    guard.body.velocity.setTo(speed, 0);
    
    //  This sets the image bounce energy for the horizontal 
    //  and vertical vectors (as an x,y point). "1" is 100% energy return
    player.body.bounce.setTo(0.5, 0.5);
    guard.body.bounce.setTo(1, 1);
    
    // Create a custom timer
    timer = game.time.create();
    
	//  Set a TimerEvent to occur after 30 seconds
    timer.loop(time, endTimer, this);

	// Start the timer
    timer.start();
}

function update() {

	//  Collide the player with the platform
    game.physics.arcade.collide(player, platform);
    game.physics.arcade.collide(guard, platform);
    
    if ((cont) && (guard.body.velocity.x > 0))
	{
		guard.animations.play('right');
		speed = speed + 1;
		guard.body.velocity.setTo(speed, 0);
	}
	else if ((cont) && (guard.body.velocity.x < 0))
	{
		guard.animations.play('left');
	}
	else if (victory){
		guard.kill();
	}
	else {
    	guard.animations.stop();
        guard.frame = 4;
        guard.body.velocity.setTo(0, 0);
	}

	//  if it's overlapping the mouse, don't move any more
	if (Phaser.Rectangle.contains(player.body, game.input.x, game.input.y))
	{
		if (game.input.mousePointer.isDown){
			if ((player.body.center.x < game.input.x) && (player.body.center.y < game.input.y)){
				player.body.velocity.x = -300;
				player.body.velocity.y = -300;
			}
			else if ((player.body.center.x < game.input.x) && (player.body.center.y > game.input.y)){
				player.body.velocity.x = -300;
				player.body.velocity.y = 300;	
			}
			else if ((player.body.center.x > game.input.x) && (player.body.center.y < game.input.y)){
				player.body.velocity.x = 300;
				player.body.velocity.y = -300;	
			}
			else if ((player.body.center.x > game.input.x) && (player.body.center.y > game.input.y)){
				player.body.velocity.x = 300;
				player.body.velocity.y = 300;
			}
			else if ((player.body.center.x === game.input.x) && (player.body.center.y < game.input.y)){
				player.body.velocity.x = 0;
				player.body.velocity.y = -300;
			}
			else if ((player.body.center.x === game.input.x) && (player.body.center.y > game.input.y)){
				player.body.velocity.x = 0;
				player.body.velocity.y = 300;
			}
		}
	}
	
	// collision handling
    game.physics.arcade.overlap(player, guard, targetHit, null, this);
}

function endTimer() {
	// Stop the timer when the delayed event triggers
	timer.stop();
	cont = false;
}

function render(){

	// If our timer is running, show the time in a nicely formatted way, else show 'Done!'
	if (timer.running) {
		game.debug.text('Time until victory: ' + Math.round(timer.duration.toFixed(0)/1000), 32, 32, "#ff0");
	}
	else {
		if (victory) {
			game.debug.text("YAY! YOU WON!", 32, 32, "#0f0");
        }
		else
			game.debug.text("GAME OVER! YOU LOST!", 32, 32, "#0ff");
	}
}

//when player collides with guard
function targetHit (object, target) {

    // Removes the target from the screen
    object.kill()
    timer.stop();
    cont = false
    victory = false;
}