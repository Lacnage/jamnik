var game = new Phaser.Game(800, 600, Phaser.CANVAS);
game.state.add('Boot', Boot);
game.state.add('Preloader', Preloader);
game.state.add('Menu', Menu);
game.state.add('Game', Game);
game.state.start('Boot');
game.state.start('Win', Win);
game.state.start('Lose', Lose);

var land;
var tank;
var turret;
var shadow;
var currentSpeed = 0;
var cursors;
var cursorsWSAD;
var bullets;
var bulletsCount = 100;
var fireRate = 100;
var nextFire = 0;
var enemies =[];
var enemyBullets;
var enemiesTotal = 20;
var enemiesAlive = 0;
var health = 100;
var explosions;
var currentWeapon = 1;

/*
function render()
{
  game.debug.text('Enemies: ' + enemiesAlive + '/' + enemiesTotal, 32, 32);
}
*/
