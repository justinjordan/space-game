// Bullet Object
function Bullet(state, view, parent, x, y, vx, vy, enemy)
{
    this.circle;

    this.dead = false;
    this.enemy = (typeof enemy=='boolean')?enemy:false;
    this.parent = parent;

    var speed = 10;
    var lifespan = 5000;
    var birth = Date.now();
    var fading = false;
    var fade_rate = 0.1;

    this.damage = 25;
    this.x = x;
    this.y = y;
    this.dead = false;

    this.init = function()
    {
        this.circle = new PIXI.Graphics();
        if ( enemy )
            { this.circle.beginFill(0xffff00); }
        else
            { this.circle.beginFill(0xddddff); }
        this.circle.drawCircle(0,0,2);
        this.circle.endFill();
        this.circle.x = x;
        this.circle.y = y;

        // Make visible
        view.addChild(this.circle);

    };

    this.update = function()
    {
        // Check lifespan
        if ( fading )
        {
            this.circle.alpha -= fade_rate;

            if ( this.circle.alpha <= 0 )
                { this.dead = true; }
        }
        else if ( Date.now() - birth >= lifespan )
            { fading = true; }

        // Move bullet
        this.x += vx;
        this.y += vy;

        // Position circle
        this.circle.x = this.x;
        this.circle.y = this.y;
    };

    this.cleanup = function(callback)
    {
        // Destroy Graphics
        view.removeChild(this.circle);

        callback();
    };

    this.add_to_view = function(v)
    {
        v.addChild(view);
    };

    this.init();
}
