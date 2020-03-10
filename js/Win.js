var Win = function(game){};

Win.prototype =
{
  preload:function()
  {

  },
  create:function()
  {
    this.game.state.start("Menu");
  }
};
