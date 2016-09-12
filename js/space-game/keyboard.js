function Keyboard()
{
    var down = {};
    var used = {};

    var key_down = function(e)
    {
        down[e.code] = true;
    };
    var key_up = function(e)
    {
        down[e.code] = false;
        used[e.code] = false;
    };

    this.is_down = function(code)
    {
        return down[code];
    };
    this.was_tapped = function(code)
    {
        if ( down[code] && !used[code] )
        {
            used[code] = true;
            return true;
        }

        return false;
    };

    window.addEventListener("keydown", key_down);
    window.addEventListener("keyup", key_up);

}
