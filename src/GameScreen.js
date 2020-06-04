import Actions from "./Actions";
import {Utils} from "./Utils";

export class GameScreen extends Phaser.Scene {
    constructor() {
        super('GameScreen');
    }

    preload() {
        this.load.image('hamster', 'src/assets/hamster.png');
        this.load.image('sky', 'src/assets/sky.png');
        this.load.image('cloud', 'src/assets/cloud.png')
        this.load.image('seed', 'src/assets/seed.png')
    }

    create() {
        this.initFields();
        let context = this;
        this.createInputListeners(context);
        this.putContentOntoScreen(context);
        this.setWorldBounds();
        this.createItemGenerators();
        this.createHamster();
    }

    initFields() {
        this.score = 0;
        this.generatingSpeed = 700;
        this.movementSpeed = 5;
        this.sceneSize = this.scale.displaySize;
        this.sceneWidth = this.sceneSize.width;
        this.sceneCenterWidth = this.sceneWidth / 2;
        this.sceneCenterHeight = this.sceneSize.height / 2;
        this.group = this.matter.world.nextGroup(true);
    }

    createInputListeners(context) {
        this.input.keyboard.on('keydown_SPACE', function () {
            Actions.jump(context);
        });
    }

    putContentOntoScreen(context) {
        this.add.image(this.sceneCenterWidth, this.sceneCenterHeight, 'sky');
        let pauseLabel = this.add.text(this.sceneSize.width - 100, 20, 'Pauza', {font: '24px Arial', fill: '#fff'});
        pauseLabel.inputEnabled = true;
        pauseLabel.setInteractive();
        Utils.setHoverListenersForColorChange(pauseLabel);
        pauseLabel.addListener('pointerdown', function () {
            let scene = context.scene;
            scene.pause();
            scene.launch('PausedScreen')
        });
        this.scoreText = this.add.text(16, 16, 'Wynik: 0', {fontSize: '32px', fill: '#000'});
    }

    setWorldBounds() {
        this.matter.world.setBounds(-200, 0, this.sceneSize.width, this.sceneSize.height, 1, true, false, true, true);
        this.matter.world.on('collisionstart', function (event) {
            let collidingBody = event.pairs[0].bodyB;
            if (collidingBody.label === "hamster")
                this.scene.finishGame();
            else
                collidingBody.gameObject.destroy();
        })
    }

    createItemGenerators() {
        this.cloudGenerator = this.time.addEvent({
            delay: (this.generatingSpeed * 2.5),
            callback: this.createCloud,
            callbackScope: this,
            loop: true
        });
        this.time.addEvent({delay: this.generatingSpeed, callback: this.createSeed, callbackScope: this, loop: true});
    }

    createCloud() {
        let height = (Math.random() * 600) + 50;
        let cloud = this.matter.add.sprite(this.sceneWidth, height, 'cloud');
        Utils.setCloudBody(cloud);
        cloud.setFrictionAir(0);
        cloud.setIgnoreGravity(true);
        cloud.setVelocityX(-this.movementSpeed);
        cloud.setCollisionGroup(this.group)
    }

    createSeed() {
        let height = (Math.random() * 720) + 20;
        let seed = this.matter.add.sprite(this.sceneWidth, height, 'seed');
        Utils.setSeedBody(seed);
        seed.setFrictionAir(0);
        seed.setIgnoreGravity(true);
        seed.setVelocityX(-5);
        seed.setCollisionGroup(this.group);
    }

    createHamster() {
        this.hamster = this.matter.add.sprite(200, 245, 'hamster');
        Utils.setHamsterBody(this.hamster);
        this.hamster.body.onWorldBounds = true;
        this.hamster.setCollisionGroup(this.group);
    }

    update() {
        let hamsterBody = this.hamster.body;
        if (hamsterBody)
            this.matter.overlap(hamsterBody, null, this.checkOverlap, null, this);
    }

    checkOverlap(firstBody, secondBody) {
        if (firstBody.label === "hamster") {
            if (secondBody.label === "cloud") {
                this.finishGame();
            } else if (secondBody.label === "seed") {
                this.collectSeed(this, secondBody);
            }
        }
    }

    finishGame() {
        let scene = this.scene;
        scene.stop();
        scene.launch('GameOverScreen', {score: this.score});
    }

    collectSeed(context, seed) {
        seed.gameObject.destroy();
        context.movementSpeed += 0.2;
        context.generatingSpeed -= 8;
        context.cloudGenerator.delay = this.generatingSpeed * 2.5;
        context.score++;
        context.scoreText.setText("Wynik: " + context.score)
    }
}