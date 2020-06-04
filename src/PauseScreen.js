import {Utils} from "./Utils";

export class PauseScreen extends Phaser.Scene {

    constructor() {
        super('PausedScreen');
    }

    preload() {
        this.load.image('sky', 'src/assets/sky.png');
    }

    create() {
        let sceneSize = this.scale.displaySize,
            sceneCenterWidth = sceneSize.width / 2,
            sceneCenterHeight = sceneSize.height / 2;
        this.add.image(sceneCenterWidth, sceneCenterHeight, 'sky');
        this.add.text(sceneCenterWidth - 200, sceneCenterHeight - 150, 'Gra została wstrzymana!', {
            font: '35px Arial',
            fill: '#fff'
        });
        let resumeText = this.add.text(sceneCenterWidth - 120, sceneCenterHeight - 20, 'Kliknij aby wznowić', {
            font: '30px Arial',
            fill: '#fff'
        });
        resumeText.inputEnabled = true;
        resumeText.setInteractive();
        Utils.setHoverListenersForColorChange(resumeText);
        let context = this;
        resumeText.addListener('pointerdown', function () {
            let scene = context.scene;
            scene.stop();
            scene.resume('GameScreen');
        })
    }
}