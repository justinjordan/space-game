function PlayState(engine)
{
    var $this = this;
    this.engine = engine;

    // Setup View Objects
    this.camera = new Camera(engine);

    // Setup entities
    this.background = new Background($this, this.camera.view);
    this.ship = new Ship($this, $this.camera.view, 0.5 * engine.renderer.view.width, 0.5 * engine.renderer.view.height);
    this.astronaut = new Astronaut($this, $this.camera.view, this.ship);
    this.bullets = [];

    this.init = function()
    {

        // Add background
        this.background.init();

        // Setup ship
        $this.ship.init();
        // Setup astronaut
        $this.astronaut.init();

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
            if ( engine.keyboard.was_tapped('Digit6') )
            {
                if ( $this.ship.control ) // In ship
                {
                    $this.astronaut.x = $this.ship.x;
                    $this.astronaut.y = $this.ship.y;
                    $this.astronaut.sprite.visible = true;
                    $this.camera.setFocus($this.astronaut);
                    $this.ship.control = false;
                    $this.astronaut.control = true;
                }
                else if ( get_dist($this.ship, $this.astronaut) < 100 ) // Space walk
                {
                    $this.astronaut.sprite.visible = false;
                    $this.camera.setFocus($this.ship);
                    $this.astronaut.control = false;
                    $this.ship.control = true;
                }
            }

            // Update entities
            $this.ship.update(); // Ship
            $this.astronaut.update(); // Astronaut
            for ( var i in this.bullets ) // Bullets
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

    this.init();


    /*********** PRIVATE ************/
    var get_dist = function(ent1,ent2)
    {
        var xdiff = ent2.x - ent1.x;
        var ydiff = ent2.y - ent1.y;

        return Math.sqrt(xdiff*xdiff+ydiff*ydiff);
    }



}
