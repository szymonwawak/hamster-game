import Phaser from "phaser";
import Actions from "./Actions"

const config = {
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: 1024,
    height: 768,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 1000},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

const game = new Phaser.Game(config);

function preload() {
    this.load.image('hamster', 'src/assets/hamster.png');
    this.load.image('sky', 'src/assets/sky.png');
}

function create() {
    let context = this;
    this.add.image(512, 384, 'sky');
    this.hamster = this.physics.add.sprite(100, 245, 'hamster');
    this.input.keyboard.on('keydown_SPACE', function () {
        Actions.jump(context);
    });
}