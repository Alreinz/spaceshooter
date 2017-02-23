
var stateCampaign = {
	
	create: function () {        
		graphics = game.add.graphics(0, 0);
		graphics.lineStyle(2,  "0xFFFFFF", 100);
		graphics.drawRect(0,  0, GAME_WIDTH, GAME_HEIGHT);
		
		enemyData = game.cache.getJSON('enemyData').enemyData;
		bossData = game.cache.getJSON('enemyData').enemyData;
		projectileData = game.cache.getJSON('projectile').projectileData;
		projectilePatternData = game.cache.getJSON('projectilePattern').patternData;
		var levelScriptData = game.cache.getText('level_1d');
		
		enemies = game.add.group();
		enemies.enableBody = true;
		enemies.physicsBodyType = Phaser.Physics.ARCADE;
        enemies.setAll('outOfBoundsKill', true);
        enemies.setAll('checkWorldBounds', true);
        
		enemyProjectileGroup = game.add.group();
		enemyProjectileGroup.enableBody = true;
		enemyProjectileGroup.physicsBodyType = Phaser.Physics.ARCADE;
        enemyProjectileGroup.setAll('outOfBoundsKill', true);
        enemyProjectileGroup.setAll('checkWorldBounds', true);
        
		loadScript(levelScriptData);
		playerCreate();
		
		input = game.input;
		game.input.mouse.capture = true;
		clickLeft = game.input.activePointer.leftButton;
		clickRight = game.input.activePointer.rightButton;
		buttonShoot = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},

	render: function () {
	
	},

	update: function () {
		if (player.alive) {
            playerUpdate();
		}
		
		if(shootDelay > 0) {
			shootDelay--;
		}
		
		enemies.forEachAlive(entityWaypointUpdate, this);
		enemyProjectileGroup.forEachAlive(entityWaypointUpdate, this);
		game.physics.arcade.overlap(bullets, enemies, bulletEnemyCollisionHandler, null, this);
	}
};

