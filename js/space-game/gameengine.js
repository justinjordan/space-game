function GameEngine()
{
    var $this = this;
    this.states = [];
    this.keyboard = new Keyboard();

    this.frame_duration = 30;

    // Setup PIXI
    this.renderer, this.stage;

    // Define Container Element
    this.container = $('#game_container');
    this.width = $(window).width();
    this.height = $(window).height();

    // On Window resize
    $(window).resize(function(e) {
        this.width = $(window).width();
        this.height = $(window).height();
        $this.renderer.resize(this.width, this.height);
    });

    this.init = function()
    {
        this.load_images(function() {

            // Detect which renderer is available... WebGL or Canvas Drawing API
            $this.renderer = PIXI.autoDetectRenderer($this.width, $this.height);
            //$this.renderer.view.style.display = 'block';
            //$this.renderer.view.style.margin = '50px auto';

            // Attach view to DOM
            $this.container.append($this.renderer.view);

            // Create stage used for display
            $this.stage = new PIXI.Container();

            // Add Background... Doesn't move.  That's why.
            //$this.background = new PIXI.Sprite(PIXI.loader.resources.starfield.texture);
            //$this.stage.addChild($this.background);


            // Start gameloop
            setInterval($this.update, $this.frame_duration);

            // Load MenuState
            $this.pushState(new MenuState($this));

        });

    };

    this.update = function()
    {
        // Update Current State
        if ( $this.states.length > 0 )
        {
            // update state
            $this.states[0].update();
        }

        // Render Stage
        $this.renderer.render($this.stage);
    };

    // Manage Game States
    this.pushState = function(state)
    {
        this.states.push(state);
    };
    this.shiftState = function()
    {
        $this.states.shift();
    };
    this.unshiftState = function(state)
    {
        $this.states.unshift(state);
    };

    this.load_images = function(callback)
    {
        PIXI.loader
            .add([
                {
                    name:   'ship_spritesheet',
                    url:    'images/sprites/ship_spritesheet.json'
                },
                {
                    name:   'starfield',
                    url:    'images/sprites/starfield.png'
                },
                {
                    name:   'astronaut_spritesheet',
                    url:    'images/sprites/astronaut_spritesheet.json'
                },
            ])
            .on('progress', this.load_progress_handler)
            .load(callback);
    };


    this.init();
}
