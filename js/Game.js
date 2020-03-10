var Game = function(game){};

Game.prototype =
{
  preload:function()
  {

  },
  create:function()
  {
      game.world.setBounds(0, 0, 4000, 4000);
      land = game.add.tileSprite(0, 0, 800, 600, 'earth');
      land.fixedToCamera = true;
      tank = game.add.sprite(2000, 2000, 'tank', 'tank1');
      tank.anchor.setTo(0.5, 0.5);
      tank.animations.add('move', ['tank1', 'tank2', 'tank3', 'tank4', 'tank5', 'tank6'], 20, true);
      game.physics.enable(tank, Phaser.Physics.ARCADE);
      tank.body.drag.set(0.2);
      tank.body.maxVelocity.setTo(400, 400);
      tank.body.collideWorldBounds = true;
      turret = game.add.sprite(2000, 2000, 'tank', 'turret');
      turret.anchor.setTo(0.3, 0.5);
      shadow = game.add.sprite(2000, 2000, 'tank', 'shadow');
      shadow.anchor.setTo(0.5, 0.5);

      enemyBullets = game.add.group();
      enemyBullets.enableBody = true;
      enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
      enemyBullets.createMultiple(100, 'bullet');
      enemyBullets.setAll('anchor.x', 0.5);
      enemyBullets.setAll('anchor.y', 0.5);
      enemyBullets.setAll('outOfBoundsKill', true);
      enemyBullets.setAll('checkWorldBounds', true);

      bullets = game.add.group();
      bullets.enableBody = true;
      bullets.physicsBodyType = Phaser.Physics.ARCADE;
      bullets.createMultiple(bulletsCount, 'bullet', 0, false);
      bullets.setAll('anchor.x', 0.5);
      bullets.setAll('anchor.y', 0.5);
      bullets.setAll('outOfBoundsKill', true);
      bullets.setAll('checkWorldBounds', true);

      for(var i = 0; i < enemiesTotal; i++)
      {
        enemies.push(new EnemyTank(i, game, tank, enemyBullets));
      }

      explosions = game.add.group();
      for(var i = 0; i < 10; i++)
      {
        var explosionAnimation = explosions.create(0, 0, 'kaboom', [0], false);
        explosionAnimation.anchor.setTo(0.5, 0.5);
        explosionAnimation.animations.add('kaboom');
      }

      tank.bringToTop();
      turret.bringToTop();

      game.camera.follow(tank);
      game.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300);
      game.camera.focusOnXY(2000, 2000);

      cursors = game.input.keyboard.createCursorKeys();
      cursorsWSAD = game.input.keyboard.addKeys(
        {'up': Phaser.KeyCode.W, 'down': Phaser.KeyCode.S,
           'left': Phaser.KeyCode.A, 'right': Phaser.KeyCode.D});
      game.input.keyboard.addKey(Phaser.KeyCode.ESC).onDown.add(pause, self);
      game.input.keyboard.addKey(Phaser.KeyCode.ONE).onDown.add(chooseWeapon1, self);
      game.input.keyboard.addKey(Phaser.KeyCode.TWO).onDown.add(chooseWeapon2, self);
  },
  update:function()
  {
    game.physics.arcade.overlap(
      enemyBullets, tank, bulletHitPlayer, null, this);
    enemiesAlive = 0;
    for(var i = 0; i < enemies.length; i++)
    {
      if(enemies[i].alive)
      {
        enemiesAlive++;
        game.physics.arcade.collide(tank, enemies[i].tank);
        game.physics.arcade.overlap(
          bullets, enemies[i].tank, bulletHitEnemy, null, this);
        enemies[i].update();
      }
    }
    if(enemiesAlive==0){
      this.game.state.start("Win");
    }
    if(cursors.left.isDown || cursorsWSAD.left.isDown)
    {
      tank.angle -= 4;
    }
    if(cursors.right.isDown || cursorsWSAD.right.isDown)
    {
      tank.angle += 4;
    }
    if(cursors.up.isDown || cursorsWSAD.up.isDown)
    {
      currentSpeed = 300;
    }
    else
    {
      if(currentSpeed > 0)
      {
        currentSpeed -= 4;
      }
    }
    if(currentSpeed > 0)
    {
      game.physics.arcade.velocityFromRotation(tank.rotation, currentSpeed, tank.body.velocity);
    }
    land.tilePosition.x = -game.camera.x;
    land.tilePosition.y = -game.camera.y;
    shadow.x = tank.x;
    shadow.y = tank.y;
    turret.x = tank.x;
    turret.y = tank.y;
    turret.rotation = game.physics.arcade.angleToPointer(turret);

    if(game.input.activePointer.isDown)
    {
      fire();
    }
  }
};

function chooseWeapon1()
{
  currentWeapon = 1;
  fireRate = 100;
}
function chooseWeapon2()
{
  currentWeapon = 2;
  fireRate = 10;
}
function pause()
{
  if(game.paused)
  {
    game.paused = false;
  }
  else
  {
    game.paused = true;
  }
}
function bulletHitPlayer(tank, bullet)
{
  bullet.kill();
  health--;
  if(health < 1)
  {
    shadow.kill();
    tank.kill();
    turret.kill();
    var explosionAnimation = explosions.getFirstExists(false);
    explosionAnimation.reset(tank.x, tank.y);
    explosionAnimation.play('kaboom', 30, false, true);
    this.game.state.start("Lose");
  }
}

function bulletHitEnemy(tank, bullet)
{
  bullet.kill();
  var destroyed = enemies[tank.name].damage();
  if (destroyed)
  {
    var explosionAnimation = explosions.getFirstExists(false);
    explosionAnimation.reset(tank.x, tank.y);
    explosionAnimation.play('kaboom', 30, false, true);
  }
}

function fire()
{
  if(game.time.now > nextFire && bullets.countDead() > 0)
  {
    nextFire = game.time.now + fireRate;
    var bullet = bullets.getFirstExists(false);
    bullet.reset(turret.x, turret.y);
    bullet.rotation = game.physics.arcade.moveToPointer(bullet,
      1000, game.input.activePointer, 500);
  }
}
