"use strict";

GameStates.makeMainMenu = function( game, shared ) {

	var music = null;
	var playClassic = null;
	var playNew = null;
	var text = null;
	
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
        	
        	text = game.add.text(game.world.centerX-180, 50, 'Choose Game Style', { fontSize: '40px', fill: '#fF0', align: "center"  });
            
            playClassic = game.add.button(120, 480, 'classic', startClassic, null);
            playNew = game.add.button(570, 480, 'new', startNew, null);
        },
    
        update: function () {
            //	Do some nice funky main menu effect here
        }
    };
};
