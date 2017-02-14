// Player and player project properties and methods
var player;

// Player properties
var healthMAX = 10000;
var health = healthMAX;
var playerSpeed = 350;
var playerAcceleration = 100;

// Player Bullet properties
var bulletDamage = 10;
var bulletSpread = 0.3;
var bulletSpeed = 2000;
var shootDelayMAX = 3;
var shootDelay = 0;

function playerCreate() {
	player = game.add.sprite( GAME_WIDTH / 2, (GAME_HEIGHT / 2) + 200, 'player');
	player.anchor.setTo(0.5, 0.5);
	player.scale.setTo(1);
	game.physics.enable(player, Phaser.Physics.ARCADE);
	
	bullets = game.add.group();
	bullets.enableBody = true;
	bullets.physicsBodyType = Phaser.Physics.ARCADE;
	bullets.createMultiple(200, 'player_projectile');
	bullets.setAll('anchor.x', 0.5);
	bullets.setAll('anchor.y', 0.5);
	bullets.setAll('outOfBoundsKill', true);
	bullets.setAll('checkWorldBounds', true);	
}

function playerUpdate() {
    //  Reset the player, then check for movement keys
    player.body.velocity.setTo(0, 0);
    var key = input.keyboard;
    if ( (key.isDown(Phaser.KeyCode.LEFT) || key.isDown(Phaser.KeyCode.A)) && player.x > player.width ) {
        player.body.velocity.x = -playerSpeed;
    }
    if ( (key.isDown(Phaser.KeyCode.RIGHT) || key.isDown(Phaser.KeyCode.D)) && player.x <= GAME_WIDTH - player.width ) {
        player.body.velocity.x = playerSpeed;
    }
    if ( (key.isDown(Phaser.KeyCode.UP) || key.isDown(Phaser.KeyCode.W)) && player.y > player.height) {
        player.body.velocity.y = -playerSpeed;
    }
    if ( (key.isDown(Phaser.KeyCode.DOWN) || key.isDown(Phaser.KeyCode.S)) && player.y <= GAME_HEIGHT - player.height + 10) {
        player.body.velocity.y = playerSpeed;
    }
    if ( clickLeft.isDown || buttonShoot.isDown ) { 
        playerShoot();
    }
}

function playerShoot() {
	if( shootDelay == 0) {
		shootDelay = shootDelayMAX;
		// Get player position
		var playerx = player.x;
		var playery = player.y;
	
		// shoot 4 bullets
		for ( var i = 0; i < 4; i++ ) {
			var bullet = bullets.getFirstExists(false);
			var startx =  player.x + (i * 10) - 15;
			var starty = player.y - 20;
			
			bullet.reset(startx, starty);
			bullet.damage = bulletDamage;
			bullet.body.setSize(24, 24, 4, 4);
			bullet.body.velocity.y = -bulletSpeed; // negative speed to go up
		}
	}
}

function shootDrone() {
	if ( shootDelay == 0) {
		shootDelay = shootDelayMAX;
		// Get mouse position
		var pointerx = input.mousePointer.worldX;
		var pointery = input.mousePointer.worldY;
		var playerx = player.x;
		var playery = player.y;
		
		// True target
		var targetAngle = game.math.angleBetweenPoints(new Phaser.Point(playerx, playery), new Phaser.Point(pointerx, pointery));
		
		var startx =  player.x + (Math.cos(targetAngle) * 15);
		var starty = player.y + (Math.sin(targetAngle) * 15);

		// Spread target
		var spreadAngle = targetAngle + game.rnd.realInRange(-bulletSpread,bulletSpread);
		
		var movex = bulletSpeed * Math.cos(spreadAngle);
		var movey = bulletSpeed * Math.sin(spreadAngle);
		
		var bullet = bullets.getFirstExists(false);
		health = health - 5;
		
		if (bullet) {
			//  And fire it
			bullet.reset(startx, starty);
			bullet.body.velocity.x = movex;
			bullet.body.velocity.y = movey;
			bullet.body.setSize(24, 24, 4, 4);
			bullet.damage = bulletDamage;
			bullet.angle = (spreadAngle * (180/Math.PI)) - 90;
		}
	}
}
