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
    this.load.image('cloud', 'src/assets/cloud.png')
}

function create() {
    let context = this;
    let sceneSize = this.scale.displaySize;
    this.add.image(sceneSize.width / 2, sceneSize.height / 2, 'sky');
    this.hamster = this.physics.add.sprite(100, 245, 'hamster');
    this.input.keyboard.on('keydown_SPACE', function () {
        Actions.jump(context);
    });
    this.clouds = this.physics.add.group();
    this.time.addEvent({delay: 1500, callback: addCloud, callbackScope: this, loop: true})
}

function addCloud() {
    let height = Math.random() * 1024;
    let cloud = this.clouds.create(this.game.config.width, height, 'cloud');
    cloud.body.velocity.x = -200;
    cloud.body.allowGravity = false;
}