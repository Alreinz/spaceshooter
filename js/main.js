

const ID_GAME = "game";
const GAME_WIDTH = 500;
const GAME_HEIGHT = 600;

const PLAYFIELD_WIDTH = 700;
const PLAYFIELD_HEIHT = 500;

const STATE_LOAD_ASSETS	= "load";
const STATE_MAIN_MENU 	= "main_menu";
const STATE_CAMPAIGN 	= "campaign";
const STATE_SETTINGS 	= "settings";

var game;
var graphics;
var gameStates;
var math;

// Game inputs
var input;
var buttonShoot;
var clickLeft;
var clickRight;

var style = { font: "15px Courier", fill: "#FFF" };

window.onload = function() {
	game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, ID_GAME);
	
	game.state.add(STATE_LOAD_ASSETS, stateLoadAssets);
	game.state.add(STATE_MAIN_MENU, stateMenu);
	game.state.add(STATE_CAMPAIGN, stateCampaign);
    
	game.state.start(STATE_LOAD_ASSETS);
	
	math = game.math;
	
	$("#" + ID_GAME).css({
		"width":GAME_WIDTH,
		"margin":"auto",
		"padding":"0px"
	});
};