
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, render: render });

function preload() {

    game.load.image('backdrop', 'assets/tile-background.jpg');
    game.load.image('ball', 'assets/hexagon.png');

}

var ball;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0, 0, 800, 600);
    game.add.sprite(0, 0, 'backdrop');

    player = game.add.sprite(game.world.randomX, 200, 'ball');
    // Anchor the sprite at its center, as opposed to its top-left corner.
    // so it will be truly centered.
    player.anchor.setTo( 0.5, 0.5 );

    game.physics.arcade.enable(player);
    game.camera.follow(player);
    game.input.onDown.add(moveBall, this);

}

function moveBall() {

    //  If we don't it'll look very wrong
    game.camera.follow();

    game.physics.arcade.moveToPointer(player, 100);
    
    //  if it's overlapping the mouse, don't move any more
	if (Phaser.Rectangle.contains(player.body, game.input.x, game.input.y))
	{
		player.body.velocity.setTo(0, 0);
	}

    //  The maxTime parameter lets you control how fast it will arrive at the Pointer coords
    // game.physics.arcade.moveToPointer(ball, 100, game.input.activePointer, 1000);


}

function render() {

    game.debug.text("distance: " + game.physics.arcade.distanceToPointer(player), 32, 32);

}