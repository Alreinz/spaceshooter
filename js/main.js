

const ID_GAME = "game";
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

const STATE_MAIN_MENU 	= 0x0001;
const STATE_CAMPAIGN 	= 0x0002;
const STATE_SETTINGS 	= 0x0003;

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
	game = new Phaser.Game(800, 600, Phaser.AUTO, ID_GAME);
	
	game.state.add(STATE_MAIN_MENU, stateMenu);
	game.state.add(STATE_CAMPAIGN, stateCampaign);
	
	game.state.start(STATE_MAIN_MENU);
	
	math = game.math;
	
	$("#" + ID_GAME).css({
		"width":GAME_WIDTH,
		"margin":"auto",
		"padding":"0px"
	});
};