import Phaser from "phaser";
import {GameScreen} from "./screens/GameScreen";
import {PauseScreen} from "./screens/PauseScreen";
import {MainMenu} from "./screens/MainMenu";
import {GameOverScreen} from "./screens/GameOverScreen";

const config = {
    type: Phaser.AUTO,
    height:1080,
    width: 1920,
    scale: {
        mode: Phaser.Scale.RESIZE,
    },
    physics: {
        default: 'matter',
        matter: {}
    },
    scene: [MainMenu, GameScreen, GameOverScreen, PauseScreen]
};

new Phaser.Game(config);