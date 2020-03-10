var Menu = function(game){};

Menu.prototype =
{
  preload:function()
  {

  },
  create:function()
  {
    game.stage.backgroundColor = "#182d3b";
    this.background = game.add.tileSprite(0, 0, 800, 600, "grass");
    this.mainMenu = this.add.group();
    this.settingsMenu = this.add.group();
    this.createMenu();
    this.switchWindow(0)
  },
  createMenu:function()
  {
    var buttonHeight = 100;
    var offset = 100;
    var style = {front: "28 px Arial", fill: "#ffff66", align: "center"};
    var mainMenu = ["Play", "Settings", "Upgrade"];
    var mmCallbacks = [function(){this.game.state.start("Game");},function(){this.switchWindow(1);},function(){this.switchWindow(2);}];

    var settingsMenu = ["Clear Progress"]
    var smCallbacks = [function(){this.clearProgress();}];

    for(var i = 0; i < mainMenu.length; i++)
    {
      var button = game.add.button(this.game.width*0.5, this.game.height*0.5 + (buttonHeight*i) - offset, 'button', mmCallbacks[i], this, 2, 1, 0);
      var text = game.add.text(button.x, button.y, mainMenu[i], style);
      text.anchor.set(0.5)
      button.anchor.set(0.5);
      this.mainMenu.add(button);
      this.mainMenu.add(text);
    }

    for(var i = 0; i < settingsMenu.length; i++)
    {
      var button = game.add.button(this.game.width*0.5, this.game.height*0.5 + (buttonHeight*i) - offset, 'button', mmCallbacks[i], this, 2, 1, 0);
      var text = game.add.text(button.x, button.y, mainMenu[i], style);
      text.anchor.set(0.5)
      button.anchor.set(0.5);
      this.settingsMenu.add(button);
      this.settingsMenu.add(text);
    }
    this.backButton = game.add.button(this.game.width*0.5, this.game.height*0.5 + (buttonHeight*i) - offset, 'button', function(){this.switchWindow(0);}, this, 2, 1, 0);
    this.backText= game.add.text(this.backButton.x, this.backButton.y "Back", style)
    this.backText.anchor.set(0.5)
    this.backButton.anchor.set(0.5)
},
 switchWindow:function(id)
  {
    this.mainMenu.setAll("visible", id==0);
    this.settingsMenu.setAll("visible", id==1);
    this.backButton.visible = this.backText.visible = (id != 0)
  },
clearProgress:function()
   {

   }
};
