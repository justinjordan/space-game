function Game()
{
    var $this = this;
    this.frame_duration = 30;

    // Store active keys
    this.keyboard = {};

    // Setup PIXI variables
    this.renderer,this.stage;

    this.init = function()
    {
        // Detect which renderer is available... WebGL or Canvas Drawing API
        this.renderer = PIXI.autoDetectRenderer(800, 600);
        this.renderer.view.style.display = 'block';
        this.renderer.view.style.margin = '50px auto';

        // Attach view to DOM
        document.body.appendChild(this.renderer.view);

        // Create stage used for display
        this.stage = new PIXI.Container();

        // Load Images
        this.load_images($this.setup);

    };

    this.setup = function()
    {
        // Setup ship
        $this.ship.init();

        // Start Handling Input
        $this.watch_keyboard();

        // Start Main gameloop
        setInterval($this.gameloop, $this.frame_duration);
    };

    this.gameloop = function()
    {
        // update Ship
        $this.ship.update();

        // Render game
        $this.renderer.render($this.stage);
    };

    this.watch_keyboard = function()
    {
        var key_down = function(e)
        {
            $this.keyboard[e.key] = true;
        };
        var key_up = function(e)
        {
            $this.keyboard[e.key] = false;
        };

        window.addEventListener("keydown", key_down);
        window.addEventListener("keyup", key_up);
    }

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

    // Ship Logic
    this.ship = {
        vx: 0,
        vy: 0,
        vr: 0,
        accel: 0.2,
        rot_accel: 0.1,
        frame: 'normal',
        frames: {
            normal: 'ship.png',
            thrust: 'ship_thrust.png'
        },
        init: function()
        {
            this.sprite = new PIXI.Sprite(PIXI.loader.resources.ship_spritesheet.textures[this.frames[this.frame]]);
            this.sprite.anchor.set(0.5, 0.5);
            this.sprite.position.set($this.renderer.view.width/2, $this.renderer.view.height/2);
            this.sprite.rotation -= Math.PI/2;
            $this.stage.addChild($this.ship.sprite);
        },
        update: function()
        {
            // Control Ship
            if ( $this.keyboard['ArrowUp'] )
            {
                this.accelerate();
                this.show_frame('thrust');
            }
            else
                { this.show_frame('normal'); }

            if ( $this.keyboard['ArrowLeft'] )
                { this.rotate(-1); }
            if ( $this.keyboard['ArrowRight'] )
                { this.rotate(1); }

            // Move Ship
            this.sprite.x += this.vx;
            this.sprite.y += this.vy;

            // Test Bounds
            var padding = this.sprite.width/2;
            if ( this.sprite.x < -padding )
                { this.sprite.x = $this.renderer.view.width + padding; }
            if ( this.sprite.x > $this.renderer.view.width + padding )
                { this.sprite.x = -padding; }
            if ( this.sprite.y < -padding )
                { this.sprite.y = $this.renderer.view.height + padding; }
            if ( this.sprite.y > $this.renderer.view.height + padding )
                { this.sprite.y = -padding; }
        },
        accelerate: function()
        {
            this.vx += this.accel*Math.cos(this.sprite.rotation);
            this.vy += this.accel*Math.sin(this.sprite.rotation);
        },
        rotate: function(dir)
        {
            if ( typeof dir == 'undefined' )
                { dir = 1; }

            this.sprite.rotation += this.rot_accel*dir;
        },
        show_frame: function(frame)
        {
            if ( typeof frame != 'undefined' && frame!=this.frame )
            {
                this.sprite.setTexture(PIXI.loader.resources.ship_spritesheet.textures[this.frames[frame]]);
                this.frame = frame;
            }
        }
    };

}

var game = new Game();
game.init();
