"use strict";

GameStates.makeExit = function( game, shared ) {
	var bouncy;
	
	return {
	
		create: function () {
			// Create a sprite at the center of the screen using the 'logo' image.
			bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'logo' );
			// Anchor the sprite at its center, as opposed to its top-left corner.
			// so it will be truly centered.
			bouncy.anchor.setTo( 0.5, 0.5 );
		
			// Turn on the arcade physics engine for this sprite.
			game.physics.enable( bouncy, Phaser.Physics.ARCADE );
			// Make it bounce off of the world bounds.
			bouncy.body.collideWorldBounds = true;
		
			// Add some text using a CSS style.
			// Center it in X, and position its top 15 pixels from the top of the world.
			var text = game.add.text( game.world.centerX, 15, "Have a nice day! Refresh browser to reload game");
			text.anchor.setTo( 0.5, 0.0 );
			text.align = 'center';
			
			//  Font style
			text.font = 'Verdana';
			text.fontSize = 25;
			text.fontWeight = 'bold';
			text.fill = '#9999ff';
			
			text.setShadow(3, 3, 'rgba(255,255,255,0.9)', 10);
			text.anchor.setTo( 0.5, 0.0 );
		},
	
		update: function () {
			// Accelerate the 'logo' sprite towards the cursor,
			// accelerating at 500 pixels/second and moving no faster than 500 pixels/second
			// in X or Y.
			// This function returns the rotation angle that makes it visually match its
			// new trajectory.
			bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 500, 500, 500 );
		}
    };
};
