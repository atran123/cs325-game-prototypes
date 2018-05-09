"use strict";

GameStates.makePreloader = function( game ) {

	var background = null;
	var preloadBar = null;

	var ready = false;

    return {
    
        preload: function () {
    
            //	These are the assets we loaded in Boot.js
            //	A nice sparkly background and a loading progress bar
            background = game.add.sprite(0, 0, 'preloaderBackground');
            preloadBar = game.add.sprite(300, 400, 'preloaderBar');
    
            //	This sets the preloadBar sprite as a loader sprite.
            //	What that does is automatically crop the sprite from 0 to full-width
            //	as the files below are loaded in.
            game.load.setPreloadSprite(preloadBar);
    
            //	Here we load the rest of the assets our game needs.
            //	As this is just a Project Template I've not provided these assets, swap them for your own.
            game.load.image('titlePage', 'assets/dog_bg.jpg');
            //game.load.atlas('playButton', 'assets/play_button.png', 'assets/play_button.json');
            game.load.audio('titleMusic', ['assets/Game-Menu.mp3']);
            //	+ lots of other required assets here
            game.load.spritesheet('cards', 'assets/cards.gif', 81, 81);
            game.load.spritesheet('dog', 'assets/dog.png', 102, 81.5, 4);
            game.load.image('logo', 'assets/phaser.png');
			
			game.load.image('easyBG', 'assets/easyBG.jpg');
			game.load.image('hardBG', 'assets/hardBG.jpg');
			game.load.image('impossibleBG', 'assets/impossibleBG.jpg');
			
			game.load.image('easy', 'assets/easy.png');
			game.load.image('hard', 'assets/hard.png');
			game.load.image('impossible', 'assets/impossible.png');
			game.load.image('start', 'assets/start.png');
			game.load.image('menu', 'assets/menu.png');
			game.load.image('menu_score', 'assets/menu_score.png');
			game.load.image('exit', 'assets/exit.png');
			game.load.image('score', 'assets/score.png');
			game.load.image('exit_main', 'assets/exit_main.png');
			game.load.image('board', 'assets/board.png');
			game.load.image('comp', 'assets/comp.png');
			game.load.image('human', 'assets/human.png');
			game.load.audio('easyMusic', ['assets/easy.mp3']);
			game.load.audio('hardMusic', ['assets/hard.mp3']);
			game.load.audio('impossibleMusic', ['assets/impossible.mp3']);
			game.load.audio('bark', ['assets/bark.mp3']);
			game.load.audio('click', ['assets/push.mp3']);
        },
    
        create: function () {
    
            //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
            preloadBar.cropEnabled = false;
    
        },
    
        update: function () {
    
            //	You don't actually need to do this, but I find it gives a much smoother game experience.
            //	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
            //	You can jump right into the menu if you want and still play the music, but you'll have a few
            //	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
            //	it's best to wait for it to decode here first, then carry on.
            
            //	If you don't have any music in your game then put the game.state.start line into the create function and delete
            //	the update function completely.
            
            if (game.cache.isSoundDecoded('titleMusic') && ready == false)
            {
                ready = true;
                game.state.start('MainMenu');
            }
    
        }
    
    };
};
