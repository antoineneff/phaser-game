var wfconfig = {
    active: function() {
        init();
    },
    google: {
        families: ['Bungee Shade']
    }
};

WebFont.load(wfconfig);

var init = function () {

    var menuState = {
        preload: function () {
            game.load.spritesheet('button', '../assets/start-button.png');
            game.load.image('background', '../assets/starfield.jpg');
        },

        create: function () {
            game.add.tileSprite(0, 0, 800, 448, 'background');
            startButton = game.add.button(game.world.width*0.5, game.world.height*0.5 + 25, 'button', this.startGame, this, 1, 0, 2);
            startButton.anchor.set(0.5);

            var text = game.add.text(game.world.width*0.5, game.world.height*0.5 - 45, 'flappy spaceship', { font: '30px Bungee Shade', fill: '#FFF' });
            text.anchor.set(0.5);
        },

        startGame: function () {
            game.state.start('main');
        },
    }

    var mainState = {
        preload: function () {
            game.load.image('background', '../assets/starfield.jpg');
            game.load.image('spaceship', '../assets/ufo.png');
            game.load.image('planet', '../assets/planet.png');
            game.load.audio('jump', '../assets/jump.wav');
        },

        create: function () {
            background = game.add.tileSprite(0, 0, 800, 448, 'background');

            this.jumpSound = game.add.audio('jump');

            this.spaceship = game.add.sprite(100, 175, 'spaceship');
            game.physics.enable(this.spaceship);
            this.spaceship.body.gravity.y = 1000;

            this.planets = game.add.group();
            this.timer = game.time.events.loop(1500, this.addPlanet, this);

            this.score = 0;
            this.labelScore = game.add.text(20, 20, '0', { font: '30px Arial', fill: '#FFF' });

            game.input.onDown.add(this.jump, this);
        },

        update: function () {
            background.tilePosition.x -= 2;
            if (this.spaceship.y < 0 || this.spaceship.y > 384) {
                this.gameOver();
            }

            game.physics.arcade.overlap(this.spaceship, this.planets, this.gameOver, null, this);
        },

        jump: function () {
            this.spaceship.body.velocity.y = -350;
            this.jumpSound.play();
        },

        gameOver: function () {
            game.state.start('over');
        },

        addPlanet: function () {
            var position = Math.floor(Math.random() * 7) + 1;
            var planet = game.add.sprite(800, position * 64 - 64, 'planet');

            this.planets.add(planet);

            game.physics.enable(planet);
            planet.body.velocity.x = -200;

            planet.checkWorldBounds = true;
            planet.outOfBoundsKill = true;
        },
    }

    var overState = {
        preload: function () {
            game.load.image('background', '../assets/starfield.jpg');
            game.load.spritesheet('button', '../assets/start-button.png');
        },

        create: function () {
            background = game.add.tileSprite(0, 0, 800, 448, 'background');
            restartButton = game.add.button(game.world.width*0.5, game.world.height*0.5 + 50, 'button', this.startGame, this, 1, 0, 2);
            restartButton.anchor.set(0.5);
            this.labelOver = game.add.text(game.world.width*0.5, game.world.height*0.5 - 50, 'GAME OVER', { font: '30px Bungee Shade', fill: '#FFF' });
            this.labelOver.anchor.set(0.5);
        },

        startGame: function () {
            game.state.start('main');
        },
    }

    var game = new Phaser.Game(800, 448);

    game.state.add('menu', menuState);
    game.state.add('main', mainState);
    game.state.add('over', overState);

    game.state.start('menu');

}
