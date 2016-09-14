// Get src directory
var scripts = document.getElementsByTagName("script");
var src = scripts[scripts.length-1].src;
var dir = src.substring(0, src.length-8);

// Load Classes
var load_dependencies = {
    attempts: 0,
    successes: 0,
    load: function(url, dir)
    {
        var $this = this;

        if ( typeof url=='string' )
            { url = [url]; }

        var u;
        for ( var x in url )
        {
            u = url[x];
            this.attempts++;
            $.getScript(dir+u, function() {
                $this.successes++;
            });
        }
        return this;
    },
    success: function() {
        return attempts==successes;
    }
};

load_dependencies.load([
    'gameengine.js',
    'keyboard.js',
    'menustate.js',
    'pausestate.js',
    'playstate.js',
    'entities/background.js',
    'entities/camera.js',
    'entities/ship.js',
    'entities/bullet.js',
], dir);

$(function() {
    if ( load_dependencies.success )
        { var game = new GameEngine(); }
    else
        { console.log('Classes not loaded!'); }
});
