var menuState = {
    preload: function () {

    },

    create: function () {

    },

    update: function () {

    },
}

var mainState = {
    preload: function () {

    },

    create: function () {

    },

    update: function () {

    },
}

var overState = {
    preload: function () {

    },

    create: function () {

    },

    update: function () {

    },
}

var game = new Phaser.Game(800, 448);

game.state.add('menu', menuState);
game.state.add('main', mainState);
game.state.add('over', overState);

game.state.start('menu');
