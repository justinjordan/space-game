function Camera(engine)
{
    this.view = new PIXI.Container();
    this.view.alpha = 0;
    var fade_out = false;
    var fade_rate = 0.01;

    // Physics Variables
    var vx = 0;
    var vy = 0;

    var focus = {};
    var dest = {
        x: 0,
        y: 0
    };
    var center = new PIXI.Point(engine.renderer.view.width/2, engine.renderer.view.height/2);
    var easing = 0.1;

    this.update = function()
    {
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

        if ( typeof focus!='undefined' )
        {
            dest = {
                x: center.x-focus.x + focus.vx,
                y: center.y-focus.y + focus.vy
            };
        }

        // Move Camera
        this.view.x = dest.x;
        this.view.y = dest.y;
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
