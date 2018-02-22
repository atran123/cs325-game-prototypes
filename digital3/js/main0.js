
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, render: render });

function preload() {

    game.load.image('backdrop', 'assets/tile-background.jpg');
    game.load.image('ball', 'assets/hexagon.png');

}

var ball;

function create() {

	
	//  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0, 0, 800, 600);
    game.add.sprite(0, 0, 'backdrop');
    
    // The car and its settings
        //player = game.add.sprite(400, game.world.height-50, 'ball');

        

    // Create a player sprite at X,Y
    //player = game.add.sprite(game.world.width-50, 200, 'ball');
    
    // Anchor the sprite at its center, as opposed to its top-left corner.
    // so it will be truly centered.
    //player.anchor.setTo( 0.5, 0.5 );
    
    //player.enableBody = true;
    
    //Let gravity do its thing
    //player.body.gravity.y = 6;

    //  We need to enable physics on the player
    //game.physics.arcade.enable(player);
    //game.camera.follow(player);
    //game.input.onDown.add(moveBall, this);

}

/*
function update() {

//  if it's overlapping the mouse, don't move any more
	if (Phaser.Rectangle.contains(player.body, game.input.x, game.input.y))
	{
		player.body.velocity.setTo(0, 0);
	}

}
*/

function update(){}
