function MenuState(engine)
{
    var $this = this;
    var container = new PIXI.Container();

    this.init = function()
    {
        this.message = new PIXI.Text(
            "Press ENTER",
            {font: "32px sans-serif", fill: "white"}
        );
        this.message.anchor.set(0.5, 0.5);
        this.message.position.set(
            engine.renderer.view.width/2,
            engine.renderer.view.height/2
        );
        container.addChild(this.message);

        // Add Container to stage
        engine.stage.addChild(container);
    };
    this.update = function()
    {
        // Handle Input
        if ( engine.keyboard.was_tapped('Enter') )
        {
            engine.pushState(new GameState(engine));

            this.cleanup();
        }
    };
    this.cleanup = function()
    {
        // Remove container from screen
        container.destroy();

        // Close state
        engine.shiftState();
    };

    this.init();
}
