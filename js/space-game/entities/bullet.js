// Bullet Object
function Bullet(state, view, x, y, vx, vy, enemy)
{
    this.circle;

    this.dead = false;
    this.enemy = (typeof enemy=='boolean')?enemy:false;

    var speed = 10;
    var lifespan = 5000;
    var birth = Date.now();
    var fading = false;
    var fade_rate = 0.1;

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
        this.circle.x += vx;
        this.circle.y += vy;
    };

    this.cleanup = function()
    {
        // Destroy Graphics
        view.removeChild(this.circle);
    };

    this.add_to_view = function(v)
    {
        v.addChild(view);
    };

    this.init();
}
