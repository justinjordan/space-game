// Get src directory
var scripts = document.getElementsByTagName("script");
var src = scripts[scripts.length-1].src;
var dir = src.substring(0, src.length-8);

// Load Classes
var load_dependencies = {
    attempts: 0,
    successes: 0,
    load: function(url)
    {
        var $this = this;
        this.attempts++;
        $.getScript(url, function() {
            $this.successes++;
        });

        return this;
    },
    success: function() {
        return attempts==successes;
    }
};
load_dependencies
    .load(dir+'keyboard.js')
    .load(dir+'gameengine.js')
    .load(dir+'menustate.js')
    .load(dir+'pausestate.js')
    .load(dir+'gamestate.js')
    .load(dir+'entities/ship.js')
    .load(dir+'entities/bullet.js');

$(function() {
    if ( load_dependencies.success )
        { var game = new GameEngine(); }
    else
        { console.log('Classes not loaded!'); }
});
