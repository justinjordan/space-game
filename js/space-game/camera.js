function Camera(engine)
{
    this.view = new PIXI.Container();

    var vx = 0;
    var vy = 0;
    var focus;
    var center = new PIXI.Point(engine.renderer.view.width/2, engine.renderer.view.height/2);
    var easing = 0.1;

    this.update = function()
    {
        if ( focus!=null )
        {
            // Adjust position
            var xdiff = focus.sprite.x-center.x;
            var ydiff = focus.sprite.y-center.y;
            var dist = Math.sqrt( xdiff*xdiff + ydiff*ydiff );

            function clamp(v, min, max)
            {
                if ( v < min )
                    { return min; }
                else if ( v > max )
                    { return max; }
                else {
                    { return v; }
                }
            }
            vx = focus.vx * clamp(dist,0,100)/100;
            vy = focus.vy * clamp(dist,0,100)/100;
        }

        // Move Camera
        this.view.x += vx;
        this.view.y += vy;
    };
    this.cleanup = function()
    {
        this.view.destroy();
    };

    this.setFocus = function(f)
    {
        focus = f;
    };
}
