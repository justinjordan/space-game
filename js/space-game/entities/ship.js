// Ship Object
function Ship(state, view, x, y) {
    var $this = this;

    this.x = x, this.y = y, this.rotation = -Math.PI/2;
    this.start_x = x;
    this.start_y = y;
    this.vx = 0;
    this.vy = -2;
    this.accel = 0.2;
    this.rot_accel = 0.1;
    this.frame = 'normal';
    this.frames = {
        normal: 'ship.png',
        thrust: 'ship_thrust.png'
    };

    var bullet_speed = 20;



    this.init = function()
    {
        // Setup Sprite
        this.sprite = new PIXI.Sprite(PIXI.loader.resources.ship_spritesheet.textures[this.frames[this.frame]]);
        this.sprite.anchor.set(0.5, 0.5);

        // Make visible
        view.addChild(this.sprite);
    };
    this.update = function()
    {


        // Control Ship
        if ( state.engine.keyboard.is_down('ArrowUp') )
        {
            this.accelerate();
            this.show_frame('thrust');
        }
        else
            { this.show_frame('normal'); }
        if ( state.engine.keyboard.is_down('ArrowLeft') )
            { this.rotate(-1); }
        if ( state.engine.keyboard.is_down('ArrowRight') )
            { this.rotate(1); }
        if ( state.engine.keyboard.was_tapped('Space') )
        {
            shoot();
        }

        // Move Ship
        this.x += this.vx;
        this.y += this.vy;

        // Adjust Sprite
        this.sprite.position.set(this.x, this.y);
        this.sprite.rotation = this.rotation;

    };
    this.accelerate = function()
    {
        this.vx += this.accel*Math.cos(this.sprite.rotation);
        this.vy += this.accel*Math.sin(this.sprite.rotation);
    };
    this.rotate = function(dir)
    {
        if ( typeof dir == 'undefined' )
            { dir = 1; }

        this.rotation += this.rot_accel*dir;
    };
    this.show_frame = function(frame)
    {
        if ( typeof frame != 'undefined' && frame!=this.frame )
        {
            this.sprite.setTexture(PIXI.loader.resources.ship_spritesheet.textures[this.frames[frame]]);
            this.frame = frame;
        }
    };

    var shoot = function()
    {
        state.bullets.push(new Bullet(
            state,
            view,
            $this.x + ($this.sprite.height/4) * Math.cos($this.rotation), // places bullet on nose of ship
            $this.y + ($this.sprite.height/4) * Math.sin($this.rotation), // places bullet on nose of ship
            $this.vx + bullet_speed*Math.cos($this.rotation),
            $this.vy + bullet_speed*Math.sin($this.rotation)
        ));
    };
}
