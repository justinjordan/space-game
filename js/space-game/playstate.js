function PlayState(engine)
{
    var $this = this;
    this.engine = engine;

    var running = false;

    // Setup View Objects
    this.camera = new Camera(engine);

    // Setup entities
    this.ship = new Ship($this, engine.renderer.view.width/2, 0.9*engine.renderer.view.height);
    this.bullets = [];

    this.init = function()
    {
        // Load Images
        this.load_images($this.setup);

        // Add camera to stage
        engine.stage.addChild(this.camera.view);

        // Focus on Ship
        this.camera.setFocus(this.ship);

    };
    this.update = function()
    {
        if ( running && engine.states.length == 1 )
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
                if ( !this.bullets[i].dead )
                    { this.bullets[i].update(); }
                else
                {
                    this.bullets[i].cleanup();
                    this.bullets.splice(i, 1);
                }

            }

            // Update camera
            this.camera.update();
        }
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
        // Setup ship
        $this.ship.init();

        running = true;
    };

    this.load_images = function(callback)
    {
        PIXI.loader
            .add([
                {
                    name:   'ship_spritesheet',
                    url:    'images/sprites/ship_spritesheet.json'
                }
            ])
            .on('progress', this.load_progress_handler)
            .load(callback);
    };

    this.load_progress_handler = function(loader, resource)
    {
        // preloader stuff goes here
    };

    this.init();
}
