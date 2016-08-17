var Game = (function () {
    function Game(context, width, height) {
        var _this = this;
        this.context = context;
        this.width = width;
        this.height = height;
        this.context.canvas.addEventListener('click', function (event) { _this.click(event); });
        this.sprites = [];
        this.showUI = true;
        this.renderer = new Engine.Renderer(context, width, height, function (timestamp) { _this.renderWorld(timestamp); }); // wrap in a method ot preserve the reference to the class
        // Start Screen
        var start = new Engine.StartLevel(this);
        this.currentLevel = start;
        this.context.canvas.style.backgroundColor = 'rgba(250,250,250, .8)';
        var sprite = new Engine.Sprite(150, 150, 80, 78, 'images/meteor.png');
        sprite.frames = 4;
        sprite.fps = 5;
        this.sprites.push(sprite);
        var s = new Engine.Sprite(300, 150, 80, 78, 'images/meteor.png');
        s.frames = 4;
        s.fps = 20;
        this.sprites.push(s);
        var player = new Engine.Player(250, 250, 0, 0, '');
        this.sprites.push(player);
    }
    Game.prototype.start = function () {
        this.renderer.start();
    };
    Game.prototype.stop = function () {
        this.renderer.stop();
    };
    Game.prototype.renderWorld = function (timestamp) {
        // this.sprites.forEach((sprite) => {
        //     sprite.render(this.context, timestamp);
        // });
        this.currentLevel.render(this.context, timestamp);
        if (this.showUI == true) {
            this.renderUI();
        }
    };
    ;
    Game.prototype.renderUI = function () {
        this.context.fillStyle = '#ffffff';
        this.context.lineWidth = 2;
        this.context.fillStyle = "rgba(250,250,250,0)";
        this.context.fillRect(0, 0, 300, 50);
        this.context.fillRect(800, 0, -300, 50);
        this.context.font = '24px Arial';
        this.context.fillStyle = "#000000";
        this.context.fillText('this is the score area', 510, 30);
        this.context.font = '24px Arial';
        this.context.fillStyle = "#000000";
        this.context.fillText('this is the command area', 10, 30);
        this.context.strokeRect(350, 0, 100, 50);
        this.context.fillText('10/12 kb', 355, 30);
        
        // kb counter
        this.context.strokeRect(350, 0, 100, 50);
        this.context.font = '24px Arial';
        this.context.fillStyle = "#ffffff";
        this.context.fillText('12/13kb', 350, 30);
    };
    Game.prototype.click = function (event) {
        this.currentLevel.sprites.forEach(function (sprite) {
            if (sprite.checkCollision(event.offsetX, event.offsetY)) {
                sprite.click(event);
            }
        });
    };
    return Game;
}());

//# sourceMappingURL=data:application/json;base64,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