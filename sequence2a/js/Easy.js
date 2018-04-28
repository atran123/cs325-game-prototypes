"use strict";

GameStates.makeEasy = function( game, shared ) {
    // Create your own variables.
    var menu, exit, start;
	var background, music, bark;
	var scoresText, timeText, text; 
	var scores, time, counter, timer, countdown, randomDog;
	var board, comp1, comp2, human1, human2, dog, pant;
	var position = [];
	var compLost;
	var successMove = false;
	var compSuccessMove = false;
	var firstMove;
    
    // Handle clicking events on the cards ----------------------------------------------
    function listener (sprite) {
    	
    	// if sprite at position 0
    	if ((sprite.x == 220) && (sprite.y == 130)){
    		if (position[2]==0){
				sprite.x = 400; 
				sprite.y = 300;
				position[2] = 1;
				position[0] = 0;
				successMove = true;
				scores ++;
			} else if ( (position[1]==0) && (!((dog.x==400)&&(dog.y==100))) ){
				sprite.x = 580; 
				sprite.y = 130;
				position[1] = 1;
				position[0] = 0;
				successMove = true;
				scores ++;
			} else if ( (position[3]==0) && (!((dog.x==200)&&(dog.y==280))) ){
				sprite.x = 220; 
				sprite.y = 460;
				position[3] = 1;
				position[0] = 0;
				successMove = true;
				scores ++;
			}
			firstMove = false;
		}
		
		// if sprite at position 1
		else if ((sprite.x == 580) && (sprite.y == 130)){
    		if (position[2]==0){
				sprite.x = 400; 
				sprite.y = 300;
				position[2] = 1;
				position[1] = 0;
				successMove = true;
				scores ++;
			} else if ( (position[0]==0) && (!((dog.x==400)&&(dog.y==100))) ){
				sprite.x = 220; 
				sprite.y = 130;
				position[0] = 1;
				position[1] = 0;
				successMove = true;
				scores ++;
			} else if ( (position[4]==0) && (!((dog.x==560)&&(dog.y==280))) ){
				sprite.x = 580; 
				sprite.y = 460;
				position[4] = 1;
				position[1] = 0;
				successMove = true;
				scores ++;
			}
			firstMove = false;
    	}
		
		// if sprite at position 3
    	else if ((sprite.x == 220) && (sprite.y == 460)){
    		if (!((firstMove) && (dog.x==200) && (dog.y==280))){
				if (position[2]==0){
					sprite.x = 400; 
					sprite.y = 300;
					position[2] = 1;
					position[3] = 0;
					successMove = true;
					scores ++;
				} else if ( (position[0]==0) && (!((dog.x==200)&&(dog.y==280))) ){
					sprite.x = 220; 
					sprite.y = 130;
					position[0] = 1;
					position[3] = 0;
					successMove = true;
					scores ++;
				} else if ( (position[4]==0) && (!((dog.x==400)&&(dog.y==440))) ){
					sprite.x = 580; 
					sprite.y = 460;
					position[4] = 1;
					position[3] = 0;
					successMove = true;
					scores ++;
				}
				firstMove = false;
			}
    	}
    	
    	// if sprite at position 4
    	else if ((sprite.x == 580) && (sprite.y == 460)){
			if (!((firstMove) && (dog.x==560) && (dog.y==280))){
				if (position[2]==0){
					sprite.x = 400; 
					sprite.y = 300;
					position[2] = 1;
					position[4] = 0;
					successMove = true;
					scores ++;
				} else if ( (position[1]==0) && (!((dog.x==560)&&(dog.y==280))) ){
					sprite.x = 580; 
					sprite.y = 130;
					position[1] = 1;
					position[4] = 0;
					successMove = true;
					scores ++;
				} else if ( (position[3]==0) && (!((dog.x==400)&&(dog.y==440))) ){
					sprite.x = 220; 
					sprite.y = 460;
					position[3] = 1;
					position[4] = 0;
					successMove = true;
					scores ++;
				}
				firstMove = false;
			} 
    	}
    	
    	// if sprite at position 2
    	else if ((sprite.x == 400) && (sprite.y == 300)){
    		if (position[0]==0){
				sprite.x = 220; 
				sprite.y = 130;
				position[0] = 1;
				position[2] = 0;
				successMove = true;
				scores ++;
			} else if (position[1]==0){
				sprite.x = 580; 
				sprite.y = 130;
				position[1] = 1;
				position[2] = 0;
				successMove = true;
				scores ++;
			} else if (position[3]==0){
				sprite.x = 220; 
				sprite.y = 460;
				position[3] = 1;
				position[2] = 0;
				successMove = true;
				scores ++;
			} else if (position[4]==0){
				sprite.x = 580; 
				sprite.y = 460;
				position[4] = 1;
				position[2] = 0;
				successMove = true;
				scores ++;
			}
    	}
    	
    	if (successMove){
			// computer's turn to go
			compTurn();
		
			game.time.events.remove(countdown);
			counter = time;
			timeText.setText(counter);
			countdown = game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
		
			game.time.events.remove(timer);
			timer = game.time.events.add(Phaser.Timer.SECOND*time, endTimer, this);
			
			successMove = false;
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
    
    function startGame() {
    	// set the scores and time
    	scores = 0;
        time = 8;
        counter = time;
        firstMove = true;
        compLost = false;
        
        // Initialize position array
		position[0] = 1;
		position[1] = 1;
		position[2] = 0;
		position[3] = 1;
		position[4] = 1;
        
        // reset position of pieces
        comp1.x = 220;
        comp1.y = 130;
        comp2.x = 580;
        comp2.y = 130;
        
        human1.x = 220;
        human1.y = 460;
        human2.x = 580;
        human2.y = 460;
        
        // enable input
        if (human1.input.enabled != true)
        	human1.input.enabled = true;
        if (human2.input.enabled != true)
        	human2.input.enabled = true;
        	
        // move the dog: (560, 280) right side, (400, 440) bottom
		// (200, 280) left side, (400, 100) top
		randomDog = Math.floor(Math.random()*4);
		
		if (randomDog == 0){
			dog.x = 560;
			dog.y = 280;
		}
		else if (randomDog == 1){
			dog.x = 400;
			dog.y = 440;
		}
		else if (randomDog == 2){
			dog.x = 200;
			dog.y = 280;
		}
		else {
			dog.x = 400;
			dog.y = 100;
		}
		
		bark.play();
			
        // remove old time text
    	if (timeText != null)
    		timeText.destroy();
    	// Add time text using a CSS style.
		timeText = game.add.text(game.world.centerX, 180, counter);
		timeText.anchor.setTo( 0.5, 0.0 );
		timeText.align = 'center';
		
		//  Font style
		timeText.font = 'Arial Black';
		timeText.fontSize = 30;
		timeText.fontWeight = 'bold';
		timeText.fill = '#E90524';
	
		// text shadow
		timeText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
		
		// remove old message text
    	if (text != null)
    		text.destroy();
    		
    	// add new message text
    	text = game.add.text(game.world.centerX, 50, '');
		text.anchor.setTo( 0.5, 0.0 );
		text.align = 'center';
		
		//  Font style
		text.font = 'Arial Black';
		text.fontSize = 40;
		text.fontWeight = 'bold';
		text.fill = '#f7fd29';
		
		// text shadow
		text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
		
		// remove old countdown timer
		if (countdown != null)
			game.time.events.remove(countdown);
		// Start the countdown timer for display time
		countdown = game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
		
		// remove old countdown timer
		if (timer != null)
			game.time.events.remove(timer);
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
		// temporarily disable input and click events on sprites
    	human1.input.enabled = false;
		human2.input.enabled = false;
		// change text
		text.text = "YOU LOST!";
		text.visible = true;
		// music.stop();
	}
	
	function playerWon(){
		// Stop the timer when the delayed event triggers
		game.time.events.remove(countdown);
		game.time.events.remove(timer);
		// temporarily disable input and click events on sprites
    	human1.input.enabled = false;
		human2.input.enabled = false;
		// change text
		text.text = "YOU WON!";
		text.visible = true;
		// music.stop();
	}
	
	function updateCounter() {
		counter --;
		timeText.setText(counter);
	}
	
	function compMove(sprite){
		// if sprite at position 0
    	if ((sprite.x == 220) && (sprite.y == 130)){
    		if (position[2]==0){
				sprite.x = 400; 
				sprite.y = 300;
				position[2] = 1;
				position[0] = 0;
				compSuccessMove = true;
			} else if ( (position[1]==0) && (!((dog.x==400)&&(dog.y==100))) ){
				sprite.x = 580; 
				sprite.y = 130;
				position[1] = 1;
				position[0] = 0;
				compSuccessMove = true;
			} else if ( (position[3]==0) && (!((dog.x==200)&&(dog.y==280))) ){
				sprite.x = 220; 
				sprite.y = 460;
				position[3] = 1;
				position[0] = 0;
				compSuccessMove = true;
			}
		}
		
		// if sprite at position 1
		else if ((sprite.x == 580) && (sprite.y == 130)){
    		if (position[2]==0){
				sprite.x = 400; 
				sprite.y = 300;
				position[2] = 1;
				position[1] = 0;
				compSuccessMove = true;
			} else if ( (position[0]==0) && (!((dog.x==400)&&(dog.y==100))) ){
				sprite.x = 220; 
				sprite.y = 130;
				position[0] = 1;
				position[1] = 0;
				compSuccessMove = true;
			} else if ( (position[4]==0) && (!((dog.x==560)&&(dog.y==280))) ){
				sprite.x = 580; 
				sprite.y = 460;
				position[4] = 1;
				position[1] = 0;
				compSuccessMove = true;
			}
    	}
		
		// if sprite at position 3
    	else if ((sprite.x == 220) && (sprite.y == 460)){
    		if (position[2]==0){
				sprite.x = 400; 
				sprite.y = 300;
				position[2] = 1;
				position[3] = 0;
				compSuccessMove = true;
			} else if ( (position[0]==0) && (!((dog.x==200)&&(dog.y==280))) ){
				sprite.x = 220; 
				sprite.y = 130;
				position[0] = 1;
				position[3] = 0;
				compSuccessMove = true;
			} else if ( (position[4]==0) && (!((dog.x==400)&&(dog.y==440))) ){
				sprite.x = 580; 
				sprite.y = 460;
				position[4] = 1;
				position[3] = 0;
				compSuccessMove = true;
			}
    	}
    	
    	// if sprite at position 4
    	else if ((sprite.x == 580) && (sprite.y == 460)){
    		if (position[2]==0){
				sprite.x = 400; 
				sprite.y = 300;
				position[2] = 1;
				position[4] = 0;
				compSuccessMove = true;
			} else if ( (position[1]==0) && (!((dog.x==560)&&(dog.y==280))) ){
				sprite.x = 580; 
				sprite.y = 130;
				position[1] = 1;
				position[4] = 0;
				compSuccessMove = true;
			} else if ( (position[3]==0) && (!((dog.x==400)&&(dog.y==440))) ){
				sprite.x = 220; 
				sprite.y = 460;
				position[3] = 1;
				position[4] = 0;
				compSuccessMove = true;
			} 
    	}
    	
    	// if sprite at position 2
    	else if ((sprite.x == 400) && (sprite.y == 300)){
    		if (position[0]==0){
				sprite.x = 220; 
				sprite.y = 130;
				position[0] = 1;
				position[2] = 0;
				compSuccessMove = true;
			} else if (position[1]==0){
				sprite.x = 580; 
				sprite.y = 130;
				position[1] = 1;
				position[2] = 0;
				compSuccessMove = true;
			} else if (position[3]==0){
				sprite.x = 220; 
				sprite.y = 460;
				position[3] = 1;
				position[2] = 0;
				compSuccessMove = true;
			} else if (position[4]==0){
				sprite.x = 580; 
				sprite.y = 460;
				position[4] = 1;
				position[2] = 0;
				compSuccessMove = true;
			}
    	} 
	}
	
	// this is a  simple computer algorithm of the chess game
	// computer will randomly pick 1 of the 2 pieces and move to the open position
	// it does not calculate the best move. The move may lead computer to a loss.
	function compTurn(){
	
		var random = Math.floor(Math.random()*2);
		
		if (random == 0){
			compMove(comp1);
			if (compSuccessMove){
				compSuccessMove = false;
			} 
			else {
				compMove(comp2);
				if (compSuccessMove)
					compSuccessMove = false;
				else
					compLost = true;
			}
		}
		else {
			compMove(comp2);
			if (compSuccessMove){
				compSuccessMove = false;
			} 
			else {
				compMove(comp1);
				if (compSuccessMove)
					compSuccessMove = false;
				else
					compLost = true;
			}
		}
	}
    
    return {  // Begin game state functions ----------------------------------------------
    
        create: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            
            randomDog = Math.floor(Math.random()*4);
            
            // Add music
			music = game.add.audio('gameMusic');
			music.loop = true;
			music.play();
			
			bark = game.add.audio('bark');
            
            //  A simple background for our game
			background = game.add.sprite( 0, 0, 'bg' );
			
			// create the board
			board = game.add.sprite(400, 300, 'board');
			board.anchor.setTo(0.5,0.5);
			
			// Create chess piece sprites
			// Anchor the sprites at its center, as opposed to their top-left corner.
            // so they will be truly centered.
			comp1 = game.add.sprite(220, 130, 'comp');		// position 0
			comp1.anchor.setTo(0.5,0.5);
			comp2 = game.add.sprite(580, 130, 'comp');		// position 1
			comp2.anchor.setTo(0.5,0.5);
			human1 = game.add.sprite(220, 460, 'human');	// position 3
			human1.anchor.setTo(0.5,0.5);
			human2 = game.add.sprite(580, 460, 'human');	// position 4
			human2.anchor.setTo(0.5,0.5);
			
			// enable input on sprites, temporarily set to false,
			// and add input listener to sprites
			human1.inputEnabled = true;
			human1.events.onInputDown.add(listener, this);
			human1.input.enabled = false;
			
			human2.inputEnabled = true;
			human2.events.onInputDown.add(listener, this);
			human2.input.enabled = false;
			
			dog = game.add.sprite(400, 280, 'dog')
			dog.anchor.setTo(0.5,0.5);
			
			dog.inputEnabled = true;
            dog.events.onInputDown.add( function() { bark.play(); }, this );
			
			//  Here we add a new animation called 'pant'
			//  Because we didn't give any other parameters it's going to make an 
			//	animation from all available frames in the 'dog' sprite sheet
			pant = dog.animations.add('pant');

			//  And this starts the animation playing by using its key ("pant")
			//  30 is the frame rate (30fps)
			//  true means it will loop when it finishes
			dog.animations.play('pant', 30, true);
			
			// Create a sprite at the left of the screen using the 'start' image.
            start = game.add.sprite(270, 570, 'start' );
            // Anchor the sprite at its center, as opposed to its top-left corner.
            // so it will be truly centered.
            start.anchor.setTo( 0.5, 0.5 );
            
            // When you click on the sprite, you start the game.
            start.inputEnabled = true;
            start.events.onInputDown.add( function() { startGame(); }, this );
            
            // Create a sprite at before the exit using the 'menu' image.
            menu = game.add.sprite(440, 570, 'menu' );
            // Anchor the sprite at its center, as opposed to its top-left corner.
            // so it will be truly centered.
            menu.anchor.setTo( 0.5, 0.5 );
            
            // When you click on the sprite, you go back to the Main Menu.
            menu.inputEnabled = true;
            menu.events.onInputDown.add( function() { mainMenu(); }, this );
            
            // Create a sprite at the left of the screen using the 'exit' image.
            exit = game.add.sprite(570, 570, 'exit' );
            // Anchor the sprite at its center, as opposed to its top-left corner.
            // so it will be truly centered.
            exit.anchor.setTo( 0.5, 0.5 );
            
            // When you click on the sprite, you go back to the Main Menu.
            exit.inputEnabled = true;
            exit.events.onInputDown.add( function() { exitGame(); }, this );	
            
            // Add some text using a CSS style.
            scoresText = game.add.text(game.world.centerX, 10, '');
            scoresText.anchor.setTo( 0.5, 0.0 );
            scoresText.align = 'center';
            
            //  Font style
			scoresText.font = 'Arial Black';
			scoresText.fontSize = 40;
			scoresText.fontWeight = 'bold';
			scoresText.fill = '#030bfc';
		
			// text shadow
			scoresText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
			
			scores = 0;
        },
    
        update: function () {
        	if (compLost){
        		playerWon();
        	}
            scoresText.text = "Scores: " + scores;
            
            if (scores >=100){
            	time = 1;
            }
            else if (scores >=70){
            	time = 2;
            }
			else if (scores >=50){
				time = 3;
            }
			else if (scores >=40){
				time = 4;
            }
			else if (scores >=30){
				time = 5;
            }
			else if (scores >=20){
				time = 6;
            }
			else if (scores >=10){
				time = 7;
            }
        }
    };
};
