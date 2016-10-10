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
    on_success: function(callback)
    {
	var checks = 0;
        var interval = setInterval(function()
        {
            if ( this.attempts==this.successes )
            {
                callback();
                clearInterval(interval);
            }
            else if ( checks >= 60 )
            {
                console.log("Dependency Load Timed Out!");
		clearInterval(interval);
            }
        }, 1000);
    }
};

load_dependencies.load([
    'gameengine.js',
    'keyboard.js',
    'menustate.js',
    'pausestate.js',
    'playstate.js',
    'background.js',
    'entities/camera.js',
    'entities/ship.js',
    'entities/astronaut.js',
    'entities/bullet.js',
], dir);

$(function() {
    var game;
    load_dependencies.on_success(function() {
        game = new GameEngine();
    });
});
