
var textStartGame;

var stateMenu = {
	
	preload: function() {
		game.load.image('title', 'res/placeholders/title.png');
		game.load.audio('keysfx', 'res/sounds/key_press.wav');
	},
	
	create: function() {
		sfxKeyPress = game.add.audio('keysfx');
		
		imageTitle = game.add.sprite( 0, 0, 'title');
		imageTitle.x = (GAME_WIDTH / 2) - (imageTitle.width / 2);
		imageTitle.y = (GAME_HEIGHT / 2) - (imageTitle.height / 2) - 50;
	
		var text = "Press space key to start game";
		textStartGame = game.add.text( (GAME_WIDTH / 2) - (4.5 * text.length), GAME_HEIGHT / 2, text, style);
		textStartGame.blinked = true;
		
		var buttonGameStart = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		buttonGameStart.onDown.addOnce(this.playGame, this);
		buttonGameStart.timer = game.time.create(false);
		buttonGameStart.timer.loop(250, this.blink, this);
		buttonGameStart.timer.start();
	},
	
	playGame: function() {
		sfxKeyPress.play();
		game.state.start(STATE_CAMPAIGN);
	},
	
	blink: function() {
		if ( textStartGame.blinked == true ) {
			textStartGame.blinked = false;
			textStartGame.setText("");
		}else {
			textStartGame.setText("Press space key to start game");
			textStartGame.blinked = true;
		}
	}
};