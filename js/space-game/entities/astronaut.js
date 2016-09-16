function Astronaut(state, view, ship) {
    var $this = this;

    this.control = (typeof control!='undefined')?control:false;
    this.x = 0;
    this.y = 0;
    //this.rotation = -Math.PI/2;
    this.start_x = (typeof x!='undefined')?x:0;
    this.start_y = (typeof y!='undefined')?y:0;
    this.vx = 0;
    this.vy = 0;
    this.accel = 0.05;
    this.rot_accel = 0.05;
    this.frame = 'normal';
    this.frames = {
        normal: 'astronaut.png',
        thrust: 'astronaut_thrust.png'
    };

    var bullet_speed = 20;
    var fade_rate = 0.02;



    this.init = function()
    {
        // Setup Sprite
        this.sprite = new PIXI.Sprite(PIXI.loader.resources.astronaut_spritesheet.textures[this.frames[this.frame]]);
        //this.sprite = new PIXI.Sprite(PIXI.loader.resources.astronaut.texture);
        this.sprite.anchor.set(0.6, 0.5);
        this.sprite.alpha = 0;

        // Set default frame
        this.show_frame('normal');

        // Make visible
        view.addChild(this.sprite);
    };
    this.update = function()
    {


        if ( this.control ) // Contolled by keyboard
        {
            // Keyboard Control
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
            /*if ( state.engine.keyboard.was_tapped('Space') )
            {
                shoot();
            }*/

            // Make visible
            this.sprite.alpha = 1;


            // fade in
            /*if ( this.sprite.alpha < 1 )
            {
                this.sprite.alpha += fade_rate
                this.sprite.scale.x += fade_rate;
                this.sprite.scale.y += fade_rate;
                if ( this.sprite.alpha > 1 )
                    { this.sprite.alpha = 1; }
                if ( this.sprite.scale.x > 1 || this.sprite.scale.y > 1 )
                {
                    this.sprite.scale.x = 1;
                    this.sprite.scale.y = 1;
                }
            }*/


            // Move
            //this.x += this.vx;
            //this.y += this.vy;

        }
        else // Stationary
        {

            this.vx = ship.vx;
            this.vy = ship.vy;

            // Make invisible
            this.sprite.alpha = 0;

            this.x = ship.x;
            this.y = ship.y;
            this.rotation = ship.rotation;
            this.accelerate(0.2);
        }
            // Move
            this.x += this.vx;
            this.y += this.vy;

            // Adjust Sprite
            this.sprite.position.set(this.x, this.y);
            this.sprite.rotation = this.rotation;

    };
    this.accelerate = function(v, d)
    {
        var vel = (typeof v!='undefined')?v:this.accel;
        var dir = (typeof d!='undefined')?d:this.rotation;

        this.vx += vel*Math.cos(dir);
        this.vy += vel*Math.sin(dir);
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
            this.sprite.setTexture(PIXI.loader.resources.astronaut_spritesheet.textures[this.frames[frame]]);
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
