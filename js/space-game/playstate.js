function PlayState(engine)
{
    var $this = this;
    this.engine = engine;

    // Track entity IDs
    var available_id = 0;
    this.create_id = function()
    {
        return available_id++;
    };

    // Setup View Objects
    this.camera = new Camera(engine);

    // Setup entities
    this.ships = [];
    this.bullets = [];
    // First Ship
    this.ships.push(new Ship($this, $this.camera.view, 0.5 * engine.renderer.view.width, 0.5 * engine.renderer.view.height, true));

    this.init = function()
    {
        // Add background
        this.background = new Background($this, this.camera.view);
        this.background.init();

        // Setup ships
        for ( var i = 0; i < 10; i++ )
            { this.ships.push(new Ship($this, $this.camera.view, Math.random() * engine.renderer.view.width, Math.random() * engine.renderer.view.height)); }
        this.ship = this.ships[0];
        for ( var i in $this.ships )
            { $this.ships[i].init(); }

        // Setup astronaut
        this.astronaut = new Astronaut($this, $this.camera.view, this.ship);
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
                switch (true)
                {
                    case $this.astronaut.control:

                        var dist;
                        var close_dist = 50;
                        var closest_ship;

                        for ( var i in $this.ships )
                        {
                            dist = this.get_dist($this.ships[i], $this.astronaut);
                            if ( dist < close_dist )
                            {
                                close_dist = dist;
                                closest_ship = $this.ships[i];
                            }
                        }

                        if (typeof closest_ship!='undefined')
                        {
                            $this.astronaut.control = false;
                            $this.ship = closest_ship;
                            $this.ship.control = true;
                            $this.camera.setFocus($this.ship, 1);
                        }

                    break;

                    default:
                        $this.astronaut.x = $this.ship.x;
                        $this.astronaut.y = $this.ship.y;
                        $this.astronaut.vx = $this.ship.vx;
                        $this.astronaut.vy = $this.ship.vy;
                        $this.astronaut.rotation = $this.ship.rotation;
                        $this.astronaut.control = true;
                        $this.ship.control = false;
                        $this.camera.setFocus($this.astronaut, 2);
                }
            }

            // UPDATE ASTRONAUT
            $this.astronaut.update();

            // UPDATE SHIPS
            for (var i in this.ships)
            {
                var ship = this.ships[i];
                switch(true)
                {
                    case ship.dead:
                        ship.cleanup(function() {
                            $this.ships.splice(i, 1); // remove element
                        });
                    break;
                    default:
                        ship.update();
                }
            }

            // UPDATE BULLETS
            for (var i in this.bullets)
            {
                var bullet = this.bullets[i];
                switch(true)
                {
                    case bullet.dead:
                        bullet.cleanup(function() {
                            $this.bullets.splice(i, 1); // remove element
                        });
                    break;
                    default:
                        bullet.update();

                        // Test Collisions
                        for (var j in this.ships)
                        {
                            var ship = this.ships[j];
                            var dist = this.get_dist(bullet,ship);

                            if (dist < 40 && ship.id!=bullet.parent.id)
                            {
                                ship.apply_damage(bullet.damage);
                                bullet.dead = true;
                            }
                        }
                }
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


    this.get_dist = function(ent1,ent2)
    {
        var xdiff = ent2.x - ent1.x;
        var ydiff = ent2.y - ent1.y;

        return Math.sqrt(xdiff*xdiff+ydiff*ydiff);
    };





}
