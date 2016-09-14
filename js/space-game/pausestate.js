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
            0.5 * engine.renderer.view.width,
            0.25 * engine.renderer.view.height
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
