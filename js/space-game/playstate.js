function PlayState(engine)
{
    var $this = this;
    this.engine = engine;

    // Setup View Objects
    this.camera = new Camera(engine);

    // Setup entities
    this.background = new Background($this, this.camera.view);
    this.ship = new Ship($this, $this.camera.view, 0.5 * engine.renderer.view.width, 0.5 * engine.renderer.view.height);
    this.bullets = [];

    this.init = function()
    {

        // Add background
        this.background.init();

        // Setup ship
        $this.ship.init();

        // Add camera to stage
        engine.stage.addChild($this.camera.view);
        // Focus on Ship
        $this.camera.setFocus($this.ship);
    };
    this.update = function()
    {
        if ( engine.states.length == 1 )
        {
            // Handle Input
            if ( engine.keyboard.was_tapped('KeyP') )
            {
                // Open Pause Menu
                engine.unshiftState(new PauseState(engine));
            }

            // Update Ship
            $this.ship.update();

            // Update bullets
            for ( var i in this.bullets )
            {
                if ( this.bullets[i].dead )
                {
                    this.bullets[i].cleanup();
                    this.bullets.splice(i, 1);
                }
                else
                { this.bullets[i].update(); }

            }

            // Update Background
            this.background.update();

            // Update camera
            this.camera.update();
        }


        /******* DEBUG *******/
        this.debug();
        /******* DEBUG *******/
    };
    this.cleanup = function()
    {
        // Remove from screen
        this.camera.cleanup();

        // Close state
        engine.shiftState();
    };

    this.setup = function()
    {

    };

    this.load_progress_handler = function(loader, resource)
    {
        // preloader stuff goes here
    };

    /********** DEBUG ***********/
    this.debug = function() {
    };
    /********** DEBUG ***********/

    this.init();
}
