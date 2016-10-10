function Background(state, view)
{
    var texture = PIXI.loader.resources.starfield.texture;

    var sprites = [];
    var rect = {};

    var container = new PIXI.Container();

    this.init = function()
    {
        // Setup sprites
        for ( var x = 0; x < 2; x++ )
        {
            sprites[x] = [];
            for ( var y = 0; y < 2; y++ )
            {
                sprites[x][y] = new PIXI.Sprite(texture);
                sprites[x][y].x = x * texture.width;
                sprites[x][y].y = y * texture.height;
                container.addChild(sprites[x][y]);
            }
        }

        view.addChild(container);
    };

    this.update = function()
    {
        rect = get_rect();
        g_rect = global_rect();
        position_tiles();

        //reduce_motion();
    };

    /*var reduce_motion = function()
    {
        var cam_velocity = state.camera.getVelocity();
        container.x += 0.8 * cam_velocity.x;
        container.y += 0.8 * cam_velocity.y;
    };*/

    var position_tiles = function()
    {
        var s_width = state.engine.renderer.view.width;
        var s_height = state.engine.renderer.view.height;

        if ( g_rect.left > 0 ) // move tiles left
        {
            for ( var y = 0; y < 2; y++ )
            {
                sprites[0][y].x = rect.left - texture.width;
                sprites[1][y].x = rect.left;
            }
        }
        else if ( g_rect.right < s_width ) // move tiles right
        {
            for ( var y = 0; y < 2; y++ )
            {
                sprites[0][y].x = rect.right - texture.width;
                sprites[1][y].x = rect.right;
            }
        }

        if ( g_rect.top > 0 ) // move right tiles left
        {
            for ( var x = 0; x < 2; x++ )
            {
                sprites[x][0].y = rect.top - texture.height;
                sprites[x][1].y = rect.top;
            }
        }
        else if ( g_rect.bottom < s_height ) // move left tiles right
        {
            for ( var x = 0; x < 2; x++ )
            {
                sprites[x][0].y = rect.bottom - texture.height;
                sprites[x][1].y = rect.bottom;
            }
        }
    };

    var get_rect = function()
    {
        var tl = new PIXI.Point(sprites[0][0].x, sprites[0][0].y);
        var r = {
            left: tl.x,
            top: tl.y,
            right: tl.x + texture.width*2,
            bottom: tl.y + texture.height*2
        };

        return r;
    };

    var global_rect = function()
    {
        var tl = view.toGlobal(new PIXI.Point(sprites[0][0].x, sprites[0][0].y));
        var r = {
            left: tl.x,
            top: tl.y,
            right: tl.x + texture.width*2,
            bottom: tl.y + texture.height*2
        };

        return r;
    };

}
