"use strict";

GameStates.makeMainMenu = function( game, shared ) {

	var music = null;
	var playGame = null;
	var Exit = null;
	var Score = null;
	var text = null;
	
    function startGame(pointer) {
        //	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        music.stop();

        //	And start the actual game
        game.state.start('Game');
    }
    
    function startExit(pointer) {
        //	Ok, the Exit Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        music.stop();

        //	And exit game
        game.state.start('Exit');
    }
    
    function startScore(pointer) {
        //	Ok, the Exit Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        music.stop();

        //	And exit game
        game.state.start('Score');
    }
    
    return {
    
        create: function () {
    
            //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
            //	Here all we're doing is playing some music and adding a picture and button
            //	Naturally I expect you to do something significantly better :)
    
            music = game.add.audio('titleMusic');
            music.play();
    
            game.add.sprite(0, 0, 'titlePage');
        	
        	// Add some text using a CSS style.
			// Center it in X, and position its top 50 pixels from the top of the world.
        	text = game.add.text(game.world.centerX-200, 80, 'Main Menu', { fontSize: '60px', fill: '#fF0', align: "center"  });
        	text.anchor.setTo( 0.5, 0.0 );
            
            playGame = game.add.button(290, 270, 'play', startGame, null);
            Score = game.add.button(290, 360, 'score', startScore, null);
            Exit = game.add.button(320, 450, 'exit_main', startExit, null);
        },
    
        update: function () {
            //	Do some nice funky main menu effect here
        }
    };
};
