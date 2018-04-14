"use strict";

GameStates.makeMainMenu = function( game, shared ) {

	var music = null;
	var playClassic = null;
	var playNew = null;
	
    function startClassic(pointer) {
        //	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        music.stop();

        //	And start the actual game
        game.state.start('Classic');
    }
    
    function startNew(pointer) {

        //	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        music.stop();

        //	And start the actual game
        game.state.start('New');
    }
    
    return {
    
        create: function () {
    
            //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
            //	Here all we're doing is playing some music and adding a picture and button
            //	Naturally I expect you to do something significantly better :)
    
            music = game.add.audio('titleMusic');
            music.play();
    
            game.add.sprite(0, 0, 'titlePage');
            
            playClassic = game.add.button( 303, 400, 'classic', startClassic, null);
            playNew = game.add.button( 603, 400, 'new', startNew, null);
        },
    
        update: function () {
            //	Do some nice funky main menu effect here
        }
    };
};
