var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

//----------------------------------------------------------------------------------------
// load resources

function preload() {
    game.load.image('gun', 'assets/gun.png');
    game.load.image('chopperR', 'assets/chopper1R.gif');
    game.load.image('chopperL', 'assets/chopper1L.gif');
    game.load.image('bullet', 'assets/bullet.png');
    game.load.image('bg', 'assets/city.jpg');
    game.load.audio('completeMusic', ['assets/Level_Clear.mp3']);
    game.load.audio('gameoverMusic', ['assets/Game_Over.mp3']);
    game.load.audio('gameMusic', ['assets/Earth.mp3']);
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
var chopperCount = 0;
var chopperCountText;
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

    // create targets on the screen, and repeat at 10 secs interval for 10 times
    createTargets();
    loop = game.time.events.repeat(Phaser.Timer.SECOND * 2, 29, createTargets, this);


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
    scoreText = game.add.text(190, 8, 'Score: 0', { fontSize: '32px', fill: '#f40' });
    chopperCountText = game.add.text(480, 8, 'Choppers: 0', { fontSize: '32px', fill: '#10a82c' });
    text = game.add.text( game.world.centerX-360, game.world.height-40, "Get 10/30 choppers to win. Shoot with SPACE BAR", { fontSize: '30px', fill: '#880888', align: "center" } );

}

//----------------------------------------------------------------------------------------

function update() {

    if ((chopperCount == 30) && (score < 10))
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
    chopperCountText.text = 'Choppers: ' + chopperCount;

    // collision handling
    game.physics.arcade.overlap(bullets, targets, targetHit, null, this);

    if (lost === true){
        //music = game.add.audio('gameoverMusic');
        //music.play();
        //the "click to restart" handler
        game.input.onTap.addOnce(function() { resetScores();music.stop();game.state.restart();}, this);
    }
}

//----------------------------------------------------------------------------------------

//create targets
function createTargets(){

    //update the chopper count
    chopperCount += 1;

    var randomX = Math.round(Math.random());
    var randomY = Math.round(Math.random()) + Math.round(Math.random());

    targets.enableBody = true;
    
    if (randomX === 0){
    	// Create a sprite at the left edge of the screen using the 'snob' image.
		var target = targets.create(game.world.width*randomX,randomY*64+64, 'chopperR');
		// Turn on the arcade physics engine for this sprite.
		game.physics.arcade.enable(target);
		// move this sprite horizontally across the screen
        target.body.velocity.x = (Math.random() + 1) * 150;
    }
    else if (randomX === 1){
    	// Create a sprite at the left edge of the screen using the 'snob' image.
		var target = targets.create(game.world.width*randomX,randomY*64+64, 'chopperL');
		// Turn on the arcade physics engine for this sprite.
		game.physics.arcade.enable(target);
		// move this sprite horizontally across the screen
        target.body.velocity.x = - (Math.random() + 1) * 150;
    }

}

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
    chopperCount=0;
}
