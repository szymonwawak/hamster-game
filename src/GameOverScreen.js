import {Utils} from "./Utils";

export class GameOverScreen extends Phaser.Scene {

    constructor() {
        super('GameOverScreen');
        this.score = 0;
    }

    init(data) {
        this.score = data.score;
    }

    preload() {
        this.load.image('sky', 'src/assets/sky.png');
    }

    create() {
        let sceneSize = this.scale.displaySize,
            sceneCenterWidth = sceneSize.width / 2,
            sceneCenterHeight = sceneSize.height / 2;
        this.add.image(sceneCenterWidth, sceneCenterHeight, 'sky');
        this.add.text(sceneCenterWidth - 200, sceneCenterHeight - 150, 'Koniec gry! Wynik: ' + this.score, {
            font: '40px Arial',
            fill: '#fff'
        });
        let playAgainText = this.add.text(sceneCenterWidth - 140, sceneCenterHeight - 20, "Zagraj ponownie", {
            font: '34px Arial',
            fill: '#fff'
        });
        playAgainText.inputEnabled = true;
        playAgainText.setInteractive();
        Utils.setHoverListenersForColorChange(playAgainText);
        let context = this;
        playAgainText.addListener('pointerdown', function () {
            let scene = context.scene;
            scene.launch('GameScreen');
            scene.stop();
        });
    }
}