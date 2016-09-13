// Ship Object
function Ship(state, x, y) {

    // Set View
    var view = state.camera.view;
    this.vx = 0;
    this.vy = 0;
    this.accel = 0.2;
    this.rot_accel = 0.1;
    this.frame = 'normal';
    this.frames = {
        normal: 'ship.png',
        thrust: 'ship_thrust.png'
    };
    this.init = function()
    {
        this.sprite = new PIXI.Sprite(PIXI.loader.resources.ship_spritesheet.textures[this.frames[this.frame]]);
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.position.set(x, y);
        this.sprite.rotation -= Math.PI/2;

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
            { state.bullets.push(new Bullet(state)); }

        // Move Ship
        this.sprite.x += this.vx;
        this.sprite.y += this.vy;

        // Test Bounds
        /*var padding = this.sprite.width/2;
        if ( this.sprite.x < -padding )
            { this.sprite.x = state.engine.renderer.view.width + padding; }
        if ( this.sprite.x > state.engine.renderer.view.width + padding )
            { this.sprite.x = -padding; }
        if ( this.sprite.y < -padding )
            { this.sprite.y = state.engine.renderer.view.height + padding; }
        if ( this.sprite.y > state.engine.renderer.view.height + padding )
            { this.sprite.y = -padding; }*/
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

        this.sprite.rotation += this.rot_accel*dir;
    };
    this.show_frame = function(frame)
    {
        if ( typeof frame != 'undefined' && frame!=this.frame )
        {
            this.sprite.setTexture(PIXI.loader.resources.ship_spritesheet.textures[this.frames[frame]]);
            this.frame = frame;
        }
    };
}
