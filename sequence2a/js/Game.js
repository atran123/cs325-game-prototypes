"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    var reset = null;
    var menu = null;
    var exit = null;
    var start = null;
    var i, j, k;
	var background = null;
	var music = null;
	var scoresText = null; 
	var timeText = null; 
	var text = null;
	var scores = null;
	var board, comp1, comp2, human1, human2, dog, pant;
	var position = [];
	var lost = false;
	var time = 8;
	var counter = time;
	var timer;
	var countdown;
    
    // Handle clicking events on the cards ----------------------------------------------
    function listener (sprite) {
    	
    	// if sprite at position 0
    	if ((sprite.x == 220) && (sprite.y == 130)){
    		if (position[2]==0){
				sprite.x = 400; 
				sprite.y = 300;
				position[2] = 1;
				position[0] = 0;
				scores ++;
			} else if ( (position[1]==0) && (!((dog.x==400)&&(dog.y==100))) ){
				sprite.x = 580; 
				sprite.y = 130;
				position[1] = 1;
				position[0] = 0;
				scores ++;
			} else if ( (position[3]==0) && (!((dog.x==200)&&(dog.y==280))) ){
				sprite.x = 220; 
				sprite.y = 460;
				position[3] = 1;
				position[0] = 0;
				scores ++;
			}
		}
		
		// if sprite at position 1
		else if ((sprite.x == 580) && (sprite.y == 130)){
    		if (position[2]==0){
				sprite.x = 400; 
				sprite.y = 300;
				position[2] = 1;
				position[1] = 0;
				scores ++;
			} else if ( (position[0]==0) && (!((dog.x==400)&&(dog.y==100))) ){
				sprite.x = 220; 
				sprite.y = 130;
				position[0] = 1;
				position[1] = 0;
				scores ++;
			} else if ( (position[4]==0) && (!((dog.x==560)&&(dog.y==280))) ){
				sprite.x = 580; 
				sprite.y = 460;
				position[4] = 1;
				position[1] = 0;
				scores ++;
			}
    	}
		
		// if sprite at position 3
    	else if ((sprite.x == 220) && (sprite.y == 460)){
    		if (position[2]==0){
				sprite.x = 400; 
				sprite.y = 300;
				position[2] = 1;
				position[3] = 0;
				scores ++;
				
				game.time.events.remove(countdown);
				counter = time;
				timeText.setText(counter);
				countdown = game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
				
				game.time.events.remove(timer);
				timer = game.time.events.add(Phaser.Timer.SECOND*time, endTimer, this);
			} else if ( (position[0]==0) && (!((dog.x==200)&&(dog.y==280))) ){
				sprite.x = 220; 
				sprite.y = 130;
				position[0] = 1;
				position[3] = 0;
				scores ++;
				
				game.time.events.remove(countdown);
				counter = time;
				timeText.setText(counter);
				countdown = game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
				
				game.time.events.remove(timer);
				timer = game.time.events.add(Phaser.Timer.SECOND*time, endTimer, this);
			} else if ( (position[4]==0) && (!((dog.x==400)&&(dog.y==440))) ){
				sprite.x = 580; 
				sprite.y = 460;
				position[4] = 1;
				position[3] = 0;
				scores ++;
				
				game.time.events.remove(countdown);
				counter = time;
				timeText.setText(counter);
				countdown = game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
				
				game.time.events.remove(timer);
				timer = game.time.events.add(Phaser.Timer.SECOND*time, endTimer, this);
			}
    	}
    	
    	// if sprite at position 4
    	else if ((sprite.x == 580) && (sprite.y == 460)){
    		if (position[2]==0){
				sprite.x = 400; 
				sprite.y = 300;
				position[2] = 1;
				position[4] = 0;
				scores ++;
			} else if ( (position[1]==0) && (!((dog.x==560)&&(dog.y==280))) ){
				sprite.x = 580; 
				sprite.y = 130;
				position[1] = 1;
				position[4] = 0;
				scores ++;
			} else if ( (position[3]==0) && (!((dog.x==400)&&(dog.y==440))) ){
				sprite.x = 220; 
				sprite.y = 460;
				position[3] = 1;
				position[4] = 0;
				scores ++;
			} 
    	}
    	
    	// if sprite at position 2
    	else if ((sprite.x == 400) && (sprite.y == 300)){
    		if (position[0]==0){
				sprite.x = 220; 
				sprite.y = 130;
				position[0] = 1;
				position[2] = 0;
				scores ++;
			} else if (position[1]==0){
				sprite.x = 580; 
				sprite.y = 130;
				position[1] = 1;
				position[2] = 0;
				scores ++;
			} else if (position[3]==0){
				sprite.x = 220; 
				sprite.y = 460;
				position[3] = 1;
				position[2] = 0;
				scores ++;
			} else if (position[4]==0){
				sprite.x = 580; 
				sprite.y = 460;
				position[4] = 1;
				position[2] = 0;
				scores ++;
			}
    	}
		
	}
    
    function mainMenu() {
        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
        //resetScores();
        scores = 0;
		music.stop();
        //  Then let's go back to the main menu.
        game.state.start('MainMenu');
    }
    
    function resetGame() {
        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
        //resetScores();
        scores = 0;
        time = 8;
		music.stop();
        //  Then let's go back to the main menu.
        game.state.restart();
        counter = time;
    }
    
    function startGame() {
    	// enable input and click events on sprites
    	human1.inputEnabled = true;
		human1.events.onInputDown.add(listener, this);
		human2.inputEnabled = true;
		human2.events.onInputDown.add(listener, this);
		
    	// Add time text using a CSS style.
		timeText = game.add.text(game.world.centerX, 180, counter, { fontSize: '30px', fill: '#E90524', align: "center"  });
		//timeText.setText(counter);
		timeText.anchor.setTo( 0.5, 0.0 );
		
		// Start the countdown timer for display time
		countdown = game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
		
		// Start the timer to losing
		timer = game.time.events.add(Phaser.Timer.SECOND*time, endTimer, this);
    }
    
    function exitGame() {
    	scores = 0;
    	//	Ok, the Exit Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        music.stop();
        //	And exit game
        game.state.start('Exit');
    }
    
    function endTimer() {
		// Stop the timer when the delayed event triggers
		game.time.events.remove(countdown);
		game.time.events.remove(timer);
		//change text
		text.text = "YOU LOST!";
		text.visible = true;
		music.stop();
		lost = true;
	}
	
	function updateCounter() {
		counter --;
		timeText.setText(counter);
	}
    
    return {  // Begin game state functions ----------------------------------------------
    
        create: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            
            // Add music
			music = game.add.audio('gameMusic');
			music.loop = true;
			music.play();
            
            //  A simple background for our game
			background = game.add.sprite( 0, 0, 'bg' );
			
			// Create a sprite at the left of the screen using the 'start' image.
            start = game.add.sprite(210, 570, 'start' );
            // Anchor the sprite at its center, as opposed to its top-left corner.
            // so it will be truly centered.
            start.anchor.setTo( 0.5, 0.5 );
            
            // When you click on the sprite, you start the game.
            start.inputEnabled = true;
            start.events.onInputDown.add( function() { startGame(); }, this );
			
            // Create a sprite next to start using the 'reset' image.
            reset = game.add.sprite(320, 570, 'reset' );
            // Anchor the sprite at its center, as opposed to its top-left corner.
            // so it will be truly centered.
            reset.anchor.setTo( 0.5, 0.5 );
            
            // When you click on the sprite, you restart the game.
            reset.inputEnabled = true;
            reset.events.onInputDown.add( function() { resetGame(); }, this );
            
            // Create a sprite at before the exit using the 'menu' image.
            menu = game.add.sprite(460, 570, 'menu' );
            // Anchor the sprite at its center, as opposed to its top-left corner.
            // so it will be truly centered.
            menu.anchor.setTo( 0.5, 0.5 );
            
            // When you click on the sprite, you go back to the Main Menu.
            menu.inputEnabled = true;
            menu.events.onInputDown.add( function() { mainMenu(); }, this );
            
            // Create a sprite at the left of the screen using the 'exit' image.
            exit = game.add.sprite(590, 570, 'exit' );
            // Anchor the sprite at its center, as opposed to its top-left corner.
            // so it will be truly centered.
            exit.anchor.setTo( 0.5, 0.5 );
            
            // When you click on the sprite, you go back to the Main Menu.
            exit.inputEnabled = true;
            exit.events.onInputDown.add( function() { exitGame(); }, this );	
            
            /*// Add time text using a CSS style.
    		timeText = game.add.text(game.world.centerX, 180, counter, { fontSize: '30px', fill: '#E90524', align: "center"  });
    		//timeText.setText(counter);
			timeText.anchor.setTo( 0.5, 0.0 );
			
			// Start the countdown timer for display time
    		countdown = game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
    		
    		// Start the timer to losing
    		timer = game.time.events.add(Phaser.Timer.SECOND*time, endTimer, this);*/
            
            // Add some text using a CSS style.
            scoresText = game.add.text(game.world.centerX, 10, 'Scores: 0', { fontSize: '40px', fill: '#2C3E50', align: "center"  });
            scoresText.anchor.setTo( 0.5, 0.0 );
			
			text = game.add.text(game.world.centerX, 50, '', { fontSize: '40px', fill: '#057AE9', align: "center"  });
			text.anchor.setTo( 0.5, 0.0 );
            
            // Create chess piece sprites
			board = game.add.sprite(400, 300, 'board');
			comp1 = game.add.sprite(220, 130, 'comp');		// position 0
			comp2 = game.add.sprite(580, 130, 'comp');		// position 1
			human1 = game.add.sprite(220, 460, 'human');	// position 3
			human2 = game.add.sprite(580, 460, 'human');	// position 4
			// create a dog: (560,280) right side, (400, 440) bottom
			// (200, 280) left side, (400, 100) top
			dog = game.add.sprite(400, 440, 'dog');
			
			// Anchor the sprites at its center, as opposed to their top-left corner.
            // so they will be truly centered.
			board.anchor.setTo(0.5,0.5);
			comp1.anchor.setTo(0.5,0.5);
			comp2.anchor.setTo(0.5,0.5);
			human1.anchor.setTo(0.5,0.5);
			human2.anchor.setTo(0.5,0.5);
			dog.anchor.setTo(0.5,0.5);
			
			//  Here we add a new animation called 'pant'
			//  Because we didn't give any other parameters it's going to make an 
			//	animation from all available frames in the 'dog' sprite sheet
			pant = dog.animations.add('pant');

			//  And this starts the animation playing by using its key ("pant")
			//  30 is the frame rate (30fps)
			//  true means it will loop when it finishes
			dog.animations.play('pant', 30, true);
			
			// Initialize the moves counter
			scores = 0;
			
			// Initialize position array
			position[0] = 1;
			position[1] = 1;
			position[2] = 0;
			position[3] = 1;
			position[4] = 1;
        },
    
        update: function () {
        	if (lost){
        		
        	}
            scoresText.text = "Scores: " + scores;
            
            if (scores >=128){
            	time = 1;
            }
            else if (scores >=64){
            	time = 2;
            }
			else if (scores >=32){
				time = 3;
            }
			else if (scores >=16){
				time = 4;
            }
			else if (scores >=8){
				time = 5;
            }
			else if (scores >=4){
				time = 6;
            }
			else if (scores >=2){
				time = 7;
            }
        }
    };
};
