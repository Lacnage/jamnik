var Lose = function(game){};

Lose.prototype =
{
  preload:function()
  {

  },
  create:function()
  {
    this.game.state.start("Menu");
  }
};
