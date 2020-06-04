import {Utils} from "./Utils";

export class MainMenu extends Phaser.Scene {

    constructor() {
        super('MainMenu');
    }

    preload() {
        this.load.image('sky', 'src/assets/sky.png');
    }

    create() {
        let sceneSize = this.scale.displaySize,
            sceneCenterWidth = sceneSize.width / 2,
            sceneCenterHeight = sceneSize.height / 2;
        this.add.image(sceneCenterWidth, sceneCenterHeight, 'sky');
        this.add.text(sceneCenterWidth - 120, sceneCenterHeight - 150, 'Hamster.io', {
            font: '50px Arial',
            fill: '#fff'
        });
        let playText = this.add.text(sceneCenterWidth - 150, sceneCenterHeight - 20, 'Naciśnij aby rozpocząć', {
            font: '30px Arial',
            fill: '#fff'
        });
        playText.inputEnabled = true;
        playText.setInteractive();
        Utils.setHoverListenersForColorChange(playText);
        let context = this;
        playText.addListener('pointerdown', function () {
            let scene = context.scene;
            scene.stop();
            scene.start('GameScreen');
        });
        this.add.text(40, sceneCenterHeight + 200, 'W grze podskakujesz przy pomocy spacji. Zbieraj ziarenka, unikaj burzowych chmur oraz nie dotknij krawędzi ekranu!', {
            font: '18px Arial',
            fill: '#fff'
        });
    }
}