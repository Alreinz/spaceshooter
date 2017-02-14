
var stateLoadAssets = {
	
	preload: function() {
		game.load.image('title', 'res/placeholders/title.png');
		game.load.audio('keysfx', 'res/sounds/key_press.wav');
		
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
		game.state.start(STATE_CAMPAIGN);
	 }
};