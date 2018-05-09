"use strict";

GameStates.makeImpossible = function( game, shared ) {
    // Create your own variables.
    var successMove = false;
	var compSuccessMove = false;
	var position = [];
	var localStorageName = "scoreMemImpos";
	var localStorageNameOutcome = "outcomeMemImpos";
	var highScore;
    var menu, exit, start;
	var background, music, bark, click;
	var scoreText, timeText, text, endText; 
	var score, time, counter, timer, countdown;
	var randomDogMove, randomDogPos;
	var board, comp1, comp2, human1, human2, dog, pant;
	var compLost, firstMove;
	var outcome;
    
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
				score ++;
			} else if ( (position[1]==0) && (!((dog.x==400)&&(dog.y==100))) ){
				sprite.x = 580; 
				sprite.y = 130;
				position[1] = 1;
				position[0] = 0;
				successMove = true;
				score ++;
			} else if ( (position[3]==0) && (!((dog.x==200)&&(dog.y==280))) ){
				sprite.x = 220; 
				sprite.y = 460;
				position[3] = 1;
				position[0] = 0;
				successMove = true;
				score ++;
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
				score ++;
			} else if ( (position[0]==0) && (!((dog.x==400)&&(dog.y==100))) ){
				sprite.x = 220; 
				sprite.y = 130;
				position[0] = 1;
				position[1] = 0;
				successMove = true;
				score ++;
			} else if ( (position[4]==0) && (!((dog.x==560)&&(dog.y==280))) ){
				sprite.x = 580; 
				sprite.y = 460;
				position[4] = 1;
				position[1] = 0;
				successMove = true;
				score ++;
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
					score ++;
				} else if ( (position[0]==0) && (!((dog.x==200)&&(dog.y==280))) ){
					sprite.x = 220; 
					sprite.y = 130;
					position[0] = 1;
					position[3] = 0;
					successMove = true;
					score ++;
				} else if ( (position[4]==0) && (!((dog.x==400)&&(dog.y==440))) ){
					sprite.x = 580; 
					sprite.y = 460;
					position[4] = 1;
					position[3] = 0;
					successMove = true;
					score ++;
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
					score ++;
				} else if ( (position[1]==0) && (!((dog.x==560)&&(dog.y==280))) ){
					sprite.x = 580; 
					sprite.y = 130;
					position[1] = 1;
					position[4] = 0;
					successMove = true;
					score ++;
				} else if ( (position[3]==0) && (!((dog.x==400)&&(dog.y==440))) ){
					sprite.x = 220; 
					sprite.y = 460;
					position[3] = 1;
					position[4] = 0;
					successMove = true;
					score ++;
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
				score ++;
			} else if (position[1]==0){
				sprite.x = 580; 
				sprite.y = 130;
				position[1] = 1;
				position[2] = 0;
				successMove = true;
				score ++;
			} else if (position[3]==0){
				sprite.x = 220; 
				sprite.y = 460;
				position[3] = 1;
				position[2] = 0;
				successMove = true;
				score ++;
			} else if (position[4]==0){
				sprite.x = 580; 
				sprite.y = 460;
				position[4] = 1;
				position[2] = 0;
				successMove = true;
				score ++;
			}
    	}
    	
    	if (successMove){
			click.play();
			randomlyMoveDog();

			// computer's turn to go
			compTurn();
		
			// reset timer
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
        score = 0;
		music.stop();
		
		// turn off message text
    	text.visible = false;
		
		// turn off end text
    	endText.visible = false;
    	
        //  Then let's go back to the main menu.
        game.state.start('MainMenu');
    }
    
    function startGame() {
    	// set the score and time
    	score = 0;
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
		randomDogPos = Math.floor(Math.random()*4);
		moveDog(randomDogPos);
		
		bark.play();
			
        // set time text
    	timeText.text = counter;
		
		// turn off message text
    	text.visible = false;
		
		// turn off end text
    	endText.visible = false;
    	
    	// reinstate score text
    	scoreText.visible = true;
		
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
    	score = 0;
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
		
		// turn off score text
    	scoreText.visible = false;
    	
    	// turn on end text 
    	if (score < highScore)
				endText.text = 'Your Score: ' + score + '\n' + 'Top Score: ' + highScore;
		else
			endText.text = 'Your Score: ' + score + '\n' + 'Is New Top Score';
    	endText.visible = true;
    	
    	outcome = 'Loss';
    	
		saveHighScore();
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
		
		// turn off score text
    	scoreText.visible = false;
    	
    	// turn on end text 
    	if (score < highScore)
				endText.text = 'Your Score: ' + score + '\n' + 'Top Score: ' + highScore;
		else
			endText.text = 'Your Score: ' + score + '\n' + 'Is New Top Score';
    	endText.visible = true;
		
		outcome = 'Win';
		
		saveHighScore();
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
	
	// move dog according to input position
	function moveDog(pos){
		if (pos == 0){	// right
			dog.x = 560;
			dog.y = 280;
		}
		else if (pos == 1){	// top
			dog.x = 400;
			dog.y = 100;
		}
		else if (pos == 2){	// left
			dog.x = 200;
			dog.y = 280;
		}
		else {				// bottom
			dog.x = 400;
			dog.y = 440;
		}
	}
	
	// randomly move the dog
	function randomlyMoveDog(){
		randomDogMove = Math.floor(Math.random()*2);
		if (randomDogMove == 1){  // move when random = 1; no move when random = 0
			randomDogPos = Math.floor(Math.random()*4);
			
			// DOG AT RIGHT
			if ( (dog.x == 560) && (dog.y == 280) ){
			
				// if not human at 2,3, and comp at 0,1
				if ((!( ( ((human1.x == 400) && (human1.y == 300) && (human2.x == 220) && (human2.y == 460)) 
					  || ((human2.x == 400) && (human2.y == 300) && (human1.x == 220) && (human1.y == 460)) )
					&& ( ((comp1.x == 220) && (comp1.y == 130) && (comp2.x == 580) && (comp2.y == 130))
						|| ((comp2.x == 220) && (comp2.y == 130) && (comp1.x == 580) && (comp1.y == 130)) ) ))

					&& // not human at 2,0, and comp at 3,4
					(!( ( ((human1.x == 400) && (human1.y == 300) && (human2.x == 220) && (human2.y == 130)) 
					  || ((human2.x == 400) && (human2.y == 300) && (human1.x == 220) && (human1.y == 130)) )
					&& ( ((comp1.x == 220) && (comp1.y == 460) && (comp2.x == 580) && (comp2.y == 460))
						|| ((comp2.x == 220) && (comp2.y == 460) && (comp1.x == 580) && (comp1.y == 460)) ) )) ){
		
					// 1.human at 2 and 4
					if ( ((human1.x == 400) && (human1.y == 300) && (human2.x == 580) && (human2.y == 460)) 
						|| ((human2.x == 400) && (human2.y == 300) && (human1.x == 580) && (human1.y == 460)) ){
					
						// comp at 0 and 1
						if ( ((comp1.x == 220) && (comp1.y == 130) && (comp2.x == 580) && (comp2.y == 130))
							|| ((comp2.x == 220) && (comp2.y == 130) && (comp1.x == 580) && (comp1.y == 130)) ){
							while (randomDogPos == 2)
								randomDogPos = Math.floor(Math.random()*4);
						}
					
						// comp at 0 and 3
						else if ( ((comp1.x == 220) && (comp1.y == 130) && (comp2.x == 220) && (comp2.y == 460))
							|| ((comp2.x == 220) && (comp2.y == 130) && (comp1.x == 220) && (comp1.y == 460)) ){
							while (randomDogPos == 1)
								randomDogPos = Math.floor(Math.random()*4);
						}
					} 
				
					// 2.human at 2 and 3
					else if ( ((human1.x == 400) && (human1.y == 300) && (human2.x == 220) && (human2.y == 460)) 
						|| ((human2.x == 400) && (human2.y == 300) && (human1.x == 220) && (human1.y == 460)) ){
					
						// comp at 1 and 4
						if ( ((comp1.x == 580) && (comp1.y == 130) && (comp2.x == 580) && (comp2.y == 460))
							|| ((comp2.x == 580) && (comp2.y == 130) && (comp1.x == 580) && (comp1.y == 460)) ){
							while (randomDogPos == 1)
								randomDogPos = Math.floor(Math.random()*4);
						}
					
					}
				
					// 3.human at 3 and 4
					else if ( ((human1.x == 220) && (human1.y == 460) && (human2.x == 580) && (human2.y == 460)) 
						|| ((human2.x == 220) && (human2.y == 460) && (human1.x == 580) && (human1.y == 460)) ){

						//comp at 0 and 1						
						if ( ((comp1.x == 220) && (comp1.y == 130) && (comp2.x == 580) && (comp2.y == 130))
							|| ((comp2.x == 220) && (comp2.y == 130) && (comp1.x == 580) && (comp1.y == 130)) ){
							while (randomDogPos == 2)
								randomDogPos = Math.floor(Math.random()*4);
						}
					}

					// 4.human at 2 and 1
					if ( ((human1.x == 400) && (human1.y == 300) && (human2.x == 580) && (human2.y == 130)) 
						|| ((human2.x == 400) && (human2.y == 300) && (human1.x == 580) && (human1.y == 130)) ){
					
						// comp at 3 and 4
						if ( ((comp1.x == 220) && (comp1.y == 460) && (comp2.x == 580) && (comp2.y == 460))
							|| ((comp2.x == 220) && (comp2.y == 460) && (comp1.x == 580) && (comp1.y == 460)) ){
							while (randomDogPos == 2)
								randomDogPos = Math.floor(Math.random()*4);
						}
					
						// comp at 0 and 3
						else if ( ((comp1.x == 220) && (comp1.y == 130) && (comp2.x == 220) && (comp2.y == 460))
							|| ((comp2.x == 220) && (comp2.y == 130) && (comp1.x == 220) && (comp1.y == 460)) ){
							while (randomDogPos == 3)
								randomDogPos = Math.floor(Math.random()*4);
						}
					}

					// 5.human at 2 and 0
					else if ( ((human1.x == 400) && (human1.y == 300) && (human2.x == 220) && (human2.y == 130)) 
						|| ((human2.x == 400) && (human2.y == 300) && (human1.x == 220) && (human1.y == 130)) ){
					
						// comp at 1 and 4
						if ( ((comp1.x == 580) && (comp1.y == 130) && (comp2.x == 580) && (comp2.y == 460))
							|| ((comp2.x == 580) && (comp2.y == 130) && (comp1.x == 580) && (comp1.y == 460)) ){
							while (randomDogPos == 3)
								randomDogPos = Math.floor(Math.random()*4);
						}
					
					}

					// 6.human at 0 and 1
					else if ( ((human1.x == 220) && (human1.y == 130) && (human2.x == 580) && (human2.y == 130)) 
						|| ((human2.x == 220) && (human2.y == 130) && (human1.x == 580) && (human1.y == 130)) ){

						//comp at 3 and 4						
						if ( ((comp1.x == 220) && (comp1.y == 460) && (comp2.x == 580) && (comp2.y == 460))
							|| ((comp2.x == 220) && (comp2.y == 460) && (comp1.x == 580) && (comp1.y == 460)) ){
							while (randomDogPos == 2)
								randomDogPos = Math.floor(Math.random()*4);
						}
					}
				
					moveDog(randomDogPos);
				} // if not human at 2,3, and comp at 0,1; AND not human at 2,0, and comp at 3,4
			} // DOG AT RIGHT

			// DOG AT LEFT
			else if ( (dog.x == 200) && (dog.y == 280) ){
			
				// if NOT human at 2,4, and comp at 0,1
				if ((!( ( ((human1.x == 400) && (human1.y == 300) && (human2.x == 580) && (human2.y == 460)) 
					  || ((human2.x == 400) && (human2.y == 300) && (human1.x == 580) && (human1.y == 460)) )
					&& ( ((comp1.x == 220) && (comp1.y == 130) && (comp2.x == 580) && (comp2.y == 130))
						|| ((comp2.x == 220) && (comp2.y == 130) && (comp1.x == 580) && (comp1.y == 130)) ) ))

					&& // not human at 2,1, and comp at 3,4
					(!( ( ((human1.x == 400) && (human1.y == 300) && (human2.x == 580) && (human2.y == 130)) 
					  || ((human2.x == 400) && (human2.y == 300) && (human1.x == 580) && (human1.y == 130)) )
					&& ( ((comp1.x == 220) && (comp1.y == 460) && (comp2.x == 580) && (comp2.y == 460))
						|| ((comp2.x == 220) && (comp2.y == 460) && (comp1.x == 580) && (comp1.y == 460)) ) )) ){
		
					// 1.human at 2 and 3
					if ( ((human1.x == 400) && (human1.y == 300) && (human2.x == 220) && (human2.y == 460)) 
						|| ((human2.x == 400) && (human2.y == 300) && (human1.x == 220) && (human1.y == 460)) ){
					
						// comp at 0 and 1
						if ( ((comp1.x == 220) && (comp1.y == 130) && (comp2.x == 580) && (comp2.y == 130))
							|| ((comp2.x == 220) && (comp2.y == 130) && (comp1.x == 580) && (comp1.y == 130)) ){
							while (randomDogPos == 0)
								randomDogPos = Math.floor(Math.random()*4);
						}
					
						// comp at 1 and 4
						else if ( ((comp1.x == 580) && (comp1.y == 130) && (comp2.x == 580) && (comp2.y == 460))
							|| ((comp2.x == 580) && (comp2.y == 130) && (comp1.x == 580) && (comp1.y == 460)) ){
							while (randomDogPos == 1)
								randomDogPos = Math.floor(Math.random()*4);
						}
					} 
				
					// 2.human at 2 and 4
					else if ( ((human1.x == 400) && (human1.y == 300) && (human2.x == 580) && (human2.y == 460)) 
						|| ((human2.x == 400) && (human2.y == 300) && (human1.x == 580) && (human1.y == 460)) ){
					
						// comp at 0 and 3
						if ( ((comp1.x == 220) && (comp1.y == 130) && (comp2.x == 580) && (comp2.y == 130))
							|| ((comp2.x == 220) && (comp2.y == 130) && (comp1.x == 220) && (comp1.y == 460)) ){
							while (randomDogPos == 1)
								randomDogPos = Math.floor(Math.random()*4);
						}
					
					}
				
					// 3.human at 3 and 4
					else if ( ((human1.x == 220) && (human1.y == 460) && (human2.x == 580) && (human2.y == 460)) 
						|| ((human2.x == 220) && (human2.y == 460) && (human1.x == 580) && (human1.y == 460)) ){

						//comp at 0 and 1						
						if ( ((comp1.x == 220) && (comp1.y == 130) && (comp2.x == 580) && (comp2.y == 130))
							|| ((comp2.x == 220) && (comp2.y == 130) && (comp1.x == 580) && (comp1.y == 130)) ){
							while (randomDogPos == 0)
								randomDogPos = Math.floor(Math.random()*4);
						}
					}

					// 4.human at 2 and 0
					if ( ((human1.x == 400) && (human1.y == 300) && (human2.x == 220) && (human2.y == 130)) 
						|| ((human2.x == 400) && (human2.y == 300) && (human1.x == 220) && (human1.y == 130)) ){
					
						// comp at 3 and 4
						if ( ((comp1.x == 220) && (comp1.y == 460) && (comp2.x == 580) && (comp2.y == 460))
							|| ((comp2.x == 220) && (comp2.y == 460) && (comp1.x == 580) && (comp1.y == 460)) ){
							while (randomDogPos == 0)
								randomDogPos = Math.floor(Math.random()*4);
						}
					
						// comp at 1 and 4
						else if ( ((comp1.x == 580) && (comp1.y == 130) && (comp2.x == 580) && (comp2.y == 460))
							|| ((comp2.x == 580) && (comp2.y == 130) && (comp1.x == 580) && (comp1.y == 460)) ){
							while (randomDogPos == 3)
								randomDogPos = Math.floor(Math.random()*4);
						}
					}

					// 5.human at 2 and 1
					else if ( ((human1.x == 400) && (human1.y == 300) && (human2.x == 580) && (human2.y == 130)) 
						|| ((human2.x == 400) && (human2.y == 300) && (human1.x == 580) && (human1.y == 130)) ){
					
						// comp at 0 and 3
						if ( ((comp1.x == 220) && (comp1.y == 130) && (comp2.x == 220) && (comp2.y == 460))
							|| ((comp2.x == 220) && (comp2.y == 130) && (comp1.x == 220) && (comp1.y == 460)) ){
							while (randomDogPos == 3)
								randomDogPos = Math.floor(Math.random()*4);
						}
					
					}

					// 6.human at 0 and 1
					else if ( ((human1.x == 220) && (human1.y == 130) && (human2.x == 580) && (human2.y == 130)) 
						|| ((human2.x == 220) && (human2.y == 130) && (human1.x == 580) && (human1.y == 130)) ){

						//comp at 3 and 4						
						if ( ((comp1.x == 220) && (comp1.y == 460) && (comp2.x == 580) && (comp2.y == 460))
							|| ((comp2.x == 220) && (comp2.y == 460) && (comp1.x == 580) && (comp1.y == 460)) ){
							while (randomDogPos == 0)
								randomDogPos = Math.floor(Math.random()*4);
						}
					}
				
					moveDog(randomDogPos);
				} // if NOT human at 2,4, and comp at 0,1; AND not human at 2,1, and comp at 3,4
			} // DOG AT LEFT

			// DOG AT TOP
			else if ( (dog.x == 400) && (dog.y == 100) ){
			
				// if NOT human at 2,3, and comp at 4,1
				if ((!( ( ((human1.x == 400) && (human1.y == 300) && (human2.x == 220) && (human2.y == 460)) 
					  || ((human2.x == 400) && (human2.y == 300) && (human1.x == 220) && (human1.y == 460)) )
					&& ( ((comp1.x == 580) && (comp1.y == 460) && (comp2.x == 580) && (comp2.y == 130))
						|| ((comp2.x == 580) && (comp2.y == 460) && (comp1.x == 580) && (comp1.y == 130)) ) ))

					&& // not human at 2,4, and comp at 3,0
					(!( ( ((human1.x == 400) && (human1.y == 300) && (human2.x == 580) && (human2.y == 460)) 
					  || ((human2.x == 400) && (human2.y == 300) && (human1.x == 580) && (human1.y == 460)) )
					&& ( ((comp1.x == 220) && (comp1.y == 460) && (comp2.x == 220) && (comp2.y == 130))
						|| ((comp2.x == 220) && (comp2.y == 460) && (comp1.x == 220) && (comp1.y == 130)) ) )) ){
		
					// 1.human at 2 and 0
					if ( ((human1.x == 400) && (human1.y == 300) && (human2.x == 220) && (human2.y == 460)) 
						|| ((human2.x == 400) && (human2.y == 300) && (human1.x == 220) && (human1.y == 460)) ){
					
						// comp at 1 and 4
						if ( ((comp1.x == 580) && (comp1.y == 130) && (comp2.x == 580) && (comp2.y == 460))
							|| ((comp2.x == 580) && (comp2.y == 130) && (comp1.x == 580) && (comp1.y == 460)) ){
							while (randomDogPos == 3)
								randomDogPos = Math.floor(Math.random()*4);
						}
					
						// comp at 3 and 4
						else if ( ((comp1.x == 220) && (comp1.y == 460) && (comp2.x == 580) && (comp2.y == 460))
							|| ((comp2.x == 220) && (comp2.y == 460) && (comp1.x == 580) && (comp1.y == 460)) ){
							while (randomDogPos == 0)
								randomDogPos = Math.floor(Math.random()*4);
						}
					} 
				
					// 2.human at 2 and 3
					else if ( ((human1.x == 400) && (human1.y == 300) && (human2.x == 220) && (human2.y == 460)) 
						|| ((human2.x == 400) && (human2.y == 300) && (human1.x == 220) && (human1.y == 460)) ){
					
						// comp at 0 and 1
						if ( ((comp1.x == 220) && (comp1.y == 130) && (comp2.x == 580) && (comp2.y == 130))
							|| ((comp2.x == 220) && (comp2.y == 130) && (comp1.x == 580) && (comp1.y == 130)) ){
							while (randomDogPos == 0)
								randomDogPos = Math.floor(Math.random()*4);
						}
					
					}
				
					// 3.human at 3 and 0
					else if ( ((human1.x == 220) && (human1.y == 460) && (human2.x == 220) && (human2.y == 130)) 
						|| ((human2.x == 220) && (human2.y == 460) && (human1.x == 220) && (human1.y == 130)) ){

						//comp at 4 and 1						
						if ( ((comp1.x == 580) && (comp1.y == 460) && (comp2.x == 580) && (comp2.y == 130))
							|| ((comp2.x == 580) && (comp2.y == 460) && (comp1.x == 580) && (comp1.y == 130)) ){
							while (randomDogPos == 3)
								randomDogPos = Math.floor(Math.random()*4);
						}
					}

					// 4.human at 2 and 1
					if ( ((human1.x == 400) && (human1.y == 300) && (human2.x == 580) && (human2.y == 130)) 
						|| ((human2.x == 400) && (human2.y == 300) && (human1.x == 580) && (human1.y == 130)) ){
					
						// comp at 3 and 0
						if ( ((comp1.x == 220) && (comp1.y == 460) && (comp2.x == 220) && (comp2.y == 130))
							|| ((comp2.x == 220) && (comp2.y == 460) && (comp1.x == 220) && (comp1.y == 130)) ){
							while (randomDogPos == 3)
								randomDogPos = Math.floor(Math.random()*4);
						}
					
						// comp at 3 and 4
						else if ( ((comp1.x == 220) && (comp1.y == 460) && (comp2.x == 580) && (comp2.y == 460))
							|| ((comp2.x == 220) && (comp2.y == 460) && (comp1.x == 580) && (comp1.y == 460)) ){
							while (randomDogPos == 2)
								randomDogPos = Math.floor(Math.random()*4);
						}
					}

					// 5.human at 2 and 4
					else if ( ((human1.x == 400) && (human1.y == 300) && (human2.x == 580) && (human2.y == 460)) 
						|| ((human2.x == 400) && (human2.y == 300) && (human1.x == 580) && (human1.y == 460)) ){
					
						// comp at 0 and 1
						if ( ((comp1.x == 220) && (comp1.y == 130) && (comp2.x == 580) && (comp2.y == 130))
							|| ((comp2.x == 220) && (comp2.y == 130) && (comp1.x == 580) && (comp1.y == 130)) ){
							while (randomDogPos == 2)
								randomDogPos = Math.floor(Math.random()*4);
						}
					
					}

					// 6.human at 4 and 1
					else if ( ((human1.x == 580) && (human1.y == 460) && (human2.x == 580) && (human2.y == 130)) 
						|| ((human2.x == 580) && (human2.y == 460) && (human1.x == 580) && (human1.y == 130)) ){

						//comp at 3 and 0						
						if ( ((comp1.x == 220) && (comp1.y == 460) && (comp2.x == 220) && (comp2.y == 130))
							|| ((comp2.x == 220) && (comp2.y == 460) && (comp1.x == 220) && (comp1.y == 130)) ){
							while (randomDogPos == 3)
								randomDogPos = Math.floor(Math.random()*4);
						}
					}
				
					moveDog(randomDogPos);
				} // if NOT human at 2,3, and comp at 4,1; AND not human at 2,4, and comp at 3,0
			} // DOG AT TOP

			// DOG AT BOTTOM
			else if ( (dog.x == 400) && (dog.y == 440) ){
			
				// if NOT human at 2,1, and comp at 0,3
				if ((!( ( ((human1.x == 400) && (human1.y == 300) && (human2.x == 580) && (human2.y == 130)) 
					  || ((human2.x == 400) && (human2.y == 300) && (human1.x == 580) && (human1.y == 130)) )
					&& ( ((comp1.x == 220) && (comp1.y == 130) && (comp2.x == 220) && (comp2.y == 460))
						|| ((comp2.x == 220) && (comp2.y == 130) && (comp1.x == 220) && (comp1.y == 460)) ) ))

					&& // not human at 2,0, and comp at 1,4
					(!( ( ((human1.x == 400) && (human1.y == 300) && (human2.x == 220) && (human2.y == 130)) 
					  || ((human2.x == 400) && (human2.y == 300) && (human1.x == 220) && (human1.y == 130)) )
					&& ( ((comp1.x == 580) && (comp1.y == 130) && (comp2.x == 580) && (comp2.y == 460))
						|| ((comp2.x == 580) && (comp2.y == 130) && (comp1.x == 580) && (comp1.y == 460)) ) )) ){
		
					// 1.human at 2 and 4
					if ( ((human1.x == 400) && (human1.y == 300) && (human2.x == 580) && (human2.y == 460)) 
						|| ((human2.x == 400) && (human2.y == 300) && (human1.x == 580) && (human1.y == 460)) ){
					
						// comp at 0 and 3
						if ( ((comp1.x == 220) && (comp1.y == 130) && (comp2.x == 220) && (comp2.y == 460))
							|| ((comp2.x == 220) && (comp2.y == 130) && (comp1.x == 220) && (comp1.y == 460)) ){
							while (randomDogPos == 1)
								randomDogPos = Math.floor(Math.random()*4);
						}
					
						// comp at 3 and 4
						else if ( ((comp1.x == 220) && (comp1.y == 460) && (comp2.x == 580) && (comp2.y == 460))
							|| ((comp2.x == 220) && (comp2.y == 460) && (comp1.x == 580) && (comp1.y == 460)) ){
							while (randomDogPos == 0)
								randomDogPos = Math.floor(Math.random()*4);
						}
					} 
				
					// 2.human at 2 and 1
					else if ( ((human1.x == 400) && (human1.y == 300) && (human2.x == 580) && (human2.y == 130)) 
						|| ((human2.x == 400) && (human2.y == 300) && (human1.x == 580) && (human1.y == 130)) ){
					
						// comp at 3 and 4
						if ( ((comp1.x == 220) && (comp1.y == 460) && (comp2.x == 580) && (comp2.y == 460))
							|| ((comp2.x == 220) && (comp2.y == 460) && (comp1.x == 580) && (comp1.y == 460)) ){
							while (randomDogPos == 2)
								randomDogPos = Math.floor(Math.random()*4);
						}
					
					}
				
					// 3.human at 3 and 0
					else if ( ((human1.x == 220) && (human1.y == 460) && (human2.x == 220) && (human2.y == 130)) 
						|| ((human2.x == 220) && (human2.y == 460) && (human1.x == 220) && (human1.y == 130)) ){

						//comp at 4 and 1						
						if ( ((comp1.x == 580) && (comp1.y == 460) && (comp2.x == 580) && (comp2.y == 130))
							|| ((comp2.x == 580) && (comp2.y == 460) && (comp1.x == 580) && (comp1.y == 130)) ){
							while (randomDogPos == 1)
								randomDogPos = Math.floor(Math.random()*4);
						}
					}

					// 4.human at 2 and 3
					if ( ((human1.x == 400) && (human1.y == 300) && (human2.x == 220) && (human2.y == 460)) 
						|| ((human2.x == 400) && (human2.y == 300) && (human1.x == 220) && (human1.y == 460)) ){
					
						// comp at 1 and 4
						if ( ((comp1.x == 580) && (comp1.y == 130) && (comp2.x == 580) && (comp2.y == 460))
							|| ((comp2.x == 580) && (comp2.y == 130) && (comp1.x == 580) && (comp1.y == 460)) ){
							while (randomDogPos == 1)
								randomDogPos = Math.floor(Math.random()*4);
						}
					
						// comp at 0 and 1
						else if ( ((comp1.x == 220) && (comp1.y == 130) && (comp2.x == 580) && (comp2.y == 130))
							|| ((comp2.x == 220) && (comp2.y == 130) && (comp1.x == 580) && (comp1.y == 130)) ){
							while (randomDogPos == 0)
								randomDogPos = Math.floor(Math.random()*4);
						}
					}

					// 5.human at 2 and 1
					else if ( ((human1.x == 400) && (human1.y == 300) && (human2.x == 580) && (human2.y == 130)) 
						|| ((human2.x == 400) && (human2.y == 300) && (human1.x == 580) && (human1.y == 130)) ){
					
						// comp at 3 and 4
						if ( ((comp1.x == 220) && (comp1.y == 460) && (comp2.x == 580) && (comp2.y == 460))
							|| ((comp2.x == 220) && (comp2.y == 460) && (comp1.x == 580) && (comp1.y == 460)) ){
							while (randomDogPos == 0)
								randomDogPos = Math.floor(Math.random()*4);
						}
					
					}

					// 6.human at 4 and 1
					else if ( ((human1.x == 580) && (human1.y == 460) && (human2.x == 580) && (human2.y == 130)) 
						|| ((human2.x == 580) && (human2.y == 460) && (human1.x == 580) && (human1.y == 130)) ){

						//comp at 3 and 0						
						if ( ((comp1.x == 220) && (comp1.y == 460) && (comp2.x == 220) && (comp2.y == 130))
							|| ((comp2.x == 220) && (comp2.y == 460) && (comp1.x == 220) && (comp1.y == 130)) ){
							while (randomDogPos == 1)
								randomDogPos = Math.floor(Math.random()*4);
						}
					}
				
					moveDog(randomDogPos);
				} // if NOT human at 2,3, and comp at 4,1; AND not human at 2,4, and comp at 3,0
			} // DOG AT BOTTOM
		}
	}
	
	// this is a complex AI algorithm of the chess game
	// AI does calculates the best move, and does not make mistake.
	function compTurn(){
		// dog: (560, 280) right side, (400, 440) bottom
		// (200, 280) left side, (400, 100) top
		
		// DOG AT RIGHT
		if ( (dog.x == 560) && (dog.y == 280) ){
		
			// 1.human at 3 and 4
			if ( ((human1.x == 220) && (human1.y == 460) && (human2.x == 580) && (human2.y == 460)) 
				|| ((human2.x == 220) && (human2.y == 460) && (human1.x == 580) && (human1.y == 460)) ){
				
				// 1 comp at 2
				if ((comp1.x == 400) && (comp1.y == 300))
					compMove(comp2);
				else if ((comp2.x == 400) && (comp2.y == 300))
					compMove(comp1);
				// comp at 0 and 1
				else if ((comp1.x == 220) && (comp1.y == 130) && (comp2.x == 580) && (comp2.y == 130))
						compMove(comp2);
				else if ((comp2.x == 220) && (comp2.y == 130) && (comp1.x == 580) && (comp1.y == 130))
						compMove(comp1);
						
				if (compSuccessMove)
					compSuccessMove = false;
			} // human at 3 and 4
			
			// 2.human at 2 and 4
			else if ( ((human1.x == 400) && (human1.y == 300) && (human2.x == 580) && (human2.y == 460)) 
				|| ((human2.x == 400) && (human2.y == 300) && (human1.x == 580) && (human1.y == 460)) ){
				
				// comp at 1 and 3
				if ((comp1.x == 220) && (comp1.y == 460) && (comp2.x == 580) && (comp2.y == 130)){
					compMove(comp2);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				else if ((comp2.x == 220) && (comp2.y == 460) && (comp1.x == 580) && (comp1.y == 130)){
					compMove(comp1);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				// comp at 0 and 1; or 0 and 3
				else {
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
				} // comp at 0 and 1; or 0 and 3
			} // human at 2 and 4
			
			// 3.human at 2 and 3
			else if ( ((human1.x == 400) && (human1.y == 300) && (human2.x == 220) && (human2.y == 460)) 
				|| ((human2.x == 400) && (human2.y == 300) && (human1.x == 220) && (human1.y == 460)) ){
				
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
			} // human at 2 and 3
			
			// 4.human at 0 and 3
			else if ( ((human1.x == 220) && (human1.y == 130) && (human2.x == 220) && (human2.y == 460)) 
				|| ((human2.x == 220) && (human2.y == 130) && (human1.x == 220) && (human1.y == 460)) ){
				
				// comp at 2 and 4; or 1 and 2
				if ((comp1.x == 400) && (comp1.y == 300)){
					compMove(comp1);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				else if ((comp2.x == 400) && (comp2.y == 300)){
					compMove(comp2);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				// comp at 1 and 4
				else { 
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
				} // comp at 1 and 4
			} // human at 0 and 3
			 
			// 5.human at 0 and 2
			else if ( ((human1.x == 220) && (human1.y == 130) && (human2.x == 400) && (human2.y == 300)) 
				|| ((human2.x == 220) && (human2.y == 130) && (human1.x == 400) && (human1.y == 300)) ){
				
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
			} // human at 0 and 2
			
			// 6.human at 0 and 1
			else if ( ((human1.x == 220) && (human1.y == 130) && (human2.x == 580) && (human2.y == 130)) 
				|| ((human2.x == 220) && (human2.y == 130) && (human1.x == 580) && (human1.y == 130)) ){
				
				// 1 comp at 2
				if ((comp1.x == 400) && (comp1.y == 300))
					compMove(comp2);
				else if ((comp2.x == 400) && (comp2.y == 300))
					compMove(comp1);
				// comp at 3 and 4
				else if ((comp1.x == 220) && (comp1.y == 460) && (comp2.x == 580) && (comp2.y == 460))
						compMove(comp2);
				else if ((comp2.x == 220) && (comp2.y == 460) && (comp1.x == 580) && (comp1.y == 460))
						compMove(comp1);
				
				if (compSuccessMove)
						compSuccessMove = false;
			} // human at 0 and 1
			
			// 7.human at 1 and 2
			else if ( ((human1.x == 580) && (human1.y == 130) && (human2.x == 400) && (human2.y == 300)) 
				|| ((human2.x == 580) && (human2.y == 130) && (human1.x == 400) && (human1.y == 300)) ){
				
				// comp at 0 and 4
				if ((comp1.x == 220) && (comp1.y == 130) && (comp2.x == 580) && (comp2.y == 460)){
					compMove(comp2);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				else if ((comp2.x == 220) && (comp2.y == 130) && (comp1.x == 580) && (comp1.y == 460)){
					compMove(comp1);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				// comp at 0 and 3; or 3 and 4
				else {
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
				} // comp at 0 and 3; or 3 and 4
			} // human at 1 and 2
			
			// 8.human at 1 and 4
			else if ( ((human1.x == 580) && (human1.y == 130) && (human2.x == 580) && (human2.y == 460)) 
				|| ((human2.x == 580) && (human2.y == 130) && (human1.x == 580) && (human1.y == 460)) ){
				
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
			} // human at 1 and 4
			
			// 9.human at 0 and 4
			else if ( ((human1.x == 220) && (human1.y == 130) && (human2.x == 580) && (human2.y == 460)) 
				|| ((human2.x == 220) && (human2.y == 130) && (human1.x == 580) && (human1.y == 460)) ){
				
				// comp at 1 and 3
				if ((comp1.x == 580) && (comp1.y == 130) && (comp2.x == 220) && (comp2.y == 460)){
					compMove(comp2);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				else if ((comp2.x == 580) && (comp2.y == 130) && (comp1.x == 220) && (comp1.y == 460)){
					compMove(comp1);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				else { // comp at 1 and 2; or 2 and 3
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
				} // comp at 1 and 2; or 2 and 3
			} // human at 0 and 4
			
			// 10.human at 1 and 3
			else if ( ((human1.x == 580) && (human1.y == 130) && (human2.x == 220) && (human2.y == 460)) 
				|| ((human2.x == 580) && (human2.y == 130) && (human1.x == 220) && (human1.y == 460)) ){
				
				// comp at 0 and 4
				if ((comp1.x == 220) && (comp1.y == 130) && (comp2.x == 580) && (comp2.y == 460)){
					compMove(comp1);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				else if ((comp2.x == 220) && (comp2.y == 130) && (comp1.x == 580) && (comp1.y == 460)){
					compMove(comp2);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				else { // comp at 0 and 2; or 2 and 4
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
				} // comp at 0 and 2; or 2 and 4
			} // human at 1 and 3
		} // DOG at right
		
		
		// DOG AT LEFT
		else if ( (dog.x == 200) && (dog.y == 280) ){
		
			// 1.human at 3 and 4
			if ( ((human1.x == 220) && (human1.y == 460) && (human2.x == 580) && (human2.y == 460)) 
				|| ((human2.x == 220) && (human2.y == 460) && (human1.x == 580) && (human1.y == 460)) ){
				
				// 1 comp at 2
				if ((comp1.x == 400) && (comp1.y == 300))
					compMove(comp2);
				else if ((comp2.x == 400) && (comp2.y == 300))
					compMove(comp1);
				// comp at 0 and 1
				else if ((comp1.x == 220) && (comp1.y == 130) && (comp2.x == 580) && (comp2.y == 130))
						compMove(comp1);
				else if ((comp2.x == 220) && (comp2.y == 130) && (comp1.x == 580) && (comp1.y == 130))
						compMove(comp2);
						
				if (compSuccessMove)
					compSuccessMove = false;
			} // human at 3 and 4
			
			// 2.human at 2 and 3
			else if ( ((human1.x == 400) && (human1.y == 300) && (human2.x == 220) && (human2.y == 460)) 
				|| ((human2.x == 400) && (human2.y == 300) && (human1.x == 220) && (human1.y == 460)) ){
				
				// comp at 0 and 4
				if ((comp1.x == 220) && (comp1.y == 130) && (comp2.x == 580) && (comp2.y == 460)){
					compMove(comp1);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				else if ((comp2.x == 220) && (comp2.y == 130) && (comp1.x == 580) && (comp1.y == 460)){
					compMove(comp2);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				// comp at 0 and 1; or 1 and 4
				else {
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
				} // comp at 0 and 1; or 1 and 3
			} // human at 2 and 3
			
			// 3.human at 2 and 4
			else if ( ((human1.x == 400) && (human1.y == 300) && (human2.x == 580) && (human2.y == 460)) 
				|| ((human2.x == 400) && (human2.y == 300) && (human1.x == 580) && (human1.y == 460)) ){
				
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
			} // human at 2 and 4
			
			// 4.human at 1 and 4
			else if ( ((human1.x == 580) && (human1.y == 130) && (human2.x == 580) && (human2.y == 460)) 
				|| ((human2.x == 580) && (human2.y == 130) && (human1.x == 580) && (human1.y == 460)) ){
				
				// comp at 2 and 3; or 0 and 2
				if ((comp1.x == 400) && (comp1.y == 300)){
					compMove(comp1);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				else if ((comp2.x == 400) && (comp2.y == 300)){
					compMove(comp2);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				// comp at 0 and 3
				else { 
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
				} // comp at 0 and 3
			} // human at 1 and 4
			 
			// 5.human at 1 and 2
			else if ( ((human1.x == 580) && (human1.y == 130) && (human2.x == 400) && (human2.y == 300)) 
				|| ((human2.x == 580) && (human2.y == 130) && (human1.x == 400) && (human1.y == 300)) ){
				
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
			} // human at 1 and 2
			
			// 6.human at 0 and 1
			else if ( ((human1.x == 220) && (human1.y == 130) && (human2.x == 580) && (human2.y == 130)) 
				|| ((human2.x == 220) && (human2.y == 130) && (human1.x == 580) && (human1.y == 130)) ){
				
				// 1 comp at 2
				if ((comp1.x == 400) && (comp1.y == 300))
					compMove(comp2);
				else if ((comp2.x == 400) && (comp2.y == 300))
					compMove(comp1);
				// comp at 3 and 4
				else if ((comp1.x == 220) && (comp1.y == 460) && (comp2.x == 580) && (comp2.y == 460))
						compMove(comp1);
				else if ((comp2.x == 220) && (comp2.y == 460) && (comp1.x == 580) && (comp1.y == 460))
						compMove(comp2);
				
				if (compSuccessMove)
						compSuccessMove = false;
			} // human at 0 and 1
			
			// 7.human at 0 and 2
			else if ( ((human1.x == 220) && (human1.y == 130) && (human2.x == 400) && (human2.y == 300)) 
				|| ((human2.x == 220) && (human2.y == 130) && (human1.x == 400) && (human1.y == 300)) ){
				
				// comp at 1 and 3
				if ((comp1.x == 580) && (comp1.y == 130) && (comp2.x == 220) && (comp2.y == 460)){
					compMove(comp2);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				else if ((comp2.x == 220) && (comp2.y == 130) && (comp1.x == 580) && (comp1.y == 460)){
					compMove(comp1);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				// comp at 0 and 3; or 3 and 4
				else {
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
				} // comp at 0 and 3; or 3 and 4
			} // human at 0 and 2
			
			// 8.human at 0 and 3
			else if ( ((human1.x == 220) && (human1.y == 130) && (human2.x == 220) && (human2.y == 460)) 
				|| ((human2.x == 220) && (human2.y == 130) && (human1.x == 220) && (human1.y == 460)) ){
				
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
			} // human at 0 and 3
			
			// 9.human at 1 and 3
			else if ( ((human1.x == 580) && (human1.y == 130) && (human2.x == 220) && (human2.y == 460)) 
				|| ((human2.x == 580) && (human2.y == 130) && (human1.x == 220) && (human1.y == 460)) ){
				
				// comp at 0 and 4
				if ((comp1.x == 220) && (comp1.y == 130) && (comp2.x == 580) && (comp2.y == 460)){
					compMove(comp2);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				else if ((comp2.x == 220) && (comp2.y == 130) && (comp1.x == 580) && (comp1.y == 460)){
					compMove(comp1);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				else { // comp at 1 and 2; or 2 and 3
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
				} // comp at 1 and 2; or 2 and 3
			} // human at 1 and 3
			
			// 10.human at 0 and 4
			else if ( ((human1.x == 220) && (human1.y == 130) && (human2.x == 580) && (human2.y == 460)) 
				|| ((human2.x == 220) && (human2.y == 130) && (human1.x == 580) && (human1.y == 460)) ){
				
				// comp at 1 and 3
				if ((comp1.x == 580) && (comp1.y == 130) && (comp2.x == 220) && (comp2.y == 460)){
					compMove(comp1);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				else if ((comp2.x == 580) && (comp2.y == 130) && (comp1.x == 220) && (comp1.y == 460)){
					compMove(comp2);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				else { // comp at 1 and 2; or 2 and 3
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
				} // comp at 1 and 2; or 2 and 3
			} // human at 0 and 4
		} // DOG at left
		
		// DOG AT BOTTOM
		else if ( (dog.x == 400) && (dog.y == 440) ){
		
			// 1.human at 3 and 4
			if ( ((human1.x == 220) && (human1.y == 460) && (human2.x == 580) && (human2.y == 460)) 
				|| ((human2.x == 220) && (human2.y == 460) && (human1.x == 580) && (human1.y == 460)) ){
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
			} // human at 3 and 4
			
			// 2.human at 2 and 4
			else if ( ((human1.x == 400) && (human1.y == 300) && (human2.x == 580) && (human2.y == 460)) 
				|| ((human2.x == 400) && (human2.y == 300) && (human1.x == 580) && (human1.y == 460)) ){
				
				// comp at 1 and 3
				if ((comp1.x == 580) && (comp1.y == 130) && (comp2.x == 220) && (comp2.y == 460)){
					compMove(comp2);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				else if ((comp2.x == 580) && (comp2.y == 130) && (comp1.x == 220) && (comp1.y == 460)){
					compMove(comp1);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				// comp at 0 and 1; or 1 and 4
				else {
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
				} // comp at 0 and 1; or 1 and 3
			}
			
			// 3.human at 2 and 3
			else if ( ((human1.x == 400) && (human1.y == 300) && (human2.x == 220) && (human2.y == 460)) 
				|| ((human2.x == 400) && (human2.y == 300) && (human1.x == 220) && (human1.y == 460)) ){
				
				// comp at 0 and 4
				if ((comp1.x == 220) && (comp1.y == 130) && (comp2.x == 580) && (comp2.y == 460)){
					compMove(comp2);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				else if ((comp2.x == 580) && (comp2.y == 130) && (comp1.x == 220) && (comp1.y == 460)){
					compMove(comp1);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				// comp at 0 and 1; or 1 and 4
				else {
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
				} // comp at 0 and 1; or 1 and 3
			} // human at 2 and 3
			
			// 4.human at 0 and 1
			else if ( ((human1.x == 220) && (human1.y == 130) && (human2.x == 580) && (human2.y == 130)) 
				|| ((human2.x == 220) && (human2.y == 130) && (human1.x == 580) && (human1.y == 130)) ){
				
				// comp at 2 and 3; or 2 and 4
				if ((comp1.x == 400) && (comp1.y == 300)){
					compMove(comp1);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				else if ((comp2.x == 400) && (comp2.y == 300)){
					compMove(comp2);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				// comp at 3 and 4
				else { 
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
				} // comp at 3 and 4
			} // human at 0 and 1
			
			// 5.human at 1 and 2
			else if ( ((human1.x == 580) && (human1.y == 130) && (human2.x == 400) && (human2.y == 300)) 
				|| ((human2.x == 580) && (human2.y == 130) && (human1.x == 400) && (human1.y == 300)) ){
				
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
			} // human at 1 and 2
			
			// 6.human at 0 and 2
			else if ( ((human1.x == 220) && (human1.y == 130) && (human2.x == 400) && (human2.y == 300)) 
				|| ((human2.x == 220) && (human2.y == 130) && (human1.x == 400) && (human1.y == 300)) ){
				
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
			} // human at 0 and 2
			
			// 7.human at 0 and 4
			else if ( ((human1.x == 220) && (human1.y == 130) && (human2.x == 580) && (human2.y == 460)) 
				|| ((human2.x == 220) && (human2.y == 130) && (human1.x == 580) && (human1.y == 460)) ){
				
				// comp at 1 and 3
				if ((comp1.x == 580) && (comp1.y == 130) && (comp2.x == 220) && (comp2.y == 460)){
					compMove(comp1);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				else if ((comp2.x == 580) && (comp2.y == 130) && (comp1.x == 220) && (comp1.y == 460)){
					compMove(comp2);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				else { // comp at 1 and 2; or 2 and 3
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
				} // comp at 1 and 2; or 2 and 3
			} // human at 0 and 4
			
			// 8.human at 1 and 3
			else if ( ((human1.x == 580) && (human1.y == 130) && (human2.x == 220) && (human2.y == 460)) 
				|| ((human2.x == 580) && (human2.y == 130) && (human1.x == 220) && (human1.y == 460)) ){
				
				// comp at 0 and 4
				if ((comp1.x == 220) && (comp1.y == 130) && (comp2.x == 580) && (comp2.y == 460)){
					compMove(comp1);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				else if ((comp2.x == 220) && (comp2.y == 130) && (comp1.x == 580) && (comp1.y == 460)){
					compMove(comp2);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				else { // comp at 0 and 2; or 2 and 4
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
				} // comp at 1 and 2; or 2 and 3
			} // human at 1 and 3
			
			// 9.human at 1 and 4
			else if ( ((human1.x == 580) && (human1.y == 130) && (human2.x == 580) && (human2.y == 460)) 
				|| ((human2.x == 580) && (human2.y == 130) && (human1.x == 580) && (human1.y == 460)) ){
				
				// 1 comp at 2
				if ((comp1.x == 400) && (comp1.y == 300))
					compMove(comp2);
				else if ((comp2.x == 400) && (comp2.y == 300))
					compMove(comp1);
				// comp at 0 and 3
				else if ((comp1.x == 220) && (comp1.y == 130) && (comp2.x == 220) && (comp2.y == 460))
						compMove(comp2);
				else if ((comp2.x == 220) && (comp2.y == 130) && (comp1.x == 220) && (comp1.y == 460))
						compMove(comp1);
						
				if (compSuccessMove)
					compSuccessMove = false;
			} // human at 1 and 4
			
			// 10.human at 0 and 3
			else if ( ((human1.x == 220) && (human1.y == 130) && (human2.x == 220) && (human2.y == 460)) 
				|| ((human2.x == 220) && (human2.y == 130) && (human1.x == 220) && (human1.y == 460)) ){
				
				// 1 comp at 2
				if ((comp1.x == 400) && (comp1.y == 300))
					compMove(comp2);
				else if ((comp2.x == 400) && (comp2.y == 300))
					compMove(comp1);
				// comp at 1 and 4
				else if ((comp1.x == 580) && (comp1.y == 130) && (comp2.x == 580) && (comp2.y == 460))
						compMove(comp2);
				else if ((comp2.x == 580) && (comp2.y == 130) && (comp1.x == 580) && (comp1.y == 460))
						compMove(comp1);
						
				if (compSuccessMove)
					compSuccessMove = false;
			} // human at 0 and 3
		
		} // DOG at bottom
		
		// DOG AT TOP
		else if ( (dog.x == 400) && (dog.y == 100) ){
		
			// 1. human at 3 and 4
			if ( ((human1.x == 220) && (human1.y == 460) && (human2.x == 580) && (human2.y == 460)) 
				|| ((human2.x == 220) && (human2.y == 460) && (human1.x == 580) && (human1.y == 460)) ){
				
				// comp at 0 and 2; or 1 and 2
				if ((comp1.x == 400) && (comp1.y == 300)){
					compMove(comp1);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				else if ((comp2.x == 400) && (comp2.y == 300)){
					compMove(comp2);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				// comp at 0 and 1
				else { 
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
				} // comp at 0 and 1
			} // human at 3 and 4
			
			// 2. human at 2 and 4
			else if ( ((human1.x == 400) && (human1.y == 300) && (human2.x == 580) && (human2.y == 460)) 
				|| ((human2.x == 400) && (human2.y == 300) && (human1.x == 580) && (human1.y == 460)) ){
				
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
			} // human at 2 and 4
			
			// 3. human at 2 and 3
			else if ( ((human1.x == 220) && (human1.y == 460) && (human2.x == 400) && (human2.y == 300)) 
				|| ((human2.x == 220) && (human2.y == 460) && (human1.x == 400) && (human1.y == 300)) ){
				
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
			} // human at 2 and 4
			
			// 4. human at 0 and 1
			else if ( ((human1.x == 220) && (human1.y == 130) && (human2.x == 580) && (human2.y == 130)) 
				|| ((human2.x == 220) && (human2.y == 130) && (human1.x == 580) && (human1.y == 130)) ){
				
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
			} // human at 0 and 1
			
			// 5. human at 1 and 2
			else if ( ((human1.x == 580) && (human1.y == 130) && (human2.x == 400) && (human2.y == 300)) 
				|| ((human2.x == 580) && (human2.y == 130) && (human1.x == 400) && (human1.y == 300)) ){
				
				// comp at 0 and 4
				if ((comp1.x == 220) && (comp1.y == 130) && (comp2.x == 580) && (comp2.y == 460)){
					compMove(comp1);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				else if ((comp2.x == 220) && (comp2.y == 130) && (comp1.x == 580) && (comp1.y == 460)){
					compMove(comp2);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				// comp at 0 and 3; or 3 and 4
				else {
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
				} // comp at 0 and 3; or 3 and 4
			} // human at 1 and 2
			
			// 6. human at 0 and 2
			else if ( ((human1.x == 220) && (human1.y == 130) && (human2.x == 400) && (human2.y == 300)) 
				|| ((human2.x == 220) && (human2.y == 130) && (human1.x == 400) && (human1.y == 300)) ){
				
				// comp at 1 and 3
				if ((comp1.x == 580) && (comp1.y == 130) && (comp2.x == 220) && (comp2.y == 460)){
					compMove(comp1);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				else if ((comp2.x == 580) && (comp2.y == 130) && (comp1.x == 220) && (comp1.y == 460)){
					compMove(comp2);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				// comp at 1 and 4; or 3 and 4
				else {
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
				} // comp at 0 and 3; or 3 and 4
			} // human at 0 and 2
			
			// 7.human at 0 and 3
			else if ( ((human1.x == 220) && (human1.y == 130) && (human2.x == 220) && (human2.y == 460)) 
				|| ((human2.x == 220) && (human2.y == 130) && (human1.x == 220) && (human1.y == 460)) ){
				
				// 1 comp at 2
				if ((comp1.x == 400) && (comp1.y == 300))
					compMove(comp2);
				else if ((comp2.x == 400) && (comp2.y == 300))
					compMove(comp1);
				// comp at 1 and 4
				else if ((comp1.x == 580) && (comp1.y == 130) && (comp2.x == 580) && (comp2.y == 460))
						compMove(comp1);
				else if ((comp2.x == 580) && (comp2.y == 130) && (comp1.x == 580) && (comp1.y == 460))
						compMove(comp2);
						
				if (compSuccessMove)
					compSuccessMove = false;
			} // human at 0 and 3
			
			// 8.human at 1 and 4
			else if ( ((human1.x == 580) && (human1.y == 130) && (human2.x == 580) && (human2.y == 460)) 
				|| ((human2.x == 580) && (human2.y == 130) && (human1.x == 580) && (human1.y == 460)) ){
				
				// 1 comp at 2
				if ((comp1.x == 400) && (comp1.y == 300))
					compMove(comp2);
				else if ((comp2.x == 400) && (comp2.y == 300))
					compMove(comp1);
				// comp at 0 and 3
				else if ((comp1.x == 220) && (comp1.y == 130) && (comp2.x == 220) && (comp2.y == 460))
						compMove(comp1);
				else if ((comp2.x == 220) && (comp2.y == 130) && (comp1.x == 220) && (comp1.y == 460))
						compMove(comp2);
						
				if (compSuccessMove)
					compSuccessMove = false;
			} // human at 1 and 4
			
			// 9.human at 1 and 3
			else if ( ((human1.x == 580) && (human1.y == 130) && (human2.x == 220) && (human2.y == 460)) 
				|| ((human2.x == 580) && (human2.y == 130) && (human1.x == 220) && (human1.y == 460)) ){
				
				// comp at 0 and 4
				if ((comp1.x == 220) && (comp1.y == 130) && (comp2.x == 580) && (comp2.y == 460)){
					compMove(comp2);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				else if ((comp2.x == 220) && (comp2.y == 130) && (comp1.x == 580) && (comp1.y == 460)){
					compMove(comp1);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				else { // comp at 0 and 2; or 2 and 4
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
				} // comp at 1 and 2; or 2 and 3
			} // human at 1 and 3
			
			// 10.human at 0 and 4
			else if ( ((human1.x == 220) && (human1.y == 130) && (human2.x == 580) && (human2.y == 460)) 
				|| ((human2.x == 220) && (human2.y == 130) && (human1.x == 580) && (human1.y == 460)) ){
				
				// comp at 1 and 3
				if ((comp1.x == 580) && (comp1.y == 130) && (comp2.x == 220) && (comp2.y == 460)){
					compMove(comp2);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				else if ((comp2.x == 580) && (comp2.y == 130) && (comp1.x == 220) && (comp1.y == 460)){
					compMove(comp1);
					if (compSuccessMove)
						compSuccessMove = false;
				}
				else { // comp at 1 and 2; or 2 and 3
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
				} // comp at 1 and 2; or 2 and 3
			} // human at 0 and 4
		} // DOG at top
	} // function compTurn()
	
	function getHighScore(){
		// retrieve high score from local storage
			if(localStorage.getItem(localStorageName) == null) {
				highScore = 0;
			} else {
				highScore = localStorage.getItem(localStorageName);
			}
	}
	
	function saveHighScore(){
		// compare score to current high score
		// if score is higher than current high score
		// set it to high score and save to local storage
		highScore = Math.max(score, highScore);
		localStorage.setItem(localStorageName, highScore);
		localStorage.setItem(localStorageNameOutcome, outcome);
	}
	
    
    return {  // Begin game state functions ----------------------------------------------
    
        create: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            
            // Add music
			music = game.add.audio('impossibleMusic');
			music.loop = true;
			music.play();
			
			bark = game.add.audio('bark');
			click = game.add.audio('click');
            
            //  A simple background for our game
			background = game.add.sprite( 0, 0, 'impossibleBG' );
			
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
            
            // Create a sprite at the between start and main menu using the 'exit' image.
            exit = game.add.sprite(410, 570, 'exit' );
            // Anchor the sprite at its center, as opposed to its top-left corner.
            // so it will be truly centered.
            exit.anchor.setTo( 0.5, 0.5 );
            
            // When you click on the sprite, you go back to the Main Menu.
            exit.inputEnabled = true;
            exit.events.onInputDown.add( function() { exitGame(); }, this );
            
            // Create a sprite on the right using the 'menu' image.
            menu = game.add.sprite(540, 570, 'menu' );
            // Anchor the sprite at its center, as opposed to its top-left corner.
            // so it will be truly centered.
            menu.anchor.setTo( 0.5, 0.5 );
            
            // When you click on the sprite, you go back to the Main Menu.
            menu.inputEnabled = true;
            menu.events.onInputDown.add( function() { mainMenu(); }, this );	
            
            // Add score text using a CSS style.
            scoreText = game.add.text(game.world.centerX, 10, '');
            scoreText.anchor.setTo( 0.5, 0.0 );
            scoreText.align = 'center';
            
            //  Font style
			scoreText.font = 'Arial Black';
			scoreText.fontSize = 40;
			scoreText.fontWeight = 'bold';
			scoreText.fill = '#ff1bff';
		
			// text shadow
			scoreText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
			
			// Add ending text using a CSS style.
			endText = game.add.text(game.world.centerX, 60, '');
			endText.anchor.setTo( 0.5, 0.0 );
			endText.align = 'center';
		
			//  Font style
			endText.font = 'Arial Black';
			endText.fontSize = 25;
			endText.fontWeight = 'bold';
			endText.fill = '#030bfc';
	
			// text shadow
			endText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
			
			// make end text invisible
			endText.visible = false;
		
			// add message text
			text = game.add.text(game.world.centerX, 5, '');
			text.anchor.setTo( 0.5, 0.0 );
			text.align = 'center';
	
			//  Font style
			text.font = 'Arial Black';
			text.fontSize = 50;
			text.fontWeight = 'bold';
			text.fill = '#f7fd29';
	
			// text shadow
			text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
			
			// turn off text
			text.visible = false;
			
			// Add time text using a CSS style.
			timeText = game.add.text(game.world.centerX, 180, '');
			timeText.anchor.setTo( 0.5, 0.0 );
			timeText.align = 'center';
		
			//  Font style
			timeText.font = 'Arial Black';
			timeText.fontSize = 30;
			timeText.fontWeight = 'bold';
			timeText.fill = '#E90524';
	
			// text shadow
			timeText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
			
			score = 0;
			getHighScore();
        },
    
        update: function () {
        	if (compLost){
        		playerWon();
        	}
        	
        	// update score text
        	scoreText.text = "Score: " + score;
            
            // decrease time limit as score increases
            if (score >=50){
            	time = 1;
            }
            else if (score >=34){
            	time = 2;
            }
			else if (score >=26){
				time = 3;
            }
			else if (score >=22){
				time = 4;
            }
			else if (score >=18){
				time = 5;
            }
			else if (score >=14){
				time = 6;
            }
			else if (score >=8){
				time = 7;
            }
        }
    };
};
