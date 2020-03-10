var Preloader = function(game){};

Preloader.prototype =
{
  preload:function()
  {
    game.load.image('grass', 'assets/dark_grass.png');
    game.load.spritesheet('button', 'assets/button_sprite_sheet.png', 193, 71);
    game.load.image('earth', 'assets/scorched_earth.png');
    game.load.atlas('tank', 'assets/tanks.png', 'assets/tanks.json');
    game.load.atlas('enemy', 'assets/enemy-tanks.png', 'assets/tanks.json');
    game.load.image('bullet', 'assets/bullet.png');
    game.load.image('bullet2', 'assets/bullet2.png');
  },
  create:function()
  {
    this.game.state.start("Menu");
  }
};
