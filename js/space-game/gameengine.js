function GameEngine()
{
    var $this = this;
    this.states = [];
    this.keyboard = new Keyboard();

    this.frame_duration = 30;

    // Setup PIXI
    this.renderer, this.stage;


    this.init = function()
    {
        // Detect which renderer is available... WebGL or Canvas Drawing API
        this.renderer = PIXI.autoDetectRenderer(1000, 600);
        this.renderer.view.style.display = 'block';
        this.renderer.view.style.margin = '50px auto';

        // Attach view to DOM
        document.body.appendChild(this.renderer.view);

        // Create stage used for display
        this.stage = new PIXI.Container();

        // Start gameloop
        setInterval(this.update, this.frame_duration);

        // Load MenuState
        this.pushState(new MenuState($this));
    };

    this.update = function()
    {
        // Update Current State
        if ( $this.states.length > 0 )
        {
            // update state
            $this.states[0].update();
        }

        // Render Stage
        $this.renderer.render($this.stage);
    };

    // Manage Game States
    this.pushState = function(state)
    {
        this.states.push(state);
    };
    this.shiftState = function()
    {
        $this.states.shift();
    };
    this.unshiftState = function(state)
    {
        $this.states.unshift(state);
    };

    this.init();
}
