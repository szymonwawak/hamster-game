import Phaser from "phaser";
import {GameScreen} from "./GameScreen";
import {PauseScreen} from "./PauseScreen";
import {MainMenu} from "./MainMenu";
import {GameOverScreen} from "./GameOverScreen";

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    physics: {
        default: 'matter',
        matter: {}
    },
    scene: [MainMenu, GameOverScreen, GameScreen, PauseScreen]
};

new Phaser.Game(config);

function create() {
    this.scene.start('MainMenu');
}