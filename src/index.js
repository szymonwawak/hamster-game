import Phaser from "phaser";
import Actions from "./Actions"

let score = 0;
let scoreText;
let generatingSpeed = 0;
let movementSpeed = 0;
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
    },
};

const game = new Phaser.Game(config);

function preload() {
    this.load.image('hamster', 'src/assets/hamster.png');
    this.load.image('sky', 'src/assets/sky.png');
    this.load.image('cloud', 'src/assets/cloud.png')
    this.load.image('seed', 'src/assets/seed.png')
}

function create() {
    score = 0;
    generatingSpeed = 300;
    movementSpeed = 200;
    let context = this;
    let sceneSize = this.scale.displaySize;
    this.add.image(sceneSize.width / 2, sceneSize.height / 2, 'sky');
    this.hamster = this.physics.add.sprite(100, 245, 'hamster');
    this.hamster.setCollideWorldBounds(true);
    this.hamster.body.onWorldBounds = true;
    this.hamster.body.world.on('worldbounds', function () {
        this.scene.scene.restart();
    });
    this.input.keyboard.on('keydown_SPACE', function () {
        Actions.jump(context);
    });
    this.clouds = this.physics.add.group();
    this.seeds = this.physics.add.group();
    this.generator = this.time.addEvent({delay: 1000, callback: createCloud, callbackScope: this, loop: true});
    this.time.addEvent({delay: (generatingSpeed * 2.5), callback: createSeed, callbackScope: this, loop: true});
    this.physics.add.overlap(this.hamster, this.seeds, collectSeed, null, this);
    this.physics.add.overlap(this.hamster, this.clouds, hitCloud, null, this);
    scoreText = this.add.text(16, 16, 'Score: 0', {fontSize: '32px', fill: '#000'});
}

function createCloud() {
    let height = Math.random() * 768;
    let cloud = this.clouds.create(this.game.config.width, height, 'cloud');
    cloud.body.velocity.x = -movementSpeed;
    cloud.body.allowGravity = false;
}

function createSeed() {
    let height = Math.random() * 768;
    let seed = this.seeds.create(this.game.config.width, height, 'seed');
    seed.body.velocity.x = -200;
    seed.body.allowGravity = false;
}

function collectSeed(hamster, seed) {
    seed.disableBody(true, true);
    movementSpeed += 4;
    generatingSpeed--;
    this.generator.delay = generatingSpeed * 2.5;
    score++;
    scoreText.setText("Score: " + score)
}

function hitCloud() {
    this.scene.restart();
}