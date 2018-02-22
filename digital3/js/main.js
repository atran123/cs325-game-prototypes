
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('backdrop', 'assets/tile-background.jpg');
    game.load.image('ball', 'assets/hexagon.png');
    game.load.image('ground', 'assets/platform.png');

}

var ball;

function create() {

	
	//  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0, 0, 800, 600);
    
    //  A simple background for our game
    game.add.sprite(0, 0, 'backdrop');
    
    //  add platform
	platform = game.add.sprite(0, game.world.height-60, 'ground');
	
	//  Scale it to fit the width of the game 
	platform.scale.setTo(2, 2);
	
	//  We will enable physics for platform
	game.physics.arcade.enable(platform);
    platform.enableBody = true;
    
    //  This stops platform from falling away when sprite falls on it
    platform.body.immovable = true;
    
    // Create a player sprite at X,Y
    player = game.add.sprite(game.world.width-50, 50, 'ball');
    
    // Anchor the sprite at its center, as opposed to its top-left corner.
    // so it will be truly centered.
    player.anchor.setTo( 0.5, 0.5 );
    

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);
    player.enableBody = true;
    player.body.collideWorldBounds = true;
    
    //Let gravity do its thing
    player.body.gravity.y = 300;

}

function update() {

	//  Collide the player with the platform
    hitPlatform = game.physics.arcade.collide(player, platform);

	//  if it's overlapping the mouse, don't move any more
	if (Phaser.Rectangle.contains(player.body, game.input.x, game.input.y))
	{
		if (game.input.mousePointer.isDown){
			player.body.velocity.y = -200;
		}
	}

}
