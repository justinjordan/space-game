// Bullet Object
function Bullet(state)
{
    // Set View
    var view = state.camera.view;

    this.vx = 0;
    this.vy = 0;
    this.circle;

    this.dead = false;

    var speed = 10;
    var lifespan = 5000;
    var birth = Date.now();

    this.init = function()
    {
        this.circle = new PIXI.Graphics();
        this.circle.beginFill(0xffffff);
        this.circle.drawCircle(0,0,2);
        this.circle.endFill();
        this.circle.x = state.ship.sprite.x;
        this.circle.y = state.ship.sprite.y;

        // Make visible
        view.addChild(this.circle);

        // Set Velocity
        this.vx = state.ship.vx + speed*Math.cos(state.ship.sprite.rotation);
        this.vy = state.ship.vy + speed*Math.sin(state.ship.sprite.rotation);
    };

    this.update = function()
    {
        // Move bullet
        this.circle.x += this.vx;
        this.circle.y += this.vy;

        // Check lifespan
        if ( Date.now() - birth >= lifespan )
            { this.dead = true; }
    };

    this.cleanup = function()
    {
        // Destroy Graphics
        view.removeChild(this.circle);
    }

    this.init();
}
