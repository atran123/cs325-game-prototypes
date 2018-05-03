"use strict";

GameStates.makeScore = function( game, shared ) {
	var bouncy;
	var highScoreEasy;
	var bestScoreEasy;
	var highScoreHard;
	var bestScoreHard;
	var localStorageNameEasy = "scoreMemEasy";
	var localStorageNameHard = "scoreMemHard";
	var highScoreEasyText;
	var highScoreHardText;
	var menu, exit;
	
	function getHighScore(localStorageName){
		var highScore;
		// retrieve high score from local storage
		if(localStorage.getItem(localStorageName) == null) {
			highScore = 0;
		} else {
			highScore = localStorage.getItem(localStorageName);
		}
		return highScore;
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
            
            // Add High Score text for Easy Mode using a CSS style
			// Center it in X, and position its top 15 pixels from the top of the world.
			highScoreEasy = getHighScore(localStorageNameEasy);
			bestScoreEasy = 'Easy Mode \n' + 'Best score: ' + highScoreEasy;
			
			highScoreEasyText = game.add.text( game.world.centerX-200, 15, bestScoreEasy);
			highScoreEasyText.align = 'center';
			
			//  Font style
			highScoreEasyText.font = 'Verdana';
			highScoreEasyText.fontSize = 40;
			highScoreEasyText.fontWeight = 'bold';
			highScoreEasyText.fill = '#6ff3fe';
			
			highScoreEasyText.setShadow(3, 3, 'rgba(255,255,255,0.9)', 10);
			highScoreEasyText.anchor.setTo( 0.5, 0.0 );
			
			// Add High Score text for Hard Mode using a CSS style
			// Center it in X, and position its top 15 pixels from the top of the world.
			highScoreHard = getHighScore(localStorageNameHard);
			bestScoreHard = 'Hard Mode \n' + 'Best score: ' + highScoreHard;
			
			highScoreHardText = game.add.text( game.world.centerX+200, 15, bestScoreHard);
			highScoreHardText.align = 'center';
			
			//  Font style
			highScoreHardText.font = 'Verdana';
			highScoreHardText.fontSize = 40;
			highScoreHardText.fontWeight = 'bold';
			highScoreHardText.fill = '#E6E6FA';
			
			highScoreHardText.setShadow(3, 3, 'rgba(255,255,255,0.9)', 10);
			highScoreHardText.anchor.setTo( 0.5, 0.0 );
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
