
// Enemy properties
var enemyBulletGroup;
var enemies;
var enemyData;

function enemyCreate(name, x, y, pathIndex, patternIndex) {
	for( var i = 0; i < enemyData.length; i++ ) {
		if( name == enemyData[i].name ) {
			
			var sprite = enemyData[i].sprite;
			var health = enemyData[i].health;
			var path = enemyData[i].path[pathIndex];
			var collisionOffset = enemyData[i].collisionOffset;
			var enemy = enemies.create(x, y, sprite);
			
			enemy.id = enemies.total;
			enemy.anchor.setTo(0.5, 0.5);
			enemy.body.moves = true;
			enemy.body.setSize(24, 24, collisionOffset / 2, collisionOffset / 2);
			enemy.health = health;
            enemy.outOfBoundsKill = true;
            enemy.checkWorldBounds = true;

			createWaypoints(enemy, path);
            
            if(patternIndex >= 0) {
                var pattern = enemyData[i].pattern[patternIndex];
                createPattern(enemy, pattern);
            }
            
			enemy.events.onKilled.add(explosion);
		}
	}
}