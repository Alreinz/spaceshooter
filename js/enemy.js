// Player and player project properties and methods

// Enemy properties
var enemyBulletGroup;
var enemies;
var enemyData;

// Enemy bullet properties
var enemyHealthMAX = 100;

function entityWaypointUpdate(entity) {
	if( entity.hasWaypoint ) {
		entity.x = entity.pathx[entity.currentPath];
		entity.y = entity.pathy[entity.currentPath];
		if( entity.x == undefined ) {
			entity.body.velocity.x = 0;
		}
		if( entity.y == undefined ) {
			entity.body.velocity.y = 100;
		}
		if( entity.currentPath <= entity.pathTime ) {
			entity.currentPath++;
		}
		console.log(entity.x + " " + entity.y);
	}
}

function enemyCreate(name, x, y, pathIndex, patternIndex) {
	for( var i = 0; i < enemyData.length; i++ ) {
		if( name == enemyData[i].name ) {
			var sprite = enemyData[i].sprite;
			var health = enemyData[i].health;
			var path = enemyData[i].path[pathIndex];
			var collisionOffset = enemyData[i].collisionOffset;
			var pattern = enemyData[i].pattern;
			var enemy = enemies.create(x, y, sprite);
			
			enemy.id = enemies.total;
			enemy.anchor.setTo(0.5, 0.5);
			enemy.body.moves = true;
			enemy.body.setSize(24, 24, collisionOffset / 2, collisionOffset / 2);
			enemy.health = health;

			createWaypoints(enemy, path);
			createPattern(enemy, pattern);
			
			enemy.events.onKilled.add(explosion);
		}
	}
}

function createWaypoints(entity, path) {
	entity.hasWaypoint = true;
	var waypointsx = [];
	var waypointsy = [];
	waypointsx.push(entity.x);
	waypointsy.push(entity.y);
	for( var j = 0; j < path.waypoints.length; j++ ) {
		if( path.waypoints[j] == "player" ) {
			waypointsx.push(player.x);
			waypointsy.push(player.y);
		}else {
			waypointsx.push(entity.x + path.waypoints[j][0]);
			waypointsy.push(entity.y + path.waypoints[j][1]);
		}
	}
	entity.pathx = [];
	entity.pathy = [];
	var steps = 1 / path.time;
	for( var j = 0; j <= 1; j += steps ) {
		var interpolation = path.type;
		if( interpolation == 0 ) {
			entity.pathx.push(game.math.linearInterpolation( waypointsx, j));
			entity.pathy.push(game.math.linearInterpolation( waypointsy, j));
		}else if( interpolation == 1 ) {
			entity.pathx.push(game.math.bezierInterpolation( waypointsx, j));
			entity.pathy.push(game.math.bezierInterpolation( waypointsy, j));
		}else if( interpolation == 2 ) { 
			entity.pathx.push(game.math.catmullRomInterpolation( waypointsx, j));
			entity.pathy.push(game.math.catmullRomInterpolation( waypointsy, j));
		}
	}
	entity.pathTime = path.time;
	entity.currentPath = 0;
}