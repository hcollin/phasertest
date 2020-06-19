import GameLevelScene from "../scenes/GameLevelScene";
import { GameLevelSceneSettings } from "../interfaces/Level";

export function startLevel(scene: Phaser.Scene, levelConfig: GameLevelSceneSettings) {
    const newScene = new GameLevelScene(levelConfig);
    scene.game.scene.add("activeLevel", newScene, true, levelConfig);
    scene.scene.setVisible(false);
    scene.sound.stopAll();
    scene.game.scene.switch("LevelSelector", "activeLevel");
}


