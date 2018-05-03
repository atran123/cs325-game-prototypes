"use strict";

GameStates.makeScore = function( game, shared ) {
	var bouncy;
	var highScore;
	var bestScore;
	var localStorageName = "scoreMem";
	var highScoreText;
	var menu, exit;
	
	function getHighScore(){
		// retrieve high score from local storage
		if(localStorage.getItem(localStorageName) == null) {
			highScore = 0;
		} else {
			highScore = localStorage.getItem(localStorageName);
		}
	}
	
	function mainMenu() {
        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
        //resetScores();
		//music.stop();
        //  Then let's go back to the main menu.
        game.state.start('MainMenu');
    }
    
    function exitGame() {
    	//	Ok, the Exit Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        // music.stop();
        //	And exit game
        game.state.start('Exit');
    }
	
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
			
			// Create a sprite on the bottom using the 'menu_score' image.
            menu = game.add.sprite(game.world.centerX-65, 570, 'menu_score' );
            // Anchor the sprite at its center, as opposed to its top-left corner.
            // so it will be truly centered.
            menu.anchor.setTo( 0.5, 0.5 );
            
            // When you click on the sprite, you go back to the Main Menu.
            menu.inputEnabled = true;
            menu.events.onInputDown.add( function() { mainMenu(); }, this );
            
            // Create a sprite at next to main menu buttom using the 'exit' image.
            exit = game.add.sprite(game.world.centerX+65, 570, 'exit' );
            // Anchor the sprite at its center, as opposed to its top-left corner.
            // so it will be truly centered.
            exit.anchor.setTo( 0.5, 0.5 );
            
            // When you click on the sprite, you go back to the Main Menu.
            exit.inputEnabled = true;
            exit.events.onInputDown.add( function() { exitGame(); }, this );
			
			// Add some text using a CSS style.
			// Center it in X, and position its top 15 pixels from the top of the world.
			getHighScore();
			bestScore = 'Best score: ' + highScore;
			
			highScoreText = game.add.text( game.world.centerX, 15, bestScore);
			highScoreText.align = 'center';
			
			//  Font style
			highScoreText.font = 'Verdana';
			highScoreText.fontSize = 50;
			highScoreText.fontWeight = 'bold';
			highScoreText.fill = '#6ff3fe';
			
			highScoreText.setShadow(3, 3, 'rgba(255,255,255,0.9)', 10);
			highScoreText.anchor.setTo( 0.5, 0.0 );
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
