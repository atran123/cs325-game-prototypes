"use strict";

GameStates.makeMainMenu = function( game, shared ) {

	var music = null;
	var playEasy = null;
	var playHard = null;
	var Exit = null;
	var Score = null;
	var text = null;
	
    function startEasy(pointer) {
        //	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        music.stop();

        //	And start the actual game
        game.state.start('Easy');
    }
    
    function startHard(pointer) {
        //	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        music.stop();

        //	And start the actual game
        game.state.start('Hard');
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
        	text = game.add.text(game.world.centerX-150, 50, 'Dodge the Dog');
        	text.anchor.setTo( 0.5, 0.0 );
        	text.align = 'center';
        	
        	//  Font style
			text.font = 'Avenir Black';
			text.fontSize = 60;
			text.fontWeight = 'bold';
			text.fill = '#FF0';
	
			// text shadow
			text.setShadow(5, 5, 'rgba(255,0,0,0.5)', 0);
            
            playEasy = game.add.button(130, 170, 'easy', startEasy, null);
            playHard = game.add.button(130, 265, 'hard', startHard, null);
            Score = game.add.button(260, 360, 'score', startScore, null);
            Exit = game.add.button(320, 450, 'exit_main', startExit, null);
        },
    
        update: function () {
            //	Do some nice funky main menu effect here
        }
    };
};
