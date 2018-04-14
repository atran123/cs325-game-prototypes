"use strict";

GameStates.makeClassic = function( game, shared ) {
    // Create your own variables.
    var restart = null;
    var menu = null;
    var i, j, k;
	var background = null;
	var music = null;
	var card = [];
	var goal = [];
	var emptySquare = null;
	var movesText = null; 
	var goalText = null; 
	var text = null;
	var moves = null;;
    
    // Handle clicking events on the cards ----------------------------------------------
    function listener (sprite) {
    
		if (sprite == card[0][0]){
			if (card[0][1].animations.frame == 52){
				card[0][1].animations.frame = card[0][0].animations.frame;
				card[0][0].animations.frame = 52;
				moves++;
			}
			else if (card[1][0].animations.frame == 52){
				card[1][0].animations.frame = card[0][0].animations.frame;
				card[0][0].animations.frame = 52;
				moves++;
			}
		} 
	
		else if (sprite == card[0][1]){
			if (card[0][0].animations.frame == 52){
				card[0][0].animations.frame = card[0][1].animations.frame;
				card[0][1].animations.frame = 52;
				moves++;
			}
			else if (card[1][1].animations.frame == 52){
				card[1][1].animations.frame = card[0][1].animations.frame;
				card[0][1].animations.frame = 52;
				moves++;
			}
			else if (card[0][2].animations.frame == 52){
				card[0][2].animations.frame = card[0][1].animations.frame;
				card[0][1].animations.frame = 52;
				moves++;
			}
		}
	
		else if (sprite == card[0][2]){
			if (card[0][1].animations.frame == 52){
				card[0][1].animations.frame = card[0][2].animations.frame;
				card[0][2].animations.frame = 52;
				moves++;
			}
			else if (card[1][2].animations.frame == 52){
				card[1][2].animations.frame = card[0][2].animations.frame;
				card[0][2].animations.frame = 52;
				moves++;
			}
		}
	
		else if (sprite == card[1][0]){
			if (card[1][1].animations.frame == 52){
				card[1][1].animations.frame = card[1][0].animations.frame;
				card[1][0].animations.frame = 52;
				moves++;
			}
			else if (card[0][0].animations.frame == 52){
				card[0][0].animations.frame = card[1][0].animations.frame;
				card[1][0].animations.frame = 52;
				moves++;
			}
			else if (card[2][0].animations.frame == 52){
				card[2][0].animations.frame = card[1][0].animations.frame;
				card[1][0].animations.frame = 52;
				moves++;
			}
		}
	
		else if (sprite == card[1][1]){
			if (card[1][0].animations.frame == 52){
				card[1][0].animations.frame = card[1][1].animations.frame;
				card[1][1].animations.frame = 52;
				moves++;
			}
			else if (card[1][2].animations.frame == 52){
				card[1][2].animations.frame = card[1][1].animations.frame;
				card[1][1].animations.frame = 52;
				moves++;
			}
			else if (card[0][1].animations.frame == 52){
				card[0][1].animations.frame = card[1][1].animations.frame;
				card[1][1].animations.frame = 52;
				moves++;
			}
			else if (card[2][1].animations.frame == 52){
				card[2][1].animations.frame = card[1][1].animations.frame;
				card[1][1].animations.frame = 52;
				moves++;
			}
		}
	
		else if (sprite == card[1][2]){
			if (card[0][2].animations.frame == 52){
				card[0][2].animations.frame = card[1][2].animations.frame;
				card[1][2].animations.frame = 52;
				moves++;
			}
			else if (card[1][1].animations.frame == 52){
				card[1][1].animations.frame = card[1][2].animations.frame;
				card[1][2].animations.frame = 52;
				moves++;
			}
			else if (card[2][2].animations.frame == 52){
				card[2][2].animations.frame = card[1][2].animations.frame;
				card[1][2].animations.frame = 52;
				moves++;
			}
		}
		else if (sprite == card[2][0]){
			if (card[1][0].animations.frame == 52){
				card[1][0].animations.frame = card[2][0].animations.frame;
				card[2][0].animations.frame = 52;
				moves++;
			}
			else if (card[2][1].animations.frame == 52){
				card[2][1].animations.frame = card[2][0].animations.frame;
				card[2][0].animations.frame = 52;
				moves++;
			}
		}
	
		else if (sprite == card[2][1]){
			if (card[2][0].animations.frame == 52){
				card[2][0].animations.frame = card[2][1].animations.frame;
				card[2][1].animations.frame = 52;
				moves++;
			}
			else if (card[1][1].animations.frame == 52){				
				card[1][1].animations.frame = card[2][1].animations.frame;
				card[2][1].animations.frame = 52;
				moves++;
			}
			else if (card[2][2].animations.frame == 52){
				card[2][2].animations.frame = card[2][1].animations.frame;
				card[2][1].animations.frame = 52;
				moves++;
			}
		}
	
		else if (sprite == card[2][2]){
			if (card[2][1].animations.frame == 52){
				card[2][1].animations.frame = card[2][2].animations.frame;
				card[2][2].animations.frame = 52;
				moves++;
			}
			else if (card[1][2].animations.frame == 52){
				card[1][2].animations.frame = card[2][2].animations.frame;
				card[2][2].animations.frame = 52;
				moves++;
			}
		}
	
		if ((card[0][0].animations.frame == 0) && (card[0][1].animations.frame == 1) 
			&& (card[0][2].animations.frame == 2) && (card[1][0].animations.frame == 3) 
			&& (card[1][1].animations.frame == 4) && (card[1][2].animations.frame == 5) 
			&& (card[2][0].animations.frame == 6) && (card[2][1].animations.frame == 7)){

			text.text = "COMPLETED!";
			for (i=0; i<3; i++){
				for (j=0; j<3; j++){
					card[i][j].inputEnabled = false;
				}
			}
		}
	}
    
    function quitGame1() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
        //resetScores();
        moves = 0;
		music.stop();

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');
    }
    
    function quitGame2() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
        //resetScores();
        moves = 0;
		music.stop();

        //  Then let's go back to the main menu.
        game.state.restart();
    }
    
    // Randomize the cards ----------------------------------------------
    function randomizer(){

		var random1 = Math.floor(Math.random()*2);
		var random2 = Math.floor(Math.random()*3);
		var random3 = Math.floor(Math.random()*2);
		var random4 = Math.floor(Math.random()*3);
		var random5 = Math.floor(Math.random()*4);
		var random6 = Math.floor(Math.random()*3);
		var random7 = Math.floor(Math.random()*2);
		var random8 = Math.floor(Math.random()*3);
		var random9 = Math.floor(Math.random()*2);
	
		if (emptySquare == card[0][0]){
			if (random1 == 0){
				card[0][0].animations.frame = card[0][1].animations.frame;
				card[0][1].animations.frame = 52;
				emptySquare = card[0][1];
			}
			else if (random1 == 1){
				card[0][0].animations.frame = card[1][0].animations.frame;
				card[1][0].animations.frame = 52;
				emptySquare = card[1][0];
			}
		} 
	
		else if (emptySquare == card[0][1]){
			if (random2 == 0){
				card[0][1].animations.frame = card[0][2].animations.frame;
				card[0][2].animations.frame = 52;
				emptySquare = card[0][2];
			}
			else if (random2 == 1){
				card[0][1].animations.frame = card[1][1].animations.frame;
				card[1][1].animations.frame = 52;
				emptySquare = card[1][1];
			}
			if (random2 == 2){
				card[0][1].animations.frame = card[0][0].animations.frame;
				card[0][0].animations.frame = 52;
				emptySquare = card[0][0];
			}
		}
	
		else if (emptySquare == card[0][2]){
			if (random3 == 0){
				card[0][2].animations.frame = card[1][2].animations.frame;
				card[1][2].animations.frame = 52;
				emptySquare = card[1][2];
			}
			else if (random3 == 1){
				card[0][2].animations.frame = card[0][1].animations.frame;
				card[0][1].animations.frame = 52;
				emptySquare = card[0][1];
			}
		
		}
	
		else if (emptySquare == card[1][0]){
			if (random4 == 0){
				card[1][0].animations.frame = card[0][0].animations.frame;
				card[0][0].animations.frame = 52;
				emptySquare = card[0][0];
			}
			else if (random4 == 1){
				card[1][0].animations.frame = card[1][1].animations.frame;
				card[1][1].animations.frame = 52;
				emptySquare = card[1][1];
			}
			else if (random4 == 2){
				card[1][0].animations.frame = card[2][0].animations.frame;
				card[2][0].animations.frame = 52;
				emptySquare = card[2][0];
			}
		}
	
		else if (emptySquare == card[1][1]){
			if (random5 == 0){
				card[1][1].animations.frame = card[1][0].animations.frame;
				card[1][0].animations.frame = 52;
				emptySquare = card[1][0];
			}
			else if (random5 == 1){
				card[1][1].animations.frame = card[0][1].animations.frame;
				card[0][1].animations.frame = 52;
				emptySquare = card[0][1];
			}
			else if (random5 == 2){
				card[1][1].animations.frame = card[1][2].animations.frame;
				card[1][2].animations.frame = 52;
				emptySquare = card[1][2];
			}
			else if (random5 == 3){
				card[1][1].animations.frame = card[2][1].animations.frame;
				card[2][1].animations.frame = 52;
				emptySquare = card[2][1];
			}
		}
	
		else if (emptySquare == card[1][2]){
			if (random6 == 0){
				card[1][2].animations.frame = card[2][2].animations.frame;
				card[2][2].animations.frame = 52;
				emptySquare = card[2][2];
			}
			else if (random6 == 1){
				card[1][2].animations.frame = card[1][1].animations.frame;
				card[1][1].animations.frame = 52;
				emptySquare = card[1][1];
			}
			else if (random6 == 2){
				card[1][2].animations.frame = card[0][2].animations.frame;
				card[0][2].animations.frame = 52;
				emptySquare = card[0][2];
			}
		
		}
		else if (emptySquare == card[2][0]){
			if (random7 == 0){
				card[2][0].animations.frame = card[1][0].animations.frame;
				card[1][0].animations.frame = 52;
				emptySquare = card[1][0];
			}
			else if (random7 == 1){
				card[2][0].animations.frame = card[2][1].animations.frame;
				card[2][1].animations.frame = 52;
				emptySquare = card[2][1];
			}
		}
	
		else if (emptySquare == card[2][1]){
			if (random8 == 0){
				card[2][1].animations.frame = card[2][0].animations.frame;
				card[2][0].animations.frame = 52;
				emptySquare = card[2][0];
			}
			else if (random8 == 1){				
				card[2][1].animations.frame = card[1][1].animations.frame;
				card[1][1].animations.frame = 52;
				emptySquare = card[1][1];
			}
			else if (random8 == 2){
				card[2][1].animations.frame = card[2][2].animations.frame;
				card[2][2].animations.frame = 52;
				emptySquare = card[2][2];
			}
		}
	
		else if (emptySquare == card[2][2]){
			if (random9 == 0){
				card[2][2].animations.frame = card[2][1].animations.frame;
				card[2][1].animations.frame = 52;
				emptySquare = card[2][1];
			}
			else if (random9 == 1){
				card[2][2].animations.frame = card[1][2].animations.frame;
				card[1][2].animations.frame = 52;
				emptySquare = card[1][2];
			}
		}
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
			
            // Create a sprite at the center of the screen using the 'restart' image.
            restart = game.add.sprite(180, game.world.height-60, 'restart' );
            // Anchor the sprite at its center, as opposed to its top-left corner.
            // so it will be truly centered.
            restart.anchor.setTo( 0.5, 0.5 );
            
            // When you click on the sprite, you go back to the MainMenu.
            restart.inputEnabled = true;
            restart.events.onInputDown.add( function() { quitGame2(); }, this );
            
            // Create a sprite at the center of the screen using the 'menu' image.
            menu = game.add.sprite(610, game.world.height-60, 'menu' );
            // Anchor the sprite at its center, as opposed to its top-left corner.
            // so it will be truly centered.
            menu.anchor.setTo( 0.5, 0.5 );
            
            // When you click on the sprite, you restart current game.
            menu.inputEnabled = true;
            menu.events.onInputDown.add( function() { quitGame1(); }, this );
            
            // Add some text using a CSS style.
            movesText = game.add.text(game.world.centerX-300, 50, 'Moves: 0', { fontSize: '40px', fill: '#fF0', align: "center"  });
			goalText = game.add.text(game.world.centerX+165, 50, 'Goal', { fontSize: '40px', fill: '#EE0000', align: "center"  });
			text = game.add.text(game.world.centerX-140, 440, '', { fontSize: '40px', fill: '#228bff', align: "center"  });
            
            // Create goal sprites
			goal[0] = game.add.sprite(530, game.world.height-404, 'cards',26);
			goal[1] = game.add.sprite(530+83, game.world.height-404, 'cards',27);
			goal[2] = game.add.sprite(530+83*2, game.world.height-404, 'cards',28);
	
			goal[3] = game.add.sprite(530, game.world.height-322, 'cards',29);
			goal[4] = game.add.sprite(530+83, game.world.height-322, 'cards',30);
			goal[5] = game.add.sprite(530+83*2, game.world.height-322, 'cards',31);
	
			goal[6] = game.add.sprite(530, game.world.height-240, 'cards',32);
			goal[7] = game.add.sprite(530+83, game.world.height-240, 'cards',33);
			goal[8] = game.add.sprite(530+83*2, game.world.height-240, 'cards',52);
			
			// Anchor the sprites at its center, as opposed to their top-left corner.
            // so they will be truly centered.
			for (i=0; i<9; i++)
				goal[i].anchor.setTo(0.5,0.5);
				
			// Create player card sprites
			for (i=0; i<3; i++){
				card[i]= new Array(3);
			}
	
			card[0][0] = game.add.sprite(100, game.world.height-404, 'cards',0);
			card[0][1] = game.add.sprite(100+83, game.world.height-404, 'cards',1);
			card[0][2] = game.add.sprite(100+83*2, game.world.height-404, 'cards',2);
	
			card[1][0] = game.add.sprite(100, game.world.height-322, 'cards',3);
			card[1][1] = game.add.sprite(100+83, game.world.height-322, 'cards',4);
			card[1][2] = game.add.sprite(100+83*2, game.world.height-322, 'cards',5);
	
			card[2][0] = game.add.sprite(100, game.world.height-240, 'cards',6);
			card[2][1] = game.add.sprite(100+83, game.world.height-240, 'cards',7);
			card[2][2] = game.add.sprite(100+83*2, game.world.height-240, 'cards',52);
			
			// Anchor the sprites at its center, as opposed to their top-left corner.
            // so they will be truly centered.
			for (i=0; i<3; i++)
				for (j=0; j<3; j++)
					card[i][j].anchor.setTo(0.5,0.5);
					
			// enable input and click events on cards
			for (i=0; i<3; i++){
				for (j=0; j<3; j++){
					card[i][j].inputEnabled = true;
					card[i][j].events.onInputDown.add(listener, this);
				}
			}
			
			// randomize the cards
			emptySquare = card[2][2];
			for (k=0; k<100000; k++){
				randomizer();
			}
			
			// Initialize the moves counter
			moves = 0;
        },
    
        update: function () {
            movesText.text = "Moves: " + moves;
        }
    };
};
