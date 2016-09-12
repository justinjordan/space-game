function PauseState(engine)
{
    var $this = this;

    container = new PIXI.Container();

    this.init = function()
    {
        // Display Pause Content
        this.message = new PIXI.Text(
            "PAUSED",
            {font: "32px sans-serif", fill: "white"}
        );
        this.message.anchor.set(0.5, 0.5);
        this.message.position.set(
            engine.renderer.view.width/2,
            engine.renderer.view.height/2
        );
        container.addChild(this.message);


        // Add container to stage
        engine.stage.addChild(container);
    };
    this.update = function()
    {
        // Handle Input
        if ( engine.keyboard.was_tapped('KeyP') )
        {
            // cleanup
            $this.cleanup();

        }
    };
    this.cleanup = function()
    {
        // Remove from screen
        container.destroy();

        // Close State
        engine.shiftState();
    };

    this.init();
}
