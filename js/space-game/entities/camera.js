function Camera(engine)
{
    var center = new PIXI.Point(engine.renderer.view.width/2, engine.renderer.view.height/2);

    this.view = new PIXI.Container();
    this.view.alpha = 0;
    var fade_out = false;
    var fade_rate = 0.01;

    // Physics Variables
    var vx = 0;
    var vy = 0;

    var focus = {};
    var zoom = 1;

    var easing = 0.1;

    this.update = function()
    {
        // Fade in and out
        if ( !fade_out && this.view.alpha < 1 )
        {
            this.view.alpha += fade_rate;
            if ( this.view.alpha > 1 )
                { this.view.alpha = 1; }
        }
        else if ( fade_out && this.view.alpha > 0 )
            {
                this.view.alpha -= fade_rate;
                if ( this.view.alpha > 1 )
                    { this.view.alpha = 1; }
            }

        // Follow motion
        this.view.x -= focus.vx;
        this.view.y -= focus.vy;

        // Adjust Camera
        if ( typeof focus!='undefined' )
        {
            var g_focus = this.view.toGlobal(new PIXI.Point(focus.x,focus.y));
            var xdiff = center.x-g_focus.x;
            var ydiff = center.y-g_focus.y;
            var dist = Math.sqrt(xdiff*xdiff+ydiff*ydiff);
            var dir = Math.atan2(ydiff,xdiff);
            var vel = dist / 10;

            // Set Position
            this.view.x = this.view.x + vel*Math.cos(dir);
            this.view.y = this.view.y + vel*Math.sin(dir);

            // Set Zoom
            //this.view.scale.set(zoom,zoom);
            //this.view.pivot = focus;
        }
    };

    this.cleanup = function()
    {
        this.view.destroy();
    };

    this.setFocus = function(f, z)
    {
        focus = f;
        zoom = (typeof z!='undefined')?z:1;
    };
}
