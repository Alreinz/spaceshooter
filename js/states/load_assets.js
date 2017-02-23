var uiLoading;
var uiLoadingText;
var starField = [];
var progress;

WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() { game.time.events.add(Phaser.Timer.SECOND * 5, fontDoneLoaded, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Orbitron']
    }
};

function fontDoneLoaded() {
    uiLoadingText = game.add.text((GAME_WIDTH / 2) - 140, (GAME_HEIGHT / 2), "Loading", defaultFontStyle);
    uiLoadingText.font = 'Orbitron';
    console.log("Font \'loaded\'");
}

function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
    console.log(cacheKey + "-" + progress + "-" + totalLoaded + "/" + totalFiles);
}

var readyToLoad = false;
var loadingStarte = false;

var stateLoadAssets = {
	preload: function() {
        game.load.onFileComplete.add(fileComplete, this);
        game.load.onLoadComplete.add(this.loadComplete, this);
        
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        game.load.image('loading', 'res/ui/ui-loading.png');
        game.load.image('loading-text', 'res/ui/ui-loading-text.png');
        
        game.load.image('title', 'res/placeholders/title.png');
		game.load.audio('keysfx', 'res/sounds/key_press.wav');
        
        // UI elements
        // buttons
        game.load.image('button_easy',          'res/ui/button_easy.png');
        game.load.image('button_normal',        'res/ui/button_normal.png');
        game.load.image('button_settings',      'res/ui/button_settings.png');
        game.load.image('button_new_game',      'res/ui/button_new_game.png');
        game.load.image('button_level_select',  'res/ui/button_level_select.png');
        game.load.image('button_leaderboards',  'res/ui/button_leaderboards.png');
		
		// player
		game.load.image('player', 'res/player/player.png');
		game.load.spritesheet('player_projectile', 'res/player/player_projectile.png', 32, 32);

		// enemies
		game.load.image('enemy_ship_1', 'res/enemies/grunts/enemy_ship_1.png');
		game.load.image('enemy_ship_2', 'res/enemies/grunts/enemy_ship_2.png');
		game.load.image('enemy_ship_3', 'res/enemies/grunts/enemy_ship_3.png');
		game.load.image('enemy_ship_4', 'res/enemies/grunts/enemy_ship_4.png');
		game.load.image('enemy_ship_5', 'res/enemies/grunts/enemy_ship_5.png');
		game.load.image('enemy_ship_6', 'res/enemies/grunts/enemy_ship_6.png');
		game.load.image('enemy_ship_7', 'res/enemies/grunts/enemy_ship_7.png');
		game.load.image('enemy_ship_8', 'res/enemies/grunts/enemy_ship_8.png');
		game.load.image('enemy_ship_9', 'res/enemies/grunts/enemy_ship_9.png');
		game.load.image('enemy_ship_10', 'res/enemies/grunts/enemy_ship_10.png');
        
        // bosses
        game.load.image('enemy_boss_1', 'res/enemies/bosses/boss_1.png');
		
		// enemy bullets
		game.load.image('bullet_round_red', 'res/projectiles/bullet_round_red.png');
		game.load.image('bullet_round_blue', 'res/projectiles/bullet_round_blue.png');
		game.load.image('bullet_round_purple', 'res/projectiles/bullet_round_purple.png');
		game.load.image('bullet_round_yellow', 'res/projectiles/bullet_round_yellow.png');
		
		// visual effects
		game.load.spritesheet('explosion_small', 'res/effects/explosion_small.png', 16, 16);
		
		// scripts
		game.load.text('level_1a', 'data/scripts/level_1a.script');
		game.load.text('level_1b', 'data/scripts/level_1b.script');
		game.load.text('level_1c', 'data/scripts/level_1c.script');
		game.load.text('level_1d', 'data/scripts/level_1d.script');
        
		game.load.json('enemyData', 'data/enemy.json');
		game.load.json('bossData', 'data/enemy.json');
		game.load.json('projectile', 'data/projectile.json');
		game.load.json('projectilePattern', 'data/projectilePatterns.json');
	},
    
    create: function() { 
        uiLoading = game.add.sprite( GAME_WIDTH / 2, (GAME_HEIGHT / 2), 'loading');
        uiLoading.anchor.setTo(0.5, 0.5);
        uiLoading.scale.setTo(1);
        game.physics.enable(uiLoading, Phaser.Physics.ARCADE);
        
    },
    
    update: function() {
        uiLoading.angle -= 10;
    },
    
    loadComplete: function() {        
        console.log("Done Loading");
        game.state.start(STATE_CAMPAIGN);
    }
};